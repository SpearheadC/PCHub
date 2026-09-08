/* Selección de PC (gate al iniciar) + filtrado de 'mis proyectos' */
const PC_LIST = ["Daniela","Aida","Sofia","Valentina"];
const PC_STORAGE_KEY = "sop_current_pc";

function getCurrentPC(){
  try{ return localStorage.getItem(PC_STORAGE_KEY) || null; }catch(e){ return null; }
}
function setCurrentPCStorage(pc){
  try{ localStorage.setItem(PC_STORAGE_KEY, pc); }catch(e){}
}

/* Todos los proyectos del dashboard, con su PC asignada (PROJECTS_MINE vive en data/projects.js porque SECTIONS la necesita apenas arranca). */
function refreshMyProjects(){
  const pc = getCurrentPC();
  PROJECTS_MINE = pc ? ALL_PROJECTS.filter(p=>p.pc===pc) : [];
  return PROJECTS_MINE;
}

/* ============ SECCIONES DE REFERENCIA (links / directorio) ============ */
/* Para agregar items: { name, role?, sub?, url?, rows:[{k,v}], links:[{l,u}] } */
(function(){
  const overlay = document.getElementById('pcModalOverlay');
  const closeBtn = document.getElementById('pcModalClose');
  const select = document.getElementById('pcSelect');
  const confirmBtn = document.getElementById('pcConfirmBtn');
  const hint = document.getElementById('pcModalHint');

  select.innerHTML = PC_LIST.map(pc=>`<option value="${esc(pc)}">${esc(pc)}</option>`).join('');

  function openModal(closable){
    select.value = getCurrentPC() || PC_LIST[0];
    closeBtn.style.display = closable ? '' : 'none';
    hint.textContent = closable
      ? 'Esto define qué proyectos ves en tu página Personal.'
      : 'Esto define qué proyectos ves en tu página Personal. Podés cambiarlo cuando quieras desde ahí.';
    overlay.classList.add('open');
    overlay.setAttribute('aria-hidden','false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal(){
    overlay.classList.remove('open');
    overlay.setAttribute('aria-hidden','true');
    document.body.style.overflow = '';
  }
  function confirmPc(){
    const pc = select.value;
    if(!pc) return;
    setCurrentPCStorage(pc);
    refreshMyProjects();
    closeModal();
    if(CURRENT_SECTION_KEY==='personal') renderPersonal('personal');
  }

  window.openPcModal = openModal;
  closeBtn.addEventListener('click', closeModal);
  confirmBtn.addEventListener('click', confirmPc);
  overlay.addEventListener('click', e=>{ if(e.target===overlay && closeBtn.style.display!=='none') closeModal(); });
  document.addEventListener('keydown', e=>{ if(e.key==='Escape' && overlay.classList.contains('open') && closeBtn.style.display!=='none') closeModal(); });

  /* Al iniciar: si ya hay una PC guardada, seguimos derecho. Si no, pedimos que elija antes de mostrar nada. */
  if(getCurrentPC()){
    refreshMyProjects();
    fromHash();
  } else {
    show(vLanding);
    openModal(false);
    confirmBtn.addEventListener('click', function onFirstConfirm(){
      confirmBtn.removeEventListener('click', onFirstConfirm);
      fromHash();
    });
  }
})();

/* ---- Crear Change Order (modal) ---- */
