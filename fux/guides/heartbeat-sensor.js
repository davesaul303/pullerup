window.FUX_GUIDE = {
  "id": "heartbeat-sensor",
  "title": "Heartbeat Sensor Challenge",
  "summary": "Wire a fingertip pulse sensor, watch BPM on Serial, and blink an LED each beat. Learning tool — not medical gear.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "45–75 min",
  "partsCount": 5,
  "pullerup": "../parts/heartbeat-sensor.html",
  "beforeYouStart": "This is a toy/learning sensor, not a medical device. Unplug while wiring. Rest your finger gently and stay still.",
  "tips": {},
  "parts": [
    "Elegoo Uno",
    "Pulse / heart-rate sensor module (3-wire)",
    "LED (onboard D13 OK)",
    "Jumpers",
    "USB cable"
  ],
  "tools": [
    "Computer with Arduino IDE"
  ],
  "specs": [
    [
      "Sensor out",
      "A0"
    ],
    [
      "Power",
      "5V + GND"
    ],
    [
      "LED",
      "D13 onboard"
    ],
    [
      "Not for",
      "medical diagnosis"
    ]
  ],
  "code": "const int PULSE_PIN = A0;\nconst int LED_PIN = 13;\nconst int THRESH = 550;\nbool wasBeat = false;\nunsigned long lastBeatMs = 0;\nvoid setup() {\n  pinMode(LED_PIN, OUTPUT);\n  Serial.begin(9600);\n  Serial.println(\"Heartbeat challenge — rest finger gently, stay still\");\n}\nvoid loop() {\n  int v = analogRead(PULSE_PIN);\n  unsigned long now = millis();\n  if (v > THRESH && !wasBeat) {\n    wasBeat = true;\n    unsigned long dt = now - lastBeatMs;\n    lastBeatMs = now;\n    digitalWrite(LED_PIN, HIGH);\n    if (dt > 300 && dt < 2000) {\n      Serial.print(\"BPM ~ \");\n      Serial.println(60000.0 / dt, 1);\n    } else Serial.println(\"beat\");\n  }\n  if (v < THRESH - 30) { wasBeat = false; digitalWrite(LED_PIN, LOW); }\n  delay(5);\n}\n",
  "diagrams": {
    "map": "<svg viewBox=\"0 0 860 340\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"PULSE SENSOR → UNO\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"860\" height=\"340\" fill=\"#030503\"/><rect width=\"860\" height=\"340\" fill=\"url(#g)\"/>\n<text x=\"430\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PULSE SENSOR → UNO</text>\n<rect x=\"40\" y=\"70\" width=\"200\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"140\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO</text><text x=\"140\" y=\"155\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">A0 5V GND</text><rect x=\"360\" y=\"70\" width=\"260\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"490\" y=\"125\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">PULSE SENSOR</text><text x=\"490\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">S / OUT → A0</text><text x=\"490\" y=\"175\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">+ → 5V · − → GND</text><rect x=\"680\" y=\"90\" width=\"140\" height=\"100\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"750\" y=\"145\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED</text><line x1=\"240\" y1=\"120\" x2=\"360\" y2=\"120\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/><text x=\"430\" y=\"280\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Finger gently on the heart side. Stay still 10 seconds.</text><text x=\"430\" y=\"310\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: not a medical device — learning only.</text>\n</svg>",
    "finger": "<svg viewBox=\"0 0 700 280\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"FINGER TIP — GENTLE + STILL\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"280\" fill=\"#030503\"/><rect width=\"700\" height=\"280\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">FINGER TIP — GENTLE + STILL</text>\n<rect x=\"100\" y=\"70\" width=\"500\" height=\"140\" rx=\"6\" fill=\"rgba(79,195,247,.1)\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"350\" y=\"120\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Pad of finger on the sensor face</text><text x=\"350\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Not crushing · not floating · not wiggling</text><text x=\"350\" y=\"250\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Too hard = flat signal. Too loose = noise.</text>\n</svg>"
  },
  "sections": [
    {
      "id": "honest",
      "title": "1. Honest start",
      "callout": {
        "tone": "warn",
        "lead": "NOT MEDICAL",
        "text": "Fun sensor for learning. Do not use it to diagnose or treat anything."
      },
      "steps": [
        {
          "title": "What it measures",
          "action": "It watches tiny blood-volume changes under a fingertip with light."
        },
        {
          "title": "Success looks like",
          "action": "Serial prints BPM ~60–100 while still, LED ticks with beats."
        }
      ]
    },
    {
      "id": "wire",
      "title": "2. Wire the sensor",
      "diagram": "map",
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug USB.",
          "warn": "WATCH OUT: cold wiring."
        },
        {
          "title": "Power",
          "action": "Sensor + / VCC → 5V. Sensor − / GND → GND."
        },
        {
          "title": "Signal",
          "action": "Sensor S / OUT → A0.",
          "from": "S",
          "to": "A0",
          "diagram": "map"
        },
        {
          "title": "Checklist",
          "action": "Three wires only? No swapped 5V/GND?",
          "check": "w1"
        }
      ]
    },
    {
      "id": "run",
      "title": "3. Finger + tune",
      "diagram": "finger",
      "steps": [
        {
          "title": "Upload",
          "action": "Plug USB. Upload the Heartbeat sketch. Open Serial at 9600."
        },
        {
          "title": "Place finger",
          "action": "Rest a fingertip gently on the sensor face. Stay still 10+ seconds.",
          "warn": "WATCH OUT: pressing hard flattens the signal.",
          "diagram": "finger"
        },
        {
          "title": "Watch Serial",
          "action": "You should see beat / BPM lines. Onboard LED should tick.",
          "check": "t1"
        },
        {
          "title": "If nothing",
          "action": "Dim the room a bit. Tweak THRESH (try 500, 600, 650). Re-seat the finger."
        },
        {
          "title": "Win",
          "action": "Steady ticks that roughly match a finger on your neck pulse."
        }
      ]
    }
  ]
};
