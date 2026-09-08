/* Contenido de: SDG&E status/glosario, aplicación paso a paso, y proceso de coordinación */
const GROUPS_SDGE = {
  sdgeportal:{
    kicker:"SDG&E", title:"Conceptos y Definiciones de SDG&E Status",
    desc:"Glosario de referencia: qué es cada cosa, quién es quién, los roles de Spearhead, y qué significa cada status del dashboard.",
    glossary:true,
    groups:[
      {sec:"Portal", items:[
        {t:"SDGE Builder",d:"Portal donde se gestionan las aplicaciones con SDG&E.",sub:[{t:"Customer Request",d:"Cuando nosotros pedimos el servicio."},{t:"Projects",d:"Cuando ya está procesado por SDGE."}],res:[{l:"SDGE Builder",u:U.sdge},{l:"Ver credenciales",u:U.contactsSheet}]}
      ]},
      {sec:"Conceptos", items:[
        {t:"Work Order (WO)",d:"Documento que autoriza y describe el trabajo en la infraestructura eléctrica o de gas: descripción, ubicación, recursos requeridos, plazo, responsables y estado."},
        {t:"Planner",d:"La persona de SDG&E encargada de coordinar el proyecto: da updates y define las necesidades que vayan surgiendo hasta la entrega de la Work Order."},
        {t:"Temporary Pole",d:"Medidor provisional para cuando el medidor actual debe reubicarse por demolición del espacio donde está instalado. Requiere pasar la inspección «Meter Release» antes del disconnect/reconnect."},
        {t:"Billing Application",d:"Solicitud directa del cliente sobre el cargo del servicio (temporary pole o permanent power), hecha desde su propia cuenta de SDG&E para que los recibos queden a su nombre."}
      ]},
      {sec:"Roles de Spearhead", items:[
        {t:"Responsabilidad de Spearhead",d:"Gestionar la coordinación de SDG&E apegándose a los requerimientos de los planos estampados por la ciudad, y guiar al cliente en los pasos que le correspondan directamente."},
        {t:"Cuándo se ofrece el paquete",d:"Como parte del paquete de Solutions, o una vez comenzado el proyecto si surge la necesidad de contratarlo para gestionar lo necesario con SDG&E."}
      ]},
      {sec:"Estados", collapseIndex:true, diagram:true, items:[
        {t:"Project Request",cat:"Initiation",d:"El proyecto ya fue formalmente solicitado a SDG&E. Están revisando viabilidad y asignando un representante.",action:"Esperar confirmación de SDG&E y documentar la fecha de envío del request en el dashboard."},
        {t:"All Req Info",cat:"Initiation",d:"SDG&E ya tiene toda la información requerida (planos, datos del servicio, tipo de medidores). El proyecto está completo para avanzar.",action:"Verificar que no haya información pendiente de nuestra parte y actualizar cuando SDG&E confirme recepción."},
        {t:"Field Visit",cat:"Work Request",d:"SDG&E agendó o ya realizó una visita al sitio para evaluar condiciones del terreno, ubicación del transformer y puntos de conexión.",action:"Coordinar acceso al sitio, confirmar fecha de visita y registrarla, y reportar si fue completada o reprogramada."},
        {t:"Work Order",cat:"Work Request",d:"SDG&E emitió una orden de trabajo oficial. Ya existe un número de WO asignado — este es el documento que autoriza el trabajo.",action:"Guardar el número de WO en el dashboard y compartirlo con el GC; se usa en todas las comunicaciones con SDG&E."},
        {t:"Inspection",cat:"Pre-Construction",d:"SDG&E realizó o tiene programada una inspección pre-construcción para verificar que el sitio cumple requisitos antes de proceder.",action:"Asegurarse de que el sitio esté listo (zanja, conduit, espacio para transformer) y confirmar el resultado de la inspección."},
        {t:"Permits",cat:"Pre-Construction",d:"Se están tramitando o ya se obtuvieron los permisos municipales o de ROW que SDG&E necesita para hacer su trabajo en calle o acera.",action:"Verificar si el permiso lo gestiona SDG&E o si nosotros debemos solicitarlo, y monitorear la fecha de vencimiento."},
        {t:"Crew",cat:"Construction",d:"La cuadrilla de SDG&E está asignada y lista para trabajo de campo. Pueden estar en espera de fecha de inicio o en proceso de mobilización.",action:"Confirmar fecha de inicio con SDG&E y coordinar con el GC para que el sitio esté despejado y seguro."},
        {t:"Contractor",cat:"Construction",d:"El contratista privado de SDG&E (no su cuadrilla directa) está ejecutando parte del trabajo, como instalación de conduit o excavación.",action:"Asegurar coordinación entre el contratista de SDG&E y nuestro GC en campo para evitar conflictos de scope."},
        {t:"Services",cat:"Construction",d:"SDG&E está instalando o conectando los servicios de electricidad al proyecto (acometida, meter base, servicio a las unidades).",action:"Verificar que la meter base y el panel estén listos de nuestro lado; el GC debe tener esto listo antes de este paso."},
        {t:"SDG&E",cat:"Construction",d:"SDG&E está trabajando directamente en infraestructura de su propiedad: transformador, vault, cables en calle. Trabajo 100% de su responsabilidad.",action:"No interferir con su trabajo y reportar si hay paros no comunicados o si el acceso al sitio está bloqueando su avance."},
        {t:"SDGE Completed",cat:"Completed",d:"SDG&E finalizó todo su trabajo. El servicio eléctrico está disponible para conexión. Solo resta la inspección final del proyecto si aplica.",action:"Confirmar con el PM que el servicio esté energizado y funcional, actualizar el dashboard y notificar en el canal del proyecto."}
      ]}
    ]
  },
  sdgeapply:{
    kicker:"SDG&E", title:"Aplicación de SDG&E",
    desc:"Checklist antes de aplicar y los pasos para crear la aplicación en el Builder Services Portal de SDG&E.",
    items:[
      {n:1,t:"Checklist antes de aplicar",tag:"Para la PC",checklist:[
        {name:"Tipo de proyecto",sub:"ADU, adición, remodelación o construcción nueva."},
        {name:"Planos arquitectónicos actualizados",sub:"Confirmar que estén al día antes de aplicar."},
        {name:"Revisión de planos MEP",sub:"Revisar el diseño eléctrico y de gas, no solo el layout general."},
        {name:"Foto del panel eléctrico",sub:"Cerrado y abierto, para validar aplicaciones Express."},
        {name:"Foto del main breaker",sub:"Debe leerse claramente el amperaje (100A, 125A, 200A, etc.)."},
        {name:"¿Se añade carga eléctrica?",sub:"Cocina eléctrica, EV charger, HVAC, boiler u otros electrodomésticos grandes."},
        {name:"¿Cliente quiere medidor eléctrico separado?",sub:"Preguntar directamente al cliente — si es independiente, se necesita un panel 2 en 1 y el actual pasa a ser subpanel."},
        {name:"¿Cliente quiere medidor de gas separado?",sub:"Preguntar directamente al cliente — un nuevo medidor implica un bill separado."},
        {name:"Ubicación actual del panel",sub:"Identificar dónde está instalado hoy."},
        {name:"¿El panel existente será subpanel?",sub:"Confirmar si se convertirá en subpanel de la casa principal."},
        {name:"Espacio para nuevo panel/medidor",sub:"Revisar si hay al menos 3' de clearance disponible."},
        {name:"Subpanel ya cotizado",sub:"Validar con el estimador si el subpanel para la casa principal ya está cotizado."},
        {name:"Reubicación de medidores",sub:"Confirmar con el planner si se requiere mover medidores por falta de espacio o clearance."},
        {name:"Upgrade eléctrico reciente",sub:"Confirmar con el cliente si ya tuvo uno (ej. panel nuevo de 200A)."},
        {name:"Notificar al estimador",sub:"Avisar si hay cambios en la configuración eléctrica o de gas, para ajustar la cotización."}
      ]},
      {n:2,t:"Ir al Portal de SDG&E Builders",note:'Registrarse o iniciar sesión en el portal.<img src="assets/sdge/sdge-step2-portal.png" alt="" style="width:100%;max-width:480px;border-radius:8px;border:1px solid var(--line);margin-top:10px;display:block">',res:[{l:"SDGE Builder Services",u:U.sdge}]},
      {n:3,t:"Bajar hasta «Start an Application»",note:'En la sección Applications, hacer clic en «New Application».<img src="assets/sdge/sdge-step3-start-application.png" alt="" style="width:100%;max-width:480px;border-radius:8px;border:1px solid var(--line);margin-top:10px;display:block">'},
      {n:4,t:"Responder el cuestionario inicial",note:"¿Es un cambio a un servicio existente o una construcción nueva? → Changes to an Existing Service.<br><br>Tipo de servicio → Residential.<br><br>Tipo de propiedad → Single Family Home.<br><br>Tipo de proyecto → Doing a home renovation (seleccionar todo lo que aplique)."},
      {n:5,t:"Llenar Project Details",note:'Dirección del servicio, ciudad, estado y código postal.<br><br>Nombre del proyecto.<br><br>Marcar si el nombre del proyecto es igual a la dirección del servicio.<img src="assets/sdge/sdge-step5-project-details.png" alt="" style="width:100%;max-width:480px;border-radius:8px;border:1px solid var(--line);margin-top:10px;display:block">'},
      {n:6,t:"Definir el tipo de proyecto eléctrico",note:"Project Type → Electric Overhead.<br><br>Tipo de servicio eléctrico solicitado → Service Upgrade (seleccionar todo lo que aplique).<br><br>Indicar si recibieron notificación de undergrounding district o de actualización del panel eléctrico."},
      {n:7,t:"Describir el proyecto",note:'Explicar brevemente el proyecto.<br><br>Indicar si hay hazards en el sitio.<br><br>Dar instrucciones de acceso al sitio (cerca, portón con llave, etc.).<img src="assets/sdge/sdge-step7-describe-project.png" alt="" style="width:100%;max-width:480px;border-radius:8px;border:1px solid var(--line);margin-top:10px;display:block">'},
      {n:8,t:"Llenar Service Details (Electric Information)",note:'Tamaño del panel existente.<br><br>Tamaño del panel nuevo.<br><br>Metraje total del edificio.<br><br>Fase (Single / Three).<br><br>Voltaje (120/240, 120/208, etc.).<img src="assets/sdge/sdge-step8-electric-info.png" alt="" style="width:100%;max-width:480px;border-radius:8px;border:1px solid var(--line);margin-top:10px;display:block">'},
      {n:9,t:"Llenar Contact Information",note:'Datos del Property Owner: nombre legal, email, teléfono y dirección.<br><br>Definir si el Property Owner será el Primary Contact.<img src="assets/sdge/sdge-step9-contact-info.png" alt="" style="width:100%;max-width:480px;border-radius:8px;border:1px solid var(--line);margin-top:10px;display:block">'},
      {n:10,t:"Review & Submit",note:"Revisar toda la información y subir los planos en la sección de Upload Document antes de enviar."}
    ]
  },
  sdgeprocess:{
    kicker:"SDG&E", title:"Proceso de Coordinación SDG&E",
    desc:"Flujo completo de coordinación con SDG&E, desde confirmar el scope hasta el disconnect/reconnect. Este checklist también está disponible en el Binder de cada proyecto.",
    topNote:true, binderBtn:true, checklistTable:true,
    items:[
      {n:1,t:"Confirmar que SDG&E está en nuestro scope",note:"Incluido en la estimación, o aceptado vía Change Order."},
      {n:2,t:"Confirmar con Marco y el PM cuál será el scope de SDG&E",note:"Definir el alcance exacto antes de avanzar con la aplicación."},
      {n:3,t:"Si aplica Temporary Pole",tag:"Preguntar a Marco",note:"Overhead or underground.<br><br>De cuánto es el panel existente.<br><br>Cuánto va a ser la carga del temp pole.<br><br>Saber si es single or three phase.<br><br>Para el temporary pole, hacer submission."},
      {n:4,t:"Si NO aplica Temporary Pole",tag:"Preguntar a Marco",note:"Cuál sería el scope de SDG&E.<br><br>Confirmar existing amps.<br><br>Cuántos meters necesitaríamos."},
      {n:5,t:"Start Application in Builder Portal",note:"Crear la nueva aplicación desde el portal de SDG&E, idealmente en un meeting con el PM (y de preferencia el equipo de Estimate) confirmando los datos. Adjuntar los planos estampados dentro del mismo formulario. Siempre usar la dirección nueva del proyecto.",res:[{l:"Ver los pasos para crearla",u:"#go:sdgeapply"}]},
      {n:6,t:"Follow up 2 weeks after application submission",note:"SDG&E contacta al POC (la PC del proyecto) y envía el Gas / Electric Load Form.<br><br>Llenar los forms de Gas Load y Electric Load — responder los pedidos en el mismo hilo de correo.",res:[{l:"Ver Gas & Electric Load Form",u:U.gasElectricLoadForm}]},
      {n:7,t:"Follow up 2 months after application submission",note:"SDG&E asigna un planner al proyecto. Puede pedir un site visit o una junta con el equipo para resolver dudas."},
      {n:8,t:"Recibir la Work Order (WO) y notificar al PM",note:"En cuanto se emita la Work Order, notificar al PM para que se realice lo correspondiente en el proyecto."},
      {n:9,t:"Esperar a que el PM pida agendar la inspección «Meter Release»",note:"Es obligatoria antes de poder agendar el disconnect/reconnect con la ciudad."},
      {n:10,t:"Con el Meter Release aprobado",note:"Agendar el disconnect/reconnect con SDG&E llamando al (619) 230-7800 / 1-800-411-7343 (Distrito Metro: 858-776-8848).<br><br>Cargarlo al calendario del PM."},
      {n:11,t:"Que el cliente pida el billing application",note:"Y revisar (check) si hay algún fee pendiente — esto es para poder pedir el disconnect/reconnect."},
      {n:12,t:"Antes del disconnect/reconnect",tag:"Requisitos",note:"Es indispensable tener el Meter Release aprobado.<br><br>Y el billing application ya configurado (set up) por el cliente.<br><br>Sin estos dos, no se puede agendar ni realizar el disconnect/reconnect."},
      {n:13,t:"Día del disconnect/reconnect",tag:"Cierre",note:"El PM debe estar presente y avisar cuando se haya completado. A partir de aquí la propiedad queda en condiciones de usar electricidad y gas."}
    ]
  }
};
