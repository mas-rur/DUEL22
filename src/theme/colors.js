// DUEL22 dark theme — navy/black base with a two-tone blue→green glow accent.
// Adapted from the light PRD palette (#0A2540 / #2D6CDF / #00C48C) for dark-mode
// legibility: accents are lifted slightly so they read clearly on near-black.

export const colors = {
  // Backgrounds
  bg: '#060B14',
  bgElevated: '#0F1626',
  bgCard: '#121A2C',
  bgInput: '#0B111D',

  // Borders / hairlines
  border: '#1E2A3E',
  borderLight: '#26334A',

  // Brand accents
  green: '#17D9A3',
  greenDim: '#0E9E78',
  blue: '#3B82F6',
  blueDim: '#2D6CDF',
  navy: '#0A2540',

  // Text
  textPrimary: '#F5F7FA',
  textSecondary: '#8590A6',
  textTertiary: '#4B5568',
  textOnGreen: '#03221A',

  // Semantic
  success: '#17D9A3',
  warning: '#FFB020',
  error: '#FF6B6B',
  pending: '#F2C94C',

  // Overlays
  overlay: 'rgba(6, 11, 20, 0.7)',
  white: '#FFFFFF',
  black: '#000000',
};

export const gradients = {
  // Hero glow used once per screen (onboarding / balance card) — not on every element.
  heroGlow: ['#1C3D73', '#0B1220', '#060B14'],
  greenGlow: ['#0E9E78', '#0B1220'],
  buttonGreen: ['#22E5B0', '#0E9E78'],
};
