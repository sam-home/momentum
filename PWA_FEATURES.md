# Momentum - Lebensbereich Tracker PWA

Eine Progressive Web App zum Verfolgen deiner Fortschritte in vier wichtigen Lebensbereichen: Training, Ernährung, Arbeit und Beziehungen.

## Features

- 📱 **Progressive Web App (PWA)** - Installierbar auf deinem Smartphone
- 🎯 **4 Lebensbereiche** - Training, Ernährung, Arbeit und Frauen
- 📅 **Datums-Navigation** - Wische horizontal um zwischen Tagen zu wechseln
- ⚙️ **Einstellungen-Icons** - Vorbereitet für zukünftige Konfigurationen
- 🎨 **Bootstrap Design** - Responsive und schönes UI
- 🌐 **Offline Support** - Funktioniert auch ohne Internetverbindung
- 📱 **Mobile-First** - Optimiert für Smartphones und Tablets

## Installation & Setup

### Voraussetzungen
- Node.js (v14 oder höher)
- npm oder yarn

### Schritt 1: Abhängigkeiten installieren
```bash
npm install
```

### Schritt 2: Entwicklungsserver starten
```bash
npm start
```

Die App öffnet sich automatisch unter `http://localhost:3000`

### Schritt 3: Als PWA testen

#### Im Chrome/Edge:
1. Öffne die App
2. Klick auf die Adressleiste-Aktion oder das Menü (⋮)
3. Wähle "App installieren"

#### Auf dem iPhone:
1. Öffne die App in Safari
2. Tippe auf das Share-Icon
3. Wähle "Zum Home-Bildschirm"

## Nutzung

### Datums-Navigation
- **Wisch nach rechts** - Gehe zum vorherigen Tag
- **Wisch nach links** - Gehe zum nächsten Tag
- Das aktuelle Datum wird oben angezeigt

### Bereiche
Klick auf einen der vier Bereiche, um ihn zu bearbeiten:
- 🏋️ **Training** - Trainingsaktivitäten
- 🥗 **Ernährung** - Ernährungsplan und Mahlzeiten
- 💼 **Arbeit** - Aufgaben und Projekte
- 👩 **Frauen** - Beziehungen

Das Zahnrad-Icon (⚙️) ist für zukünftige Einstellungen geplant.

## Production Build

```bash
npm run build
```

Dies erstellt einen optimierten Build im `build/`-Verzeichnis.

## Deployment

Die App kann auf verschiedenen Plattformen deployed werden:

### Vercel (empfohlen)
```bash
npm run build
# Deploy den build/ Folder auf Vercel
```

### Netlify
```bash
npm run build
# Ziehe den build/ Folder zu Netlify
```

### GitHub Pages
Aktualisiere `package.json`:
```json
"homepage": "https://username.github.io/momentum"
```

Dann deploye mit:
```bash
npm run build
npm run deploy
```

## Technologien

- **React 19** - UI-Framework
- **TypeScript** - Typsicherheit
- **Bootstrap 5** - CSS-Framework
- **date-fns** - Datums-Utilities
- **Service Workers** - Offline-Fähigkeit
- **PWA** - Progressive Web App

## Zukünftige Features

- ✅ Zahnrad-Einstellungen für jeden Bereich implementieren
- ✅ Datenpeicherung (LocalStorage/IndexedDB)
- ✅ Benachrichtigungen
- ✅ Dark Mode
- ✅ Synchronisierung zwischen Geräten
- ✅ Statistiken und Auswertungen

## Browser Support

- Chrome/Edge 65+
- Firefox 60+
- Safari 12.1+
- Opera 52+
- Android Browser 67+

## PWA Features

Diese App ist eine vollwertige PWA mit:
- Installation auf dem Home-Screen
- Offline-Funktionalität
- Background Sync
- App-ähnliche UI (Vollbild)
- Push Notifications (vorbereitet)

## Lizenz

MIT

## Support

Bei Fragen oder Bugs bitte ein Issue erstellen.

---

**Made with ❤️ für deine Lebensqualität**

