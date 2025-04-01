# FPV & Bike Website

Webstránka pre nadšencov FPV dronov a cyklotrás. Táto aplikácia umožňuje užívateľom prezerať, zdieľať a komentovať FPV a cyklistické videá.

## Funkcie

- Prezeranie FPV a cyklistických videí
- Detail videa s lokáciou na mape
- Systém komentárov
- Kontaktný formulár
- Responzívny dizajn pre mobilné zariadenia aj desktop

## Technológie

- React
- React Router
- Tailwind CSS
- React Icons

## Inštalácia

Keďže v systéme nie je nainštalovaný Node.js, táto dokumentácia predpokladá, že nainštalujete potrebné závislosti manuálne.

1. Nainštalujte Node.js a npm z [oficiálnej stránky](https://nodejs.org/)
2. Klonujte repozitár:
   ```
   git clone https://github.com/vasucenik/fpv-bike-website.git
   cd fpv-bike-website
   ```
3. Nainštalujte závislosti:
   ```
   npm install
   ```
4. Spustite vývojový server:
   ```
   npm run dev
   ```

## Vývoj

Projekt bol vytvorený pomocou Vite, ktorý umožňuje rýchly vývoj s podporou hot module replacementu (HMR).

### Štruktúra projektu

```
src/
├── assets/        # Obrázky, fonty a iné statické súbory
├── components/    # React komponenty
├── pages/         # Stránky aplikácie
├── App.jsx        # Hlavný komponent s routovaním
├── main.jsx       # Vstupný bod aplikácie 
└── index.css      # Globálne štýly a Tailwind direktívy
```

## Nasadenie

Pre build aplikácie do produkcie:

```
npm run build
```

Výsledné súbory sú vo zložke `dist/`, ktoré môžete nasadiť na váš server alebo hostingové služby ako Netlify, Vercel alebo GitHub Pages.

## Ďalší vývoj

- Pridanie autentifikácie a užívateľských profilov
- Implementácia vyhľadávania videí
- Integrácia Google Maps/Mapy.cz API pre detailné zobrazenie lokácií
- Možnosť nahrávať vlastné videá
- Kategórie a filtrovanie videí 