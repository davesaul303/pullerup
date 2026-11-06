window.FUX_GUIDE = {
  "id": "arc-reactor",
  "title": "Iron Man Arc Reactor",
  "summary": "NeoPixel ring on your Elegoo: startup chase, then a soft blue-white breathing glow. Breadboard test first, then solder three leads to the ring.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "1–2 hr",
  "partsCount": 8,
  "pullerup": "../parts/arc-reactor.html",
  "beforeYouStart": "Unplug USB while you move wires or solder. Do one step at a time. Finish the breadboard glow before soldering. Keep brightness low so USB can power the ring. Iron tip is about 350°C — hold only the handle.",
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
        "text": "The ring has many tiny lights. If they are too bright, the USB port can get unhappy. Keep BRIGHT at 32–40 in the code."
      },
      "diagram": "map",
      "steps": [
        {
          "title": "What you are making",
          "action": "A round glowing “chest piece” that chases once, then softly pulses ice-blue.",
          "detail": "1. You are building a light-up ring that looks like Iron Man’s arc reactor.\n2. Parts you need for the desk test: Elegoo Uno board, NeoPixel ring (16 lights), one resistor (220Ω–470Ω), breadboard, jumper wires, USB cable.\n3. Tool for later: soldering iron (only in Part 3). For now you only plug wires — no heat.\n4. Done looks like: a round board of LEDs that can light up when the Uno is powered.\n5. Quick check: you can point to the ring, the Uno, and the USB cable on your table.\n6. Common mistake: buying a ring with no labeled pads. You need pads marked DIN, 5V (or V+), and GND.",
          "warn": "Do not plug the board in yet. Read the map first."
        },
        {
          "title": "Three wires only",
          "action": "Power, ground, and data. Data goes Uno D6 → resistor → ring DIN.",
          "from": "D6",
          "to": "DIN",
          "diagram": "map",
          "detail": "1. Look at the wiring map picture in this step.\n2. Red wire = power: Uno pin labeled 5V goes to the ring pad labeled 5V or V+.\n3. Black (or dark) wire = ground: Uno pin labeled GND goes to the ring pad labeled GND.\n4. Yellow (or any other color) wire = data: Uno pin labeled D6 (digital pin 6) goes through a 220Ω–470Ω resistor, then to the ring pad labeled DIN.\n5. DIN means “data in” — that is where the Uno talks to the lights. DOUT means “data out” — leave it empty.\n6. Done looks like: you can say the three paths out loud without looking at notes.\n7. Quick check: D6 is next to D5 and D7 on the Uno. It is not the pin labeled A0.\n8. Common mistake: wiring data to DOUT instead of DIN. The ring stays dark.",
          "warn": "Never swap 5V and GND. That can kill the LEDs."
        },
        {
          "title": "Success looks like",
          "action": "Lights chase around once, then the whole ring gently breathes ice-blue.",
          "check": "m1",
          "detail": "1. When everything works, the ring does a short cyan (blue-green) chase around the circle.\n2. Then every light slowly gets brighter and dimmer together — a “breathing” glow.\n3. Tool: none for this step — this is only your win picture.\n4. Done looks like: chase → soft pulse forever (until you unplug USB).\n5. Quick check: brightness feels soft, not blinding. If it is too bright, lower BRIGHT in the code later.\n6. Common mistake: expecting a movie-perfect metal shell. This guide is the lights first; a chest mount is optional at the end."
        }
      ]
    },
    {
      "id": "lib",
      "title": "2. Install the library",
      "steps": [
        {
          "title": "Open Library Manager",
          "action": "In Arduino IDE: Sketch → Include Library → Manage Libraries…",
          "detail": "1. Open the Arduino IDE app on your computer (the program you use to upload code to the Uno).\n2. At the top menu click Sketch.\n3. Hover Include Library, then click Manage Libraries…\n4. A Library Manager window opens with a search box at the top.\n5. Done looks like: you see a list of libraries and a search field.\n6. Quick check: if you cannot find Manage Libraries, you may be on an older IDE — use Tools → Manage Libraries… instead.\n7. Common mistake: opening the Serial Monitor instead of Library Manager. Close it and try the Sketch menu again."
        },
        {
          "title": "Install Adafruit NeoPixel",
          "action": "Search “Adafruit NeoPixel” and install the one by Adafruit.",
          "detail": "1. In the Library Manager search box, type: Adafruit NeoPixel\n2. Find the result that says it is by Adafruit (the official one).\n3. Click Install. If it offers extra Adafruit helper libraries, click Install all / Yes.\n4. Tool: only the Arduino IDE — no screwdriver or iron.\n5. Done looks like: the button changes to “Installed” (or similar).\n6. Quick check: search again — you should see it marked installed.\n7. Common mistake: installing a random “NeoPixel” clone. Use the Adafruit author name.",
          "why": "The library is ready-made code that knows how to talk to the LED ring."
        },
        {
          "title": "Copy the sketch",
          "action": "New sketch → paste the Arc Reactor code from this guide → save as ArcReactor.",
          "check": "l1",
          "detail": "1. In Arduino IDE: File → New to open a blank sketch.\n2. Select all the default text in the new sketch and delete it.\n3. Open this FUX guide’s Info tab (or Code section) and copy the Arc Reactor code.\n4. Paste it into the empty sketch.\n5. File → Save. Name it ArcReactor.\n6. Done looks like: the sketch title bar says ArcReactor and the code includes Adafruit_NeoPixel and PIN 6.\n7. Quick check: near the top you see #define PIN 6 and #define NUM_LEDS 16 (use 12 only if your ring has 12 lights).\n8. Common mistake: leaving the old empty setup()/loop() mix so the file will not compile. Paste the full guide code."
        }
      ]
    },
    {
      "id": "breadboard",
      "title": "3. Breadboard test (no solder yet)",
      "callout": {
        "tone": "warn",
        "lead": "COLD WIRING",
        "text": "USB stays unplugged while you move wires. Prove the glow on the breadboard before any soldering."
      },
      "diagram": "pads",
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Pull the USB cable out of the Elegoo Uno before you touch any wires.",
          "warn": "Cold wiring only — never rearrange wires while USB is plugged in.",
          "detail": "1. Find the USB cable in the Uno.\n2. Unplug it from the Uno (or from the computer).\n3. Tool: your hands only.\n4. Done looks like: no cable in the Uno’s USB port.\n5. Quick check: the Uno’s ON light is off.\n6. Common mistake: leaving USB half-plugged. Pull it fully out."
        },
        {
          "title": "Find the pads",
          "action": "On the ring, find DIN, 5V (or V+), and GND. Leave DOUT empty.",
          "diagram": "pads",
          "warn": "DOUT is not the Uno data pin. Use DIN.",
          "detail": "1. Hold the LED ring so you can read the tiny labels on the solder pads.\n2. Find DIN (data in) — often near a printed arrow pointing toward that pad.\n3. Find 5V or V+ (power in).\n4. Find GND (ground).\n5. Find DOUT (data out) — you will not use it in this build. Leave it empty.\n6. Done looks like: you can tap DIN, 5V, and GND with your finger and name them.\n7. Quick check: take a phone photo of the pad labels if they are hard to read later.\n8. Common mistake: mixing DIN and DOUT. Wrong pad = dark ring."
        },
        {
          "title": "Seat the ring",
          "action": "Place the ring so the three pads can take jumper wires (or use the headers/clips that came with it).",
          "detail": "1. Put the breadboard on the table.\n2. Lay the ring nearby (on the breadboard or just beside it) so the pads face up.\n3. If your ring has male pins already soldered, plug those pins into the breadboard rows.\n4. If the pads are bare, you will press jumper ends onto the pads or use alligator clips — keep the metal touching only one pad each.\n5. Tool: breadboard + jumpers (no iron yet).\n6. Done looks like: the ring sits steady and you can reach DIN, 5V, and GND.\n7. Quick check: nothing metal is shorting across two pads at once.\n8. Common mistake: forcing the ring so pads bend or crack. Be gentle."
        },
        {
          "title": "Wire power (5V)",
          "action": "Red jumper: Uno 5V → ring 5V / V+.",
          "from": "5V",
          "to": "ring 5V",
          "detail": "1. Take a red jumper wire.\n2. Plug one end into the Uno pin labeled 5V (in the POWER header).\n3. Connect the other end to the ring pad labeled 5V or V+.\n4. Tool: jumper wire only.\n5. Done looks like: a clear red path from Uno 5V to ring 5V.\n6. Quick check: you did not use the Uno pin labeled 3.3V.\n7. Common mistake: putting 5V on the ring GND pad. Double-check labels before the next wire.",
          "warn": "5V goes only to 5V/V+. Never to GND."
        },
        {
          "title": "Wire ground (GND)",
          "action": "Black jumper: Uno GND → ring GND.",
          "from": "GND",
          "to": "ring GND",
          "detail": "1. Take a black (or dark) jumper wire.\n2. Plug one end into any Uno pin labeled GND.\n3. Connect the other end to the ring pad labeled GND.\n4. Done looks like: red on 5V, black on GND — two separate pads.\n5. Quick check: the two wires do not share the same breadboard hole.\n6. Common mistake: both wires accidentally in the same breadboard row, shorting 5V to GND."
        },
        {
          "title": "Wire data with resistor",
          "action": "Uno D6 → 220–470Ω resistor → ring DIN.",
          "from": "D6",
          "to": "DIN via R",
          "why": "The resistor softens sharp data spikes so the first LED lasts longer.",
          "detail": "1. Find a resistor between 220 ohm and 470 ohm (bands often look reddish/brown — if unsure, use a kit resistor marked 220 or 470).\n2. Plug one resistor leg into a free breadboard row.\n3. Yellow jumper: Uno pin D6 → that same breadboard row (touching the resistor leg).\n4. Second jumper (or the other resistor leg path): from the other resistor leg → ring DIN pad.\n5. Path to remember: D6 → resistor → DIN.\n6. Tool: resistor + two jumpers (or one jumper + resistor bridging).\n7. Done looks like: data never goes straight from D6 to DIN without the resistor in between.\n8. Quick check: D6 is digital pin 6, not analog A6 (Uno has no A6 usable the same way — use the D6 silk label).\n9. Common mistake: skipping the resistor. It can work briefly, then fail — put the resistor in.",
          "warn": "Data must land on DIN, not DOUT."
        },
        {
          "title": "Optional capacitor",
          "action": "If you have a kit electrolytic capacitor, put it across 5V and GND near the ring (long leg on 5V).",
          "warn": "Electrolytic caps have a stripe on the short (−) leg — that leg goes to GND.",
          "detail": "1. This step is optional. Skip if you have no capacitor.\n2. Find a small electrolytic capacitor from the kit (looks like a tiny can).\n3. Long leg = positive → connect toward 5V near the ring.\n4. Short leg with the stripe = negative → connect to GND.\n5. Tool: capacitor only (still no soldering).\n6. Done looks like: cap bridges 5V and GND next to the ring power wires.\n7. Quick check: stripe leg is NOT on 5V.\n8. Common mistake: reversing the capacitor. Wrong way can damage it."
        },
        {
          "title": "Before-power checklist",
          "action": "Read every box on the checklist picture. Fix anything wrong before USB.",
          "diagram": "checklist",
          "check": "b1",
          "detail": "1. Open the checklist diagram for this step.\n2. Confirm: ring 5V wire is on 5V/V+, not GND.\n3. Confirm: ring GND wire is on GND.\n4. Confirm: data path is Uno D6 → resistor → ring DIN.\n5. Confirm: DOUT is empty and no shiny metal bridges two pads.\n6. Confirm: in code, BRIGHT is 40 or less.\n7. Confirm: iron is still put away — we are not soldering yet.\n8. Done looks like: every checklist line is true.\n9. Quick check: say the three wire paths out loud one more time.\n10. Common mistake: plugging USB “just to see” before the checklist. Wait."
        },
        {
          "title": "Upload the code",
          "action": "Plug USB. Board = Arduino Uno. Choose your Port. Upload ArcReactor.",
          "detail": "1. Plug the USB cable into the Uno and your computer.\n2. In Arduino IDE: Tools → Board → Arduino Uno (or Arduino AVR Boards → Uno).\n3. Tools → Port → pick the new USB port (on Windows it often looks like COM3; on Mac like /dev/cu.usbmodem…).\n4. Click the Upload button (right arrow).\n5. Tool: USB cable + Arduino IDE.\n6. Done looks like: IDE says “Done uploading.”\n7. Quick check: if Upload fails, unplug/replug USB and re-select Port.\n8. Common mistake: Board set to “Mega” or “Nano” by accident. Set Uno."
        },
        {
          "title": "Win check",
          "action": "Cyan chase, then soft breathing glow. If dark, recheck DIN vs DOUT and 5V/GND.",
          "check": "b2",
          "detail": "1. Watch the ring right after upload.\n2. You should see a short chase around the circle, then a gentle pulse.\n3. Done looks like: soft ice-blue breathing that keeps going.\n4. Quick check: if only one LED flickers, data may be on the wrong pad — unplug USB and move the data wire to DIN.\n5. If nothing lights: unplug USB, swap-check 5V/GND labels, confirm D6→resistor→DIN, plug back in, upload again.\n6. Common mistake: leaving brightness at a huge number. Keep BRIGHT ≤ 40 on USB.",
          "warn": "Unplug USB before you move any wire."
        }
      ]
    },
    {
      "id": "solder",
      "title": "4. Solder leads on the ring",
      "callout": {
        "tone": "danger",
        "lead": "HOT TIP",
        "text": "Never grab the iron tip. Hold only the handle. Keep the ring off the Uno while you solder."
      },
      "diagram": "safety",
      "steps": [
        {
          "title": "Unplug and remove the ring",
          "action": "Unplug USB. Take the ring off the breadboard so you can solder safely.",
          "warn": "USB out before any heat.",
          "detail": "1. Unplug USB from the Uno.\n2. Gently remove the ring and its temporary jumpers from the breadboard.\n3. Set the Uno aside — you will not solder while it is attached.\n4. Done looks like: ring alone on the table, USB out.\n5. Quick check: Uno power light is off.\n6. Common mistake: soldering with USB still connected. Always unplug first."
        },
        {
          "title": "Safety setup",
          "action": "Glasses on. Wet sponge. Iron in stand. Hold the HANDLE only — never the TIP.",
          "diagram": "safety",
          "warn": "The tip stays hot for minutes after you unplug the iron.",
          "detail": "1. Put on safety glasses.\n2. Wet the iron sponge (damp, not dripping).\n3. Place the soldering iron in its stand.\n4. Say out loud: I hold the handle. I never grab the tip.\n5. Tool: iron + stand + sponge + glasses.\n6. Done looks like: iron parked in the stand before you heat anything.\n7. Quick check: tip is pointed into the stand coil, not hanging off the table.\n8. Common mistake: setting a hot iron on the table. Always use the stand."
        },
        {
          "title": "Set about 350°C",
          "action": "Set the iron near 350°C (or the electronics preset).",
          "detail": "1. Turn the iron on.\n2. Set temperature near 350°C (about 660°F), or choose an “electronics” preset if your iron has one.\n3. Wait until it is ready (many irons beep or show a ready light).\n4. Done looks like: iron is hot and still resting in the stand.\n5. Quick check: you can melt a tiny bit of solder on the tip in the next step.\n6. Common mistake: cranking to maximum heat. Hotter is not always better — about 350°C is enough."
        },
        {
          "title": "Tin the tip",
          "action": "Wipe tip on wet sponge. Add a tiny bit of solder until shiny. Park in stand.",
          "detail": "1. Lift the iron by the handle.\n2. Wipe the tip once on the wet sponge.\n3. Touch solder to the tip until it looks shiny silver.\n4. Put the iron back in the stand.\n5. Done looks like: a shiny tip, not black and crusty.\n6. Quick check: excess blobs wiped off — you want a thin shiny coat.\n7. Common mistake: feeding a huge blob of solder onto the tip. Use a little."
        },
        {
          "title": "Solder red to 5V",
          "action": "Strip ~3 mm on a red wire. Heat pad + wire together, then feed solder.",
          "from": "Red wire",
          "to": "5V pad",
          "diagram": "solder",
          "warn": "Feed solder to the pad and wire — not only to the iron tip.",
          "detail": "1. Strip about 3 mm (about 1/8 inch) of insulation from a red jumper wire.\n2. Twist the bare copper so it is neat.\n3. Hold the bare end on the ring’s 5V (or V+) pad.\n4. Touch the iron tip to the pad AND the wire together for about 2 seconds.\n5. Feed a little solder where pad and wire meet until it flows into a small shiny cone.\n6. Remove solder, then remove the iron. Hold still until it hardens.\n7. Tool: iron + solder + red wire.\n8. Done looks like: red wire stuck on 5V with a shiny joint — not a dull ball.\n9. Quick check: tug gently. The wire should not pull off.\n10. Common mistake: melting solder only on the tip then wiping it on a cold pad. Heat the pad and wire first."
        },
        {
          "title": "Solder black to GND",
          "action": "Same method: black wire → GND pad.",
          "from": "Black wire",
          "to": "GND pad",
          "detail": "1. Strip about 3 mm on a black wire.\n2. Heat the ring GND pad and the wire together.\n3. Feed solder into the joint until shiny.\n4. Done looks like: black wire on GND, red wire on 5V — two separate pads.\n5. Quick check: no solder bridge connecting 5V and GND together.\n6. Common mistake: bridging both pads with one blob. If that happens, unplug iron heat and wick/clean before continuing."
        },
        {
          "title": "Solder yellow to DIN",
          "action": "Yellow wire → DIN pad. Leave DOUT empty.",
          "from": "Yellow wire",
          "to": "DIN pad",
          "check": "s1",
          "detail": "1. Strip about 3 mm on a yellow (data) wire.\n2. Heat the DIN pad and the wire together.\n3. Feed solder for a shiny joint.\n4. Do not solder anything to DOUT.\n5. Done looks like: three wires on 5V, GND, and DIN only.\n6. Quick check: read the pad labels one more time before you cool down.\n7. Common mistake: soldering data to DOUT. Desolder and move to DIN if you did.",
          "warn": "DOUT stays empty."
        },
        {
          "title": "Inspect the joints",
          "action": "Each joint should look like a tiny shiny volcano. No bridges between pads.",
          "warn": "Dull ball = cold joint. Reheat pad+wire and add a touch of solder.",
          "detail": "1. Look at each of the three joints under good light.\n2. Good joint: shiny, covers the pad and hugs the wire.\n3. Bad joint: dull, crumbly, or a ball sitting on top.\n4. Check for bridges — solder accidentally connecting two pads.\n5. Done looks like: three clean separate joints.\n6. Quick check: gentle tug on each wire.\n7. Common mistake: leaving a bridge between 5V and GND. Fix before power."
        },
        {
          "title": "Cool and reconnect",
          "action": "Iron in stand. When cool: 5V→5V, GND→GND, yellow through resistor into Uno D6.",
          "check": "s2",
          "detail": "1. Put the iron back in the stand and turn it off when finished.\n2. Wait until the joints are cool to a careful near-touch (not burning hot).\n3. Connect red wire to Uno 5V.\n4. Connect black wire to Uno GND.\n5. Connect yellow wire to the resistor, and the other side of the resistor to Uno D6 (same D6→resistor→DIN idea as before; the DIN end is already soldered).\n6. Done looks like: ring hanging on three solid wires, still with the resistor on the data line.\n7. Quick check: resistor is still in the data path.\n8. Common mistake: skipping the resistor after soldering. Keep it."
        },
        {
          "title": "Checklist again",
          "action": "Run the before-power checklist picture one more time.",
          "diagram": "checklist",
          "detail": "1. Open the checklist diagram.\n2. Confirm 5V, GND, and DIN wiring one more time.\n3. Confirm no solder bridges.\n4. Confirm BRIGHT ≤ 40 in code.\n5. Confirm iron is in the stand / off.\n6. Done looks like: every checklist line is true.\n7. Common mistake: powering up while the iron is still lying on the bench. Park it first."
        },
        {
          "title": "Power on",
          "action": "Plug USB. Upload if needed. Chase + breathe should return.",
          "check": "s3",
          "detail": "1. Plug USB into the Uno.\n2. Upload ArcReactor again if the lights do not start.\n3. Done looks like: chase, then breathing glow — same as the breadboard win.\n4. Quick check: if dark, unplug and recheck DIN vs DOUT and 5V/GND.\n5. Common mistake: touching pads while powered. Unplug before you poke."
        },
        {
          "title": "Optional chest mount",
          "action": "Tape or pin the ring to a cardboard circle for a desk prop. Wearable upgrades later.",
          "detail": "1. Cut a cardboard circle a bit bigger than the ring.\n2. Tape or pin the ring to the cardboard so wires exit neatly at the bottom.\n3. Tool: scissors + tape (no new electronics required).\n4. Done looks like: a desk prop you can stand up.\n5. Quick check: wires are not pinched hard enough to break the joints.\n6. Common mistake: buying a Nano + battery pack before the desk version works. Ask Kaserin before new purchases."
        }
      ]
    }
  ]
};
