// Self-contained To Build missions — no Instagram required.
// Prices only where checked live; else "check in Pullerup" / kit / study.
window.TOBUILD_PROJECTS = [
  {
    "id": "door-alarm-shield",
    "name": "Door Alarm Shield",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": true,
    "ready": true,
    "handle": "",
    "url": "",
    "thumb": "thumbs/door-alarm-shield.svg",
    "building": "Ultrasonic door alarm on your Elegoo: under ~30 cm it latches a siren + police LED flash until you hit reset. Breadboard test first, then solder the blue shield.",
    "learn": "Sensors, latching alarms, LEDs, buzzers, and safe soldering.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Blue proto shield",
        "have": true
      },
      {
        "n": "HC-SR04",
        "have": true
      },
      {
        "n": "Pushbutton",
        "have": true
      },
      {
        "n": "Buzzer",
        "have": true
      },
      {
        "n": "2 red + 2 blue LEDs",
        "have": true
      },
      {
        "n": "4× 220Ω–1kΩ",
        "have": true
      },
      {
        "n": "Breadboard + jumpers",
        "have": true
      }
    ],
    "steps": [
      "Open the FUX guide and follow Part 2 breadboard, then Part 3 soldering.",
      "Unplug USB while moving wires.",
      "Never grab the iron tip (~350°C)."
    ],
    "guide": "door-alarm-shield",
    "partsUrl": "door-alarm-shield",
    "linkId": "door-alarm-shield"
  },
  {
    "id": "arc-reactor",
    "name": "Iron Man Arc Reactor",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": true,
    "ready": true,
    "handle": "",
    "url": "",
    "thumb": "thumbs/arc-reactor.svg",
    "building": "NeoPixel LED ring on your Elegoo: a short cyan chase on power-up, then a soft blue-white breathing glow. Breadboard test first, then solder three leads to the ring.",
    "learn": "Addressable LEDs, data-line resistors, safe USB power limits, and clean solder joints on pads.",
    "cost": "$9.95",
    "costKind": "buy",
    "costDetail": "Adafruit 16-LED NeoPixel ring. Kit covers the rest.",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Blue proto shield",
        "have": true
      },
      {
        "n": "NeoPixel ring 16× RGB",
        "have": false,
        "price": "$9.95 Adafruit"
      },
      {
        "n": "220–470Ω resistor",
        "have": true
      },
      {
        "n": "Kit capacitor (optional)",
        "have": true
      },
      {
        "n": "Breadboard + jumpers",
        "have": true
      },
      {
        "n": "Soldering iron",
        "have": true
      }
    ],
    "steps": [
      "Buy the NeoPixel ring (parts page).",
      "Install Adafruit_NeoPixel library.",
      "Breadboard: 5V, GND, D6→resistor→DIN. Upload ArcReactor.",
      "When it breathes, solder three leads on the ring.",
      "Never grab the iron tip. Keep BRIGHT ≤ 40 on USB."
    ],
    "guide": "arc-reactor",
    "partsUrl": "arc-reactor",
    "linkId": "arc-reactor"
  },
  {
    "id": "theremin",
    "name": "Ultrasonic Theremin",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": true,
    "ready": true,
    "handle": "",
    "url": "",
    "thumb": "thumbs/theremin.svg",
    "building": "Wave a hand over your HC-SR04: a passive buzzer plays sci-fi notes with pitch tracking distance. Button flips scales. Breadboard first, then solder the blue shield.",
    "learn": "Ultrasonic ranging, tone(), musical scales, INPUT_PULLUP buttons, and shield soldering.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "Buy Adafruit piezo $1.50 only if your kit buzzer is active (fixed pitch).",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Blue proto shield",
        "have": true
      },
      {
        "n": "HC-SR04",
        "have": true
      },
      {
        "n": "Passive kit buzzer",
        "have": true
      },
      {
        "n": "Pushbutton",
        "have": true
      },
      {
        "n": "Breadboard + jumpers",
        "have": true
      },
      {
        "n": "Soldering iron",
        "have": true
      },
      {
        "n": "Piezo if kit is active",
        "have": false,
        "price": "$1.50 Adafruit"
      }
    ],
    "steps": [
      "Confirm buzzer is passive (pitch can change).",
      "Breadboard: Trig D9, Echo D10, buzz D8, button D2→GND.",
      "Upload Theremin sketch. Wave 5–40 cm.",
      "When it sings, solder the same map on the blue shield.",
      "Never grab the iron tip."
    ],
    "guide": "theremin",
    "partsUrl": "theremin",
    "linkId": "theremin"
  },
  {
    "id": "soldering-tips",
    "name": "First Clean Joints",
    "level": 1,
    "levelName": "Rookie",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "cocoasaesthetic",
    "url": "https://www.instagram.com/p/DdMpD5goEWZ/",
    "thumb": "thumbs/soldering-tips.svg",
    "building": "Practice real solder joints on your blue proto shield: one LED, one resistor, shiny “volcano” joints. Safety first.",
    "learn": "How to melt solder safely and make clean joints.",
    "cost": "$0–$9.25",
    "costKind": "buy",
    "costDetail": "Buy solder only if your spool is empty.",
    "parts": [
      {
        "n": "Elegoo + blue shield",
        "have": true
      },
      {
        "n": "LED + 220Ω",
        "have": true
      },
      {
        "n": "Soldering iron",
        "have": true
      },
      {
        "n": "Solder wire if empty",
        "have": false,
        "price": "$9.25 Adafruit"
      }
    ],
    "steps": [
      "Glasses on. Iron in stand. Never grab the tip.",
      "Shield OFF the Uno.",
      "Solder resistor then LED.",
      "Blink-test on D8 via FUX guide."
    ],
    "guide": "soldering-tips",
    "partsUrl": "soldering-tips",
    "linkId": "soldering-tips"
  },
  {
    "id": "heat-shrink",
    "name": "Heat-Shrink Wire Joins",
    "level": 1,
    "levelName": "Rookie",
    "category": "tools",
    "tags": [
      "tools",
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "stalkci.insancikk",
    "url": "https://www.instagram.com/p/DedwcSbFKe8/",
    "thumb": "thumbs/heat-shrink.svg",
    "building": "Join two wires the clean way: slide heat-shrink on first, twist or solder, then shrink. Compare vs tape.",
    "learn": "Stronger, cleaner wire joins than twist-and-tape.",
    "cost": "$2.90",
    "costKind": "buy",
    "costDetail": "",
    "parts": [
      {
        "n": "Jumper/scrap wire",
        "have": true
      },
      {
        "n": "Heat-shrink 8-pack",
        "have": false,
        "price": "$2.90 Home Depot"
      },
      {
        "n": "Optional bigger kit",
        "have": false,
        "price": "$9.99 Pyrodrone"
      }
    ],
    "steps": [
      "Slide tube on BEFORE joining.",
      "Strip ~8 mm, twist (or solder).",
      "Center tube over bare metal.",
      "Heat evenly until it hugs. Tug test."
    ],
    "guide": "heat-shrink",
    "partsUrl": "heat-shrink",
    "linkId": "heat-shrink"
  },
  {
    "id": "tool-kit-tour",
    "name": "Tool Kit Tour",
    "level": 1,
    "levelName": "Rookie",
    "category": "tools",
    "tags": [
      "tools"
    ],
    "featured": false,
    "ready": false,
    "handle": "best.products155",
    "url": "https://www.instagram.com/p/DbxLkNXMZZ3/",
    "thumb": "thumbs/tool-kit-tour.svg",
    "building": "Lay out your real tools (iron, cutters, tweezers, multimeter if you have one) and label what each is for. Make a “grab this first” card for your bench.",
    "learn": "Knowing which tool to grab before a build.",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Your soldering iron",
        "have": true
      },
      {
        "n": "Cutters / tweezers",
        "have": true,
        "note": "kit or household"
      },
      {
        "n": "Optional multimeter",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Clear a tray.",
      "Place iron, stand, sponge, cutters, jumpers.",
      "Write one sticky note per tool: what it does.",
      "Photo your tray so you can reset it later."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "tool-kit-tour"
  },
  {
    "id": "board-buffet",
    "name": "Board Buffet",
    "level": 1,
    "levelName": "Rookie",
    "category": "Arduino/Raspberry Pi",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "wire_thinkers",
    "url": "https://www.instagram.com/p/DepMC94CQNX/",
    "thumb": "thumbs/board-buffet.svg",
    "building": "Hands-on board tour with what you own: power the Uno and Mega, blink pin 13 on each, note USB shape, 5V vs 3.3V labels, and pin counts.",
    "learn": "Which brain-board fits which project.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Elegoo Mega",
        "have": true
      },
      {
        "n": "USB cable",
        "have": true
      },
      {
        "n": "LED optional",
        "have": true
      }
    ],
    "steps": [
      "Upload Blink to Uno — onboard LED flashes.",
      "Repeat on Mega.",
      "Write: Uno ≈ 14 digital I/O; Mega ≈ 54.",
      "Note: both are 5V logic. ESP32/Pi are different (later buys — check Pullerup)."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "board-buffet"
  },
  {
    "id": "sensor-school",
    "name": "Sensor Safari",
    "level": 1,
    "levelName": "Rookie",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "tryblueprint.io",
    "url": "https://www.instagram.com/p/DecQlXFvmql/",
    "thumb": "thumbs/sensor-school.svg",
    "building": "Wire your HC-SR04 so an LED (and buzzer) fire when something is closer than 20 cm.",
    "learn": "How boards sense distance in the real world.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "HC-SR04",
        "have": true
      },
      {
        "n": "LED + 220Ω",
        "have": true
      },
      {
        "n": "Buzzer",
        "have": true
      },
      {
        "n": "Breadboard + jumpers",
        "have": true
      }
    ],
    "steps": [
      "VCC→5V, GND→GND, Trig→D12, Echo→D11.",
      "LED on D8 via 220Ω.",
      "Upload Sensor Safari sketch.",
      "Wave hand — LED under 20 cm."
    ],
    "guide": "sensor-school",
    "partsUrl": "sensor-school",
    "linkId": "sensor-school"
  },
  {
    "id": "circuit-sandbox",
    "name": "First Breadboard Circuit",
    "level": 1,
    "levelName": "Rookie",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "setupsai",
    "url": "https://www.instagram.com/p/DcOBegGzxJs/",
    "thumb": "thumbs/circuit-sandbox.svg",
    "building": "Real button→LED on your breadboard (the physical version of on-screen circuit sandboxes).",
    "learn": "Breadboard rails, INPUT_PULLUP buttons, first coded circuit.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Breadboard + jumpers",
        "have": true
      },
      {
        "n": "Pushbutton",
        "have": true
      },
      {
        "n": "LED + 220Ω",
        "have": true
      }
    ],
    "steps": [
      "Button across trench: one side D2, other GND.",
      "D7 → 220Ω → LED+ ; LED− → GND.",
      "Upload sketch. Press = light."
    ],
    "guide": "circuit-sandbox",
    "partsUrl": "circuit-sandbox",
    "linkId": "circuit-sandbox"
  },
  {
    "id": "usb-led",
    "name": "USB LED Lamp",
    "level": 1,
    "levelName": "Rookie",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "explainingeverythingsimply",
    "url": "https://www.instagram.com/p/DXXp5MUBLvn/",
    "thumb": "thumbs/usb-led.svg",
    "building": "A tiny USB-powered LED lamp: 5V → 220Ω resistor → LED → GND. Kit path uses your Elegoo 5V pin so you buy nothing.",
    "learn": "Why LEDs need resistors and how a simple circuit closes.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno (5V+GND)",
        "have": true
      },
      {
        "n": "Red LED",
        "have": true
      },
      {
        "n": "220Ω resistor",
        "have": true
      },
      {
        "n": "Breadboard + jumpers",
        "have": true
      },
      {
        "n": "USB charger",
        "have": true
      },
      {
        "n": "Optional USB-A male breakout",
        "have": false,
        "price": "$1.99 Tinkersphere"
      }
    ],
    "steps": [
      "Unplug USB.",
      "Wire 5V → 220Ω → LED long leg; short leg → GND.",
      "Plug USB — LED glows.",
      "Optional: same circuit on a USB breakout for a no-Uno lamp."
    ],
    "guide": "usb-led",
    "partsUrl": "usb-led",
    "linkId": "usb-led"
  },
  {
    "id": "drone-anatomy",
    "name": "Drone Anatomy",
    "level": 1,
    "levelName": "Rookie",
    "category": "drones",
    "tags": [
      "drones"
    ],
    "featured": false,
    "ready": false,
    "handle": "useful.electronics.embedded",
    "url": "https://www.instagram.com/p/DefUL0MIlke/",
    "thumb": "thumbs/drone-anatomy.svg",
    "building": "Build a labeled cardboard “drone cutaway”: frame, 4 motors, flight controller, battery, camera/VTX. No flying — just the map.",
    "learn": "Motors, frames, flight controllers, and power basics.",
    "cost": "$0 + cardboard",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Cardboard + markers",
        "have": true,
        "note": "household"
      },
      {
        "n": "Optional: toy props for show",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Draw an X frame.",
      "Label: FC in center, motor on each arm, LiPo on belly, camera on nose.",
      "Say out loud what each part does.",
      "When you buy a real quad later, match this map to Pullerup drone parts."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "drone-anatomy"
  },
  {
    "id": "beginner-print-five",
    "name": "Beginner Print Five",
    "level": 1,
    "levelName": "Rookie",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "3d_printflow_",
    "url": "https://www.instagram.com/p/DblFa2sti1L/",
    "thumb": "thumbs/beginner-print-five.svg",
    "building": "Pick five useful first prints (cable clip, SD holder, hook, bin, phone stand). Download free STLs and print if you have a printer — or queue them for later.",
    "learn": "Easy first prints that actually help around the house.",
    "cost": "Needs 3D printer",
    "costKind": "printer",
    "costDetail": "",
    "parts": [
      {
        "n": "3D printer access",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "PLA filament",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Free STL sites (Printables/Thingiverse)",
        "have": true,
        "note": "free accounts"
      }
    ],
    "steps": [
      "List 5 household annoyances.",
      "Find one free STL each.",
      "Print the smallest first (clip).",
      "Note bed temp / nozzle from the filament chart project."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "beginner-print-five"
  },
  {
    "id": "print-fix-sheet",
    "name": "Print Fix Sheet",
    "level": 1,
    "levelName": "Rookie",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "terror_prints",
    "url": "https://www.instagram.com/p/DeMhkhFFmbe/",
    "thumb": "thumbs/print-fix-sheet.svg",
    "building": "Make your own one-page troubleshooting cheat sheet: spaghetti, warping, under-extrusion, layer shift — with one fix each.",
    "learn": "How to spot and fix common print fails.",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Paper or notes app",
        "have": true
      },
      {
        "n": "Printer (to practice fixes later)",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Write 4 fail names.",
      "Add one cause + one fix each (e.g. warp → clean bed + brim).",
      "Tape the sheet by the printer.",
      "After a real fail, check a box when the fix works."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "print-fix-sheet"
  },
  {
    "id": "filament-chart",
    "name": "Filament Settings Chart",
    "level": 1,
    "levelName": "Rookie",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "modul_version",
    "url": "https://www.instagram.com/p/DexUlWHNPfw/",
    "thumb": "thumbs/filament-chart.svg",
    "building": "Copy a simple PLA / PETG / TPU starter chart: nozzle temp, bed temp, speed “start here” numbers. Hang it by the printer.",
    "learn": "Temps and speeds for different plastics.",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Paper / spreadsheet",
        "have": true
      },
      {
        "n": "Your filament brand’s label",
        "have": false,
        "note": "when you buy — check Pullerup"
      }
    ],
    "steps": [
      "Make 3 rows: PLA, PETG, TPU.",
      "Fill nozzle/bed from the spool sticker when you have one.",
      "Until then use study ranges only as “ask the spool” reminders — never invent a brand’s number.",
      "Update the chart after each successful print."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "filament-chart"
  },
  {
    "id": "print-resource-pack",
    "name": "Print Resource Pack",
    "level": 1,
    "levelName": "Rookie",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "ad3duae",
    "url": "https://www.instagram.com/p/DevUlahi1vz/",
    "thumb": "thumbs/print-resource-pack.svg",
    "building": "Build a bookmarks folder: 5 model sites, 2 slicers, 2 fix guides, 1 filament dryer tip page. That’s your resource pack.",
    "learn": "Where to find models, guides, and help.",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Browser bookmarks",
        "have": true
      }
    ],
    "steps": [
      "Create folder “3D Print Pack”.",
      "Add Printables, Thingiverse, MakerWorld.",
      "Add Cura or PrusaSlicer download page.",
      "Add one troubleshooting wiki. Done — no post needed."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "print-resource-pack"
  },
  {
    "id": "text-to-cad",
    "name": "Text-to-CAD",
    "level": 1,
    "levelName": "Rookie",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "printpal.io",
    "url": "https://www.instagram.com/p/DcL3XZuvvSz/",
    "thumb": "thumbs/text-to-cad.svg",
    "building": "Try a free text-to-CAD / AI CAD tool in the browser: prompt a simple box with a hole, export STL if offered, inspect it in a free viewer.",
    "learn": "Turning words into a printable 3D model.",
    "cost": "Free web tools",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Computer + browser",
        "have": true
      },
      {
        "n": "Optional printer to print the STL",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Open a free AI-CAD or TinkerCAD.",
      "Prompt: “40mm box with 5mm hole”.",
      "Export STL if available.",
      "Open in a free viewer; only print if it looks solid."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "text-to-cad"
  },
  {
    "id": "footstep-tile",
    "name": "Footstep Power Tile",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics",
    "tags": [
      "electronics",
      "engineering"
    ],
    "featured": false,
    "ready": true,
    "handle": "unbustable.nuttt",
    "url": "https://www.instagram.com/p/DQlvPsxkT99/",
    "thumb": "thumbs/footstep-tile.svg",
    "building": "Desk piezo tile: step flexes discs → voltage → diode bridge → capacitor → LED flash. Tiny energy-floor demo.",
    "learn": "How pressure can make electric power (and why we rectify spikes).",
    "cost": "$7.25",
    "costKind": "buy",
    "costDetail": "",
    "parts": [
      {
        "n": "4× piezo discs",
        "have": false,
        "price": "$3.80 Adafruit"
      },
      {
        "n": "1N4001 10-pack",
        "have": false,
        "price": "$1.50"
      },
      {
        "n": "100µF 16V pack",
        "have": false,
        "price": "$1.95"
      },
      {
        "n": "LED",
        "have": true
      },
      {
        "n": "Cardboard + foam",
        "have": true
      }
    ],
    "steps": [
      "Build diode bridge. Parallel piezos to AC.",
      "Cap + LED on DC side (mind polarity).",
      "Sandwich boards with foam.",
      "Press — LED flashes. Wash hands after piezos."
    ],
    "guide": "footstep-tile",
    "partsUrl": "footstep-tile",
    "linkId": "footstep-tile"
  },
  {
    "id": "volvo-steer",
    "name": "Volvo Split Steer",
    "level": 2,
    "levelName": "Apprentice",
    "category": "engineering",
    "tags": [
      "engineering",
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "technology",
    "url": "https://www.instagram.com/p/DNHGEXUtpyb/",
    "thumb": "thumbs/volvo-steer.svg",
    "building": "Joystick X-axis steers your kit servo — a tiny control-stick steering practice.",
    "learn": "How a control stick maps to a steering angle.",
    "cost": "$0 (kit)",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Joystick",
        "have": true
      },
      {
        "n": "Servo",
        "have": true
      },
      {
        "n": "Jumpers",
        "have": true
      }
    ],
    "steps": [
      "Joystick VCC/GND → 5V/GND, VRx → A0.",
      "Servo signal → D9, power 5V+GND.",
      "Upload sketch. Steer left/right."
    ],
    "guide": "volvo-steer",
    "partsUrl": "volvo-steer",
    "linkId": "volvo-steer"
  },
  {
    "id": "self-heal-concrete",
    "name": "Self-Heal Concrete",
    "level": 2,
    "levelName": "Apprentice",
    "category": "engineering",
    "tags": [
      "engineering"
    ],
    "featured": false,
    "ready": false,
    "handle": "mythicalpost.pull",
    "url": "https://www.instagram.com/p/DSHZvVIETMz/",
    "thumb": "thumbs/self-heal-concrete.svg",
    "building": "Kitchen science demo (not structural): mix a small plaster/concrete puck, crack it, and try a safe “heal” experiment with baking-soda / glue filler as a stand-in for bacterial limestone — observe, don’t load-bear.",
    "learn": "Materials that fix themselves (concept demo).",
    "cost": "Household ~check store",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Plaster or mortar mix",
        "have": false,
        "price": "check in Pullerup / hardware store"
      },
      {
        "n": "Baking soda + white glue",
        "have": true,
        "note": "household stand-in"
      },
      {
        "n": "Cups + stir stick",
        "have": true
      }
    ],
    "steps": [
      "Cast a small puck; let cure per package.",
      "Crack lightly.",
      "Pack filler into crack; let dry.",
      "Compare photos — learning demo only, not for real concrete loads."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "self-heal-concrete"
  },
  {
    "id": "heartbeat-sensor",
    "name": "Heartbeat Sensor Challenge",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": true,
    "handle": "tech.explain1",
    "url": "https://www.instagram.com/p/Ddt_E-QJbzD/",
    "thumb": "thumbs/heartbeat-sensor.svg",
    "building": "Fingertip pulse sensor prints BPM and blinks an LED each beat. Learning only — not medical.",
    "learn": "Reading a body signal with electronics.",
    "cost": "$9.72",
    "costKind": "buy",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno",
        "have": true
      },
      {
        "n": "Pulse sensor module",
        "have": false,
        "price": "$9.72 RobotShop"
      },
      {
        "n": "Jumpers",
        "have": true
      }
    ],
    "steps": [
      "Sensor + → 5V, − → GND, S → A0.",
      "Upload sketch. Serial 9600.",
      "Rest finger gently; stay still.",
      "Tune THRESH if needed."
    ],
    "guide": "heartbeat-sensor",
    "partsUrl": "heartbeat-sensor",
    "linkId": "heartbeat-sensor"
  },
  {
    "id": "printed-drone",
    "name": "Printed Drone How-To",
    "level": 2,
    "levelName": "Apprentice",
    "category": "drones/3D printing",
    "tags": [
      "drones",
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "nicolasgrant_film",
    "url": "https://www.instagram.com/p/DcdGUsfN57H/",
    "thumb": "thumbs/printed-drone.svg",
    "building": "Study how a printed frame carries FC, motors, and battery. Build a cardboard weight mock-up with your Uno as “FC” mass stand-in.",
    "learn": "Printed frames plus flight electronics.",
    "cost": "$0 mock-up; real drone later",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Cardboard + tape",
        "have": true
      },
      {
        "n": "Elegoo as weight stand-in",
        "have": true
      },
      {
        "n": "Real FPV parts later",
        "have": false,
        "price": "check in Pullerup drone build"
      }
    ],
    "steps": [
      "Cut an X frame from cardboard.",
      "Tape Uno in center as “FC”.",
      "Mark motor corners.",
      "When ready to buy a real frame, open Pullerup drone parts."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "printed-drone"
  },
  {
    "id": "uav-futures",
    "name": "UAV Futures Lab",
    "level": 2,
    "levelName": "Apprentice",
    "category": "drones",
    "tags": [
      "drones"
    ],
    "featured": false,
    "ready": false,
    "handle": "itsnickrandom",
    "url": "https://www.instagram.com/p/Dek28oZOLmZ/",
    "thumb": "thumbs/uav-futures.svg",
    "building": "Plan a drone on paper (or UAV Futures-style planner): size, battery cells, use-case. No buy until the plan fits a Pullerup parts list.",
    "learn": "Planning a drone before you buy parts.",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Paper / notes",
        "have": true
      },
      {
        "n": "Pullerup drone catalog later",
        "have": true,
        "note": "on this site"
      }
    ],
    "steps": [
      "Write mission: film / freestyle / long-range.",
      "Pick frame size class (3\" / 5\" / 7\").",
      "List: frame, motors×4, FC/ESC, RX, battery, props.",
      "Ask Kaserin / Pullerup to price that list — don’t guess."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "uav-futures"
  },
  {
    "id": "car-print-pack",
    "name": "Car Print Pack",
    "level": 2,
    "levelName": "Apprentice",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "apexrapidlabss",
    "url": "https://www.instagram.com/p/Dd5fTn6oeaw/",
    "thumb": "thumbs/car-print-pack.svg",
    "building": "Shortlist 3 car-related prints (hook, phone mount, fuse-box clip). Only print if you own a printer and the part is safe (no steering/brakes).",
    "learn": "Useful prints for real cars — stay non-safety-critical.",
    "cost": "Needs 3D printer",
    "costKind": "printer",
    "costDetail": "",
    "parts": [
      {
        "n": "3D printer + PLA/PETG",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Car make/model for fit",
        "have": true,
        "note": "measure twice"
      }
    ],
    "steps": [
      "Measure the spot in the car.",
      "Find a free STL that matches.",
      "Print a draft in PLA.",
      "Only keep if it fits without blocking controls."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "car-print-pack"
  },
  {
    "id": "pet-poop-printer",
    "name": "Pet Poop Printer",
    "level": 2,
    "levelName": "Apprentice",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "the_3dwizard",
    "url": "https://www.instagram.com/p/DZXtUaMRd3w/",
    "thumb": "thumbs/pet-poop-printer.svg",
    "building": "Funny useful print: a bag dispenser / scoop holder. Design path = download a pet-waste holder STL and print when you have a printer.",
    "learn": "Funny useful prints for home life.",
    "cost": "Needs 3D printer",
    "costKind": "printer",
    "costDetail": "",
    "parts": [
      {
        "n": "3D printer",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "PLA",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Search free “dog bag dispenser” STL.",
      "Print the wall-mount version first.",
      "Install away from heat/sun if PLA.",
      "Skip if no printer — leave status To build."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "pet-poop-printer"
  },
  {
    "id": "prank-dropper",
    "name": "Prank Dropper Prints",
    "level": 2,
    "levelName": "Apprentice",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "the_3dwizard",
    "url": "https://www.instagram.com/p/DbjWckEh_S-/",
    "thumb": "thumbs/prank-dropper.svg",
    "building": "Moving-part print practice: a simple hinge or “trap door” model from free STLs. Learn linkages — keep pranks kind.",
    "learn": "Moving parts in a print.",
    "cost": "Needs 3D printer",
    "costKind": "printer",
    "costDetail": "",
    "parts": [
      {
        "n": "3D printer",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "PLA + snap-fit tolerance patience",
        "have": false,
        "note": "print test cubes first"
      }
    ],
    "steps": [
      "Print a simple hinge demo cube.",
      "Then a dropper/trap-door free model.",
      "Sand/fit until it moves free.",
      "No harmful pranks."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "prank-dropper"
  },
  {
    "id": "top-five-prints",
    "name": "Top Five Prints Reel",
    "level": 2,
    "levelName": "Apprentice",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "layer_works",
    "url": "https://www.instagram.com/p/Ddj8CrjtrTC/",
    "thumb": "thumbs/top-five-prints.svg",
    "building": "Make your own top-5 print queue from free sites and pin it on To Build as your next printer jobs.",
    "learn": "Ideas for your next print queue.",
    "cost": "$0 to list; printer to run",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Bookmark folder",
        "have": true
      },
      {
        "n": "Printer when ready",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Pick 5 STLs you actually need.",
      "Order them smallest → biggest.",
      "Print #1 only when printer+filament are ready.",
      "Mark Built on this card when #5 is done."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "top-five-prints"
  },
  {
    "id": "beta-ccd",
    "name": "Beta on a CCD",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics/science",
    "tags": [
      "electronics",
      "engineering"
    ],
    "featured": false,
    "ready": false,
    "handle": "scienceexplored",
    "url": "https://www.instagram.com/p/DZh6Y2jNyUs/",
    "thumb": "thumbs/beta-ccd.svg",
    "building": "Learning watch: understand that particle hits can light CCD pixels. Safe home version = point a phone camera at a CRT/old TV static isn’t needed — instead read a short CCD/noise explainer and try a dark-frame photo with your phone lens covered.",
    "learn": "How sensors catch tiny signals (and noise).",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Phone camera",
        "have": true
      },
      {
        "n": "No radioactive sources",
        "have": true,
        "note": "do NOT seek radioactive samples"
      }
    ],
    "steps": [
      "Cover the lens; take a 1–2s dark photo.",
      "Zoom — you’ll see sensor noise speckles.",
      "That’s the cousin of “hits on a CCD,” not a radiation experiment.",
      "Never handle radioactive material for a hobby demo."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "beta-ccd"
  },
  {
    "id": "rf-gadget-tour",
    "name": "RF Gadget Tour",
    "level": 2,
    "levelName": "Apprentice",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "getintoai",
    "url": "https://www.instagram.com/p/Dem3nc1gXcp/",
    "thumb": "thumbs/rf-gadget-tour.svg",
    "building": "Study card only: know what Flipper / HackRF / Proxmark / Rubber Ducky are for. Legal learning — no unauthorized access. Sketch a “lab vs illegal” table.",
    "learn": "What radio and USB tools can do (learn, don’t misuse).",
    "cost": "$0 to study",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Notebook",
        "have": true
      },
      {
        "n": "Any of those gadgets",
        "have": false,
        "price": "check in Pullerup if you ever buy for licensed lab use"
      }
    ],
    "steps": [
      "Write 4 device names.",
      "For each: one legal learning use, one illegal misuse.",
      "Promise: only your own gear / explicit permission.",
      "Skip buying until you have a real licensed reason."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "rf-gadget-tour"
  },
  {
    "id": "usb-keyboard-brain",
    "name": "$4 USB Keyboard Brain",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "technologybrief",
    "url": "https://www.instagram.com/p/De2_FvjjkU0/",
    "thumb": "thumbs/usb-keyboard-brain.svg",
    "building": "Turn a cheap RP2040 board into a USB keyboard that types a phrase when plugged in (authorized machines only).",
    "learn": "Making a tiny chip pretend to be a keyboard.",
    "cost": "RP2040 board — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "RP2040 / Pico-like board",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "USB cable",
        "have": true
      },
      {
        "n": "Your own PC for testing",
        "have": true
      }
    ],
    "steps": [
      "Buy/find RP2040 (price in Pullerup — don’t guess).",
      "Flash CircuitPython or QMK/firmware per board docs.",
      "Make it type a harmless test string on YOUR PC.",
      "Never plug into others’ machines without OK."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "usb-keyboard-brain"
  },
  {
    "id": "meshtastic",
    "name": "Meshtastic Messenger",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "schemdeck",
    "url": "https://www.instagram.com/p/DedJ91HPW_A/",
    "thumb": "thumbs/meshtastic.svg",
    "building": "Off-grid texting with LoRa + ESP32 running Meshtastic. Pair two nodes later; start by flashing one.",
    "learn": "Texting without cell towers.",
    "cost": "ESP32 LoRa board — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "ESP32 LoRa board (e.g. Heltec/TTGO class)",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "USB cable",
        "have": true
      },
      {
        "n": "Phone with Meshtastic app",
        "have": true
      }
    ],
    "steps": [
      "Order a Meshtastic-capable board (price-check first).",
      "Flash Meshtastic web flasher.",
      "Set region correctly for the US.",
      "Send a test to a second node when you have one."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "meshtastic"
  },
  {
    "id": "marauder-mini",
    "name": "Marauder Mini",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "lifetronix.in",
    "url": "https://www.instagram.com/p/DeQ8KxLCRn4/",
    "thumb": "thumbs/marauder-mini.svg",
    "building": "ESP32 Marauder-style wireless analysis tool for networks you own / have permission to test.",
    "learn": "Scanning and studying wireless signals — permission required.",
    "cost": "ESP32 board — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "ESP32 board suitable for Marauder",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "USB cable",
        "have": true
      }
    ],
    "steps": [
      "Confirm you will only test your own Wi-Fi.",
      "Buy board after Pullerup price check.",
      "Flash Marauder firmware from official docs.",
      "Run a scan on your SSID only."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "marauder-mini"
  },
  {
    "id": "pocket-text-radio",
    "name": "Pocket Text Radio",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "digitalcreatorblue",
    "url": "https://www.instagram.com/p/De7MxAAihny/",
    "thumb": "thumbs/pocket-text-radio.svg",
    "building": "Pocket off-grid encrypted text radio — usually another LoRa/ESP32 messenger build. Treat like Meshtastic: licensed/legal band + your gear.",
    "learn": "Private radio text with no internet.",
    "cost": "LoRa messenger hardware — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "LoRa messenger board / kit",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "USB power bank",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Decide Meshtastic vs other firmware.",
      "Price the board in Pullerup.",
      "Flash + set US region.",
      "Range-test in open space with a buddy."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "pocket-text-radio"
  },
  {
    "id": "head-track-cam",
    "name": "Head-Track Cam",
    "level": 3,
    "levelName": "Builder",
    "category": "robotics/electronics",
    "tags": [
      "robotics",
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "realthehlab",
    "url": "https://www.instagram.com/p/Dc36C8_TrO-/",
    "thumb": "thumbs/head-track-cam.svg",
    "building": "Camera that follows your head: IMU or webcam pose → two servos on a pan-tilt. Start with joystick pan-tilt (you already can), then swap in a sensor later.",
    "learn": "Cameras that follow where you look.",
    "cost": "$0 starter; IMU later",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo + joystick + servo (starter)",
        "have": true
      },
      {
        "n": "Second servo + pan-tilt bracket",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "IMU / PC webcam tracking later",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Finish Volvo Split Steer first.",
      "Add a second servo for tilt (price-check).",
      "Mount a light webcam.",
      "Later: replace joystick with head-tracking software/IMU."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "head-track-cam"
  },
  {
    "id": "printed-robot-arm",
    "name": "Printed Robot Arm",
    "level": 3,
    "levelName": "Builder",
    "category": "robotics/3D printing",
    "tags": [
      "robotics",
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "fdotinc",
    "url": "https://www.instagram.com/p/DczhNu2oPXV/",
    "thumb": "thumbs/printed-robot-arm.svg",
    "building": "3D-printed arm with several servos. Kit path: drive ONE joint with your existing servo + Uno while you design/print the rest.",
    "learn": "Joints, servos, and printed structure.",
    "cost": "Printer + more servos — check",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo + 1 servo (practice joint)",
        "have": true
      },
      {
        "n": "More servos (4–6)",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Printed brackets / STL kit",
        "have": false,
        "price": "needs printer — check Pullerup"
      }
    ],
    "steps": [
      "Code one servo sweep on D9.",
      "Download a free hobby arm STL set.",
      "Print base first.",
      "Add servos as you buy them — never guess prices."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "printed-robot-arm"
  },
  {
    "id": "f35-stick",
    "name": "F-35 Stick Build",
    "level": 3,
    "levelName": "Builder",
    "category": "mechanical/electronics",
    "tags": [
      "electronics",
      "engineering"
    ],
    "featured": false,
    "ready": false,
    "handle": "realthehlab",
    "url": "https://www.instagram.com/p/DZkvnMBzD-j/",
    "thumb": "thumbs/f35-stick.svg",
    "building": "Flight-stick feel: mount your joystick in a cardboard cockpit shroud and map axes to Serial “control surface” bars. Hardware stick replica later.",
    "learn": "Real flight-stick feel and wiring.",
    "cost": "$0 cardboard mock",
    "costKind": "kit",
    "costDetail": "",
    "parts": [
      {
        "n": "Joystick + Elegoo",
        "have": true
      },
      {
        "n": "Cardboard shroud",
        "have": true
      },
      {
        "n": "Optional fancy stick hardware",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Build a cardboard tray around the joystick.",
      "Read X/Y to Serial plotter.",
      "Label throttle/yaw if you add pots later.",
      "Upgrade parts only after Pullerup prices."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "f35-stick"
  },
  {
    "id": "flashbang-model",
    "name": "Flashbang Model",
    "level": 3,
    "levelName": "Builder",
    "category": "3D printing",
    "tags": [
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "the_3dwizard",
    "url": "https://www.instagram.com/p/DdEnX-GRLoO/",
    "thumb": "thumbs/flashbang-model.svg",
    "building": "Print a prop “flashbang” shell with a moving spoon latch — inert model only, no pyrotechnics ever.",
    "learn": "Mechanism prints that move.",
    "cost": "Needs 3D printer",
    "costKind": "printer",
    "costDetail": "",
    "parts": [
      {
        "n": "3D printer + PLA",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "No powder / no charge — prop only",
        "have": true
      }
    ],
    "steps": [
      "Download an inert prop STL (no functional charge designs).",
      "Print body + spoon.",
      "Fit spring carefully (toy spring only).",
      "Never add chemicals or explosives."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "flashbang-model"
  },
  {
    "id": "bottle-filament",
    "name": "Bottle-to-Filament",
    "level": 3,
    "levelName": "Builder",
    "category": "3D printing",
    "tags": [
      "3d",
      "engineering"
    ],
    "featured": false,
    "ready": false,
    "handle": "crafter.duck",
    "url": "https://www.instagram.com/p/DbLbH9ggGQr/",
    "thumb": "thumbs/bottle-filament.svg",
    "building": "Recycle PET bottle → filament path: learn the workflow (wash, strip, extrude). Needs a filament extruder — don’t improvise heaters unsafely.",
    "learn": "Turning trash plastic into print material.",
    "cost": "Extruder gear — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Clean PET bottles",
        "have": true,
        "note": "household"
      },
      {
        "n": "Bottle-strip tool + extruder",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Adult help around heat",
        "have": true
      }
    ],
    "steps": [
      "Watch a reputable PET→filament workflow.",
      "Price a real extruder — no toaster hacks.",
      "Practice bottle cutting/washing first.",
      "Extrude only with proper tool + ventilation."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "bottle-filament"
  },
  {
    "id": "cyberdeck",
    "name": "Cyberdeck Quest",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics/DIY",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "randomtech97",
    "url": "https://www.instagram.com/p/DdMYVzLoNUa/",
    "thumb": "thumbs/cyberdeck.svg",
    "building": "DIY cyberdeck: small SBC/laptop guts in a custom case with a keyboard. Start by measuring a case cardboard mock around a phone + keyboard.",
    "learn": "Packing a tiny computer into a custom case.",
    "cost": "SBC/case — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Cardboard mock + packing tape",
        "have": true
      },
      {
        "n": "SBC / used mini PC / phone",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Keyboard",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Cardboard mock the size you want.",
      "List: compute, battery, display, keyboard.",
      "Price each line in Pullerup.",
      "Build only after the budget is real numbers."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "cyberdeck"
  },
  {
    "id": "breath-detector",
    "name": "Breath Detector",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "technologybrief",
    "url": "https://www.instagram.com/p/De0mk9Fjm2A/",
    "thumb": "thumbs/breath-detector.svg",
    "building": "mmWave / radar-style breakout that senses breathing/motion without touch. Buy a known module; plot Serial motion flags.",
    "learn": "Radar-style sensors that sense motion through air.",
    "cost": "mmWave module — check price",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Elegoo Uno/Mega",
        "have": true
      },
      {
        "n": "mmWave / RCWL / similar module",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Jumpers",
        "have": true
      }
    ],
    "steps": [
      "Price a beginner mmWave or microwave motion module.",
      "Wire per that module’s datasheet (don’t guess pins).",
      "Print motion/breath proxies on Serial.",
      "Privacy: only in your space."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "breath-detector"
  },
  {
    "id": "mystery-make-it",
    "name": "Mystery Make-It",
    "level": 3,
    "levelName": "Builder",
    "category": "electronics",
    "tags": [
      "electronics"
    ],
    "featured": false,
    "ready": false,
    "handle": "slowtronics",
    "url": "https://www.instagram.com/p/De6kbbVx629/",
    "thumb": "thumbs/mystery-make-it.svg",
    "building": "Reverse-engineer challenge: pick any small dead gadget you own, open it (with permission), draw the block diagram, and rebuild one blinky function on your Uno.",
    "learn": "Follow along and reverse-engineer a cool gadget.",
    "cost": "$0 if you own a donor gadget",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Donor gadget you own",
        "have": true
      },
      {
        "n": "Elegoo + LED",
        "have": true
      },
      {
        "n": "Screwdrivers",
        "have": true
      }
    ],
    "steps": [
      "Open the gadget carefully.",
      "Sketch power → brain → output.",
      "Rebuild the output (LED/buzzer) on Uno.",
      "Recycle the donor parts responsibly."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "mystery-make-it"
  },
  {
    "id": "laundry-bot",
    "name": "Laundry Bot",
    "level": 4,
    "levelName": "Boss",
    "category": "robotics/3D printing",
    "tags": [
      "robotics",
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "avinash_decoded",
    "url": "https://www.instagram.com/p/DenbUWDoDa-/",
    "thumb": "thumbs/laundry-bot.svg",
    "building": "Full laundry-folding robot is a huge multi-servo printed project. Milestone 1: print a simple gripper and close it with your kit servo.",
    "learn": "Full robot design broken into milestones.",
    "cost": "Printer + many servos — check",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Servo + Uno (gripper milestone)",
        "have": true
      },
      {
        "n": "Printed gripper STL",
        "have": false,
        "price": "needs printer"
      },
      {
        "n": "Many more servos / structure",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Download a simple servo gripper STL.",
      "Print when you have a printer.",
      "Wire servo sweep to open/close.",
      "Only then plan the folding table — price everything first."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "laundry-bot"
  },
  {
    "id": "cinewhoop",
    "name": "Cinewhoop Build",
    "level": 4,
    "levelName": "Boss",
    "category": "drones",
    "tags": [
      "drones"
    ],
    "featured": false,
    "ready": false,
    "handle": "quad_kart",
    "url": "https://www.instagram.com/p/Db-xx6yJhVS/",
    "thumb": "thumbs/cinewhoop.svg",
    "building": "Cinema-style ducted FPV whoop (e.g. CineLog-class). This is a full drone buy — use Pullerup drone lists; don’t freestyle voltages.",
    "learn": "Cinema-style FPV drone assembly and tuning.",
    "cost": "Full drone kit — check Pullerup",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Ducted whoop frame + motors + FC + VTX + battery + radio",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Soldering iron",
        "have": true
      }
    ],
    "steps": [
      "Open Pullerup drone / cinewhoop parts.",
      "Verify battery cell count vs ESC.",
      "Solder with the First Clean Joints habits.",
      "Bind RX; maiden in a safe open area / net."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "cinewhoop"
  },
  {
    "id": "tiny-whoop",
    "name": "Tiny Whoop Nano45",
    "level": 4,
    "levelName": "Boss",
    "category": "drones",
    "tags": [
      "drones",
      "3d"
    ],
    "featured": false,
    "ready": false,
    "handle": "multibuild3d",
    "url": "https://www.instagram.com/p/DYackIwhNA1/",
    "thumb": "thumbs/tiny-whoop.svg",
    "building": "Micro FPV whoop (Nano45-class) with tiny motors and VTX. Same rule: priced parts list before solder.",
    "learn": "Micro FPV frames, video tx, and tiny motors.",
    "cost": "Micro drone parts — check Pullerup",
    "costKind": "check",
    "costDetail": "",
    "parts": [
      {
        "n": "Whoop frame, motors, FC, VTX, battery, radio",
        "have": false,
        "price": "check in Pullerup"
      },
      {
        "n": "Fine-tip iron + magnification",
        "have": true,
        "note": "iron you have; mag optional"
      }
    ],
    "steps": [
      "Get a real BOM with prices from Pullerup.",
      "Practice soldering on scrap first.",
      "Assemble center-out.",
      "Hover-test indoors in a whoop net if you can."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "tiny-whoop"
  },
  {
    "id": "corexy-watch",
    "name": "CoreXY Watch",
    "level": 4,
    "levelName": "Boss",
    "category": "3D printing",
    "tags": [
      "3d",
      "engineering"
    ],
    "featured": false,
    "ready": false,
    "handle": "rc_geeker",
    "url": "https://www.instagram.com/p/DdkM6azoKN8/",
    "thumb": "thumbs/corexy-watch.svg",
    "building": "Learn CoreXY motion: watch diagrams of two belts moving a gantry. Cardboard demo: two strings as “belts” move a pen holder on a cardboard square.",
    "learn": "How a high-speed CoreXY printer moves.",
    "cost": "$0",
    "costKind": "study",
    "costDetail": "",
    "parts": [
      {
        "n": "Cardboard + string + pen",
        "have": true
      },
      {
        "n": "Real CoreXY printer later",
        "have": false,
        "price": "check in Pullerup"
      }
    ],
    "steps": [
      "Cut a square “bed”.",
      "Route two strings like CoreXY belts.",
      "Pull combos: note pure X vs pure Y vs diagonal.",
      "When shopping printers, you’ll recognize CoreXY claims."
    ],
    "guide": null,
    "partsUrl": null,
    "linkId": "corexy-watch"
  }
];
