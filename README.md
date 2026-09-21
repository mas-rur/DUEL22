# DUEL22 — React Native App (v1 prototype)

A dark-mode, blockchain-powered wallet + remittance + P2P app, built with Expo.
This is a fully wired, navigable **UI prototype**: every screen, flow, and
animation works, running on mock local data. It is **not** yet connected to
a real backend, Solana, or Google OAuth — see "What's real vs. mocked" below.

Maps to the DUEL22 PRD: multi-currency wallet, cross-border remittance,
P2P transfers, recipient verification before sending, and transparent
network-fee-only pricing (no hidden charges).

## Build in the cloud with EAS (your connected Expo account)

I can't run this step myself — it needs your Expo login session and network
access, neither of which this sandbox has. Run these on your machine, from
inside the project folder:

```bash
npm install -g eas-cli      # skip if already installed
eas login                   # uses your connected Expo account
eas build:configure         # links this project to your Expo account (writes a projectId into app.json)
eas build --platform android --profile preview   # cloud build -> installable .apk
```

`eas.json` (already included) defines two profiles:
- **preview** — builds a `.apk` you can sideload straight onto a phone or share for testing. This is the one to use first.
- **production** — builds an `.aab` for the Play Store; follow with `eas submit --platform android` to upload it.

The build runs entirely on Expo's servers — you'll get a QR code / download
link in the terminal when it's done (usually 10–20 min).

## Setup

Because package versions drift over time, the most reliable way to run this
is to scaffold a fresh Expo app and copy this project's source into it —
that guarantees every dependency matches your installed Expo CLI version.

**Recommended:**
```bash
npx create-expo-app@latest DUEL22 --template blank
cd DUEL22
# copy in this project's src/, assets/, App.js (overwrite the generated App.js)
npx expo install @react-navigation/native @react-navigation/native-stack \
  @react-navigation/bottom-tabs react-native-screens react-native-safe-area-context \
  expo-linear-gradient expo-font expo-splash-screen
npx expo start
```

**Direct install** (uses the versions pinned in `package.json`; run
`npx expo install --fix` afterwards if Expo flags any mismatches):
```bash
npm install
npx expo start
```

Then press `i` for iOS simulator, `a` for Android emulator, or scan the QR
code with the Expo Go app on your phone.

## Project structure

```
App.js                     entry point — loads fonts, sets up navigation
src/
  theme/                   colors, typography, spacing tokens
  components/              reusable UI: buttons, avatar, keypad,
                            AnimatedCounter, NotificationBell, etc.
  data/mockData.js          wallet balance, contacts, transaction history
  navigation/               RootNavigator, MainTabs, SendNavigator
  screens/
    onboarding/             3-slide welcome carousel
    auth/                   Login (Google/email), KYC permissions screen
    home/                   Wallet dashboard
    send/                   Recipient -> Amount -> Confirm -> Success
    activity/               Transaction history
    profile/                Account & settings
```

## What's real vs. mocked

| Area | Status |
|---|---|
| Navigation, screens, animations | Fully working |
| Wallet balance, contacts, transactions | Mock data (`src/data/mockData.js`) |
| Google Sign-In | UI only — wire up Google Identity Services + backend JWT verification per PRD §07 |
| KYC | UI only — plug in a real provider (Onfido, Sumsub, etc.) |
| Sending money / on-chain settlement | Simulated with a timeout — replace with real Solana + ledger calls |
| Network fee | Hardcoded at $0.02 for the prototype — pull the live network fee at send time |

## Assets

`assets/images/icon.png`, `adaptive-icon.png`, `favicon.png`, and
`splash.png` are generated from your real logo files (the monogram mark for
the icon, the DUEL22 wordmark for the splash screen), composited onto the
brand's navy glow background. Swap them for final exports from your
designer any time — same filenames, same expected sizes (1024×1024 for
icons, 1200×1200 for splash).

## Design notes

- **Theme**: dark navy/black base (`#060B14`) with a two-tone blue → green
  glow, used once per screen as a deliberate accent (see `GradientGlow`) —
  not scattered across every card.
- **Animated counter / notification bell**: built on React Native's core
  `Animated` API (`src/components/AnimatedCounter.js`,
  `NotificationBell.js`) — no extra animation library required, so nothing
  new to install.
- **Recipients are selected by contact/username, never a raw wallet
  address** — matches the PRD's non-custodial-address principle.
- **Send confirmation screen** shows the verified recipient, the exact
  network fee (and nothing hidden), and the amount they'll receive —
  the person can confirm and send immediately, or go back to double-check.
  First-time recipients get an optional small test-transfer step.

## Next steps

- Wire up real auth (Google OAuth + backend session JWT).
- Replace `mockData.js` with real wallet/transaction API calls.
- Integrate Solana settlement for external/cross-border transfers.
- Add the full dispute/recovery workflow from the PRD's Phase 2 roadmap.
