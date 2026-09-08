# SOP Dashboard — estructura modular

Antes esto era 1 solo archivo HTML de ~4000 líneas. Ahora está partido así:

```
index.html              ← shell: head, markup, y la lista de <script> en orden
styles.css              ← todo el CSS

data/                   ← CONTENIDO (esto es lo que se edita casi siempre)
  links.js              ← objeto U con todas las URLs (contrato, binder, sdge, etc.)
  projects.js           ← PROJECTS, BINDER_DATA, CITY_BY_PROJECT, ALL_PROJECTS, CLIENT_INFO
  groups-templates.js   ← Vendor Requests + Change Order Templates + tpl* individuales
  groups-construction.js← Solutions, Construction (Home Inspection vive acá), Change Orders, Completion Workflow
  groups-sdge.js        ← SDG&E: status/glosario, aplicación paso a paso, proceso de coordinación
  groups-merge.js        ← junta los 3 groups-*.js de arriba en el objeto GROUPS. Si agregás un groups-*.js nuevo, sumalo acá.
  creds.js              ← Credenciales SDG&E / Otras
  reference.js          ← REF (glosarios/tablas de referencia) + ICONS
  sections.js           ← NAMES + SECTIONS (el menú/mapa de secciones) + HOME

app/                    ← MOTOR (esto casi no se toca, salvo bugs de comportamiento/render)
  utils.js              ← builders de steps/substeps/bullets — ACÁ vive la numeración jerárquica (3.1, 3.1.1...)
  render.js             ← dispatch de cada tipo de sección + los builders de cada página
  home.js               ← landing page
  search-router.js      ← buscador global + router de #hash
  pc.js                 ← selección de PC al iniciar + "mis proyectos"
  modals.js             ← modales de Change Order, Schedule Inspection, Vendor Request
```

## Regla simple para saber dónde tocar

- ¿Vas a **agregar/editar contenido** de un proceso, template, credencial o proyecto? → un archivo dentro de `data/`. Nunca vas a necesitar tocar `app/`.
- ¿Un paso de Home Inspection / Construction / Completion? → `data/groups-construction.js`.
- ¿Algo de SDG&E (glosario, aplicación, coordinación)? → `data/groups-sdge.js`.
- ¿Un template de mensaje o vendor request? → `data/groups-templates.js`.
- ¿Un link roto o URL vieja? → `data/links.js`.
- ¿Un proyecto nuevo, cambio de PC/PM, binder? → `data/projects.js`.
- ¿Se ve raro el diseño (colores, tamaños, espaciado)? → `styles.css`.
- ¿Algo no numera bien / el layout de un paso se rompe? → `app/utils.js` (ahí vive `flowHTML`, `subFlowItemHTML`, etc.)

## Importante: el orden de los `<script>` en index.html importa

Los `data/*.js` se cargan ANTES que `app/*.js` porque el motor los necesita ya armados
(por ejemplo, `SECTIONS` usa `PROJECTS_MINE.length` apenas arranca). Si algún día
agregás un archivo nuevo, respetá el orden: primero data, después app, y `groups-merge.js`
siempre después de los `groups-*.js` que junta.

## Deploy

Es un sitio estático común — subís la carpeta completa a Cloudflare Pages tal cual,
sin build step. `index.html` ya apunta a los archivos con rutas relativas.
