(function(){
  const $ = id => document.getElementById(id);
  const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const norm = s => String(s||'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();

  function score(g, q){
    if(!q) return 1;
    const hay = norm([g.title,g.summary,g.category,g.difficulty,(g.keywords||[]).join(' ')].join(' '));
    const parts = q.split(/\s+/).filter(Boolean);
    let s = 0;
    for(const p of parts){
      if(hay.includes(p)) s += 2;
      else if((g.keywords||[]).some(k => norm(k).includes(p) || p.includes(norm(k)))) s += 1;
      else return 0;
    }
    if(norm(g.title).includes(q)) s += 3;
    return s;
  }

  function card(g){
    return `<a class="card" href="guide.html?id=${encodeURIComponent(g.id)}">
      <h3>${esc(g.title)}</h3>
      <p class="sum">${esc(g.summary)}</p>
      <div class="chips">
        <span class="chip cat">${esc(g.category)}</span>
        <span class="chip diff">${esc(g.difficulty)}</span>
        <span class="chip time">${esc(g.time)}</span>
        <span class="chip parts">${esc(String(g.partsCount))} parts</span>
      </div>
    </a>`;
  }

  function render(){
    const q = norm(($('q')||{}).value);
    const cat = window.FUX_CATALOG || [];
    const hits = cat.map(g => ({g,s:score(g,q)})).filter(x => x.s>0).sort((a,b)=>b.s-a.s || a.g.title.localeCompare(b.g.title));
    const grid = $('grid');
    const empty = $('empty');
    const meta = $('meta');
    if(meta) meta.textContent = q ? `${hits.length} match${hits.length===1?'':'es'} · “${($('q').value||'').trim()}”` : `${cat.length} guide${cat.length===1?'':'s'} online`;
    if(!hits.length){
      grid.innerHTML = '';
      empty.classList.remove('hide');
      empty.querySelector('[data-q]').textContent = ($('q').value||'').trim() || 'that build';
      return;
    }
    empty.classList.add('hide');
    grid.innerHTML = hits.map(x => card(x.g)).join('');
  }

  function copyKaserin(){
    const q = ($('q').value||'').trim() || 'a new build';
    const txt = `FUX request: research and write a step-by-step build guide for: ${q}`;
    const btn = $('askk');
    const done = () => { btn.textContent = 'Copied. Paste it to Kaserin.'; };
    (navigator.clipboard ? navigator.clipboard.writeText(txt) : Promise.reject()).then(done, () => {
      const t = document.createElement('textarea'); t.value = txt; document.body.appendChild(t); t.select();
      try{ document.execCommand('copy'); }catch(e){}
      t.remove(); done();
    });
  }

  window.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(location.search);
    if(params.get('q') && $('q')) $('q').value = params.get('q');
    $('q').addEventListener('input', render);
    $('q').addEventListener('keydown', e => { if(e.key==='Enter'){ e.preventDefault(); render(); }});
    $('go').addEventListener('click', render);
    $('askk').addEventListener('click', copyKaserin);
    render();
  });
})();
