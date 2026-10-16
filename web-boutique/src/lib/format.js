import { TOKEN } from '../config/token.js';

export const formatAmount = (n) =>
  `${Number(n).toLocaleString('fr-FR', { maximumFractionDigits: 2 })} ${TOKEN.symbol}`;

export const shortAddress = (a = '') => (a.length > 12 ? `${a.slice(0, 6)}…${a.slice(-4)}` : a);

export const formatDate = (iso) =>
  new Date(iso).toLocaleString('fr-FR', { dateStyle: 'medium', timeStyle: 'short' });
