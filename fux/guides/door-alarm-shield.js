window.FUX_GUIDE = {
  "id": "door-alarm-shield",
  "title": "Door Alarm Shield",
  "summary": "Build a permanent ultrasonic door alarm on your Elegoo Uno. One small step at a time, from breadboard test to soldered shield by your door.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "2–4 hr",
  "partsCount": 14,
  "pullerup": null,
  "beforeYouStart": "Your code is already on the Elegoo. Unplug USB before you move any wires. Plug power back in only when a step says so.",
  "parts": [
    "Elegoo Uno (small black board) — code already uploaded",
    "Blue prototype shield (board with many tiny holes)",
    "Ultrasonic sensor (two silver eyes) — HC-SR04",
    "Reset pushbutton",
    "Buzzer",
    "2 red LEDs and 2 blue LEDs",
    "4 resistors, 220Ω to 1kΩ (red-red-brown is 220Ω)",
    "Jumper wires (male-to-male)",
    "Breadboard (for the first test only)",
    "USB phone charger or 9V 1A wall adapter (2.1mm center-positive)"
  ],
  "tools": [
    "Soldering iron (~350°C / 650°F)",
    "Thin 0.8mm rosin-core solder",
    "Damp sponge or brass tip cleaner",
    "Flush cutters (small wire snips)"
  ],
  "specs": [
    [
      "Trigger",
      "Under ~30 cm (1 foot)"
    ],
    [
      "Latch",
      "Stays on until reset button"
    ],
    [
      "Lights",
      "Reds then blues every 150 ms"
    ],
    [
      "Sound",
      "1800 / 1000 Hz siren"
    ],
    [
      "Power",
      "USB charger or 9V 1A center-positive adapter"
    ]
  ],
  "code": "// ===== DOOR ALARM SHIELD (ULTRASONIC) =====\n\n// --- Pin assignments ---\nconst int TRIG_PIN   = 10;  // ultrasonic \"Trig\"\nconst int ECHO_PIN   = 11;  // ultrasonic \"Echo\"\nconst int RESET_PIN  = 3;   // reset button (to GND)\nconst int BUZZER_PIN = 9;   // buzzer (PWM pin)\nconst int LED_PINS[] = {4, 5, 6, 7};  // red, red, blue, blue\nconst int NUM_LEDS   = 4;\n\n// --- Settings ---\nconst int TRIGGER_CM = 30;  // alarm distance (about 1 foot)\n\n// --- Alarm state ---\nbool alarmOn = false;        // the latch: stays true until reset\nunsigned long lastStep = 0;  // pattern timer\nint step = 0;                // pattern step\n\nvoid setup() {\n  pinMode(TRIG_PIN, OUTPUT);\n  pinMode(ECHO_PIN, INPUT);\n  pinMode(RESET_PIN, INPUT_PULLUP);  // unpressed = HIGH, pressed = LOW\n  pinMode(BUZZER_PIN, OUTPUT);\n  for (int i = 0; i < NUM_LEDS; i++) pinMode(LED_PINS[i], OUTPUT);\n  Serial.begin(9600);  // lets you see distances in Serial Monitor\n}\n\n// --- Measure distance in cm ---\nlong readDistanceCm() {\n  // Send a 10-microsecond ping\n  digitalWrite(TRIG_PIN, LOW);  delayMicroseconds(2);\n  digitalWrite(TRIG_PIN, HIGH); delayMicroseconds(10);\n  digitalWrite(TRIG_PIN, LOW);\n\n  // Time how long the echo takes to come back (give up after 30 ms)\n  long duration = pulseIn(ECHO_PIN, HIGH, 30000);\n  if (duration == 0) return 999;  // nothing detected\n\n  // Sound travels ~0.034 cm per microsecond; divide by 2 for there-and-back\n  return duration * 0.034 / 2;\n}\n\nvoid loop() {\n  // --- Latch logic: check distance only while the alarm is off ---\n  if (!alarmOn) {\n    long cm = readDistanceCm();\n    Serial.println(cm);\n    if (cm > 0 && cm < TRIGGER_CM) {\n      alarmOn = true;  // latched ON, stays on after they walk away\n    }\n    delay(60);  // short pause between pings\n  }\n\n  // Reset button pressed -> turn everything off\n  if (digitalRead(RESET_PIN) == LOW) {\n    alarmOn = false;\n    noTone(BUZZER_PIN);\n    allLeds(LOW);\n    delay(1000);  // 1-second grace so it doesn't re-trigger on you\n  }\n\n  // --- Alarm patterns every 150 ms ---\n  if (alarmOn && millis() - lastStep >= 150) {\n    lastStep = millis();\n    step = (step + 1) % 4;\n\n    // Buzzer: alternating siren\n    if (step % 2 == 0) tone(BUZZER_PIN, 1800);\n    else               tone(BUZZER_PIN, 1000);\n\n    // LEDs: reds then blues\n    bool redsOn = (step < 2);\n    digitalWrite(LED_PINS[0], redsOn);\n    digitalWrite(LED_PINS[1], redsOn);\n    digitalWrite(LED_PINS[2], !redsOn);\n    digitalWrite(LED_PINS[3], !redsOn);\n  }\n}\n\n// Helper: turn all LEDs on or off\nvoid allLeds(int state) {\n  for (int i = 0; i < NUM_LEDS; i++) digitalWrite(LED_PINS[i], state);\n}\n",
  "diagrams": {
    "legend": "<svg viewBox=\"0 0 700 120\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Wire color legend\">\n<rect width=\"700\" height=\"120\" fill=\"#030503\"/>\n<g font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\" fill=\"#dce6d6\">\n<rect x=\"10\" y=\"10\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#c62828\"/><text x=\"48\" y=\"19\">Red = 5V power</text>\n<rect x=\"10\" y=\"26\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#9e9e9e\"/><text x=\"48\" y=\"35\">Black = GND (ground)</text>\n<rect x=\"10\" y=\"42\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#f9a825\"/><text x=\"48\" y=\"51\">Yellow = Trig (pin 10)</text>\n<rect x=\"10\" y=\"58\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#1565c0\"/><text x=\"48\" y=\"67\">Blue = Echo (pin 11)</text>\n<rect x=\"10\" y=\"74\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#6a1b9a\"/><text x=\"48\" y=\"83\">Purple = Reset (pin 3)</text>\n<rect x=\"320\" y=\"10\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#ef6c00\"/><text x=\"358\" y=\"19\">Orange = Buzzer (pin 9)</text>\n<rect x=\"320\" y=\"26\" width=\"28\" height=\"10\" rx=\"2\" fill=\"#2e7d32\"/><text x=\"358\" y=\"35\">Green = LED pins 4–7</text>\n</g></svg>",
    "pinmap": "<svg viewBox=\"0 0 700 280\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Full pin map\">\n<rect width=\"700\" height=\"280\" fill=\"#030503\"/><rect x=\"20\" y=\"20\" width=\"660\" height=\"240\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\"/>\n<text x=\"350\" y=\"50\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">FULL PIN MAP</text>\n<g font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">\n<rect x=\"50\" y=\"66\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#6a1b9a\"/><text x=\"70\" y=\"82\" text-anchor=\"middle\" fill=\"#fff\">D3</text><text x=\"102\" y=\"82\" fill=\"#dce6d6\">Reset button → GND</text>\n<rect x=\"50\" y=\"98\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#2e7d32\"/><text x=\"70\" y=\"114\" text-anchor=\"middle\" fill=\"#fff\">D4</text><text x=\"102\" y=\"114\" fill=\"#dce6d6\">Red LED 1 via resistor</text>\n<rect x=\"50\" y=\"130\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#2e7d32\"/><text x=\"70\" y=\"146\" text-anchor=\"middle\" fill=\"#fff\">D5</text><text x=\"102\" y=\"146\" fill=\"#dce6d6\">Red LED 2 via resistor</text>\n<rect x=\"50\" y=\"162\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#2e7d32\"/><text x=\"70\" y=\"178\" text-anchor=\"middle\" fill=\"#fff\">D6</text><text x=\"102\" y=\"178\" fill=\"#dce6d6\">Blue LED 1 via resistor</text>\n<rect x=\"50\" y=\"194\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#2e7d32\"/><text x=\"70\" y=\"210\" text-anchor=\"middle\" fill=\"#fff\">D7</text><text x=\"102\" y=\"210\" fill=\"#dce6d6\">Blue LED 2 via resistor</text>\n<rect x=\"380\" y=\"66\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#ef6c00\"/><text x=\"400\" y=\"82\" text-anchor=\"middle\" fill=\"#fff\">D9</text><text x=\"432\" y=\"82\" fill=\"#dce6d6\">Buzzer +</text>\n<rect x=\"380\" y=\"98\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#f9a825\"/><text x=\"400\" y=\"114\" text-anchor=\"middle\" fill=\"#111\">D10</text><text x=\"432\" y=\"114\" fill=\"#dce6d6\">Ultrasonic Trig</text>\n<rect x=\"380\" y=\"130\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#1565c0\"/><text x=\"400\" y=\"146\" text-anchor=\"middle\" fill=\"#fff\">D11</text><text x=\"432\" y=\"146\" fill=\"#dce6d6\">Ultrasonic Echo</text>\n<rect x=\"380\" y=\"162\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#c62828\"/><text x=\"400\" y=\"178\" text-anchor=\"middle\" fill=\"#fff\">5V</text><text x=\"432\" y=\"178\" fill=\"#dce6d6\">Sensor VCC</text>\n<rect x=\"380\" y=\"194\" width=\"40\" height=\"22\" rx=\"4\" fill=\"#9e9e9e\"/><text x=\"400\" y=\"210\" text-anchor=\"middle\" fill=\"#111\">GND</text><text x=\"432\" y=\"210\" fill=\"#dce6d6\">All grounds</text>\n</g></svg>",
    "sensor": "<svg viewBox=\"0 0 700 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Wire ultrasonic sensor\">\n<rect width=\"700\" height=\"360\" fill=\"#030503\"/>\n<rect x=\"80\" y=\"40\" width=\"220\" height=\"280\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<text x=\"190\" y=\"70\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Elegoo Uno</text>\n<rect x=\"140\" y=\"85\" width=\"100\" height=\"50\" rx=\"4\" fill=\"#101710\" stroke=\"#1c2a1c\"/>\n<text x=\"190\" y=\"115\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\">USB</text>\n<!-- left power -->\n<g font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\" fill=\"#7a8a76\">\n<rect x=\"60\" y=\"196\" width=\"28\" height=\"16\" rx=\"2\" fill=\"#c62828\"/><text x=\"50\" y=\"208\" text-anchor=\"end\">5V</text>\n<rect x=\"60\" y=\"218\" width=\"28\" height=\"16\" rx=\"2\" fill=\"#9e9e9e\"/><text x=\"50\" y=\"230\" text-anchor=\"end\">GND</text>\n</g>\n<!-- right digital -->\n<g font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\" fill=\"#7a8a76\">\n<rect x=\"292\" y=\"228\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#f9a825\"/><text x=\"330\" y=\"239\">D10</text>\n<rect x=\"292\" y=\"246\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#1565c0\"/><text x=\"330\" y=\"257\">D11</text>\n</g>\n<rect x=\"420\" y=\"80\" width=\"160\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<circle cx=\"460\" cy=\"120\" r=\"18\" fill=\"#101710\" stroke=\"#b8ff3c\"/>\n<circle cx=\"540\" cy=\"120\" r=\"18\" fill=\"#101710\" stroke=\"#b8ff3c\"/>\n<text x=\"500\" y=\"70\" text-anchor=\"middle\" fill=\"#dce6d6\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"13\" font-weight=\"700\">Ultrasonic HC-SR04</text>\n<g font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\" fill=\"#7a8a76\">\n<text x=\"440\" y=\"195\" text-anchor=\"middle\">VCC</text><text x=\"475\" y=\"195\" text-anchor=\"middle\">Trig</text><text x=\"510\" y=\"195\" text-anchor=\"middle\">Echo</text><text x=\"545\" y=\"195\" text-anchor=\"middle\">GND</text>\n</g>\n<path d=\"M88 204 H380 V210 H440\" stroke=\"#c62828\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M88 226 H360 V250 H545\" stroke=\"#9e9e9e\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M320 235 H400 V210 H475\" stroke=\"#f9a825\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M320 253 H390 V230 H510\" stroke=\"#1565c0\" stroke-width=\"3\" fill=\"none\"/>\n<text x=\"350\" y=\"320\" text-anchor=\"middle\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">Red→5V · Yellow→D10 · Blue→D11 · Black→GND</text>\n</svg>",
    "button": "<svg viewBox=\"0 0 700 320\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Wire reset button\">\n<rect width=\"700\" height=\"320\" fill=\"#030503\"/>\n<rect x=\"80\" y=\"40\" width=\"220\" height=\"240\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<text x=\"190\" y=\"70\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Elegoo Uno</text>\n<rect x=\"292\" y=\"100\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#6a1b9a\"/>\n<text x=\"330\" y=\"111\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\">D3</text>\n<rect x=\"60\" y=\"180\" width=\"28\" height=\"16\" rx=\"2\" fill=\"#9e9e9e\"/>\n<text x=\"50\" y=\"192\" text-anchor=\"end\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\">GND</text>\n<rect x=\"430\" y=\"100\" width=\"120\" height=\"70\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<circle cx=\"490\" cy=\"135\" r=\"18\" fill=\"#101710\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"490\" y=\"90\" text-anchor=\"middle\" fill=\"#dce6d6\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"13\" font-weight=\"700\">Reset button</text>\n<path d=\"M320 107 H400 V135 H430\" stroke=\"#6a1b9a\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M550 135 H600 V188 H88\" stroke=\"#9e9e9e\" stroke-width=\"3\" fill=\"none\"/>\n<text x=\"350\" y=\"260\" text-anchor=\"middle\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">One leg → D3 (purple). Other leg → GND (black).</text>\n</svg>",
    "buzzer": "<svg viewBox=\"0 0 700 320\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Wire buzzer\">\n<rect width=\"700\" height=\"320\" fill=\"#030503\"/>\n<rect x=\"80\" y=\"40\" width=\"220\" height=\"240\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<text x=\"190\" y=\"70\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Elegoo Uno</text>\n<rect x=\"292\" y=\"200\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#ef6c00\"/>\n<text x=\"330\" y=\"211\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\">D9</text>\n<rect x=\"60\" y=\"180\" width=\"28\" height=\"16\" rx=\"2\" fill=\"#9e9e9e\"/>\n<text x=\"50\" y=\"192\" text-anchor=\"end\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\">GND</text>\n<circle cx=\"500\" cy=\"140\" r=\"40\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<circle cx=\"500\" cy=\"140\" r=\"22\" fill=\"#101710\" stroke=\"#b8ff3c\"/>\n<text x=\"500\" y=\"90\" text-anchor=\"middle\" fill=\"#dce6d6\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"13\" font-weight=\"700\">Buzzer</text>\n<text x=\"500\" y=\"200\" text-anchor=\"middle\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"11\">+ −</text>\n<path d=\"M320 207 H400 V140 H460\" stroke=\"#ef6c00\" stroke-width=\"3\" fill=\"none\"/>\n<path d=\"M540 140 H580 V188 H88\" stroke=\"#9e9e9e\" stroke-width=\"3\" fill=\"none\"/>\n<text x=\"350\" y=\"260\" text-anchor=\"middle\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">Plus (+) → D9 (orange). Minus (−) → GND (black).</text>\n</svg>",
    "leds": "<svg viewBox=\"0 0 700 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Wire four LEDs with resistors\">\n<rect width=\"700\" height=\"360\" fill=\"#030503\"/>\n<rect x=\"80\" y=\"40\" width=\"220\" height=\"260\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\" stroke-width=\"2\"/>\n<text x=\"190\" y=\"70\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Elegoo Uno</text>\n<g font-family=\"ui-monospace,Menlo,monospace\" font-size=\"10\" fill=\"#7a8a76\">\n<rect x=\"292\" y=\"100\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#2e7d32\"/><text x=\"330\" y=\"111\">D4</text>\n<rect x=\"292\" y=\"118\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#2e7d32\"/><text x=\"330\" y=\"129\">D5</text>\n<rect x=\"292\" y=\"136\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#2e7d32\"/><text x=\"330\" y=\"147\">D6</text>\n<rect x=\"292\" y=\"154\" width=\"28\" height=\"14\" rx=\"2\" fill=\"#2e7d32\"/><text x=\"330\" y=\"165\">D7</text>\n</g>\n<g>\n<ellipse cx=\"430\" cy=\"80\" rx=\"14\" ry=\"18\" fill=\"#c62828\" opacity=\".9\"/><text x=\"430\" y=\"55\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"10\" font-family=\"ui-monospace,Menlo,monospace\">Red</text>\n<line x1=\"426\" y1=\"98\" x2=\"426\" y2=\"130\" stroke=\"#dce6d6\" stroke-width=\"2\"/><line x1=\"434\" y1=\"98\" x2=\"434\" y2=\"150\" stroke=\"#dce6d6\" stroke-width=\"2\"/>\n<rect x=\"420\" y=\"150\" width=\"20\" height=\"28\" rx=\"2\" fill=\"#bdb76b\" stroke=\"#1c2a1c\"/>\n<path d=\"M320 107 H390 V80 H416\" stroke=\"#2e7d32\" stroke-width=\"2\" fill=\"none\"/><path d=\"M434 178 V240\" stroke=\"#9e9e9e\" stroke-width=\"2\"/>\n</g>\n<g>\n<ellipse cx=\"490\" cy=\"80\" rx=\"14\" ry=\"18\" fill=\"#c62828\" opacity=\".9\"/><text x=\"490\" y=\"55\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"10\" font-family=\"ui-monospace,Menlo,monospace\">Red</text>\n<line x1=\"486\" y1=\"98\" x2=\"486\" y2=\"130\" stroke=\"#dce6d6\" stroke-width=\"2\"/><line x1=\"494\" y1=\"98\" x2=\"494\" y2=\"150\" stroke=\"#dce6d6\" stroke-width=\"2\"/>\n<rect x=\"480\" y=\"150\" width=\"20\" height=\"28\" rx=\"2\" fill=\"#bdb76b\" stroke=\"#1c2a1c\"/>\n<path d=\"M320 125 H400 V80 H476\" stroke=\"#2e7d32\" stroke-width=\"2\" fill=\"none\"/><path d=\"M494 178 V240\" stroke=\"#9e9e9e\" stroke-width=\"2\"/>\n</g>\n<g>\n<ellipse cx=\"550\" cy=\"80\" rx=\"14\" ry=\"18\" fill=\"#1565c0\" opacity=\".9\"/><text x=\"550\" y=\"55\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"10\" font-family=\"ui-monospace,Menlo,monospace\">Blue</text>\n<line x1=\"546\" y1=\"98\" x2=\"546\" y2=\"130\" stroke=\"#dce6d6\" stroke-width=\"2\"/><line x1=\"554\" y1=\"98\" x2=\"554\" y2=\"150\" stroke=\"#dce6d6\" stroke-width=\"2\"/>\n<rect x=\"540\" y=\"150\" width=\"20\" height=\"28\" rx=\"2\" fill=\"#bdb76b\" stroke=\"#1c2a1c\"/>\n<path d=\"M320 143 H410 V80 H536\" stroke=\"#2e7d32\" stroke-width=\"2\" fill=\"none\"/><path d=\"M554 178 V240\" stroke=\"#9e9e9e\" stroke-width=\"2\"/>\n</g>\n<g>\n<ellipse cx=\"610\" cy=\"80\" rx=\"14\" ry=\"18\" fill=\"#1565c0\" opacity=\".9\"/><text x=\"610\" y=\"55\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"10\" font-family=\"ui-monospace,Menlo,monospace\">Blue</text>\n<line x1=\"606\" y1=\"98\" x2=\"606\" y2=\"130\" stroke=\"#dce6d6\" stroke-width=\"2\"/><line x1=\"614\" y1=\"98\" x2=\"614\" y2=\"150\" stroke=\"#dce6d6\" stroke-width=\"2\"/>\n<rect x=\"600\" y=\"150\" width=\"20\" height=\"28\" rx=\"2\" fill=\"#bdb76b\" stroke=\"#1c2a1c\"/>\n<path d=\"M320 161 H420 V80 H596\" stroke=\"#2e7d32\" stroke-width=\"2\" fill=\"none\"/><path d=\"M614 178 V240\" stroke=\"#9e9e9e\" stroke-width=\"2\"/>\n</g>\n<line x1=\"426\" y1=\"240\" x2=\"614\" y2=\"240\" stroke=\"#9e9e9e\" stroke-width=\"3\"/>\n<path d=\"M520 240 V270 H100\" stroke=\"#9e9e9e\" stroke-width=\"3\" fill=\"none\"/>\n<text x=\"40\" y=\"310\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">Long LED leg → resistor → pin. Short LED leg → GND.</text>\n<text x=\"40\" y=\"330\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">Use 220Ω (red-red-brown). 330–1kΩ is also fine.</text>\n</svg>",
    "joints": "<svg viewBox=\"0 0 700 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Good vs bad solder joint\">\n<rect width=\"700\" height=\"260\" fill=\"#030503\"/>\n<rect x=\"40\" y=\"40\" width=\"280\" height=\"180\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\"/>\n<text x=\"180\" y=\"70\" text-anchor=\"middle\" fill=\"#6ad16a\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Good joint</text>\n<ellipse cx=\"180\" cy=\"140\" rx=\"50\" ry=\"28\" fill=\"#c0c0c0\" stroke=\"#9e9e9e\" stroke-width=\"2\"/>\n<line x1=\"180\" y1=\"100\" x2=\"180\" y2=\"180\" stroke=\"#757575\" stroke-width=\"4\"/>\n<path d=\"M140 140 Q180 155 220 140\" fill=\"none\" stroke=\"#b0b0b0\" stroke-width=\"8\"/>\n<text x=\"180\" y=\"205\" text-anchor=\"middle\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">Shiny little volcano</text>\n<rect x=\"380\" y=\"40\" width=\"280\" height=\"180\" rx=\"8\" fill=\"#0c110c\" stroke=\"#1c2a1c\"/>\n<text x=\"520\" y=\"70\" text-anchor=\"middle\" fill=\"#e6392d\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Bad joint</text>\n<circle cx=\"500\" cy=\"130\" r=\"28\" fill=\"#8d6e63\"/><circle cx=\"545\" cy=\"145\" r=\"18\" fill=\"#6d4c41\"/>\n<line x1=\"520\" y1=\"100\" x2=\"520\" y2=\"180\" stroke=\"#757575\" stroke-width=\"4\"/>\n<text x=\"520\" y=\"205\" text-anchor=\"middle\" fill=\"#7a8a76\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"12\">Dull blob or cold joint</text>\n</svg>",
    "proto": "<svg viewBox=\"0 0 700 420\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"Blue prototype shield layout\">\n<rect width=\"700\" height=\"420\" fill=\"#030503\"/>\n<rect x=\"80\" y=\"30\" width=\"540\" height=\"360\" rx=\"10\" fill=\"#1e3a5f\" stroke=\"#b8ff3c\" stroke-width=\"2\"/>\n<text x=\"350\" y=\"58\" text-anchor=\"middle\" fill=\"#e3f2fd\" font-family=\"ui-monospace,Menlo,monospace\" font-size=\"14\" font-weight=\"700\">Blue prototype shield (top view)</text>\n<rect x=\"100\" y=\"90\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"118\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"146\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"174\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"202\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"230\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"258\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"100\" y=\"286\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"70\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"92\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"114\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"136\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"158\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"180\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"202\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"224\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"246\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"268\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"290\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"312\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"334\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<rect x=\"580\" y=\"356\" width=\"14\" height=\"14\" fill=\"#90caf9\"/>\n<circle cx=\"200\" cy=\"120\" r=\"12\" fill=\"#ef5350\"/><circle cx=\"240\" cy=\"120\" r=\"12\" fill=\"#ef5350\"/>\n<circle cx=\"280\" cy=\"120\" r=\"12\" fill=\"#42a5f5\"/><circle cx=\"320\" cy=\"120\" r=\"12\" fill=\"#42a5f5\"/>\n<text x=\"260\" y=\"155\" text-anchor=\"middle\" fill=\"#bbdefb\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\">4 LEDs + resistors</text>\n<rect x=\"180\" y=\"190\" width=\"50\" height=\"40\" rx=\"6\" fill=\"#ce93d8\"/>\n<text x=\"205\" y=\"250\" text-anchor=\"middle\" fill=\"#bbdefb\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\">Reset</text>\n<circle cx=\"320\" cy=\"210\" r=\"28\" fill=\"#ffcc80\"/>\n<text x=\"320\" y=\"255\" text-anchor=\"middle\" fill=\"#bbdefb\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\">Buzzer</text>\n<rect x=\"420\" y=\"170\" width=\"100\" height=\"60\" rx=\"4\" fill=\"#80cbc4\"/>\n<text x=\"470\" y=\"205\" text-anchor=\"middle\" fill=\"#004d40\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\">Sensor pins</text>\n<text x=\"470\" y=\"250\" text-anchor=\"middle\" fill=\"#bbdefb\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\">VCC Trig Echo GND</text>\n<text x=\"350\" y=\"320\" text-anchor=\"middle\" fill=\"#90caf9\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\">Leave room at the edges for the header pins</text>\n<text x=\"350\" y=\"345\" text-anchor=\"middle\" fill=\"#90caf9\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\">that plug into the Uno underneath</text>\n</svg>"
  },
  "sections": [
    {
      "id": "parts",
      "title": "1. Parts and tools",
      "callout": {
        "tone": "",
        "lead": "Checklist",
        "text": "Lay everything out on a clean table. Check each item as you find it."
      },
      "showParts": true,
      "showTools": true,
      "diagram": "legend",
      "steps": [
        {
          "title": "Confirm the Uno has your code",
          "detail": "If you already uploaded the sketch, you are good. The code stays on the board when unplugged.",
          "check": "parts-code"
        },
        {
          "title": "Gather tools",
          "detail": "Iron, solder, sponge, and flush cutters. Heat the iron later — not yet.",
          "check": "parts-tools"
        }
      ]
    },
    {
      "id": "breadboard",
      "title": "2. Breadboard test wiring",
      "callout": {
        "tone": "warn",
        "lead": "Goal of this section",
        "text": "Prove the parts work on a breadboard before you solder. Do not solder yet."
      },
      "diagram": "pinmap",
      "steps": [
        {
          "title": "Unplug the USB cable",
          "detail": "Take the blue USB cable out of the Elegoo. Never wire parts while it has power.",
          "check": "bb-unplug"
        },
        {
          "title": "Find the ultrasonic sensor",
          "detail": "It has two round silver eyes and four pins: VCC, Trig, Echo, GND.",
          "check": "bb-find-sensor"
        },
        {
          "title": "Wire the sensor",
          "detail": "VCC→5V (red). Trig→D10 (yellow). Echo→D11 (blue). GND→GND (black).",
          "diagram": "sensor",
          "check": "bb-sensor"
        },
        {
          "title": "Find a pushbutton",
          "detail": "It has four legs. You only need two that are across from each other.",
          "check": "bb-find-btn"
        },
        {
          "title": "Wire the reset button",
          "detail": "One leg → pin D3 (purple). Other leg → GND (black).",
          "diagram": "button",
          "check": "bb-btn"
        },
        {
          "title": "Find the + mark on the buzzer",
          "detail": "The buzzer has a + side. That is the long leg or the marked pin.",
          "check": "bb-find-buzz"
        },
        {
          "title": "Wire the buzzer",
          "detail": "Plus → pin D9 (orange). Minus → GND (black).",
          "diagram": "buzzer",
          "check": "bb-buzz"
        },
        {
          "title": "Find long and short LED legs",
          "detail": "Long leg is +. Short leg is −.",
          "check": "bb-led-legs"
        },
        {
          "title": "Add one resistor per LED",
          "detail": "Put a 220Ω (or up to 1kΩ) resistor between the pin and the long leg.",
          "check": "bb-res"
        },
        {
          "title": "Wire the four LEDs",
          "detail": "Red LEDs on D4 and D5. Blue LEDs on D6 and D7. All short legs go to GND.",
          "diagram": "leds",
          "check": "bb-leds"
        },
        {
          "title": "Check every wire once",
          "detail": "Match the full pin map. Fix anything wrong before power.",
          "check": "bb-check"
        },
        {
          "title": "Plug in USB",
          "detail": "Use your PC USB or a phone charger. The board should light its power LED.",
          "check": "bb-power"
        }
      ]
    },
    {
      "id": "test",
      "title": "3. Test and adjust distance",
      "callout": {
        "tone": "ok",
        "lead": "Pass this test first",
        "text": "Do not solder until the breadboard version works. Fix wiring or distance here, not later."
      },
      "steps": [
        {
          "title": "Wave your hand near the sensor",
          "detail": "Closer than about 1 foot (30 cm). The buzzer should siren and the LEDs should flash red then blue.",
          "check": "test-wave"
        },
        {
          "title": "Pull your hand away",
          "detail": "The alarm should stay on. That is the latch working.",
          "check": "test-latch"
        },
        {
          "title": "Press the reset button",
          "detail": "Everything should stop. Wait one second before testing again.",
          "check": "test-reset"
        },
        {
          "title": "Open Serial Monitor (optional)",
          "detail": "In Arduino IDE: Tools → Serial Monitor. Set 9600 baud. You will see distance numbers in cm.",
          "check": "test-serial"
        },
        {
          "title": "Adjust TRIGGER_CM if needed",
          "detail": "In the sketch, change const int TRIGGER_CM = 30; to a bigger or smaller number. Upload again.",
          "check": "test-adjust"
        }
      ]
    },
    {
      "id": "solder",
      "title": "4. Soldering basics",
      "diagram": "joints",
      "steps": [
        {
          "title": "Heat the iron",
          "detail": "Set about 350°C (650°F). Wait until it is hot.",
          "check": "sol-heat"
        },
        {
          "title": "Clean the tip",
          "detail": "Wipe on a damp sponge. Melt a tiny bit of solder onto the tip (tin it).",
          "check": "sol-clean"
        },
        {
          "title": "Heat the joint",
          "detail": "Touch the iron to the metal pad and the part leg together for about 2 seconds.",
          "check": "sol-heatj"
        },
        {
          "title": "Feed the solder",
          "detail": "Touch solder to the hot joint, not to the iron. Pull solder away, then the iron.",
          "check": "sol-feed"
        },
        {
          "title": "Look at the result",
          "detail": "Good = shiny volcano. Bad = dull blob. Reheat a bad one and add a little solder.",
          "check": "sol-look"
        },
        {
          "title": "Snip extras after cool",
          "detail": "Use flush cutters. Do not pull while hot.",
          "check": "sol-snip"
        }
      ]
    },
    {
      "id": "shield",
      "title": "5. Build on the blue shield",
      "callout": {
        "tone": "danger",
        "lead": "Unplug first",
        "text": "Unplug USB from the Uno. Take the breadboard parts off. You will rebuild them on the blue board permanently."
      },
      "diagram": "proto",
      "steps": [
        {
          "title": "Find the long pin strips",
          "detail": "These plug the blue shield onto the Uno.",
          "check": "sh-headers"
        },
        {
          "title": "Seat the shield on the Uno (no solder yet)",
          "detail": "Push the headers through the blue board into the Uno sockets so they line up.",
          "check": "sh-seat"
        },
        {
          "title": "Solder one pin on each corner",
          "detail": "Check that the board sits flat. Then solder the rest of the header pins.",
          "check": "sh-corner"
        },
        {
          "title": "Unplug the shield from the Uno",
          "detail": "Finish the rest of the soldering with the shield off the Uno so you do not cook the board.",
          "check": "sh-off"
        },
        {
          "title": "Place the four LEDs",
          "detail": "Long legs toward the side that will connect to D4–D7. Short legs toward a GND row.",
          "check": "sh-leds"
        },
        {
          "title": "Solder each LED",
          "detail": "One joint at a time. Snip the extra legs.",
          "check": "sh-sled"
        },
        {
          "title": "Add one resistor per LED",
          "detail": "From each long-leg pad, bridge with a 220–1kΩ resistor toward the signal pin pad.",
          "check": "sh-res"
        },
        {
          "title": "Run wires to D4, D5, D6, D7",
          "detail": "Solder short jumper wires from each resistor to the matching digital header pin.",
          "check": "sh-ledw"
        },
        {
          "title": "Place the reset button",
          "detail": "Push it into holes so two opposite legs sit firm.",
          "check": "sh-btn"
        },
        {
          "title": "Wire the button",
          "detail": "One leg to D3. Other leg to GND. Solder both.",
          "check": "sh-btnw"
        },
        {
          "title": "Place the buzzer",
          "detail": "Mark the + side so you do not mix it up.",
          "check": "sh-buzz"
        },
        {
          "title": "Wire the buzzer",
          "detail": "Plus to D9. Minus to GND. Solder both.",
          "check": "sh-buzzw"
        },
        {
          "title": "Add a 4-pin header or four wires for the sensor",
          "detail": "You can solder a female header so the sensor unplugs, or solder four wires to the sensor.",
          "check": "sh-sens"
        },
        {
          "title": "Connect the four sensor lines",
          "detail": "VCC→5V. Trig→D10. Echo→D11. GND→GND.",
          "check": "sh-sensw"
        },
        {
          "title": "Make a GND rail",
          "detail": "Join every black ground wire to one GND pin on the shield headers.",
          "check": "sh-gnd"
        },
        {
          "title": "Make a 5V rail",
          "detail": "Join sensor VCC to the 5V header pin. Do not feed 5V into an output pin.",
          "check": "sh-5v"
        }
      ]
    },
    {
      "id": "check",
      "title": "6. Check before power",
      "callout": {
        "tone": "warn",
        "lead": "Power still unplugged",
        "text": "Do this with power still unplugged."
      },
      "steps": [
        {
          "title": "No solder bridges between neighbor pins",
          "detail": "Look between pins. If metal joins two pins, reheat and clear it.",
          "check": "ck-bridge"
        },
        {
          "title": "Every joint looks shiny, not a dull blob",
          "detail": "Reheat dull joints and add a little solder.",
          "check": "ck-shiny"
        },
        {
          "title": "LED short legs go only to GND",
          "detail": "Confirm polarity one more time.",
          "check": "ck-led"
        },
        {
          "title": "Resistors sit between pins and LED long legs",
          "detail": "No LED wired straight to 5V without a resistor.",
          "check": "ck-res"
        },
        {
          "title": "Buzzer + is on D9, not reversed",
          "detail": "Minus must be GND.",
          "check": "ck-buzz"
        },
        {
          "title": "Sensor pin order is correct",
          "detail": "VCC=5V, Trig=D10, Echo=D11, GND=GND.",
          "check": "ck-sens"
        },
        {
          "title": "Button bridges D3 to GND when pressed",
          "detail": "Optional: beep-test with a multimeter.",
          "check": "ck-btn"
        },
        {
          "title": "No bare wire ends touching each other",
          "detail": "Trim or tape any loose strands.",
          "check": "ck-bare"
        }
      ]
    },
    {
      "id": "final",
      "title": "7. Final test",
      "steps": [
        {
          "title": "Snap the shield onto the Uno",
          "detail": "Line up pin 1 carefully. Press evenly. Do not bend pins.",
          "check": "fn-snap"
        },
        {
          "title": "Power it",
          "detail": "USB phone charger, or 9V 1A adapter into the round jack (2.1mm, center-positive).",
          "check": "fn-pwr"
        },
        {
          "title": "Trigger the alarm",
          "detail": "Wave within ~30 cm. Siren + red/blue flash should latch on.",
          "check": "fn-trig"
        },
        {
          "title": "Press reset",
          "detail": "Alarm stops. Wait a second. Trigger again to confirm.",
          "check": "fn-reset"
        }
      ]
    },
    {
      "id": "mount",
      "title": "8. Mount by the door",
      "showSpecs": true,
      "steps": [
        {
          "title": "Pick height",
          "detail": "Chest or waist height aims at people. Too low will catch Domino and Rummy more often.",
          "check": "mt-height"
        },
        {
          "title": "Aim the sensor",
          "detail": "Point the two eyes across the doorway, not at a wall right in front.",
          "check": "mt-aim"
        },
        {
          "title": "Mount the board",
          "detail": "Use double-sided tape, Command strips, or a small shelf. Keep USB/adapter reachable.",
          "check": "mt-mount"
        },
        {
          "title": "Use wall power",
          "detail": "Phone USB charger is fine for 24/7. A 9V battery only lasts about a day.",
          "check": "mt-pwr"
        },
        {
          "title": "Tune the distance",
          "detail": "If pets set it off, raise TRIGGER_CM or raise the mount. Upload the new number.",
          "check": "mt-tune"
        }
      ]
    },
    {
      "id": "trouble",
      "title": "9. Troubleshooting",
      "troubleshooting": [
        [
          "Nothing happens",
          "Check power LED on Uno. Recheck 5V and GND. Open Serial Monitor for distance numbers."
        ],
        [
          "Distance always 999",
          "Trig/Echo swapped, or loose wire. Confirm D10=Trig, D11=Echo."
        ],
        [
          "Alarm never stops",
          "Reset wire not on D3, or button not reaching GND."
        ],
        [
          "LEDs dark, buzzer works",
          "LED backwards (long leg must face the resistor/pin). Check resistor."
        ],
        [
          "Buzzer silent, LEDs work",
          "Buzzer polarity reversed, or not on D9."
        ],
        [
          "Triggers too easily",
          "Raise the sensor or lower TRIGGER_CM. Aim away from a close wall."
        ],
        [
          "Dogs set it off",
          "Mount higher (chest height). Or raise TRIGGER_CM after watching Serial numbers."
        ],
        [
          "Board resets when buzzing",
          "Use a wall USB charger, not a weak PC port. Keep grounds solid."
        ]
      ],
      "steps": [
        {
          "title": "Still stuck?",
          "detail": "Send a photo of the wiring or solder joints. Say what you see.",
          "check": "tr-photo"
        }
      ]
    },
    {
      "id": "code",
      "title": "Arduino sketch",
      "callout": {
        "tone": "",
        "lead": "Already uploaded",
        "text": "This is the ultrasonic latching alarm sketch. Keep it here for re-upload or TRIGGER_CM tweaks."
      },
      "showCode": true,
      "steps": []
    }
  ]
};
