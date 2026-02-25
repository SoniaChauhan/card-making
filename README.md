# 🎴 Card Maker

A beautiful browser-based **invitation card maker** built with React JS (no build tools needed). Generate personalised cards for three occasions, fill in a form, preview the card, and download it as a PNG straight to your Downloads folder.

## ✨ Features

- **3 beautifully themed card types:**
  - 🎂 Birthday Card – balloons, cake, confetti
  - 💍 Marriage Anniversary Card – roses, rings, romantic design
  - 🪔 Khatushyam Ji Jagrata Card – saffron/gold spiritual theme with Hindi text
- **Smart input forms** for each card type with validation
- **Guest personalisation** – every card addressed to the specific guest
- **Venue & event details** displayed on the card
- **1-click PNG download** via `html2canvas`
- **Fully client-side** – no server, no build step, no dependencies to install

## 📁 Project Structure

```
card-maker/
├── BirthdayCard.html              ← Main entry point (CSS + App shell)
└── components/
    ├── BirthdayCard.js            ← Birthday card component
    ├── AnniversaryCard.js         ← Anniversary card component
    └── JagrataCard.js             ← Khatushyam Jagrata card component
```

## 🚀 How to Run

> Because the app loads multiple JS files, you need to serve it over HTTP (not `file://`).

### Option 1 – VS Code Live Server (recommended)
1. Install the **Live Server** extension in VS Code
2. Open `BirthdayCard.html`
3. Right-click → **"Open with Live Server"**
4. Visit `http://127.0.0.1:5500/BirthdayCard.html`

### Option 2 – Python (if you have Python installed)
```bash
cd "path/to/card-maker"
python -m http.server 5500
# then open http://localhost:5500/BirthdayCard.html
```

### Option 3 – GitHub Pages
Enable GitHub Pages (source: `main` branch, root `/`) and visit:
`https://SoniaChauhan.github.io/card-making/BirthdayCard.html`

## 🛠 Tech Stack

| Technology | Purpose |
|------------|---------|
| React 18 (CDN) | UI components & state |
| Babel Standalone (CDN) | JSX transpilation in browser |
| html2canvas (CDN) | Card → PNG download |
| Pure CSS | Animations, themes, responsive layout |

## 📋 Form Fields per Card

| Card | Key Inputs |
|------|-----------|
| 🎂 Birthday | Guest name, birthday person, age, date, venue, address, message |
| 💍 Anniversary | Guest name, partner 1 & 2, years, date, time, venue, message |
| 🪔 Jagrata | Guest name, organizer, jagrata title, purpose, date, time, venue, prasad, message |

## 📄 License

MIT — free to use and modify.
