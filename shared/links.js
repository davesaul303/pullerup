/* Cross-links between To Build projects, FUX guides, and Pullerup parts views.
   Only real pages — never invent a guide or a priced parts list. */
(function (w) {
  const ROOT = (function () {
    const s = document.currentScript && document.currentScript.src;
    if (!s) return "..";
    return s.replace(/\/shared\/links\.js(\?.*)?$/, "") || ".";
  })();

  /** @type {Record<string,{title:string,fux?:string,parts?:string,tobuild?:string}>} */
  const REGISTRY = {
    "door-alarm-shield": {
      title: "Door Alarm Shield",
      fux: ROOT + "/fux/guide.html?g=door-alarm-shield",
      parts: ROOT + "/parts/door-alarm-shield.html",
      tobuild: ROOT + "/tobuild/#door-alarm-shield",
    },
    "usb-led": {
      title: "USB LED Lamp",
      fux: ROOT + "/fux/guide.html?g=usb-led",
      parts: ROOT + "/parts/usb-led.html",
      tobuild: ROOT + "/tobuild/#usb-led",
    },
    "soldering-tips": {
      title: "First Clean Joints",
      fux: ROOT + "/fux/guide.html?g=soldering-tips",
      parts: ROOT + "/parts/soldering-tips.html",
      tobuild: ROOT + "/tobuild/#soldering-tips",
    },
    "heat-shrink": {
      title: "Heat-Shrink Wire Joins",
      fux: ROOT + "/fux/guide.html?g=heat-shrink",
      parts: ROOT + "/parts/heat-shrink.html",
      tobuild: ROOT + "/tobuild/#heat-shrink",
    },
    "sensor-school": {
      title: "Sensor Safari",
      fux: ROOT + "/fux/guide.html?g=sensor-school",
      parts: ROOT + "/parts/sensor-school.html",
      tobuild: ROOT + "/tobuild/#sensor-school",
    },
    "circuit-sandbox": {
      title: "First Breadboard Circuit",
      fux: ROOT + "/fux/guide.html?g=circuit-sandbox",
      parts: ROOT + "/parts/circuit-sandbox.html",
      tobuild: ROOT + "/tobuild/#circuit-sandbox",
    },
  };

  function linkFor(id) {
    return REGISTRY[id] || null;
  }
  function hasGuide(id) {
    const L = REGISTRY[id];
    return !!(L && L.fux);
  }
  function hasParts(id) {
    const L = REGISTRY[id];
    return !!(L && L.parts);
  }

  w.PULLERUP_LINKS = { ROOT, REGISTRY, linkFor, hasGuide, hasParts };
})(window);
