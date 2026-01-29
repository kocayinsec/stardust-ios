# Self-Commerce / Stardust AI — Task Backlog

## How to work this file (agent)
- Pick the top unchecked item.
- Do the work.
- Mark it [x] and append a short result note.
- If you discover new follow‑ups, add them under **New Tasks**.
- Stop after ~4 hours and report back.

## Backlog (priority)
- [x] Polish pass: subtle haptics + feedback states across onboarding/dashboard; refine onboarding→dashboard transition. (Added onboarding transition veil + replace nav, fade stack animation, haptic arrival cue, and pressed feedback on reading cards.)
- [x] Polish pass: haptic hooks, refined button feedback, smoother scroll/entry animations. (Added haptics on key actions/focus, pressed states on CTAs, smooth auto-scroll for chat, and refreshed entry motion timing.)
- [x] **URGENT: Redesign Onboarding (Premium Vibe).** The current one is too basic. Make it look expensive: (Added layered mystical gradient + glow orbs, animated entry fade/slide, glassmorphism inputs w/ focus state, and Star Seed ID reveal animation.)
    - Use a full-screen, high-quality mystical background image (or complex gradient).
    - Animate the entry (fade-in, slide-up).
    - Use better input fields (glassmorphism with active states).
    - Add a "reveal" animation when generating the Star Seed ID.
- [x] Add monetization mockups (Stardust Gold upsell card). (Added Gold upsell card on Dashboard with badge, perks list, pricing row, and CTA.)
- [x] (Optional) Load a custom serif font with expo-font for consistent typography across platforms. (Added Cormorant Garamond font asset, expo-font loader, TypographyProvider with fallback.)

## Completed
- [x] Polish micro-animations + premium UI refinements across onboarding/dashboard/oracle. (Added floating card halo, staggered entrances, pulsing button glows, message bubble entrance animation, and richer glow/shadow tuning.)
- [x] Implement Energy Meter (core hook) on Dashboard. (Added animated EnergyMeter component with pulsing ring/segments/orbit + Daily Readings cards in ethereal gradient styling.)
- [x] Implement Oracle Chat behavior mock + daily free question gating. (Added mock oracle responses, daily 3-question UI gating, limit banner, and Stardust Gold upsell card.)
- [x] Implement arcane + ethereal signature elements. (Added Living Nebula animated background, Constellation Sigil motion layer, and Cosmic Seal reveal styling.)
- [x] Fix/verify Expo dependencies and run app locally once. (Aligned react-native-screens to ~4.16.0; expo-doctor clean; Metro booted)
- [x] Add “AI Oracle Chat” screen (UI only, no backend yet). (Added OracleChat screen + navigation entry + CTA on dashboard)
- [x] Add a subtle animated starfield background component (reuse on both screens). (Added reusable Starfield component with twinkle animation on Dashboard + Oracle Chat)
- [x] Polish typography: add a serif title font + consistent spacing. (Introduced Georgia-based title font + typography helpers; aligned title/subtitle spacing and body text usage)
