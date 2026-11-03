window.FUX_GUIDE = {
  "id": "arc-reactor",
  "title": "Iron Man Arc Reactor",
  "summary": "NeoPixel ring on your Elegoo: startup chase, then a soft blue-white breathing glow. Breadboard test first, then solder three leads to the ring.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "1–2 hr",
  "partsCount": 8,
  "pullerup": "../parts/arc-reactor.html",
  "beforeYouStart": "Unplug USB while moving wires or soldering. Do ONE step at a time. Pass Part 2 (breadboard) before Part 3 (soldering). Keep brightness low so USB can power the ring. Iron tip ≈ 350°C — NEVER grab it; hold only the handle.",
  "tips": {},
  "parts": [
    "Elegoo Uno",
    "NeoPixel / WS2812B ring (16 LEDs preferred; 12 OK)",
    "1× 220Ω–470Ω resistor",
    "Kit electrolytic capacitor (optional 1000µF upgrade)",
    "Breadboard + jumpers",
    "Blue proto shield (Part 3 optional mount)",
    "Soldering iron + solder",
    "USB cable"
  ],
  "tools": [
    "Computer with Arduino IDE",
    "Soldering iron ~350°C + stand + sponge",
    "Safety glasses",
    "Flush cutters"
  ],
  "specs": [
    [
      "Data pin",
      "D6"
    ],
    [
      "Power",
      "5V + GND (USB)"
    ],
    [
      "LEDs",
      "16 (or set NUM_LEDS=12)"
    ],
    [
      "Library",
      "Adafruit_NeoPixel"
    ],
    [
      "Brightness",
      "Keep ≤ 40 for USB"
    ]
  ],
  "code": "// Iron Man Arc Reactor — Adafruit_NeoPixel\n// Library: Sketch → Include Library → Manage Libraries → \"Adafruit NeoPixel\"\n#include <Adafruit_NeoPixel.h>\n\n#define PIN       6\n#define NUM_LEDS  16   // use 12 if you bought the smaller ring\n#define BRIGHT    32   // keep low on USB power (max safe ~40)\n\nAdafruit_NeoPixel ring(NUM_LEDS, PIN, NEO_GRB + NEO_KHZ800);\n\nvoid setup() {\n  ring.begin();\n  ring.setBrightness(BRIGHT);\n  ring.clear();\n  ring.show();\n  startupChase();   // short \"power on\" swirl\n}\n\nvoid loop() {\n  breathe();         // soft blue-white pulse forever\n}\n\n// ---- Startup: cyan chase around the ring ----\nvoid startupChase() {\n  for (int lap = 0; lap < 2; lap++) {\n    for (int i = 0; i < NUM_LEDS; i++) {\n      ring.clear();\n      ring.setPixelColor(i, ring.Color(40, 200, 255));           // bright cyan tip\n      ring.setPixelColor((i + NUM_LEDS - 1) % NUM_LEDS, ring.Color(10, 60, 90));\n      ring.show();\n      delay(40);\n    }\n  }\n  // fill center glow\n  for (int b = 0; b <= 180; b += 8) {\n    uint8_t c = b;\n    for (int i = 0; i < NUM_LEDS; i++) {\n      ring.setPixelColor(i, ring.Color(c / 3, c, c + 20 > 255 ? 255 : c + 20));\n    }\n    ring.show();\n    delay(18);\n  }\n}\n\n// ---- Breathing: ice-blue to soft white ----\nvoid breathe() {\n  // fade up\n  for (int b = 20; b <= 200; b += 2) {\n    setAllBreath(b);\n    delay(18);\n  }\n  // fade down\n  for (int b = 200; b >= 20; b -= 2) {\n    setAllBreath(b);\n    delay(18);\n  }\n}\n\nvoid setAllBreath(int b) {\n  // mix a little white into cyan → Stark blue-white\n  uint8_t r = b / 4;\n  uint8_t g = b * 2 / 3;\n  uint8_t bl = b;\n  for (int i = 0; i < NUM_LEDS; i++) {\n    ring.setPixelColor(i, ring.Color(r, g, bl));\n  }\n  ring.show();\n}\n",
  "diagrams": {
    "map": "<svg viewBox=\"0 0 860 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"NEOPIXEL RING → UNO (3 WIRES)\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"860\" height=\"360\" fill=\"#030503\"/><rect width=\"860\" height=\"360\" fill=\"url(#g)\"/><text x=\"430\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">NEOPIXEL RING → UNO (3 WIRES)</text>\n<rect x=\"40\" y=\"60\" width=\"220\" height=\"180\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"150\" y=\"115\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO UNO</text>\n<text x=\"150\" y=\"145\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5V · GND · D6</text>\n<text x=\"150\" y=\"175\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">USB power OK at BRIGHT≤40</text>\n<circle cx=\"560\" cy=\"150\" r=\"90\" fill=\"#0a1520\" stroke=\"#4fc3f7\" stroke-width=\"8\"/>\n<circle cx=\"560\" cy=\"150\" r=\"40\" fill=\"#102a40\" stroke=\"#e8ffff\" stroke-width=\"2\"/>\n<text x=\"560\" y=\"145\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">RING</text>\n<text x=\"560\" y=\"165\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">16 LEDs</text>\n<!-- wires -->\n<line x1=\"260\" y1=\"110\" x2=\"470\" y2=\"110\" stroke=\"#ff5a4f\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n<text x=\"360\" y=\"100\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5V → V+</text>\n<line x1=\"260\" y1=\"150\" x2=\"470\" y2=\"150\" stroke=\"#dce6d6\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n<text x=\"360\" y=\"175\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GND → Gnd</text>\n<line x1=\"260\" y1=\"190\" x2=\"430\" y2=\"190\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n<rect x=\"300\" y=\"200\" width=\"120\" height=\"36\" rx=\"4\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/>\n<text x=\"360\" y=\"223\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">220–470Ω</text>\n<line x1=\"420\" y1=\"218\" x2=\"500\" y2=\"190\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/>\n<text x=\"530\" y=\"250\" text-anchor=\"middle\" fill=\"#ffe600\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">D6 → DIN (thru resistor)</text>\n<text x=\"430\" y=\"332\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Look at the ring pads: DIN (data in), V+ / 5V, GND. Do NOT use DOUT for the Uno.</text></svg>",
    "pads": "<svg viewBox=\"0 0 700 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"RING PADS — FIND DIN\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"700\" height=\"300\" fill=\"#030503\"/><rect width=\"700\" height=\"300\" fill=\"url(#g)\"/><text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">RING PADS — FIND DIN</text>\n<circle cx=\"350\" cy=\"150\" r=\"95\" fill=\"#0a1520\" stroke=\"#4fc3f7\" stroke-width=\"6\"/>\n<circle cx=\"350\" cy=\"150\" r=\"45\" fill=\"#102a40\" stroke=\"#e8ffff\" stroke-width=\"2\"/>\n<!-- pad labels around bottom -->\n<rect x=\"250\" y=\"230\" width=\"70\" height=\"28\" rx=\"3\" fill=\"#0c110c\" stroke=\"#ffe600\" stroke-width=\"2\"/>\n<text x=\"285\" y=\"249\" text-anchor=\"middle\" fill=\"#ffe600\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">DIN</text>\n<rect x=\"330\" y=\"230\" width=\"70\" height=\"28\" rx=\"3\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/>\n<text x=\"365\" y=\"249\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5V</text>\n<rect x=\"410\" y=\"230\" width=\"70\" height=\"28\" rx=\"3\" fill=\"#0c110c\" stroke=\"#dce6d6\" stroke-width=\"2\"/>\n<text x=\"445\" y=\"249\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GND</text>\n<text x=\"350\" y=\"145\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ARROW</text>\n<text x=\"350\" y=\"162\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"10\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">points to DIN side</text>\n<text x=\"350\" y=\"272\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">DOUT is for chaining another ring — leave it empty.</text><text x=\"350\" y=\"290\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: reverse 5V/GND can kill the LEDs.</text></svg>",
    "safety": "<svg viewBox=\"0 0 900 320\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SOLDER SAFETY — HOT TIP\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"900\" height=\"320\" fill=\"#030503\"/><rect width=\"900\" height=\"320\" fill=\"url(#g)\"/><text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SOLDER SAFETY — HOT TIP</text>\n<rect x=\"40\" y=\"50\" width=\"820\" height=\"70\" rx=\"6\" fill=\"rgba(230,57,45,.18)\" stroke=\"#e6392d\" stroke-width=\"2\"/>\n<text x=\"450\" y=\"80\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HOT TIP ≈ 350°C / 660°F — NEVER GRAB THE TIP</text>\n<text x=\"450\" y=\"100\" text-anchor=\"middle\" fill=\"#ffcdd2\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Hold ONLY the handle. Iron in stand when idle. Glasses on.</text>\n<rect x=\"80\" y=\"150\" width=\"240\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"200\" y=\"195\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HANDLE</text>\n<text x=\"200\" y=\"220\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">safe to hold</text>\n<rect x=\"360\" y=\"150\" width=\"240\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6392d\" stroke-width=\"2\"/>\n<text x=\"480\" y=\"195\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TIP</text>\n<text x=\"480\" y=\"220\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">scorching — no touch</text>\n<rect x=\"640\" y=\"150\" width=\"200\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/>\n<text x=\"740\" y=\"195\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">STAND</text>\n<text x=\"740\" y=\"220\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">park it here</text>\n<text x=\"450\" y=\"292\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Gloves will NOT save you from the tip.</text></svg>",
    "solder": "<svg viewBox=\"0 0 800 320\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SOLDER 3 SHORT LEADS ON THE RING\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"800\" height=\"320\" fill=\"#030503\"/><rect width=\"800\" height=\"320\" fill=\"url(#g)\"/><text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SOLDER 3 SHORT LEADS ON THE RING</text>\n<circle cx=\"220\" cy=\"150\" r=\"80\" fill=\"#0a1520\" stroke=\"#4fc3f7\" stroke-width=\"5\"/>\n<text x=\"220\" y=\"145\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">RING</text>\n<text x=\"220\" y=\"165\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">off breadboard</text>\n<rect x=\"400\" y=\"70\" width=\"340\" height=\"180\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"570\" y=\"110\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">3 JUMPER WIRES</text>\n<text x=\"570\" y=\"145\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">1. Red → 5V pad</text>\n<text x=\"570\" y=\"175\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">2. Black → GND pad</text>\n<text x=\"570\" y=\"205\" text-anchor=\"middle\" fill=\"#ffe600\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">3. Yellow → DIN pad</text>\n<text x=\"400\" y=\"292\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Ring OFF the Uno / breadboard while you solder. Heat pad + wire, then feed solder.</text></svg>",
    "checklist": "<svg viewBox=\"0 0 800 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"BEFORE POWER-ON CHECKLIST\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"800\" height=\"340\" fill=\"#030503\"/><rect width=\"800\" height=\"340\" fill=\"url(#g)\"/><text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BEFORE POWER-ON CHECKLIST</text>\n<rect x=\"60\" y=\"50\" width=\"680\" height=\"240\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"100\" y=\"95\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ 5V wire on the ring 5V / V+ pad — not GND</text>\n<text x=\"100\" y=\"130\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ GND wire on the ring GND pad</text>\n<text x=\"100\" y=\"165\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ Data wire: Uno D6 → resistor → ring DIN</text>\n<text x=\"100\" y=\"200\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ DOUT left empty · no shorts between pads</text>\n<text x=\"100\" y=\"235\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ BRIGHT in code is 40 or less</text>\n<text x=\"100\" y=\"270\" text-anchor=\"start\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ Iron in stand · USB still unplugged until Ready</text>\n<text x=\"400\" y=\"312\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">If anything looks wrong, fix it before plugging USB.</text></svg>"
  },
  "sections": [
    {
      "id": "meet",
      "title": "1. Meet the build",
      "callout": {
        "tone": "warn",
        "lead": "USB POWER",
        "text": "16 NeoPixels at full white need a lot of current. Keep BRIGHT at 32–40 so the Uno USB port stays safe."
      },
      "diagram": "map",
      "steps": [
        {
          "title": "What you are making",
          "action": "A round LED chest piece: a short cyan chase on power-up, then a soft blue-white breathing pulse."
        },
        {
          "title": "Three wires only",
          "action": "Ring 5V ← Uno 5V. Ring GND ← Uno GND. Ring DIN ← 220–470Ω ← Uno D6.",
          "from": "D6",
          "to": "DIN",
          "diagram": "map"
        },
        {
          "title": "Success looks like",
          "action": "LEDs chase once, then the whole ring gently pulses ice-blue forever.",
          "check": "m1"
        }
      ]
    },
    {
      "id": "lib",
      "title": "2. Install the library",
      "steps": [
        {
          "title": "Open Library Manager",
          "action": "In Arduino IDE: Sketch → Include Library → Manage Libraries…"
        },
        {
          "title": "Install Adafruit NeoPixel",
          "action": "Search Adafruit NeoPixel. Install the official Adafruit one (by Adafruit).",
          "detail": "Accept any Adafruit dependency it offers."
        },
        {
          "title": "Copy the sketch",
          "action": "New sketch. Paste the Arc Reactor code from this guide. Save as ArcReactor.",
          "check": "l1"
        }
      ]
    },
    {
      "id": "breadboard",
      "title": "Part 2: Breadboard test (no solder yet)",
      "callout": {
        "tone": "warn",
        "lead": "COLD WIRING",
        "text": "USB unplugged while you move wires. Do not solder yet — prove the glow on the breadboard first."
      },
      "diagram": "pads",
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug USB from the Elegoo.",
          "warn": "WATCH OUT: cold wiring only."
        },
        {
          "title": "Find the pads",
          "action": "On the ring, find DIN, 5V (or V+), and GND. Leave DOUT empty.",
          "diagram": "pads",
          "warn": "WATCH OUT: DOUT is not the Uno data pin."
        },
        {
          "title": "Seat the ring",
          "action": "Lay the ring on the breadboard so its three pads can take jumpers (or use alligator clips / pin headers if your ring came with them)."
        },
        {
          "title": "Wire power",
          "action": "Red jumper: Uno 5V → ring 5V / V+.",
          "from": "5V",
          "to": "ring 5V"
        },
        {
          "title": "Wire ground",
          "action": "Black jumper: Uno GND → ring GND.",
          "from": "GND",
          "to": "ring GND"
        },
        {
          "title": "Wire data with resistor",
          "action": "Yellow jumper from Uno D6 to one leg of a 220–470Ω resistor. Other resistor leg to ring DIN.",
          "from": "D6",
          "to": "DIN via R",
          "why": "The resistor protects the first LED from sharp data spikes."
        },
        {
          "title": "Optional cap",
          "action": "If you have a kit electrolytic, put it across 5V and GND near the ring. Long leg on 5V.",
          "warn": "WATCH OUT: electrolytic caps have a polarity stripe on the short (−) leg → GND."
        },
        {
          "title": "Before-power checklist",
          "action": "Read every box on the checklist picture. Fix anything wrong.",
          "diagram": "checklist",
          "check": "b1"
        },
        {
          "title": "Upload",
          "action": "Plug USB. Board: Arduino Uno. Port: your USB port. Upload ArcReactor."
        },
        {
          "title": "Win check",
          "action": "Cyan chase, then a soft breathing glow. If dark: recheck DIN vs DOUT and 5V/GND.",
          "check": "b2"
        }
      ]
    },
    {
      "id": "solder",
      "title": "Part 3: Solder leads on the ring",
      "callout": {
        "tone": "danger",
        "lead": "HOT TIP",
        "text": "Never grab the iron tip — not even briefly. Hold only the handle. Ring OFF the Uno while soldering."
      },
      "diagram": "safety",
      "steps": [
        {
          "title": "Unplug + cool",
          "action": "Unplug USB. Pull the ring off the breadboard. Let it cool in your hand sense — no power.",
          "warn": "WATCH OUT: USB out before heat."
        },
        {
          "title": "Safety setup",
          "action": "Glasses on. Wet sponge. Iron in stand. Say out loud: I hold the HANDLE. I never grab the TIP.",
          "diagram": "safety",
          "warn": "WATCH OUT: tip stays hot minutes after unplug."
        },
        {
          "title": "Set ~350°C",
          "action": "Set the iron near 350°C (or the electronics preset)."
        },
        {
          "title": "Tin tip",
          "action": "Wipe tip on wet sponge. Add a tiny bit of solder until shiny. Park in stand."
        },
        {
          "title": "Solder red to 5V",
          "action": "Strip ~3 mm on a red jumper. Heat the ring 5V pad AND the wire together ~2 s, then feed solder.",
          "from": "Red wire",
          "to": "5V pad",
          "diagram": "solder",
          "warn": "WATCH OUT: feed solder to the pad/wire — not only to the tip."
        },
        {
          "title": "Solder black to GND",
          "action": "Same method: black jumper → GND pad.",
          "from": "Black wire",
          "to": "GND pad"
        },
        {
          "title": "Solder yellow to DIN",
          "action": "Yellow jumper → DIN pad. Leave DOUT empty.",
          "from": "Yellow wire",
          "to": "DIN pad",
          "check": "s1"
        },
        {
          "title": "Inspect joints",
          "action": "Each joint should look like a tiny shiny volcano covering pad + wire. No bridges between pads.",
          "warn": "WATCH OUT: dull ball = cold joint. Reheat pad+wire and add a touch of solder."
        },
        {
          "title": "Cool + reconnect",
          "action": "Iron back in stand. Wait until joints are cool. Plug wires: 5V, GND, and yellow through the resistor into D6.",
          "check": "s2"
        },
        {
          "title": "Before-power checklist again",
          "action": "Run the checklist picture one more time.",
          "diagram": "checklist"
        },
        {
          "title": "Power on",
          "action": "Plug USB. Upload if needed. Chase + breathe should return.",
          "check": "s3"
        },
        {
          "title": "Optional chest mount",
          "action": "Tape or pin the ring to a cardboard circle for a desk prop. Wearable Nano + battery is a later upgrade — ask Kaserin before buying."
        }
      ]
    }
  ]
};
