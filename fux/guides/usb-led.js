window.FUX_GUIDE = {
  "id": "usb-led",
  "title": "USB LED Lamp",
  "summary": "Light an LED from USB 5V with a resistor. Kit path uses your Elegoo. Optional standalone uses a USB-A breakout.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "30–60 min",
  "partsCount": 6,
  "pullerup": "../parts/usb-led.html",
  "beforeYouStart": "Unplug USB while you wire. Long LED leg is +. Always use a 220Ω resistor. Do one step, tap Done, then Next.",
  "tips": {},
  "parts": [
    "Elegoo Uno (kit path) OR USB-A male breakout (standalone)",
    "1 red LED — long leg +",
    "1 resistor 220Ω (red-red-brown)",
    "Breadboard",
    "Male-to-male jumpers",
    "USB phone charger or computer port"
  ],
  "tools": [
    "None required for kit path",
    "Soldering iron only if you solder the USB breakout headers"
  ],
  "specs": [
    [
      "Power",
      "USB 5V"
    ],
    [
      "Resistor",
      "220Ω"
    ],
    [
      "LED",
      "Red 5mm (or kit LED)"
    ],
    [
      "Goal",
      "Steady glow, no smoke"
    ]
  ],
  "code": "// No code — this is a pure power circuit.\n",
  "diagrams": {
    "overview": "<svg viewBox=\"0 0 800 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"USB LED LAMP — BIG PICTURE\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"360\" fill=\"#030503\"/><rect width=\"800\" height=\"360\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">USB LED LAMP — BIG PICTURE</text>\n<rect x=\"40\" y=\"60\" width=\"200\" height=\"120\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"140\" y=\"110\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">USB 5V</text><text x=\"140\" y=\"135\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">POWER</text><line x1=\"240\" y1=\"120\" x2=\"340\" y2=\"120\" stroke=\"#ff2a6d\" stroke-width=\"5\" stroke-linecap=\"round\"/><text x=\"290\" y=\"105\" text-anchor=\"middle\" fill=\"#ff2a6d\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">RED</text><rect x=\"340\" y=\"80\" width=\"160\" height=\"80\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"420\" y=\"125\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">220Ω</text><line x1=\"500\" y1=\"120\" x2=\"580\" y2=\"120\" stroke=\"#ff2a6d\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"580\" y=\"70\" width=\"140\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"650\" y=\"115\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><text x=\"650\" y=\"140\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">long→+</text><line x1=\"650\" y1=\"170\" x2=\"650\" y2=\"240\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"650\" y1=\"240\" x2=\"140\" y2=\"240\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"140\" y1=\"240\" x2=\"140\" y2=\"180\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><text x=\"400\" y=\"270\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BLACK / GND back to USB</text><text x=\"400\" y=\"320\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: never skip the resistor</text>\n</svg>",
    "led-legs": "<svg viewBox=\"0 0 700 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"LED LEGS\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"300\" fill=\"#030503\"/><rect width=\"700\" height=\"300\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED LEGS</text>\n<rect x=\"80\" y=\"80\" width=\"220\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"190\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LONG LEG = +</text><text x=\"190\" y=\"160\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">(anode)</text><rect x=\"400\" y=\"80\" width=\"220\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"510\" y=\"130\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SHORT LEG = −</text><text x=\"510\" y=\"160\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">(cathode / flat)</text><text x=\"350\" y=\"260\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Wrong way = no light. Flip it.</text>\n</svg>",
    "kit-path": "<svg viewBox=\"0 0 800 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"KIT PATH — POWER FROM ELEGOO 5V\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"800\" height=\"340\" fill=\"#030503\"/><rect width=\"800\" height=\"340\" fill=\"url(#g)\"/>\n<text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">KIT PATH — POWER FROM ELEGOO 5V</text>\n<rect x=\"40\" y=\"70\" width=\"220\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"150\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO</text><text x=\"150\" y=\"155\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">USB → board</text><text x=\"150\" y=\"180\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">use 5V + GND</text><line x1=\"260\" y1=\"130\" x2=\"340\" y2=\"130\" stroke=\"#ff2a6d\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"340\" y=\"90\" width=\"120\" height=\"80\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"400\" y=\"135\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">220Ω</text><line x1=\"460\" y1=\"130\" x2=\"540\" y2=\"130\" stroke=\"#ff2a6d\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"540\" y=\"90\" width=\"120\" height=\"80\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"600\" y=\"135\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><line x1=\"600\" y1=\"170\" x2=\"600\" y2=\"250\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"600\" y1=\"250\" x2=\"150\" y2=\"250\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><text x=\"400\" y=\"300\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Same circuit. Phone charger powers the Uno.</text>\n</svg>",
    "warn-short": "<svg viewBox=\"0 0 700 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"WATCH OUT — NO BARE SHORTS\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"260\" fill=\"#030503\"/><rect width=\"700\" height=\"260\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT — NO BARE SHORTS</text>\n<rect x=\"60\" y=\"70\" width=\"580\" height=\"120\" rx=\"6\" fill=\"rgba(230,57,45,.15)\" stroke=\"#e6392d\" stroke-width=\"2\"/><text x=\"350\" y=\"120\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Do NOT connect 5V straight to GND</text><text x=\"350\" y=\"150\" text-anchor=\"middle\" fill=\"#ffcdd2\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Do NOT skip the resistor on the LED</text><text x=\"350\" y=\"230\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Unplug USB before you move wires.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "meet",
      "title": "1. What you are building",
      "callout": {
        "tone": "ok",
        "lead": "Mission",
        "text": "Make light safely from USB power. The resistor is the seatbelt."
      },
      "diagram": "overview",
      "steps": [
        {
          "title": "See the path",
          "action": "Look at the big picture: USB → resistor → LED → GND.",
          "from": "USB 5V",
          "to": "LED then GND",
          "why": "Current must go through the resistor first.",
          "diagram": "overview"
        },
        {
          "title": "Learn LED legs",
          "action": "Long leg = +. Short leg / flat side = −.",
          "from": "Long leg",
          "to": "+ side",
          "warn": "WATCH OUT: backwards LED stays dark — flip it, don't force more power.",
          "diagram": "led-legs"
        }
      ]
    },
    {
      "id": "kit",
      "title": "2. Kit path — Elegoo 5V (no extra buy)",
      "callout": {
        "tone": "info",
        "lead": "Already have it",
        "text": "Your Uno's 5V pin is USB power. Perfect for this first lamp."
      },
      "diagram": "kit-path",
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug the USB cable from the Elegoo.",
          "from": "USB cable",
          "to": "OUT",
          "warn": "WATCH OUT: wire only with power OFF.",
          "check": "u1"
        },
        {
          "title": "Place resistor",
          "action": "Put the 220Ω resistor from breadboard row 10 to row 12.",
          "from": "Resistor",
          "to": "rows 10→12",
          "why": "Resistors work either way."
        },
        {
          "title": "LED long to row 12",
          "action": "Long LED leg into row 12. Short leg into row 14.",
          "from": "LED +",
          "to": "row 12",
          "warn": "WATCH OUT: long leg toward the resistor.",
          "diagram": "led-legs"
        },
        {
          "title": "Red to 5V",
          "action": "RED jumper: Uno 5V → breadboard row 10.",
          "from": "Uno 5V",
          "to": "row 10",
          "diagram": "kit-path"
        },
        {
          "title": "Black to GND",
          "action": "BLACK jumper: Uno GND → breadboard row 14.",
          "from": "Uno GND",
          "to": "row 14"
        },
        {
          "title": "Power on",
          "action": "Plug USB back in. LED should glow steady.",
          "from": "USB in",
          "to": "Glow",
          "warn": "WATCH OUT: if dark, unplug, flip LED, check 5V not Vin.",
          "check": "t1"
        },
        {
          "title": "If it stays dark",
          "action": "Unplug. Confirm long leg on resistor side. Confirm 220Ω bands red-red-brown.",
          "warn": "WATCH OUT: never bridge 5V to GND with a bare wire.",
          "diagram": "warn-short"
        }
      ]
    },
    {
      "id": "solo",
      "title": "3. Optional standalone — USB breakout",
      "callout": {
        "tone": "warn",
        "lead": "Only if you bought the breakout",
        "text": "Skip this whole section if the kit path already works."
      },
      "steps": [
        {
          "title": "Headers on breakout",
          "action": "If needed, solder the 0.1\" headers on the USB-A male breakout.",
          "warn": "WATCH OUT: iron tip is ~350°C — never grab the tip. Hold the handle only."
        },
        {
          "title": "Same chain",
          "action": "Wire breakout 5V → 220Ω → LED+ ; LED− → breakout GND.",
          "from": "Breakout 5V",
          "to": "GND via LED"
        },
        {
          "title": "Plug into charger",
          "action": "Plug the male USB into a phone charger. Glow = win.",
          "warn": "WATCH OUT: use a wall charger or power bank — not a mystery port."
        }
      ]
    }
  ]
};
