# CryptoShop – démo de paiement avec une cryptomonnaie

Boutique + dashboard en **React, TailwindCSS, lucide-react, react-router-dom**.
Pour l'instant **tout est simulé (mocks)** : aucun vrai MetaMask, aucune blockchain.

## Lancer

```bash
npm install
npm run dev
```

## Architecture (1 dossier = 1 rôle)

```
src/
├── config/token.js        ← nom / symbole / adresses de TA monnaie et de la boutique
├── data/                  ← 🧪 MOCKS (produits + ventes fictives)
├── services/              ← 🔌 LA SEULE couche à changer pour devenir dynamique
│   ├── productService.js      getProducts()
│   ├── transactionService.js  getTransactions()
│   ├── walletService.js       connectWallet()
│   └── paymentService.js      sendPayment()   ← le paiement
├── context/               ← états partagés : panier, transactions, wallet
├── components/
│   ├── layout/Navbar.jsx
│   ├── shop/                  liste produits + panier
│   ├── payment/               PaymentModal + FakeMetaMask (🧪 simulation)
│   └── dashboard/             cartes de stats + tableau
├── pages/
│   ├── ShopPage.jsx           page 1 : produits (gauche) + panier (droite)
│   └── DashboardPage.jsx      page 2 : ventes, argent gagné, produits vendus, transactions
└── lib/                   fonctions utilitaires (format, stats)
```

**Règle d'or :** les composants n'appellent jamais la blockchain directement.
Ils passent par `services/`. Pour passer du mock au réel, on change uniquement
le contenu des 4 fichiers de `services/` (le vrai code est déjà en commentaire).

## Flux d'un achat

1. Clic sur **Ajouter** → `CartContext.addItem`
2. Clic sur **Valider l'achat** → `PaymentModal` s'ouvre
3. **Payer avec MetaMask** → (mock) `FakeMetaMask` ; **Confirmer** → `paymentService.sendPayment()`
4. Succès → message « Paiement effectué avec succès », la vente est ajoutée via
   `TransactionsContext.addTransaction` (visible tout de suite dans le dashboard) et le panier est vidé

## Passer au vrai MetaMask (checklist)

1. `npm i ethers`
2. `config/token.js` : mets l'adresse du contrat ERC-20 de ta monnaie (`contractAddress`) et le wallet du vendeur (`STORE.walletAddress`)
3. `services/walletService.js` : active `eth_requestAccounts` (code en commentaire)
4. `services/paymentService.js` : remplace le mock par `token.transfer(...)` + `tx.wait()` (code en commentaire)
5. `components/payment/PaymentModal.jsx` : supprime l'étape `metamask` / `FakeMetaMask` ; le bouton « Payer avec MetaMask » appelle directement `handleConfirm()` (la vraie fenêtre MetaMask s'ouvre toute seule)
6. `context/WalletContext.jsx` : initialise `address` à `null` et ajoute un bouton « Connecter » dans la Navbar
7. Produits / ventes : `productService` et `transactionService` appellent ton backend ou lisent les events `Transfer` du contrat
