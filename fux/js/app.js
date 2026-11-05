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

  const F = {};
  const mins = t => { const m = String(t||'').match(/(\d+)/); return m ? (/hr/.test(t)?+m[1]*60:+m[1]) : 999; };
  function passF(g){
    const hay = norm([g.title,g.summary,g.difficulty,(g.keywords||[]).join(' ')].join(' '));
    if(F.beginner && !/beginner|easy/.test(norm(g.difficulty))) return false;
    if(F.solder && !/solder/.test(hay)) return false;
    if(F.quick && mins(g.time) > 60) return false;
    const c = ($('cat')||{}).value; if(c && g.category!==c) return false;
    return true;
  }
  function card(g, i){
    const n = String((i||0)+1).padStart(2,'0');
    const pc = String(g.partsCount||0).padStart(2,'0');
    return `<a class="card bp-card" href="guide.html?g=${encodeURIComponent(g.id)}">
      <div class="bp-thumb"><b>G${n}</b><em>${esc(String(g.category||'').toUpperCase())}</em></div>
      <h3>${esc(g.title)}</h3>
      <p class="sum">${esc(g.summary)}</p>
      <div class="bp-spec">${pc} PARTS · ${esc(g.time)} · ${esc(g.difficulty)}</div>
    </a>`;
  }
  function cardOld(g){
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
    const hits = cat.map(g => ({g,s:score(g,q)})).filter(x => x.s>0 && passF(x.g)).sort((a,b)=>b.s-a.s || a.g.title.localeCompare(b.g.title));
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
    grid.innerHTML = hits.map((x,i) => card(x.g,i)).join('');
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
    const sel = $('cat');
    if(sel){ [...new Set((window.FUX_CATALOG||[]).map(g=>g.category))].forEach(c=>{ const o=document.createElement('option'); o.value=c; o.textContent=c; sel.appendChild(o); }); sel.addEventListener('change', render); }
    document.querySelectorAll('.bp-ic').forEach(b => b.addEventListener('click', () => { F[b.dataset.f] = !F[b.dataset.f]; b.classList.toggle('on', !!F[b.dataset.f]); render(); }));
    render();
  });
})();
