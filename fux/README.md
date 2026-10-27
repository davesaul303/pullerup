# FUX

Step-by-step build guides (tactical lime / black / red). Live at `https://davesaul303.github.io/pullerup/fux/`.

## Add a guide

1. Create `guides/<id>.js` with `window.FUX_GUIDE = { id, title, summary, tips, diagrams, sections, ... }`.
2. List it in `guides/catalog.js`.
3. Open `guide.html?id=<id>`.

### Farowt tips (reusable)

```js
tips: {
  hcsr04: {
    name: "HC-SR04 ultrasonic sensor",
    does: "Measures distance with silent sound clicks.",
    job: "Spots someone within about 30 cm of the door."
  }
}
```

SVG hotspot:

```html
<rect class="fux-tip" data-tip="hcsr04" x="..." y="..." width="..." height="..."
  fill="#b8ff3c" fill-opacity="0"/>
```

**Double right-click** a hotspot (context menu suppressed there only). Phones: **double-tap** or **long-press ~1s**. Farowt — an animated cartoon resistor — pops up with a speech bubble and random idle/talk moves (blink, wiggle, bounce, wave, band glow, zap, think, tap-dance, sizzle). Respects `prefers-reduced-motion`.
