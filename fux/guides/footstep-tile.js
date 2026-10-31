window.FUX_GUIDE = {
  "id": "footstep-tile",
  "title": "Footstep Power Tile",
  "summary": "Build a tiny piezo floor tile: step → electricity → LED flash. Same idea as train-station energy tiles, desk-sized.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "1–2 hr",
  "partsCount": 10,
  "pullerup": "../parts/footstep-tile.html",
  "beforeYouStart": "Wash hands after handling piezos. Do not connect raw piezo wires to Arduino pins. Cap stripe = negative. Long LED leg = +.",
  "tips": {},
  "parts": [
    "4× piezo discs with wires",
    "4× 1N4001 diodes (bridge)",
    "1× 100µF 16V capacitor",
    "1 LED from kit",
    "Cardboard / thin wood ×2",
    "Foam strips",
    "Jumpers / solder",
    "Tape"
  ],
  "tools": [
    "Soldering iron (or twist+heat-shrink)",
    "Scissors / craft knife (adult help)",
    "Safety glasses"
  ],
  "specs": [
    [
      "Piezos",
      "4 in parallel"
    ],
    [
      "Rectifier",
      "4× 1N4001 bridge"
    ],
    [
      "Storage",
      "100µF 16V"
    ],
    [
      "Output",
      "LED flash on step"
    ]
  ],
  "code": "// No code for the basic flash tile.\n// Optional later: measure voltage on Arduino ONLY through a\n// divider + clamp — never raw piezo to a pin.\n",
  "diagrams": {
    "idea": "<svg viewBox=\"0 0 860 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"FOOTSTEP TILE — PRESS → SPARK → LIGHT\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"860\" height=\"340\" fill=\"#030503\"/><rect width=\"860\" height=\"340\" fill=\"url(#g)\"/>\n<text x=\"430\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">FOOTSTEP TILE — PRESS → SPARK → LIGHT</text>\n<rect x=\"40\" y=\"70\" width=\"180\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"130\" y=\"130\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">STEP</text><text x=\"130\" y=\"155\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">pressure</text><line x1=\"220\" y1=\"140\" x2=\"300\" y2=\"140\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect x=\"300\" y=\"70\" width=\"180\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"390\" y=\"125\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PIEZO</text><text x=\"390\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">makes voltage</text><line x1=\"480\" y1=\"140\" x2=\"560\" y2=\"140\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect x=\"560\" y=\"70\" width=\"120\" height=\"140\" rx=\"6\" fill=\"rgba(184,255,60,.08)\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"620\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><text x=\"430\" y=\"260\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Like Shibuya floor tiles — tiny version on your desk.</text><text x=\"430\" y=\"300\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: piezo spikes can be high — use the diode path.</text>\n</svg>",
    "circuit": "<svg viewBox=\"0 0 900 380\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SAFE CIRCUIT — RECTIFY · STORE · GLOW\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"900\" height=\"380\" fill=\"#030503\"/><rect width=\"900\" height=\"380\" fill=\"url(#g)\"/>\n<text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SAFE CIRCUIT — RECTIFY · STORE · GLOW</text>\n<rect x=\"40\" y=\"80\" width=\"160\" height=\"120\" rx=\"6\" fill=\"#0c110c\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"120\" y=\"140\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">4× PIEZO</text><text x=\"120\" y=\"165\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">parallel</text><line x1=\"200\" y1=\"140\" x2=\"280\" y2=\"140\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect x=\"280\" y=\"70\" width=\"200\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"380\" y=\"120\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BRIDGE</text><text x=\"380\" y=\"145\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">4× 1N4001</text><text x=\"380\" y=\"170\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">AC → DC</text><line x1=\"480\" y1=\"120\" x2=\"560\" y2=\"120\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect x=\"560\" y=\"60\" width=\"140\" height=\"80\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"630\" y=\"105\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">100µF</text><text x=\"630\" y=\"125\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"10\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">+ stripe</text><line x1=\"630\" y1=\"140\" x2=\"630\" y2=\"200\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><rect x=\"560\" y=\"200\" width=\"140\" height=\"80\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"630\" y=\"245\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><text x=\"450\" y=\"320\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Long LED leg toward + of the capacitor. Cap stripe = − / GND side.</text><text x=\"450\" y=\"350\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Never wire raw piezo straight into an Arduino pin.</text>\n</svg>",
    "tile": "<svg viewBox=\"0 0 800 320\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"TILE SANDWICH\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"320\" fill=\"#030503\"/><rect width=\"800\" height=\"320\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TILE SANDWICH</text>\n<rect x=\"100\" y=\"60\" width=\"600\" height=\"50\" rx=\"6\" fill=\"#0c110c\" stroke=\"#7a8a76\" stroke-width=\"2\"/><text x=\"400\" y=\"90\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TOP BOARD (cardboard / thin wood)</text><rect x=\"140\" y=\"130\" width=\"520\" height=\"60\" rx=\"6\" fill=\"rgba(79,195,247,.12)\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"400\" y=\"165\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PIEZOS + FOAM SPACERS</text><rect x=\"100\" y=\"210\" width=\"600\" height=\"50\" rx=\"6\" fill=\"#0c110c\" stroke=\"#7a8a76\" stroke-width=\"2\"/><text x=\"400\" y=\"240\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BOTTOM BOARD</text><text x=\"400\" y=\"290\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Step on top — discs flex — voltage pops out.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "idea",
      "title": "1. What you are copying",
      "diagram": "idea",
      "steps": [
        {
          "title": "The big idea",
          "action": "Pressure bends a piezo crystal → voltage pops out.",
          "why": "Same trick as Shibuya energy tiles, just tiny.",
          "diagram": "idea"
        },
        {
          "title": "Our goal",
          "action": "Step on a sandwich board and see an LED flash.",
          "from": "Foot",
          "to": "LED flash"
        }
      ]
    },
    {
      "id": "circuit",
      "title": "2. Safe flash circuit",
      "diagram": "circuit",
      "callout": {
        "tone": "danger",
        "lead": "SPIKES",
        "text": "Piezos can make high voltage spikes. Use diodes + capacitor. Do not feed raw piezo into the Uno."
      },
      "steps": [
        {
          "title": "Build a diode bridge",
          "action": "Make a bridge from 4× 1N4001 (band = cathode). AC corners get piezo wires; + and − corners feed the cap.",
          "warn": "WATCH OUT: diode band marks the cathode — match the drawing.",
          "diagram": "circuit"
        },
        {
          "title": "Parallel the piezos",
          "action": "Twist all piezo reds together and all blacks together. That pair goes to the bridge AC corners.",
          "from": "4 piezos",
          "to": "bridge AC"
        },
        {
          "title": "Cap polarity",
          "action": "Cap + (longer leg / no stripe) to bridge +. Cap − (stripe) to bridge −.",
          "warn": "WATCH OUT: reverse cap can puff or fail."
        },
        {
          "title": "LED across the cap",
          "action": "LED long leg to cap +. Short leg to cap − (optionally through a 220Ω).",
          "from": "Cap +",
          "to": "LED → Cap −",
          "check": "c1"
        }
      ]
    },
    {
      "id": "tile",
      "title": "3. Build the sandwich",
      "diagram": "tile",
      "steps": [
        {
          "title": "Cut boards",
          "action": "Cut two stiff squares (~15 cm). Adult help with knives.",
          "warn": "WATCH OUT: sharp tools — adult nearby."
        },
        {
          "title": "Foam edges",
          "action": "Glue foam strips on the bottom board edges so the top can flex.",
          "diagram": "tile"
        },
        {
          "title": "Place piezos",
          "action": "Tape 4 piezos flat in the middle so they flex when pressed."
        },
        {
          "title": "Route wires out",
          "action": "Bring the joined leads out one side to your bridge board."
        },
        {
          "title": "Top board on",
          "action": "Set the top board on the foam."
        },
        {
          "title": "Step test",
          "action": "Firm step or press. LED should blink.",
          "warn": "WATCH OUT: firm press is enough — don't smash the discs.",
          "check": "t1"
        },
        {
          "title": "Wash hands",
          "action": "Wash hands after handling piezos (some ceramics contain lead compounds)."
        }
      ]
    }
  ]
};
