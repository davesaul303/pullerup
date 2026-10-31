window.FUX_GUIDE = {
  "id": "volvo-steer",
  "title": "Volvo Split Steer",
  "summary": "Joystick steers a servo — a tiny model of how a control stick aims wheels (inspired by Volvo Dynamic Steering demos).",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "30–60 min",
  "partsCount": 5,
  "pullerup": "../parts/volvo-steer.html",
  "beforeYouStart": "Unplug USB while wiring. One kit servo on D9 is fine from Uno 5V. Keep angles off the hard stops (20–160°).",
  "tips": {},
  "parts": [
    "Elegoo Uno",
    "Analog joystick module",
    "SG90-style servo from kit",
    "Breadboard + jumpers",
    "USB cable"
  ],
  "tools": [
    "Computer with Arduino IDE"
  ],
  "specs": [
    [
      "Joystick X",
      "A0"
    ],
    [
      "Servo signal",
      "D9"
    ],
    [
      "Dead zone",
      "±40 around center"
    ],
    [
      "Angle",
      "20–160°"
    ]
  ],
  "code": "#include <Servo.h>\nServo steer;\nconst int JOY_X = A0;\nconst int SERVO_PIN = 9;\nconst int CENTER = 512;\nconst int DEAD = 40;\nvoid setup() {\n  steer.attach(SERVO_PIN);\n  steer.write(90);\n  Serial.begin(9600);\n}\nvoid loop() {\n  int x = analogRead(JOY_X);\n  int angle = (abs(x - CENTER) < DEAD) ? 90 : map(x, 0, 1023, 20, 160);\n  steer.write(angle);\n  Serial.println(angle);\n  delay(15);\n}\n",
  "diagrams": {
    "map": "<svg viewBox=\"0 0 900 360\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"JOYSTICK → SERVO STEERING\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"900\" height=\"360\" fill=\"#030503\"/><rect width=\"900\" height=\"360\" fill=\"url(#g)\"/>\n<text x=\"450\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">JOYSTICK → SERVO STEERING</text>\n<rect x=\"40\" y=\"70\" width=\"200\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"140\" y=\"130\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ELEGOO</text><text x=\"140\" y=\"155\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">A0 5V GND D9</text><rect x=\"320\" y=\"70\" width=\"200\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"420\" y=\"125\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">JOYSTICK</text><text x=\"420\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VRx → A0</text><text x=\"420\" y=\"175\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VCC→5V GND→GND</text><rect x=\"620\" y=\"70\" width=\"220\" height=\"160\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"730\" y=\"125\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SERVO</text><text x=\"730\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">signal → D9</text><text x=\"730\" y=\"175\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"11\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">red 5V · brown GND</text><line x1=\"240\" y1=\"120\" x2=\"320\" y2=\"120\" stroke=\"#ffe600\" stroke-width=\"4\" stroke-linecap=\"round\"/><line x1=\"520\" y1=\"140\" x2=\"620\" y2=\"140\" stroke=\"#b8ff3c\" stroke-width=\"4\" stroke-linecap=\"round\"/><text x=\"450\" y=\"280\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Push stick left/right → servo angle changes (steering).</text><text x=\"450\" y=\"320\" text-anchor=\"middle\" fill=\"#e6392d\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">WATCH OUT: one small servo is OK on Uno 5V.</text>\n</svg>",
    "servo": "<svg viewBox=\"0 0 700 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"SERVO WIRES\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"260\" fill=\"#030503\"/><rect width=\"700\" height=\"260\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SERVO WIRES</text>\n<text x=\"350\" y=\"100\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BROWN / BLACK = GND</text><text x=\"350\" y=\"140\" text-anchor=\"middle\" fill=\"#ff2a6d\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">RED = 5V</text><text x=\"350\" y=\"180\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">ORANGE / YELLOW = SIGNAL (D9)</text><text x=\"350\" y=\"230\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Match colors on your servo.</text>\n</svg>",
    "joy": "<svg viewBox=\"0 0 700 260\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"JOYSTICK PINS\">\n<defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs>\n<rect width=\"700\" height=\"260\" fill=\"#030503\"/><rect width=\"700\" height=\"260\" fill=\"url(#g)\"/>\n<text x=\"350\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">JOYSTICK PINS</text>\n<text x=\"350\" y=\"100\" text-anchor=\"middle\" fill=\"#ff2a6d\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VCC → 5V</text><text x=\"350\" y=\"140\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GND → GND</text><text x=\"350\" y=\"180\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VRx (X) → A0</text><text x=\"350\" y=\"230\" text-anchor=\"middle\" fill=\"#7a8a76\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">VRy optional later</text>\n</svg>"
  },
  "sections": [
    {
      "id": "idea",
      "title": "1. What you are copying",
      "steps": [
        {
          "title": "Control stick idea",
          "action": "A stick position becomes a wheel/servo angle — same idea as fancy truck steering demos, tiny and safe."
        },
        {
          "title": "Our build",
          "action": "Joystick X axis moves one kit servo left/right.",
          "from": "Stick X",
          "to": "Servo angle"
        }
      ]
    },
    {
      "id": "wire",
      "title": "2. Wire joystick + servo",
      "diagram": "map",
      "callout": {
        "tone": "warn",
        "lead": "Power OFF",
        "text": "USB unplugged until the checklist."
      },
      "steps": [
        {
          "title": "Unplug USB",
          "action": "Unplug USB.",
          "warn": "WATCH OUT: cold wiring."
        },
        {
          "title": "Joystick power",
          "action": "Joystick VCC → 5V, GND → GND.",
          "diagram": "joy"
        },
        {
          "title": "Joystick X",
          "action": "Joystick VRx → A0.",
          "from": "VRx",
          "to": "A0"
        },
        {
          "title": "Servo wires",
          "action": "Brown/black → GND, red → 5V, orange/yellow → D9.",
          "warn": "WATCH OUT: wrong power polarity can kill a servo.",
          "diagram": "servo"
        },
        {
          "title": "Checklist",
          "action": "Shared GND? Signal on D9? VRx on A0?",
          "check": "w1"
        }
      ]
    },
    {
      "id": "code",
      "title": "3. Upload and steer",
      "steps": [
        {
          "title": "Upload",
          "action": "Plug USB. Upload the Volvo Split Steer sketch."
        },
        {
          "title": "Center",
          "action": "At rest the servo should sit near 90° (straight)."
        },
        {
          "title": "Steer",
          "action": "Push stick left/right. Servo should follow smoothly.",
          "check": "t1"
        },
        {
          "title": "If it jitters",
          "action": "Raise DEAD in the code, or check loose jumpers."
        },
        {
          "title": "Optional Y",
          "action": "Wire VRy to A1 later and add a second servo if you get one."
        }
      ]
    }
  ]
};
