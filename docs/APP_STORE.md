# App Store Assets — Checklist & Specs (iOS)

Use this as the source of truth for App Store Connect assets. Keep actual files in `assets/app-store/`.

## ✅ Required Assets (Apple)

### 1) App Icon (App Store)
- **Size:** 1024 × 1024 px
- **Format:** PNG (no alpha), RGB
- **File:** `assets/app-store/icon/app-icon-1024.png`

### 2) Screenshots (App Store Connect)
- **Format:** PNG or JPEG, **no alpha**, RGB
- **Count:** 3–10 per device size (Apple will accept fewer, but aim for 5–8)
- **Locale:** Create per language if localized (default: en-US)

**Target device sizes (recommended minimum set):**
- **6.7" iPhone:** 1290 × 2796 px
- **6.5" iPhone:** 1242 × 2688 px
- **5.5" iPhone:** 1242 × 2208 px (legacy, optional if using 6.5/6.7)
- **iPad 12.9":** 2048 × 2732 px (if iPad app)
- **iPad 11":** 1668 × 2388 px (if iPad app)

**Optional / alternative sizes (acceptable):**
- **6.1" iPhone:** 1179 × 2556 px (iPhone 15/14 Pro) or 1170 × 2532 px (iPhone 13/14)

> Apple will resize within a size class, but use exact pixels above to avoid rejection.

### 3) Splash / Launch Image (for app runtime)
- **Not an App Store Connect upload**, but keep here for design consistency.
- **Expo config:** ensure `app.json` has `splash.image` and appropriate sizes.
- **File:** `assets/app-store/splash/splash-portrait.png`
- **Recommended size:** 2048 × 2732 px or 2732 × 2732 (safe square for scaling)

---

## File Structure (Repo)
```
assets/
  app-store/
    icon/
      app-icon-1024.png
    splash/
      splash-portrait.png
    screenshots/
      iphone-6.7/
        01.png ... 08.png
      iphone-6.5/
        01.png ... 08.png
      iphone-6.1/
        01.png ... 08.png
      iphone-5.5/
        01.png ... 08.png
      ipad-12.9/
        01.png ... 08.png
      ipad-11/
        01.png ... 08.png
```

---

## Checklist (TODOs)

### App Icon
- [ ] Design final 1024×1024 app icon (no transparency)
- [ ] Export `app-icon-1024.png`
- [ ] Update `app.json` if needed

### Screenshots (iPhone)
- [ ] Decide screenshot script (6–8 frames)
- [ ] Capture at 6.7" (primary)
- [ ] Resize/export for 6.5" (if needed)
- [ ] Optional legacy 5.5"

### Screenshots (iPad)
- [ ] Capture at 12.9" (primary)
- [ ] Export for 11" (optional)

### Splash
- [ ] Final splash artwork
- [ ] Export `splash-portrait.png`
- [ ] Verify in Expo `app.json`

---

## Notes
- Keep filenames numbered for easy upload order.
- Use consistent typography & framing across all screenshots.
- Avoid status bar overlaps or low-contrast text.
- For marketing copy, track separate in App Store Connect.
