// Calcule les chiffres du dashboard à partir de la liste des transactions.
// Quand tu auras un vrai backend, tu pourras garder cette fonction ou
// recevoir ces chiffres directement de l'API.
export function computeStats(transactions) {
  return {
    salesCount: transactions.length,
    revenue: transactions.reduce((sum, t) => sum + t.total, 0),
    productsSold: transactions.reduce(
      (sum, t) => sum + t.items.reduce((s, i) => s + i.qty, 0),
      0
    ),
  };
}
