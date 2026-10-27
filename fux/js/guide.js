(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

  function storageKey(id){ return 'fux-progress:' + id; }
  function loadProgress(id){
    try{ return JSON.parse(localStorage.getItem(storageKey(id))||'{}')||{}; }catch(e){ return {}; }
  }
  function saveProgress(id, map){
    localStorage.setItem(storageKey(id), JSON.stringify(map));
  }

  function diagramHtml(guide, key){
    if(!key || !guide.diagrams || !guide.diagrams[key]) return '';
    return `<div class="diagram">${guide.diagrams[key]}</div>`;
  }

  function renderProgress(guide, map){
    const checks = [];
    (guide.sections||[]).forEach(sec => (sec.steps||[]).forEach(st => { if(st.check) checks.push(st.check); }));
    (guide.parts||[]).forEach((_,i) => checks.push('part-'+i));
    (guide.tools||[]).forEach((_,i) => checks.push('tool-'+i));
    const done = checks.filter(c => map[c]).length;
    const pct = checks.length ? Math.round(done*100/checks.length) : 0;
    const bar = $('bar'), pctEl = $('pct');
    if(bar) bar.style.width = pct + '%';
    if(pctEl) pctEl.textContent = pct + '% · ' + done + '/' + checks.length;
  }

  function bindChecks(guide){
    const map = loadProgress(guide.id);
    document.querySelectorAll('input[data-check]').forEach(inp => {
      const key = inp.getAttribute('data-check');
      inp.checked = !!map[key];
      const step = inp.closest('.step');
      if(step) step.classList.toggle('done', inp.checked);
      const li = inp.closest('li');
      if(li){
        const span = li.querySelector('span');
        if(span) span.classList.toggle('gone', inp.checked);
      }
      inp.addEventListener('change', () => {
        const m = loadProgress(guide.id);
        if(inp.checked) m[key] = true; else delete m[key];
        saveProgress(guide.id, m);
        if(step) step.classList.toggle('done', inp.checked);
        if(li){
          const span = li.querySelector('span');
          if(span) span.classList.toggle('gone', inp.checked);
        }
        renderProgress(guide, m);
      });
    });
    renderProgress(guide, map);
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
    if(guide.pullerup){
      pull.href = guide.pullerup;
      pull.style.display = '';
      pull.textContent = 'Price parts on Pullerup';
    } else {
      pull.style.display = 'none';
    }

    $('toc').innerHTML = (guide.sections||[]).map(s =>
      `<a href="#${esc(s.id)}">${esc(s.title)}</a>`
    ).join('');

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
            ${st.diagram ? diagramHtml(guide, st.diagram) : ''}
            ${st.check ? `<label class="check"><input type="checkbox" data-check="${esc(st.check)}"> Done</label>` : ''}
          </div>
        </div>`;
      });
      html += `</section>`;
    });

    $('body').innerHTML = html;
    bindChecks(guide);

    $('reset').onclick = () => {
      if(!confirm('Clear all progress for this guide?')) return;
      localStorage.removeItem(storageKey(guide.id));
      location.reload();
    };
  }

  function loadGuide(id){
    // sanitize id: letters, numbers, dash, underscore only
    if(!/^[a-z0-9][a-z0-9_-]*$/i.test(id)){
      showMissing(id);
      return;
    }
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

  window.addEventListener('DOMContentLoaded', () => {
    const id = new URLSearchParams(location.search).get('id') || 'door-alarm-shield';
    loadGuide(id);
  });
})();
