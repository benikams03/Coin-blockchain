
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

import {IERC20} from "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import {SafeERC20} from "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";
import {Ownable} from "@openzeppelin/contracts/access/Ownable.sol";
import {ReentrancyGuard} from "@openzeppelin/contracts/utils/ReentrancyGuard.sol";

contract DaniellaBoutique is Ownable, ReentrancyGuard {
    using SafeERC20 for IERC20;

    struct Produit {
        uint256 prixUnitaire;
        uint256 stock;
        bool actif;
    }

    IERC20 public immutable token;
    address public tresorerie;

    // Informations des produits
    mapping(uint256 => Produit) public produits;

    // Liste des identifiants pour parcourir tous les produits
    uint256[] private listeProduitIds;

    // Vérifie si un produit a déjà été enregistré
    mapping(uint256 => bool) private produitExiste;

    // Empêche un même acheteur de réutiliser un identifiant de commande
    mapping(address => mapping(bytes32 => bool)) public commandesTraitees;

    event ProduitConfigure(
        uint256 indexed produitId,
        uint256 prixUnitaire,
        uint256 stock,
        bool actif
    );

    event TresorerieModifiee(
        address indexed ancienne,
        address indexed nouvelle
    );

    event AchatPanier(
        bytes32 indexed commandeId,
        address indexed acheteur,
        uint256[] produitIds,
        uint256[] quantites,
        uint256 montantTotal
    );

    constructor(address adresseToken) Ownable(msg.sender) {
        require(adresseToken != address(0), "Token invalide");

        token = IERC20(adresseToken);
        tresorerie = msg.sender;
    }

    // Ajouter un produit ou modifier un produit existant
    function definirProduit(
        uint256 produitId,
        uint256 prixUnitaire,
        uint256 stock,
        bool actif
    ) external onlyOwner {
        require(produitId > 0, "ID invalide");
        require(prixUnitaire > 0, "Prix invalide");

        if (!produitExiste[produitId]) {
            listeProduitIds.push(produitId);
            produitExiste[produitId] = true;
        }

        produits[produitId] = Produit(
            prixUnitaire,
            stock,
            actif
        );

        emit ProduitConfigure(
            produitId,
            prixUnitaire,
            stock,
            actif
        );
    }

    // Nombre total de produits enregistrés
    function nombreProduits() external view returns (uint256) {
        return listeProduitIds.length;
    }

    // Obtenir l'identifiant d'un produit à partir de son index
    function obtenirProduitId(
        uint256 index
    ) external view returns (uint256) {
        require(index < listeProduitIds.length, "Index invalide");
        return listeProduitIds[index];
    }

    // Obtenir les informations d'un produit à partir de son index
    function obtenirProduitParIndex(
        uint256 index
    )
        external
        view
        returns (
            uint256 produitId,
            uint256 prixUnitaire,
            uint256 stock,
            bool actif
        )
    {
        require(index < listeProduitIds.length, "Index invalide");

        produitId = listeProduitIds[index];

        Produit storage produit = produits[produitId];

        return (
            produitId,
            produit.prixUnitaire,
            produit.stock,
            produit.actif
        );
    }

    // Modifier l'adresse qui reçoit les paiements
    function modifierTresorerie(
        address nouvelleTresorerie
    ) external onlyOwner {
        require(
            nouvelleTresorerie != address(0),
            "Tresorerie invalide"
        );

        address ancienne = tresorerie;
        tresorerie = nouvelleTresorerie;

        emit TresorerieModifiee(
            ancienne,
            nouvelleTresorerie
        );
    }

    // Acheter plusieurs produits en une seule transaction
    function acheterPanier(
        uint256[] calldata produitIds,
        uint256[] calldata quantites,
        bytes32 commandeId,
        uint256 montantMaximum
    ) external nonReentrant {
        uint256 longueur = produitIds.length;

        require(
            longueur > 0 && longueur <= 20,
            "Panier invalide"
        );

        require(
            longueur == quantites.length,
            "Tailles incompatibles"
        );

        require(commandeId != bytes32(0), "Commande invalide");

        require(
            !commandesTraitees[msg.sender][commandeId],
            "Commande deja payee"
        );

        uint256 montantTotal;

        for (uint256 i = 0; i < longueur; i++) {
            uint256 id = produitIds[i];
            uint256 quantite = quantites[i];

            require(
                quantite > 0 && quantite <= 20,
                "Quantite invalide"
            );

            // Éviter les produits en double dans le panier
            for (uint256 j = 0; j < i; j++) {
                require(
                    produitIds[j] != id,
                    "Produit en double"
                );
            }

            Produit storage produit = produits[id];

            require(
                produit.actif && produitExiste[id],
                "Produit indisponible"
            );

            require(
                produit.stock >= quantite,
                "Stock insuffisant"
            );

            montantTotal += produit.prixUnitaire * quantite;
        }

        require(
            montantTotal <= montantMaximum,
            "Prix modifie"
        );

        // Enregistrer la commande et diminuer le stock
        commandesTraitees[msg.sender][commandeId] = true;

        for (uint256 i = 0; i < longueur; i++) {
            produits[produitIds[i]].stock -= quantites[i];
        }

        // Prélever les DANI autorisés par le client
        token.safeTransferFrom(
            msg.sender,
            tresorerie,
            montantTotal
        );

        emit AchatPanier(
            commandeId,
            msg.sender,
            produitIds,
            quantites,
            montantTotal
        );
    }
}
