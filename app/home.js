/* Home / landing page */
const QICON = {
  swap:'<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
  permit:'<path d="M9 3h6l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="m8 13 2 2 4-4"/>',
  cal:'<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M8 3v4M16 3v4M8 14l3 3 5-5"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  row:'<path d="M4 21 10 3M20 21 14 3M12 8v2M12 14v2"/>',
  refresh:'<path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 4v4h-4"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 20v-4h4"/>',
  chat:'<path d="M21 12a8 8 0 0 1-11.5 7.2L3 21l1.8-6.5A8 8 0 1 1 21 12z"/>',
  check:'<circle cx="12" cy="12" r="9"/><path d="M8 12.5l2.5 2.5L16 9.5"/>',
  lock:'<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  truck:'<path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>'
};

/* ---------- Configuración de la landing ---------- */
const TOP_LINKS = [
  {ico:'swap',    label:'Change Order Form',       url:U.changeForm},
  {ico:'lock',    label:'Credenciales y Links de la Ciudad', go:'cityaccess'},
  {ico:'truck',   label:'Spearhead Hub',          url:U.spearheadHub},
  {ico:'bolt',    label:'SDG&E Coordination',     go:'sdge'}
];

const QUICK = [
  {ico:'cal',     label:'Schedule an Inspection / Track a Permit', openInsp:true},
  {ico:'check',   label:'Close a Project',        go:'construction', open:9},
  {ico:'doc',     label:'Create Client Message',    create:true},
  {ico:'doc',     label:'Create Vendor Request',    openVendor:true}
];

const LIFECYCLE = [
  {l:'Solutions',       go:'solutions'},
  {l:'Permits',         go:'permits'},
  {l:'Pre-Construction',go:'solutions', open:6},
  {l:'Construction',    go:'construction'},
  {l:'Inspections',     go:'cityaccess'},
  {l:'Closeout',        go:'construction', open:9}
];

const FLOWCHIPS = {
  solutions:['Design','Plans','Permits','Pre-Construction'],
  construction:['Contract','Setup','Vendors','Schedule','Closeout']
};

/* ---------- Render de la landing ---------- */
function lpFlow(key, cls){
  const m = SECTIONS[key];
  const chips = (FLOWCHIPS[key]||[]).map(c=>`<span class="lp-chip">${esc(c)}</span>`).join('');
  return `<button class="lp-flow ${cls}" data-go="${key}">
    <span class="fk">${esc(m.count||'Flujo')}</span>
    <h3>${esc(m.title)}</h3>
    <div class="fd">${esc(m.desc)}</div>
    <div class="lp-chips">${chips}</div>
    <div class="ff"><span class="fcta">Ver workflow</span>
      <span class="fgo"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span>
    </div>
  </button>`;
}
function lpQuick(q){
  if(q.create){
    return `<button class="qa2" data-create="1">
      <svg viewBox="0 0 24 24">${QICON[q.ico]||''}</svg><span>${esc(q.label)}</span></button>`;
  }
  if(q.openInsp){
    return `<button class="qa2" data-open-insp="1">
      <svg viewBox="0 0 24 24">${QICON[q.ico]||''}</svg><span>${esc(q.label)}</span></button>`;
  }
  if(q.openVendor){
    return `<button class="qa2" data-open-vendor="1">
      <svg viewBox="0 0 24 24">${QICON[q.ico]||''}</svg><span>${esc(q.label)}</span></button>`;
  }
  if(q.url){
    return `<button class="qa2" data-external="${q.url}">
      <svg viewBox="0 0 24 24">${QICON[q.ico]||''}</svg><span>${esc(q.label)}</span></button>`;
  }
  return `<button class="qa2" data-go="${q.go}"${q.open?` data-open="${q.open}"`:''}>
    <svg viewBox="0 0 24 24">${QICON[q.ico]||''}</svg><span>${esc(q.label)}</span></button>`;
}
function lpFind(key, cls, question, title, desc, cta){
  return `<button class="lp-fc ${cls}" data-go="${key}">
    <span class="qq">${esc(question)}</span>
    <h3>${esc(title)}</h3><p>${esc(desc)}</p>
    <span class="fcgo">${esc(cta)} →</span></button>`;
}

function buildHome(){
  const host = document.getElementById('homeGrid');
  host.innerHTML = `
    <div class="lp-sec" style="margin-top:0">
      <div class="lp-sec-h"><h2>Tu vista</h2>
        <span class="hint">Proyectos asignados y to-dos, ordenados para vos.</span></div>
      <div class="lp-find" style="grid-template-columns:1fr">
        ${lpFind('personal','','¿Qué tengo asignado?','Personal','Tus proyectos, to-dos por proyecto y el calendario del mes.','Abrir mi panel')}
      </div>
    </div>

    <div class="lp-sec">
      <div class="lp-sec-h"><h2>Seguí un proceso</h2>
        <span class="hint">Guía paso a paso, desde el primer contacto hasta el cierre del proyecto.</span></div>
      <div class="lp-flows">${lpFlow('solutions','a')}${lpFlow('construction','b')}</div>
    </div>

    <div class="lp-sec">
      <div class="lp-sec-h"><h2>Top Links</h2>
        <span class="hint">Accesos directos a lo que más usas.</span></div>
      <div class="lp-qa">${TOP_LINKS.map(lpQuick).join('')}</div>
    </div>

    <div class="lp-sec">
      <div class="lp-sec-h"><h2>Acciones rápidas</h2>
        <span class="hint">Ve directo a la tarea que ya conoces.</span></div>
      <div class="lp-qa">${QUICK.map(lpQuick).join('')}</div>
    </div>

    <div class="lp-sec">
      <div class="lp-sec-h"><h2>Encontrá información</h2></div>
      <div class="lp-find">
        ${lpFind('wiki','','¿Cómo hago esto?','Project Wiki','Procesos, procedimientos y guías de referencia.','Abrir la wiki')}
        ${lpFind('resourceshub','alt','¿Dónde está lo que necesito?','Resources','Templates, credenciales, directorio y links de proyecto.','Ver recursos')}
      </div>
    </div>

    <div class="lp-life">
      <div class="lp-sec-h" style="margin-bottom:0"><h2 style="font-size:11px;font-family:'Space Mono',monospace;letter-spacing:.2em;text-transform:uppercase;color:#7a7a7a;font-weight:400">Ciclo de vida del proyecto</h2></div>
      <div class="lp-track">${
        LIFECYCLE.map((st,i)=>`<button class="lp-stage" data-go="${st.go}"${st.open?` data-open="${st.open}"`:''}><span class="d"></span>${esc(st.l)}</button>${i<LIFECYCLE.length-1?'<span class="lp-rail"></span>':''}`).join('')
      }</div>
    </div>

    <div class="lp-foot">
      <span class="fl">Spearhead Construction · PC Operations Hub · Uso interno</span>
      <div class="fr">
        <span>Última actualización: <span id="lastUpd">—</span></span>
        <a href="${U.tics}" target="_blank" rel="noopener">¿Falta algo o está desactualizado? Sugerí un cambio →</a>
      </div>
    </div>`;

  host.querySelectorAll('[data-go]').forEach(el=>{
    el.addEventListener('click',()=>goSection(el.dataset.go, el.dataset.open));
  });
  host.querySelectorAll('[data-external]').forEach(el=>{
    el.addEventListener('click',()=>window.open(el.dataset.external, '_blank', 'noopener'));
  });
  host.querySelectorAll('[data-create]').forEach(el=>{
    el.addEventListener('click',()=>{ if(window.openCoModal) window.openCoModal(); });
  });
  host.querySelectorAll('[data-open-insp]').forEach(el=>{
    el.addEventListener('click',()=>{ if(window.openInspModal) window.openInspModal(); });
  });
  host.querySelectorAll('[data-open-vendor]').forEach(el=>{
    el.addEventListener('click',()=>{ if(window.openVendorModal) window.openVendorModal(); });
  });
  const upd = document.getElementById('lastUpd');
  if(upd) upd.textContent = new Date(document.lastModified).toLocaleDateString('es-AR',{day:'2-digit',month:'long',year:'numeric'});
}
buildHome();

/* ---------- Buscador global de la landing ---------- */
