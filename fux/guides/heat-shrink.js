window.FUX_GUIDE = {
  "id": "heat-shrink",
  "title": "Heat-Shrink Wire Joins",
  "summary": "Join two wires the clean way: slide heat-shrink on first, twist or solder, then shrink. Compare vs tape.",
  "category": "Tools",
  "difficulty": "Beginner",
  "time": "20–40 min",
  "partsCount": 5,
  "pullerup": "../parts/heat-shrink.html",
  "beforeYouStart": "Slide the tube onto the wire BEFORE you twist. Heat evenly. Don't burn the insulation.",
  "tips": {},
  "parts": [
    "Heat-shrink tubing assortment",
    "2 scrap jumper wires or hookup wire",
    "Optional: soldering iron + solder for a soldered splice",
    "Lighter or heat gun",
    "Safety glasses"
  ],
  "tools": [
    "Wire strippers or flush cutters",
    "Heat source (heat gun preferred)"
  ],
  "specs": [
    [
      "Shrink ratio",
      "2:1 is fine"
    ],
    [
      "Order",
      "Slide → strip → join → shrink"
    ],
    [
      "Goal",
      "Join that won't pull apart easily"
    ]
  ],
  "code": "// No code — wire craft practice.\n",
  "diagrams": {
    "compare": "<svg viewBox=\"0 0 860 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"TWIST vs TAPE vs HEAT-SHRINK\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"860\" height=\"360\" fill=\"#030503\"/><rect width=\"860\" height=\"360\" fill=\"url(#g)\"/>\n<text x=\"430\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TWIST vs TAPE vs HEAT-SHRINK</text>\n<rect x=\"40\" y=\"60\" width=\"240\" height=\"200\" rx=\"6\" fill=\"#0c110c\" stroke=\"#7a8a76\" stroke-width=\"2\"/><text x=\"160\" y=\"120\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TWIST ONLY</text><text x=\"160\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">falls apart</text><text x=\"160\" y=\"180\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">OK for 10-second test</text><rect x=\"310\" y=\"60\" width=\"240\" height=\"200\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"430\" y=\"120\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TWIST + TAPE</text><text x=\"430\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">messy · can unwind</text><rect x=\"580\" y=\"60\" width=\"240\" height=\"200\" rx=\"6\" fill=\"rgba(184,255,60,.08)\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"700\" y=\"120\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HEAT-SHRINK</text><text x=\"700\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">tight · clean · strong</text><text x=\"700\" y=\"180\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">winner for keeps</text><text x=\"430\" y=\"320\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Slide tube on BEFORE you join the wires.</text>\n</svg>",
    "steps": "<svg viewBox=\"0 0 800 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"HEAT-SHRINK JOIN — 4 MOVES\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"340\" fill=\"#030503\"/><rect width=\"800\" height=\"340\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HEAT-SHRINK JOIN — 4 MOVES</text>\n<text x=\"100\" y=\"80\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">1 SLIDE</text><text x=\"100\" y=\"105\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">tube onto wire</text><text x=\"300\" y=\"80\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">2 STRIP</text><text x=\"300\" y=\"105\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">~8mm insulation</text><text x=\"500\" y=\"80\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">3 TWIST</text><text x=\"500\" y=\"105\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">or solder splice</text><text x=\"700\" y=\"80\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">4 SHRINK</text><text x=\"700\" y=\"105\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">heat evenly</text><line x1=\"60\" y1=\"180\" x2=\"740\" y2=\"180\" stroke=\"#ff2a6d\" stroke-width=\"6\" stroke-linecap=\"round\"/><rect x=\"360\" y=\"160\" width=\"80\" height=\"40\" rx=\"6\" fill=\"#1a2a0a\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"400\" y=\"185\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">JOIN</text><text x=\"400\" y=\"260\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Heat with heat gun, or careful lighter pass — keep moving.</text><text x=\"400\" y=\"310\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: do not melt the wire insulation.</text>\n</svg>",
    "sizes": "<svg viewBox=\"0 0 700 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"PICK A TUBE THAT FITS\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"260\" fill=\"#030503\"/><rect width=\"700\" height=\"260\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PICK A TUBE THAT FITS</text>\n<text x=\"350\" y=\"90\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Before shrink: snug over the join, loose over insulation</text><text x=\"350\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">After shrink: hugs the join with no gaps</text><text x=\"350\" y=\"190\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Too big = rattles. Too small = won't slide on.</text><text x=\"350\" y=\"230\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">2:1 shrink ratio is fine for this practice.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "why",
      "title": "1. Why heat-shrink wins",
      "diagram": "compare",
      "steps": [
        {
          "title": "See the three ways",
          "action": "Look at twist-only, tape, and heat-shrink.",
          "why": "Heat-shrink stays put and looks tidy.",
          "diagram": "compare"
        },
        {
          "title": "Rule one",
          "action": "Slide the tube on BEFORE you join the wires.",
          "warn": "WATCH OUT: if you join first, you often can't get the tube over the blob.",
          "check": "h0"
        }
      ]
    },
    {
      "id": "do",
      "title": "2. Make one clean join",
      "diagram": "steps",
      "steps": [
        {
          "title": "Pick tube size",
          "action": "Choose tubing that slides over the insulation but will hug the join.",
          "diagram": "sizes"
        },
        {
          "title": "Slide tube far back",
          "action": "Slide 2–3 cm of tubing onto one wire, away from the end.",
          "from": "Tube",
          "to": "onto wire"
        },
        {
          "title": "Strip both ends",
          "action": "Strip about 8 mm of insulation from each wire end.",
          "from": "Cutters",
          "to": "bare copper"
        },
        {
          "title": "Twist together",
          "action": "Twist the bare copper tightly (or solder if you already practiced joints).",
          "from": "Wire A",
          "to": "Wire B",
          "diagram": "steps"
        },
        {
          "title": "Center the tube",
          "action": "Slide the tube over the join so it covers all bare metal.",
          "warn": "WATCH OUT: no shiny copper left showing."
        },
        {
          "title": "Shrink it",
          "action": "Heat evenly while turning the wire. Stop when it hugs tight.",
          "warn": "WATCH OUT: keep the flame/gun moving — don't char the plastic.",
          "check": "h1"
        },
        {
          "title": "Tug test",
          "action": "Gentle tug on both sides. It should hold.",
          "from": "Hands",
          "to": "no slip"
        }
      ]
    },
    {
      "id": "compare",
      "title": "3. Quick compare",
      "steps": [
        {
          "title": "Make a tape join",
          "action": "On two other scraps, twist and wrap electrical tape only."
        },
        {
          "title": "Feel the difference",
          "action": "Bend and tug both joins. Note which looks cleaner.",
          "diagram": "compare"
        }
      ]
    }
  ]
};
