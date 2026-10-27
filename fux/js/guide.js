(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const reduceMotion = () => window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function storageKey(id){ return 'fux-progress:' + id; }
  function loadProgress(id){
    try{ return JSON.parse(localStorage.getItem(storageKey(id))||'{}')||{}; }catch(e){ return {}; }
  }
  function saveProgress(id, map){ localStorage.setItem(storageKey(id), JSON.stringify(map)); }

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

  function renderProgress(guide, map){
    const checks = [];
    (guide.sections||[]).forEach(sec => (sec.steps||[]).forEach(st => { if(st.check) checks.push(st.check); }));
    (guide.parts||[]).forEach((_,i) => checks.push('part-'+i));
    (guide.tools||[]).forEach((_,i) => checks.push('tool-'+i));
    const done = checks.filter(c => map[c]).length;
    const pct = checks.length ? Math.round(done*100/checks.length) : 0;
    if($('bar')) $('bar').style.width = pct + '%';
    if($('pct')) $('pct').textContent = pct + '% · ' + done + '/' + checks.length;
  }

  function bindChecks(guide){
    const map = loadProgress(guide.id);
    document.querySelectorAll('input[data-check]').forEach(inp => {
      const key = inp.getAttribute('data-check');
      inp.checked = !!map[key];
      const step = inp.closest('.step');
      if(step) step.classList.toggle('done', inp.checked);
      const li = inp.closest('li');
      if(li){ const span = li.querySelector('span'); if(span) span.classList.toggle('gone', inp.checked); }
      inp.addEventListener('change', () => {
        const m = loadProgress(guide.id);
        if(inp.checked) m[key] = true; else delete m[key];
        saveProgress(guide.id, m);
        if(step) step.classList.toggle('done', inp.checked);
        if(li){ const span = li.querySelector('span'); if(span) span.classList.toggle('gone', inp.checked); }
        renderProgress(guide, m);
      });
    });
    renderProgress(guide, map);
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
        <!-- wire legs -->
        <g class="legL" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M48 72 L42 88"/><path d="M42 88 L36 88"/>
        </g>
        <g class="legR" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M72 72 L78 88"/><path d="M78 88 L84 88"/>
        </g>
        <!-- arms -->
        <g class="armL" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M28 48 L14 40"/><path d="M14 40 L8 46"/>
        </g>
        <g class="armR" stroke="#b8ff3c" stroke-width="3" stroke-linecap="round" fill="none">
          <path d="M92 48 L106 38"/><path d="M106 38 L112 32"/>
        </g>
        <!-- lead wires into body -->
        <path d="M20 55 H32" stroke="#9e9e9e" stroke-width="4" stroke-linecap="round"/>
        <path d="M100 55 H88" stroke="#9e9e9e" stroke-width="4" stroke-linecap="round"/>
        <!-- tan resistor body -->
        <rect x="32" y="38" width="56" height="34" rx="10" fill="url(#fb)" stroke="#6d5c3a" stroke-width="1.5"/>
        <ellipse cx="42" cy="48" rx="8" ry="4" fill="#fff" opacity=".25"/>
        <!-- color bands -->
        <rect class="band" x="44" y="38" width="6" height="34" fill="#c62828"/>
        <rect class="band" x="54" y="38" width="6" height="34" fill="#c62828"/>
        <rect class="band" x="64" y="38" width="6" height="34" fill="#5d4037"/>
        <rect class="band" x="74" y="38" width="5" height="34" fill="#f9a825"/>
        <!-- googly eyes -->
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
        <!-- smile -->
        <path d="M52 64 Q60 70 68 64" fill="none" stroke="#5d4037" stroke-width="2" stroke-linecap="round"/>
        <!-- zap spark when explaining -->
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
    // force reflow
    void el.offsetWidth;
    el.classList.add(name);
  }
  function scheduleIdle(){
    clearTimeout(idleTimer);
    if(reduceMotion()) return;
    idleTimer = setTimeout(() => {
      const el = document.getElementById('farowt');
      if(el && el.classList.contains('on')){
        // long idle → sizzle a bit more often
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

      // Suppress browser context menu ONLY on tip hotspots
      el.addEventListener('contextmenu', e => {
        e.preventDefault();
        e.stopPropagation();
      });

      // Desktop: double right-click
      el.addEventListener('mousedown', e => {
        if(e.button !== 2) return;
        e.preventDefault();
        if(e.detail >= 2){
          showFarowt(tips, el.getAttribute('data-tip'));
        }
      });

      // Touch: double-tap OR long-press ~1s
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

    $('toc').innerHTML = (guide.sections||[]).map(s => `<a href="#${esc(s.id)}">${esc(s.title)}</a>`).join('');

    let html = '';
    if(guide.beforeYouStart){
      html += `<div class="callout"><div class="lead">Before you start</div><p>${esc(guide.beforeYouStart)}</p></div>`;
    }

    (guide.sections||[]).forEach(sec => {
      html += `<section class="section" id="${esc(sec.id)}"><h2>${esc(sec.title)}</h2>`;
      if(sec.callout){
        const tone = sec.callout.tone ? ' '+sec.callout.tone : '';
        html += `<div class="callout${tone}"><div class="lead">${esc(sec.callout.lead||'')}</div><p>${esc(sec.callout.text||'')}</p></div>`;
      }
      if(sec.diagram) html += diagramHtml(guide, sec.diagram);
      if(sec.showParts && guide.parts){
        html += `<ul class="parts-list">` + guide.parts.map((p,i) =>
          `<li><label><input type="checkbox" data-check="part-${i}"><span>${esc(p)}</span></label></li>`
        ).join('') + `</ul>`;
      }
      if(sec.showTools && guide.tools){
        html += `<h2 style="margin-top:18px">Tools</h2><ul class="parts-list">` + guide.tools.map((p,i) =>
          `<li><label><input type="checkbox" data-check="tool-${i}"><span>${esc(p)}</span></label></li>`
        ).join('') + `</ul>`;
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
      (sec.steps||[]).forEach((st, idx) => {
        html += `<div class="step">
          <div class="step-n">${idx+1}</div>
          <div>
            <h3>${esc(st.title)}</h3>
            <p>${esc(st.detail||'')}</p>
            ${st.warn ? `<div class="warn-inline"><b>Safety / polarity</b>${esc(st.warn)}</div>` : ''}
            ${st.diagram ? diagramHtml(guide, st.diagram) : ''}
            ${st.table ? tableHtml(st.table) : ''}
            ${st.check ? `<label class="check"><input type="checkbox" data-check="${esc(st.check)}"> Check yourself — done</label>` : ''}
          </div>
        </div>`;
      });
      html += `</section>`;
    });

    $('body').innerHTML = html;
    // update beforeYouStart copy for Farowt if present
    bindChecks(guide);
    bindLightbox($('body'));
    bindFarowtTargets($('body'), guide.tips || {});

    $('reset').onclick = () => {
      if(!confirm('Clear all progress for this guide?')) return;
      localStorage.removeItem(storageKey(guide.id));
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
      // Patch intro hint for Farowt
      if(guide.beforeYouStart && /Hold diagrams|press-and-hold|hover/i.test(guide.beforeYouStart)){
        guide.beforeYouStart = "Your code is already on the Elegoo. Unplug USB before moving wires. Double right-click any marked part (phone: double-tap or press-and-hold) and Farowt the resistor will explain it. Tap empty diagram space to enlarge.";
      }
      renderGuide(guide);
    };
    s.onerror = () => showMissing(id);
    document.head.appendChild(s);
  }

  window.FUX_bindFarowt = bindFarowtTargets;
  window.FUX_showFarowt = showFarowt;

  window.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(location.search).get('id') || 'door-alarm-shield';
    loadGuide(id);
  });
})();
