/* Inject shared hub nav. Set data-hub="shop|food|tobuild|fux" on <html> or <body>. */
(function () {
  function rootFromScript() {
    const s = document.currentScript && document.currentScript.src;
    if (!s) return ".";
    return s.replace(/\/shared\/hub\.js(\?.*)?$/, "") || ".";
  }
  const ROOT = rootFromScript();
  const page =
    (document.documentElement.getAttribute("data-hub") ||
      document.body.getAttribute("data-hub") ||
      "").toLowerCase();

  const LINKS = [
    { id: "shop", label: "Shop", href: ROOT + "/" },
    { id: "food", label: "Food", href: ROOT + "/food/" },
    { id: "tobuild", label: "To Build", href: ROOT + "/tobuild/" },
    { id: "fux", label: "FUX Guides", href: ROOT + "/fux/" },
  ];

  function paint() {
    if (document.querySelector(".hub-bar")) return;
    document.body.classList.add("hubbed");
    const bar = document.createElement("div");
    bar.className = "hub-bar";
    bar.setAttribute("role", "navigation");
    bar.setAttribute("aria-label", "Pullerup hub");
    const nav = LINKS.map(function (L) {
      const cls = L.id === page ? ' class="on"' : "";
      return '<a' + cls + ' href="' + L.href + '">' + L.label + "</a>";
    }).join("");
    bar.innerHTML =
      '<div class="hub-inner">' +
      '<a class="hub-mark" href="' + ROOT + '/">PULLER<span>UP</span></a>' +
      '<nav class="hub-nav">' + nav + "</nav></div>";
    document.body.insertBefore(bar, document.body.firstChild);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", paint);
  } else {
    paint();
  }
})();
