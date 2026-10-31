window.FUX_GUIDE = {
  "id": "soldering-tips",
  "title": "First Clean Joints",
  "summary": "Practice real solder joints on your blue proto shield: one LED, one resistor, shiny volcano joints. Safety first — never grab the tip.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "45–90 min",
  "partsCount": 8,
  "pullerup": "../parts/soldering-tips.html",
  "beforeYouStart": "Pass a dry run of the safety list. Shield OFF the Uno. USB unplugged. Iron in its stand when idle. Tip ≈ 350°C — never grab it.",
  "tips": {},
  "parts": [
    "Blue prototype shield",
    "1 LED",
    "1× 220Ω resistor",
    "Male headers if missing",
    "Elegoo Uno (for blink test)",
    "Rosin-core solder ~0.5–0.8mm",
    "Soldering iron + stand + sponge",
    "Safety glasses"
  ],
  "tools": [
    "Soldering iron ~350°C",
    "Damp sponge",
    "Flush cutters",
    "Optional: helping hands"
  ],
  "specs": [
    [
      "Iron temp",
      "~350°C / 660°F"
    ],
    [
      "Solder",
      "60/40 or 63/37 rosin-core"
    ],
    [
      "Goal",
      "2+ shiny joints"
    ],
    [
      "Test",
      "LED blinks on D8"
    ]
  ],
  "code": "// First Clean Joints — blink the practice LED on D8\nconst int LED = 8;\nvoid setup(){ pinMode(LED, OUTPUT); }\nvoid loop(){\n  digitalWrite(LED, HIGH); delay(400);\n  digitalWrite(LED, LOW);  delay(400);\n}\n",
  "diagrams": {
    "safety": "<svg viewBox=\"0 0 900 420\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SOLDER SAFETY — SET UP FIRST\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"900\" height=\"420\" fill=\"#030503\"/><rect width=\"900\" height=\"420\" fill=\"url(#g)\"/>\n<text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SOLDER SAFETY — SET UP FIRST</text>\n<rect x=\"40\" y=\"50\" width=\"820\" height=\"70\" rx=\"6\" fill=\"rgba(230,57,45,.18)\" stroke=\"#e6392d\" stroke-width=\"2\"/><text x=\"450\" y=\"80\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HOT TIP ≈ 350°C / 660°F — NEVER GRAB THE TIP</text><text x=\"450\" y=\"100\" text-anchor=\"middle\" fill=\"#ffcdd2\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Hold ONLY the handle. Pliers for parts. Stand when idle.</text><rect x=\"40\" y=\"140\" width=\"260\" height=\"240\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6392d\" stroke-width=\"2\"/><text x=\"170\" y=\"175\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">MUST DO</text><text x=\"60\" y=\"210\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">1. Glasses ON</text><text x=\"60\" y=\"240\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">2. Air flow / window</text><text x=\"60\" y=\"270\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">3. Wet sponge ready</text><text x=\"60\" y=\"300\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">4. Iron in STAND</text><text x=\"60\" y=\"330\" text-anchor=\"start\" fill=\"#ff5a4f\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5. Handle ONLY</text><text x=\"60\" y=\"360\" text-anchor=\"start\" fill=\"#ff5a4f\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">6. NEVER grab tip</text><rect x=\"340\" y=\"160\" width=\"240\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"460\" y=\"200\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HANDLE</text><text x=\"460\" y=\"225\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">safe to hold</text><rect x=\"600\" y=\"160\" width=\"240\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6392d\" stroke-width=\"2\"/><text x=\"720\" y=\"200\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TIP</text><text x=\"720\" y=\"225\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">scorching — no touch</text><text x=\"450\" y=\"400\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Gloves will NOT save you from the tip.</text>\n</svg>",
    "joint": "<svg viewBox=\"0 0 800 320\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"A GOOD JOINT LOOKS LIKE A TINY VOLCANO\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"320\" fill=\"#030503\"/><rect width=\"800\" height=\"320\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">A GOOD JOINT LOOKS LIKE A TINY VOLCANO</text>\n<rect x=\"60\" y=\"70\" width=\"300\" height=\"180\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"210\" y=\"140\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SHINY · SMOOTH</text><text x=\"210\" y=\"170\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">covers pad + leg</text><rect x=\"440\" y=\"70\" width=\"300\" height=\"180\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6392d\" stroke-width=\"2\"/><text x=\"590\" y=\"140\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BALL / DULL / COLD</text><text x=\"590\" y=\"170\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">reheat + add flux/solder</text><text x=\"400\" y=\"290\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Heat the PAD and the LEG together. Then feed solder.</text>\n</svg>",
    "shield": "<svg viewBox=\"0 0 800 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"BLUE PROTO SHIELD — PRACTICE PADS\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"340\" fill=\"#030503\"/><rect width=\"800\" height=\"340\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BLUE PROTO SHIELD — PRACTICE PADS</text>\n<rect x=\"100\" y=\"60\" width=\"600\" height=\"220\" rx=\"6\" fill=\"#0a1520\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"400\" y=\"100\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BLUE PROTOTYPE SHIELD</text><text x=\"400\" y=\"140\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Pick two empty pads in a row</text><text x=\"400\" y=\"180\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Solder LED long leg + 220Ω on those pads</text><text x=\"400\" y=\"220\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Then short LED leg to GND pad</text><text x=\"400\" y=\"310\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Shield OFF the Uno while you solder.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "safety",
      "title": "1. Safety setup",
      "callout": {
        "tone": "danger",
        "lead": "HOT TIP",
        "text": "Never grab the iron tip — not even briefly. Hold only the handle."
      },
      "diagram": "safety",
      "steps": [
        {
          "title": "Glasses + air",
          "action": "Put on safety glasses. Open a window or run a fan.",
          "warn": "WATCH OUT: solder fumes — don't breathe the plume."
        },
        {
          "title": "Wet sponge + stand",
          "action": "Wet the sponge. Put the iron in its stand.",
          "diagram": "safety"
        },
        {
          "title": "Set ~350°C",
          "action": "Set the iron near 350°C (or the 'electronics' preset).",
          "from": "Dial",
          "to": "~350°C"
        },
        {
          "title": "Tip rule out loud",
          "action": "Say: I hold the HANDLE. I never grab the TIP.",
          "warn": "WATCH OUT: tip stays hot minutes after unplug. Gloves ≠ tip protection.",
          "diagram": "safety",
          "check": "s0"
        }
      ]
    },
    {
      "id": "tin",
      "title": "2. Tin the tip",
      "steps": [
        {
          "title": "Wipe",
          "action": "Wipe the hot tip on the wet sponge — not with your fingers.",
          "warn": "WATCH OUT: never wipe the tip with skin or cloth in your hand."
        },
        {
          "title": "Add solder",
          "action": "Touch a little solder to the tip until it looks shiny silver.",
          "from": "Solder wire",
          "to": "Tip"
        },
        {
          "title": "Park it",
          "action": "Put the iron back in the stand.",
          "check": "s1"
        }
      ]
    },
    {
      "id": "joint",
      "title": "3. Make two practice joints",
      "diagram": "shield",
      "callout": {
        "tone": "warn",
        "lead": "Shield OFF",
        "text": "Do not solder with the shield plugged onto the Uno."
      },
      "steps": [
        {
          "title": "Shield off Uno",
          "action": "Pull the blue shield OFF the Elegoo.",
          "warn": "WATCH OUT: USB unplugged. Shield off before heat."
        },
        {
          "title": "Place resistor",
          "action": "Bend and seat the 220Ω through two nearby pads.",
          "from": "Resistor",
          "to": "two pads",
          "diagram": "shield"
        },
        {
          "title": "Heat pad+leg",
          "action": "Touch iron to PAD and LEG together for ~2 seconds.",
          "from": "Iron",
          "to": "pad + leg",
          "why": "Heat both so solder flows to both."
        },
        {
          "title": "Feed solder",
          "action": "Feed solder to the hot pad/leg — not to the iron tip.",
          "warn": "WATCH OUT: if it balls up dull, reheat both sides and add a touch more.",
          "diagram": "joint"
        },
        {
          "title": "LED long leg",
          "action": "Solder the LED long leg to the other side of the resistor net.",
          "from": "LED +",
          "to": "resistor pad"
        },
        {
          "title": "LED short to GND",
          "action": "Solder short LED leg to a GND pad on the shield.",
          "from": "LED −",
          "to": "GND pad",
          "check": "s2"
        },
        {
          "title": "Trim leads",
          "action": "Unplug iron to stand. Clip long leftover leads with flush cutters.",
          "warn": "WATCH OUT: flying lead bits — aim cutters down, glasses on."
        }
      ]
    },
    {
      "id": "test",
      "title": "4. Blink test on the Uno",
      "steps": [
        {
          "title": "Cool down",
          "action": "Wait until joints are cool. Iron back in stand.",
          "warn": "WATCH OUT: still hot after unplug."
        },
        {
          "title": "Seat shield",
          "action": "Press the shield onto the Uno. Align pins gently."
        },
        {
          "title": "Upload blink",
          "action": "Wire or jump the LED anode net to D8 if needed, upload the blink sketch, plug USB.",
          "detail": "If you soldered anode to a pad tied to D8, just upload.",
          "check": "t1"
        },
        {
          "title": "Win check",
          "action": "LED blinks. Joints stay shiny. No smoke.",
          "diagram": "joint"
        }
      ]
    }
  ]
};
