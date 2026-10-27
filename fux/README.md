# FUX

Step-by-step build guides (tactical lime / black / red). Live at `https://davesaul303.github.io/pullerup/fux/`.

## Add a guide

1. Copy `guides/door-alarm-shield.js` pattern as `guides/<id>.js` setting `window.FUX_GUIDE`.
2. Add a card to `guides/catalog.js`.
3. Open `guide.html?id=<id>`.

### Tips (reusable)

In the guide object:

```js
tips: {
  hcsr04: {
    name: "HC-SR04 ultrasonic sensor",
    does: "Measures distance with silent sound clicks.",
    job: "Spots someone within about 30 cm of the door."
  }
}
```

In SVG diagrams, mark hotspots:

```html
<rect class="fux-tip" data-tip="hcsr04" x="..." y="..." width="..." height="..."
  fill="#b8ff3c" fill-opacity="0" style="cursor:help"/>
```

`guide.js` binds: desktop hover 3s, phone press-hold ~1s or tap. Tap empty diagram area to enlarge.
