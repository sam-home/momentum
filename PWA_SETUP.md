# PWA - Progressive Web App Setup Guide

## Was wurde implementiert?

### 1. **4 Lebensbereiche mit schönem Design**
- Training 🏋️ (Blau-Lila Gradient)
- Ernährung 🥗 (Pink-Rot Gradient)
- Arbeit 💼 (Cyan Gradient)
- Frauen 👩 (Rosa-Gelb Gradient)

Jeder Bereich hat sein eigenes Farbschema und ein Icon zur visuellen Kennzeichnung.

### 2. **Datums-Navigation mit Swipe**
- Das aktuelle Datum wird oben angezeigt (z.B. "Mittwoch, 22. Mai 2026")
- Wische nach **rechts** um zum **vorherigen Tag** zu gehen
- Wische nach **links** um zum **nächsten Tag** zu gehen
- Auto-Erkennung von "Heute"
- Responsive Touch-Events für Mobile

### 3. **Progressive Web App (PWA)**

#### Offline-Funktionalität
- Service Worker registriert automatisch beim Starten
- Cache-first Strategie für bessere Performance
- App funktioniert offline
- Automatische Cache-Aktualisierung

#### Installation auf dem Gerät

**Chrome / Edge / Firefox:**
```
1. Adressleiste → Menü (⋮)
2. "App installieren" klicken
3. Bestätigen
```

**iPhone / iPad (Safari):**
```
1. Safari starten
2. App laden
3. Share-Button → "Zum Home-Bildschirm"
```

**Android:**
```
1. Chrome / Firefox starten
2. Adressleiste → Menü
3. "App installieren"
```

#### Manifest.json
Die PWA-Konfiguration ist in `public/manifest.json` definiert mit:
- App-Name und beschreibung
- Icons für verschiedene Größen
- Display-Modus: `standalone` (App-ähnliche UI ohne Browser-Tabs)
- Theme-Farbe: `#667eea`
- Offline-Unterstützung

### 4. **Zahnrad-Icon (⚙️) für Einstellungen**
- Vorbereitet in jedem Bereich (oben rechts)
- Noch nicht funktional (Platzhalter für zukünftige Features)
- Können später mit Einstellungslogik implementiert werden

### 5. **Bootstrap 5 Integration**
- Responsive Design
- Grid-System für Layouts
- Card-Components für Bereiche
- Badge für "Heute"-Anzeige
- Touch-friendly Button und Spacing

### 6. **Date-fns für Datum-Handling**
- Deutsche Lokalisierung (Montag statt Monday)
- Einfache Datums-Arithmetik (addDays, subDays)
- formatDate mit locale-Support

## Dateistruktur

```
momentum/
├── src/
│   ├── App.tsx              # Main App Component mit 4 Bereichen
│   ├── App.css              # Styling für die App
│   ├── index.tsx            # Entry Point mit Service Worker
│   ├── index.css            # Globale Styles für PWA
│   ├── serviceWorkerRegistration.ts  # PWA Service Worker Registry
│   └── ... (weitere React Files)
├── public/
│   ├── index.html           # PWA Meta Tags
│   ├── manifest.json        # PWA Konfiguration
│   ├── service-worker.js    # Service Worker für Caching
│   └── ... (Icons & weitere Assets)
├── package.json             # Dependencies
└── PWA_FEATURES.md         # Dieses Dokument
```

## NPM Scripts

```bash
# Entwicklungsserver starten (http://localhost:3000)
npm start

# Production Build erstellen
npm run build

# Tests ausführen
npm test

# TypeScript überprüfen
npx tsc --noEmit
```

## Verwendete Dependencies

```json
{
  "react": "^19.2.6",           // UI Framework
  "react-dom": "^19.2.6",       // React DOM Rendering
  "bootstrap": "^5.3.3",        // CSS Framework
  "date-fns": "^3.3.1",         // Datums-Utilities
  "typescript": "^4.9.5",       // Type Safety
  "react-scripts": "5.0.1"      // Build Tools
}
```

## Nächste Schritte & TODOs

### Funktionalität erweitern
- [ ] Lokale Speicherung für Bereichs-Daten (localStorage/IndexedDB)
- [ ] Bearbeitung von Einträgen für jeden Bereich
- [ ] Zahnrad-Icon (⚙️) Funktionalität implementieren
- [ ] Einstellungen pro Bereich

### Features hinzufügen
- [ ] Benachrichtigungen (Notifications API)
- [ ] Dark Mode
- [ ] Spracheinstellungen
- [ ] Statistiken und Auswertungen
- [ ] Synchronisierung über Cloud
- [ ] Export/Import Daten

### PWA Features
- [ ] Background Sync
- [ ] Push Notifications
- [ ] Splash Screen
- [ ] App Shortcuts

### Design & UX
- [ ] Animations & Transitions
- [ ] Loading States
- [ ] Error Handling UI
- [ ] Accessibility (a11y) Improvements
- [ ] Mobile Keyboard anpassen

## Browser Kompatibilität

| Browser | Version | PWA Support |
|---------|---------|-------------|
| Chrome | 65+ | ✅ Vollständig |
| Firefox | 60+ | ✅ Vollständig |
| Safari | 12.1+ | ✅ Eingeschränkt |
| Edge | 79+ | ✅ Vollständig |
| Opera | 52+ | ✅ Vollständig |
| Android Browser | 67+ | ✅ Vollständig |

## Performance Tipps

- Service Worker cached auch bei Offline automatisch
- Bilder werden beim ersten Laden gecacht
- Sehr schnelle Ladezeit nach Installation
- Minimale Netzwerk-Requests

## Deployment

### Vercel (Empfohlen)
```bash
npm run build
# Vercel CLI
vercel --prod
```

### Netlify
```bash
npm run build
# Ziehe build/ auf Netlify
```

### Eigener Server (Firebase, AWS S3, etc.)
Stelle sicher, dass:
- HTTPS verwendet wird (erforderlich für Service Worker)
- Correct MIME types gesetzt sind
- manifest.json zugänglich ist
- service-worker.js mit berechtigtem Cache-Control Header ist

## Debuggen

### Service Worker Debug
```javascript
// Im Browser Console:
navigator.serviceWorker.ready.then(reg => {
  console.log('Service Worker:', reg);
});

// Cache ansehen
caches.keys().then(names => {
  console.log('Cached resources:', names);
});
```

### PWA Audit (Chrome DevTools)
1. Developer Tools öffnen (F12)
2. Lighthouse Tab
3. "Generate report" klicken
4. PWA Audit durchführen

## Hilfreiche Links

- [MDN PWA Docs](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps)
- [Web App Manifest](https://developer.mozilla.org/en-US/docs/Web/Manifest)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
- [Bootstrap Docs](https://getbootstrap.com/docs)
- [date-fns Docs](https://date-fns.org/)

## Support & Kontakt

Falls du Fragen hast oder ein Feature hinzufügen möchtest, bitte ein Issue erstellen!

---

**Viel Spaß mit deinem Momentum Trainer!** 🚀

