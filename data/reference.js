/* REF: glosarios, definiciones, tablas de referencia (SDG&E status, etc.) + ICONS */
const REF = {
  templates:{toggleGroups:true,groups:[
    {sec:"Vendor Request Templates",items:[
      {name:"Vendor Requests",sub:"Mensajes para pedir propuestas a vendors, por disciplina.",url:"#go:vendorRequests"}
    ]},
    {sec:"Construction Templates",items:[
      {name:"Contract Template",sub:"Usado en «Send Contract».",url:U.contract},
      {name:"Preliminary Notice Email",sub:"Solicitud de información para el Preliminary Notice.",url:"#go:tplPrelimNotice"},
      {name:"Completion Message",sub:"Mensaje de cierre de proyecto al cliente.",url:"#go:tplCompletion"},
      {name:"Change Order Templates",sub:"Mensajes de Change Order listos para copiar y personalizar.",url:"#go:msgTemplates"},
      {name:"RFI Message",sub:"Solicitud y respuesta de información técnica (RFI).",url:"#go:tplRfi"}
    ]},
    {sec:"Solution Templates",items:[
      {name:"Initial Proposal Package",sub:"Usado en «Initial Proposal».",url:U.initialProposalPkg},
      {name:"Company Portfolio",sub:"Usado en «Company Portfolio».",url:U.companyPortfolio},
      {name:"Final Proposal Package",sub:"Usado en «Final Proposal Package».",url:U.finalProposalPkg},
      {name:"Contract Template",sub:"Usado en «Contract».",url:U.contract},
      {name:"Proposal Template",sub:"Mensaje para enviar una propuesta nueva.",url:"#go:tplProposal"},
      {name:"Proposal Follow-up",sub:"Seguimiento de una propuesta enviada al cliente.",url:"#go:tplProposalFollowup"}
    ]},
    {sec:"Others",items:[
      {name:"Binder Proposal",sub:"Hoja base del binder por proyecto.",url:U.binderSheet}
    ]}
  ]},
  cityaccess:{table:true,noSearch:true,sharedSearch:true,mode:'linkcred',linkLabel:"Abrir portal",credLabel:"Ver credenciales",groups:[
    {sec:"Portales de la Ciudad",items:[
      {name:"Accela (San Diego)",sub:"Permisos e inspecciones.",url:U.accela,credUrl:U.contactsSheet},
      {name:"Imperial Beach",sub:"Portal de self-service (Tyler).",url:U.imperial,credUrl:U.contactsSheet},
      {name:"Escondido",sub:"Building department.",url:U.escondido,credUrl:U.contactsSheet},
      {name:"SDG&E My Project Center",sub:"Requests y work orders.",url:U.sdge,credUrl:U.contactsSheet},
      {name:"Cheers",url:U.cheers,credUrl:U.contactsSheet},
      {name:"Inspections Email",sub:"Correo para agendar inspecciones.",url:U.emailInsp,credUrl:U.contactsSheet},
      {name:"Otras ciudades",sub:"Links del resto de las ciudades en el Binder de cada proyecto.",url:U.binderSheet}
    ]}
  ],table2:{mode:'inspect',noSearch:true,groups:[
    {sec:"Inspecciones por Ciudad — Cuándo llamar",items:[
      {name:"San Diego",sub:"Antes de la inspección final, revisa la pestaña «Conditions» en Accela para ver holds.",url:"https://aca-prod.accela.com/SANDIEGO/Default.aspx",vpn:false,rows:[{k:"Agendar",v:"858 581 7111 · Lun–Vie 7:00 AM–3:00 PM"},{k:"Horario",v:"Llamar al inspector asignado 7:15–7:45 AM el día de la inspección"}]},
      {name:"National City",sub:"No trabajan los viernes. Solicitar con 24 hs de anticipación.",url:"https://www.nationalcityca.gov/government/community-development/building/building-inspections",vpn:false,rows:[{k:"Horario oficina",v:"7:00–8:30 AM y 5:00–6:00 PM"}]},
      {name:"City of Vista",sub:"Llenar el form online o llamar antes de las 3:30 PM para el día siguiente.",url:"https://www.vista.gov/departments/community-development/permits-forms/building-inspection-request",vpn:false,rows:[{k:"Agendar",v:"760 639 6106 · antes de 3:30 PM"},{k:"Horario",v:"7:30–8:00 AM el día de la inspección"}]},
      {name:"Escondido",sub:"Solicitar antes de las 3 PM.",url:"https://escondido.gov/215/Building",vpn:false,rows:[{k:"Agendar",v:"En la página web"},{k:"Horario",v:"Ver el link después de las 9 AM"}]},
      {name:"Carlsbad",sub:"Solicitar antes de las 2 PM.",url:"https://www.carlsbadca.gov/departments/community-development/building/inspections/request-a-building-inspection",vpn:false,rows:[{k:"Horario",v:"Ver en el link después de las 8 AM"}]},
      {name:"Spring Valley (San Diego County)",sub:"Se puede agendar por portal, texto o teléfono.",url:"https://publicservices.sandiegocounty.gov/CitizenAccess/Default.aspx",vpn:false,rows:[{k:"Horario",v:"Actualizado entre 7:40 y 8:15 AM"}]},
      {name:"Chula Vista",sub:"Agendar por Accela o por teléfono.",url:"https://aca-prod.accela.com/CHULAVISTA/Default.aspx",vpn:true,rows:[{k:"Agendar",v:"619 409 5434"},{k:"Horario",v:"Accela después de 8 AM"}]},
      {name:"Imperial Beach",sub:"Portal de self-service (Tyler).",url:U.imperial,vpn:false,rows:[]}
    ]}
  ]},extraGroups:[
    {sec:"Cómo encontrar el PMT (Accela)",items:[
      {name:"Por PRJ",sub:"Project Info → Related Records → ahí aparecen los PMT asociados."},
      {name:"Inspection Card",sub:"Si no aparece en Related Records, se ve en la inspection card."},
      {name:"Por dirección",sub:"DSD Permits → Search → Street No. + Street Name → Combination Building Permit."}
    ]}
  ]},
  row:{groups:[]},
  constructionchanges:{groups:[]},

  ccEmails:{copyList:true,groups:[
    {sec:"Emails to add to CC",items:[
      {name:"jorge@spearhead.construction",url:"mailto:jorge@spearhead.construction"},
      {name:"leo@spearhead.construction",url:"mailto:leo@spearhead.construction"},
      {name:"marco@spearhead.construction",url:"mailto:marco@spearhead.construction"},
      {name:"roseli@spearhead.construction",url:"mailto:roseli@spearhead.construction"},
      {name:"sofia@spearhead.construction",url:"mailto:sofia@spearhead.construction"},
      {name:"sara@spearhead.construction",url:"mailto:sara@spearhead.construction"},
      {name:"daniela@spearhead.construction",url:"mailto:daniela@spearhead.construction"}
    ]}
  ]},
  pmcontacts:{table:true,noNoteCol:true,groups:[
    {sec:"Project Managers",items:[
      {name:"Jorge Cuevas",rows:[{k:"Tel",v:"1 (619) 244-1909"},{k:"Mail",v:"jorge@spearhead.construction"}]},
      {name:"Daniel Blanco",rows:[{k:"Tel",v:"(808) 200-9487"}]},
      {name:"Marco Guzman",rows:[{k:"Tel",v:"(619) 396-9645"},{k:"Mail",v:"marco@spearhead.construction"}]},
      {name:"Jose Lopez",rows:[{k:"Tel",v:"619-830-1919"}]},
      {name:"Abelino",rows:[{k:"Tel",v:"1 (619) 897-1131"}]}
    ]}
  ]},
  pccontacts:{table:true,noNoteCol:true,groups:[
    {sec:"Project Coordinators",items:[
      {name:"Daniela",rows:[{k:"Tel",v:"(619) 320-8178"},{k:"Mail",v:"daniela@spearhead.construction"}]},
      {name:"Valentina",rows:[{k:"Tel",v:"(619) 320-8144"}]},
      {name:"Sofia",rows:[{k:"Mail",v:"sofia@spearhead.construction"}]},
      {name:"Aida",rows:[{k:"Mail",v:"aida@spearhead.construction"}]}
    ]}
  ]},
  inspectors:{table:true,groups:[
    {sec:"San Diego",items:[
      {name:"David Gan",rows:[{k:"Tel",v:"619 980 7182"}]},
      {name:"Israel Ornelas",rows:[{k:"Tel",v:"619 990 0761"}]},
      {name:"Jasmin Nayab",rows:[{k:"Tel",v:"619 533 4860"}]},
      {name:"John Alaimo",rows:[{k:"Tel",v:"619 687 5946"}]},
      {name:"Lizbeth Medina",sub:"Proyecto: North Ave · solo recibe textos.",rows:[{k:"Tel",v:"619 980 1402"}]},
      {name:"Ovidio Alvarez",rows:[{k:"Tel",v:"619 687 5963"}]},
      {name:"Patrick Long (1)",rows:[{k:"Tel",v:"619 307 5301"}]},
      {name:"Patrick Long (2)",rows:[{k:"Tel",v:"858 627 2063"}]},
      {name:"Paul Blauvelt",rows:[{k:"Tel",v:"619 666 4297"}]},
      {name:"Ricardo Alvarez",rows:[{k:"Tel",v:"619 699 1053"}]},
      {name:"Ricardo Ordonez",sub:"Proyecto: Nye.",rows:[{k:"Tel",v:"619 307 4604"}]},
      {name:"Richard Gable",rows:[{k:"Tel",v:"858 573 1223"}]},
      {name:"Carl Paiz-Snodgrass",sub:"Proyecto: 8642 Macawa.",rows:[{k:"Tel",v:"619 533 3636"}]},
      {name:"Tomas Barkle",rows:[{k:"Tel",v:"619 687 5979"}]},
      {name:"Chad Menges",rows:[{k:"Tel",v:"858 627 2069"}]},
      {name:"Douglas Arnold",sub:"Desk / celular.",rows:[{k:"Desk",v:"858 627 2029"},{k:"Cel",v:"619 218 4267"}]},
      {name:"Enrique",sub:"SDGE inspector.",rows:[{k:"Tel",v:"858 654 1226"}]},
      {name:"Gerardo Baltazar",rows:[{k:"Tel",v:"619 481 8289"}]}
    ]},
    {sec:"Otras ciudades",items:[
      {name:"Shawn Ahlin",sub:"Chula Vista.",rows:[{k:"Tel",v:"619 409 3827"}]},
      {name:"Daniel Harrison",rows:[{k:"Tel",v:"858 627 2066"}]},
      {name:"Jamie Anderson",rows:[{k:"Tel",v:"619 994 8730"}]}
    ]}
  ]},
  citynumbers:{table:true,groups:[
    {sec:"Escondido",items:[
      {name:"Inspections desk",sub:"Para agendar inspecciones o hacer preguntas — EXT 1.",rows:[{k:"Tel",v:"760 839 4647"}]},
      {name:"Tech department",sub:"Robin — para responder preguntas sobre el portal.",rows:[{k:"Tel",v:"760 839 4053"}]}
    ]}
  ]},
  clients:{table:true,langCol:true,groups:[
    {sec:"A – G",items:[
      {name:"Adan Tinoco",sub:"Paradise Mountain Rd",rows:[{k:"Mail",v:"infotinoco@yahoo.com"}]},
      {name:"ADU Geeks",sub:"3023 E 10th St",rows:[{k:"Mail",v:"keith@adugeeks.com"}]},
      {name:"Agustin Navarro",sub:"4406 40th",rows:[{k:"Mail",v:"ANavarro@mesh-development.com"},{k:"Tel",v:"619 888 7502"}]},
      {name:"Alexander Limpin",sub:"2534 NYE St",rows:[{k:"Mail",v:"alexlimpin@hotmail.com"},{k:"Tel",v:"619 777 9674"}]},
      {name:"Alfredo Hernandez",sub:"7796 Woodbine Way",rows:[{k:"Mail",v:"fhernandez467@gmail.com"},{k:"Tel",v:"619 598 6350"}]},
      {name:"Alma Guzman",sub:"3852 39th DEVELOPMENT",rows:[{k:"Mail",v:"alma@m1builds.com"}]},
      {name:"Alvaro Gallego",sub:"2828 Dove St",rows:[{k:"Mail",v:"algallego2@gmail.com"}]},
      {name:"Amber Alatorre",sub:"7137 Fontaine Pl",rows:[{k:"Tel",v:"619 948 0919"}]},
      {name:"Ari Colton",sub:"5203 Nutmeg St",rows:[{k:"Mail",v:"aricolton@gmail.com"},{k:"Tel",v:"619 889 8490"}]},
      {name:"Armando Marin",sub:"2925 Little Ln",rows:[{k:"Mail",v:"armarin619@gmail.com"}]},
      {name:"Ayaz Usman",sub:"1754 Hanford Dr",rows:[{k:"Mail",v:"usman_ayaz@hotmail.com"}]},
      {name:"Aymen Saad",sub:"1113 Flamingo Ave",rows:[{k:"Mail",v:"aymenalmosawi@gmail.com"},{k:"Tel",v:"623 760 2998"}]},
      {name:"Backyard SD NoLa LLC",sub:"2735 Teresita St Renovation",rows:[{k:"Mail",v:"coby@livebackyard.co"},{k:"Tel",v:"1 914 714 9581"}]},
      {name:"Bejamin Saavedra",sub:"244 Alvarado St",rows:[{k:"Mail",v:"benjaminsaavedra1993@gmail.com"}]},
      {name:"Benjamin Murray",sub:"6877 Glenroy St",rows:[{k:"Mail",v:"benjaminmurrayrealtor@gmail.com"},{k:"Tel",v:"530 515 9508"}]},
      {name:"Benjamin Savedra",sub:"244 Alvarado St — Solutions"},
      {name:"Bonnie Foltz",sub:"222 Kearney Ct"},
      {name:"Braulio Gallegos",sub:"6080 Dehesa Rd",rows:[{k:"Mail",v:"brauliogallegos62@yahoo.com"}]},
      {name:"Brent Edwards",sub:"4316 Olney St",rows:[{k:"Mail",v:"brent@brentthebroker.com"},{k:"Tel",v:"619 550 8070"}]},
      {name:"Brian Mahone",sub:"3082 K St",rows:[{k:"Mail",v:"bmahon@gmail.com"},{k:"Tel",v:"858 382 1201"}]},
      {name:"Brian Yui",sub:"343 Lansing Cir",rows:[{k:"Mail",v:"byui@houserebate.com"}]},
      {name:"Bryan Mione",sub:"3852 39th DEVELOPMENT",rows:[{k:"Mail",v:"bryan@m1builds.com"}]},
      {name:"Carlos Hermida",sub:"435 Via Maggiore",lang:"en",rows:[{k:"Mail",v:"carlos.hermida@dragontrade.mx"},{k:"Tel",v:"619 955 7730 / 619 816 6062"}]},
      {name:"Casita ADU",sub:"2023 Rancho Corte",rows:[{k:"Mail",v:"cherie.gilbert52@gmail.com"}]},
      {name:"Chad",sub:"Solutions - 4627 55th St",rows:[{k:"Mail",v:"chad@danneckerandassociates.com"}]},
      {name:"Chris Jackson",sub:"5920 Lauretta St",rows:[{k:"Tel",v:"801 960 6118"},{k:"Mail",v:"cjackson@summitcapitalventure.com"}]},
      {name:"Chris Luna",sub:"2059 Garnet Ave",rows:[{k:"Mail",v:"lunachris4@gmail.com"},{k:"Tel",v:"916 397 4367"}]},
      {name:"Christina Lorusso",sub:"4837 Iroquois Ave",rows:[{k:"Mail",v:"christinalorusso23@gmail.com"},{k:"Tel",v:"858 524 9649"}]},
      {name:"CJ Johnson",sub:"5607 Alleghany St",rows:[{k:"Mail",v:"carrinjohnson@lifehousesd.com"}]},
      {name:"Clayton Henson",sub:"4455-59 Dawson Ave",rows:[{k:"Mail",v:"crhenson@gmail.com"},{k:"Tel",v:"423 618 6293"}]},
      {name:"Daniel Beer",sub:"1254 15th St",rows:[{k:"Mail",v:"dan@beerhometeam.com"},{k:"Tel",v:"858 771 2848"}]},
      {name:"David Lyons",sub:"1820 Carmelina Dr",rows:[{k:"Mail",v:"dlyons7148@gmail.com"},{k:"Tel",v:"720 252 7148"}]},
      {name:"Dawn Carvajal",sub:"4176 40th St",rows:[{k:"Mail",v:"dawn@thewildthymecompany.com"}]},
      {name:"Diana Lee",sub:"4803 Elsa Rd",rows:[{k:"Mail",v:"leed99@gmail.com"},{k:"Tel",v:"919 820 9777"}]},
      {name:"Dinna Domdom",sub:"3326 State St",rows:[{k:"Mail",v:"dinnadomdom@gmail.com"}]},
      {name:"Donald Asbert",sub:"4870 Mt Alifan Dr — Bathroom",rows:[{k:"Mail",v:"dasbert06@gmail.com"},{k:"Tel",v:"925 565 0655"}]},
      {name:"Donald DuMond",sub:"1921 Felicita Rd",rows:[{k:"Mail",v:"vzwddd@gmail.com"}]},
      {name:"Doug Gutierrez",sub:"3410 Valley Rd",rows:[{k:"Mail",v:"realestatebydj@gmail.com"}]},
      {name:"Dwell West Homes",sub:"642 Jacks Creek Rd",rows:[{k:"Mail",v:"ryan@dwellwesthomes.com"}]},
      {name:"Eduardo Iraheta",sub:"2547 Imperial Ave",rows:[{k:"Mail",v:"irahetasllc@gmail.com"}]},
      {name:"Evan Stamps",sub:"4177 Myrtle Ave"},
      {name:"Gabriel Freifeld",sub:"3688 Villa Terrace",lang:"es",rows:[{k:"Mail",v:"gabrielfreifeld@gmail.com"},{k:"Tel",v:"858 750 5371"}]},
      {name:"Gabriel Grossman",sub:"1145 22nd St — Multifamily",lang:"es",rows:[{k:"Tel",v:"424 394 8884"},{k:"Mail",v:"gabriel@preflexinc.com"}]},
      {name:"Garrett Mcanulla",sub:"4163 39th St",rows:[{k:"Mail",v:"ghmcanulla@gmail.com"}]},
      {name:"Gary Files",sub:"4838 Fir St",rows:[{k:"Mail",v:"gmf411@gmail.com"},{k:"Tel",v:"917 576 9494"}]},
      {name:"GG Homes",sub:"2813 Cottingham St",rows:[{k:"Mail",v:"diego@gghomessd.com"}]},
      {name:"Guy Madar",sub:"845 Sapphire St",rows:[{k:"Mail",v:"guycreativednb@gmail.com"}]}
    ]},
    {sec:"H – M",items:[
      {name:"Heather Sandison",sub:"6750 Murray Park Dr",rows:[{k:"Mail",v:"teri@terisandison.com"},{k:"Tel",v:"858 354 9024"}]},
      {name:"Israel Kravzov",sub:"12735 Via Terceto",rows:[{k:"Mail",v:"ikravzov@gmail.com"}]},
      {name:"James Moore",sub:"733 Roca Rd. - Solutions",rows:[{k:"Mail",v:"jbmoore.jbm@gmail.com"}]},
      {name:"Janice Fletcher",sub:"4998 Mount Frissell Dr — Renovation",rows:[{k:"Tel",v:"858 395 2279"},{k:"Mail",v:"hapajin@hotmail.com"}]},
      {name:"Jared Bauman",sub:"5625 Gables St",rows:[{k:"Mail",v:"bauman.jared.michael@gmail.com"},{k:"Tel",v:"858 344 3020"}]},
      {name:"Jason Steward",sub:"3325 Cherokee Ave",rows:[{k:"Mail",v:"jason@ssconsultinggroup.com"}]},
      {name:"Jeanne Liebel",sub:"3032 Skipper St",rows:[{k:"Mail",v:"jliebel.re@gmail.com"},{k:"Tel",v:"310 650 5985"}]},
      {name:"Jennifer Nguyen",sub:"8518 Macawa Ave",lang:"en",rows:[{k:"Mail",v:"nguyenjennifer023@gmail.com"},{k:"Tel",v:"510 512 6424"}]},
      {name:"Jeremy Greene-Taub",sub:"1239 N Citrus Ave",rows:[{k:"Mail",v:"1239ncitrus@gmail.com"},{k:"Tel",v:"631 624 1884"}]},
      {name:"Jessica Collins",sub:"3723 Mississippi St",rows:[{k:"Mail",v:"jessycolin@gmail.com"},{k:"Tel",v:"858 242 0124"}]},
      {name:"Joel Hubbard",sub:"4109 69th St",rows:[{k:"Mail",v:"Joeljhubbard@gmail.com"},{k:"Tel",v:"775 247 2576"}]},
      {name:"Jon Melicharek",sub:"317 Palm Dr",rows:[{k:"Mail",v:"jon@casitaadu.com"}]},
      {name:"Jorge J Cuevas",sub:"6805 Radio Dr"},
      {name:"Joseph Mizrachi",sub:"4333 Florida St — Renovation",rows:[{k:"Mail",v:"jmizrachi1@gmail.com"},{k:"Tel",v:"619 534 7564"}]},
      {name:"Josh Giordani",sub:"2477 E Finley Rd",rows:[{k:"Mail",v:"josh@joshgiordani.com"}]},
      {name:"Joshua Jeffery",sub:"1036 B Avenue",rows:[{k:"Mail",v:"jjj97804@live.com"}]},
      {name:"Josue Vera",sub:"1145 22nd St - Multifamily",rows:[{k:"Mail",v:"jvera@preflexinc.com"}]},
      {name:"Keith Robinson",sub:"3755 Florence St",lang:"en",rows:[{k:"Mail",v:"keith@thomas-strafford.com"},{k:"Tel",v:"619 955 3405"}]},
      {name:"Kesler Ruiz de Chavez",sub:"4165 Utah St",rows:[{k:"Mail",v:"kesler@gruporch.com"}]},
      {name:"Laura Thomas",sub:"979 Canyon Heights",rows:[{k:"Mail",v:"lauraandryanthomas@gmail.com"},{k:"Tel",v:"760 473 1497"}]},
      {name:"Lauren & David Senko",sub:"317 Palm Dr",rows:[{k:"Mail",v:"jon@casitaadu.com"}]},
      {name:"Leroy Butler",sub:"3727 Central Ave",rows:[{k:"Mail",v:"leroy.butler@lbinvestmentgroup.com"}]},
      {name:"Liila Harris",sub:"1437 CrestView",rows:[{k:"Mail",v:"liila@sdequitypartners.com"}]},
      {name:"Liliana Henao",sub:"1755 El Camino del Teatro",rows:[{k:"Mail",v:"admin@naih.net"},{k:"Tel",v:"386 848 5511"}]},
      {name:"Linda Rodriguez",sub:"289 35th St",rows:[{k:"Mail",v:"lindajgomez@gmail.com"},{k:"Tel",v:"619 881 7157"}]},
      {name:"Mariana & Alvaro",sub:"2828 Dove St",rows:[{k:"Tel",v:"858 222 9892"},{k:"Mail",v:"mcova002@gmail.com"}]},
      {name:"Maricel Rubio",sub:"4595 Excalibur Way",lang:"es",rows:[{k:"Mail",v:"Maricelrupad@gmail.com"},{k:"Tel",v:"858 900 4003"}]},
      {name:"Mark Doty",sub:"2568 Fairmount Ave Renovation",rows:[{k:"Mail",v:"mark.doty@dotycapitalgroup.com"},{k:"Tel",v:"858 204 2510"}]},
      {name:"Matt Holt",sub:"4151 Cherokee Avenue"},
      {name:"Matthew Holt",sub:"3856 39th St Unit Above Garage",rows:[{k:"Mail",v:"matt@whitewatercap.com"},{k:"Tel",v:"925 766 1062"}]},
      {name:"Melanie Dylana",sub:"7911 Mission Manzana",rows:[{k:"Mail",v:"melaniema4@hotmail.com"},{k:"Tel",v:"949 365 7665"}]},
      {name:"Michael Friesen",sub:"423 Agua Vista",rows:[{k:"Mail",v:"werefriesen@me.com"},{k:"Tel",v:"619 200 5778"}]},
      {name:"Milad Khalil",sub:"7627 Hornbill Ave",rows:[{k:"Mail",v:"miladkhalil1113@gmail.com"},{k:"Tel",v:"661 910 8745"}]}
    ]},
    {sec:"N – Z",items:[
      {name:"Patsy Minezaki",sub:"8675 Octans St",rows:[{k:"Mail",v:"perfectpansies@hotmail.com"}]},
      {name:"Paul Lee",sub:"4536-4538 Tivoli St",rows:[{k:"Mail",v:"paullee7g@gmail.com"},{k:"Tel",v:"858 705 5036"}]},
      {name:"Philip Chun",sub:"4354-56 Clairemont Dr",rows:[{k:"Mail",v:"pmchun23@yahoo.com"},{k:"Tel",v:"562 685 1492"}]},
      {name:"Pino Ficara",sub:"1245 Palomar Pl House Renovation",rows:[{k:"Mail",v:"Pinoficara@theapartmentcompany.com"},{k:"Tel",v:"760 408 0884"}]},
      {name:"Ray Guanill",sub:"1207 Monte Vista",rows:[{k:"Mail",v:"Rayg@nonnahomes.com"}]},
      {name:"Rose Silva",sub:"4556 Medialuna rd",rows:[{k:"Mail",v:"roseli.silva@gmail.com"}]},
      {name:"Ryan Zomorodi",sub:"5023 63rd St",rows:[{k:"Mail",v:"ryan@realestateskills.com"}]},
      {name:"Sadie Sanchez",sub:"8666 Macawa Ave",rows:[{k:"Mail",v:"addsan@hotmail.com"},{k:"Tel",v:"347 249 7842"}]},
      {name:"Santiago Leon",sub:"10300 Del Rio Rd",rows:[{k:"Mail",v:"santiago.g.leon@hotmail.com"},{k:"Tel",v:"619 623 4494"}]},
      {name:"Santiago Leon / Vivian",sub:"10302 Del Rio JADU",rows:[{k:"Mail",v:"Viv-e-Velasquez@hotmail.com"},{k:"Tel",v:"619 623 4494"}]},
      {name:"Sean Murphy",sub:"2409 E St",rows:[{k:"Mail",v:"scmurphy25@gmail.com"},{k:"Tel",v:"858 344 7268"}]},
      {name:"Sofia Duran Lopez",sub:"435 Via Maggiore",rows:[{k:"Mail",v:"dlopezsofia@gmail.com"},{k:"Tel",v:"619 955 7730"}]},
      {name:"Stanton Hom",sub:"2323 Froebel Dr",rows:[{k:"Mail",v:"drstan@thefuturegen.com"},{k:"Tel",v:"858 876 4660"}]},
      {name:"Steve Mutrie",sub:"2254 Calle Trepadora",rows:[{k:"Mail",v:"steve.mutrie@yahoo.com"}]},
      {name:"Sydney Daily",sub:"4565 38th St",rows:[{k:"Mail",v:"sydney-statehouses@outlook.com"}]},
      {name:"Tiffiney Welles",sub:"3667 Van Dyke — Solutions",lang:"en",rows:[{k:"Tel",v:"619 977 8433"},{k:"Mail",v:"tw@tenaxrealestate.com"}]},
      {name:"Toni Corwin",sub:"3655 Cherokee Ave",rows:[{k:"Tel",v:"415 902 5385"}]},
      {name:"Trevor Flores",sub:"2104 Diamond St",rows:[{k:"Mail",v:"TF@trevorflores.com"},{k:"Tel",v:"310 855 4961"}]},
      {name:"Yael Mizrachi",sub:"Solutions - 4333 Florida St - Addition",rows:[{k:"Mail",v:"yaelgshirazi@gmail.com"}]}
    ]}
]},
  vendorsdir:{table:true,cols:['discipline','comm'],topLink:{l:"Ver lista completa de vendors en Spearhead",u:U.vendorsFull},groups:[
    {sec:"Contactos por disciplina",items:[
      {name:"Agustin",discipline:"Permits and Plans",comm:"Spanish / English",rows:[{k:"Mail",v:"anavarro@enetestudio.com"}]},
      {name:"Sanjeem",discipline:"Planos + permisos ROW / Structural",comm:"English",rows:[{k:"Mail",v:"sanjeem@adugeeks.com"}]},
      {name:"Ernesto Romero",discipline:"Solar panels",comm:"Spanish / English",rows:[{k:"Tel",v:"619 636 1891"},{k:"Mail",v:"eromero@ecggreen.solar"}]},
      {name:"Loya (Pablo)",discipline:"Trabajo ROW",comm:"Spanish / English",rows:[{k:"Tel",v:"619 928 5692"},{k:"Mail",v:"Pablo@loyaconstructors.com"}]},
      {name:"Kenny",discipline:"Trabajo ROW",comm:"English",rows:[{k:"Mail",v:"Kenny@c3civil.com"}]},
      {name:"Brent",discipline:"Fire sprinklers",comm:"English",rows:[{k:"Tel",v:"619 454 6945"},{k:"Mail",v:"sextonfire@gmail.com"}]},
      {name:"Ted Wigler",discipline:"HERS",comm:"English",rows:[{k:"Mail",v:"Twigler@gmail.com"}]},
      {name:"Francisco Villalobos",discipline:"Home inspection",comm:"Spanish / English",rows:[{k:"Tel",v:"619 250 0998"},{k:"Mail",v:"purvue@purvueinspections.com"}]},
      {name:"Israel",discipline:"Electricista",rows:[{k:"Mail",v:"israelulloa@hotmail.com"}]},
      {name:"Shahad",discipline:"Ops manager ADU Geeks — para todo lo relacionado con ADU Geeks.",rows:[{k:"Mail",v:"Shahad@adugeeks.com"}]},
      {name:"Alyson Corp (Jaime)",rows:[{k:"Mail",v:"jaime@alysoncorp.com"}]},
      {name:"John Osthimer",discipline:"Veriforce contractor",rows:[{k:"Tel",v:"760 845 2636"},{k:"Mail",v:"alltrenchesfilled@gmail.com"},{k:"Empresa",v:"All Trenches Filled"}]},
      {name:"Roberto Rios Jr.",discipline:"Fire sprinklers",rows:[{k:"Tel",v:"619 212 0966"},{k:"Mail",v:"junior@riosfireprotection.com"},{k:"Empresa",v:"Rios Fire Protection"}]},
      {name:"Daniel Tames",rows:[{k:"Mail",v:"dtames@enetestudio.com"},{k:"Empresa",v:"Ene Te"}]}
    ]}
  ]}
};

/* ============ ICONOS ============ */
const ICONS = {
  plan:'<path d="M3 5h18M3 5v14M3 19h18M8 5v14M14 9h4M14 13h4"/>',
  build:'<path d="M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6"/>',
  swap:'<path d="M7 4 3 8l4 4M3 8h14M17 20l4-4-4-4M21 16H7"/>',
  lock:'<rect x="4" y="11" width="16" height="9" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/>',
  doc:'<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
  book:'<path d="M4 5a2 2 0 0 1 2-2h12v17H6a2 2 0 0 0-2 2z"/><path d="M4 5v14"/>',
  people:'<circle cx="9" cy="8" r="3"/><path d="M3 20a6 6 0 0 1 12 0M16 5a3 3 0 0 1 0 6M21 20a6 6 0 0 0-3-5"/>',
  permit:'<path d="M9 3h6l5 5v11a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"/><path d="m8 13 2 2 4-4"/>',
  truck:'<path d="M3 7h11v8H3zM14 10h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.6"/><circle cx="17" cy="18" r="1.6"/>',
  bolt:'<path d="M13 2 4 14h7l-1 8 9-12h-7z"/>',
  folder:'<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>'
};

/* ============ REGISTRO DE SECCIONES (maneja las cards del inicio) ============ */
/* type: 'flow' (procesos) · 'creds' (credenciales) · 'ref' (links) · 'soon' (placeholder) */
