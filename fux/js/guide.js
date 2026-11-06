(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function storageKey(id){ return 'fux-progress:' + id; }
  function stepIndexKey(id){ return 'fux-step:' + id; }
  function viewModeKey(id){ return 'fux-view3:' + id; }
  function loadProgress(id){
    try{ return JSON.parse(localStorage.getItem(storageKey(id))||'{}')||{}; }catch(e){ return {}; }
  }
  function saveProgress(id, map){ localStorage.setItem(storageKey(id), JSON.stringify(map)); }
  function loadStepIndex(id){
    const n = parseInt(localStorage.getItem(stepIndexKey(id))||'0', 10);
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }
  function saveStepIndex(id, i){ localStorage.setItem(stepIndexKey(id), String(i)); }
  function loadViewMode(id){
    const v = localStorage.getItem(viewModeKey(id));
    return (v === 'list' || v === 'one') ? v : 'one';
  }
  function saveViewMode(id, mode){ localStorage.setItem(viewModeKey(id), mode === 'list' ? 'list' : 'one'); }

  function diagramHtml(guide, key){
    if(!key || !guide.diagrams || !guide.diagrams[key]) return '';
    return `<div class="diagram" data-diagram="${esc(key)}">${guide.diagrams[key]}`+
      `<div class="tip-hint">Double right-click a part · phone: double-tap or hold · tap empty area to enlarge</div></div>`;
  }

  function tableHtml(rows){
    if(!rows || !rows.length) return '';
    const head = rows[0], body = rows.slice(1);
    return `<table class="hole-table"><thead><tr>${head.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>`+
      body.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')+`</tbody></table>`;
  }

  function flattenSteps(guide){
    const list = [];
    (guide.sections||[]).forEach(sec => {
      (sec.steps||[]).forEach((st, localIdx) => {
        list.push({
          sec,
          st,
          localIdx,
          check: st.check || (sec.id + '-' + localIdx)
        });
      });
    });
    return list;
  }


  /* ---- Blueprint-structure helpers (derived only from guide text) ---- */
  const TOOLKW = [
    [/solder/i, /solder|\btin\b|iron|joint/i, 't-red'],
    [/cutter|snip/i, /\bcut|trim|snip|clip the/i, 't-warn'],
    [/multimeter|meter/i, /multimeter|continuity|measure|meter/i, 't-ok'],
    [/arduino ide|computer|laptop/i, /upload|\bide\b|library|sketch|serial monitor|install|code/i, 't-lime'],
    [/glasses/i, /glasses|goggles/i, 't-mu'],
    [/heat gun|lighter/i, /heat gun|lighter|shrink it|heat the/i, 't-red'],
    [/strip/i, /strip/i, 't-warn'],
    [/helping hand|clamp|vise/i, /helping hand|clamp|vise/i, 't-mu']
  ];
  const PARTKW = [
    [/neopixel|\bring\b/i, /\bring\b|neopixel|pixel/i, 'LED'],
    [/resistor/i, /resistor|ω|ohm/i, 'Passive'],
    [/capacitor/i, /capacitor|µf|uf\b|cap\b/i, 'Passive'],
    [/breadboard/i, /breadboard|jumper/i, 'Proto'],
    [/proto shield|shield/i, /shield/i, 'Proto'],
    [/usb cable/i, /\busb\b/i, 'Power'],
    [/elegoo|uno/i, /\buno\b|elegoo/i, 'MCU'],
    [/buzzer|piezo/i, /buzzer|piezo/i, 'Audio'],
    [/ultrasonic|hc-sr04|sensor/i, /sensor|hc-sr04|ultrasonic|echo|trig/i, 'Sensor'],
    [/servo/i, /servo/i, 'Motion'],
    [/joystick/i, /joystick/i, 'Input'],
    [/button/i, /button/i, 'Input'],
    [/\bled\b/i, /\bled\b/i, 'LED'],
    [/heat.?shrink/i, /shrink/i, 'Misc'],
    [/wire/i, /\bwire\b/i, 'Wire']
  ];
  function stepText(st){ return [st.title,st.action,st.why,st.detail,st.warn,st.from,st.to].filter(Boolean).join(' '); }
  function chipText(st){ return [st.title,st.action,st.warn,st.from,st.to].filter(Boolean).join(' '); }
  function detailHtml(st){
    const raw = String(st.detail||'').trim();
    if(!raw) return '';
    const lines = raw.split(/\n+/).map(x=>x.trim()).filter(Boolean);
    const numbered = lines.every(l => /^\d+[.)]\s+/.test(l));
    if(numbered){
      return `<ol class="bp-steps-ol">` + lines.map(l => `<li>${esc(l.replace(/^\d+[.)]\s+/, ''))}</li>`).join('') + `</ol>`;
    }
    return `<div class="bp-steps-p">` + lines.map(l => `<p>${esc(l)}</p>`).join('') + `</div>`;
  }
  function shortTitle(st){ return st.title || st.action || 'Do this step'; }

  function stepTools(guide, st){
    const t = chipText(st), out = [];
    (guide.tools||[]).forEach(tool => {
      const k = TOOLKW.find(r => r[0].test(tool));
      if(k && k[1].test(t)) out.push([tool, k[2]]);
    });
    return out;
  }
  function stepParts(guide, st){
    const t = chipText(st), out = [];
    (guide.parts||[]).forEach(part => {
      if(/soldering iron/i.test(part)) return;
      const k = PARTKW.find(r => r[0].test(part));
      if(k && k[1].test(t) && out.length < 3) out.push([part, k[2]]);
    });
    return out;
  }
  function phaseName(t){ return String(t||'').replace(/^(part\s*)?\d+[a-z]?\s*[.:]\s*/i,''); }
  function phaseIcon(t){ t=t.toLowerCase(); return /solder/.test(t)?'♨':/breadboard|wire|wiring|circuit/.test(t)?'⌁':/install|upload|library|code|sketch/.test(t)?'⌨':/test|check|tune|compare/.test(t)?'✓':/meet|what|why|start|glossary|safety/.test(t)?'◎':'▣'; }
  function shortName(p){ return String(p).replace(/\s*\(.*?\)\s*/g,' ').replace(/^\d+\s*[×x]\s*/,'').trim(); }

  function renderTopProgress(guide, map, flat){
    const checks = flat.map(f => f.check);
    (guide.parts||[]).forEach((_,i) => checks.push('part-'+i));
    (guide.tools||[]).forEach((_,i) => checks.push('tool-'+i));
    const done = checks.filter(c => map[c]).length;
    const pct = checks.length ? Math.round(done*100/checks.length) : 0;
    if($('bar')) $('bar').style.width = pct + '%';
    if($('pct')) $('pct').textContent = pct + '% · ' + done + '/' + checks.length;
    if(window.__bpUpd) window.__bpUpd(map);
  }

  /* ---- Lightbox ---- */
  function ensureLightbox(){
    let lb = document.getElementById('fux-lb');
    if(lb) return lb;
    lb = document.createElement('div');
    lb.id = 'fux-lb';
    lb.className = 'lightbox';
    lb.innerHTML = '<button type="button" class="lb-x" aria-label="Close">CLOSE</button><div class="lb-inner"></div>';
    document.body.appendChild(lb);
    const close = () => lb.classList.remove('on');
    lb.querySelector('.lb-x').onclick = close;
    lb.addEventListener('click', e => { if(e.target===lb) close(); });
    document.addEventListener('keydown', e => { if(e.key==='Escape') close(); });
    return lb;
  }
  function openLightbox(diagramEl){
    const lb = ensureLightbox();
    const inner = lb.querySelector('.lb-inner');
    const svg = diagramEl.querySelector('svg');
    if(!svg) return;
    inner.innerHTML = svg.outerHTML;
    lb.classList.add('on');
    bindFarowtTargets(inner, window.FUX_GUIDE && window.FUX_GUIDE.tips);
  }
  function bindLightbox(root){
    root.querySelectorAll('.diagram').forEach(d => {
      d.addEventListener('click', e => {
        if(e.target.closest('.fux-tip')) return;
        openLightbox(d);
      });
    });
  }

  /* ---- Farowt (cartoon resistor helper) ---- */
  const IDLE_ANIMS = ['a-blink','a-wiggle','a-bounce','a-wave','a-glow','a-think','a-dance','a-sizzle'];
  const TALK_ANIMS = ['a-zap','a-wave','a-glow','a-think','a-bounce'];
  let idleTimer = null;
  let farowtTips = {};

  function farowtSvg(){
    return `<svg id="farowt-svg" viewBox="0 0 120 100" aria-label="Farowt the resistor helper" role="img">
      <defs>
        <linearGradient id="fb" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stop-color="#e8d9b0"/><stop offset=".5" stop-color="#c2b280"/><stop offset="1" stop-color="#9a8a5a"/>
        </linearGradient>
        <radialGradient id="eye" cx="35%" cy="35%" r="65%">
          <stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#dfe8d8"/>
        </radialGradient>
      </defs>
      <ellipse cx="60" cy="90" rx="28" ry="4" fill="#000" opacity=".25"/>
      <g class="body">
        <g class="legL" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M48 72 L42 88"/><path d="M42 88 L36 88"/>
        </g>
        <g class="legR" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M72 72 L78 88"/><path d="M78 88 L84 88"/>
        </g>
        <g class="armL" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M28 48 L14 40"/><path d="M14 40 L8 46"/>
        </g>
        <g class="armR" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M92 48 L106 38"/><path d="M106 38 L112 32"/>
        </g>
        <path d="M20 55 H32" stroke="#9e9e9e" stroke-width="4" stroke-linecap="round"/>
        <path d="M100 55 H88" stroke="#9e9e9e" stroke-width="4" stroke-linecap="round"/>
        <rect x="32" y="38" width="56" height="34" rx="10" fill="url(#fb)" stroke="#6d5c3a" stroke-width="1.5"/>
        <ellipse cx="42" cy="48" rx="8" ry="4" fill="#fff" opacity=".25"/>
        <rect class="band" x="44" y="38" width="6" height="34" fill="#c62828"/>
        <rect class="band" x="54" y="38" width="6" height="34" fill="#c62828"/>
        <rect class="band" x="64" y="38" width="6" height="34" fill="#5d4037"/>
        <rect class="band" x="74" y="38" width="5" height="34" fill="#f9a825"/>
        <g class="eye">
          <circle cx="48" cy="52" r="7" fill="url(#eye)" stroke="#333"/>
          <circle cx="50" cy="53" r="3" fill="#111"/>
          <circle cx="51.5" cy="51.5" r="1.1" fill="#fff"/>
          <rect class="lid" x="41" y="45" width="14" height="14" fill="url(#fb)" opacity="0"/>
        </g>
        <g class="eye">
          <circle cx="68" cy="52" r="7" fill="url(#eye)" stroke="#333"/>
          <circle cx="70" cy="53" r="3" fill="#111"/>
          <circle cx="71.5" cy="51.5" r="1.1" fill="#fff"/>
          <rect class="lid" x="61" y="45" width="14" height="14" fill="url(#fb)" opacity="0"/>
        </g>
        <path d="M52 64 Q60 70 68 64" fill="none" stroke="#5d4037" stroke-width="2" stroke-linecap="round"/>
        <g class="zap" stroke="#b8ff3c" stroke-width="2" fill="none" stroke-linecap="round">
          <path d="M96 28 L102 20 L98 20 L106 10"/>
          <path d="M18 30 L12 22"/>
          <circle cx="108" cy="12" r="2" fill="#b8ff3c"/>
        </g>
      </g>
    </svg>`;
  }

  function ensureFarowt(){
    let el = document.getElementById('farowt');
    if(el) return el;
    el = document.createElement('div');
    el.id = 'farowt';
    el.setAttribute('aria-live','polite');
    el.innerHTML = `<div class="bubble"><div class="tn" id="fw-tn"></div><p class="td" id="fw-td"></p><p class="tj" id="fw-tj"></p></div>
      <div class="row"><button type="button" class="x" id="fw-x">CLOSE</button><div><div class="who">Farowt</div>${farowtSvg()}</div></div>`;
    document.body.appendChild(el);
    $('fw-x').onclick = hideFarowt;
    el.querySelector('#farowt-svg').addEventListener('click', () => playAnim(pick(IDLE_ANIMS)));
    return el;
  }

  function clearAnimClasses(el){
    [...el.classList].forEach(c => { if(c.startsWith('a-')) el.classList.remove(c); });
  }
  function pick(arr){ return arr[Math.floor(Math.random()*arr.length)]; }
  function playAnim(name){
    if(reduceMotion()) return;
    const el = ensureFarowt();
    clearAnimClasses(el);
    void el.offsetWidth;
    el.classList.add(name);
  }
  function scheduleIdle(){
    clearTimeout(idleTimer);
    if(reduceMotion()) return;
    idleTimer = setTimeout(() => {
      const el = document.getElementById('farowt');
      if(el && el.classList.contains('on')){
        playAnim(Math.random() < .25 ? 'a-sizzle' : pick(IDLE_ANIMS));
        scheduleIdle();
      }
    }, 2800 + Math.random()*3200);
  }

  function showFarowt(tips, id){
    const t = tips && tips[id];
    if(!t) return;
    farowtTips = tips;
    const el = ensureFarowt();
    $('fw-tn').textContent = t.name || id;
    $('fw-td').textContent = t.does || '';
    $('fw-tj').innerHTML = `<b>IN THIS BUILD</b> — ${esc(t.job||'')}`;
    el.classList.add('on');
    clearAnimClasses(el);
    if(!reduceMotion()){
      void el.offsetWidth;
      el.classList.add('a-in');
      setTimeout(() => playAnim(pick(TALK_ANIMS)), 500);
    }
    scheduleIdle();
  }
  function hideFarowt(){
    const el = document.getElementById('farowt');
    if(!el) return;
    el.classList.remove('on');
    clearAnimClasses(el);
    clearTimeout(idleTimer);
  }

  function bindFarowtTargets(root, tips){
    if(!tips) return;
    root.querySelectorAll('.fux-tip[data-tip]').forEach(el => {
      if(el._fuxFarowt) return;
      el._fuxFarowt = true;
      let lastTap = 0, holdTimer = null, held = false;
      el.addEventListener('contextmenu', e => { e.preventDefault(); e.stopPropagation(); });
      el.addEventListener('mousedown', e => {
        if(e.button !== 2) return;
        e.preventDefault();
        if(e.detail >= 2) showFarowt(tips, el.getAttribute('data-tip'));
      });
      el.addEventListener('pointerdown', e => {
        if(e.pointerType === 'mouse' && e.button === 2) return;
        held = false;
        clearTimeout(holdTimer);
        holdTimer = setTimeout(() => {
          held = true;
          showFarowt(tips, el.getAttribute('data-tip'));
        }, 1000);
      });
      el.addEventListener('pointerup', e => {
        clearTimeout(holdTimer);
        if(e.pointerType === 'mouse' && e.button === 2) return;
        if(held){ e.preventDefault(); e.stopPropagation(); return; }
        const now = Date.now();
        if(now - lastTap < 350){
          showFarowt(tips, el.getAttribute('data-tip'));
          lastTap = 0;
          e.preventDefault();
          e.stopPropagation();
        } else lastTap = now;
      });
      el.addEventListener('pointercancel', () => clearTimeout(holdTimer));
      el.addEventListener('click', e => { e.stopPropagation(); });
    });
  }

  function showMissing(id){
    $('gtitle').textContent = 'No guide yet';
    $('gsum').textContent = '';
    $('chips').innerHTML = '';
    $('toc').innerHTML = '';
    $('body').innerHTML = `<div class="empty"><b>No guide yet</b>
      <p>No guide for “${esc(id)}”. Send it to Kaserin.</p>
      <button class="btn primary" type="button" id="askk">Send to Kaserin</button>
      <a class="btn" href="index.html" style="margin-left:8px">Back to FUX</a></div>`;
    const btn = $('askk');
    if(btn) btn.onclick = () => {
      const txt = `FUX request: research and write a step-by-step build guide for: ${id}`;
      const done = () => { btn.textContent = 'Copied. Paste it to Kaserin.'; };
      (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(done, () => {
        const t=document.createElement('textarea'); t.value=txt; document.body.appendChild(t); t.select();
        try{document.execCommand('copy');}catch(e){} t.remove(); done();
      });
    };
  }

  function sectionExtrasHtml(guide, sec){
    let html = '';
    if(sec.callout){
      const tone = sec.callout.tone ? ' '+sec.callout.tone : '';
      html += `<div class="callout${tone}"><div class="lead">${esc(sec.callout.lead||'')}</div><p>${esc(sec.callout.text||'')}</p></div>`;
    }
    if(sec.diagram) html += diagramHtml(guide, sec.diagram);
    if(sec.showParts && guide.parts){
      html += `<div class="extras-block"><div class="extras-title">Parts checklist</div><ul class="parts-list">` +
        guide.parts.map((p,i) =>
          `<li><label><input type="checkbox" data-check="part-${i}"><span>${esc(p)}</span></label></li>`
        ).join('') + `</ul></div>`;
    }
    if(sec.showTools && guide.tools){
      html += `<div class="extras-block"><div class="extras-title">Tools</div><ul class="parts-list">` +
        guide.tools.map((p,i) =>
          `<li><label><input type="checkbox" data-check="tool-${i}"><span>${esc(p)}</span></label></li>`
        ).join('') + `</ul></div>`;
    }
    if(sec.showSpecs && guide.specs){
      html += `<div class="props">` + guide.specs.map(row =>
        `<div class="prop"><b>${esc(row[0])}</b><span>${esc(row[1])}</span></div>`
      ).join('') + `</div>`;
    }
    if(sec.troubleshooting){
      html += `<table class="table"><thead><tr><th>Problem</th><th>Try this</th></tr></thead><tbody>` +
        sec.troubleshooting.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('') +
        `</tbody></table>`;
    }
    if(sec.showCode && guide.code){
      html += `<div class="code-wrap"><pre><code>${esc(guide.code)}</code></pre></div>`;
    }
    return html;
  }

  function pinChips(st){
    const fr = st.from || '';
    const to = st.to || '';
    if(!fr && !to) return '';
    return `<div class="pin-row" aria-label="From to">
      <span class="pin-chip from">${esc(fr || '—')}</span>
      <span class="pin-arrow" aria-hidden="true">→</span>
      <span class="pin-chip to">${esc(to || '—')}</span>
    </div>`;
  }


  const SHOP = { 'arc-reactor': '../?v=20261106-bp#b-arcreactor' };
  function bpTabs(guide, flat){
    const body = $('body'), top = document.querySelector('.guide-top'), toc = $('toc');
    const walk = $('walk');
    const hasWiring = guide.diagrams && Object.keys(guide.diagrams).length;
    const ICO = {info:'☰',parts:'▦',wiring:'⌁',instructions:'☰'};
    const tabs = [['info','Info'],['parts','Parts']].concat(hasWiring?[['wiring','Wiring']]:[]).concat([['instructions','Instructions']]);
    const bar = document.createElement('nav'); bar.className = 'bp-tabs'; bar.setAttribute('role','tablist');
    bar.innerHTML = tabs.map(([k,v]) => `<button type="button" role="tab" data-tab="${k}"><i aria-hidden="true">${ICO[k]||'·'}</i><span>${v}</span></button>`).join('');
    top.parentNode.insertBefore(bar, body);
    const pane = k => { const d = document.createElement('section'); d.className = 'bp-pane'; d.dataset.pane = k; body.appendChild(d); return d; };
    const info = pane('info'), parts = pane('parts'), wiring = hasWiring ? pane('wiring') : null, ins = pane('instructions');
    // INFO
    if(guide.specs && guide.specs.length) info.insertAdjacentHTML('beforeend', `<div class="bp-card"><div class="bp-card-h">Specs</div><div class="props">${guide.specs.map(r=>`<div class="prop"><b>${esc(r[0])}</b><span>${esc(r[1])}</span></div>`).join('')}</div></div>`);
    [...body.children].forEach(el => { if(el.classList.contains('callout') || el.classList.contains('section')) info.appendChild(el); });
    // PARTS
    const shop = SHOP[guide.id] || guide.pullerup || '';
    const prow = (guide.parts||[]).map(p => {
      const m = String(p).match(/^(\d+)\s*[×x]\s*/); const q = m ? m[1] : '1';
      const k = PARTKW.find(r => r[0].test(p)); const cat = k ? k[2] : (/iron|solder|cable|usb/i.test(p)?'Tool':'Misc');
      const nm = String(p).replace(/^\d+\s*[×x]\s*/,''); const model = (nm.match(/\((.*?)\)/)||[])[1] || '';
      return `<div class="bp-prow"><span class="bp-pth" aria-hidden="true">▣</span><span class="bp-pn"><b>${esc(nm.replace(/\s*\(.*?\)\s*/g,' ').trim())}</b>${model?`<em>${esc(model)}</em>`:''}<i class="bp-cat">${esc(cat.toUpperCase())}</i></span><span class="n">${esc(q)}</span><span class="n mu">${shop?'Pullerup':'—'}</span></div>`;
    }).join('');
    parts.innerHTML = `<div class="bp-ptable"><div class="bp-phd"><span>Part</span><span class="n">Qty</span><span class="n">Price</span></div>${prow}</div>
      <div class="bp-pfoot"><span>Total estimated cost<small>${(guide.parts||[]).length} parts · live prices on Pullerup</small></span>${shop?`<a href="${esc(shop)}">Price on Pullerup ↗</a>`:'<b>—</b>'}</div>`;
    // WIRING
    if(wiring){ wiring.innerHTML = Object.keys(guide.diagrams).map(k => diagramHtml(guide, k)).join(''); bindLightbox(wiring); bindFarowtTargets(wiring, guide.tips || {}); }
    // INSTRUCTIONS: Blueprint strip + Tools & Assumptions + walk (phase list default)
    const assumptions = String(guide.beforeYouStart||'').split(/(?<=[.!?])\s+/).map(x=>x.trim()).filter(Boolean);
    ins.insertAdjacentHTML('beforeend', `<div class="bp-strip"><b>Instructions</b><span id="bp-done">0/${flat.length} done</span></div>
      <div class="bp-card bp-ta"><div class="bp-card-h">⚒ Tools &amp; Assumptions</div><div class="bp-ta-cols">
        <div><div class="bp-sub">Tools</div><ul>${(guide.tools||[]).map(t=>{const k=TOOLKW.find(r=>r[0].test(t));return `<li><i class="bp-dot ${k?k[2]:'t-mu'}"></i>${esc(t)}</li>`;}).join('') || '<li>—</li>'}</ul></div>
        <div><div class="bp-sub">Assumptions</div><ul class="dash">${assumptions.map(a=>`<li>${esc(a)}</li>`).join('') || '<li>—</li>'}</ul></div>
      </div></div>`);
    ins.appendChild(walk);
    window.__bpUpd = (map) => {
      const d = flat.filter(f => map[f.check]).length; const el = $('bp-done'); if(el) el.textContent = `${d}/${flat.length} done`;
      document.querySelectorAll('[data-phc]').forEach(c => { const id = c.dataset.phc; const ss = flat.filter(f => f.sec.id === id); c.textContent = ss.filter(f => map[f.check]).length + '/' + ss.length; });
    };
    window.__bpUpd(loadProgress(guide.id));
    const params = new URLSearchParams(location.search);
    function show(k){
      bar.querySelectorAll('[data-tab]').forEach(b => b.setAttribute('aria-selected', b.dataset.tab === k ? 'true' : 'false'));
      body.querySelectorAll('.bp-pane').forEach(p => p.hidden = p.dataset.pane !== k);
      const u = new URL(location.href); if(k === 'instructions') u.searchParams.delete('tab'); else u.searchParams.set('tab', k); history.replaceState(null, '', u);
    }
    bar.querySelectorAll('[data-tab]').forEach(b => b.onclick = () => show(b.dataset.tab));
    const want = (params.get('tab')||'').toLowerCase();
    show(tabs.some(t => t[0] === want) ? want : 'instructions');
  }

  function renderGuide(guide){
    document.title = 'FUX · ' + guide.title;
    $('gtitle').textContent = guide.title;
    $('gsum').textContent = guide.summary || '';
    $('chips').innerHTML = [
      `<span class="chip cat">${esc(guide.category||'')}</span>`,
      `<span class="chip diff">${esc(guide.difficulty||'')}</span>`,
      `<span class="chip time">${esc(guide.time||'')}</span>`,
      `<span class="chip parts">${esc(String(guide.partsCount||0))} parts</span>`
    ].join('');

    const pull = $('pullerup');
    if(guide.pullerup){ pull.href = guide.pullerup; pull.style.display = ''; pull.textContent = 'Price parts on Pullerup'; }
    else pull.style.display = 'none';

    const flat = flattenSteps(guide);
    const total = flat.length || 1;
    const params = new URLSearchParams(location.search);
    const stepParam = parseInt(params.get('step') || '', 10);
    let idx = Number.isFinite(stepParam) && stepParam >= 1
      ? Math.min(Math.max(stepParam - 1, 0), total - 1)
      : Math.min(loadStepIndex(guide.id), total - 1);

    // Top TOC hidden in simple Instructions; full list has its own jump links
    $('toc').innerHTML = '';

    let html = '';
    if(guide.beforeYouStart){
      html += `<div class="callout"><div class="lead">Before you start</div><p>${esc(guide.beforeYouStart)}</p></div>`;
    }

    // Code-only section (no steps) still reachable
    (guide.sections||[]).forEach(sec => {
      if((sec.steps||[]).length) return;
      if(sec.showCode || sec.showSpecs || sec.troubleshooting){
        html += `<section class="section" id="${esc(sec.id)}"><h2>${esc(sec.title)}</h2>${sectionExtrasHtml(guide, sec)}</section>`;
      }
    });

    html += `<div id="walk" class="walk walk-bp">
      <div class="simple-bar bp-modebar">
        <button type="button" class="simple-list-link" id="view-one">Focus one step</button>
        <button type="button" class="simple-list-link" id="view-list" hidden>← Back to full guide</button>
        <span class="vt-list-actions" id="list-actions">
          <button type="button" class="vt-mini" id="expand-all">Expand all</button>
          <button type="button" class="vt-mini" id="collapse-all">Collapse all</button>
        </span>
      </div>
      <div id="view-list-pane" class="list-pane"></div>
      <div id="view-one-pane" hidden>
        <div class="step-card" id="step-card"></div>
      </div>
    </div>`;

    $('body').innerHTML = html;

    const card = $('step-card');
    const rail = null;
    const onePane = $('view-one-pane');
    const listPane = $('view-list-pane');
    const listActions = $('list-actions');
    const viewParam = (params.get('view') || '').toLowerCase();
    let mode = (viewParam === 'list' || viewParam === 'one') ? viewParam : loadViewMode(guide.id);
    if(viewParam === 'list' || viewParam === 'one') saveViewMode(guide.id, mode);

    function setToggleUI(){
      const oneBtn = $('view-one');
      const listBtn = $('view-list');
      if(!oneBtn || !listBtn) return;
      listBtn.hidden = mode !== 'one';
      oneBtn.hidden = mode !== 'list';
      if(onePane) onePane.hidden = mode !== 'one';
      if(listPane) listPane.hidden = mode !== 'list';
      if(listActions) listActions.hidden = mode !== 'list';
    }

    function bindDoneInput(inp, checkKey, rowEl){
      if(!inp) return;
      inp.addEventListener('change', e => {
        e.stopPropagation();
        const m = loadProgress(guide.id);
        if(inp.checked) m[checkKey] = true; else delete m[checkKey];
        saveProgress(guide.id, m);
        if(rowEl) rowEl.classList.toggle('is-done', inp.checked);
        renderTopProgress(guide, m, flat);
        if(mode === 'one') paintRailOnly(m);
      });
      // clicking label shouldn't toggle the accordion
      inp.addEventListener('click', e => e.stopPropagation());
    }

    function bindExtraChecks(root, map){
      root.querySelectorAll('input[data-check]').forEach(el => {
        if(el.closest('.sc-done') || el.closest('.lr-done')) return;
        const key = el.getAttribute('data-check');
        el.checked = !!map[key];
        el.addEventListener('change', () => {
          const m = loadProgress(guide.id);
          if(el.checked) m[key] = true; else delete m[key];
          saveProgress(guide.id, m);
          renderTopProgress(guide, m, flat);
          const li = el.closest('li');
          if(li){ const span = li.querySelector('span'); if(span) span.classList.toggle('gone', el.checked); }
        });
        const li = el.closest('li');
        if(li){ const span = li.querySelector('span'); if(span) span.classList.toggle('gone', el.checked); }
      });
    }

    function paintOne(){
      const map = loadProgress(guide.id);
      renderTopProgress(guide, map, flat);
      if(!flat.length){
        card.innerHTML = `<div class="step-empty">No steps in this guide yet.</div>`;
        return;
      }
      idx = Math.max(0, Math.min(idx, flat.length - 1));
      saveStepIndex(guide.id, idx);
      const cur = flat[idx];
      const st = cur.st;
      const n = idx + 1;
      const pct = Math.round((n / flat.length) * 100);
      const done = !!map[cur.check];
      const title = st.title || st.action || 'Do this step';
      const body = (st.action && st.title && st.action !== st.title) ? st.action : '';
      const why = st.why || '';

      card.className = 'step-card step-simple' + (done ? ' is-done' : '');
      card.innerHTML = `
        <div class="sc-head">
          <div class="sc-num" aria-hidden="true">${n}</div>
          <div class="sc-meta">
            <div class="sc-progress-label">Step <b>${n}</b> of <b>${flat.length}</b></div>
            <div class="sc-bar" role="progressbar" aria-valuenow="${pct}" aria-valuemin="0" aria-valuemax="100"><i style="width:${pct}%"></i></div>
          </div>
        </div>
        <h2 class="sc-action">${esc(title)}</h2>
        ${body ? `<p class="sc-body">${esc(body)}</p>` : ''}
        ${detailHtml(st)}
        ${pinChips(st)}
        ${st.warn ? `<div class="warn-inline"><b>Watch out</b>${esc(st.warn)}</div>` : ''}
        ${st.diagram ? diagramHtml(guide, st.diagram) : ''}
        ${st.table ? tableHtml(st.table) : ''}
        ${why ? `<p class="sc-body sc-more">${esc(why)}</p>` : ''}
        <label class="sc-done">
          <input type="checkbox" data-check="${esc(cur.check)}" ${done?'checked':''}>
          <span class="box" aria-hidden="true"></span>
          <span class="txt">Done ✓</span>
        </label>
        <div class="sc-nav">
          <button type="button" class="nav-btn back" id="nav-back" ${idx===0?'disabled':''}>← Back</button>
          <button type="button" class="nav-btn next" id="nav-next">${idx>=flat.length-1?'Finish':'Next →'}</button>
        </div>
      `;

      const inp = card.querySelector('.sc-done input[data-check]');
      bindDoneInput(inp, cur.check, card);

      const back = $('nav-back');
      const next = $('nav-next');
      if(back) back.onclick = () => { if(idx>0){ idx--; paintOne(); scrollWalk(); } };
      if(next) next.onclick = () => {
        if(idx < flat.length - 1){ idx++; paintOne(); scrollWalk(); }
        else {
          const codeSec = document.getElementById('code');
          if(codeSec) codeSec.scrollIntoView({behavior:'smooth', block:'start'});
        }
      };

      bindLightbox(card);
      bindFarowtTargets(card, guide.tips || {});
    }

    function paintRailOnly(){ /* jump rail removed from simple one-step view */ }

    function paintList(){
      const map = loadProgress(guide.id);
      renderTopProgress(guide, map, flat);
      if(!flat.length){
        listPane.innerHTML = `<div class="step-empty">No steps in this guide yet.</div>`;
        return;
      }
      let html = '';
      let lastSec = null, phaseNo = 0, stepNo = 0;
      flat.forEach((cur, i) => {
        const st = cur.st;
        const sec = cur.sec;
        const done = !!map[cur.check];
        const title = shortTitle(st);
        const blurb = (st.action && st.title && st.action !== st.title) ? st.action : '';
        const why = st.why || '';
        if(sec.id !== lastSec){
          if(lastSec !== null) html += `</div>`;
          phaseNo++; stepNo = 0;
          const secSteps = flat.filter(f => f.sec.id === sec.id);
          const secDone = secSteps.filter(f => map[f.check]).length;
          const pct = secSteps.length ? Math.round(secDone*100/secSteps.length) : 0;
          html += `<div class="bp-phase" data-phase="${esc(sec.id)}"><div class="bp-ph-head" id="list-sec-${esc(sec.id)}">
            <span class="bp-ph-n">${phaseNo}.</span><span class="bp-ph-ic" aria-hidden="true">${phaseIcon(sec.title)}</span>
            <span class="bp-ph-t">${esc(phaseName(sec.title))}</span>
            <span class="bp-ph-c" data-phc="${esc(sec.id)}">${secDone}/${secSteps.length}</span>
            <span class="bp-ph-ring" aria-hidden="true" style="--p:${pct}"></span></div>`;
          if(cur.localIdx === 0){
            const extras = sectionExtrasHtml(guide, sec);
            if(extras) html += `<details class="bp-ph-notes"><summary>Phase notes ›</summary><div class="list-sec-extras">${extras}</div></details>`;
          }
          lastSec = sec.id;
        }
        stepNo++;
        const tools = stepTools(guide, st), parts = stepParts(guide, st);
        html += `<div class="list-row bp-step${done?' is-done':''}" data-step="${i}" id="list-step-${i}">
          <div class="bp-st-top">
            <span class="bp-st-n">${phaseNo}.${stepNo}</span>
            <label class="lr-done bp-circ" title="Done"><input type="checkbox" data-check="${esc(cur.check)}" ${done?'checked':''}><span class="box" aria-hidden="true"></span></label>
            <div class="bp-st-copy"><span class="lr-action">${esc(title)}</span>${blurb?`<span class="lr-blurb">${esc(blurb)}</span>`:''}</div>
          </div>
          ${tools.length ? `<div class="bp-tools-row">${tools.map(t=>`<span class="bp-tchip ${t[1]}">${esc(t[0].replace(/\s*[~(+].*$/,''))}</span>`).join('')}</div>` : ''}
          ${parts.length ? `<div class="bp-parts-row">${parts.map(p=>`<div class="bp-pcard"><span class="bp-pth" aria-hidden="true">▣</span><span><b>${esc(shortName(p[0]))}</b><em>${esc(p[1])}</em></span></div>`).join('')}</div>` : ''}
          <details class="bp-det"><summary>View details ›</summary><div class="lr-body">
            ${detailHtml(st)}
            ${pinChips(st)}
            ${st.warn ? `<div class="warn-inline"><b>Watch out</b>${esc(st.warn)}</div>` : ''}
            ${st.diagram ? diagramHtml(guide, st.diagram) : ''}
            ${st.table ? tableHtml(st.table) : ''}
            ${why ? `<div class="lr-why"><b>Why?</b><p>${esc(why)}</p></div>` : ''}
            <button type="button" class="lr-focus" data-focus="${i}">Focus this step</button>
          </div></details>
        </div>`;
      });
      if(lastSec !== null) html += `</div>`;
      listPane.innerHTML = html;

      listPane.querySelectorAll('.list-row').forEach(row => {
        const inp = row.querySelector('.lr-done input[data-check]');
        const key = inp && inp.getAttribute('data-check');
        bindDoneInput(inp, key, row);
        const doneLab = row.querySelector('.lr-done');
        if(doneLab){
          doneLab.addEventListener('click', e => e.stopPropagation());
        }
      });
      bindExtraChecks(listPane, map);
      bindLightbox(listPane);
      bindFarowtTargets(listPane, guide.tips || {});

      listPane.querySelectorAll('[data-focus]').forEach(btn => {
        btn.addEventListener('click', () => {
          idx = parseInt(btn.getAttribute('data-focus'), 10) || 0;
          saveStepIndex(guide.id, idx);
          mode = 'one';
          saveViewMode(guide.id, mode);
          setToggleUI();
          paintOne();
          scrollWalk();
        });
      });
      listPane.querySelectorAll('[data-jump]').forEach(a => {
        a.addEventListener('click', e => {
          e.preventDefault();
          const i = parseInt(a.getAttribute('data-jump'), 10) || 0;
          scrollToListStep(i);
        });
      });
    }

    function applyMode(next, opts){
      mode = next === 'list' ? 'list' : 'one';
      saveViewMode(guide.id, mode);
      setToggleUI();
      if(mode === 'list') paintList();
      else paintOne();
      if(!opts || opts.scroll !== false) scrollWalk();
    }

    function scrollWalk(){
      const el = document.getElementById('walk');
      if(el) el.scrollIntoView({behavior: reduceMotion()?'auto':'smooth', block:'start'});
    }

    function scrollToListStep(i){
      const el = document.getElementById('list-step-' + i);
      if(el){
        const d = el.querySelector('details.bp-det'); if(d) d.open = true;
        el.scrollIntoView({behavior: reduceMotion()?'auto':'smooth', block:'start'});
      } else scrollWalk();
    }

    $('view-one').onclick = () => applyMode('one');
    $('view-list').onclick = () => applyMode('list');
    $('expand-all').onclick = () => {
      listPane.querySelectorAll('details.bp-det').forEach(d => { d.open = true; });
    };
    $('collapse-all').onclick = () => {
      listPane.querySelectorAll('details.bp-det').forEach(d => { d.open = false; });
    };

    // TOC jump handlers
    $('toc').querySelectorAll('[data-jump]').forEach(a => {
      a.addEventListener('click', e => {
        e.preventDefault();
        idx = parseInt(a.getAttribute('data-jump'), 10) || 0;
        saveStepIndex(guide.id, idx);
        if(mode === 'list'){
          paintList();
          scrollToListStep(idx);
        } else {
          paintOne();
          scrollWalk();
        }
      });
    });

    setToggleUI();
    if(mode === 'list') paintList();
    else paintOne();

    // keyboard (one-at-a-time only)
    document.addEventListener('keydown', function onKey(e){
      if(mode !== 'one') return;
      if(!document.getElementById('step-card') || document.getElementById('view-one-pane').hidden) return;
      if(e.target && /input|textarea|select|button/i.test(e.target.tagName)) return;
      if(e.key === 'ArrowRight' || e.key === 'n'){ e.preventDefault(); $('nav-next') && $('nav-next').click(); }
      if(e.key === 'ArrowLeft' || e.key === 'b'){ e.preventDefault(); $('nav-back') && $('nav-back').click(); }
    });

    bpTabs(guide, flat);

    $('reset').onclick = () => {
      if(!confirm('Clear all progress for this guide?')) return;
      localStorage.removeItem(storageKey(guide.id));
      localStorage.removeItem(stepIndexKey(guide.id));
      // keep view mode preference
      location.reload();
    };
  }

  function loadGuide(id){
    if(!/^[a-z0-9][a-z0-9_-]*$/i.test(id)){ showMissing(id); return; }
    const s = document.createElement('script');
    s.src = 'guides/' + id + '.js';
    s.onload = () => {
      const guide = window.FUX_GUIDE;
      if(!guide || guide.id !== id){ showMissing(id); return; }
      renderGuide(guide);
    };
    s.onerror = () => showMissing(id);
    document.head.appendChild(s);
  }

  window.FUX_bindFarowt = bindFarowtTargets;
  window.FUX_showFarowt = showFarowt;

  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    const id = params.get('id') || params.get('g') || 'door-alarm-shield';
    loadGuide(id);
  });
})();
