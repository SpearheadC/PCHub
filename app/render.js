/* Motor de render: dispatch por tipo de sección + builders de cada tipo de página */
const vLanding = document.getElementById('landing');
const vSection = document.getElementById('section');
const secHero = document.getElementById('secHero');
const secBody = document.getElementById('secBody');
const hereName = document.getElementById('hereName');
const backBtn = document.getElementById('back');
const homeBtn = document.getElementById('homeBtn');
const search = document.getElementById('search');

function show(el){[vLanding,vSection].forEach(v=>v.classList.remove('active'));el.classList.add('active');window.scrollTo(0,0);}

function sectionHero(key){
  const m = SECTIONS[key];
  return `<span class="kicker">${esc(m.eyebrow)}</span><h1>${esc(m.title)}</h1><p>${esc(m.desc)}</p>`;
}

let backTarget = null; // a dónde vuelve el botón "Inicio/Atrás"
let navStack = []; // historial real de navegación dentro de la wiki
let SUPPRESS_HASH_RENDER = false; // evita el doble render cuando goSection() ya renderizó y solo actualiza el hash

function renderSection(key){
  const m = SECTIONS[key];
  hereName.textContent = NAMES[key];
  backTarget = navStack.length ? navStack[navStack.length-1] : (m.parent || null);
  backBtn.innerHTML = backTarget
    ? `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>${esc(NAMES[backTarget])}`
    : `<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>Inicio`;
  // El botón "Inicio" directo solo hace falta cuando hay más de un nivel de navegación
  // por delante (si no, el botón "back" de arriba ya dice "Inicio" y hace lo mismo).
  homeBtn.style.display = (navStack.length >= 1) ? '' : 'none';
  document.querySelector('.sec-search').style.display = (m.type==='flow' && !(GROUPS[key]&&(GROUPS[key].checklistTable||GROUPS[key].glossary||GROUPS[key].msgLibrary))) ? '' : 'none';
  if(m.type==='flow') renderFlow(key);
  else if(m.type==='creds') renderCreds(key);
  else if(m.type==='hub') renderHub(key);
  else if(m.type==='personal') renderPersonal(key);
  else if(m.type==='projecttasks') renderProjectTasks(key);
  else renderRef(key);
}

function renderHub(key){
  const m = SECTIONS[key];
  secHero.innerHTML = sectionHero(key);
  const extraBtnHTML = m.extraLinkBtn ? `<div class="ref-links" style="margin-bottom:18px"><button type="button" data-go="${m.extraLinkBtn.go}" style="font-family:'Space Mono',monospace;font-size:11.5px;color:var(--ink);background:#fbfbf8;border:1px solid var(--line);border-radius:6px;padding:7px 12px;cursor:pointer;display:inline-flex;align-items:center;gap:6px">${esc(m.extraLinkBtn.label)}</button></div>` : '';
  secBody.innerHTML = extraBtnHTML + `<div class="tile-grid hub-grid">${m.children.map(tileHTML).join('')}</div>` +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;
  secBody.querySelectorAll('[data-go]').forEach(el=>{
    el.addEventListener('click',()=>goSection(el.dataset.go, el.dataset.open));
  });
}

const CREDS_BY_KEY = { credsSdge: CREDS_SDGE, credsOthers: CREDS_OTHERS };

function renderCreds(key){
  secHero.innerHTML = sectionHero(key);
  const data = {table:true,mode:'doc',emojiLink:true,linkLabel:"Ver credenciales",groups:CREDS_BY_KEY[key]||CREDS_OTHERS};
  const topLinkHTML = key==='credsSdge' ? `<div class="ref-links" style="margin-bottom:18px"><button type="button" data-go="cityaccess" style="font-family:'Space Mono',monospace;font-size:11.5px;color:var(--ink);background:#fbfbf8;border:1px solid var(--line);border-radius:6px;padding:7px 12px;cursor:pointer;display:inline-flex;align-items:center;gap:6px">Ver Credenciales y Links de la Ciudad →</button></div>` : '';
  secBody.innerHTML = topLinkHTML + tableHTML(data, key, '1') +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;
  secBody.querySelectorAll('[data-go]').forEach(el=>{
    el.addEventListener('click',()=>goSection(el.dataset.go));
  });
  wireTableSearch('1', 'doc');
  setTimeout(()=>document.getElementById('ctableSearch1')?.focus(),50);
}

const refLinkHTML = l => (l.u && l.u[0]==='#')
  ? `<button type="button" class="ref-internal-link" data-goto="${esc(l.u.slice(2))}">${esc(l.l)} →</button>`
  : `<a href="${l.u}" target="_blank" rel="noopener">${esc(l.l)} ↗</a>`;

function refHTML(data){
  return data.groups.map(g=>`<div class="ref-group"><div class="ref-sec-h">${esc(g.sec)}</div><div class="ref-grid">${
    g.items.map(it=>{
      const head = `<h4><span class="dot"></span>${esc(it.name)}${it.role?`<span class="role">${esc(it.role)}</span>`:''}</h4>`;
      const sub = it.sub?`<div class="sub">${esc(it.sub)}</div>`:'';
      const rows = it.rows?`<div class="rows">${it.rows.map(r=>`<div class="row"><span class="k">${esc(r.k)}</span><span class="v">${esc(r.v)}</span></div>`).join('')}</div>`:'';
      const links = (it.url?[{l:'Abrir',u:it.url}]:[]).concat(it.links||[]);
      const linksHTML = links.length?`<div class="ref-links">${links.map(refLinkHTML).join('')}</div>`:'';
      return `<div class="ref-card">${head}${sub}${rows}${linksHTML}</div>`;
    }).join('')
  }</div></div>`).join('');
}

function tableHTML(data, key, uid){
  uid = uid || '';
  const mode = data.cols ? 'vendor' : (data.mode || 'contact');
  const hasDocSub = mode==='doc' && data.groups.some(g=>g.items.some(it=>it.sub));
  const showGroupDividers = data.groups.length>1 && (mode==='doc'||mode==='linkcred');
  const rows = [];
  let rowIdx = 0;
  data.groups.forEach(g=>{
    if(showGroupDividers){
      const colspan = mode==='doc' ? (2+(hasDocSub?1:0)) : mode==='linkcred' ? 4 : 3;
      rows.push(`<tr class="group-divider" data-search=""><td colspan="${colspan}">${esc(g.sec)}</td></tr>`);
    }
    g.items.forEach(it=>{
      rowIdx++;
      const byK = k => (it.rows||[]).find(r=>r.k.toLowerCase()===k.toLowerCase());
      const tel = byK('Tel')||byK('Desk');
      const mail = byK('Mail');
      const extraRows = (it.rows||[]).filter(r=>r!==tel && r!==mail);
      const search = (g.sec+' '+it.name+' '+(it.sub||'')+' '+(it.discipline||'')+' '+(it.comm||'')+' '+(it.client||'')+' '+(it.lang||'')+' '+(it.rows||[]).map(r=>r.k+' '+r.v).join(' ')).toLowerCase();
      let midCols, lastCols;
      if(mode==='vendor'){
        midCols = `<td class="note">${it.discipline?esc(it.discipline):''}</td><td class="note">${it.comm?esc(it.comm):''}</td>`;
        lastCols = `<td class="mono">${tel?`<a href="tel:${esc(tel.v.replace(/[^\d+]/g,''))}">${esc(tel.v)}</a>`:''}${extraRows.filter(r=>r!==tel).map(r=>`<div>${esc(r.k)}: ${esc(r.v)}</div>`).join('')}</td><td class="mono">${mail?`<a href="mailto:${esc(mail.v)}">${esc(mail.v)}</a>`:''}</td>`;
      } else if(mode==='doc'){
        midCols = hasDocSub ? `<td class="note">${it.sub?esc(it.sub):''}</td>` : '';
        const isInternal = it.url && it.url.startsWith('#go:');
        const linkTag = isInternal
          ? `<button type="button" class="ref-internal-link" data-goto="${esc(it.url.slice(4))}" style="font-size:15px;background:none;border:none;cursor:pointer;padding:0">🔗</button>`
          : `<a href="${it.url}" target="_blank" rel="noopener" title="${esc(data.linkLabel||'Abrir')}" style="font-size:15px;text-decoration:none">🔗</a>`;
        const linkTagText = isInternal
          ? `<button type="button" class="ref-internal-link" data-goto="${esc(it.url.slice(4))}" style="background:none;border:none;cursor:pointer;padding:0;font-family:inherit;font-size:inherit;color:inherit;text-decoration:underline">${esc(data.linkLabel||'Abrir')} →</button>`
          : `<a href="${it.url}" target="_blank" rel="noopener">${esc(data.linkLabel||'Abrir')} ↗</a>`;
        lastCols = data.emojiLink
          ? `<td class="mono" style="text-align:center">${it.url?linkTag:'—'}</td>`
          : `<td class="mono">${it.url?linkTagText:'—'}</td>`;
      } else if(mode==='linkcred'){
        midCols = `<td class="note">${it.sub?esc(it.sub):''}</td><td class="mono" style="text-align:center">${it.url?`<a href="${it.url}" target="_blank" rel="noopener" title="${esc(data.linkLabel||'Abrir')}" style="font-size:15px;text-decoration:none">🔗</a>`:'—'}</td>`;
        lastCols = `<td class="mono" style="text-align:center">${it.credUrl?`<a href="${it.credUrl}" target="_blank" rel="noopener" title="${esc(data.credLabel||'Ver credenciales')}" style="font-size:15px;text-decoration:none">🔗</a>`:'—'}</td>`;
      } else if(mode==='inspect'){
        midCols = `<td class="note">${it.sub?esc(it.sub):''}</td><td class="mono" style="text-align:center">${it.url?`<a href="${it.url}" target="_blank" rel="noopener" title="Abrir portal" style="font-size:15px;text-decoration:none">🔗</a>`:'—'}</td><td class="mono" style="text-align:center">${it.vpn?'✅':'✖️'}</td>`;
        lastCols = `<td class="sched">${(it.rows||[]).map(r=>{
          const isHl = r.k.toLowerCase().includes('horario');
          return isHl
            ? `<div><span class="hl-label">${esc(r.k)}</span><span class="hl-val">${esc(r.v)}</span></div>`
            : `<div><b>${esc(r.k)}:</b> ${esc(r.v)}</div>`;
        }).join('')||'—'}</td>`;
      } else if(mode==='clientcomm'){
        const isEs = it.lang==='Español';
        midCols = `<td class="note">${esc(it.client)}</td>`;
        lastCols = `<td class="mono" style="text-align:center"><span class="lang-badge ${isEs?'es':'en'}">${esc(it.lang)}</span></td>`;
      } else {
        midCols = data.noNoteCol ? '' : `<td class="note">${data.groups.length>1?`<span class="sec-tag">${esc(g.sec)}</span>`:''}${it.sub?esc(it.sub):''}</td>`;
        lastCols = `<td class="mono">${tel?`<a href="tel:${esc(tel.v.replace(/[^\d+]/g,''))}">${esc(tel.v)}</a>`:''}${extraRows.filter(r=>r!==tel).map(r=>`<div>${esc(r.k)}: ${esc(r.v)}</div>`).join('')}</td><td class="mono">${mail?`<a href="mailto:${esc(mail.v)}">${esc(mail.v)}</a>`:''}</td>`;
        if(data.langCol){
          const langLabel = it.lang==='es' ? 'Español' : it.lang==='en' ? 'English' : '';
          lastCols += `<td class="mono" style="text-align:center">${langLabel?`<span class="lang-badge ${it.lang}">${esc(langLabel)}</span>`:'—'}</td>`;
        }
      }
      rows.push(`<tr id="ctrow-${key}-${rowIdx}" data-search="${esc(search)}">
        <td class="name">${esc(it.name)}</td>
        ${midCols}
        ${lastCols}
      </tr>`);
    });
  });
  const singleGroupLabel = data.groups.length===1 ? data.groups[0].sec : null;
  const headCols = mode==='vendor'
    ? `<th>Nombre</th><th>Disciplina</th><th>Communication</th><th>Teléfono</th><th>Email</th>`
    : mode==='doc'
      ? `<th>Nombre</th>${hasDocSub?'<th>Descripción</th>':''}<th>${data.emojiLink?'Link':(data.linkLabel?esc(data.linkLabel):'Link')}</th>`
      : mode==='linkcred'
        ? `<th>Nombre</th><th>Descripción</th><th>${data.linkLabel?esc(data.linkLabel):'Link'}</th><th>${data.credLabel?esc(data.credLabel):'Credenciales'}</th>`
        : mode==='inspect'
          ? `<th>Ciudad</th><th>Notas</th><th>Link</th><th>VPN</th><th>Cuándo llamar / agendar</th>`
          : mode==='clientcomm'
            ? `<th>Proyecto</th><th>Cliente</th><th>Comunicación preferida</th>`
            : `<th>Nombre</th>${data.noNoteCol?'':'<th>Nota / Proyecto</th>'}<th>Teléfono</th><th>Email</th>${data.langCol?'<th>Comunicación preferida</th>':''}`;
  const unitLabel = mode==='doc'||mode==='linkcred' ? 'items' : mode==='inspect' ? 'ciudades' : mode==='clientcomm' ? 'proyectos' : 'contactos';
  const placeholder = mode==='doc'||mode==='linkcred' ? 'Buscar plantilla o recurso...' : mode==='inspect' ? 'Buscar ciudad...' : mode==='clientcomm' ? 'Buscar proyecto o cliente...' : 'Buscar por nombre, teléfono, proyecto...';
  const showSearch = !data.noSearch && !data.sharedSearch;
  return (showSearch?`<div class="contact-search"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><input type="text" id="ctableSearch${uid}" placeholder="${placeholder}" autocomplete="off"></div>`:'') +
    (data.topLink?`<div class="ref-links" style="margin-bottom:16px"><a href="${data.topLink.u}" target="_blank" rel="noopener" style="font-family:'Space Mono',monospace;font-size:11.5px;color:var(--ink);background:#fbfbf8;border:1px solid var(--line);border-radius:6px;padding:7px 12px;text-decoration:none;display:inline-flex;align-items:center;gap:6px">${esc(data.topLink.l)} ↗</a></div>`:'') +
    (singleGroupLabel?`<div class="ref-sec-h">${esc(singleGroupLabel)}</div>`:'') +
    `<div class="contact-count" id="ctableCount${uid}">${rows.length} ${unitLabel}</div>` +
    `<div class="ctable-wrap"><table class="ctable"><thead><tr>${headCols}</tr></thead><tbody id="ctableBody${uid}">${rows.join('')}</tbody></table></div>` +
    `<div class="ctable-empty" id="ctableEmpty${uid}" style="display:none">No se encontraron resultados.</div>`;
}

function wireTableSearch(uid, mode){
  const input = document.getElementById('ctableSearch'+uid);
  const countEl = document.getElementById('ctableCount'+uid);
  const emptyEl = document.getElementById('ctableEmpty'+uid);
  if(!input) return;
  const allRows = Array.from(document.querySelectorAll('#ctableBody'+uid+' tr'));
  input.addEventListener('input', ()=>{
    const q = input.value.trim().toLowerCase();
    let visible = 0;
    allRows.forEach(r=>{
      if(r.classList.contains('group-divider')){
        r.style.display = !q ? '' : 'none';
        return;
      }
      const match = !q || r.dataset.search.includes(q);
      r.style.display = match ? '' : 'none';
      if(match) visible++;
    });
    const label = (mode==='doc'||mode==='linkcred') ? 'item' : mode==='inspect' ? 'ciudad' : 'contacto';
    const labelPlural = mode==='inspect' ? 'ciudades' : label+'s';
    countEl.textContent = `${visible} ${visible===1?label:labelPlural}`;
    emptyEl.style.display = visible ? 'none' : 'block';
  });
}

function miniTableHTML(items){
  const hasSub = items.some(it=>it.sub);
  const rows = items.map(it=>{
    const isInternal = it.url && it.url.startsWith('#go:');
    const linkCell = !it.url ? '—'
      : isInternal
        ? `<button type="button" class="ref-internal-link" data-goto="${esc(it.url.slice(4))}" style="font-size:15px;background:none;border:none;cursor:pointer;padding:0">🔗</button>`
        : `<a href="${esc(it.url)}" target="_blank" rel="noopener" title="Abrir" style="font-size:15px;text-decoration:none">🔗</a>`;
    return `<tr>
      <td class="name">${esc(it.name)}</td>
      ${hasSub?`<td class="note">${it.sub?esc(it.sub):''}</td>`:''}
      <td class="mono" style="text-align:center">${linkCell}</td>
    </tr>`;
  }).join('');
  return `<div class="ctable-wrap" style="margin-top:2px"><table class="ctable"><thead><tr><th>Nombre</th>${hasSub?'<th>Descripción</th>':''}<th>Link</th></tr></thead><tbody>${rows}</tbody></table></div>`;
}

function renderToggleGroups(key, data){
  const groupsHTML = data.groups.map((sec,i)=>{
    const uid = key+'-tg-'+i+'-body';
    return `<div class="ml-item" id="${key}-tg-${i}">
      <div class="ml-head-row">
        <button type="button" class="ml-head" data-target="${uid}">
          <span class="ml-head-t">${esc(sec.sec)}<span class="ml-tag">${sec.items.length}</span></span>
          <svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
      </div>
      <div class="ml-body" id="${uid}"><div style="padding:2px 2px 16px">${miniTableHTML(sec.items)}</div></div>
    </div>`;
  }).join('');

  secBody.innerHTML = `<div class="ml-list">${groupsHTML}</div>` +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;

  secBody.querySelectorAll('.ml-head').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const body = document.getElementById(btn.dataset.target);
      const item = btn.closest('.ml-item');
      const isOpen = item.classList.toggle('open');
      body.style.maxHeight = isOpen ? body.scrollHeight+'px' : null;
    });
  });
  secBody.querySelectorAll('[data-goto]').forEach(el=>{
    el.addEventListener('click',e=>{
      e.stopPropagation();
      const parts = el.dataset.goto.split('/');
      goSection(parts[0], parts[1]);
    });
  });
}

/* ---- Personal: proyectos asignados por PC ---- */
const fmtDate = iso => { const [y,m,d] = iso.split('-'); return `${d}/${m}/${y}`; };

function projectsHTML(){
  if(!PROJECTS_MINE.length) return `<p class="co-empty" style="text-align:left;padding:14px 0">No hay proyectos asignados a esta PC en el dashboard.</p>`;
  return `<div class="table-wrap"><table class="data-table projects">
    <thead><tr><th>Proyecto</th><th>Cliente</th><th>PM</th><th>Pipeline</th></tr></thead>
    <tbody>${PROJECTS_MINE.map(p=>`<tr data-go="${esc(p.key)}">
      <td class="t-name">${esc(p.name)}<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></td>
      <td>${esc(p.client)}</td>
      <td>${esc(p.pm||'—')}</td>
      <td>${esc(p.pipeline)}</td>
    </tr>`).join('')}</tbody>
  </table></div>`;
}

/* Info de cliente (nombre, email, teléfono) leída del Binder PC — se va cargando proyecto por proyecto. */
function clientCardHTML(projectName, fallbackClient){
  const info = CLIENT_INFO[projectName];
  const name = (info && info.name) || fallbackClient || '—';
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>Cliente</th><th>Email</th><th>Teléfono</th></tr></thead>
    <tbody><tr>
      <td>${esc(name)}</td>
      <td>${info && info.email ? esc(info.email) : '—'}</td>
      <td>${info && info.phone ? esc(info.phone) : '—'}</td>
    </tr></tbody>
  </table></div>`;
}

function pmtTableHTML(projectName){
  const binder = BINDER_DATA[projectName];
  if(!binder || !binder.pmts || !binder.pmts.length){
    return `<p class="co-empty" style="text-align:left;padding:14px 0">Todavía no hay PMTs cargados desde el Binder para este proyecto.</p>`;
  }
  const prjValue = binder.prj ? (/^PRJ-/i.test(binder.prj) ? binder.prj : `PRJ-${binder.prj}`) : '';
  const prjRow = binder.prj ? `<tr><td>Building Permit</td><td>${esc(prjValue)}</td></tr>` : '';
  return `<div class="table-wrap"><table class="data-table">
    <thead><tr><th>Permiso</th><th>Permit Number</th></tr></thead>
    <tbody>
      ${prjRow}
      ${binder.pmts.map(p=>`<tr>
      <td>${esc(p.label)}</td>
      <td>${esc(p.value)}</td>
    </tr>`).join('')}
    </tbody>
  </table></div>
  ${binder.url ? `<div style="margin-top:10px"><a class="note-btn" href="${esc(binder.url)}" target="_blank" rel="noopener">🔗 Abrir Binder del proyecto</a></div>` : ''}`;
}

function renderProjectTasks(key){
  const m = SECTIONS[key];
  const proj = ALL_PROJECTS.find(p=>p.name===m.project);
  secHero.innerHTML = sectionHero(key);
  secBody.innerHTML = `
    <div class="sub-h">Cliente</div>
    ${clientCardHTML(m.project, proj && proj.client)}
    <div class="sub-h">PM asignado</div>
    <p style="font-size:14px;margin:0 0 4px">${esc((proj && proj.pm) || '—')}</p>
    <div class="sub-h" style="margin-top:18px">Permisos (PMT) del Binder</div>
    ${pmtTableHTML(m.project)}
    <div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;
}

function renderPersonal(key){
  const pc = getCurrentPC();
  secHero.innerHTML = sectionHero(key);
  secBody.innerHTML = `
    <div class="personal-pc-head">
      <span class="pill pc-badge">PC: ${esc(pc||'—')}</span>
      <button type="button" id="switchPcBtn" class="switch-pc-btn">Cambiar PC</button>
    </div>
    <div class="sub-h">Mis proyectos asignados</div>
    ${projectsHTML()}
    <div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;

  secBody.querySelectorAll('.data-table.projects tbody tr[data-go]').forEach(tr=>{
    tr.addEventListener('click', ()=> goSection(tr.dataset.go));
  });

  const switchBtn = document.getElementById('switchPcBtn');
  if(switchBtn) switchBtn.addEventListener('click', ()=> openPcModal(false));
}

function copyAllHTML(data){
  const allNames = data.groups.flatMap(g=>g.items.map(it=>it.name));
  return `<div class="note" style="white-space:pre-wrap;font-family:'Space Mono',monospace;font-size:13.5px;line-height:1.8" id="copyAllText">${esc(allNames.join('\n'))}</div>
    <div style="margin:14px 0 20px"><button type="button" class="note-btn" id="copyAllBtn">Copiar todos ⧉</button></div>`;
}
function renderRef(key){
  secHero.innerHTML = sectionHero(key);
  const data = REF[key];
  if(data && data.toggleGroups) return renderToggleGroups(key, data);
  const isTable = data && data.table;
  const copyAllBlockHTML = (data && data.copyList && data.groups && data.groups.length) ? copyAllHTML(data) : '';
  const body = (data && data.groups && data.groups.length)
    ? (isTable ? tableHTML(data, key, '1') : refHTML(data))
    : `<div class="ref-empty"><b>Sección en construcción</b>Todavía no hay nada aquí. Es fácil de llenar — agrega los items en la lista de esta sección.</div>`;
  const table2Body = (data && data.table2 && data.table2.groups && data.table2.groups.length)
    ? tableHTML(data.table2, key, '2') : '';
  const extraBody = (data && data.extraGroups && data.extraGroups.length) ? refHTML({groups:data.extraGroups}) : '';
  const sharedSearchHTML = (data && data.sharedSearch)
    ? `<div class="contact-search"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg><input type="text" id="ctableSearchShared" placeholder="Buscar ciudad, sistema, teléfono..." autocomplete="off"></div>`
    : '';
  secBody.innerHTML = sharedSearchHTML + copyAllBlockHTML + body + table2Body + extraBody +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;
  secBody.querySelectorAll('[data-goto]').forEach(el=>{
    el.addEventListener('click',()=>{
      const parts = el.dataset.goto.split('/');
      goSection(parts[0], parts[1]);
    });
  });
  const copyAllBtn = document.getElementById('copyAllBtn');
  if(copyAllBtn){
    copyAllBtn.addEventListener('click',()=>{
      const text = document.getElementById('copyAllText').textContent;
      const done = ()=>{
        const original = copyAllBtn.textContent;
        copyAllBtn.textContent = 'Copiado ✓';
        setTimeout(()=>{ copyAllBtn.textContent = original; }, 1500);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(()=>{
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          try{ document.execCommand('copy'); done(); }catch(e){}
          document.body.removeChild(ta);
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); done(); }catch(e){}
        document.body.removeChild(ta);
      }
    });
  }
  if(data && data.sharedSearch){
    const input = document.getElementById('ctableSearchShared');
    const c1 = document.getElementById('ctableCount1');
    const c2 = document.getElementById('ctableCount2');
    const e1 = document.getElementById('ctableEmpty1');
    const e2 = document.getElementById('ctableEmpty2');
    const rows1 = Array.from(document.querySelectorAll('#ctableBody1 tr'));
    const rows2 = Array.from(document.querySelectorAll('#ctableBody2 tr'));
    input.addEventListener('input', ()=>{
      const q = input.value.trim().toLowerCase();
      let v1=0, v2=0;
      rows1.forEach(r=>{ const m=!q||r.dataset.search.includes(q); r.style.display=m?'':'none'; if(m)v1++; });
      rows2.forEach(r=>{ const m=!q||r.dataset.search.includes(q); r.style.display=m?'':'none'; if(m)v2++; });
      if(c1) c1.textContent = `${v1} item${v1===1?'':'s'}`;
      if(c2) c2.textContent = `${v2} ciudad${v2===1?'':'es'}`;
      if(e1) e1.style.display = v1?'none':'block';
      if(e2) e2.style.display = v2?'none':'block';
    });
    setTimeout(()=>input.focus(),50);
  } else {
    if(isTable){
      const mode1 = data.cols ? 'vendor' : (data.mode || 'contact');
      wireTableSearch('1', mode1);
      setTimeout(()=>document.getElementById('ctableSearch1')?.focus(),50);
    }
    if(data && data.table2 && data.table2.groups && data.table2.groups.length){
      const mode2 = data.table2.cols ? 'vendor' : (data.table2.mode || 'contact');
      wireTableSearch('2', mode2);
    }
  }
}

function noteToLines(note){
  if(!note) return [];
  return note.split('<br><br>').map(s=>s.trim()).filter(Boolean);
}

function renderGlossary(key){
  const g = GROUPS[key];
  secHero.innerHTML = `<span class="kicker">${esc(g.kicker)}</span><h1>${esc(g.title)}</h1><p>${esc(g.desc)}</p>`;

  let cardN = 0;
  let rowN = 0;
  const flatItems = [];

  const itemBodyHTML = (it) => {
    const subHTML = it.sub ? `<ul class="gl-sub">${it.sub.map(s=>`<li><span class="gl-sub-t">${esc(s.t)}</span> — ${esc(s.d)}</li>`).join('')}</ul>` : '';
    const actionHTML = it.action ? `<div class="gl-action"><span class="gl-action-label">Tu acción</span><p>${esc(it.action)}</p></div>` : '';
    return `<div class="gl-def">${esc(it.d)}</div>${subHTML}${actionHTML}${it.res?resHTML(it.res):''}`;
  };

  const rowsHTML = g.groups.map((sec,i)=>{
    if(sec.collapseIndex){
      rowN++;
      flatItems.push({n:rowN, t:sec.sec, tag:`${sec.items.length} items`, id:`${key}-row-${rowN}`});
      const diagramNodes = [];
      let lastCat = null;
      const innerCardsHTML = sec.items.map(it=>{
        cardN++;
        const cardId = `${key}-glitem-${cardN}`;
        if(sec.diagram) diagramNodes.push({id:cardId, t:it.t, cat:it.cat||sec.sec});
        let catDivider = '';
        if(it.cat && it.cat!==lastCat){
          catDivider = `<div class="gl-cat-divider"${lastCat===null?' style="margin-top:0"':''}>${esc(it.cat)}</div>`;
          lastCat = it.cat;
        }
        return catDivider + `<div class="gl-card" id="${cardId}"><div class="gl-term">${esc(it.t)}</div>${itemBodyHTML(it)}</div>`;
      }).join('');

      const diagramHTML = sec.diagram ? (()=>{
        const cols = [];
        diagramNodes.forEach(n=>{
          let col = cols.find(c=>c.cat===n.cat);
          if(!col){ col = {cat:n.cat, nodes:[]}; cols.push(col); }
          col.nodes.push(n);
        });
        const diagId = `${key}-glsec-${i}-diagram`;
        return `<div style="margin-bottom:16px">
          <button type="button" class="gl-diagram-toggle" data-target="${diagId}">
            <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="3" y="4" width="7" height="7" rx="1.5"/><rect x="14" y="4" width="7" height="7" rx="1.5"/><rect x="8.5" y="15" width="7" height="7" rx="1.5"/><path d="M6.5 11v2a2 2 0 0 0 2 2h1M17.5 11v2a2 2 0 0 1-2 2h-1"/></svg>
            <span>Ver esquema de Estados</span>
            <svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
          </button>
          <div class="gl-diagram" id="${diagId}"><div class="gl-diagram-inner">
            <div class="gl-diagram-flow">${cols.map((col,ci)=>`
              <div class="gl-diagram-col">
                <div class="gl-diagram-col-h">${esc(col.cat)}</div>
                ${col.nodes.map(n=>`<div class="gl-diagram-node" data-jump="${n.id}">${esc(n.t)}</div>`).join('')}
              </div>
              ${ci<cols.length-1?'<div class="gl-diagram-arrow"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><path d="M5 12h14M13 6l6 6-6 6"/></svg></div>':''}
            `).join('')}</div>
          </div></div>
        </div>`;
      })() : '';

      return `<div class="proc" id="${key}-row-${rowN}">
        <div class="proc-top"><div class="proc-idx">${rowN}</div><div class="proc-title"><h3>${esc(sec.sec)}</h3><span class="tag">${sec.items.length} items</span></div><svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>
        <div class="proc-body"><div><div class="proc-inner">${diagramHTML}<div class="gl-cards">${innerCardsHTML}</div></div></div></div>
      </div>`;
    }

    return sec.items.map(it=>{
      rowN++; cardN++;
      flatItems.push({n:rowN, t:it.t, tag:sec.sec, id:`${key}-row-${rowN}`});
      return `<div class="proc" id="${key}-row-${rowN}">
        <div class="proc-top"><div class="proc-idx">${rowN}</div><div class="proc-title"><h3>${esc(it.t)}</h3><span class="tag">${esc(sec.sec)}</span></div><svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div>
        <div class="proc-body"><div><div class="proc-inner">${itemBodyHTML(it)}</div></div></div>
      </div>`;
    }).join('');
  }).join('');

  const indexHTML = flatItems.length>1
    ? `<div class="index-card"><div class="idx-title">Índice — ${flatItems.length} ${flatItems.length===1?'concepto':'conceptos'}<svg class="idx-chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div><div class="idx-list"><div>${
        flatItems.map(fi=>`<div class="idx-item" data-jump="${fi.id}"><span class="n">${fi.n}</span><span class="t">${esc(fi.t)}</span><span class="tg">${esc(fi.tag)}</span><svg class="go" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></div>`).join('')
      }</div></div></div>`
    : '';

  secBody.innerHTML = indexHTML + rowsHTML +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;

  secBody.querySelectorAll('.proc-top').forEach(top=>{
    top.addEventListener('click',()=>{
      top.parentElement.classList.toggle('open');
    });
  });

  const idxTitleGl = secBody.querySelector('.index-card .idx-title');
  if(idxTitleGl) idxTitleGl.addEventListener('click',()=>idxTitleGl.parentElement.classList.toggle('open'));

  secBody.querySelectorAll('.idx-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const target = document.getElementById(item.dataset.jump);
      if(!target) return;
      target.classList.add('open');
      if(target.scrollIntoView) target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });

  secBody.querySelectorAll('.gl-diagram-toggle').forEach(btn=>{
    btn.addEventListener('click',e=>{
      e.stopPropagation();
      const body = document.getElementById(btn.dataset.target);
      const isOpen = btn.classList.toggle('open');
      body.style.maxHeight = isOpen ? body.scrollHeight+'px' : null;
    });
  });
  secBody.querySelectorAll('.gl-diagram-node').forEach(node=>{
    node.addEventListener('click',()=>{
      const target = document.getElementById(node.dataset.jump);
      if(!target) return;
      if(target.scrollIntoView) target.scrollIntoView({behavior:'smooth',block:'center'});
      target.classList.add('gl-flash');
      setTimeout(()=>target.classList.remove('gl-flash'), 1400);
    });
  });
}

function renderMsgLibrary(key){
  const g = GROUPS[key];
  secHero.innerHTML = `<span class="kicker">${esc(g.kicker)}</span><h1>${esc(g.title)}</h1><p>${esc(g.desc)}</p>`;

  let msgId = 0;
  const groupsHTML = g.groups.map(sec=>`
    <div class="ml-group">
      <div class="ml-sec-title">${esc(sec.sec)}</div>
      <div class="ml-list">${sec.items.map(it=>{
        msgId++;
        const uid = key+'-msg-'+msgId;
        const coBtnHTML = it.coTemplate
          ? `<button type="button" class="ml-co-btn" data-co-type="${esc(it.coTemplate)}" title="Crear mensaje con datos del proyecto">
              <svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg>
            </button>`
          : '';
        return `<div class="ml-item">
          <div class="ml-head-row">
            <button type="button" class="ml-head" data-target="${uid}">
              <span class="ml-head-t">${esc(it.t)}${it.tag?`<span class="ml-tag">${esc(it.tag)}</span>`:''}</span>
              <svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>
            </button>
            ${coBtnHTML}
          </div>
          <div class="ml-body" id="${uid}">
            <div class="ml-msg-wrap">
              <button type="button" class="ml-copy" data-copy="${uid}-text" title="Copiar mensaje">
                <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                <span>Copiar</span>
              </button>
              <pre class="ml-msg" id="${uid}-text">${esc(it.body)}</pre>
            </div>
          </div>
        </div>`;
      }).join('')}</div>
    </div>`).join('');

  secBody.innerHTML = groupsHTML +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;

  secBody.querySelectorAll('.ml-head').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const body = document.getElementById(btn.dataset.target);
      const item = btn.closest('.ml-item');
      const isOpen = item.classList.toggle('open');
      body.style.maxHeight = isOpen ? body.scrollHeight+'px' : null;
    });
  });
  secBody.querySelectorAll('.ml-co-btn').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      if(window.openCoModal) window.openCoModal(btn.dataset.coType);
    });
  });
  secBody.querySelectorAll('.ml-copy').forEach(btn=>{
    btn.addEventListener('click',(e)=>{
      e.stopPropagation();
      const textEl = document.getElementById(btn.dataset.copy);
      const text = textEl.textContent;
      const done = ()=>{
        const label = btn.querySelector('span');
        const original = label.textContent;
        label.textContent = 'Copiado ✓';
        btn.classList.add('done');
        setTimeout(()=>{ label.textContent = original; btn.classList.remove('done'); }, 1600);
      };
      if(navigator.clipboard && navigator.clipboard.writeText){
        navigator.clipboard.writeText(text).then(done).catch(()=>{
          const ta = document.createElement('textarea');
          ta.value = text; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta); done();
        });
      } else {
        const ta = document.createElement('textarea');
        ta.value = text; document.body.appendChild(ta); ta.select();
        document.execCommand('copy'); document.body.removeChild(ta); done();
      }
    });
  });
}

function renderChecklistTable(key){
  const g = GROUPS[key];
  const binderBtnHTML = g.binderBtn ? `<div style="margin-top:14px"><a class="note-btn" href="${U.binderSheet}" target="_blank" rel="noopener" style="background:var(--lime-pale);border-color:#dceaa0">Este checklist también está en el Binder de cada proyecto — Abrir el Binder ↗</a></div>` : '';
  const coCreateBtnHTML = g.coCreateBtn ? `<div style="margin-top:14px"><button type="button" id="coFabBtn" class="co-fab" title="Crear Change Order"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.4"><path d="M12 5v14M5 12h14"/></svg><span>Crear Change Order</span></button></div>` : '';
  secHero.innerHTML = `<span class="kicker">${esc(g.kicker)}</span><h1>${esc(g.title)}</h1><p>${esc(g.desc)}</p>${binderBtnHTML}${coCreateBtnHTML}`;
  if(g.coCreateBtn){
    const btn = document.getElementById('coFabBtn');
    if(btn) btn.addEventListener('click', ()=>window.openCoModal && window.openCoModal());
  }

  const rows = g.items.map(it=>{
    const lines = noteToLines(it.note);
    const isList = lines.length > 1;
    const linesHTML = !lines.length ? '' : isList
      ? `<ul class="ct-bullets">${lines.map(l=>`<li>${l}</li>`).join('')}</ul>`
      : `<div class="ct-single">${lines[0]}</div>`;
    const stepHTML = `<div class="ct-step-t">${esc(it.t)}</div>${it.tag?`<div class="ct-step-tag">${esc(it.tag)}</div>`:''}${linesHTML}${it.res?resHTML(it.res):''}`;
    return `<tr class="ct-row" data-n="${it.n}">
      <td class="ct-n">${it.n}</td>
      <td class="ct-step">${stepHTML}</td>
    </tr>`;
  }).join('');

  secBody.innerHTML = `<div class="ct-wrap"><table class="ct-table">
    <thead><tr><th class="ct-th-n">#</th><th class="ct-th-step">Steps</th></tr></thead>
    <tbody>${rows}</tbody>
  </table></div>` +
  `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;

  secBody.querySelectorAll('[data-goto]').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.stopPropagation();
      const parts = el.dataset.goto.split('/');
      goSection(parts[0], parts[1]);
    });
  });
}

function renderFlow(key){
  const g = GROUPS[key];
  if(g.checklistTable) return renderChecklistTable(key);
  if(g.glossary) return renderGlossary(key);
  if(g.msgLibrary) return renderMsgLibrary(key);
  const binderBtnHTML = g.binderBtn ? `<div style="margin-top:14px"><a class="note-btn" href="${U.binderSheet}" target="_blank" rel="noopener" style="background:var(--lime-pale);border-color:#dceaa0">Este checklist también está en el Binder de cada proyecto — Abrir el Binder ↗</a></div>` : '';
  secHero.innerHTML = `<span class="kicker">${esc(g.kicker)}</span><h1>${esc(g.title)}</h1><p>${esc(g.desc)}</p>${binderBtnHTML}`;

  const idx = `<div class="index-card"><div class="idx-title">Índice — ${g.items.length} ${g.items.length===1?'proceso':'procesos'}<svg class="idx-chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg></div><div class="idx-list"><div>${
    g.items.map(it=>`<div class="idx-item" data-jump="${key}-${it.n}"><span class="n">${it.n}</span><span class="t">${esc(it.t)}</span>${it.tag?`<span class="tg">${esc(it.tag)}</span>`:''}<svg class="go" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg></div>`).join('')
  }</div></div></div>`;

  const procs = g.items.map(it=>`
    <div class="proc${g.autoOpen?' open static':''}" id="${key}-${it.n}" data-search="${esc(searchText(it))}">
      <div class="proc-top"><div class="proc-idx">${it.n}</div><div class="proc-title"><h3>${esc(it.t)}</h3>${it.tag?`<span class="tag">${esc(it.tag)}</span>`:''}</div>${g.autoOpen?'':'<svg class="chev" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>'}</div>
      <div class="proc-body"><div><div class="proc-inner">${bodyHTML(it)}</div></div></div>
    </div>`).join('');

  secBody.innerHTML = idx + procs +
    `<div class="no-results" id="noResults">No hay procesos que coincidan con tu búsqueda.</div>` +
    `<div class="footer-note">SPEARHEAD CONSTRUCTION · SOP ${esc(NAMES[key].toUpperCase())} · USO INTERNO · VIGENTE</div>`;

  const idxTitleFl = secBody.querySelector('.index-card .idx-title');
  if(idxTitleFl) idxTitleFl.addEventListener('click',()=>idxTitleFl.parentElement.classList.toggle('open'));

  if(!g.autoOpen){
    secBody.querySelectorAll('.proc-top').forEach(top=>{
      top.addEventListener('click',()=>{
        top.parentElement.classList.toggle('open');
      });
    });
  }
  secBody.querySelectorAll('.idx-item').forEach(item=>{
    item.addEventListener('click',()=>{
      const target = document.getElementById(item.dataset.jump);
      if(!g.autoOpen){
        target.classList.add('open');
      }
      target.scrollIntoView({behavior:'smooth',block:'start'});
    });
  });
  secBody.querySelectorAll('[data-goto]').forEach(el=>{
    el.addEventListener('click',(e)=>{
      e.stopPropagation();
      const parts = el.dataset.goto.split('/');
      goSection(parts[0], parts[1]);
    });
  });
  search.value='';
}

let CURRENT_SECTION_KEY = null;

function goSection(key,openN,isBack){
  if(isBack){
    navStack.pop();
  } else if(CURRENT_SECTION_KEY && CURRENT_SECTION_KEY !== key){
    navStack.push(CURRENT_SECTION_KEY);
  }
  CURRENT_SECTION_KEY = key;
  renderSection(key);
  show(vSection);
  SUPPRESS_HASH_RENDER = true;
  location.hash = '#/'+key + (openN?('/'+openN):'');
  if(openN && SECTIONS[key] && SECTIONS[key].type==='flow'){
    const t = document.getElementById(key+'-'+openN);
    if(t){t.classList.add('open');setTimeout(()=>{ if(t.scrollIntoView) t.scrollIntoView({behavior:'smooth',block:'start'}); },120);}
  } else if(openN && SECTIONS[key] && SECTIONS[key].type==='ref'){
    setTimeout(()=>{
      const row = document.getElementById('ctrow-'+key+'-'+openN);
      if(row){
        if(row.scrollIntoView) row.scrollIntoView({behavior:'smooth',block:'center'});
        row.classList.add('row-flash');
        setTimeout(()=>row.classList.remove('row-flash'), 1600);
      }
    }, 150);
  }
}

/* ---- Construir el inicio ---- */
function featHTML(key){
  const m = SECTIONS[key];
  const count = m.count?`<span class="f-count"><b>${esc(m.count.split(' ')[0])}</b> ${esc(m.count.split(' ').slice(1).join(' '))}</span>`:'<span></span>';
  return `<button class="feat" data-go="${key}">
    <div class="ico"><svg viewBox="0 0 24 24" fill="none">${ICONS[m.icon]||''}</svg></div>
    <h3>${esc(m.title)}</h3>
    <div class="f-desc">${esc(m.desc)}</div>
    <div class="f-foot">${count}<span class="f-go"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M5 12h14M13 6l6 6-6 6"/></svg></span></div>
  </button>`;
}
function tileHTML(key){
  const m = SECTIONS[key];
  return `<button class="tile" data-go="${key}">
    <span class="t-ico"><svg viewBox="0 0 24 24" fill="none">${ICONS[m.icon]||''}</svg></span>
    <span class="t-name">${esc(m.title)}</span>
    <svg class="t-go" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M9 6l6 6-6 6"/></svg>
  </button>`;
}
/* ---------- Iconos extra para Quick Actions ---------- */
