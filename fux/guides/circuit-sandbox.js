window.FUX_GUIDE = {
  "id": "circuit-sandbox",
  "title": "First Breadboard Circuit",
  "summary": "Build a real button→LED circuit on your breadboard (the physical version of those on-screen sandboxes).",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "30–50 min",
  "partsCount": 6,
  "pullerup": "../parts/circuit-sandbox.html",
  "beforeYouStart": "Learn the breadboard rails. Unplug while wiring. Button uses INPUT_PULLUP to GND.",
  "tips": {},
  "parts": [
    "Elegoo Uno",
    "Breadboard",
    "Pushbutton",
    "LED + 220Ω",
    "Jumpers",
    "USB cable"
  ],
  "tools": [
    "Computer with Arduino IDE"
  ],
  "specs": [
    [
      "Button",
      "D2 to GND, INPUT_PULLUP"
    ],
    [
      "LED",
      "D7 via 220Ω"
    ],
    [
      "Goal",
      "Press = light"
    ]
  ],
  "code": "// First Breadboard Circuit — button lights LED on D7\nconst int BTN = 2;   // button to GND with INPUT_PULLUP\nconst int LED = 7;\n\nvoid setup() {\n  pinMode(BTN, INPUT_PULLUP);\n  pinMode(LED, OUTPUT);\n}\nvoid loop() {\n  // pressed = LOW because pull-up\n  digitalWrite(LED, digitalRead(BTN) == LOW ? HIGH : LOW);\n}\n",
  "diagrams": {
    "board": "<svg viewBox=\"0 0 800 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"BREADBOARD RAILS — QUICK MAP\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"360\" fill=\"#030503\"/><rect width=\"800\" height=\"360\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BREADBOARD RAILS — QUICK MAP</text>\n<rect x=\"60\" y=\"60\" width=\"680\" height=\"60\" rx=\"6\" fill=\"rgba(255,42,109,.1)\" stroke=\"#ff2a6d\" stroke-width=\"2\"/><text x=\"400\" y=\"95\" text-anchor=\"middle\" fill=\"#ff2a6d\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">+ RAIL (red) — power highway</text><rect x=\"60\" y=\"140\" width=\"680\" height=\"60\" rx=\"6\" fill=\"rgba(79,195,247,.1)\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"400\" y=\"175\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">− RAIL (blue) — GND highway</text><rect x=\"60\" y=\"230\" width=\"680\" height=\"80\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LETTER ROWS — holes in a short row share a metal strip</text><text x=\"400\" y=\"330\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Jumpers go from Uno pins into these holes.</text>\n</svg>",
    "circuit": "<svg viewBox=\"0 0 860 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"BUTTON + LED CIRCUIT\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"860\" height=\"360\" fill=\"#030503\"/><rect width=\"860\" height=\"360\" fill=\"url(#g)\"/>\n<text x=\"430\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BUTTON + LED CIRCUIT</text>\n<rect x=\"40\" y=\"70\" width=\"180\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"130\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO</text><text x=\"130\" y=\"155\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">D7 D2 5V GND</text><rect x=\"300\" y=\"80\" width=\"140\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"370\" y=\"130\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BUTTON</text><rect x=\"520\" y=\"80\" width=\"140\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"590\" y=\"130\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><rect x=\"700\" y=\"80\" width=\"120\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"760\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">220Ω</text><line x1=\"220\" y1=\"120\" x2=\"300\" y2=\"120\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"440\" y1=\"120\" x2=\"520\" y2=\"120\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"660\" y1=\"120\" x2=\"700\" y2=\"120\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><text x=\"430\" y=\"240\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Button: one leg D2, other leg GND (use INPUT_PULLUP)</text><text x=\"430\" y=\"270\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED: D7 → 220Ω → LED+ ; LED− → GND</text><text x=\"430\" y=\"320\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: unplug USB before moving parts.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "bb",
      "title": "1. Breadboard basics",
      "diagram": "board",
      "steps": [
        {
          "title": "Red rail",
          "action": "Find the long red + rail — that will be 5V later if you need it.",
          "diagram": "board"
        },
        {
          "title": "Blue rail",
          "action": "Find the long blue − rail — that is GND highway.",
          "from": "Blue rail",
          "to": "GND ideas"
        },
        {
          "title": "Short rows",
          "action": "Holes in the same short letter-row are connected under the plastic.",
          "why": "That is how parts touch without soldering."
        }
      ]
    },
    {
      "id": "build",
      "title": "2. Wire button + LED",
      "diagram": "circuit",
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug USB.",
          "warn": "WATCH OUT: cold wiring only."
        },
        {
          "title": "Seat button",
          "action": "Push the 4-leg button across the breadboard trench (straddling the gap).",
          "from": "Button",
          "to": "across gap"
        },
        {
          "title": "Button to D2",
          "action": "Jumper from one button leg to Uno D2.",
          "from": "Button",
          "to": "D2"
        },
        {
          "title": "Button to GND",
          "action": "Jumper from the other side of the button to Uno GND.",
          "from": "Button",
          "to": "GND",
          "why": "INPUT_PULLUP means pressed = LOW."
        },
        {
          "title": "LED chain",
          "action": "D7 → 220Ω → LED long leg; LED short → GND.",
          "from": "D7",
          "to": "LED→GND",
          "warn": "WATCH OUT: long LED leg toward D7/resistor.",
          "diagram": "circuit"
        },
        {
          "title": "Checklist",
          "action": "Button to D2+GND? LED polarity? No loose metal?",
          "check": "c1"
        }
      ]
    },
    {
      "id": "run",
      "title": "3. Upload and press",
      "steps": [
        {
          "title": "Upload",
          "action": "Plug USB. Upload the First Breadboard Circuit sketch."
        },
        {
          "title": "Press",
          "action": "Hold the button. LED should light. Release = off.",
          "from": "Finger",
          "to": "Glow",
          "check": "t1"
        },
        {
          "title": "If stuck on",
          "action": "Unplug. Confirm you did not wire the LED straight to 5V without a path through code/resistor."
        }
      ]
    }
  ]
};
