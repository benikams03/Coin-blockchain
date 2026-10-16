// 📋 Métadonnées des produits (noms, descriptions, icônes)
// Le smart contract stocke uniquement : produitId, prixUnitaire, stock, actif
// Ce fichier associe chaque produitId à ses métadonnées affichables

export const PRODUCT_METADATA = {
  1: {
    name: 'Sneakers ActiveRide',
    description: 'Sneakers confortables pour vos sessions de sport quotidiennes.',
    icon: 'shoe'
  },
  2: {
    name: 'T-Shirt Premium',
    description: 'T-shirt en coton bio, coupe ajustée et respirante.',
    icon: 'shirt'
  },
  3: {
    name: 'Sac à dos Urbain',
    description: 'Sac à dos spacieux avec compartiment ordinateur étanche.',
    icon: 'package'
  },
  4: {
    name: 'Montre Connectée',
    description: 'Montre intelligente avec suivi fitness et notifications.',
    icon: 'watch'
  },
  5: {
    name: 'Casque Audio',
    description: 'Casque à réduction de bruit avec son haute fidélité.',
    icon: 'headphones'
  },
  6: {
    name: 'Gourde Isotherme',
    description: 'Gourde garde au chaud ou au froid pendant 24h.',
    icon: 'coffee'
  }
};

// Fonction utilitaire pour obtenir les métadonnées d'un produit
export function getProductMetadata(productId) {
  return PRODUCT_METADATA[productId] || {
    name: `Produit #${productId}`,
    description: 'Description non disponible',
    icon: 'box'
  };
}
