/* Índice de búsqueda global + router de hash (#/seccion) */
const INDEX = (()=>{
  const out = [];
  Object.keys(SECTIONS).forEach(k=>{
    const m = SECTIONS[k];
    out.push({t:m.title, w:NAMES[k]||m.eyebrow, go:k, q:(m.title+' '+m.desc+' '+(m.eyebrow||'')+' '+(m.preview||[]).join(' ')).toLowerCase()});
  });
  Object.keys(GROUPS).forEach(k=>{
    const grp = GROUPS[k];
    if(grp.glossary){
      (grp.groups||[]).forEach(sec=>{
        (sec.items||[]).forEach(it=>{
          const subText = (it.sub||[]).map(s=>(s.t||'')+' '+(s.d||'')).join(' ');
          out.push({t:it.t, w:NAMES[k], go:k, q:((it.t||'')+' '+(it.d||'')+' '+(it.action||'')+' '+(sec.sec||'')+' '+subText).toLowerCase()});
        });
      });
    } else if(grp.msgLibrary){
      (grp.groups||[]).forEach(sec=>{
        (sec.items||[]).forEach(it=>{
          out.push({t:it.t, w:NAMES[k], go:k, q:((it.t||'')+' '+(it.body||'')+' '+(it.tag||'')+' '+(sec.sec||'')).toLowerCase()});
        });
      });
    } else if(grp.items){
      grp.items.forEach(it=>{
        out.push({t:it.t, w:NAMES[k], go:k, open:it.n, q:searchText(it)});
      });
    }
  });
  Object.keys(REF).forEach(k=>{
    let refRowIdx = 0;
    const isTableRef = !!REF[k].table;
    (REF[k].groups||[]).forEach(g=>g.items.forEach(it=>{
      refRowIdx++;
      out.push({t:it.name, w:NAMES[k]||k, go:k, open:isTableRef?refRowIdx:undefined, q:((it.name||'')+' '+(it.sub||'')+' '+(it.role||'')+' '+(it.client||'')+' '+(it.lang||'')).toLowerCase()});
    }));
    (REF[k].table2 && REF[k].table2.groups || []).forEach(g=>g.items.forEach(it=>{
      out.push({t:it.name, w:NAMES[k]||k, go:k, q:((it.name||'')+' '+(it.sub||'')+' '+(it.role||'')+' '+((it.rows||[]).map(r=>(r.k||'')+' '+(r.v||'')).join(' '))).toLowerCase()});
    }));
    (REF[k].extraGroups||[]).forEach(g=>g.items.forEach(it=>{
      out.push({t:it.name, w:NAMES[k]||k, go:k, q:((it.name||'')+' '+(it.sub||'')+' '+(it.role||'')).toLowerCase()});
    }));
  });
  Object.entries(CREDS_BY_KEY).forEach(([key,groups])=>{
    groups.forEach(g=>g.items.forEach(c=>{
      out.push({t:c.name, w:NAMES[key]||'Credenciales', go:key, q:((c.name||'')+' '+(c.sub||'')).toLowerCase()});
    }));
  });
  return out;
})();

const gSearch = document.getElementById('gSearch');
const gResults = document.getElementById('gResults');
let gSel = -1, gHits = [];

function runSearch(q){
  q = q.trim().toLowerCase();
  if(q.length < 2){ gResults.classList.remove('on'); gResults.innerHTML=''; gHits=[]; return; }
  const seen = new Set();
  gHits = INDEX.filter(r=>{
    if(!r.q.includes(q)) return false;
    const id = r.go+'|'+r.t;
    if(seen.has(id)) return false;
    seen.add(id); return true;
  }).slice(0,9);
  gSel = -1;
  gResults.innerHTML = gHits.length
    ? gHits.map((r,i)=>`<div class="lp-r" data-i="${i}"><svg class="rk" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg><span class="rt">${esc(r.t)}</span><span class="rw">${esc(r.w||'')}</span></div>`).join('')
    : `<div class="lp-empty">Nada coincide con «${esc(q)}». Probá con otra palabra.</div>`;
  gResults.classList.add('on');
  gResults.querySelectorAll('.lp-r').forEach(el=>{
    el.addEventListener('click',()=>openHit(gHits[+el.dataset.i]));
  });
}
function openHit(r){
  if(!r) return;
  gResults.classList.remove('on');
  gSearch.value='';
  goSection(r.go, r.open);
}
function markSel(){
  gResults.querySelectorAll('.lp-r').forEach((el,i)=>el.classList.toggle('sel', i===gSel));
}

gSearch.addEventListener('input',()=>{
  runSearch(gSearch.value);
});
gSearch.addEventListener('keydown',e=>{
  if(!gHits.length) return;
  if(e.key==='ArrowDown'){e.preventDefault(); gSel=Math.min(gSel+1,gHits.length-1); markSel();}
  else if(e.key==='ArrowUp'){e.preventDefault(); gSel=Math.max(gSel-1,0); markSel();}
  else if(e.key==='Enter'){e.preventDefault(); openHit(gHits[gSel<0?0:gSel]);}
  else if(e.key==='Escape'){gResults.classList.remove('on'); gSearch.blur();}
});
document.addEventListener('click',e=>{
  if(!e.target.closest('.lp-search')) gResults.classList.remove('on');
});
document.addEventListener('keydown',e=>{
  if((e.metaKey||e.ctrlKey) && e.key.toLowerCase()==='k'){
    e.preventDefault();
    if(vLanding.classList.contains('active')) gSearch.focus();
    else search.focus();
  }
});

backBtn.addEventListener('click',()=>{
  if(backTarget) goSection(backTarget, null, true);
  else { navStack = []; CURRENT_SECTION_KEY = null; show(vLanding); location.hash='#/'; }
});

homeBtn.addEventListener('click',()=>{
  navStack = []; CURRENT_SECTION_KEY = null; backTarget = null;
  show(vLanding); location.hash='#/';
});

document.addEventListener('click',e=>{
  const btn = e.target.closest('.toggle'); if(!btn) return;
  const val = btn.parentElement.querySelector('.val');
  val.textContent = val.textContent.includes('•') ? val.getAttribute('data-pw') : '••••••••';
});

search.addEventListener('input',()=>{
  const q = search.value.trim().toLowerCase();
  let any=false;
  secBody.querySelectorAll('.proc').forEach(p=>{
    const match = !q || p.getAttribute('data-search').includes(q);
    p.style.display = match?'':'none';
    if(match){any=true; p.classList.toggle('open', !!q);}
  });
  const idxCard = secBody.querySelector('.index-card');
  if(idxCard) idxCard.style.display = q?'none':'';
  const nr = document.getElementById('noResults');
  if(nr) nr.style.display = any?'none':'block';
});

const KEYS = Object.keys(SECTIONS).sort((a,b)=>b.length-a.length).join('|');
function fromHash(){
  const m = location.hash.match(new RegExp('^#\\/('+KEYS+')(?:\\/(\\d+))?'));
  if(m){
    if(SUPPRESS_HASH_RENDER){ SUPPRESS_HASH_RENDER = false; return; }
    CURRENT_SECTION_KEY = m[1];
    renderSection(m[1]); show(vSection);
    if(m[2] && SECTIONS[m[1]].type==='flow'){
      const t=document.getElementById(m[1]+'-'+m[2]);
      if(t){t.classList.add('open');setTimeout(()=>t.scrollIntoView({block:'start'}),100);}
    }
  } else { show(vLanding); }
}
window.addEventListener('hashchange',fromHash);

/* ===================== SELECCIÓN DE PC (gate al iniciar) ===================== */
