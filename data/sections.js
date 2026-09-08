/* Config estructural: mapa de secciones (menu), nombres legibles, home tiles */
const NAMES = {
  solutions:"Solutions", construction:"Construction", changeorder:"Change Orders",
  wiki:"Project Wiki", resourceshub:"Resources",
  credentials:"Credenciales & Links", credsSdge:"SDG&E Credentials & Links", credsOthers:"Otras Credenciales", templates:"Templates", vendorRequests:"Vendor Requests", msgTemplates:"Change Order Templates", tplRfi:"RFI Message", tplCompletion:"Completion Message", tplProposalFollowup:"Proposal Follow-up", tplProposal:"Proposal Template", tplPrelimNotice:"Preliminary Notice Email",
  permits:"Permits", sdge:"SDG&E", sdgeportal:"Conceptos y Definiciones de SDG&E Status", sdgeapply:"Aplicación de SDG&E", sdgeprocess:"Proceso de Coordinación",
  cityaccess:"Credenciales y Links de la Ciudad", row:"ROW", constructionchanges:"Construction Changes",
  contactshub:"Contactos", spearheadteam:"Spearhead Team", pmcontacts:"Project Managers", pccontacts:"Project Coordinators", ccEmails:"Emails to add to CC", inspectors:"Inspectores", citynumbers:"Números de Ciudad",
  clients:"Clientes", vendorsdir:"Top Vendors", personal:"Personal"
};

const SECTIONS = {
  personal:{type:'personal',icon:'people',eyebrow:'Tu vista',title:'Personal',desc:'Tus proyectos asignados, to-dos por proyecto y calendario — como Project Coordinator.',count:PROJECTS_MINE.length+' proyectos'},
  solutions:{type:'flow',icon:'plan',eyebrow:'Flujo',title:'Solutions',desc:'Planos, permisos y timeline de diseño con la ciudad.',count:'9 procesos'},
  construction:{type:'flow',icon:'build',eyebrow:'Flujo',title:'Construction',desc:'Contrato, binder, vendors y ejecución en campo.',count:'11 procesos'},
  wiki:{type:'hub',icon:'permit',eyebrow:'Hub',title:'Project Wiki',desc:'SOP de procesos para los projects.',count:'3 secciones',children:['changeorder','permits','sdge']},
  resourceshub:{type:'hub',icon:'book',eyebrow:'Hub',title:'Resources',desc:'Templates, contactos y más.',count:'3 secciones',children:['templates','contactshub','credentials']},

  changeorder:{type:'flow',icon:'swap',eyebrow:'Aplica a ambos',title:'Change Orders',desc:'Crear, comunicar y registrar un Change Order.',count:'8 pasos',parent:'wiki'},
  permits:{type:'hub',icon:'permit',eyebrow:'Referencia',title:'Permits',desc:'Accesos por ciudad, ROW y construction changes.',count:'2 secciones',parent:'wiki',children:['row','constructionchanges'],extraLinkBtn:{label:'Ver Credenciales y Links de la Ciudad →',go:'cityaccess'}},
  cityaccess:{type:'ref',icon:'lock',eyebrow:'Accesos',title:'Credenciales y Links de la Ciudad',desc:'Usuarios y contraseñas por sistema, y links directos a cada portal.',parent:'credentials'},
  row:{type:'ref',icon:'permit',eyebrow:'Referencia',title:'ROW',desc:'Right of Way.',parent:'permits'},
  constructionchanges:{type:'ref',icon:'permit',eyebrow:'Referencia',title:'Construction Changes',desc:'Cambios sobre permisos ya emitidos.',parent:'permits'},
  sdge:{type:'hub',icon:'bolt',eyebrow:'Hub',title:'SDG&E',desc:'Portal, proceso de coordinación y cómo aplicar.',count:'3 secciones',parent:'wiki',children:['sdgeportal','sdgeapply','sdgeprocess'],extraLinkBtn:{label:'Ver Credenciales y Links de SDG&E →',go:'credsSdge'}},
  sdgeportal:{type:'flow',icon:'bolt',eyebrow:'Referencia',title:'Conceptos y Definiciones de SDG&E Status',desc:'Glosario: portal, work order, roles, conceptos clave y status del dashboard.',parent:'sdge'},
  sdgeapply:{type:'flow',icon:'bolt',eyebrow:'Paso a paso',title:'Aplicación de SDG&E',desc:'Checklist antes de aplicar y los pasos para crear la aplicación en el Builder Services Portal.',count:'10 pasos',parent:'sdge'},
  sdgeprocess:{type:'flow',icon:'bolt',eyebrow:'Proceso completo',title:'Proceso de Coordinación',desc:'Desde confirmar el scope hasta el disconnect/reconnect.',count:'13 pasos',parent:'sdge'},

  templates:{type:'ref',icon:'doc',eyebrow:'Recursos',title:'Templates',desc:'Change Order templates, contrato, binder y portada de Canva.',preview:['Change Order Templates','Contract Template','Binder Proposal'],parent:'resourceshub'},
  vendorRequests:{type:'flow',icon:'doc',eyebrow:'Templates',title:'Vendor Requests',desc:'Mensajes para pedir propuestas a vendors, por disciplina.',parent:'templates'},
  msgTemplates:{type:'flow',icon:'doc',eyebrow:'Templates',title:'Change Order Templates',desc:'Mensajes de Change Order listos para copiar y personalizar.',parent:'templates'},
  tplRfi:{type:'flow',icon:'doc',eyebrow:'Templates',title:'RFI Message',desc:'Solicitud y respuesta de información técnica (RFI).',parent:'templates'},
  tplCompletion:{type:'flow',icon:'doc',eyebrow:'Templates',title:'Completion Message',desc:'Mensaje de cierre de proyecto al cliente.',parent:'templates'},
  tplProposalFollowup:{type:'flow',icon:'doc',eyebrow:'Templates',title:'Proposal Follow-up',desc:'Seguimiento de una propuesta enviada al cliente.',parent:'templates'},
  tplProposal:{type:'flow',icon:'doc',eyebrow:'Templates',title:'Proposal Template',desc:'Mensaje para enviar una propuesta nueva.',parent:'templates'},
  tplPrelimNotice:{type:'flow',icon:'doc',eyebrow:'Templates',title:'Preliminary Notice Email',desc:'Solicitud de información para el Preliminary Notice.',parent:'templates'},
  contactshub:{type:'hub',icon:'people',eyebrow:'Hub',title:'Contactos',desc:'Inspectores, ciudad, clientes, vendors y equipo Spearhead.',count:'5 secciones',parent:'resourceshub',children:['spearheadteam','inspectors','citynumbers','clients','vendorsdir']},
  spearheadteam:{type:'hub',icon:'people',eyebrow:'Contactos',title:'Spearhead Team',desc:'Teléfonos y mails del equipo, separados por rol.',count:'3 secciones',parent:'contactshub',children:['pmcontacts','pccontacts','ccEmails']},
  pmcontacts:{type:'ref',icon:'people',eyebrow:'Spearhead Team',title:'Project Managers',desc:'Teléfonos y mails de los PM.',preview:['Jorge Cuevas','Daniel Blanco','Marco Guzman'],parent:'spearheadteam'},
  pccontacts:{type:'ref',icon:'people',eyebrow:'Spearhead Team',title:'Project Coordinators',desc:'Teléfonos y mails de las PC.',preview:['Daniela','Valentina','Sofia','Aida'],parent:'spearheadteam'},
  ccEmails:{type:'ref',icon:'doc',eyebrow:'Spearhead Team',title:'Emails to add to CC',desc:'Mails del equipo para copiar en CC en los correos.',preview:['jorge@spearhead.construction','marco@spearhead.construction'],parent:'spearheadteam'},
  inspectors:{type:'ref',icon:'people',eyebrow:'Contactos',title:'Inspectores',desc:'Teléfonos de inspectores por ciudad y proyecto.',preview:['David Gan','Israel Ornelas','Douglas Arnold'],parent:'contactshub'},
  citynumbers:{type:'ref',icon:'bolt',eyebrow:'Contactos',title:'Números de Ciudad',desc:'Líneas directas de departamentos.',preview:['Escondido — Inspections desk','Escondido — Tech department'],parent:'contactshub'},
  clients:{type:'ref',icon:'doc',eyebrow:'Contactos',title:'Clientes',desc:'Contacto por proyecto: mail y teléfono.',count:'99 proyectos',parent:'contactshub'},
  vendorsdir:{type:'ref',icon:'truck',eyebrow:'Contactos',title:'Top Vendors',desc:'Vendors más usados, por disciplina.',preview:['Agustín — Permits','Sanjeem — Structural','Ernesto — Solar'],parent:'contactshub'},
  credentials:{type:'hub',icon:'lock',eyebrow:'Accesos',title:'Credenciales & Links',desc:'Usuarios, contraseñas y links, organizados por sistema.',count:'3 secciones',parent:'resourceshub',children:['credsSdge','cityaccess','credsOthers']},
  credsSdge:{type:'creds',icon:'bolt',eyebrow:'Accesos',title:'SDG&E Credentials & Links',desc:'Portal, credenciales y forms de SDG&E.',parent:'credentials'},
  credsOthers:{type:'creds',icon:'lock',eyebrow:'Accesos',title:'Otras Credenciales',desc:'Levelset, Payment Schedule, Draws y otros links por proyecto.',parent:'credentials'},
};

/* Sub-página por proyecto (dentro de Personal): solo la tabla de tareas de ese proyecto.
   Se registran TODOS los proyectos (de todas las PCs) para que los links siempre resuelvan,
   sin importar qué PC esté seleccionada al navegar. */
ALL_PROJECTS.forEach(p=>{
  SECTIONS[p.key] = {type:'projecttasks',icon:'people',eyebrow:'Proyecto',title:p.name,desc:'Tareas de '+p.name+'.',parent:'personal',project:p.name};
  NAMES[p.key] = p.name;
});

/* Layout del inicio: las 4 cards principales. Para sumar una sección nueva a un hub,
   agregá su key al array `children` del hub correspondiente en SECTIONS (+ REF si es de links). */
const HOME = [
  {mode:'feature',keys:['solutions','construction','wiki','resourceshub']}
];

/* ============ RENDER HELPERS ============ */
