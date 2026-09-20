// Type scale — Poppins throughout (matches the DUEL22 brand PRD).
// Bold/Medium for headings & big numbers, Regular/Light for body copy.

export const fonts = {
  light: 'Poppins-Light',
  regular: 'Poppins-Regular',
  medium: 'Poppins-Medium',
  bold: 'Poppins-Bold',
};

export const type = {
  display: { fontFamily: fonts.bold, fontSize: 40, lineHeight: 46, letterSpacing: -0.5 },
  h1: { fontFamily: fonts.bold, fontSize: 26, lineHeight: 32, letterSpacing: -0.3 },
  h2: { fontFamily: fonts.bold, fontSize: 20, lineHeight: 26 },
  h3: { fontFamily: fonts.medium, fontSize: 17, lineHeight: 22 },
  body: { fontFamily: fonts.regular, fontSize: 15, lineHeight: 22 },
  bodyLight: { fontFamily: fonts.light, fontSize: 15, lineHeight: 22 },
  caption: { fontFamily: fonts.regular, fontSize: 13, lineHeight: 18 },
  small: { fontFamily: fonts.light, fontSize: 12, lineHeight: 16 },
  button: { fontFamily: fonts.medium, fontSize: 16, lineHeight: 20 },
  amount: { fontFamily: fonts.bold, fontSize: 56, lineHeight: 60, letterSpacing: -1 },
};
