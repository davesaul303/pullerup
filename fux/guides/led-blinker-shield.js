window.FUX_GUIDE = {
  "id": "led-blinker-shield",
  "title": "LED Blinker Shield",
  "summary": "Solder 2 LEDs onto your blue proto shield and make them flash back and forth. Real soldering practice, all parts you already own, $0.",
  "category": "Electronics",
  "difficulty": "Beginner",
  "time": "45–75 min",
  "partsCount": 7,
  "pullerup": "",
  "beforeYouStart": "Unplug USB while you solder or wire. Heat the joint first, then feed solder to the joint — not the iron. Do one step, tap Done, then Next.",
  "tips": {},
  "parts": [
    "Elegoo Uno (already own)",
    "Blue prototype shield for the Uno (already own)",
    "1 red LED (from kit)",
    "1 blue LED (from kit)",
    "2 resistors 220Ω — bands red-red-brown (from kit)",
    "Short pieces of wire or the cut-off resistor legs",
    "USB cable (came with the Uno)"
  ],
  "tools": [
    "Soldering iron + solder",
    "Wet sponge or brass wool for the tip",
    "Small wire cutters (or nail clippers in a pinch)",
    "Computer with the Arduino app"
  ],
  "specs": [
    [
      "Cost",
      "$0 — all parts owned"
    ],
    [
      "Pins",
      "D8 (red), D9 (blue), GND"
    ],
    [
      "Resistor",
      "220Ω each LED"
    ],
    [
      "Goal",
      "Red and blue take turns blinking"
    ]
  ],
  "code": "// LED Blinker Shield - red and blue take turns\nconst int RED = 8;   // red LED on pin D8\nconst int BLUE = 9;  // blue LED on pin D9\n\nvoid setup() {\n  pinMode(RED, OUTPUT);\n  pinMode(BLUE, OUTPUT);\n}\n\nvoid loop() {\n  digitalWrite(RED, HIGH);  // red on\n  digitalWrite(BLUE, LOW);  // blue off\n  delay(300);               // wait 0.3 seconds\n  digitalWrite(RED, LOW);   // red off\n  digitalWrite(BLUE, HIGH); // blue on\n  delay(300);\n}\n",
  "diagrams": {
    "wiring": "<svg viewBox=\"0 0 800 380\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"LED BLINKER — WIRING\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"800\" height=\"380\" fill=\"#030503\"/><rect width=\"800\" height=\"380\" fill=\"url(#g)\"/><text x=\"400.0\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED BLINKER — WIRING</text><rect x=\"40\" y=\"70\" width=\"180\" height=\"230\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"130\" y=\"120\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">UNO + SHIELD</text><text x=\"130\" y=\"170\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">D8</text><text x=\"130\" y=\"210\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">D9</text><text x=\"130\" y=\"260\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GND</text><line x1=\"220\" y1=\"166\" x2=\"330\" y2=\"166\" stroke=\"#ff2a6d\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"330\" y=\"145\" width=\"110\" height=\"42\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"385\" y=\"171\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">220Ω</text><line x1=\"440\" y1=\"166\" x2=\"540\" y2=\"166\" stroke=\"#ff2a6d\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"540\" y=\"140\" width=\"130\" height=\"52\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"605\" y=\"171\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">RED LED</text><line x1=\"220\" y1=\"206\" x2=\"330\" y2=\"206\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"330\" y=\"196\" width=\"110\" height=\"42\" rx=\"6\" fill=\"#0c110c\" stroke=\"#e6c84a\" stroke-width=\"2\"/><text x=\"385\" y=\"222\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">220Ω</text><line x1=\"440\" y1=\"216\" x2=\"540\" y2=\"216\" stroke=\"#4fc3f7\" stroke-width=\"5\" stroke-linecap=\"round\"/><rect x=\"540\" y=\"200\" width=\"130\" height=\"52\" rx=\"6\" fill=\"#0c110c\" stroke=\"#4fc3f7\" stroke-width=\"2\"/><text x=\"605\" y=\"231\" text-anchor=\"middle\" fill=\"#4fc3f7\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BLUE LED</text><line x1=\"670\" y1=\"192\" x2=\"720\" y2=\"192\" stroke=\"#7a8a76\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"720\" y1=\"192\" x2=\"720\" y2=\"300\" stroke=\"#7a8a76\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"670\" y1=\"252\" x2=\"720\" y2=\"252\" stroke=\"#7a8a76\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"720\" y1=\"300\" x2=\"220\" y2=\"300\" stroke=\"#7a8a76\" stroke-width=\"5\" stroke-linecap=\"round\"/><line x1=\"220\" y1=\"300\" x2=\"220\" y2=\"256\" stroke=\"#7a8a76\" stroke-width=\"5\" stroke-linecap=\"round\"/><text x=\"400\" y=\"345\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Long leg → resistor side.  Short leg (flat side) → GND.</text></svg>",
    "led-legs": "<svg viewBox=\"0 0 700 280\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"LED LEGS\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"700\" height=\"280\" fill=\"#030503\"/><rect width=\"700\" height=\"280\" fill=\"url(#g)\"/><text x=\"350.0\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LED LEGS</text><rect x=\"80\" y=\"70\" width=\"220\" height=\"130\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><text x=\"190\" y=\"120\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">LONG LEG = +</text><text x=\"190\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">goes to resistor</text><rect x=\"400\" y=\"70\" width=\"220\" height=\"130\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><text x=\"510\" y=\"120\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"14\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">SHORT LEG = −</text><text x=\"510\" y=\"150\" text-anchor=\"middle\" fill=\"#dce6d6\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">flat side → GND</text><text x=\"350\" y=\"245\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Backwards LED = no light. Just flip it.</text></svg>",
    "joint": "<svg viewBox=\"0 0 700 300\" xmlns=\"http://www.w3.org/2000/svg\" role=\"img\" aria-label=\"GOOD JOINT VS BLOB\"><defs><pattern id=\"g\" width=\"16\" height=\"16\" patternUnits=\"userSpaceOnUse\"><path d=\"M16 0H0V16\" fill=\"none\" stroke=\"#b8ff3c\" stroke-opacity=\".05\"/></pattern></defs><rect width=\"700\" height=\"300\" fill=\"#030503\"/><rect width=\"700\" height=\"300\" fill=\"url(#g)\"/><text x=\"350.0\" y=\"22\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GOOD JOINT VS BLOB</text><rect x=\"60\" y=\"60\" width=\"260\" height=\"170\" rx=\"6\" fill=\"#0c110c\" stroke=\"#b8ff3c\" stroke-width=\"2\"/><path d=\"M190 200 L160 200 L190 120 L220 200 Z\" fill=\"#b8c4c0\"/><text x=\"190\" y=\"95\" text-anchor=\"middle\" fill=\"#b8ff3c\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">GOOD: small shiny cone</text><rect x=\"380\" y=\"60\" width=\"260\" height=\"170\" rx=\"6\" fill=\"#0c110c\" stroke=\"#ff5a4f\" stroke-width=\"2\"/><circle cx=\"510\" cy=\"160\" r=\"45\" fill=\"#b8c4c0\"/><text x=\"510\" y=\"95\" text-anchor=\"middle\" fill=\"#ff5a4f\" font-size=\"13\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">BAD: round ball</text><text x=\"350\" y=\"270\" text-anchor=\"middle\" fill=\"#e6c84a\" font-size=\"12\" font-family=\"ui-monospace,Menlo,monospace\" font-weight=\"700\">Heat the pad + leg first. Feed solder to the JOINT, not the iron.</text></svg>"
  },
  "sections": [
    {
      "id": "meet",
      "title": "1. What you are building",
      "callout": {
        "tone": "ok",
        "lead": "Mission",
        "text": "Two LEDs soldered onto your blue shield that flash red, blue, red, blue — like a tiny police light."
      },
      "diagram": "wiring",
      "steps": [
        {
          "title": "See the finished build",
          "action": "Two LEDs on the shield, each with its own resistor, blinking back and forth.",
          "detail": "1. The blue shield plugs on top of your Uno like a hat.\n2. You will solder 2 LEDs and 2 resistors onto it.\n3. A short program makes them take turns.\n4. Done looks like: red on, then blue on, over and over.\n5. Quick check: you have the Uno, the blue shield, 2 LEDs, 2 resistors and your iron on the table.\n6. Common mistake: grabbing the wrong resistor. 220Ω has bands red-red-brown.",
          "diagram": "wiring"
        },
        {
          "title": "Learn the LED legs",
          "action": "Long leg = + (goes to the resistor). Short leg / flat side = − (goes to GND).",
          "detail": "1. Hold an LED up. One leg is longer.\n2. Long leg is plus. It connects to the resistor.\n3. Short leg is minus. The rim of the LED is flat on that side too.\n4. The short leg goes to GND (ground).\n5. Quick check: say out loud which leg is long before every LED goes in.\n6. Common mistake: putting it in backwards. It won't break — it just won't light. Flip it.",
          "diagram": "led-legs",
          "warn": "Bend nothing yet. Just learn which leg is which."
        }
      ]
    },
    {
      "id": "solder",
      "title": "2. Solder the parts on",
      "callout": {
        "tone": "warn",
        "lead": "Iron is hot",
        "text": "The tip is about 650°F. Hold the handle only and always put it back in the stand."
      },
      "diagram": "joint",
      "steps": [
        {
          "title": "Set up",
          "action": "Unplug the Uno. Shield off the Uno. Iron on, wet the sponge.",
          "detail": "1. Unplug the USB cable from the Uno.\n2. Pull the blue shield off the Uno so you don't heat the board under it.\n3. Turn the iron on and give it about a minute to heat.\n4. Wipe the tip on the wet sponge, then touch a little solder to the tip so it's shiny (this is called tinning).\n5. Quick check: the tip looks shiny silver, not black.\n6. Common mistake: soldering with the shield still on the Uno.",
          "warn": "Never touch the metal part of the iron."
        },
        {
          "title": "Place the red LED",
          "action": "Push the red LED through two holes near pin D8. Long leg on the side toward D8.",
          "detail": "1. Pick two holes next to each other, close to where D8 is labeled on the shield.\n2. Push the LED legs through from the top, long leg on the D8 side.\n3. Flip the shield over and bend the legs out a little so the LED stays put.\n4. Quick check: LED sits flat on the top side.\n5. Common mistake: long leg on the wrong side. Check before you solder.",
          "diagram": "led-legs"
        },
        {
          "title": "Solder the red LED legs",
          "action": "Heat the hole and leg together, then feed solder into the joint — about a grain of rice.",
          "detail": "1. Touch the iron tip so it touches BOTH the metal ring around the hole and the leg.\n2. Count 2 seconds.\n3. Touch the solder to the leg (not the iron). It melts and flows around the leg.\n4. Use about a grain of rice, then pull the solder away, then the iron.\n5. Don't move it for 3 seconds while it cools.\n6. Do the second leg the same way.\n7. Done looks like: a small shiny cone around each leg.\n8. Common mistake: melting solder on the iron and dripping it on — that makes the round blobs.",
          "diagram": "joint"
        },
        {
          "title": "Add the red resistor",
          "action": "Resistor from the LED's long leg over to pin D8. Solder both ends.",
          "detail": "1. Put one resistor leg in the hole right next to the red LED's long leg.\n2. Put the other leg in the hole next to pin D8.\n3. Flip, solder both ends the same way: heat, then solder, grain of rice.\n4. On the bottom, connect the resistor leg to the LED long leg with a small blob bridge or a bent leg.\n5. Connect the other resistor leg to the D8 pin pad the same way.\n6. Quick check: there's a metal path from D8 → resistor → LED long leg.\n7. Common mistake: solder touching a pad it shouldn't. If two joints bridge by accident, reheat and wipe the extra off."
        },
        {
          "title": "Wire red to GND",
          "action": "Short leg of the red LED to a GND pad.",
          "detail": "1. Use a cut-off resistor leg or a short wire.\n2. Solder one end to the red LED's short leg.\n3. Solder the other end to a GND pad on the shield (labeled GND).\n4. Quick check: short leg → GND, nothing else.\n5. Common mistake: connecting the short leg to 5V instead of GND."
        },
        {
          "title": "Repeat for blue on D9",
          "action": "Same three jobs for the blue LED: LED near D9, resistor to D9, short leg to GND.",
          "detail": "1. Blue LED near D9, long leg toward D9.\n2. Solder both legs.\n3. Resistor from blue long leg to D9, solder both ends.\n4. Blue short leg to GND.\n5. Quick check: two LEDs, two resistors, both short legs at GND.\n6. Common mistake: wiring blue to D8 too. Blue must go to D9.",
          "diagram": "wiring"
        },
        {
          "title": "Trim and inspect",
          "action": "Clip extra legs. Look at every joint.",
          "detail": "1. Turn the iron off and put it in the stand.\n2. Clip the long extra legs on the bottom, about 2 mm above the joint.\n3. Look at each joint: small, shiny, cone-shaped = good.\n4. Dull, lumpy or a ball sitting on top = reheat it for 2 seconds.\n5. Make sure no solder bridges two joints that shouldn't touch.\n6. Common mistake: a tiny bridge between D8 and D9 — both LEDs then act the same.",
          "diagram": "joint"
        }
      ]
    },
    {
      "id": "code",
      "title": "3. Make it blink",
      "callout": {
        "tone": "info",
        "lead": "No more heat",
        "text": "The soldering is done. Now the Arduino app tells the LEDs when to turn on."
      },
      "steps": [
        {
          "title": "Plug in",
          "action": "Shield back on the Uno, then USB into your computer.",
          "detail": "1. Line up the shield pins with the Uno headers and press down evenly.\n2. Plug the USB cable into the Uno and your computer.\n3. Quick check: the Uno's little power light turns on.\n4. Common mistake: shield shifted one pin over. All pins should go in."
        },
        {
          "title": "Upload the program",
          "action": "Open the Arduino app, paste the code, pick Arduino Uno, press Upload.",
          "detail": "1. Open the Arduino app.\n2. Copy the code from this guide's Code box and paste it in, replacing what's there.\n3. Tools → Board → Arduino Uno.\n4. Tools → Port → the one that says Arduino Uno.\n5. Press the round arrow (Upload).\n6. Done looks like: \"Done uploading\" at the bottom.\n7. Common mistake: wrong port picked — try the other one."
        },
        {
          "title": "Watch it blink",
          "action": "Red, blue, red, blue every 0.3 seconds.",
          "detail": "1. The LEDs should take turns.\n2. Only one lights: that LED's partner is backwards or its joint is bad. Unplug, flip or reheat.\n3. Neither lights: check both short legs reach GND.\n4. Both blink together: there's a solder bridge between D8 and D9.\n5. Want it faster? Change 300 to 100 in the code and upload again.",
          "warn": "Unplug USB before you fix any joint."
        }
      ]
    }
  ]
};
