/* Utilidades de render: escapado HTML, y los builders de steps/substeps/bullets/branch (numeración jerárquica vive acá) */
const esc = s => (s||'').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;').replace(/'/g,'&#39;');
const EXT = '<svg class="ext" viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M15 3h6v6M21 3l-9 9M19 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h6"/></svg>';
const LINK = '<svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M10 13a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1"/><path d="M14 11a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1"/></svg>';

const stepsHTML = steps => !steps||!steps.length ? '' : `<ul class="steps">${steps.map(s=>`<li><span class="st-t">${esc(s.t)}</span>${s.d?`<span class="st-d">${esc(s.d)}</span>`:''}</li>`).join('')}</ul>`;
const subHTML = it => !it.sub ? '' : `${it.subTitle?`<div class="sub-h">${esc(it.subTitle)}</div>`:''}<ul class="substeps">${it.sub.map(s=>`<li><span class="ss-t">${esc(s.t)}</span> <span class="ss-d">— ${esc(s.d)}</span></li>`).join('')}</ul>`;
const resHTML = res => !res ? '' : `<div style="margin-top:14px">${res.map(r=>{
  const inner = `${LINK}${esc(r.l)}${r.u&&!r.u.startsWith('#go:')?EXT:''}`;
  if(!r.u) return `<span class="res">${inner}</span>`;
  if(r.u.startsWith('#go:')){
    const parts = r.u.slice(4).split('/');
    return `<button type="button" class="res" data-goto="${esc(r.u.slice(4))}" style="border:none;cursor:pointer;font-family:inherit">${inner}</button>`;
  }
  return `<a class="res" href="${r.u}" target="_blank" rel="noopener">${inner}</a>`;
}).join('')}</div>`;
const noteHTML = n => n?`<div class="note">${n}</div>`:'';
const linksBlockHTML = links => !links ? '' : `<div class="links-block">${links.map(l=>{
  const isInternal = l.u && l.u.startsWith('#go:');
  const btn = isInternal
    ? `<button type="button" class="res" data-goto="${esc(l.u.slice(4))}" style="border:none;cursor:pointer;font-family:inherit">${LINK}Abrir</button>`
    : `<a class="res" href="${l.u}" target="_blank" rel="noopener">${LINK}Abrir${EXT}</a>`;
  return `<div class="links-block-item"><div class="links-block-label">${esc(l.l)}</div><div class="note" style="margin:0">${btn}</div></div>`;
}).join('')}</div>`;
const subFlowLinkHTML = link => !link ? '' : (link.u.startsWith('#go:')
  ? `<div style="margin-top:8px"><button type="button" class="res" data-goto="${esc(link.u.slice(4))}" style="border:none;cursor:pointer;font-family:inherit">${LINK}${esc(link.l)}</button></div>`
  : `<div style="margin-top:8px"><a class="res" href="${link.u}" target="_blank" rel="noopener">${LINK}${esc(link.l)}${EXT}</a></div>`);
const subFlowBranchHTML = branch => !branch ? '' : `<div class="branch" style="margin-top:8px">${branch.map(o=>`<div class="opt ${o.k}"><b>${o.l}</b>${esc(o.txt)}</div>`).join('')}</div>`;
const subFlowItemHTML = s => {
  const bullets = s.bullets ? `<ul class="subbullets">${s.bullets.map(b=>`<li>${esc(b)}</li>`).join('')}</ul>` : '';
  return `<li><span class="ss-t">${esc(s.t)}</span>${s.d?`<span class="ss-d">${esc(s.d)}</span>`:''}${bullets}${subFlowBranchHTML(s.branch)}${noteHTML(s.note)}${subFlowLinkHTML(s.link)}</li>`;
};
const flowHTML = arr => `<ul class="steps">${arr.map(s=>{
  if(s.label){
    return `<li class="step-label"><div class="sl-title">${esc(s.t)}</div>${s.d?`<div class="sl-note">${esc(s.d)}</div>`:''}</li>`;
  }
  let b='';if(s.branch){b=`<div class="branch"><div class="q"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>Decisión</div>${s.branch.map(o=>`<div class="opt ${o.k}"><b>${o.l}</b>${esc(o.txt)}</div>`).join('')}</div>`;}const sub=s.sub?`<ul class="substeps" style="margin-top:10px">${s.sub.map(subFlowItemHTML).join('')}</ul>`:'';return `<li><span class="st-t">${esc(s.t)}</span>${s.d?`<span class="st-d">${esc(s.d)}</span>`:''}${b}${sub}${noteHTML(s.note)}${subFlowLinkHTML(s.link)}</li>`;
}).join('')}</ul>`;
function completionHTML(){return `<div class="note" style="border-left-color:var(--accent);background:#f4f4f0">Proceso completo de cierre, desde que termina la construcción hasta el cobro final. Se divide en dos fases.</div><div class="sub-h">Fase 1 · Internal Revision</div>${flowHTML(COMPLETION.fase1)}<div class="sub-h">Fase 2 · Cierre con cliente</div>${flowHTML(COMPLETION.fase2)}`;}
function credsHTML(){return `<div style="margin-top:4px">${CREDS_OTHERS.map(g=>`<div style="margin-bottom:16px"><div class="cred-sec-h">${esc(g.sec)}</div><div class="cred-grid">${g.items.map(c=>`<div class="cred"><h4><span class="dot"></span>${c.url?`<a class="cl" href="${c.url}" target="_blank" rel="noopener">${esc(c.name)} ${EXT}</a>`:esc(c.name)}</h4>${c.user?`<div class="row"><span class="k">Usuario</span><span class="v">${esc(c.user)}</span></div>`:''}${c.pw?`<div class="row"><span class="k">Contraseña</span><span class="pw"><span class="val" data-pw="${esc(c.pw)}">••••••••</span><button class="toggle" aria-label="Mostrar"><svg viewBox="0 0 24 24" fill="none" stroke-width="2"><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg></button></span></div>`:''}${c.sub?`<div class="sub">${esc(c.sub)}</div>`:''}${c.links?`<div class="cred-links">${c.links.map(l=>`<a href="${l.u}" target="_blank" rel="noopener">${esc(l.l)} ↗</a>`).join('')}</div>`:''}</div>`).join('')}</div></div>`).join('')}</div>`;}

const checklistHTML = items => !items ? '' : `<ul class="checklist-list">${items.map(c=>`<li><span class="cl-box"><svg viewBox="0 0 24 24" fill="none" stroke-width="2.5"><path d="M5 13l4 4L19 7"/></svg></span><span class="cl-txt"><span class="cl-name">${esc(c.name)}</span>${c.sub?`<span class="cl-sub">${esc(c.sub)}</span>`:''}</span></li>`).join('')}</ul>`;

function bodyHTML(it){
  if(it.completion) return completionHTML();
  if(it.creds) return credsHTML();
  if(it.checklist) return checklistHTML(it.checklist)+noteHTML(it.note)+resHTML(it.res);
  return stepsHTML(it.steps)+subHTML(it)+noteHTML(it.note)+resHTML(it.res)+linksBlockHTML(it.links);
}
const stripHtml = s => (s||'').replace(/<[^>]*>/g,' ');
function searchText(it){
  return (it.t+' '+(it.tag||'')+' '+stripHtml(it.note)+' '+JSON.stringify(it.steps||'')+JSON.stringify(it.sub||'')+JSON.stringify(it.links||'')+JSON.stringify(it.checklist||'')+(it.completion?JSON.stringify(COMPLETION):'')+(it.creds?JSON.stringify(CREDS_OTHERS):'')).toLowerCase();
}

/* ============ VIEW LOGIC ============ */
