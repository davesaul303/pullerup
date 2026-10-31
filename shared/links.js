/* Cross-links between To Build projects, FUX guides, and Pullerup parts views.
   Only real pages — never invent a guide or a priced parts list. */
(function (w) {
  const ROOT = (function () {
    // Resolve site root from this script's path (.../shared/links.js → ..)
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
