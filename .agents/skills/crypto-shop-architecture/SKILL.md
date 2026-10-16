---
name: crypto-shop-architecture
description: Architecture, conventions et recettes du projet CryptoShop (React + Tailwind + react-router, boutique avec panier, paiement crypto simulé MetaMask, dashboard des ventes). À utiliser avant toute modification du code, ajout de page/composant/produit, ou branchement de MetaMask / d'une API / d'un smart contract.
---

# CryptoShop – architecture et règles de travail

## 1. Contexte du projet

Projet de TP de cryptomonnaie : l'étudiant a créé sa propre cryptomonnaie (ShopCoin, symbole `SHC`) et construit une boutique pour montrer comment un paiement avec cette monnaie fonctionne.

**État actuel : tout est simulé (mocks).** Aucun vrai MetaMask, aucune vraie blockchain. L'objectif est de pouvoir passer au réel en changeant uniquement la couche `src/services/`.

Langue de l'interface et des commentaires : **français**.

## 2. Stack

- React 18 + Vite (JavaScript, fichiers `.jsx`, pas de TypeScript)
- TailwindCSS 3 (couleur de marque `brand-*` définie dans `tailwind.config.js`)
- `react-router-dom` v6
- `lucide-react` pour toutes les icônes (jamais d'emoji comme icône)
- Pas de bibliothèque d'état externe : React Context + `useReducer`
- À ajouter seulement pour le vrai paiement : `ethers` (v6)

Commandes : `npm install`, `npm run dev`, `npm run build`.

## 3. Arborescence et rôle de chaque dossier

```
src/
├── main.jsx                 Providers : Router > Wallet > Transactions > Cart > App
├── App.jsx                  Navbar + routes ("/" boutique, "/dashboard")
├── config/token.js          TOKEN (nom, symbole, decimals, contractAddress) et STORE (nom, walletAddress)
├── data/                    MOCKS uniquement (mockProducts.js, mockTransactions.js)
├── services/                COUCHE D'ACCÈS AUX DONNÉES / BLOCKCHAIN (seule à changer pour le réel)
│   ├── productService.js        getProducts()
│   ├── transactionService.js    getTransactions()
│   ├── walletService.js         connectWallet()
│   └── paymentService.js        sendPayment({ items, total, buyer })
├── context/
│   ├── WalletContext.jsx        address, connect()
│   ├── CartContext.jsx          items, count, total, addItem, decrementItem, removeItem, clear
│   └── TransactionsContext.jsx  transactions, loading, stats, addTransaction
├── components/
│   ├── layout/Navbar.jsx
│   ├── shop/                    ProductRow, ProductIcon, CartPanel
│   ├── payment/                 PaymentModal, FakeMetaMask (simulation, à supprimer pour le réel)
│   └── dashboard/               StatCard, TransactionTable
├── pages/                   ShopPage.jsx, DashboardPage.jsx
└── lib/                     format.js (formatAmount, shortAddress, formatDate), stats.js (computeStats)
```

## 4. Règles d'or (à respecter pour toute tâche)

1. **Les composants et pages n'appellent jamais la blockchain, `window.ethereum` ni `fetch` directement.** Tout passe par `src/services/`.
2. **Les données mockées vivent uniquement dans `src/data/`** et ne sont importées que par `src/services/`.
3. **Le nom et le symbole de la monnaie viennent de `config/token.js`.** Ne jamais écrire "SHC" ou "ShopCoin" en dur ; utiliser `TOKEN.symbol` ou `formatAmount()`.
4. **Les montants s'affichent avec `formatAmount()`**, les adresses/hash avec `shortAddress()`, les dates avec `formatDate()` (`src/lib/format.js`).
5. **Les chiffres du dashboard sont calculés par `computeStats()`** (`src/lib/stats.js`), pas dans les composants.
6. **Une fonction de service est `async` et renvoie des données déjà au bon format** (voir section 5), même en mock.
7. Un composant = un fichier, composant en `export default`, nom de fichier en PascalCase.
8. Ne pas introduire de nouvelle dépendance sans nécessité (pas de Redux, pas de Axios, pas de librairie UI).

## 5. Formes de données (contrat à ne pas casser)

```js
// Produit
{ id: 1, name: 'Sneakers ActiveRide', description: '...', price: 120, stock: 8, icon: 'shoe' }
// `icon` est une clé string ; elle est associée à une icône lucide dans components/shop/ProductIcon.jsx

// Ligne du panier (CartContext.items)
{ product: <Produit>, qty: 2 }

// Commande envoyée au paiement
{ items: <lignes du panier>, total: 240 }

// Transaction (renvoyée par sendPayment, stockée dans TransactionsContext, affichée au dashboard)
{
  hash: '0x…', buyer: '0x…',
  items: [{ productId: 1, name: '…', qty: 1, price: 120 }],   // forme "aplatie", différente des lignes du panier
  total: 120, date: '2026-10-12T14:32:00Z', status: 'confirmed'
}
```

Les prix et montants sont exprimés **en unités du token** (nombre, pas en wei). La conversion avec `parseUnits(String(total), TOKEN.decimals)` ne se fait que dans `paymentService.js`.

## 6. Flux d'un achat

1. `ProductRow` → clic « Ajouter » → `CartContext.addItem(product)` (limité au stock).
2. `CartPanel` → « Valider l'achat » → `ShopPage` fige une copie `order = { items, total }` et ouvre `PaymentModal`.
3. `PaymentModal` a les étapes : `review` → `metamask` → `processing` → `success` | `rejected`.
4. Étape `metamask` (mock) : `FakeMetaMask` avec « Rejeter » / « Confirmer ». « Confirmer » appelle `handleConfirm()`.
5. `handleConfirm()` appelle `paymentService.sendPayment({ items, total, buyer: address })`.
6. En cas de succès, `ShopPage.handleSuccess(tx)` appelle `addTransaction(tx)` (visible aussitôt au dashboard) puis `clear()` le panier.

## 7. Conventions UI

- **Style** : minimaliste, fond `bg-slate-100`, grandes cartes blanches `rounded-2xl`, bleu de marque (`brand-600` pour les actions principales, `brand-50` pour les fonds d'icônes). Pas de dégradés violets/roses.
- **Mise en page boutique** : produits à gauche, panier à droite (`lg:grid-cols-[1fr_380px]`), empilés sur mobile.
- **Accessibilité (obligatoire)** : boutons avec `type="button"`, `aria-label` sur les boutons-icônes, `aria-hidden="true"` sur les icônes décoratives, cibles tactiles d'au moins 44 px (`min-h-[44px]`), `cursor-pointer` sur les éléments cliquables, texte au contraste suffisant (pas de `text-slate-400` pour du texte utile).
- **Modal** : `role="dialog"`, `aria-modal="true"`, `aria-labelledby`, fermeture avec Échap (sauf pendant `processing`).
- **Animations** : transitions de 200 ms ; les animations continues utilisent `motion-safe:`.
- **Responsive** à vérifier à 375 px, 768 px, 1024 px, 1440 px, sans scroll horizontal (les tableaux défilent dans un `overflow-x-auto`).
- **Icônes** : uniquement `lucide-react`.

## 8. Recettes pour les tâches courantes

### Ajouter ou modifier un produit (mock)
1. Éditer `src/data/mockProducts.js` en respectant la forme de la section 5.
2. Si `icon` est une nouvelle clé, l'ajouter dans `components/shop/ProductIcon.jsx`.

### Ajouter une page
1. Créer `src/pages/NomPage.jsx`.
2. Ajouter la `<Route>` dans `src/App.jsx`.
3. Ajouter un `<NavLink>` dans `components/layout/Navbar.jsx` (mêmes classes `linkClass`).
4. Si la page a besoin de données : nouvelle fonction dans `src/services/`, jamais d'import direct de `src/data/` dans la page.

### Ajouter une statistique au dashboard
1. Calculer la valeur dans `computeStats()` (`src/lib/stats.js`).
2. Ajouter un `<StatCard icon={…} label="…" value={…} />` dans `DashboardPage.jsx` (grille `sm:grid-cols-3`, passer à `sm:grid-cols-4` si 4 cartes).

### Changer le nom / symbole de la monnaie
Modifier uniquement `src/config/token.js`.

### Brancher le vrai MetaMask + token ERC-20
Suivre exactement cet ordre :
1. `npm i ethers`.
2. `config/token.js` : renseigner `TOKEN.contractAddress` (contrat ERC-20) et `STORE.walletAddress` (vendeur).
3. `services/walletService.js` : remplacer le mock par `window.ethereum.request({ method: 'eth_requestAccounts' })` (code déjà présent en commentaire).
4. `services/paymentService.js` : remplacer le mock par `BrowserProvider` → `getSigner()` → `Contract.transfer(STORE.walletAddress, parseUnits(String(total), TOKEN.decimals))` → `tx.wait()`. Renvoyer une transaction **au format de la section 5** (`hash` = `receipt.hash`). Convertir `items` (lignes du panier) vers la forme aplatie `{ productId, name, qty, price }`.
5. `components/payment/PaymentModal.jsx` : supprimer l'étape `metamask` et l'import de `FakeMetaMask` ; le bouton « Payer avec MetaMask » appelle directement `handleConfirm()`. Gérer le refus de l'utilisateur (erreur code 4001) → étape `rejected`.
6. Supprimer `components/payment/FakeMetaMask.jsx`.
7. `context/WalletContext.jsx` : initialiser `address` à `null`, et ajouter dans la Navbar un bouton « Connecter MetaMask » qui appelle `connect()`. Bloquer « Valider l'achat » tant que le wallet n'est pas connecté.
8. Vérifier le réseau (chainId) attendu et afficher un message clair si l'utilisateur est sur un autre réseau.

### Brancher une API / backend pour les produits et les ventes
- Remplacer le corps de `getProducts()` et `getTransactions()` par un `fetch` vers l'API (ou une lecture des événements `Transfer` du contrat vers `STORE.walletAddress`). Garder la même forme de retour.
- Ajouter un état d'erreur dans `ShopPage` et `TransactionsContext` (aujourd'hui seul `loading` existe).

## 9. Ce qu'il ne faut PAS faire

- Ne pas mettre de clé privée, mnémonique ou secret dans le code ou le dépôt.
- Ne pas déplacer la logique de paiement dans un composant.
- Ne pas modifier les formes de données (section 5) sans mettre à jour tous les consommateurs : services, contexts, `computeStats`, `TransactionTable`.
- Ne pas utiliser `localStorage` pour stocker des transactions « réelles » ; la source de vérité sera la blockchain ou le backend.
- Ne pas casser le mode simulation : tant que `paymentService` est en mock, l'application doit fonctionner sans MetaMask installé.

## 10. Checklist avant d'ouvrir une PR

1. `npm run build` passe sans erreur.
2. Parcours testé dans le navigateur : ajouter 2 produits → modifier les quantités → valider → confirmer dans la (fausse) fenêtre MetaMask → message de succès → la vente apparaît au dashboard et le panier est vide.
3. Cas « Rejeter » testé : message d'échec + bouton « Réessayer ».
4. Mise en page vérifiée en 375 px et en 1280 px (captures d'écran jointes à la PR).
5. Aucun import de `src/data/` en dehors de `src/services/`, aucun symbole de monnaie en dur.
