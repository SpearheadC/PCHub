/* Datos de proyectos: lista maestra, binder, ciudades, info de cliente */
const slug = s => (s||'').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'');
const PROJECTS = [
  {name:"435 Via Maggiore", address:"435 Via Maggiore", client:"Carlos Hermida", lang:"en"},
  {name:"1145 22nd St — Multifamily", address:"1145 22nd St", client:"Gabriel Grossman", lang:"es", gender:"m"},
  {name:"1145 22nd St — Renovation", address:"1145 22nd St", client:"Gabriel Grossman", lang:"en"},
  {name:"1921 Felicita Rd.", address:"1921 Felicita Rd.", client:"Donald Dumond", lang:"en"},
  {name:"1921 Felicita Rd. — Renovation", address:"1921 Felicita Rd.", client:"Donald Dumond", lang:"en"},
  {name:"3667 Van Dyke — Solutions", address:"3667 Van Dyke", client:"Tiffiney", lang:"en"},
  {name:"3688 Villa Terrace", address:"3688 Villa Terrace", client:"Gabriel Freifeld", lang:"es", gender:"m"},
  {name:"3755 Florence St", address:"3755 Florence St", client:"Keith Robinson", lang:"en"},
  {name:"4011 Atascadero Dr", address:"4011 Atascadero Dr", client:"Joe and Caitriona", lang:"en"},
  {name:"4565 38th", address:"4565 38th", client:"Sydney Daily - Mathew Holt", lang:"en"},
  {name:"4595 Excalibur Way", address:"4595 Excalibur Way", client:"Maricel Rubio", lang:"es", gender:"f"},
  {name:"5014-5016 Chaparral Way", address:"5014-5016 Chaparral Way", client:"Christina Lorusso", lang:"en"},
  {name:"8518 Macawa Ave — ADUs", address:"8518 Macawa Ave", client:"Jennifer Nguyen", lang:"en"},
  {name:"8518 Macawa Ave — Solutions", address:"8518 Macawa Ave", client:"Jennifer Nguyen", lang:"en"},
  {name:"8642 Macawa Ave", address:"8642 Macawa Ave", client:"Jennifer Nguyen", lang:"en"},
  {name:"809-811 Island Ct", address:"809 Island Ct San Diego, CA 92109", client:"David Lee", lang:"en"},
  {name:"5920 Lauretta St", address:"5920 Lauretta St", client:"Chris Jackson", lang:"en"},
  {name:"7137 Fontaine Pl", address:"7137 Fontaine Pl", client:"Amber Alatorre", lang:"en"}
];

/* ---- Binder data cargado manualmente por proyecto (leído del Google Sheet del Binder) ---- */
const BINDER_DATA = {
  "1145 22nd St — Multifamily": {
    prj: "",
    pmts: [
      {label:"Building PMT",     value:"PMT-3254223"},
      {label:"Mechanical PMT",   value:"PMT-3254226"},
      {label:"Electrical PMT",   value:"PMT-3254225"},
      {label:"Plumbing PMT",     value:"PMT-3254227"}
    ],
    url: "https://docs.google.com/spreadsheets/d/1XP9oTqpfxFweQpWAdoljZTgPp_V0viL3U6-gOnmhSVU/edit?usp=sharing"
  },
  "809-811 Island Ct": {
    prj: "PRJ-1128818",
    pmts: [
      {label:"Building PMT",     value:"PMT-3335845"},
      {label:"Mechanical PMT",   value:"—"},
      {label:"Electrical PMT",   value:"—"},
      {label:"Plumbing PMT",     value:"—"}
    ]
  },
  "5920 Lauretta St": {
    prj: "1129382",
    pmts: [
      {label:"Building PMT",     value:"PMT-3333473"},
      {label:"Mechanical PMT",   value:"PMT-3333482"},
      {label:"Electrical PMT",   value:"PMT-3333483"},
      {label:"Plumbing PMT",     value:"PMT-3333484"}
    ]
  },
  "7137 Fontaine Pl": {
    prj: "1126196",
    pmts: [
      {label:"Combination PMT",  value:"PMT-3323794"}
    ]
  }
};

/* ---- Ciudad por proyecto (de job_list_all.xls) ---- */
const CITY_BY_PROJECT = {
  "435 Via Maggiore": "Chula Vista",
  "1145 22nd St — Multifamily": "San Diego",
  "1145 22nd St — Renovation": "San Diego",
  "1921 Felicita Rd.": "El Cajon",
  "1921 Felicita Rd. — Renovation": "Escondido",
  "3667 Van Dyke — Solutions": "San Diego",
  "3688 Villa Terrace": "San Diego",
  "3755 Florence St": "Redwood City",
  "4565 38th": "San Diego",
  "4595 Excalibur Way": "San Diego",
  "5014-5016 Chaparral Way": "San Diego",
  "8518 Macawa Ave — ADUs": "Chula Vista",
  "8518 Macawa Ave — Solutions": "San Diego",
  "8642 Macawa Ave": "San Diego",
  "809-811 Island Ct": "San Diego",
  "5920 Lauretta St": "San Diego",
  "7137 Fontaine Pl": "San Diego"
};

const ALL_PROJECTS_RAW = [
  {name:"1254 15th St",client:"Daniel Beer",pc:"Daniela",pm:"Daniel B",pipeline:"Construction",type:null,stage:"Demo",sdge:"Pre-Construction"},
  {name:"1145 22nd St - Renovation",client:"Gabriel Grossman",pc:"Valentina",pm:"TBD",pipeline:"Construction",type:"Residential Reno",stage:null,sdge:"Initiation - All Req Info"},
  {name:"3667 Van Dyke - Solutions",client:"Tiffiney Welles",pc:"Sofia",pm:null,pipeline:"Solutions",type:"Duplex",stage:null,sdge:null},
  {name:"7137 Fontaine Pl",client:"Amber Alatorre",pc:"Aida",pm:"Daniel B",pipeline:"Construction",type:"Garage Conversion",stage:"Final",sdge:"Construction - SDG&E"},
  {name:"1113 Flamingo Ave",client:"Aymen Saad",pc:"Sofia",pm:"TBD",pipeline:"Solutions",type:"Multifamily",stage:null,sdge:null},
  {name:"809-811 Island Ct",client:"David Lee",pc:"Aida",pm:"Abelino B",pipeline:"Construction",type:"Residential Reno",stage:"Planning",sdge:null},
  {name:"3326 Upas St",client:"Jennifer Nguyen",pc:"Aida",pm:"Daniel B",pipeline:"Construction",type:"Multifamily",stage:"Planning",sdge:"SDGE Completed"},
  {name:"2547 Imperial Ave",client:"Eduardo Iraheta",pc:"Sofia",pm:"TBD",pipeline:"Construction",type:"Multifamily",stage:null,sdge:null},
  {name:"2735 Teresita St Renovation",client:"Backyard SD NoLa LLC",pc:"Daniela",pm:"Jose L",pipeline:"Construction",type:"Residential Reno",stage:"Rough",sdge:null},
  {name:"4565 38th St",client:"Matthew Holt / Sydney Daily",pc:"Valentina",pm:"Abelino B",pipeline:"Construction",type:"Multifamily",stage:"Foundation",sdge:null},
  {name:"4455-59 Dawson Ave",client:"Clayton Henson",pc:"Daniela",pm:"Jose L",pipeline:"Construction",type:"Dettached ADU",stage:"Final",sdge:"Pre-Construction - Inspection"},
  {name:"3688 Villa Terrace",client:"Gabriel Freifeld",pc:"Valentina",pm:"Jose L",pipeline:"Construction",type:"Garage Conversion",stage:"Drywall",sdge:"Not required"},
  {name:"1921 Felicita Rd",client:"Donald DuMond",pc:"Valentina",pm:"Jose L",pipeline:"Construction",type:"Dettached ADU",stage:"Final",sdge:"SDGE Completed"},
  {name:"4333 Florida St -Above the garage",client:"Joseph Mizrachi",pc:"Aida",pm:"TBD",pipeline:"Solutions",type:"Garage Conversion",stage:null,sdge:"Not required"},
  {name:"1145 22nd St - Multifamily",client:"Gabriel Grossman",pc:"Valentina",pm:"Daniel B",pipeline:"Construction",type:"Multifamily",stage:"Drywall",sdge:"Work Request - Work Order"},
  {name:"5920 Lauretta St",client:"Chris Jackson",pc:"Aida",pm:"Daniel B",pipeline:"Construction",type:"Multifamily",stage:"On Hold",sdge:"Pre-Construction - Permits"},
  {name:"2534 NYE St",client:"Alexander Limpin",pc:"Sofia",pm:"Daniel B",pipeline:"Construction",type:"Multifamily",stage:"Finishes",sdge:"Construction - SDG&E"},
  {name:"4595 Excalibur Way",client:"Maricel Rubio",pc:"Valentina",pm:"Daniel B",pipeline:"Construction",type:"Residential Reno",stage:"On Hold",sdge:null},
  {name:"3082 K St",client:"Brian Mahone",pc:"Daniela",pm:"Jose L",pipeline:"Construction",type:"Dettached ADU",stage:"Finishes",sdge:"SDGE Completed"},
  {name:"2828 Dove St",client:"Mariana & Alvaro",pc:"Aida",pm:"Jose L",pipeline:"Construction",type:"Residential Reno",stage:"Final",sdge:"SDGE Completed"},
  {name:"8642 Macawa Ave",client:"Jennifer Nguyen",pc:"Valentina",pm:"Daniel B",pipeline:"Construction",type:"Dettached ADU",stage:"Finishes",sdge:"Work Request - Field Visit"},
  {name:"435 Via Maggiore",client:"Carlos Hermida",pc:"Valentina",pm:"Abelino B",pipeline:"Construction",type:"Attached ADU",stage:"Rough",sdge:null},
  {name:"4574 North Ave",client:"Tiffiney Welles",pc:"Sofia",pm:"Daniel B",pipeline:"Construction",type:"Duplex",stage:"Drywall",sdge:"Work Request - Work Order"},
  {name:"3712 Florida St",client:"Chris Jackson",pc:"Daniela",pm:"Abelino B",pipeline:"Construction",type:"Multifamily",stage:"Framing",sdge:"Work Request - Field Visit"},
  {name:"4151 Cherokee Avenue",client:"Matt Holt",pc:"Aida",pm:"Abelino B",pipeline:"Construction",type:"Multifamily",stage:"Rough",sdge:"Work Request - Work Order"},
  {name:"3852 39th Development (north)",client:"Matthew Holt",pc:"Daniela",pm:"Jorge C",pipeline:"Construction",type:"Multifamily",stage:"Rough",sdge:"Work Request - Work Order"},
  {name:"3842 39th Development (south)",client:"Matthew Holt",pc:"Daniela",pm:"Jorge C",pipeline:"Construction",type:"Multifamily",stage:"Rough",sdge:"Pre-Construction - Permits"},
  {name:"2059 Garnet Ave",client:"Chris Luna",pc:"Aida",pm:"Daniel B",pipeline:"Construction",type:"Multifamily",stage:"On Hold",sdge:"Pre-Construction - Inspection"},
  {name:"1628 Orange St",client:"Keith Robinson",pc:"Sofia",pm:"Jorge C",pipeline:"Construction",type:"Multifamily",stage:"Finishes",sdge:"Pre-Construction - Inspection"},
  {name:"3755 Florence St",client:"Keith Robinson",pc:"Valentina",pm:"Jorge C",pipeline:"Construction",type:"Garage Conversion",stage:"On Hold",sdge:"Construction - SDG&E"},
  {name:"244 Alvarado St - Solutions",client:"Benjamin Savedra",pc:"Daniela",pm:null,pipeline:"Solutions",type:"Commercial Reno",stage:null,sdge:null},
  {name:"2735 Teresita St ADUs",client:"Backyard SD NoLa LLC",pc:"Daniela",pm:null,pipeline:"Solutions",type:"Dettached ADU",stage:null,sdge:null},
  {name:"8518 Macawa Ave ADU's - Solutions",client:"Jennifer Nguyen",pc:"Valentina",pm:null,pipeline:"Solutions",type:"Dettached ADU",stage:null,sdge:"Initiation - All Req Info"},
  {name:"8518 Macawa Ave - Solutions",client:"Jennifer Nguyen",pc:"Valentina",pm:null,pipeline:"Solutions",type:"Dettached ADU",stage:null,sdge:"Initiation - All Req Info"},
  {name:"4810 Jumano Ave",client:"Christina Lorusso",pc:"Daniela",pm:"Daniel B",pipeline:"Construction",type:"Duplex",stage:null,sdge:null},
  {name:"4627 55th St - Solutions",client:"Christina Lorusso",pc:"Aida",pm:"TBD",pipeline:"Solutions",type:"Attached ADU",stage:null,sdge:null},
  {name:"4837 Iroquois Ave",client:"Christina Lorusso",pc:"Aida",pm:"Daniel B",pipeline:"Construction",type:"Dettached ADU",stage:"On Hold",sdge:"Work Request - Work Order"},
  {name:"4316 Olney St",client:"Brent Edwards",pc:"Aida",pm:"Daniel B",pipeline:"Construction",type:"Dettached ADU",stage:"Drywall",sdge:"Pre-Construction - Inspection"},
  {name:"5014-5016 Chaparral Way",client:"Christina Lorusso",pc:"Valentina",pm:"Daniel B",pipeline:"Construction",type:"Attached ADU",stage:"Final",sdge:null}
];

/* Enlace a Notion — solo cargado para los 3 proyectos que ya estaban vinculados; el resto no tiene link todavía. */
const NOTION_LINKS = {
  "8518 Macawa Ave - Solutions":"https://app.notion.com/45baded1524a82d7abee01eba4d9ca5a",
  "8518 Macawa Ave ADU's - Solutions":"https://app.notion.com/b12aded1524a829d9fbe01e44d8f86c4",
  "3667 Van Dyke - Solutions":"https://app.notion.com/888aded1524a8270a184816dfc88b9ce"
};

const ALL_PROJECTS = ALL_PROJECTS_RAW.map(p=>({
  key:"proj-"+slug(p.name),
  name:p.name,
  client:p.client||"—",
  pc:p.pc,
  pm:p.pm,
  phase:p.stage?[p.stage]:(p.type?[p.type]:[]),
  pipeline:p.pipeline,
  status:p.sdge||null,
  url:NOTION_LINKS[p.name]||null
}));

/* Proyectos de la PC actualmente seleccionada (se recalcula al elegir/cambiar PC en app/pc.js → refreshMyProjects()). */
let PROJECTS_MINE = [];

const CLIENT_INFO = {
  "809-811 Island Ct": {name:"David Lee", email:"davidhlee116@gmail.com", phone:"310-800-0766"}
};

