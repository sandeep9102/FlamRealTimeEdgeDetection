# 📸 Screenshots

This folder contains screenshots of the Edge Detection Viewer application.

## 📱 Android App Screenshots

### Required Screenshots

1. **android-raw-feed.png** - Raw camera feed mode
   - Shows live camera preview
   - FPS counter visible
   - Processing time displayed
   - Mode indicator shows "Raw Feed"

2. **android-edge-detected.png** - Edge detection mode
   - Shows Canny edge detection output
   - Clear edge visualization
   - FPS counter visible
   - Mode indicator shows "Edge Detected"

3. **android-ui-overview.png** - Full UI overview
   - Shows complete interface
   - Control panel visible
   - Statistics display
   - Toggle button

### Optional Screenshots

4. **android-different-scenes.png** - Various scenes
   - Different lighting conditions
   - Various objects
   - Edge detection quality

## 🌐 Web Viewer Screenshots

### Required Screenshots

1. **web-viewer-main.png** - Main interface
   - Canvas with frame displayed
   - Statistics dashboard
   - Control buttons
   - Modern UI design

2. **web-viewer-stats.png** - Statistics panel
   - FPS display
   - Processing time
   - Frame count
   - Mode indicator

### Optional Screenshots

3. **web-viewer-responsive.png** - Mobile view
   - Responsive design on mobile
   - Touch-friendly controls

## 📷 How to Take Screenshots

### Android Device

**Method 1: Physical Buttons**
- Press **Power + Volume Down** simultaneously
- Screenshot saved to Gallery

**Method 2: Android Studio**
- Run app on emulator
- Click camera icon in emulator toolbar
- Screenshot saved to desktop

**Method 3: ADB**
```bash
adb shell screencap -p /sdcard/screenshot.png
adb pull /sdcard/screenshot.png
```

### Web Viewer

**Method 1: Browser DevTools**
- Open web viewer in browser
- Press **F12** to open DevTools
- Press **Ctrl+Shift+P** (Windows) or **Cmd+Shift+P** (Mac)
- Type "screenshot" and select "Capture full size screenshot"

**Method 2: Browser Extension**
- Install screenshot extension (e.g., "Awesome Screenshot")
- Click extension icon
- Select "Capture visible part"

**Method 3: OS Screenshot**
- **Windows**: Press **Win + Shift + S**
- **Mac**: Press **Cmd + Shift + 4**
- **Linux**: Press **PrtScn** or use Screenshot tool

## 🎨 Screenshot Guidelines

### Quality
- **Resolution**: At least 1080p
- **Format**: PNG (preferred) or JPG
- **File size**: Keep under 2MB each

### Content
- Show the app in action
- Include UI elements clearly
- Demonstrate key features
- Good lighting (for camera screenshots)

### Naming Convention
```
android-[feature]-[optional-description].png
web-[feature]-[optional-description].png
```

Examples:
- `android-raw-feed.png`
- `android-edge-detected-outdoor.png`
- `web-viewer-main.png`
- `web-viewer-stats-panel.png`

## 📝 Adding Screenshots to README

After taking screenshots, update the main README.md:

```markdown
## 📸 Screenshots

### Android Application

<div align="center">
  <img src="screenshots/android-raw-feed.png" width="250" alt="Raw Feed"/>
  <img src="screenshots/android-edge-detected.png" width="250" alt="Edge Detection"/>
  <img src="screenshots/android-ui-overview.png" width="250" alt="UI Overview"/>
</div>

### Web Viewer

<div align="center">
  <img src="screenshots/web-viewer-main.png" width="400" alt="Web Viewer"/>
  <img src="screenshots/web-viewer-stats.png" width="400" alt="Statistics"/>
</div>
```

## ✅ Screenshot Checklist

Before submission, ensure you have:

- [ ] At least 2 Android app screenshots
- [ ] At least 1 web viewer screenshot
- [ ] Screenshots are clear and high quality
- [ ] Screenshots show key features
- [ ] Screenshots are properly named
- [ ] README.md updated with screenshot links
- [ ] All screenshots committed to Git

## 🎬 Optional: Demo Video/GIF

Consider creating a short demo:

### GIF (Recommended)
- Use **ScreenToGif** (Windows) or **LICEcap** (Mac/Linux)
- Record 10-15 seconds
- Show toggle functionality
- Keep file size under 10MB

### Video
- Use **OBS Studio** or phone screen recording
- Record 30-60 seconds
- Upload to YouTube or Google Drive
- Add link to README

Example:
```markdown
## 🎬 Demo

![Demo](screenshots/demo.gif)

Or watch the full video: [YouTube Link](https://youtube.com/...)
```

## 📊 Example Layout

Your screenshots folder should look like:

```
screenshots/
├── README.md (this file)
├── android-raw-feed.png
├── android-edge-detected.png
├── android-ui-overview.png
├── web-viewer-main.png
├── web-viewer-stats.png
└── demo.gif (optional)
```

## 🚀 Quick Commands

### Optimize Screenshots (Optional)

```bash
# Install ImageMagick (if needed)
# Windows: choco install imagemagick
# Mac: brew install imagemagick
# Linux: sudo apt install imagemagick

# Resize to max width 1920px
magick android-raw-feed.png -resize 1920x android-raw-feed.png

# Compress PNG
magick android-raw-feed.png -quality 85 android-raw-feed.png
```

---

**Note**: Screenshots make your submission much more impressive and help evaluators understand your implementation quickly!
