// Mock data layer — stands in for the real backend/blockchain calls.
// Swap these for real API/Solana calls when the backend is ready.

export const currentUser = {
  id: 'u_ana',
  name: 'Ana Cruz',
  email: 'ana@duel22.app',
  avatarInitials: 'AC',
  kycStatus: 'verified',
};

export const wallet = {
  balanceUSD: 1248.3,
  balanceUSDC: 1248.3,
  currency: 'USD',
};

export const contacts = [
  {
    id: 'c1',
    name: 'Maria Santos',
    handle: '@maria.s',
    country: 'Mexico',
    currency: 'MXN',
    rate: 17.2, // 1 USD -> 17.2 MXN (mock)
    initials: 'MS',
    firstTime: false,
    verifiedName: 'Maria S.',
  },
  {
    id: 'c2',
    name: 'Amir Khan',
    handle: '@amir.k',
    country: 'India',
    currency: 'INR',
    rate: 83.1,
    initials: 'AK',
    firstTime: true,
    verifiedName: 'Amir K.',
  },
  {
    id: 'c3',
    name: 'Priya Patel',
    handle: '@priya.p',
    country: 'United States',
    currency: 'USD',
    rate: 1,
    initials: 'PP',
    firstTime: false,
    verifiedName: 'Priya P.',
  },
  {
    id: 'c4',
    name: 'Sofia Cruz',
    handle: '@sofia.c',
    country: 'Mexico',
    currency: 'MXN',
    rate: 17.2,
    initials: 'SC',
    firstTime: true,
    verifiedName: 'Sofia C.',
  },
];

export const NETWORK_FEE_USD = 0.02; // flat, transparent network fee — no markup, no hidden charges

export const transactions = [
  {
    id: 't1',
    type: 'send',
    name: 'Maria Santos',
    initials: 'MS',
    amountUSD: 120,
    status: 'completed',
    date: '2026-09-19T14:22:00Z',
  },
  {
    id: 't2',
    type: 'receive',
    name: 'Priya Patel',
    initials: 'PP',
    amountUSD: 45,
    status: 'completed',
    date: '2026-09-18T09:05:00Z',
  },
  {
    id: 't3',
    type: 'send',
    name: 'Amir Khan',
    initials: 'AK',
    amountUSD: 250,
    status: 'pending',
    date: '2026-09-17T19:40:00Z',
  },
  {
    id: 't4',
    type: 'cash_in',
    name: 'Bank transfer',
    initials: '\u2193',
    amountUSD: 500,
    status: 'completed',
    date: '2026-09-15T11:00:00Z',
  },
  {
    id: 't5',
    type: 'send',
    name: 'Maria Santos',
    initials: 'MS',
    amountUSD: 80,
    status: 'completed',
    date: '2026-09-10T08:12:00Z',
  },
];

export function formatUSD(n) {
  return `$${n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function formatLocal(amountUSD, contact) {
  const converted = amountUSD * contact.rate;
  const symbol = contact.currency === 'MXN' ? 'MX$' : contact.currency === 'INR' ? '\u20b9' : '$';
  return `${symbol}${converted.toLocaleString('en-US', { maximumFractionDigits: 2 })}`;
}
