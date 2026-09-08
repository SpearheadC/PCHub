/* Modales: Change Order, Schedule Inspection, Vendor Request */
(function(){
  const overlay = document.getElementById('coModalOverlay');
  const closeBtn = document.getElementById('coModalClose');
  const tplSelect = document.getElementById('coTemplateSelect');
  const subtypeWrap = document.getElementById('coSubtypeWrap');
  const subtypeSelect = document.getElementById('coSubtypeSelect');
  const projectWrap = document.getElementById('coProjectWrap');
  const projectSearch = document.getElementById('coProjectSearch');
  const projectList = document.getElementById('coProjectList');
  const clientInfo = document.getElementById('coClientInfo');
  const clientName = document.getElementById('coClientName');
  const clientAddress = document.getElementById('coClientAddress');
  const clientLang = document.getElementById('coClientLang');
  const msgWrap = document.getElementById('coMsgWrap');
  const msgText = document.getElementById('coMsgText');
  const emptyState = document.getElementById('coEmptyState');
  const copyBtn = document.getElementById('coCopyBtn');

  let selectedProject = null;

  // Mapa: templateKey -> { title, items:[{coTemplate, t, tag, bodyEn, bodyEs, body}] }
  const templatesByKey = {};
  Object.entries(GROUPS).forEach(([key,grp])=>{
    if(!grp.msgLibrary) return;
    const items = [];
    (grp.groups||[]).forEach(sec=>{
      (sec.items||[]).forEach(it=>{
        if(it.coTemplate) items.push(it);
      });
    });
    if(items.length) templatesByKey[key] = { title: grp.title, items };
  });

  Object.entries(templatesByKey).forEach(([key,tpl])=>{
    const opt = document.createElement('option');
    opt.value = key;
    opt.textContent = tpl.title;
    tplSelect.appendChild(opt);
  });

  function renderProjectList(query){
    const q = (query||'').trim().toLowerCase();
    const matches = PROJECTS.filter(p=>
      !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    );
    if(!matches.length){
      projectList.innerHTML = '<div class="co-project-empty">Sin resultados</div>';
    } else {
      projectList.innerHTML = matches.map(p=>
        `<div class="co-project-item" data-project="${esc(p.name)}"><span class="n">${esc(p.name)}</span><span class="c">${esc(p.client)}</span></div>`
      ).join('');
    }
    projectList.style.display = 'block';
  }

  projectSearch.addEventListener('focus', ()=> renderProjectList(selectedProject ? '' : projectSearch.value));
  projectSearch.addEventListener('click', ()=>{
    if(selectedProject) projectSearch.select();
    renderProjectList(selectedProject ? '' : projectSearch.value);
  });
  projectSearch.addEventListener('input', ()=>{
    selectedProject = null;
    renderProjectList(projectSearch.value);
    resetDownstream();
    emptyState.style.display='block';
  });
  projectList.addEventListener('click', e=>{
    const item = e.target.closest('.co-project-item');
    if(!item || !item.dataset.project) return;
    const p = PROJECTS.find(x=>x.name===item.dataset.project);
    if(!p) return;
    selectedProject = p;
    projectSearch.value = p.name + ' — ' + p.client;
    projectList.style.display = 'none';
    fillMessage();
  });
  document.addEventListener('mousedown', e=>{
    if(!projectWrap.contains(e.target)) projectList.style.display='none';
  });

  function resetDownstream(){
    clientInfo.style.display='none'; msgWrap.style.display='none';
  }

  function currentItem(){
    const tpl = templatesByKey[tplSelect.value];
    if(!tpl) return null;
    if(tpl.items.length === 1) return tpl.items[0];
    return tpl.items.find(it=>it.coTemplate===subtypeSelect.value) || null;
  }

  function onTemplateChange(){
    const tpl = templatesByKey[tplSelect.value];
    resetDownstream();
    subtypeSelect.innerHTML = '<option value="">Selecciona el tipo…</option>';
    if(!tpl){
      subtypeWrap.style.display='none';
      projectWrap.style.display='none';
      emptyState.style.display='block';
      emptyState.textContent = 'Elegí un template arriba para continuar.';
      return;
    }
    if(tpl.items.length > 1){
      tpl.items.forEach(it=>{
        const opt = document.createElement('option');
        opt.value = it.coTemplate;
        opt.textContent = it.t + (it.tag ? ' — '+it.tag : '');
        subtypeSelect.appendChild(opt);
      });
      subtypeWrap.style.display='block';
      projectWrap.style.display='none';
      emptyState.style.display='block';
      emptyState.textContent = 'Elegí el tipo específico arriba.';
    } else {
      subtypeWrap.style.display='none';
      projectWrap.style.display='block';
      projectSearch.value=''; selectedProject=null;
      emptyState.style.display='block';
      emptyState.textContent = 'Buscá y elegí un proyecto arriba para generar el mensaje.';
    }
  }

  function onSubtypeChange(){
    resetDownstream();
    if(subtypeSelect.value){
      projectWrap.style.display='block';
      projectSearch.value=''; selectedProject=null;
      emptyState.style.display='block';
      emptyState.textContent = 'Buscá y elegí un proyecto arriba para generar el mensaje.';
    } else {
      projectWrap.style.display='none';
    }
  }

  function fillMessage(){
    const p = selectedProject;
    const coItem = currentItem();
    if(!p || !coItem){
      resetDownstream();
      emptyState.style.display='block';
      return;
    }
    clientName.textContent = p.client;
    clientAddress.textContent = p.address;
    clientLang.textContent = p.lang==='es' ? 'Español' : 'English';
    clientInfo.style.display='flex';
    const template = p.lang==='es' ? (coItem.bodyEs||coItem.body) : (coItem.bodyEn||coItem.body);
    const saludo = p.gender==='f' ? 'Estimada' : 'Estimado';
    const firstName = p.client.split(' ')[0];
    msgText.textContent = template
      .replace(/\{Client\}/g, firstName)
      .replace(/\{address\}/g, p.address)
      .replace(/\{Saludo\}/g, saludo)
      .replace(/\{Name\}/g, 'Valentina');
    msgWrap.style.display='block';
    emptyState.style.display='none';
  }

  function openModal(coType){
    tplSelect.value=''; subtypeSelect.innerHTML='<option value="">Selecciona el tipo…</option>';
    projectSearch.value=''; selectedProject=null; projectList.style.display='none';
    subtypeWrap.style.display='none'; projectWrap.style.display='none';
    resetDownstream();
    emptyState.style.display='block';
    emptyState.textContent = 'Elegí un template arriba para continuar.';
    document.getElementById('coModalTitle').textContent = 'Crear mensaje';

    if(coType){
      // Preselección: buscar la página y el item que tiene ese coTemplate
      for(const [key,tpl] of Object.entries(templatesByKey)){
        const found = tpl.items.find(it=>it.coTemplate===coType);
        if(found){
          tplSelect.value = key;
          onTemplateChange();
          if(tpl.items.length > 1){
            subtypeSelect.value = coType;
            onSubtypeChange();
          }
          document.getElementById('coModalTitle').textContent = 'Crear: '+found.t;
          break;
        }
      }
    }

    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    overlay.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.openCoModal = openModal;
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && overlay.classList.contains('open')) closeModal(); });

  tplSelect.addEventListener('change', onTemplateChange);
  subtypeSelect.addEventListener('change', onSubtypeChange);

  copyBtn.addEventListener('click', ()=>{
    const text = msgText.textContent;
    const done = ()=>{
      const label = copyBtn.querySelector('span');
      const original = label.textContent;
      label.textContent = 'Copiado ✓';
      copyBtn.classList.add('done');
      setTimeout(()=>{ label.textContent = original; copyBtn.classList.remove('done'); }, 1600);
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
})();

/* ---- Schedule an Inspection (modal) ---- */
(function(){
  const overlay = document.getElementById('inspModalOverlay');
  const closeBtn = document.getElementById('inspModalClose');
  const projectSearch = document.getElementById('inspProjectSearch');
  const projectList = document.getElementById('inspProjectList');
  const resultBox = document.getElementById('inspResult');
  const emptyState = document.getElementById('inspEmptyState');

  // Prototipo: por ahora solo mostramos el proyecto que ya tiene Binder cargado (1145 22nd St)
  const INSP_PROJECTS = PROJECTS.filter(p => BINDER_DATA[p.name]);
  let selectedProject = null;

  function renderProjectList(query){
    const q = (query||'').trim().toLowerCase();
    const matches = INSP_PROJECTS.filter(p=>
      !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    );
    projectList.innerHTML = !matches.length
      ? '<div class="co-project-empty">Sin resultados</div>'
      : matches.map(p=>
          `<div class="co-project-item" data-project="${esc(p.name)}"><span class="n">${esc(p.name)}</span><span class="c">${esc(p.client)}</span></div>`
        ).join('');
    projectList.style.display = 'block';
  }

  function findCityInfo(cityName){
    if(!cityName) return null;
    const items = (REF.cityaccess && REF.cityaccess.table2 && REF.cityaccess.table2.groups[0].items) || [];
    const norm = s => (s||'').toLowerCase().replace(/\(.*?\)/g,'').trim();
    const target = norm(cityName);
    return items.find(it => norm(it.name)===target || norm(it.name).includes(target) || target.includes(norm(it.name))) || null;
  }

  function highlightTimes(raw){
    return esc(raw).replace(/\d{1,2}:\d{2}(?:\s?[-–]\s?\d{1,2}:\d{2})?\s?(?:AM|PM)|\b\d{1,2}\s?(?:AM|PM)\b/gi, m=>`<b>${m}</b>`);
  }
  function highlightPhones(html){
    return html.replace(/\d{3}[\s-]\d{3}[\s-]\d{4}/g, m=>`<b>${m}</b>`);
  }
  const PHONE_RE = /\d{3}[\s-]?\d{3}[\s-]?\d{4}/;

  function formatAgendarRow(value){
    const parts = value.split(' · ').map(s=>s.trim());
    if(parts.length===2){
      const [a,b] = parts;
      const aLabel = PHONE_RE.test(a) ? 'Teléfono' : 'Cómo agendar';
      return `<div class="insp-split">
        <div class="insp-split-item"><span class="insp-mini-k">${aLabel}</span><span class="insp-mini-v">${highlightPhones(highlightTimes(a))}</span></div>
        <div class="insp-split-item"><span class="insp-mini-k">Horario para agendar</span><span class="insp-mini-v">${highlightTimes(b)}</span></div>
      </div>`;
    }
    return `<span class="insp-v">${highlightPhones(highlightTimes(value))}</span>`;
  }

  function cityInfoHTML(p){
    const cityName = CITY_BY_PROJECT[p.name];
    const info = findCityInfo(cityName);
    if(!cityName || !info){
      return `<div class="note" style="margin-bottom:14px">${cityName ? `No tenemos info de inspecciones cargada para <b>${esc(cityName)}</b> todavía.` : 'No encontramos la ciudad de este proyecto en el listado de jobsites.'}</div>`;
    }
    const rows = (info.rows||[]).map(r=>{
      if(/agendar/i.test(r.k) && !/horario/i.test(r.k)){
        return `<div class="insp-row"><span class="insp-k">Agendar</span>${formatAgendarRow(r.v)}</div>`;
      }
      if(/horario/i.test(r.k)){
        return `<div class="insp-row"><span class="insp-k">Día de la inspección</span><span class="insp-v">${highlightTimes(r.v)}</span></div>`;
      }
      return `<div class="insp-row"><span class="insp-k">${esc(r.k)}</span><span class="insp-v">${highlightPhones(highlightTimes(r.v))}</span></div>`;
    }).join('');
    return `<div class="cred" style="margin-bottom:14px">
      <h4><span class="dot"></span>${esc(info.name)}</h4>
      ${info.sub?`<div class="sub">${esc(info.sub)}</div>`:''}
      <span class="insp-vpn ${info.vpn?'yes':'no'}">VPN ${info.vpn?'✅':'✖️'}</span>
      <div class="insp-rows">${rows}</div>
    </div>`;
  }

  function actionLinksHTML(p, data){
    const cityName = CITY_BY_PROJECT[p.name];
    const info = findCityInfo(cityName);
    const links = [];
    if(info && info.url){
      links.push({label:'Abrir página de la ciudad', url:info.url});
    } else {
      links.push({label:'Abrir Accela', url:U.accela});
    }
    links.push({label:'Ver credenciales', url:U.contactsSheet});
    if(data && data.url) links.push({label:'Abrir Binder', url:data.url, lime:true});
    return `<div style="margin-bottom:14px;display:flex;gap:8px;flex-wrap:wrap">${
      links.map(l=>`<a class="note-btn" href="${esc(l.url)}" target="_blank" rel="noopener"${l.lime?' style="background:var(--lime-pale);border-color:#dceaa0"':''}>${esc(l.label)} ↗</a>`).join('')
    }</div>`;
  }

  function renderLoadedBinder(p, data){
    const copyBtn = value => `<button type="button" class="pmt-copy" data-copy-value="${esc(value)}" title="Copiar">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    </button>`;
    const rows = data.pmts.map(pmt=>`
      <div class="row" style="margin-bottom:6px">
        <span class="k">${esc(pmt.label)}</span>
        <span style="display:flex;align-items:center;gap:6px">
          <span class="v" style="font-family:'Space Mono',monospace">${esc(pmt.value)}</span>
          ${copyBtn(pmt.value)}
        </span>
      </div>`).join('');
    resultBox.innerHTML = `
      <div class="cred" style="margin-bottom:14px">
        <h4><span class="dot"></span>${esc(p.name)}</h4>
        ${data.prj ? `<div class="row" style="margin-bottom:6px"><span class="k">PRJ</span><span style="display:flex;align-items:center;gap:6px"><span class="v" style="font-family:'Space Mono',monospace">${esc(data.prj)}</span>${copyBtn(data.prj)}</span></div>` : ''}
        ${rows}
      </div>` + actionLinksHTML(p, data) + cityInfoHTML(p);

    resultBox.querySelectorAll('.pmt-copy').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const value = btn.dataset.copyValue;
        const done = ()=>{
          btn.classList.add('done');
          setTimeout(()=>btn.classList.remove('done'), 1400);
        };
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(value).then(done).catch(()=>{
            const ta = document.createElement('textarea');
            ta.value = value; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); document.body.removeChild(ta); done();
          });
        } else {
          const ta = document.createElement('textarea');
          ta.value = value; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta); done();
        }
      });
    });
  }

  function renderLoadForm(p){
    resultBox.innerHTML = actionLinksHTML(p, null) + cityInfoHTML(p) + `
      <div class="note">No hay Binder cargado todavía para <b>${esc(p.name)}</b>.</div>`;
  }

  function showBinder(p){
    emptyState.style.display = 'none';
    resultBox.style.display = 'block';
    const data = BINDER_DATA[p.name];
    if(data && data.pmts && data.pmts.length){
      renderLoadedBinder(p, data);
    } else {
      renderLoadForm(p);
    }
  }

  projectSearch.addEventListener('focus', ()=> renderProjectList(selectedProject ? '' : projectSearch.value));
  projectSearch.addEventListener('click', ()=>{
    if(selectedProject) projectSearch.select();
    renderProjectList(selectedProject ? '' : projectSearch.value);
  });
  projectSearch.addEventListener('input', ()=>{
    selectedProject = null;
    renderProjectList(projectSearch.value);
    resultBox.style.display = 'none';
    emptyState.style.display = 'block';
  });
  projectList.addEventListener('click', e=>{
    const item = e.target.closest('.co-project-item');
    if(!item || !item.dataset.project) return;
    const p = PROJECTS.find(x=>x.name===item.dataset.project);
    if(!p) return;
    selectedProject = p;
    projectSearch.value = p.name + ' — ' + p.client;
    projectList.style.display = 'none';
    showBinder(p);
  });
  document.addEventListener('mousedown', e=>{
    if(!overlay.contains(e.target) || e.target===overlay) return;
    if(!projectSearch.contains(e.target) && !projectList.contains(e.target)) projectList.style.display='none';
  });

  function openModal(){
    projectSearch.value=''; projectList.style.display='none'; selectedProject=null;
    resultBox.style.display='none'; resultBox.innerHTML='';
    emptyState.style.display='block';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
    setTimeout(()=>projectSearch.focus(), 50);
  }
  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  window.openInspModal = openModal;
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && overlay.classList.contains('open')) closeModal(); });
})();

/* ---- Create Vendor Request (modal) ---- */
(function(){
  const overlay = document.getElementById('vendorModalOverlay');
  const closeBtn = document.getElementById('vendorModalClose');
  const typeSelect = document.getElementById('vendorTypeSelect');
  const rowWrap = document.getElementById('vendorRowWrap');
  const rowSelect = document.getElementById('vendorRowSelect');
  const otherWrap = document.getElementById('vendorOtherWrap');
  const otherInput = document.getElementById('vendorOtherInput');
  const projectWrap = document.getElementById('vendorProjectWrap');
  const projectSearch = document.getElementById('vendorProjectSearch');
  const projectList = document.getElementById('vendorProjectList');
  const msgWrap = document.getElementById('vendorMsgWrap');
  const msgText = document.getElementById('vendorMsgText');
  const emptyState = document.getElementById('vendorEmptyState');
  const copyBtn = document.getElementById('vendorCopyBtn');

  let selectedProject = null;

  const rowGroup = (GROUPS.vendorRequests.groups||[]).find(g=>g.sec==='ROW');
  const rowYesBody = rowGroup && rowGroup.items[0] && rowGroup.items[0].body;
  const rowNoBody = rowGroup && rowGroup.items[1] && rowGroup.items[1].body;
  const genericGroup = (GROUPS.vendorRequests.groups||[]).find(g=>g.sec.indexOf('Solar')>-1);
  const genericBody = genericGroup && genericGroup.items[0] && genericGroup.items[0].body;
  const hersGroup = (GROUPS.vendorRequests.groups||[]).find(g=>g.sec==='HERS');
  const hersBody = hersGroup && hersGroup.items[0] && hersGroup.items[0].body;
  const homeInspGroup = (GROUPS.vendorRequests.groups||[]).find(g=>g.sec==='Home Inspection');
  const homeInspBody = homeInspGroup && homeInspGroup.items[0] && homeInspGroup.items[0].body;
  const rfiGroup = (GROUPS.vendorRequests.groups||[]).find(g=>g.sec==='RFI');
  const rfiBody = rfiGroup && rfiGroup.items[0] && rfiGroup.items[0].body;

  const contactsWrap = document.getElementById('vendorContactsWrap');
  const vendorItems = (REF.vendorsdir && REF.vendorsdir.groups[0] && REF.vendorsdir.groups[0].items) || [];

  function findClientEmail(p){
    if(!p) return null;
    const items = (REF.clients && REF.clients.groups || []).flatMap(g=>g.items);
    const match = items.find(it => it.name && p.client && it.name.toLowerCase()===p.client.toLowerCase())
      || items.find(it => it.name && p.client && it.name.toLowerCase().includes(p.client.toLowerCase().split(' ')[0]));
    if(!match) return null;
    const mail = (match.rows||[]).find(r=>r.k.toLowerCase()==='mail');
    return mail ? mail.v : null;
  }

  function findVendors(query){
    if(!query) return [];
    const q = query.toLowerCase();
    return vendorItems.filter(it => (it.discipline||'').toLowerCase().includes(q));
  }

  function updateVendorContacts(){
    const type = typeSelect.value;
    let query = '';
    if(type==='row') query = 'row';
    else if(type==='fire') query = 'fire sprinklers';
    else if(type==='solar') query = 'solar panels';
    else if(type==='hers') query = 'hers';
    else if(type==='homeinspection') query = 'home inspection';
    else if(type==='rfi') query = 'solar panels';
    else if(type==='other') query = otherInput.value.trim();
    const matches = findVendors(query);
    if(!matches.length){ contactsWrap.style.display='none'; contactsWrap.innerHTML=''; return; }
    const copyIcon = value => `<button type="button" class="pmt-copy" data-copy-value="${esc(value)}" title="Copiar">
      <svg viewBox="0 0 24 24" fill="none" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
    </button>`;
    contactsWrap.innerHTML = `<div class="co-label" style="margin-top:16px">Vendors para esta disciplina</div>` +
      matches.map(v=>{
        const mail = (v.rows||[]).find(r=>r.k.toLowerCase()==='mail');
        const tel = (v.rows||[]).find(r=>r.k.toLowerCase()==='tel');
        return `<div class="cred" style="margin-top:8px;padding:10px 12px">
          <div style="font-weight:700;font-size:13px">${esc(v.name)}</div>
          ${v.discipline?`<div style="font-size:11.5px;color:var(--gray);margin-top:2px">${esc(v.discipline)}</div>`:''}
          <div style="margin-top:8px;display:flex;flex-direction:column;gap:6px">
            ${mail?`<div style="display:flex;align-items:center;gap:6px"><a class="note-btn" href="mailto:${esc(mail.v)}" style="margin:0">${esc(mail.v)}</a>${copyIcon(mail.v)}</div>`:''}
            ${tel?`<div style="display:flex;align-items:center;gap:6px"><a class="note-btn" href="tel:${esc(tel.v.replace(/[^\d+]/g,''))}" style="margin:0">${esc(tel.v)}</a>${copyIcon(tel.v)}</div>`:''}
          </div>
        </div>`;
      }).join('');
    contactsWrap.style.display = 'block';
    contactsWrap.querySelectorAll('.pmt-copy').forEach(btn=>{
      btn.addEventListener('click', ()=>{
        const value = btn.dataset.copyValue;
        const done = ()=>{
          btn.classList.add('done');
          setTimeout(()=>btn.classList.remove('done'), 1400);
        };
        if(navigator.clipboard && navigator.clipboard.writeText){
          navigator.clipboard.writeText(value).then(done).catch(()=>{
            const ta = document.createElement('textarea');
            ta.value = value; document.body.appendChild(ta); ta.select();
            document.execCommand('copy'); document.body.removeChild(ta); done();
          });
        } else {
          const ta = document.createElement('textarea');
          ta.value = value; document.body.appendChild(ta); ta.select();
          document.execCommand('copy'); document.body.removeChild(ta); done();
        }
      });
    });
  }

  function renderProjectList(query){
    const q = (query||'').trim().toLowerCase();
    const matches = PROJECTS.filter(p=>
      !q || p.name.toLowerCase().includes(q) || p.client.toLowerCase().includes(q)
    );
    projectList.innerHTML = !matches.length
      ? '<div class="co-project-empty">Sin resultados</div>'
      : matches.map(p=>
          `<div class="co-project-item" data-project="${esc(p.name)}"><span class="n">${esc(p.name)}</span><span class="c">${esc(p.client)}</span></div>`
        ).join('');
    projectList.style.display = 'block';
  }

  function updateVisibility(){
    const type = typeSelect.value;
    rowWrap.style.display = type==='row' ? 'block' : 'none';
    otherWrap.style.display = type==='other' ? 'block' : 'none';
    const ready = type==='row' ? !!rowSelect.value : !!type;
    projectWrap.style.display = ready ? 'block' : 'none';
    if(!ready){ msgWrap.style.display='none'; emptyState.style.display='block'; contactsWrap.style.display='none'; }
  }

  function buildMessage(){
    const type = typeSelect.value;
    if(!type){
      emptyState.textContent = 'Elegí el tipo de vendor arriba para continuar.';
      emptyState.style.display = 'block'; msgWrap.style.display = 'none'; contactsWrap.style.display='none';
      return;
    }
    if(type==='row' && !rowSelect.value){
      emptyState.textContent = 'Seleccioná si hay planos de ROW.';
      emptyState.style.display = 'block'; msgWrap.style.display = 'none'; contactsWrap.style.display='none';
      return;
    }
    let body, discipline;
    if(type==='row'){
      body = rowSelect.value==='yes' ? rowYesBody : rowNoBody;
    } else if(type==='hers'){
      body = hersBody;
      const clientName = selectedProject ? selectedProject.client : '[Client name]';
      const clientEmail = selectedProject ? (findClientEmail(selectedProject) || '[Client email]') : '[Client email]';
      body = body.split('[Client name]').join(clientName);
      body = body.split('[Client email]').join(clientEmail);
      const binder = selectedProject && BINDER_DATA[selectedProject.name];
      const buildingPmt = binder && binder.pmts && binder.pmts.find(p=>/building/i.test(p.label));
      if(buildingPmt){
        body = body.replace('Permit number: [ ]', 'Permit number: '+buildingPmt.value);
      }
    } else if(type==='homeinspection'){
      body = homeInspBody;
    } else if(type==='rfi'){
      body = rfiBody;
    } else {
      body = genericBody;
      discipline = type==='fire' ? 'Fire Sprinklers' : type==='solar' ? 'Solar System' : (otherInput.value.trim() || '[Discipline]');
      body = body.split('[Discipline]').join(discipline);
    }
    const address = selectedProject ? selectedProject.address : '[Property]';
    body = body.split('[Property]').join(address);
    msgText.textContent = body;
    msgWrap.style.display = 'block';
    emptyState.style.display = 'none';
    updateVendorContacts();
  }

  typeSelect.addEventListener('change', ()=>{
    rowSelect.value = '';
    updateVisibility();
    buildMessage();
  });
  rowSelect.addEventListener('change', ()=>{ updateVisibility(); buildMessage(); });
  otherInput.addEventListener('input', buildMessage);

  projectSearch.addEventListener('focus', ()=> renderProjectList(selectedProject ? '' : projectSearch.value));
  projectSearch.addEventListener('click', ()=>{
    if(selectedProject) projectSearch.select();
    renderProjectList(selectedProject ? '' : projectSearch.value);
  });
  projectSearch.addEventListener('input', ()=>{
    selectedProject = null;
    renderProjectList(projectSearch.value);
    buildMessage();
  });
  projectList.addEventListener('click', e=>{
    const item = e.target.closest('.co-project-item');
    if(!item || !item.dataset.project) return;
    const p = PROJECTS.find(x=>x.name===item.dataset.project);
    if(!p) return;
    selectedProject = p;
    projectSearch.value = p.name + ' — ' + p.client;
    projectList.style.display = 'none';
    buildMessage();
  });
  document.addEventListener('mousedown', e=>{
    if(!projectWrap.contains(e.target)) projectList.style.display='none';
  });

  copyBtn.addEventListener('click', ()=>{
    const text = msgText.textContent;
    const done = ()=>{
      const label = copyBtn.querySelector('span');
      const original = label.textContent;
      label.textContent = 'Copiado ✓';
      setTimeout(()=>label.textContent = original, 1400);
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

  function openModal(){
    typeSelect.value=''; rowSelect.value=''; otherInput.value='';
    selectedProject = null; projectSearch.value=''; projectList.style.display='none';
    rowWrap.style.display='none'; otherWrap.style.display='none'; projectWrap.style.display='none';
    msgWrap.style.display='none'; contactsWrap.style.display='none'; contactsWrap.innerHTML='';
    emptyState.textContent = 'Elegí el tipo de vendor arriba para continuar.';
    emptyState.style.display='block';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  window.openVendorModal = openModal;
  closeBtn.addEventListener('click', closeModal);
  overlay.addEventListener('click', e=>{ if(e.target===overlay) closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && overlay.classList.contains('open')) closeModal(); });
})();

