# Coin Blockchain

**Projet académique de création d'une cryptomonnaie et d'un système de paiement sur la blockchain Ethereum.**

## Présentation

Coin Blockchain est un projet réalisé dans le cadre du cours de cryptomonnaie et de blockchain. Il consiste à créer une cryptomonnaie sous forme de token ERC-20 et à développer une boutique permettant aux utilisateurs d'effectuer des achats avec ce token.

Le projet utilise une blockchain locale pour simuler les transactions, tester les smart contracts et comprendre le fonctionnement des paiements décentralisés.

## Objectifs

- Créer une cryptomonnaie compatible avec le standard ERC-20.
- Émettre des tokens et attribuer l'offre initiale au créateur du contrat.
- Effectuer des transferts de tokens entre utilisateurs.
- Connecter un portefeuille MetaMask.
- Développer un smart contract de gestion des produits et des achats.
- Permettre le paiement des produits avec notre cryptomonnaie.
- Enregistrer les achats et les transferts sur la blockchain.
- Tester les transactions sur une blockchain locale.

## Technologies utilisées

- **Solidity** — langage utilisé pour développer les smart contracts.
- **Ethereum / EVM** — environnement d'exécution des smart contracts.
- **OpenZeppelin Contracts** — bibliothèque de contrats intelligents réutilisables et éprouvés, notamment pour l'implémentation du standard ERC-20.
- **Ganache** — blockchain locale utilisée pour simuler le réseau Ethereum et tester les transactions.
- **MetaMask** — portefeuille permettant de gérer les comptes et de signer les transactions.
- **React + Vite** — développement de l'interface web de la boutique.
- **Ethers.js** — bibliothèque JavaScript permettant à l'interface React d'interagir avec la blockchain et les smart contracts.

## Pourquoi avons-nous choisi OpenZeppelin ?

Nous avons utilisé **OpenZeppelin Contracts** pour implémenter notre cryptomonnaie `DaniellaCoin`.

OpenZeppelin est une bibliothèque open source qui fournit des implémentations standardisées de contrats intelligents. Elle permet aux développeurs de réutiliser des composants existants plutôt que de réécrire toutes les fonctionnalités manuellement.

### Utilisation dans notre projet

Nous utilisons notamment le contrat `ERC20` d'OpenZeppelin pour fournir les fonctionnalités essentielles de notre token :

- `transfer()` : transférer des tokens vers un autre compte.
- `balanceOf()` : consulter le solde d'une adresse.
- `totalSupply()` : connaître la quantité totale de tokens émis.
- `approve()` : autoriser un autre contrat à utiliser une quantité déterminée de tokens.
- `transferFrom()` : permettre à un contrat autorisé de transférer les tokens d'un utilisateur.

### Pourquoi ce choix ?

1. **Respect du standard ERC-20** : le token est compatible avec les mécanismes courants utilisés par les applications Ethereum.
2. **Sécurité** : nous nous appuyons sur une implémentation largement utilisée et examinée par la communauté, au lieu de réécrire nous-mêmes toute la logique du token.
3. **Gain de temps** : nous pouvons nous concentrer sur les fonctionnalités propres à notre projet, notamment la boutique et le paiement.
4. **Interopérabilité** : les fonctions `approve()` et `transferFrom()` permettent à notre contrat de boutique de prélever les paiements en tokens avec l'autorisation du client.

L'utilisation d'OpenZeppelin réduit certains risques liés à une implémentation personnalisée, mais ne garantit pas à elle seule la sécurité de l'ensemble du projet.

## Fonctionnalités

- Création du token `DaniellaCoin` (symbole : `DANI`).
- Émission initiale de 1 000 000 DANI.
- Utilisation de 3 décimales pour le token.
- Consultation du solde du portefeuille.
- Transfert de tokens entre utilisateurs.
- Connexion de MetaMask à l'application.
- Ajout et configuration des produits dans le smart contract de la boutique.
- Consultation de la liste des produits disponibles.
- Gestion des prix, du stock et de l'état de disponibilité.
- Achat de produits avec DANI.
- Enregistrement des achats sur la blockchain.
- Consultation du statut des transactions.

## Fonctionnement du paiement

Le processus d'achat se déroule comme suit :

1. Le client connecte son portefeuille MetaMask à la boutique.
2. Il sélectionne les produits et les quantités souhaités.
3. L'application calcule le montant total en DANI.
4. Le client autorise la boutique à prélever le montant nécessaire via `approve()`.
5. Le client confirme l'achat en appelant `acheterPanier()`.
6. Le smart contract vérifie le stock, le prix et l'autorisation de paiement.
7. Le paiement est transféré à l'adresse de trésorerie.
8. Le stock est mis à jour et l'achat est enregistré sur la blockchain.

Avec 3 décimales, 1 DANI correspond à 1 000 unités minimales. Par exemple, un produit vendu à 10 DANI utilise une valeur de 10 000 unités dans le smart contract.

## Architecture du projet

```text
Coin-Blockchain/
├── contracts/
│   ├── DaniellaCoin.sol
│   └── DaniellaBoutique.sol
├── web-boutique/
│   └── Interface React + Vite
└── README.md
```

- `contracts/` : contient les smart contracts Solidity de la cryptomonnaie et de la boutique.
- `web-boutique/` : contient l'interface React permettant de consulter les produits et d'interagir avec les contrats.
- `README.md` : présente le projet, ses technologies et son fonctionnement.

## Environnement de test

Le projet utilise Ganache pour exécuter les smart contracts sur une blockchain locale. MetaMask est connecté à ce réseau afin de permettre aux utilisateurs de signer les transactions et de tester les paiements.

Les tokens et les transactions utilisés sur cet environnement sont destinés aux tests académiques et ne représentent pas une cryptomonnaie disposant nécessairement d'une valeur monétaire réelle.

## Contexte académique

Ce projet a pour objectif de mettre en pratique les notions de cryptomonnaie, de smart contracts, de standard ERC-20, de gestion des portefeuilles et de paiements sur une blockchain compatible avec Ethereum.


<!-- 
## Installation

### Prérequis

Installer Node.js, Git, MetaMask et Ganache.

### 1. Cloner le dépôt

```bash
git clone https://github.com/VOTRE-USERNAME/kamscoin-blockchain.git
cd kamscoin-blockchain
```

### 2. Installer les dépendances

```bash
cd frontend
npm install
```

### 3. Compiler les smart contracts

```bash
npx hardhat compile
```

### 4. Lancer la blockchain locale

Démarrer Ganache et configurer le réseau local dans MetaMask.

### 5. Déployer les contrats

Après avoir configuré le réseau et les comptes de test :

```bash
npx hardhat run scripts/deploy.js --network localhost
```

### 6. Lancer l'interface

```bash
cd frontend
npm install
npm run dev
```

Les commandes exactes seront ajustées selon la configuration finale du projet.

## Équipe

Projet réalisé en équipe de cinq étudiants :

- Développement du token ERC-20.
- Développement du smart contract d'achat.
- Configuration de la blockchain et déploiement.
- Développement de l'interface web.
- Intégration, tests et documentation.

Les noms des membres seront ajoutés ici.

## Environnement de test

Le projet est destiné à un environnement académique local. Les tokens et les transactions de démonstration n'ont aucune valeur monétaire réelle.

## Licence

Projet académique. Les conditions de réutilisation seront précisées par l'équipe. -->
