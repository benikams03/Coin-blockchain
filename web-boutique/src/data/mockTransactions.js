// 🧪 DONNÉES MOCK – historique de ventes fictif pour le dashboard.
const addr = (c) => `0x${c.repeat(40)}`;

export const mockTransactions = [
  { hash: '0xa1b2c3d4e5f60718293a4b5c6d7e8f9012345678901234567890abcdef123401', buyer: addr('1'), items: [{ productId: 1, name: 'Sneakers ActiveRide', qty: 1, price: 120 }], total: 120, date: '2026-10-12T14:32:00Z', status: 'confirmed' },
  { hash: '0xb2c3d4e5f60718293a4b5c6d7e8f9012345678901234567890abcdef12340102', buyer: addr('2'), items: [{ productId: 3, name: 'Montre Acier Homme', qty: 1, price: 210 }, { productId: 2, name: 'Lunettes Snap Beach', qty: 1, price: 45 }], total: 255, date: '2026-10-12T10:05:00Z', status: 'confirmed' },
  { hash: '0xc3d4e5f60718293a4b5c6d7e8f9012345678901234567890abcdef1234010203', buyer: addr('3'), items: [{ productId: 5, name: 'Laptop Slim 14"', qty: 1, price: 900 }], total: 900, date: '2026-10-11T18:47:00Z', status: 'confirmed' },
  { hash: '0xd4e5f60718293a4b5c6d7e8f9012345678901234567890abcdef123401020304', buyer: addr('4'), items: [{ productId: 4, name: 'Casque Audio Pro', qty: 2, price: 150 }], total: 300, date: '2026-10-11T09:20:00Z', status: 'confirmed' },
  { hash: '0xe5f60718293a4b5c6d7e8f9012345678901234567890abcdef12340102030405', buyer: addr('5'), items: [{ productId: 6, name: 'Smartphone Nova', qty: 1, price: 480 }], total: 480, date: '2026-10-10T16:11:00Z', status: 'confirmed' },
  { hash: '0xf60718293a4b5c6d7e8f9012345678901234567890abcdef1234010203040506', buyer: addr('6'), items: [{ productId: 2, name: 'Lunettes Snap Beach', qty: 3, price: 45 }], total: 135, date: '2026-10-09T12:00:00Z', status: 'confirmed' },
];
