window.FUX_GUIDE = {
  "id": "sensor-school",
  "title": "Sensor Safari",
  "summary": "Wire your HC-SR04 so an LED (and optional buzzer) fire when something is closer than 20 cm. Learn how boards sense distance.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "45–75 min",
  "partsCount": 8,
  "pullerup": "../parts/sensor-school.html",
  "beforeYouStart": "Unplug USB while wiring. Sensor pin order: VCC Trig Echo GND. Eyes face the room, not the table.",
  "tips": {},
  "parts": [
    "Elegoo Uno",
    "HC-SR04 ultrasonic",
    "1 LED + 220Ω",
    "Passive/active buzzer (optional)",
    "Breadboard + jumpers",
    "USB cable"
  ],
  "tools": [
    "Computer with Arduino IDE"
  ],
  "specs": [
    [
      "Trigger",
      "D12"
    ],
    [
      "Echo",
      "D11"
    ],
    [
      "LED",
      "D8"
    ],
    [
      "Buzzer",
      "D9"
    ],
    [
      "Trip",
      "< 20 cm"
    ]
  ],
  "code": "// Sensor Safari — HC-SR04 lights LED when closer than 20 cm\nconst int TRIG = 12;\nconst int ECHO = 11;\nconst int LED  = 8;\nconst int BUZZ = 9;\n\nvoid setup() {\n  pinMode(TRIG, OUTPUT);\n  pinMode(ECHO, INPUT);\n  pinMode(LED, OUTPUT);\n  pinMode(BUZZ, OUTPUT);\n  Serial.begin(9600);\n}\n\nvoid loop() {\n  digitalWrite(TRIG, LOW); delayMicroseconds(2);\n  digitalWrite(TRIG, HIGH); delayMicroseconds(10);\n  digitalWrite(TRIG, LOW);\n  long us = pulseIn(ECHO, HIGH, 30000);\n  float cm = us * 0.034 / 2.0;\n  Serial.println(cm);\n  if (cm > 0 && cm < 20) {\n    digitalWrite(LED, HIGH);\n    tone(BUZZ, 1200, 40);\n  } else {\n    digitalWrite(LED, LOW);\n  }\n  delay(80);\n}\n",
  "diagrams": {
    "map": "<svg viewBox=\"0 0 900 380\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SENSOR SAFARI — WIRING MAP\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"900\" height=\"380\" fill=\"#030503\"/><rect width=\"900\" height=\"380\" fill=\"url(#g)\"/>\n<text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SENSOR SAFARI — WIRING MAP</text>\n<rect x=\"40\" y=\"60\" width=\"200\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"140\" y=\"120\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO</text><text x=\"140\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">5V GND</text><text x=\"140\" y=\"175\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">D12 D11 D8 D9</text><rect x=\"320\" y=\"60\" width=\"240\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"440\" y=\"110\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HC-SR04</text><text x=\"440\" y=\"140\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VCC Trig Echo GND</text><text x=\"440\" y=\"170\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">two silver eyes → out</text><rect x=\"620\" y=\"50\" width=\"120\" height=\"70\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"680\" y=\"90\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><rect x=\"620\" y=\"150\" width=\"120\" height=\"70\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"680\" y=\"190\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BUZZ</text><line x1=\"240\" y1=\"100\" x2=\"320\" y2=\"100\" stroke=\"#ff2a6d\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"240\" y1=\"140\" x2=\"320\" y2=\"140\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"240\" y1=\"180\" x2=\"320\" y2=\"180\" stroke=\"#b8ff3c\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"240\" y1=\"200\" x2=\"320\" y2=\"200\" stroke=\"#4fc3f7\" stroke-width=\"4\" stroke-linecap=\"round\"/><text x=\"450\" y=\"280\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VCC→5V · Trig→D12 · Echo→D11 · GND→GND</text><text x=\"450\" y=\"310\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED+→D8 via 220Ω · LED−→GND · Buzzer+→D9 · Buzzer−→GND</text><text x=\"450\" y=\"350\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: pin order on the sensor is VCC Trig Echo GND</text>\n</svg>",
    "sensor": "<svg viewBox=\"0 0 700 280\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"HC-SR04 PIN ORDER\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"280\" fill=\"#030503\"/><rect width=\"700\" height=\"280\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">HC-SR04 PIN ORDER</text>\n<rect x=\"80\" y=\"70\" width=\"540\" height=\"140\" rx=\"6\" fill=\"#0c110c\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"150\" y=\"130\" text-anchor=\"middle\" fill=\"#ff2a6d\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VCC</text><text x=\"280\" y=\"130\" text-anchor=\"middle\" fill=\"#ffe600\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">TRIG</text><text x=\"410\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ECHO</text><text x=\"540\" y=\"130\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GND</text><text x=\"350\" y=\"250\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Left to right with eyes facing you — match the silk labels.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "meet",
      "title": "1. Meet the distance sensor",
      "diagram": "sensor",
      "steps": [
        {
          "title": "Find the eyes",
          "action": "Hold the HC-SR04 so the two silver cans face you.",
          "diagram": "sensor"
        },
        {
          "title": "Read the pins",
          "action": "From left to right: VCC, Trig, Echo, GND.",
          "from": "Left",
          "to": "Right",
          "warn": "WATCH OUT: swapping Trig/Echo gives weird numbers; swapping 5V/GND can hurt the sensor."
        }
      ]
    },
    {
      "id": "wire",
      "title": "2. Breadboard wiring",
      "diagram": "map",
      "callout": {
        "tone": "warn",
        "lead": "Power OFF",
        "text": "USB unplugged until the checklist."
      },
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug USB from the Elegoo.",
          "warn": "WATCH OUT: wire cold."
        },
        {
          "title": "Sensor VCC",
          "action": "Wire HC-SR04 VCC to Uno 5V.",
          "from": "VCC",
          "to": "5V",
          "diagram": "map"
        },
        {
          "title": "Sensor GND",
          "action": "Wire HC-SR04 GND to Uno GND.",
          "from": "GND",
          "to": "GND"
        },
        {
          "title": "Trig",
          "action": "Wire Trig to digital pin D12.",
          "from": "Trig",
          "to": "D12"
        },
        {
          "title": "Echo",
          "action": "Wire Echo to digital pin D11.",
          "from": "Echo",
          "to": "D11"
        },
        {
          "title": "LED + resistor",
          "action": "D8 → 220Ω → LED long leg; LED short → GND.",
          "from": "D8",
          "to": "LED→GND",
          "warn": "WATCH OUT: long LED leg toward the resistor/D8 side."
        },
        {
          "title": "Optional buzzer",
          "action": "Buzzer + to D9, buzzer − to GND (skip if no buzzer).",
          "from": "D9",
          "to": "buzzer"
        },
        {
          "title": "Eyes out",
          "action": "Point the silver eyes toward open space.",
          "check": "w1"
        }
      ]
    },
    {
      "id": "code",
      "title": "3. Upload and test",
      "steps": [
        {
          "title": "Checklist",
          "action": "5V/GND correct? Trig=D12 Echo=D11? LED polarity OK?",
          "warn": "WATCH OUT: do not power until this is yes."
        },
        {
          "title": "Plug USB + upload",
          "action": "Plug USB. Upload the Sensor Safari sketch."
        },
        {
          "title": "Serial + wave",
          "action": "Open Serial Monitor 9600. Wave your hand in front. Numbers should change.",
          "from": "Hand",
          "to": "< 20 cm"
        },
        {
          "title": "LED trip",
          "action": "Closer than ~20 cm → LED on (and short beep if buzzer wired).",
          "check": "t1"
        }
      ]
    }
  ]
};
