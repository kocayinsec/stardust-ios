# IAP Store Setup Checklist (Stardust)

Use this checklist to configure subscriptions in App Store Connect + Google Play and keep identifiers in sync with the app.

## 1) App identifiers (must match app.json)
- iOS bundle identifier: `com.anonymous.stardust-app`
- Android package: `com.anonymous.stardustapp`

> If you change either identifier, update `app.json` **and** re-create the app entry in the store console.

## 2) Product ID planning (shared naming)
Define consistent IDs across both stores. Example:
- `stardust_gold_monthly`
- `stardust_gold_yearly`

Notes:
- IDs are case-sensitive and must match exactly what the app uses.
- Avoid renaming IDs after release (creates a new product).
- Keep a single source of truth in code/constants for IAP product IDs.

## 3) App Store Connect (iOS)
- Create app entry with the bundle identifier.
- Navigate to **Subscriptions** and create a **Subscription Group** (e.g., “Stardust Gold”).
- Create products for each plan using the IDs above.
- Fill pricing, localization, screenshots, and review info.
- Add App Store review notes on how to access subscription features.
- For testing: create **Sandbox Testers** and test on TestFlight builds.

## 4) Google Play Console (Android)
- Create app entry with the package name.
- Go to **Monetize → Products → Subscriptions**.
- Create subscription products with the same IDs.
- Define base plans, offers, pricing, and regions.
- Add license testers under **Settings → License testing**.
- For testing: upload an internal testing build and verify purchases.

## 5) Build + verification
- Build with EAS (recommended) or local builds.
- Ensure the app reads product IDs from a central constant.
- Verify purchase flow on both platforms (sandbox/ tester accounts).
- Confirm receipts are returned and UI unlocks expected entitlements.
