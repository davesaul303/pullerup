window.FUX_GUIDE = {
  "id": "theremin",
  "title": "Ultrasonic Theremin",
  "summary": "Wave a hand over the HC-SR04. A passive buzzer plays sci-fi notes — closer = higher. Button flips scales. Breadboard test, then solder the blue shield.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "1–2 hr",
  "partsCount": 8,
  "pullerup": "../parts/theremin.html",
  "beforeYouStart": "Unplug USB while moving wires or soldering. Do ONE step at a time. Pass Part 2 (breadboard) before Part 3 (soldering). Use a PASSIVE buzzer so tone() can change pitch. Iron tip ≈ 350°C — NEVER grab it; hold only the handle. Do not put the sensor against your ear or eye.",
  "tips": {},
  "parts": [
    "Elegoo Uno",
    "Blue prototype shield",
    "HC-SR04 ultrasonic sensor",
    "Passive buzzer (kit or Adafruit PS1240)",
    "Pushbutton",
    "Breadboard + jumpers",
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
      "Trig",
      "D9"
    ],
    [
      "Echo",
      "D10"
    ],
    [
      "Buzzer",
      "D8 → passive +"
    ],
    [
      "Button",
      "D2 to GND (pull-up)"
    ],
    [
      "Play range",
      "5–40 cm"
    ]
  ],
  "code": "// Ultrasonic Theremin — HC-SR04 + passive buzzer\n// Hand closer = higher pitch. Button on D2 cycles scales.\n\nconst int TRIG = 9;\nconst int ECHO = 10;\nconst int BUZZ = 8;   // passive buzzer + → D8, − → GND\nconst int BTN  = 2;   // button to GND (INPUT_PULLUP)\n\n// Three sci-fi-ish scales (Hz). Index picked by button.\nconst int N0[] = {196, 220, 247, 294, 330, 392, 440, 523}; // G minor-ish\nconst int N1[] = {262, 311, 349, 392, 466, 523, 622, 698}; // spooky\nconst int N2[] = {220, 277, 330, 370, 440, 554, 659, 740}; // A harmonic\nconst int *SCALES[] = {N0, N1, N2};\nconst int SCALE_LEN = 8;\nint scaleIdx = 0;\n\nint lastBtn = HIGH;\nunsigned long lastDebounce = 0;\n\nvoid setup() {\n  pinMode(TRIG, OUTPUT);\n  pinMode(ECHO, INPUT);\n  pinMode(BUZZ, OUTPUT);\n  pinMode(BTN, INPUT_PULLUP);\n  Serial.begin(9600);\n  Serial.println(\"Theremin ready — wave hand 5–40 cm. Button = next scale.\");\n}\n\nlong distanceCm() {\n  digitalWrite(TRIG, LOW);\n  delayMicroseconds(2);\n  digitalWrite(TRIG, HIGH);\n  delayMicroseconds(10);\n  digitalWrite(TRIG, LOW);\n  long us = pulseIn(ECHO, HIGH, 25000); // timeout ~4 m\n  if (us == 0) return -1;\n  return us / 58; // ~cm\n}\n\nvoid loop() {\n  // ---- scale button (press to GND) ----\n  int b = digitalRead(BTN);\n  if (b != lastBtn) lastDebounce = millis();\n  if ((millis() - lastDebounce) > 40) {\n    static int stable = HIGH;\n    if (b != stable) {\n      stable = b;\n      if (stable == LOW) {\n        scaleIdx = (scaleIdx + 1) % 3;\n        Serial.print(\"Scale \");\n        Serial.println(scaleIdx);\n        // tiny confirm blip\n        tone(BUZZ, 880, 60);\n        delay(70);\n        noTone(BUZZ);\n      }\n    }\n  }\n  lastBtn = b;\n\n  long cm = distanceCm();\n  if (cm < 5 || cm > 40 || cm < 0) {\n    noTone(BUZZ);          // hand gone / too close / too far → silence\n    delay(20);\n    return;\n  }\n\n  // Map 40 cm → low note index, 5 cm → high\n  int idx = map(cm, 40, 5, 0, SCALE_LEN - 1);\n  if (idx < 0) idx = 0;\n  if (idx > SCALE_LEN - 1) idx = SCALE_LEN - 1;\n\n  int hz = SCALES[scaleIdx][idx];\n  tone(BUZZ, hz);\n\n  Serial.print(cm);\n  Serial.print(\" cm  \");\n  Serial.print(hz);\n  Serial.println(\" Hz\");\n  delay(30);\n}\n",
  "diagrams": {
    "map": "<svg viewBox=\"0 0 900 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"THEREMIN WIRING MAP\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"900\" height=\"360\" fill=\"#030503\"/><rect width=\"900\" height=\"360\" fill=\"url(#g)\"/><text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">THEREMIN WIRING MAP</text>\n<rect x=\"30\" y=\"55\" width=\"200\" height=\"200\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"130\" y=\"110\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO</text>\n<text x=\"130\" y=\"140\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5V GND</text>\n<text x=\"130\" y=\"165\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">D9 D10 D8 D2</text>\n<rect x=\"300\" y=\"55\" width=\"220\" height=\"120\" rx=\"6\" fill=\"#0a1520\" stroke=\"#4fc3f7\" stroke-width=\"2\"/>\n<text x=\"410\" y=\"95\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HC-SR04</text>\n<text x=\"410\" y=\"120\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VCC→5V Trig→D9</text>\n<text x=\"410\" y=\"145\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Echo→D10 GND→GND</text>\n<circle cx=\"410\" cy=\"95\" r=\"0\"/>\n<circle cx=\"650\" cy=\"100\" r=\"45\" fill=\"#111\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"650\" y=\"95\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BUZZ</text>\n<text x=\"650\" y=\"115\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">+→D8  −→GND</text>\n<rect x=\"580\" y=\"180\" width=\"160\" height=\"70\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/>\n<text x=\"660\" y=\"210\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BUTTON</text>\n<text x=\"660\" y=\"232\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">one leg D2 · other GND</text>\n<line x1=\"230\" y1=\"100\" x2=\"300\" y2=\"100\" stroke=\"#4fc3f7\" stroke-width=\"3\"/>\n<line x1=\"230\" y1=\"160\" x2=\"605\" y2=\"100\" stroke=\"#b8ff3c\" stroke-width=\"3\"/>\n<text x=\"450\" y=\"332\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Hand over the sensor eyes. Closer = higher note. Button = next scale.</text></svg>",
    "passive": "<svg viewBox=\"0 0 800 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"PASSIVE VS ACTIVE BUZZER\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"800\" height=\"300\" fill=\"#030503\"/><rect width=\"800\" height=\"300\" fill=\"url(#g)\"/><text x=\"400\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PASSIVE VS ACTIVE BUZZER</text>\n<rect x=\"50\" y=\"55\" width=\"320\" height=\"170\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"210\" y=\"100\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PASSIVE — USE THIS</text>\n<text x=\"210\" y=\"135\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Open underside / no chip</text>\n<text x=\"210\" y=\"165\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">tone() can change pitch</text>\n<rect x=\"430\" y=\"55\" width=\"320\" height=\"170\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6392d\" stroke-width=\"2\"/>\n<text x=\"590\" y=\"100\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ACTIVE — SKIP</text>\n<text x=\"590\" y=\"135\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Sealed board / fixed beep</text>\n<text x=\"590\" y=\"165\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Pitch will not track hand</text>\n<text x=\"400\" y=\"272\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">If pitch stays stuck, swap to the Adafruit $1.50 piezo.</text><text x=\"400\" y=\"290\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: active buzzers ignore tone() frequency.</text></svg>",
    "hand": "<svg viewBox=\"0 0 700 280\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"HAND RANGE 5–40 CM\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"700\" height=\"280\" fill=\"#030503\"/><rect width=\"700\" height=\"280\" fill=\"url(#g)\"/><text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HAND RANGE 5–40 CM</text>\n<rect x=\"80\" y=\"60\" width=\"540\" height=\"140\" rx=\"6\" fill=\"rgba(79,195,247,.1)\" stroke=\"#4fc3f7\" stroke-width=\"2\"/>\n<text x=\"350\" y=\"110\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Wave palm over both sensor eyes</text>\n<text x=\"350\" y=\"140\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5 cm = high note · 40 cm = low · outside = silence</text>\n<text x=\"350\" y=\"170\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Keep steady — jerky hand = warbly pitch</text>\n<text x=\"350\" y=\"252\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Do not press the sensor against skin, ear, or eye.</text></svg>",
    "safety": "<svg viewBox=\"0 0 900 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SOLDER SAFETY — HOT TIP\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"900\" height=\"300\" fill=\"#030503\"/><rect width=\"900\" height=\"300\" fill=\"url(#g)\"/><text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SOLDER SAFETY — HOT TIP</text>\n<rect x=\"40\" y=\"45\" width=\"820\" height=\"70\" rx=\"6\" fill=\"rgba(230,57,45,.18)\" stroke=\"#e6392d\" stroke-width=\"2\"/>\n<text x=\"450\" y=\"75\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HOT TIP ≈ 350°C / 660°F — NEVER GRAB THE TIP</text>\n<text x=\"450\" y=\"95\" text-anchor=\"middle\" fill=\"#ffcdd2\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Hold ONLY the handle. Iron in stand when idle. Glasses on.</text>\n<rect x=\"80\" y=\"145\" width=\"220\" height=\"90\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"190\" y=\"185\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HANDLE</text>\n<text x=\"190\" y=\"210\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">safe to hold</text>\n<rect x=\"340\" y=\"145\" width=\"220\" height=\"90\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6392d\" stroke-width=\"2\"/>\n<text x=\"450\" y=\"185\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TIP</text>\n<text x=\"450\" y=\"210\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">scorching — no touch</text>\n<rect x=\"600\" y=\"145\" width=\"220\" height=\"90\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/>\n<text x=\"710\" y=\"185\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">STAND</text>\n<text x=\"710\" y=\"210\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">park it here</text>\n<text x=\"450\" y=\"272\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Shield OFF the Uno while you solder.</text></svg>",
    "checklist": "<svg viewBox=\"0 0 820 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"BEFORE POWER-ON CHECKLIST\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"820\" height=\"340\" fill=\"#030503\"/><rect width=\"820\" height=\"340\" fill=\"url(#g)\"/><text x=\"410\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BEFORE POWER-ON CHECKLIST</text>\n<rect x=\"50\" y=\"50\" width=\"720\" height=\"240\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"90\" y=\"95\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ HC-SR04: VCC→5V · GND→GND · Trig→D9 · Echo→D10</text>\n<text x=\"90\" y=\"130\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ Passive buzzer + → D8 · − → GND (not an active fixed beep)</text>\n<text x=\"90\" y=\"165\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ Button bridges D2 to GND (INPUT_PULLUP in code)</text>\n<text x=\"90\" y=\"200\" text-anchor=\"start\" fill=\"#dce6d6\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ No 5V wired into Echo by mistake</text>\n<text x=\"90\" y=\"235\" text-anchor=\"start\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">☐ Iron in stand · USB still unplugged until Ready</text>\n<text x=\"410\" y=\"312\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">If anything looks wrong, fix it before plugging USB.</text></svg>"
  },
  "sections": [
    {
      "id": "meet",
      "title": "1. Meet the build",
      "callout": {
        "tone": "warn",
        "lead": "PASSIVE BUZZER",
        "text": "Pitch tracking needs a passive buzzer. Active ones only beep one note — check Part 2."
      },
      "diagram": "map",
      "steps": [
        {
          "title": "What it does",
          "action": "Wave your hand over the sensor. Closer → higher sci-fi note. Button flips the scale."
        },
        {
          "title": "Pin map",
          "action": "Trig D9, Echo D10, buzzer D8, button D2→GND.",
          "from": "hand",
          "to": "pitch",
          "diagram": "map"
        },
        {
          "title": "Success looks like",
          "action": "Smooth pitch changes as you move. Outside 5–40 cm goes quiet. Button blips and changes the scale.",
          "check": "m1"
        }
      ]
    },
    {
      "id": "buzzer",
      "title": "2. Pick the right buzzer",
      "diagram": "passive",
      "steps": [
        {
          "title": "Flip it over",
          "action": "Look under the buzzer. Open / green PCB without a sealed black blob → usually passive.",
          "diagram": "passive"
        },
        {
          "title": "Active warning",
          "action": "If it has a tiny sealed circuit and only one fixed beep on 5V, it is active — do not use it for this build.",
          "warn": "WATCH OUT: active buzzer = stuck pitch. Buy Adafruit #160 ($1.50) if needed."
        },
        {
          "title": "Mark the +",
          "action": "Find the + mark on the passive buzzer. That leg goes to D8.",
          "check": "z1"
        }
      ]
    },
    {
      "id": "breadboard",
      "title": "Part 2: Breadboard test (no solder yet)",
      "callout": {
        "tone": "warn",
        "lead": "COLD WIRING",
        "text": "USB unplugged while you move wires. Prove sound on the breadboard before soldering."
      },
      "diagram": "map",
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug USB from the Elegoo.",
          "warn": "WATCH OUT: cold wiring only."
        },
        {
          "title": "Sensor power",
          "action": "HC-SR04 VCC → 5V. HC-SR04 GND → GND.",
          "from": "5V",
          "to": "VCC"
        },
        {
          "title": "Sensor signals",
          "action": "Trig → D9. Echo → D10.",
          "from": "Trig/Echo",
          "to": "D9/D10",
          "warn": "WATCH OUT: do not swap Trig and Echo."
        },
        {
          "title": "Buzzer",
          "action": "Passive buzzer + → D8. − → GND."
        },
        {
          "title": "Button",
          "action": "Seat the button across the breadboard ditch. One side to D2, other side to GND (no resistor — we use INPUT_PULLUP)."
        },
        {
          "title": "Before-power checklist",
          "action": "Read every box on the checklist picture.",
          "diagram": "checklist",
          "check": "b1"
        },
        {
          "title": "Upload",
          "action": "Plug USB. Board: Arduino Uno. Paste the Theremin sketch. Upload. Open Serial at 9600."
        },
        {
          "title": "Play",
          "action": "Wave a palm 5–40 cm over both sensor eyes. Pitch should track. Press the button for the next scale.",
          "diagram": "hand",
          "warn": "WATCH OUT: never aim the sensor into an eye or ear up close."
        },
        {
          "title": "Win check",
          "action": "Pitch moves with your hand. Silence when you walk away. Button changes the scale with a blip.",
          "check": "b2"
        },
        {
          "title": "If stuck on one beep",
          "action": "You likely have an active buzzer. Stop and get the Adafruit piezo ($1.50) before soldering."
        }
      ]
    },
    {
      "id": "solder",
      "title": "Part 3: Solder on the blue shield",
      "callout": {
        "tone": "danger",
        "lead": "HOT TIP",
        "text": "Never grab the iron tip. Hold only the handle. Shield OFF the Uno while soldering."
      },
      "diagram": "safety",
      "steps": [
        {
          "title": "Unplug + shield off",
          "action": "Unplug USB. Pull the blue shield OFF the Uno.",
          "warn": "WATCH OUT: USB out. Shield off before heat."
        },
        {
          "title": "Safety setup",
          "action": "Glasses on. Wet sponge. Iron in stand. Say: I hold the HANDLE. I never grab the TIP.",
          "diagram": "safety"
        },
        {
          "title": "Set ~350°C + tin",
          "action": "Set ~350°C. Wipe tip on sponge. Add a little solder until shiny. Park in stand."
        },
        {
          "title": "Solder sensor header/wires",
          "action": "On the shield, solder short jumpers or pins for VCC, Trig, Echo, GND in a clear row labeled for the HC-SR04.",
          "detail": "Same pin map: Trig→D9 net, Echo→D10 net, VCC→5V, GND→GND."
        },
        {
          "title": "Solder buzzer",
          "action": "Solder buzzer + to a pad tied to D8, − to GND. Heat pad+leg together, then feed solder.",
          "from": "buzzer +",
          "to": "D8 pad",
          "warn": "WATCH OUT: feed solder to pad/leg — not only the tip."
        },
        {
          "title": "Solder button",
          "action": "Solder the pushbutton so one side hits D2 and the other hits GND.",
          "check": "s1"
        },
        {
          "title": "Inspect",
          "action": "Shiny volcano joints. No bridges between neighboring pads. Trim long leads with cutters aimed down.",
          "warn": "WATCH OUT: flying lead bits — glasses on."
        },
        {
          "title": "Cool + seat",
          "action": "Iron in stand. Wait until cool. Press shield onto the Uno gently.",
          "check": "s2"
        },
        {
          "title": "Before-power checklist again",
          "action": "Run the checklist picture once more.",
          "diagram": "checklist"
        },
        {
          "title": "Power on",
          "action": "Plug USB. Upload if needed. Wave and play.",
          "check": "s3"
        }
      ]
    }
  ]
};
