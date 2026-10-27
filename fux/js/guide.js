(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function storageKey(id){ return 'fux-progress:' + id; }
  function loadProgress(id){
    try{ return JSON.parse(localStorage.getItem(storageKey(id))||'{}')||{}; }catch(e){ return {}; }
  }
  function saveProgress(id, map){ localStorage.setItem(storageKey(id), JSON.stringify(map)); }

  function diagramHtml(guide, key){
    if(!key || !guide.diagrams || !guide.diagrams[key]) return '';
    return `<div class="diagram" data-diagram="${esc(key)}">${guide.diagrams[key]}<div class="tip-hint">Hold a glowing part · tap diagram to enlarge</div></div>`;
  }

  function tableHtml(rows){
    if(!rows || !rows.length) return '';
    const head = rows[0];
    const body = rows.slice(1);
    return `<table class="hole-table"><thead><tr>${head.map(c=>`<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>`+
      body.map(r=>`<tr>${r.map(c=>`<td>${esc(c)}</td>`).join('')}</tr>`).join('')+
      `</tbody></table>`;
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
    // re-bind tips inside lightbox
    bindTips(inner, window.FUX_GUIDE && window.FUX_GUIDE.tips);
  }
  function bindLightbox(root){
    root.querySelectorAll('.diagram').forEach(d => {
      d.addEventListener('click', e => {
        // ignore if clicking intentionally for tip on small targets — still allow enlarge on background
        if(e.target.closest('.fux-tip') && e.detail){ /* let tip handler run */ }
        // only enlarge if not a tip long-press; simple: tap empty diagram chrome / svg bg
        if(e.target.classList && e.target.classList.contains('fux-tip')) return;
        openLightbox(d);
      });
    });
  }

  /* ---- Reusable tip system ---- */
  function ensureTipBubble(){
    let b = document.getElementById('fux-tip');
    if(b) return b;
    b = document.createElement('div');
    b.id = 'fux-tip';
    b.className = 'tip-bubble';
    b.style.display = 'none';
    document.body.appendChild(b);
    return b;
  }
  function placeBubble(b, clientX, clientY){
    b.style.display = 'block';
    const pad = 12;
    let x = clientX + 14, y = clientY + 14;
    const r = b.getBoundingClientRect();
    if(x + r.width > window.innerWidth - pad) x = clientX - r.width - 10;
    if(y + r.height > window.innerHeight - pad) y = clientY - r.height - 10;
    if(x < pad) x = pad;
    if(y < pad) y = pad;
    b.style.left = x + 'px';
    b.style.top = y + 'px';
  }
  function showTip(tips, id, x, y){
    const t = tips && tips[id];
    if(!t) return;
    const b = ensureTipBubble();
    b.innerHTML = `<div class="tn">${esc(t.name||id)}</div>`+
      `<p class="td">${esc(t.does||'')}</p>`+
      `<p class="tj"><b>IN THIS BUILD</b> — ${esc(t.job||'')}</p>`;
    placeBubble(b, x, y);
  }
  function hideTip(){
    const b = document.getElementById('fux-tip');
    if(b) b.style.display = 'none';
  }

  function bindTips(root, tips){
    if(!tips) return;
    const nodes = root.querySelectorAll('.fux-tip[data-tip]');
    nodes.forEach(el => {
      if(el._fuxTipBound) return;
      el._fuxTipBound = true;
      let hoverTimer=null, holdTimer=null, holding=false;

      // Desktop: hover 3s
      el.addEventListener('pointerenter', e => {
        if(e.pointerType === 'touch') return;
        clearTimeout(hoverTimer);
        const id = el.getAttribute('data-tip');
        const x = e.clientX, y = e.clientY;
        hoverTimer = setTimeout(() => showTip(tips, id, x, y), 3000);
      });
      el.addEventListener('pointerleave', e => {
        if(e.pointerType === 'touch') return;
        clearTimeout(hoverTimer);
        hideTip();
      });
      el.addEventListener('pointermove', e => {
        if(e.pointerType === 'touch') return;
        const b = document.getElementById('fux-tip');
        if(b && b.style.display==='block') placeBubble(b, e.clientX, e.clientY);
      });

      // Touch / press-hold ~1s, or tap to toggle
      el.addEventListener('pointerdown', e => {
        const id = el.getAttribute('data-tip');
        holding = false;
        clearTimeout(holdTimer);
        holdTimer = setTimeout(() => {
          holding = true;
          showTip(tips, id, e.clientX, e.clientY);
        }, 1000);
      });
      el.addEventListener('pointerup', e => {
        clearTimeout(holdTimer);
        const id = el.getAttribute('data-tip');
        if(!holding && e.pointerType === 'touch'){
          // tap toggle
          const b = document.getElementById('fux-tip');
          const open = b && b.style.display==='block';
          if(open) hideTip();
          else showTip(tips, id, e.clientX, e.clientY);
          e.preventDefault();
          e.stopPropagation();
        }
      });
      el.addEventListener('pointercancel', () => { clearTimeout(holdTimer); });
      el.addEventListener('click', e => {
        // prevent diagram lightbox when interacting with tip target
        e.stopPropagation();
      });
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
    bindChecks(guide);
    bindLightbox($('body'));
    bindTips($('body'), guide.tips || {});
    // hide tip when scrolling
    window.addEventListener('scroll', hideTip, {passive:true});

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
      renderGuide(guide);
    };
    s.onerror = () => showMissing(id);
    document.head.appendChild(s);
  }

  // Expose tip binder for future guides / lightbox
  window.FUX_bindTips = bindTips;

  window.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(location.search).get('id') || 'door-alarm-shield';
    loadGuide(id);
  });
})();
