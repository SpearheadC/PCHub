/* Contenido de: Solutions, Construction (incl. Home Inspection), Change Orders, y el flujo de Completion */
const GROUPS_CONSTRUCTION = {
  solutions:{
    kicker:"Solutions", title:"Procesos de diseño, planos y timeline",
    desc:"Secuencia general desde la primera propuesta al cliente hasta la firma del contrato, incluyendo planos, permisos y el armado del schedule en Buildertrend.",
    items:[
      {n:1,t:"Initial Proposal",tag:"Propuesta",steps:[{t:"Mandar Initial Proposal al cliente",d:""}],res:[{l:"Initial Proposal Package",u:U.initialProposalPkg}]},
      {n:2,t:"Company Portfolio",tag:"Presentación",steps:[{t:"Mostrar el portfolio de la empresa al cliente",d:""}],res:[{l:"Company Portfolio",u:U.companyPortfolio}]},
      {n:3,t:"Final Proposal Package",tag:"Propuesta",steps:[{t:"Paquete final de propuesta",d:"Debe ser revisado por las disciplinas de la ciudad correspondiente."}],res:[{l:"Final Proposal Package",u:U.finalProposalPkg}]},
      {n:4,t:"Plans & Permits",tag:"Ciudad",steps:[{t:"Planos y permisos necesarios para el proyecto",d:""}]},
      {n:5,t:"Contract",tag:"Cliente",steps:[{t:"Firma del contrato con el cliente",d:""}],res:[{l:"Contract Template",u:U.contract}]},
      {n:6,t:"Hacer el Timeline",tag:"Buildertrend",steps:[
        {t:"Crear el timeline en Buildertrend",d:"Ir al proyecto SOLUTIONS → sección Schedule → crear las tareas manualmente."},
        {t:"Agregar tarea: Duration",d:"Total de días desde hoy hasta la submission a la ciudad. Sin predecesor."}
      ],
        subTitle:"Añadir Solutions items al timeline",
        sub:[
          {t:"Cargar: Project Kick Off",d:"Inicio: hoy (o el kick off real). End date: 1 día después del «building plan ready for submittal», según el correo de Agustín."},
          {t:"Cargar: Project Background",d:"Fechas según el timeline de Agustín. Incluye record del lote → site plan + elevaciones → envío a Sanjeem (~1.5 semanas). Preguntar a Sanjeem su fecha de entrega."},
          {t:"Cargar: A-Sheets completion",d:"Empieza cuando termina Project Background. Incluye todas las hojas de Agustín + las de Sanjeem."},
          {t:"Cargar: Building plan ready for submission",d:"Empieza cuando terminan las A-Sheets. Fechas según Agustín."},
          {t:"Cargar: Submission to the city",d:"Duración: 1 solo día. Fecha según Agustín."}
        ],
      res:[{l:"Buildertrend",u:U.buildertrend}]},
      {n:7,t:"Detalle: Project Background",tag:"Sub-flujo · Agustín",steps:[],
        subTitle:"Etapa donde Agustín prepara la base del proyecto antes de dibujar los planos",
        sub:[
          {t:"Revisar el record del lote en la ciudad",d:"Busca el historial del terreno: qué hay construido, permisos anteriores, zoning, setbacks, etc."},
          {t:"Hacer el site plan + elevaciones",d:"Dibuja el site plan (vista desde arriba) y las elevaciones (frente, lado, atrás). Listo para la fecha de cierre de «Project Background»."},
          {t:"Enviar a Sanjeem",d:"Manda los planos para estructural y MEP (~1.5 semanas). El día que se le manda empieza a correr su tiempo — preguntar fecha exacta."}
        ],
        note:"<b>Fechas:</b> las dicta el timeline de Agustín. Project Background termina el día que se le manda todo a Sanjeem. Cuando Sanjeem termina, empieza A-Sheets completion."},
      {n:8,t:"Detalle: Revisión y Cierre del Timeline",tag:"Sub-flujo · Buildertrend",steps:[],
        subTitle:"Etapa final para dejar el timeline confirmado y avisarle al cliente que arrancó el proyecto",
        sub:[
          {t:"Verificar predecesores uno por uno",d:"Entrar tarea por tarea y confirmar las dependencias. Duration no lleva predecesor."},
          {t:"Set Baseline",d:"Set Baseline → confirmar."},
          {t:"Publicar el schedule online",d:"Verificar que el cliente pueda verlo desde su portal."},
          {t:"Notificar al cliente el kick off",d:"Enviarle el mensaje: «We have kicked off»."}
        ],
        note:"<button type=\"button\" class=\"note-btn\" data-goto=\"msgTemplates\">🔗 Template del mensaje de Kick Off</button>"},
      {n:9,t:"Links",tag:"Referencia",steps:[],
        links:[
          {l:"Editable Presentation for Client Meetings",u:"https://www.canva.com/design/DAGyIeeupDw/yZDx87WFxbvD76BufLMnfQ/edit"},
          {l:"ADU Questionnaire",u:"https://docs.google.com/forms/d/e/1FAIpQLScuV-qKSkx5WUrk2zcKAXe673poOQ2V6RyZ3PEbJauX4E0RjQ/viewform"}
        ]}
    ]
  },
  construction:{
    kicker:"Construction", title:"Contrato, binder, vendors y ejecución",
    desc:"Los procesos que componen el flujo de Construction, en orden: desde el envío del contrato hasta las tareas finales y el cierre completo del proyecto.",
    items:[
      {n:1,t:"Send Contract",steps:[
        {t:"Portada en Canva",d:"Usar el template — Make a copy — y cambiarle la fecha.",link:{l:"Canva Cover Template",u:"https://canva.link/cfdqd805kif1ixg"}},
        {t:"Editar documento",link:{l:"Contract Template",u:U.contract},
          sub:[
            {t:"Fecha",d:"Poner TBD si no la tiene."},
            {t:"Monto, cliente y dirección",d:"Agregar el monto del estimate, el nombre del cliente y la dirección en las secciones sombreadas."},
            {t:"Cláusula de los 60 días",d:"Incluir en la última página la cláusula de los 60 días que tiene el cliente para firmar."}
          ]},
        {t:"Adjuntar Payment Schedule y diseño",
          sub:[
            {t:"¿Lleva Payment Schedule?",d:"Si lleva, agregarlo después de la portada en Canva."},
            {t:"¿Incluye diseño?",d:"Si incluye, agregarlo al final del documento."}
          ]},
        {t:"Unir documentos y subir",
          sub:[
            {t:"Unir todos los PDFs",d:""},
            {t:"Pedir green por el canal",d:""},
            {t:"Subir a DocuSign",d:"Que firmen el cliente y Jorge. Iniciales del cliente en todas las páginas."},
            {t:"Mandarlo al cliente",d:""},
            {t:"Subirlo a Drive",d:"A la carpeta «Contract Documents»."},
            {t:"Pedirle a Jorge que lo firme",d:""}
          ]}
      ]},
      {n:2,t:"Llenar el Binder",steps:[
        {t:"Llenar info general del proyecto",link:{l:"Binder Proposal",u:U.binderSheet},
          sub:[
            {t:"Fechas, tipo de construcción y scope of work",bullets:["Start / End Date.","Type of construction: se revisa en los ISSUED PLANS en Drive.","Scope of work: tomado de los planos."]},
            {t:"Poner números de permisos",bullets:["PRJ (código del proyecto): está en los planos.","PMT (código del permiso): se usa para agendar inspecciones."],link:{l:"Cómo encontrar el PMT en Accela",u:"#go:cityaccess"}},
            {t:"Poner información del cliente",d:"Agregar los datos del cliente en el Binder."}
          ]},
        {t:"Descargar Inspection Card",d:"Solo cuando el permiso está «issued»/aprobado. Buscar con cualquier PMT o el PRJ. El mismo PMT debe verse en todas las líneas, con todas las inspecciones."}
      ],
        res:[{l:"Ver páginas de la ciudad",u:"#go:cityaccess"}]},
      {n:3,t:"Confirm SDGE + Work Order",steps:[
        {t:"Determinar cómo se maneja SDG&E",d:"El proceso de SDG&E se puede manejar de distintas maneras. Se determina viendo el estimate:",
          sub:[
            {t:"El cliente tiene un utility consultant",d:"Trabajamos en conjunto con ellos para coordinar inspecciones, pero ellos coordinan SDG&E."},
            {t:"Nosotros coordinamos SDG&E",d:"Hay que hacer el submission de la aplicación si no la tiene, para conseguir el Work Order.",link:{l:"SDGE Coordination Workflow",u:"#go:sdgeprocess"}},
            {t:"SDG&E no está en nuestro scope",d:"El cliente lo coordina al 100%. Hay que pedirle updates durante el proceso de construcción, y que nos pase el Work Order para estar alineados."}
          ]}
      ]},
      {n:4,t:"Initial Construction Tasks",steps:[{t:"Verlos en el Binder",d:""}],res:[{l:"Binder Template",u:U.binderSheet},{l:"Levelset",u:U.levelset}]},
      {n:5,t:"Crear Timeline en Buildertrend",steps:[
        {t:"Project Management",d:"Ir a la sección de Project Management dentro de Buildertrend."},
        {t:"Schedule",d:"Entrar a Schedule y crear/editar las tareas."},
        {t:"More Actions → Select from Template",d:"En «Choose a Template»: seleccionar Schedule Template."},
        {t:"Verificar Payment Schedule en Monday",d:"Verificar el Payment Schedule, asegurándose de que coincida con los draws y el timeline."},
        {t:"Organizar las fechas",d:"Ir poniendo las fechas que envió Agustín en cada tarea del schedule."},
        {t:"Agregar lo definido con el PM",d:"Incorporar los puntos y fechas acordados en la reunión de timeline."}
      ],note:"<b>Objetivo:</b> tener el timeline correctamente armado en Buildertrend, con fechas claras y alineado con el Payment Schedule.",res:[{l:"Buildertrend",u:U.buildertrend},{l:"Monday — Payment Schedule",u:U.mondayPayment},{l:"Description of Draws",u:U.draws}]},
      {n:6,t:"Tracking del Timeline",tag:"Seguimiento",steps:[
        {t:"Revisar avance en CompanyCam",d:"Ver por dónde va el proyecto en relación al timeline."},
        {t:"Comparar contra las fechas del schedule",d:"Verificar si las tareas completadas coinciden con lo planeado en Buildertrend."},
        {t:"Actualizar cuando haya cambios",d:"Si hay un Change Order de tiempo, agregarlo al timeline para llevar la cuenta de los días."},
        {t:"Dar updates semanales al cliente",d:"Comunicar el avance hasta el submittal, según lo acordado al inicio."}
      ]},
      {n:7,t:"Completion Workflow",tag:"Pasos a seguir para cerrar el proyecto",steps:[],completion:true}
    ]
  },
  changeorder:{
    kicker:"Aplica a ambos", title:"Change Orders",
    desc:"Cómo crear, comunicar y registrar un Change Order — aplica tanto en Solutions como en Construction.",
    checklistTable:true,
    items:[
      {n:1,t:"Determinar el tipo con el PM",note:"Definir si es de tiempo, de dinero, o de ambos."},
      {n:2,t:"Determinar cantidad y tiempo",note:"Definir la cantidad (dinero) y el tiempo (en días) que implica."},
      {n:3,t:"Pedirle a Marily que la cree",note:"Solicitarle que cree el Change Order en Buildertrend."},
      {n:4,t:"Ir a los Change Order Templates",note:"Buscar el mensaje según el scope of work y el tipo.",res:[{l:"Change Order Templates",u:"#go:msgTemplates"}]},
      {n:5,t:"Copiar el mensaje en Buildertrend",note:"Copiarlo en el Change Order que creó Marily."},
      {n:6,t:"Subir al form de Change Orders",note:"Subir la Change Order al form correspondiente.",res:[{l:"Change Order Form",u:U.changeForm}]},
      {n:7,t:"Agregarla al timeline (si se aprueba)",note:"Cuando el cliente la apruebe, agregarla al timeline en Buildertrend."},
      {n:8,t:"Notificar por el canal",note:"Avisar y mencionar (@) a Miriam para que sepa que se aprobó."}
    ]
  },
};
const COMPLETION = {
  fase1:[
    {label:true,t:"Próxima a ser terminada la construcción"},
    {t:"Revisar si el proyecto tiene algún hold pendiente en la pagina de la ciudad",d:"Confirmar con el PM si hace falta resolver algo antes de avanzar.",
      sub:[
        {t:"Si se necesita HERS",d:"Mandarle un mensaje al HERS consultant haciendo el request.",link:{l:"HERS Request Template",u:"#go:vendorRequests"}},
        {t:"Si tiene otro tipo de hold",d:"Coordinar con el PM para resolverlo antes de continuar."}
      ]},
    {label:true,t:"Construcción terminada"},
    {t:"PM notifica que se puede agendar el Punch Walk",d:"El PM coordina una visita interna con el Director de Construcción.",
      sub:[
        {t:"Agendar en el calendario",d:"La PC agenda el evento entre ambas partes (PM y Director de Construcción)."},
        {t:"Armar el documento de Punch Walk",d:"La PC lo arma y se lo pasa al PM.",link:{l:"Punch Walk Template",u:U.punchWalkTemplate}},
        {t:"¿Se encuentran pendientes?",branch:[{k:"yes",l:"SÍ",txt:"Se completan los trabajos adicionales y luego continúa el proceso."},{k:"no",l:"NO",txt:"Se crea un reporte en CompanyCam confirmando 100% terminado y se avanza al Home Inspection."}]}
      ]},
    {t:"Home Inspection",d:"Se solicita la inspección de la propiedad terminada antes de continuar con el Punch Walk.",
      sub:[
        {t:"Solicitar el Home Inspection y coordinar la fecha",bullets:[
          "La PC hace el request al Home Inspection consultant.",
          "Coordina la fecha y disponibilidad de la inspección.",
          "Una vez agendada, notifica por el canal el día que será."
        ],link:{l:"Home Inspection Request Template",u:"#go:vendorRequests"}},
        {t:"Pago del Home Inspection",bullets:[
          "Home Inspection consultant envía el invoice.",
          "La PC envía el invoice al canal y etiqueta a Accounting.",
          "Una vez pagada, se le comparte al Home Inspection consultant y este pasa el report.",
          "La PC envía el report al canal y etiqueta al PM."
        ]},
        {t:"¿El Home Inspection encontró problemas?",branch:[{k:"yes",l:"SÍ",txt:"Se corrigen y se vuelve a revisar. El plazo depende del scope — confirmar con el PM."},{k:"no",l:"NO",txt:"Se notifica que ya puede programarse el Punch Walk."}]}
      ]},
    {t:"Punch Walk",d:"El Director de Construcción y el PM hacen un Punch Walk interno para confirmar que ya no quedan trabajos pendientes y se puede hacer el Punch Walk con el cliente. Este se agenda una vez resueltas las observaciones del Home Inspection y aprobado el re-check."},
    {t:"Final Inspection de la Ciudad",
      sub:[
        {t:"El PM solicita la inspección final"},
        {t:"El Director da luz verde"},
        {t:"La PC agenda la Final Inspection en la página de la ciudad",d:"Si no hay ningún hold allí, permite agendarla."},
        {t:"La ciudad realiza la inspección"}
      ]},
    {t:"Certificado de Ocupación (CO)",d:"Aprobada la inspección final, la PC agenda la inspección y llena el formulario para emitir el Certificate of Occupancy."}
  ],
  fase2:[
    {t:"Programar Final Client Walk",d:"Se notifica que ya puede programarse la caminata final con el cliente.",
      sub:[
        {t:"Coordinar con el cliente",d:"Envía la invitación, coordina fecha, crea el evento de calendario y prepara el checklist."},
        {t:"¿El cliente acepta?",branch:[{k:"yes",l:"SÍ",txt:"Se realiza el Final Client Walk."},{k:"no",l:"NO",txt:"Se coordinan nuevas fechas."}]},
        {t:"Final Client Walk",d:"El PM llena el checklist y se documentan observaciones."},
        {t:"¿Hay reparaciones o cambios?",branch:[
          {k:"no",l:"NO",txt:"Se crea el doc final y se le envía por DocuSign."},
          {k:"yes",l:"SÍ",txt:"Si se determina que hay trabajo adicional, puede manejarse de 2 maneras. Si son correcciones normales, se agregan al checklist.",
            paths:[
              {t:"Change Order",link:{l:"Change Order Workflow",u:"#go:changeorder"}},
              {t:"Additional Work",bullets:["Se llena el contrato de Additional Work.","Se sube a DocuSign.","Se pide green para mandarlo.","Se le manda al cliente."],link:{l:"Contract Additional Work Template",u:"https://drive.google.com/file/d/1W1MbgZ5Hs-uMeOCBEb00xJ__gt1S582R/view?usp=sharing"}}
            ]}
        ]}
      ]},
    {t:"Reparaciones",d:"Si el cliente reporta pendientes, el equipo corrige y se hace una Verification Walk dentro de las 48 horas."},
    {t:"Cierre de Proyecto",d:"Se arma y envía el Completion Document para firma del cliente.",
      sub:[
        {t:"Pedir green del Director de Construcción",d:"Se solicita su aprobación para mandar el Completion Doc."},
        {t:"Armar el Completion Doc",
          note:"<b>Doc final de Completion:</b> Punch Walk Doc + Doc de Completion (mismo Excel) — se pasa a PDF para que el cliente lo pueda firmar.",
          link:{l:"Punch Walk Doc",u:U.punchWalkTemplate}},
        {t:"Enviarlo",d:"Se envía al cliente para firma por DocuSign."}
      ]},
    {t:"Cobro Final",d:"Última etapa antes de cerrar el proyecto.",
      sub:[
        {t:"Estar pendiente de que el cliente firme el doc",d:"Si no lo firma, se le hace un follow up."},
        {t:"PC notifica que está firmado",d:"Una vez firmado por el cliente, la PC lo manda al canal y etiqueta a Accounting."},
        {t:"Accounting envía la factura final",d:"Envía la factura final y el Unconditional Lien Waiver."},
        {t:"Cliente paga",d:"Una vez el cliente paga, el proyecto queda cerrado."}
      ]}
  ]
};

