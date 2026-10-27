# FUX

Step-by-step build guides (tactical lime / black / red). Live at `https://davesaul303.github.io/pullerup/fux/`.

## Add a guide

1. Copy `guides/door-alarm-shield.js` as `guides/<id>.js`.
2. Set `window.FUX_GUIDE = { id: "<id>", title, summary, category, difficulty, time, partsCount, parts, tools, sections, diagrams, code, ... }`.
3. Add a card to `guides/catalog.js` (`window.FUX_CATALOG`).
4. Open `guide.html?id=<id>` — the page loads `guides/<id>.js` automatically.

Unknown search on the home page shows **No guide yet — Send to Kaserin**.
