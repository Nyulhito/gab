const GEO=/*GEO*/null;
const W=1180,H=1034,KX=21.07,KY=37.6;
const P=(lon,lat)=>[(lon-22)*KX,(70-lat)*KY];
// id, nome, lon, lat (cidade), marcos, terreno, marcas, nota histórica
const REGIOES=[
 ['pet','Petrogrado',30.3,59.9,4,'urbano',['Cidade-chave','Centro de suprimento'],'Berço da Revolução. Alvo do Exército do Noroeste de Yudenich em 1919.'],
 ['psk','Pskov e Narva',28.6,57.5,3,'floresta',['Base do Noroeste'],'Ocupada pelos alemães em 1918; depois, base dos Brancos junto à Estônia.'],
 ['nor','Norte',40.5,64.3,3,'floresta',['Porto da Entente'],'Arkhangelsk e Murmansk, sob o governo de Miller e tropas da Entente a partir de agosto de 1918.'],
 ['vol','Vologda e Viatka',47.0,60.2,3,'floresta',[],'Cinturão ferroviário que separa o Norte dos Urais e impede a junção dos Brancos.'],
 ['tve','Tver e Novgorod',33.6,57.6,3,'floresta',[],'Linha férrea Petrogrado–Moscou.'],
 ['mos','Moscou',37.6,55.75,4,'urbano',['Cidade-chave','Centro de suprimento'],'Capital soviética desde março de 1918. Objetivo final de Denikin.'],
 ['smo','Smolensk',31.4,54.4,3,'floresta',[],'Retaguarda da Frente Ocidental, voltada para a Polônia.'],
 ['tul','Tula',38.6,54.0,3,'planície',['Arsenal'],'Fábricas de armas. Ponto mais ao norte ameaçado por Denikin no outono de 1919.'],
 ['ori','Oriol e Kursk',35.6,52.2,3,'planície',[],'Onde a marcha sobre Moscou foi detida, em outubro de 1919.'],
 ['vor','Voronej',40.4,51.8,3,'rio',[],'Entroncamento sobre o Don; palco da cavalaria de Budionny contra Mamontov e Shkuro.'],
 ['niz','Nizhny Novgorod',44.0,56.0,3,'rio',[],'Alto Volga, retaguarda industrial dos Vermelhos.'],
 ['kaz','Kazan',50.0,55.6,3,'rio',['Reserva de ouro'],'Tomada pelo Komuch e pela Legião Tcheca em agosto de 1918; guardava o ouro imperial.'],
 ['sam','Samara e Simbirsk',49.6,53.4,3,'rio',[],'Médio Volga. Sede do Komuch em 1918 e alvo da ofensiva de primavera de Kolchak.'],
 ['sar','Saratov',45.6,52.0,3,'rio',[],'Baixo Volga; liga Moscou a Tsaritsyn.'],
 ['tsa','Tsaritsyn',44.5,49.3,4,'rio',['Cidade-chave'],'A "Verdun Vermelha". Sua queda permitiria unir Denikin e Kolchak pelo Volga.'],
 ['ast','Astracã',46.6,46.9,3,'estepe',[],'Foz do Volga; cunha vermelha entre os Brancos do Sul e os cossacos do Ural.'],
 ['kie','Kiev',30.3,49.6,3,'rio',[],'Sede da Rada, do Hetmanato e do Diretório; mudou de mãos várias vezes entre 1917 e 1920.'],
 ['kha','Kharkov e Donbass',36.4,48.9,3,'planície',['Carvão'],'Bacia carbonífera, disputada durante todo o ano de 1919.'],
 ['cri','Crimeia e Táurida',33.4,46.6,3,'estepe',['Último reduto'],'Costa do Mar Negro e península atrás de Perekop; refúgio final de Wrangel em 1920.'],
 ['don','Rostov e Don',41.2,48.0,4,'rio',['Cidade-chave','Centro de suprimento'],'Terras dos cossacos do Don e quartel-general das Forças Armadas do Sul da Rússia.'],
 ['kub','Kuban',42.2,44.6,3,'estepe',['Porto da Entente','Centro de suprimento'],'Berço do Exército Voluntário; Novorossiysk recebe armas britânicas.'],
 ['ufa','Ufa',56.2,54.3,3,'montanha',[],'Tomada por Kolchak em março de 1919, na ofensiva de primavera.'],
 ['ura','Urais',59.2,57.8,3,'montanha',['Indústria'],'Perm, Ekaterimburgo e Tcheliabinsk; fábricas e minas que sustentam o exército de Kolchak.'],
 ['ore','Orenburg',54.4,52.0,3,'estepe',[],'Passagem para o Turquestão, terra dos cossacos de Dutov.'],
 ['oms','Omsk',70.0,56.2,4,'estepe',['Cidade-chave','Centro de suprimento'],'Capital do Governante Supremo, almirante Kolchak, sobre a Transiberiana.']
];
// zonas de água: id, nome, lon, lat (marcador), regiões ribeirinhas ou costeiras
const ZONAS=[
 ['balt','Báltico e Golfo da Finlândia',25.6,59.75,['pet','psk']],
 ['bran','Mar Branco e Dvina do Norte',38.0,66.0,['nor','vol']],
 ['volg','Volga e Kama',53.4,56.9,['niz','kaz','sam','ufa','ura']],
 ['casp','Baixo Volga e Cáspio',50.4,44.6,['sar','tsa','ast']],
 ['dnie','Dnieper',32.3,48.2,['kie','kha','cri']],
 ['negr','Mar Negro e Azov',36.2,43.5,['cri','don','kub']]
];
const CASPIO=[[47.3,45.3],[48.5,46.1],[49.8,46.3],[51.2,46.9],[53,46.9],[53.2,45.2],[51,44.5],[50.3,44.2],[52.5,41],[49,41],[47.6,43],[46.8,44.4]];
const LADOGA=[[30.9,60.0],[32.9,60.2],[32.9,61.3],[31,61.5],[30.3,60.8]];
const RIOS=[
 [[33,57.2],[35.9,56.9],[38.8,57.6],[40.9,57.6],[44,56.3],[49.1,55.8],[48.4,54.3],[50.1,53.2],[46,51.5],[44.5,48.7],[48,46.3]],
 [[38.3,53.9],[39.2,51.7],[40.5,50],[42.5,49.6],[43.6,48.8],[42.2,47.6],[39.7,47.2]],
 [[32,54.8],[30.3,53.9],[30.5,50.5],[32.1,49.4],[35,48.4],[35.1,47.8],[33.5,47],[32.6,46.6]],
 [[58.5,52.7],[55.1,51.8],[51.4,51.2],[51.9,47.1]],
 [[56.3,58],[53,56.2],[49.2,55.6]],
 [[46.3,61.1],[43.2,62.8],[41.9,63.9],[40.5,64.5]]
];
const ROTULOS=[['Finlândia',26,63.2,'n'],['Polônia',23.4,52.5,'n'],['Romênia',25.8,46.3,'n'],['Transcaucásia',45,41.6,'n'],['Turquestão',61,46.5,'n'],['Estepe Cazaque',66,50,'n'],
 ['Mar de Barents',46,69.3,'s'],['Mar Negro',32.5,43.2,'s'],['Mar Cáspio',50.6,43.4,'s']];
// cenários: controle (B e N; o resto é V), exércitos [nome,sigla,lado,região,F,M,etiquetas], flotilhas [nome,lado,zona,F]
const CEN={
 '1917-12':{nome:'Dezembro de 1917 · Kaledin e Dutov',B:['don','kub','ore'],N:['kie','cri'],
  ex:[['Guarda Vermelha de Petrogrado','GVP','V','pet',3,4,['Defensores da cidade']],['Guarda Vermelha de Moscou','GVM','V','mos',2,3,[]],['Destacamento de Antonov-Ovseenko','A-O','V','kha',3,3,['Trens blindados']],['Destacamento de Sivers','Siv','V','vor',2,3,[]],['Guarda Vermelha dos Urais','GVU','V','ura',2,3,[]],
   ['Exército Voluntário','Vol','B','don',2,4,['Veteranos']],['Cossacos do Don','Don','B','don',2,2,['Cavalaria']],['Cossacos de Orenburg','Ore','B','ore',2,3,['Cavalaria']],['Tropas da Rada do Kuban','Kub','B','kub',2,2,[]]],
  fl:[['Frota do Báltico','V','balt',3],['Frota do Mar Negro','V','negr',2]],
  log:'Cenário: dezembro de 1917. O poder soviético se espalha pelo centro; Kaledin no Don e Dutov em Orenburg levantam a resistência; a Rada governa Kiev.'},
 '1918-08':{nome:'Agosto de 1918 · Legião Tcheca e Komuch',B:['sam','kaz','ufa','ura','oms','ore','nor','don','kub'],N:['kie','kha','cri','psk'],
  ex:[['7º Exército','7º','V','pet',2,3,['Defensores da cidade']],['6º Exército','6º','V','vol',2,2,[]],['3º Exército','3º','V','vol',3,2,[]],['5º Exército','5º','V','niz',3,3,[]],['1º Exército','1º','V','sar',3,2,['Conscritos']],['10º Exército','10º','V','tsa',3,3,['Trens blindados']],['9º Exército','9º','V','vor',3,2,['Conscritos']],
   ['Legião Tcheca','Tch','B','kaz',4,4,['Veteranos']],['Exército Popular do Komuch','Kom','B','sam',2,3,[]],['Exército Siberiano','Sib','B','ura',3,3,[]],['Cossacos de Orenburg','Ore','B','ore',2,3,['Cavalaria']],['Exército do Don','Don','B','don',4,3,['Cavalaria']],['Exército Voluntário','Vol','B','kub',3,4,['Veteranos']],['Exército do Norte','Nte','B','nor',2,2,[]]],
  fl:[['Frota do Báltico','V','balt',3],['Flotilha do Volga','V','volg',2],['Flotilha de Astracã','V','casp',1],['Flotilha do Komuch','B','volg',2],['Flotilha aliada do Dvina','B','bran',2]],
  log:'Cenário: agosto de 1918. A Legião Tcheca e o Komuch tomam Kazan e o ouro imperial; os alemães ocupam a Ucrânia; a Entente desembarca em Arkhangelsk.'},
 '1919-03':{nome:'Março de 1919 · Ofensiva de Kolchak',B:['psk','nor','cri','don','kub','ufa','ura','oms'],N:[],
  ex:[['7º Exército','7º','V','pet',3,3,['Defensores da cidade']],['6º Exército','6º','V','vol',2,3,[]],['5º Exército','5º','V','sam',4,3,['Veteranos']],['4º Exército','4º','V','ore',3,3,[]],['10º Exército','10º','V','tsa',4,3,['Trens blindados']],['8º Exército','8º','V','vor',3,2,['Conscritos']],['13º Exército','13º','V','kha',3,2,['Conscritos']],['12º Exército','12º','V','kie',3,3,[]],['1º Exército de Cavalaria','Cav','V','tul',3,4,['Cavalaria','Veteranos']],
   ['Exército do Noroeste','NO','B','psk',2,3,['Veteranos']],['Exército do Norte','Nte','B','nor',2,2,[]],['Exército Voluntário','Vol','B','don',4,4,['Veteranos']],['Exército do Don','Don','B','don',4,3,['Cavalaria']],['Exército do Cáucaso','Cáu','B','kub',3,3,['Cavalaria']],['Corpo da Crimeia','Cri','B','cri',2,2,[]],['Exército Ocidental','Oc','B','ufa',4,3,[]],['Exército Siberiano','Sib','B','ura',4,2,['Conscritos']]],
  fl:[['Frota do Báltico','V','balt',3],['Flotilha do Volga','V','volg',2],['Flotilha de Astracã e do Cáspio','V','casp',2],['Flotilha do Dnieper','V','dnie',1],['Flotilha do Dvina do Norte','V','bran',1],
   ['Esquadra britânica do Báltico','B','balt',2],['Flotilha do Kama','B','volg',2],['Frota do Mar Negro e Entente','B','negr',3],['Flotilha do Cáspio','B','casp',1],['Flotilha aliada do Dvina','B','bran',2]],
  log:'Cenário: março de 1919. Kolchak avança sobre o Volga; Denikin consolida o Don e o Kuban.'},
 '1919-10':{nome:'Outubro de 1919 · Marcha sobre Moscou',B:['psk','nor','kie','kha','ori','vor','tsa','don','kub','cri','oms'],N:[],
  ex:[['7º Exército','7º','V','pet',3,3,['Defensores da cidade']],['6º Exército','6º','V','vol',2,3,[]],['5º Exército','5º','V','ura',4,4,['Veteranos']],['4º Exército','4º','V','ore',3,3,[]],['11º Exército','11º','V','ast',2,3,[]],['10º Exército','10º','V','sar',3,2,[]],['1º Exército de Cavalaria','Cav','V','sar',3,4,['Cavalaria','Veteranos']],['13º Exército','13º','V','tul',3,2,['Conscritos']],['8º Exército','8º','V','tul',3,2,['Conscritos']],['14º Exército','14º','V','smo',3,3,[]],
   ['Exército do Noroeste','NO','B','psk',3,3,['Veteranos']],['Exército do Norte','Nte','B','nor',2,2,[]],['Exército Voluntário','Vol','B','ori',4,3,['Veteranos']],['Exército do Don','Don','B','vor',3,3,['Cavalaria']],['Exército do Cáucaso','Cáu','B','tsa',3,3,['Cavalaria']],['Tropas da região de Kiev','Kie','B','kie',2,2,[]],['Exércitos de Kolchak','Kol','B','oms',3,1,['Conscritos']]],
  fl:[['Frota do Báltico','V','balt',3],['Flotilha do Volga e do Kama','V','volg',3],['Flotilha de Astracã e do Cáspio','V','casp',2],['Flotilha do Dvina do Norte','V','bran',1],
   ['Esquadra britânica do Báltico','B','balt',2],['Frota do Mar Negro e Entente','B','negr',3],['Flotilha do Cáspio','B','casp',2],['Flotilha do Dnieper','B','dnie',1]],
  log:'Cenário: outubro de 1919. Denikin toma Oriol e ameaça Tula; Yudenich chega aos subúrbios de Petrogrado; Kolchak recua para Omsk.'}
};
// generais: nome -> [lado, patente, traços, facção, nota]
const TRACOS={'Planejador ofensivo':'+1 ao atacar','Estrategista defensivo':'+1 ao defender','Comandante de cavalaria':'+1 ao atacar em planície ou estepe','Especialista em assalto':'+1 contra defensor entrincheirado','Mestre da logística':'ignora o suprimento Precário','Carismático':'+1 de Moral extra ao Reorganizar','Politicamente influente':'+1 de Apoio ao tomar cidade-chave; demiti-lo custa 1 de Apoio','Imprudente':'+1 ao atacar; ofensiva repelida custa 1 de Força a mais','Intrigante':'anula os traços de generais de outra facção na mesma região'};
const FACCOES={V:['Bolchevique','Especialista militar','Partisan'],B:['Monarquista','Republicano','Cossaco','Estrangeiro']};
const GENS={
 'Stalin':['V',2,['Politicamente influente','Intrigante'],'Bolchevique','Comissário em Tsaritsyn (1918), Petrogrado e Frente Sul (1919); em choque constante com os especialistas militares.'],
 'Voroshilov':['V',1,['Estrategista defensivo'],'Bolchevique','Comandante do 10º Exército na defesa de Tsaritsyn.'],
 'Budionny':['V',2,['Comandante de cavalaria','Carismático'],'Partisan','Criador do 1º Exército de Cavalaria.'],
 'Tukhachevsky':['V',2,['Planejador ofensivo','Imprudente'],'Especialista militar','Ex-oficial da Guarda; comandou o 1º e o 5º Exércitos contra o Komuch e Kolchak.'],
 'Frunze':['V',3,['Especialista em assalto','Mestre da logística'],'Bolchevique','Derrotou Kolchak no Leste e, em 1920, rompeu Perekop.'],
 'Yegorov':['V',2,['Estrategista defensivo'],'Especialista militar','Comandou o 10º Exército e depois a Frente Sul.'],
 'Samoilo':['V',1,['Estrategista defensivo'],'Especialista militar','Comandante do 6º Exército, na Frente Norte.'],
 'Uborevich':['V',1,['Planejador ofensivo'],'Bolchevique','Comandante do 14º Exército na contraofensiva de Oriol.'],
 'Antonov-Ovseenko':['V',2,['Planejador ofensivo','Politicamente influente'],'Bolchevique','Dirigiu a tomada do Palácio de Inverno e as campanhas na Ucrânia.'],
 'Vacietis':['V',3,['Mestre da logística'],'Especialista militar','Coronel letão; primeiro comandante em chefe do Exército Vermelho.'],
 'Kamenev':['V',3,['Planejador ofensivo'],'Especialista militar','Sergei Kamenev, comandante da Frente Oriental e depois comandante em chefe.'],
 'Chapaev':['V',1,['Carismático','Imprudente'],'Partisan','Comandante da 25ª Divisão, nos Urais.'],
 'Kornilov':['B',3,['Planejador ofensivo','Imprudente'],'Republicano','Primeiro comandante do Exército Voluntário; morto em Ekaterinodar em 1918.'],
 'Alekseiev':['B',3,['Mestre da logística'],'Monarquista','Fundador e organizador do Exército Voluntário.'],
 'Kaledin':['B',2,['Politicamente influente'],'Cossaco','Ataman do Don em 1917.'],
 'Dutov':['B',2,['Comandante de cavalaria'],'Cossaco','Ataman dos cossacos de Orenburg.'],
 'Denikin':['B',3,['Estrategista defensivo','Politicamente influente'],'Republicano','Comandante das Forças Armadas do Sul da Rússia.'],
 'Krasnov':['B',2,['Politicamente influente'],'Cossaco','Ataman do Don em 1918, apoiado pelos alemães.'],
 'Kappel':['B',2,['Especialista em assalto','Carismático'],'Monarquista','Tomou Kazan pelo Komuch; depois, comandante sob Kolchak.'],
 'Gajda':['B',2,['Planejador ofensivo','Imprudente'],'Estrangeiro','Oficial da Legião Tcheca; comandou o Exército Siberiano.'],
 'Mai-Maievski':['B',2,['Planejador ofensivo'],'Monarquista','Comandante do Exército Voluntário na marcha sobre Moscou.'],
 'Sidorin':['B',2,['Estrategista defensivo'],'Cossaco','Comandante do Exército do Don.'],
 'Wrangel':['B',3,['Comandante de cavalaria','Intrigante'],'Monarquista','Tomou Tsaritsyn em 1919; rival de Denikin e seu sucessor na Crimeia.'],
 'Mamontov':['B',1,['Comandante de cavalaria','Imprudente'],'Cossaco','Chefe do raide de cavalaria na retaguarda vermelha em 1919.'],
 'Yudenich':['B',3,['Planejador ofensivo'],'Monarquista','Comandante do Exército do Noroeste contra Petrogrado.'],
 'Miller':['B',2,['Politicamente influente'],'Monarquista','Governador-geral e comandante da Região Norte.'],
 'Khanzhin':['B',2,['Planejador ofensivo'],'Monarquista','Comandante do Exército Ocidental na ofensiva de primavera.'],
 'Slashchov':['B',1,['Estrategista defensivo','Imprudente'],'Monarquista','Defensor da Crimeia em 1919 e 1920.']
};
const CGEN={
 '1917-12':{g:{'A-O':'Antonov-Ovseenko','Vol':'Kornilov','Don':'Kaledin','Ore':'Dutov'},r:['Stalin','Vacietis','Alekseiev','Denikin']},
 '1918-08':{g:{'10º':'Stalin','1º':'Tukhachevsky','6º':'Samoilo','Vol':'Denikin','Don':'Krasnov','Kom':'Kappel','Tch':'Gajda','Ore':'Dutov','Nte':'Miller'},r:['Voroshilov','Vacietis','Budionny','Wrangel']},
 '1919-03':{g:{'7º':'Stalin','6º':'Samoilo','5º':'Tukhachevsky','4º':'Frunze','10º':'Yegorov','Cav':'Budionny','12º':'Antonov-Ovseenko','Vol':'Mai-Maievski','Don':'Sidorin','Cáu':'Wrangel','NO':'Yudenich','Nte':'Miller','Oc':'Khanzhin','Sib':'Gajda','Cri':'Slashchov'},r:['Voroshilov','Kamenev','Chapaev','Denikin','Kappel','Mamontov']},
 '1919-10':{g:{'8º':'Stalin','5º':'Tukhachevsky','Cav':'Budionny','14º':'Uborevich','6º':'Samoilo','4º':'Frunze','13º':'Yegorov','Vol':'Mai-Maievski','Don':'Sidorin','Cáu':'Wrangel','NO':'Yudenich','Nte':'Miller','Kol':'Kappel'},r:['Voroshilov','Kamenev','Denikin','Slashchov','Mamontov']}
};
const mkGen=n=>{const g=GENS[n];return g?{n,p:g[1],t:g[2].slice(),f:g[3],lado:g[0]}:null};
const IDX=Object.fromEntries(REGIOES.map((r,i)=>[r[0],i]));
const ADJ=Object.fromEntries(REGIOES.map(r=>[r[0],[]]));
GEO.BOR.forEach(b=>{ADJ[b.a].push(b.b);ADJ[b.b].push(b.a)});
const LADO={V:'Vermelhos',B:'Brancos',N:'Neutro ou ocupado'};
const COR={V:'#9b2335',B:'#e9e2d0',N:'#a89c86'};
function estadoInicial(c){c=CEN[c]?c:'1919-03';const C=CEN[c];return{v:2,cen:c,turno:1,apoio:{V:10,B:10},ofensivas:2,
 reg:Object.fromEntries(REGIOES.map(r=>[r[0],{c:C.B.includes(r[0])?'B':C.N.includes(r[0])?'N':'V',p:0,s:null}])),
 ex:C.ex.map((e,n)=>({id:'e'+n,nome:e[0],ab:e[1],lado:e[2],reg:e[3],F:e[4],M:e[5],sup:'Suprido',tags:e[6],post:'Defender',gen:mkGen(CGEN[c].g[e[1]])})),
 res:CGEN[c].r.map(mkGen),
 fl:C.fl.map((f,n)=>({id:'f'+n,nome:f[0],lado:f[1],zona:f[2],F:f[3]})),
 log:[C.log]}}

// ---------- estado, visões e sincronização ----------
let FULL=estadoInicial(),S=FULL,modo='P',sel=null,aba='reg';
try{const s=JSON.parse(localStorage.getItem('gab-mapa2')||'null');if(s&&s.v===2)FULL=s}catch(e){}
let online=false,ref=null,REM=null,PUB=null,SALT='',chaves={},SEC={V:null,B:null},meus=new Set(),stat='Modo local',msgSenha='';
function mascara(F,lado){return{v:2,cen:F.cen,turno:F.turno,ofensivas:F.ofensivas,reg:F.reg,fl:F.fl,res:F.res||[],log:F.log,
 apoio:{V:lado==='V'?F.apoio.V:null,B:lado==='B'?F.apoio.B:null},
 ex:F.ex.map(e=>e.lado===lado?e:{id:e.id,nome:e.nome,ab:e.ab,lado:e.lado,reg:e.reg,tags:e.tags,gen:e.gen||null,F:null,M:null,sup:null,post:null})}}
function segredo(F,l){return{apoio:F.apoio[l],ex:Object.fromEntries(F.ex.filter(e=>e.lado===l).map(e=>[e.id,{F:e.F,M:e.M,sup:e.sup,post:e.post}]))}}
function visao(){
 if(!online)return modo==='C'?FULL:mascara(FULL,modo);
 if(modo==='C'&&chaves.C&&FULL)return FULL;
 const p=PUB||mascara(estadoInicial(),null);
 if((modo==='V'||modo==='B')&&SEC[modo]){const s=SEC[modo],o=JSON.parse(JSON.stringify(p));o.apoio[modo]=s.apoio;o.ex.forEach(e=>{if(s.ex[e.id])Object.assign(e,s.ex[e.id])});return o}
 return p}
const ctl=()=>modo==='C'&&S===FULL&&(!online||!!chaves.C);
const te=new TextEncoder(),td=new TextDecoder(),kc={};
const toB=u=>{let s='';for(let i=0;i<u.length;i++)s+=String.fromCharCode(u[i]);return btoa(s)};
const fromB=s=>Uint8Array.from(atob(s),c=>c.charCodeAt(0));
async function chave(senha){const k=SALT+'|'+senha;if(kc[k])return kc[k];
 const base=await crypto.subtle.importKey('raw',te.encode(senha),'PBKDF2',false,['deriveKey']);
 return kc[k]=await crypto.subtle.deriveKey({name:'PBKDF2',salt:te.encode(SALT),iterations:100000,hash:'SHA-256'},base,{name:'AES-GCM',length:256},false,['encrypt','decrypt'])}
async function enc(obj,senha){const iv=crypto.getRandomValues(new Uint8Array(12));
 const ct=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv},await chave(senha),te.encode(JSON.stringify(obj))));
 const u=new Uint8Array(12+ct.length);u.set(iv);u.set(ct,12);return toB(u)}
async function dec(s,senha){const u=fromB(s);return JSON.parse(td.decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:u.slice(0,12)},await chave(senha),u.slice(12))))}
let dbh=null,REMORD={V:null,B:null},DECORD={V:null,B:null},ORD={V:null,B:null},msgOrd='';
async function decOrd(){for(const l of['V','B']){DECORD[l]=null;if(REMORD[l]&&chaves[l]){try{DECORD[l]=await dec(REMORD[l].c,chaves[l])}catch(e){}}}
 if(aba==='ex'||aba==='res')render()}
function rascunho(l){if(!ORD[l]||ORD[l].turno!==S.turno){const d=DECORD[l];ORD[l]=d&&d.turno===S.turno?JSON.parse(JSON.stringify(d)):{turno:S.turno,ex:{}}}return ORD[l]}
async function enviarOrdens(l){const o=rascunho(l);try{await dbh.doc('ordens/'+l).set({t:o.turno,n:Date.now(),c:await enc(o,chaves[l])});msgOrd='Ordens do turno '+o.turno+' enviadas à Sala de Controle.'}
 catch(e){msgOrd=e&&e.code==='invalid_argument'?'Sem permissão para enviar: peça à diretoria o acesso de Colaborador.':'Falha ao enviar; tente de novo.'}render()}
let escrevendo=false,sujo=false,timer=null;
function salvar(){if(FULL&&FULL.log.length>60)FULL.log.length=60;
 if(!online){try{localStorage.setItem('gab-mapa2',JSON.stringify(FULL))}catch(e){}return}
 if(chaves.C&&FULL){sujo=true;clearTimeout(timer);timer=setTimeout(gravar,500)}}
async function gravar(){if(escrevendo||!sujo||!FULL||!chaves.C)return;escrevendo=true;sujo=false;
 try{const n=Date.now()+'-'+Math.random().toString(36).slice(2,8);meus.add(n);
  const d={n,salt:SALT,pub:JSON.stringify(mascara(FULL,null)),cV:await enc(segredo(FULL,'V'),chaves.V),cB:await enc(segredo(FULL,'B'),chaves.B),cC:await enc({S:FULL,senhas:{V:chaves.V,B:chaves.B}},chaves.C)};
  await ref.set(d);stat='Sincronizado'}
 catch(e){stat=e&&e.code==='invalid_argument'?'Sem permissão de escrita neste mapa':'Falha ao sincronizar'}
 escrevendo=false;cabecalho();if(sujo)gravar()}
function aoSnap(snap){REM=snap.exists?snap.data():null;
 if(!REM){PUB=null;stat='Mapa ainda não iniciado pela Sala de Controle';atualizar();return}
 try{PUB=JSON.parse(REM.pub)}catch(e){}
 SALT=REM.salt;if(stat!=='Sem permissão de escrita neste mapa')stat='Sincronizado';
 (async()=>{for(const l of['V','B'])if(chaves[l]){try{SEC[l]=await dec(REM['c'+l],chaves[l])}catch(e){SEC[l]=null}}
  if(chaves.C&&!meus.has(REM.n)&&!sujo&&!escrevendo){try{const o=await dec(REM.cC,chaves.C);FULL=o.S;chaves.V=o.senhas.V;chaves.B=o.senhas.B}catch(e){}}
  atualizar()})()}
async function destravar(l,senha){if(!REM)return false;
 try{const o=await dec(REM['c'+l],senha);chaves[l]=senha;if(l==='C'){FULL=o.S;chaves.V=o.senhas.V;chaves.B=o.senhas.B}else SEC[l]=o;decOrd();return true}catch(e){return false}}
async function iniciarMapa(sC,sV,sB){const a=new Uint8Array(16);crypto.getRandomValues(a);SALT=toB(a);chaves={C:sC,V:sV,B:sB};sujo=true;await gravar();decOrd()}
function conectar(){
 if(!(window.claude&&window.claude.use)||!(window.crypto&&crypto.subtle))return;
 window.claude.use('db').then(db=>{if(!db)return;
  try{ref=db.doc('mapa/estado')}catch(e){return}
  dbh=db;['V','B'].forEach(l=>{try{db.doc('ordens/'+l).onSnapshot(s=>{REMORD[l]=s.exists?s.data():null;decOrd()},()=>{})}catch(e){}});
  online=true;stat='Conectando…';atualizar();
  const t=setTimeout(()=>{if(stat==='Conectando…'){stat='Sem resposta do servidor; exibindo o cenário padrão';cabecalho()}},10000);
  ref.onSnapshot(s=>{clearTimeout(t);aoSnap(s)},e=>{clearTimeout(t);stat='Sincronização indisponível';cabecalho()})},()=>{})}
function atualizar(){S=visao();render()}

// ---------- utilitários de jogo ----------
const R=id=>{const r=REGIOES[IDX[id]];return{id,nome:r[1],max:r[4],terreno:r[5],marcas:r[6],nota:r[7]}};
const Z=id=>{const z=ZONAS.find(z=>z[0]===id);return{id,nome:z[1],regs:z[4]}};
const vizinhos=id=>ADJ[id];
const exEm=(id,lado)=>S.ex.filter(e=>e.reg===id&&(!lado||e.lado===lado));
const veNumeros=e=>e.F!=null;
const donoZona=z=>{const l=[...new Set(S.fl.filter(f=>f.zona===z&&f.F>0).map(f=>f.lado))];return l.length===1?l[0]:null};
const apoio=(l,d)=>{if(S.apoio[l]!=null)S.apoio[l]=Math.max(0,Math.min(10,S.apoio[l]+d))};
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

function tracos(lista,lider){ // traços que valem: do general do exército líder e de generais de três estrelas na região
 const gs=lista.filter(e=>e.gen&&(e===lider||e.gen.p>=3)).map(e=>e.gen),intr=lista.map(e=>e.gen).find(g=>g&&g.t.includes('Intrigante'));
 const out={};gs.forEach(g=>{if(intr&&g!==intr&&g.f!==intr.f)return;g.t.forEach(t=>{out[t]=g.n})});return out}
const estrelas=p=>'★'.repeat(p||1);
// ---------- desenho ----------
const svg=document.getElementById('map');
function el(tag,attrs,txt){const e=document.createElementNS('http://www.w3.org/2000/svg',tag);for(const k in attrs)e.setAttribute(k,attrs[k]);if(txt!=null)e.textContent=txt;return e}
const linha=pts=>'M'+pts.map(p=>{const q=P(p[0],p[1]);return q[0].toFixed(1)+' '+q[1].toFixed(1)}).join('L');
const aneis=rs=>rs.map(r=>linha(r)+'Z').join('');
function estrela(x,y,r){let d='';for(let k=0;k<10;k++){const a=-Math.PI/2+k*Math.PI/5,rr=k%2?r*.42:r;d+=(k?'L':'M')+(x+Math.cos(a)*rr).toFixed(1)+' '+(y+Math.sin(a)*rr).toFixed(1)}return d+'Z'}
function desenhar(){
 svg.innerHTML='';
 svg.appendChild(el('rect',{x:0,y:0,width:W,height:H,fill:'#9db8c4'}));
 svg.appendChild(el('path',{d:aneis(GEO.LAND),fill:'#cdbfa6',stroke:'#7d8f8a','stroke-width':1,'fill-rule':'evenodd'}));
 svg.appendChild(el('path',{d:linha(CASPIO)+'Z',fill:'#9db8c4'}));
 REGIOES.forEach(r=>{const st=S.reg[r[0]];
  const p=el('path',{d:aneis(GEO.POL[r[0]]),fill:COR[st.c],class:'region','data-id':r[0]});
  p.addEventListener('click',()=>{sel=r[0];aba='reg';render()});svg.appendChild(p)});
 svg.appendChild(el('path',{d:linha(LADOGA)+'Z',fill:'#9db8c4',stroke:'#5f8494','stroke-width':1}));
 RIOS.forEach(rv=>svg.appendChild(el('path',{d:linha(rv),class:'river'})));
 GEO.BOR.forEach(b=>{const ca=S.reg[b.a].c,cb=S.reg[b.b].c;if(ca!==cb&&ca!=='N'&&cb!=='N'){const d=b.l.map(linha).join('');svg.appendChild(el('path',{d,class:'frontb'}));svg.appendChild(el('path',{d,class:'front'}))}});
 if(sel)svg.appendChild(el('path',{d:aneis(GEO.POL[sel]),fill:'none',stroke:'#f5c21b','stroke-width':3.5,'pointer-events':'none'}));
 ROTULOS.forEach(t=>{const p=P(t[1],t[2]);svg.appendChild(el('text',{x:p[0],y:p[1],class:t[3]==='n'?'nl':'sl'},t[0]))});
 ZONAS.forEach(z=>{const [x,y]=P(z[2],z[3]),fs=S.fl.filter(f=>f.zona===z[0]&&f.F>0),dono=donoZona(z[0]);
  const g=el('g',{class:'zona'});g.appendChild(el('title',{},z[1]+(fs.length?': '+fs.map(f=>f.nome+' (Força '+f.F+')').join('; '):': sem flotilhas')));
  g.appendChild(el('circle',{cx:x,cy:y,r:13,fill:dono?COR[dono]:'#dfe9ec',stroke:'#1b3a4a','stroke-width':2}));
  g.appendChild(el('text',{x,y:y+5,class:'anc',fill:dono==='V'?'#fff':'#1b3a4a'},'⚓'));
  fs.forEach((f,k)=>{const tx=x+16+k*30;g.appendChild(el('rect',{x:tx,y:y-9,width:27,height:18,rx:9,fill:f.lado==='V'?'#c8102e':'#fbf8ef',stroke:'#1b0d08','stroke-width':1}));
   g.appendChild(el('text',{x:tx+13.5,y:y+4,class:'ftx',fill:f.lado==='V'?'#fff':'#1b0d08'},'F'+f.F))});
  g.addEventListener('click',()=>{aba='ex';render()});svg.appendChild(g)});
 REGIOES.forEach(r=>{const [x,y]=P(r[2],r[3]),st=S.reg[r[0]],chave=r[6].includes('Cidade-chave');
  if(chave)svg.appendChild(el('path',{d:estrela(x,y,9),fill:'#f5c21b',stroke:'#1b0d08','stroke-width':1,'pointer-events':'none'}));
  else svg.appendChild(el('circle',{cx:x,cy:y,r:3.6,fill:'#1b0d08',stroke:'#f2e6d8','stroke-width':1.2,'pointer-events':'none'}));
  svg.appendChild(el('text',{x,y:y-11,class:'lbl '+(st.c==='V'?'V':'B')},r[1]));
  if(st.p>0&&st.s){for(let k=0;k<r[4];k++)svg.appendChild(el('rect',{x:x-r[4]*6+k*12,y:y+8,width:10,height:6,fill:k<st.p?COR[st.s]:'#0005',stroke:'#1b0d08','stroke-width':1}))}
  const es=exEm(r[0]);es.forEach((e,k)=>{const tx=x-(es.length*25)+k*50+2,ty=y+(st.p>0?18:9);
   const gt=el('g',{class:'tok'});gt.appendChild(el('title',{},e.nome+(e.gen?' · General '+e.gen.n:'')));
   gt.appendChild(el('rect',{x:tx,y:ty,width:46,height:20,rx:3,fill:e.lado==='V'?'#c8102e':'#fbf8ef'}));
   gt.appendChild(el('text',{x:tx+23,y:ty+14,fill:e.lado==='V'?'#fff':'#1b0d08'},e.ab+' '+(veNumeros(e)?e.F+'/'+e.M:'?')));
   if(e.post==='Avançar')gt.appendChild(el('path',{d:`M${tx+40} ${ty-1}l6 -5l-9 -1z`,fill:'#f5c21b',stroke:'#1b0d08','stroke-width':.8}));
   svg.appendChild(gt)});
 });
}

// ---------- painel ----------
const pane=document.getElementById('pane');
let ULT='';
function cabecalho(){
 document.getElementById('turno').textContent='Turno '+S.turno;
 document.getElementById('stat').textContent=stat;
 for(const l of['V','B']){const d=document.getElementById('ap'+l);d.innerHTML='';const v=S.apoio[l];
  d.title=v==null?'Apoio à Guerra: sigiloso nesta visão':'Apoio à Guerra: '+v;
  for(let k=1;k<=10;k++){const s=document.createElement('span');s.className='pip '+l+(v!=null&&k<=v?' on':'');d.appendChild(s)}}
 const abas=[['reg','Região'],['ex','Forças'],['bol','Boletim']];if(ctl())abas.splice(2,0,['res','Resolver']);abas.push(['reg2',ctl()?'Regras':'Como funciona']);
 if(!abas.some(a=>a[0]===aba))aba='reg';
 const t=document.getElementById('tabs');t.innerHTML='';abas.forEach(a=>{const b=document.createElement('button');b.textContent=a[1];if(a[0]===aba)b.className='on';b.onclick=()=>{aba=a[0];render()};t.appendChild(b)});
 document.getElementById('legend').innerHTML='<span class="sw" style="background:#9b2335"></span>Vermelhos &nbsp; <span class="sw" style="background:#e9e2d0"></span>Brancos &nbsp; <span class="sw" style="background:#a89c86"></span>Neutro<br><span style="color:#f5c21b">• • •</span> Frente &nbsp; <span style="color:#f5c21b">★</span> Cidade-chave &nbsp; ⚓ Zona de água<br>Ficha: sigla Força/Moral';
}
let RM=null;
function cartaoEx(e){
 let h=`<div class="card ${e.lado}"><b>${esc(e.nome)}</b> <span class="muted">· ${LADO[e.lado]} · ${esc(R(e.reg).nome)}</span><br>`;
 h+=veNumeros(e)?`Força ${e.F} · Moral ${e.M} · ${e.sup} · ${e.post}`:'<span class="muted">Força, Moral e Suprimento sigilosos</span>';
 if(e.tags.length)h+='<br>'+e.tags.map(t=>`<span class="tag">${esc(t)}</span>`).join('');
 if(e.gen)h+=`<br><b>General ${esc(e.gen.n)}</b> <span style="color:var(--gold)">${estrelas(e.gen.p)}</span> <span class="muted">· ${esc(e.gen.f)}</span><br>`+e.gen.t.map(t=>`<span class="tag tg"${ctl()?` title="${esc(TRACOS[t]||'')}"`:''}>${esc(t)}</span>`).join('');
 if(ctl()){h+=`<div class="row"><label>General <select data-e="${e.id}" data-k="gen"><option value="">— sem general —</option>${e.gen?`<option value="=" selected>${esc(e.gen.n)}</option>`:''}${(S.res||[]).filter(g=>g.lado===e.lado).map(g=>`<option value="${esc(g.n)}">${esc(g.n)} ${estrelas(g.p)}</option>`).join('')}</select></label>${e.gen?`<label>Patente <input class="num" type="number" min="1" max="3" value="${e.gen.p}" data-e="${e.id}" data-k="genp"></label>`:''}</div>`}
 if(ctl()){h+=`<div class="row">
  <label>F <input class="num" type="number" min="0" max="6" value="${e.F}" data-e="${e.id}" data-k="F"></label>
  <label>M <input class="num" type="number" min="0" max="4" value="${e.M}" data-e="${e.id}" data-k="M"></label>
  <select data-e="${e.id}" data-k="sup">${['Suprido','Precário','Cortado'].map(o=>`<option${o===e.sup?' selected':''}>${o}</option>`).join('')}</select>
  <select data-e="${e.id}" data-k="post">${['Defender','Avançar','Reorganizar','Transferir'].map(o=>`<option${o===e.post?' selected':''}>${o}</option>`).join('')}</select>
  <select data-e="${e.id}" data-k="reg">${REGIOES.map(r=>`<option value="${r[0]}"${r[0]===e.reg?' selected':''}>${esc(r[1])}</option>`).join('')}</select>
 </div><div class="row"><input data-e="${e.id}" data-k="nome" value="${esc(e.nome)}" style="flex:2;min-width:110px" title="Nome"><input data-e="${e.id}" data-k="ab" value="${esc(e.ab)}" maxlength="4" style="width:56px" title="Sigla"></div>
 <div class="row"><input data-e="${e.id}" data-k="tags" value="${esc(e.tags.join(', '))}" placeholder="Etiquetas, separadas por vírgula" style="flex:1;min-width:120px"><button class="sec" data-a="rmEx" data-e="${e.id}">${RM===e.id?'Confirmar':'Remover'}</button></div>`}
 if(online&&modo!=='C'&&modo===e.lado&&SEC[modo]){const o=rascunho(modo).ex[e.id]||{post:'Defender',alvo:'',estr:''};
  const alvos=o.post==='Avançar'?vizinhos(e.reg).filter(v=>S.reg[v].c!==e.lado):o.post==='Transferir'?REGIOES.map(r=>r[0]).filter(v=>S.reg[v].c===e.lado&&v!==e.reg):[];
  h+=`<div class="row"><b>Ordem:</b><select data-o="${e.id}" data-k="post">${['Defender','Avançar','Reorganizar','Transferir'].map(p=>`<option${p===o.post?' selected':''}>${p}</option>`).join('')}</select>`
   +(alvos.length?`<select data-o="${e.id}" data-k="alvo"><option value="">destino…</option>${alvos.map(v=>`<option value="${v}"${v===o.alvo?' selected':''}>${esc(R(v).nome)}</option>`).join('')}</select>`:'')+'</div>'
   +(o.post==='Avançar'?`<div class="row"><input data-o="${e.id}" data-k="estr" maxlength="300" placeholder="Estratagema e razões (opcional)" value="${esc(o.estr||'')}" style="flex:1;min-width:150px"></div>`:'')}
 return h+'</div>'}
function cartaoFl(f){
 let h=`<div class="card ${f.lado}"><b>⚓ ${esc(f.nome)}</b> <span class="muted">· ${LADO[f.lado]}</span><br>${esc(Z(f.zona).nome)} · Força ${f.F}`;
 if(ctl())h+=`<div class="row"><label>F <input class="num" type="number" min="0" max="4" value="${f.F}" data-f="${f.id}" data-k="F"></label>
  <select data-f="${f.id}" data-k="zona">${ZONAS.map(z=>`<option value="${z[0]}"${z[0]===f.zona?' selected':''}>${esc(z[1])}</option>`).join('')}</select><button class="sec" data-a="rmFl" data-f="${f.id}">${RM===f.id?'Confirmar':'Remover'}</button></div>`;
 return h+'</div>'}
function painelRegiao(){
 if(!sel)return `<h2>Mapa de Guerra</h2><p>Toque em uma região para ver seus dados, os exércitos presentes e as frentes abertas.</p><p class="muted">${esc(CEN[S.cen]?CEN[S.cen].nome:'')}. 25 regiões, 5 cidades-chave e 6 zonas de água.</p>`;
 const r=R(sel),st=S.reg[sel];
 let h=`<h2>${esc(r.nome)}</h2><p><span class="tag">${LADO[st.c]}</span><span class="tag">${r.terreno}</span>${r.marcas.map(m=>`<span class="tag">${esc(m)}</span>`).join('')}</p><p>${esc(r.nota)}</p>`;
 h+=`<p>Marcos de ocupação: <b>${st.p} de ${r.max}</b>${st.p&&st.s?' conquistados pelos '+LADO[st.s]:''}</p>`;
 if(ctl())h+=`<div class="row"><button data-a="ctrl">Trocar controle</button><button class="sec" data-a="p-">− marco</button><button class="sec" data-a="p+">+ marco</button></div>`;
 const fr=vizinhos(sel).filter(v=>S.reg[v].c!==st.c),am=vizinhos(sel).filter(v=>S.reg[v].c===st.c);
 h+='<h3>Frentes e fronteiras</h3><p>'+(fr.length?fr.map(v=>`<a href="#" data-go="${v}" style="color:var(--gold)">${esc(R(v).nome)}</a>`).join(' · '):'Nenhuma: região de retaguarda.')+'</p>';
 h+='<h3>Regiões amigas vizinhas</h3><p>'+(am.length?am.map(v=>`<a href="#" data-go="${v}" style="color:var(--cream)">${esc(R(v).nome)}</a>`).join(' · '):'<b>Nenhuma: exército aqui está cercado.</b>')+'</p>';
 const zs=ZONAS.filter(z=>z[4].includes(sel));
 if(zs.length)h+='<h3>Águas</h3>'+zs.map(z=>{const d=donoZona(z[0]);return `<p>⚓ ${esc(z[1])}: ${d?'dominada pelos '+LADO[d]:'disputada ou vazia'}</p>`}).join('');
 const es=exEm(sel);h+='<h3>Exércitos</h3>'+(es.length?es.map(cartaoEx).join(''):'<p class="muted">Nenhum exército na região.</p>');
 return h}
function painelEx(){let h='<h2>Forças</h2>';
 if(online&&(modo==='V'||modo==='B')&&SEC[modo]){const o=rascunho(modo),n=Object.values(o.ex).filter(x=>x.post==='Avançar').length;
  h+=`<div class="res">Ordens do turno ${S.turno}: ${n} de ${S.ofensivas} ofensivas usadas.${n>S.ofensivas?' Excedeu o limite: as últimas viram Defender.':''}<div class="row"><button data-a="enviar">Enviar ordens</button></div><span class="muted">${esc(msgOrd)}</span></div>`}
 for(const l of['V','B']){h+=`<h3>${LADO[l]} · Exércitos</h3>`+S.ex.filter(e=>e.lado===l).map(cartaoEx).join('')}
 if(ctl())h+=`<h3>Novo exército</h3><div class="row"><input id="nxNome" placeholder="Nome" style="flex:2;min-width:110px"><input id="nxAb" placeholder="Sigla" maxlength="4" style="width:60px"></div>
 <div class="row"><select id="nxLado"><option value="V">Vermelhos</option><option value="B">Brancos</option></select><select id="nxReg">${REGIOES.map(r=>`<option value="${r[0]}">${esc(r[1])}</option>`).join('')}</select><label>F <input class="num" id="nxF" type="number" min="1" max="6" value="2"></label><label>M <input class="num" id="nxM" type="number" min="1" max="4" value="3"></label><button data-a="novoEx">Criar</button></div>`;
 h+='<h3>Generais disponíveis</h3>';
 for(const l of['V','B']){const gs=(S.res||[]).filter(g=>g.lado===l);h+=`<p><b>${LADO[l]}:</b> ${gs.length?'':'nenhum na reserva'}</p>`+gs.map(g=>`<div class="card ${l}"><b>${esc(g.n)}</b> <span style="color:var(--gold)">${estrelas(g.p)}</span> <span class="muted">· ${esc(g.f)}</span><br>${g.t.map(t=>`<span class="tag tg"${ctl()?` title="${esc(TRACOS[t]||'')}"`:''}>${esc(t)}</span>`).join('')}${GENS[g.n]?`<br><span class="muted">${esc(GENS[g.n][4])}</span>`:''}${ctl()?`<div class="row"><button class="sec" data-a="rmGen" data-g="${esc(g.n)}">${RM==='g'+g.n?'Confirmar':'Remover'}</button></div>`:''}</div>`).join('')}
 if(ctl())h+=`<div class="row"><input id="ngNome" placeholder="Novo general" style="flex:1;min-width:100px"><select id="ngLado"><option value="V">Vermelhos</option><option value="B">Brancos</option></select><label>★ <input class="num" id="ngP" type="number" min="1" max="3" value="1"></label></div><div class="row"><select id="ngT1">${Object.keys(TRACOS).map(t=>`<option>${t}</option>`).join('')}</select><select id="ngT2"><option value="">— segundo traço —</option>${Object.keys(TRACOS).map(t=>`<option>${t}</option>`).join('')}</select><button data-a="novoGen">Criar</button></div>`;
 h+='<h3>Flotilhas e frotas</h3>';
 if(ctl())h+=`<div class="row"><input id="nfNome" placeholder="Nova flotilha" style="flex:1;min-width:110px"><select id="nfLado"><option value="V">Vermelhos</option><option value="B">Brancos</option></select><select id="nfZona">${ZONAS.map(z=>`<option value="${z[0]}">${esc(z[1])}</option>`).join('')}</select><label>F <input class="num" id="nfF" type="number" min="1" max="4" value="1"></label><button data-a="novaFl">Criar</button></div>`;
 ZONAS.forEach(z=>{const fs=S.fl.filter(f=>f.zona===z[0]);if(!fs.length)return;const d=donoZona(z[0]),disp=new Set(fs.filter(f=>f.F>0).map(f=>f.lado)).size>1;
  h+=`<p><b>${esc(z[1])}</b> <span class="muted">· ${d?'dominada pelos '+LADO[d]:disp?'disputada':'vazia'}</span></p>`+fs.map(cartaoFl).join('');
  if(ctl()&&disp)h+=`<div class="row"><button data-a="naval" data-z="${z[0]}">Combate naval nesta zona</button></div>`});
 return h}
let RES={de:null,para:null,ent:false,ter:false,fa:false,fd:false,aa:false,ad:false,ea:0,ed:0,dado:''};
function calc(){
 const A=RES.de,T=RES.para;if(!A||!T)return null;const la=S.reg[A].c,ld=S.reg[T].c;
 const ea=exEm(A,la).sort((a,b)=>b.F-a.F),ed=ld==='N'?[]:exEm(T,ld).sort((a,b)=>b.F-a.F);
 if(!ea.length)return{erro:'Não há exército atacante na região de origem.'};
 const at=ea[0],df=ed[0]||null,m=[];
 const add=(n,v)=>{if(v)m.push([n,v])};
 add('Força do atacante ('+at.nome+')',at.F);add('Força do defensor'+(df?' ('+df.nome+')':''),df?-df.F:0);
 add('Defensor entrincheirado',RES.ent?-1:0);add('Terreno ou clima desfavorável',RES.ter?-1:0);
 add('Defensor em Reorganizar',df&&df.post==='Reorganizar'?1:0);
 add('Dois ou mais exércitos atacantes',ea.length>1?1:0);add('Dois ou mais exércitos defensores',ed.length>1?-1:0);
 add('Moral 1 do atacante',at.M<=1?-1:0);add('Moral 1 do defensor',df&&df.M<=1?1:0);
 add('Suprimento do atacante',at.sup==='Precário'?-1:at.sup==='Cortado'?-2:0);
 add('Suprimento do defensor',df?(df.sup==='Precário'?1:df.sup==='Cortado'?2:0):0);
 const ta=tracos(ea,at),tdf=df?tracos(ed,df):{},tr=R(T).terreno;
 add('General '+(ta['Planejador ofensivo']||'')+': planejador ofensivo',ta['Planejador ofensivo']?1:0);
 add('General '+(ta['Imprudente']||'')+': imprudente',ta['Imprudente']?1:0);
 add('General '+(ta['Comandante de cavalaria']||'')+': cavalaria em campo aberto',ta['Comandante de cavalaria']&&(tr==='planície'||tr==='estepe')?1:0);
 add('General '+(ta['Especialista em assalto']||'')+': assalto a trincheiras',ta['Especialista em assalto']&&RES.ent?1:0);
 add('General '+(ta['Mestre da logística']||'')+': logística do atacante',ta['Mestre da logística']&&at.sup==='Precário'?1:0);
 add('General '+(tdf['Estrategista defensivo']||'')+': estrategista defensivo',tdf['Estrategista defensivo']?-1:0);
 add('General '+(tdf['Mestre da logística']||'')+': logística do defensor',tdf['Mestre da logística']&&df.sup==='Precário'?-1:0);
 add('Trens blindados (atacante)',ea.some(e=>e.tags.includes('Trens blindados'))?1:0);
 add('Defensores da cidade',df&&R(T).terreno==='urbano'&&ed.some(e=>e.tags.includes('Defensores da cidade'))?-1:0);
 const zs=ZONAS.filter(z=>z[4].includes(T)).map(z=>donoZona(z[0]));
 add('Flotilha do atacante domina as águas',zs.includes(la)?1:0);add('Flotilha do defensor domina as águas',ld!=='N'&&zs.includes(ld)?-1:0);
 add('Ficha de Apoio do atacante',RES.fa?1:0);add('Ficha de Apoio do defensor',RES.fd?-1:0);
 add('Aviação do atacante',RES.aa?1:0);add('Aviação do defensor',RES.ad?-1:0);
 add('Estratagema do atacante',+RES.ea);add('Estratagema do defensor',-RES.ed);
 return{at,df,ea,ed,la,ld,m,ta,tdf,mod:m.reduce((s,x)=>s+x[1],0)}}
function painelRes(){
 const origens=REGIOES.map(r=>r[0]).filter(id=>S.reg[id].c!=='N'&&exEm(id,S.reg[id].c).length&&vizinhos(id).some(v=>S.reg[v].c!==S.reg[id].c));
 if(RES.de&&!origens.includes(RES.de))RES.de=null;
 const alvos=RES.de?vizinhos(RES.de).filter(v=>S.reg[v].c!==S.reg[RES.de].c):[];
 if(RES.para&&!alvos.includes(RES.para))RES.para=null;
let h='<h2>Ordens do turno</h2>';
 if(online){for(const l of['V','B']){const d=DECORD[l];h+=`<p><b>${LADO[l]}:</b> ${d&&d.turno===S.turno?Object.keys(d.ex).length+' ordens recebidas':'nada recebido neste turno'}</p>`}
  h+=`<div class="row"><button data-a="aplicarOrd">Aplicar ordens recebidas</button></div>`}
 const of=S.ex.filter(e=>e.post==='Avançar'&&e.alvo);
 h+=of.length?of.map(e=>`<div class="card ${e.lado}"><b>${esc(e.nome)}</b>: ${esc(R(e.reg).nome)} → ${esc(R(e.alvo).nome)} ${e.feito?'<span class="tag">resolvida</span>':`<button data-a="frente" data-e="${e.id}">Resolver</button>`}${e.estr?`<br><span class="muted">Estratagema: ${esc(e.estr)}</span>`:''}</div>`).join(''):'<p class="muted">Nenhuma ofensiva ordenada. Defina a postura Avançar e o destino, ou resolva manualmente abaixo.</p>';
 h+='<h2 style="margin-top:14px">Resolver frente</h2><p class="muted">Uma rolagem por frente com ofensiva. O resultado é aplicado ao mapa e registrado no boletim.</p>';
 h+=`<div class="row"><label>Ataca de</label><select data-r="de"><option value="">—</option>${origens.map(o=>`<option value="${o}"${o===RES.de?' selected':''}>${esc(R(o).nome)} (${LADO[S.reg[o].c]})</option>`).join('')}</select></div>`;
 h+=`<div class="row"><label>Sobre</label><select data-r="para"><option value="">—</option>${alvos.map(o=>`<option value="${o}"${o===RES.para?' selected':''}>${esc(R(o).nome)}</option>`).join('')}</select></div>`;
 const c=calc();if(!c)return h;if(c.erro)return h+`<p>${c.erro}</p>`;
 const ck=(k,t)=>`<label><input type="checkbox" data-r="${k}"${RES[k]?' checked':''}> ${t}</label>`;
 h+=`<div class="row">${ck('ent','Defensor entrincheirado')}</div><div class="row">${ck('ter',`Terreno ou clima desfavorável <span class="muted">(alvo: ${R(RES.para).terreno})</span>`)}</div>
 <div class="row">${ck('fa','Ficha do atacante')}${ck('fd','Ficha do defensor')}</div><div class="row">${ck('aa','Aviação do atacante')}${ck('ad','Aviação do defensor')}</div>
 <div class="row"><label>Estratagema atacante <input class="num" type="number" min="0" max="2" value="${RES.ea}" data-r="ea"></label><label>defensor <input class="num" type="number" min="0" max="2" value="${RES.ed}" data-r="ed"></label></div>`;
 h+='<h3>Conta</h3>'+c.m.map(x=>`<p>${esc(x[0])}: <b>${x[1]>0?'+':''}${x[1]}</b></p>`).join('')+`<p>Modificador total: <b>${c.mod>0?'+':''}${c.mod}</b></p>`;
 if(!c.df)h+='<p><b>Sem defensor:</b> o atacante conquista 2 marcos sem rolagem.</p>';
 h+=`<div class="row"><label>Dados (2d6) <input class="num" type="number" min="2" max="12" value="${RES.dado}" data-r="dado" placeholder="auto"></label><button data-a="rolar">Rolar e aplicar</button></div>`;
 return h}
const d6=()=>1+Math.floor(Math.random()*6);
function aplicar(){
 const c=calc();if(!c||c.erro)return;const T=RES.para,rt=R(T),st=S.reg[T];
 let dados=+RES.dado;if(!(dados>=2&&dados<=12))dados=d6()+d6();
 S.ex.forEach(e=>{if(e.reg===RES.de&&e.alvo===T&&e.post==='Avançar')e.feito=true});
 const total=c.df?dados+c.mod:99;let txt,marcos=0;const linhas=[];
 const perde=(e,k,n)=>{e[k]=Math.max(0,e[k]-n)};
 if(!c.df){txt='Avanço sem oposição';marcos=2}
 else if(total<=4){txt='Ofensiva repelida';perde(c.at,'F',c.ta['Imprudente']?2:1);perde(c.at,'M',1)}
 else if(total<=7){txt='Impasse';perde(c.at,'M',1);perde(c.df,'M',1)}
 else if(total<=10){txt='Avanço';marcos=1;perde(c.df,'M',1)}
 else{txt='Ruptura';marcos=2;perde(c.df,'F',1);perde(c.df,'M',1);if(c.df.gen&&d6()===1){linhas.push(`O general ${c.df.gen.n} é morto ou capturado na ruptura.`);c.df.gen=null}}
 linhas.push(`Turno ${S.turno} · ${R(RES.de).nome} → ${rt.nome}: ${txt}.`);const conta=c.df?` (Dados ${dados}, modificador ${c.mod>0?'+':''}${c.mod}, total ${total}.)`:'';
 if(marcos){if(st.s!==c.la){st.s=c.la;st.p=0}st.p=Math.min(rt.max,st.p+marcos)}
 const chave=rt.marcas.includes('Cidade-chave');
 if(marcos&&st.p>=rt.max){const antigo=st.c;st.c=c.la;st.p=0;st.s=null;apoio(antigo,chave?-2:-1);if(chave)apoio(c.la,c.ta['Politicamente influente']?2:1);
  linhas.push(`${rt.nome} passa ao controle dos ${LADO[c.la]}.`);
  S.ex.filter(e=>e.reg===T&&e.lado!==c.la).forEach(e=>recuar(e,linhas,false))}
 [c.at,c.df].forEach(e=>{if(!e||!S.ex.includes(e))return;
  if(e.F<=0){S.ex=S.ex.filter(x=>x!==e);apoio(e.lado,-2);linhas.push(`${e.nome} é destruído.`)}
  else if(e.M<=0)recuar(e,linhas,true)});
 S.log.unshift(linhas.join(' '));ULT=linhas.join(' ')+conta;Object.assign(RES,{dado:'',fa:false,fd:false,aa:false,ad:false,ea:0,ed:0})}
function recuar(e,linhas,debandada){
 const dest=vizinhos(e.reg).filter(v=>S.reg[v].c===e.lado),emCasa=S.reg[e.reg].c===e.lado;
 if(debandada)apoio(e.lado,-1);
 if(emCasa&&!dest.length){e.post='Reorganizar';e.M=1;linhas.push(`${e.nome} entra em debandada, mas não tem para onde recuar e se mantém na região.`);return}
 if(!dest.length){S.ex=S.ex.filter(x=>x!==e);apoio(e.lado,-1);linhas.push(`${e.nome}, cercado, é destruído.`);return}
 e.reg=dest[0];e.post='Reorganizar';linhas.push(`${e.nome} ${debandada?'debanda':'recua'} para ${R(dest[0]).nome}.`)}
function naval(z){
 const fv=S.fl.filter(f=>f.zona===z&&f.lado==='V'&&f.F>0).sort((a,b)=>b.F-a.F)[0],fb=S.fl.filter(f=>f.zona===z&&f.lado==='B'&&f.F>0).sort((a,b)=>b.F-a.F)[0];
 if(!fv||!fb)return;const dados=d6()+d6(),total=dados+fv.F-fb.F;let txt;
 if(total>=9){fb.F--;txt=`${fb.nome} perde 1 de Força`+(fb.F<=0?' e é posta fora de combate':'')}
 else if(total<=5){fv.F--;txt=`${fv.nome} perde 1 de Força`+(fv.F<=0?' e é posta fora de combate':'')}
 else txt='nenhum lado obtém vantagem';
 S.fl=S.fl.filter(f=>f.F>0);
 S.log.unshift(`Turno ${S.turno} · Combate naval em ${Z(z).nome}: ${txt}.`)}
function painelBol(){
 let h='<h2>Boletim de guerra</h2>';
 if(ctl())h+=`<div class="row"><button data-a="turno">Encerrar turno</button><label>Turno <input class="num" type="number" min="1" value="${S.turno}" data-s="turno"></label><label>Ofensivas por turno <input class="num" type="number" min="1" max="5" value="${S.ofensivas}" data-s="ofensivas"></label></div>
 <div class="row"><label>Apoio Vermelhos <input class="num" type="number" min="0" max="10" value="${S.apoio.V}" data-ap="V"></label><label>Brancos <input class="num" type="number" min="0" max="10" value="${S.apoio.B}" data-ap="B"></label></div>
 <div class="row"><input id="nota" placeholder="Nota para o boletim" style="flex:1;min-width:120px"><button class="sec" data-a="nota">Publicar</button></div>`;
 h+='<div class="log">'+S.log.map((l,i)=>`<p>${esc(l)}${ctl()?` <a href="#" data-a="rmLog" data-i="${i}" style="color:var(--gold)" title="Apagar esta linha">×</a>`:''}</p>`).join('')+'</div>';
 if(ctl()){h+=`<h3>Cenário</h3><div class="row"><select id="cen">${Object.keys(CEN).map(k=>`<option value="${k}"${k===S.cen?' selected':''}>${esc(CEN[k].nome)}</option>`).join('')}</select><button class="sec" data-a="cen">Carregar</button></div><p class="muted">Carregar um cenário apaga a partida em andamento.</p>`;
  h+=`<h3>Cópia de segurança</h3><textarea id="cod">${esc(JSON.stringify(S))}</textarea><div class="row"><button class="sec" data-a="copiar">Copiar</button><button class="sec" data-a="carregar">Restaurar código colado</button></div><p class="muted" id="msg"></p>`}
 return h}
function painelRegras(){
 if(!ctl())return `<h2>Como funciona</h2>
<p><b>Posturas.</b> Em cada turno, cada exército recebe uma ordem: Avançar, Defender, Reorganizar ou Transferir. Cada gabinete tem ${S.ofensivas} ofensivas por turno.</p>
<p><b>Batalhas.</b> A Sala de Controle resolve cada frente pesando a força dos exércitos, o terreno, o suprimento, o comando e o estratagema apresentado. O resultado pode ser ofensiva repelida, impasse, avanço ou ruptura.</p>
<p><b>Ocupação.</b> Uma região muda de lado quando o atacante completa os seus marcos. Cidades-chave resistem mais.</p>
<p><b>Moral.</b> Exércitos desgastados debandam e precisam se reorganizar. Exército cercado, sem região amiga vizinha, pode ser destruído.</p>
<p><b>Generais.</b> Cada general tem patente, facção e traços de comando. O efeito de cada traço é avaliado pela Sala de Controle.</p>
<p><b>Águas e aviação.</b> Flotilhas disputam rios e mares e apoiam os exércitos das regiões vizinhas. A aviação é um recurso de apoio.</p>
<p><b>Apoio à Guerra.</b> Derrotas, regiões perdidas e crises corroem a disposição de lutar. Sem apoio, a guerra está perdida.</p>
<p class="muted">Os números do adversário e os cálculos de cada batalha são reservados à Sala de Controle.</p>`;
 return `<h2>Regras (Sala de Controle)</h2>
<p><b>Posturas.</b> Avançar, Defender, Reorganizar ou Transferir. Cada gabinete tem ${S.ofensivas} ofensivas por turno.</p>
<p><b>Resolução.</b> 2 dados + Força do atacante − Força do defensor + modificadores.</p>
<div class="card"><b>4 ou menos</b> · Ofensiva repelida: atacante −1 Força e −1 Moral</div>
<div class="card"><b>5 a 7</b> · Impasse: ambos −1 Moral</div>
<div class="card"><b>8 a 10</b> · Avanço: 1 marco; defensor −1 Moral</div>
<div class="card"><b>11 ou mais</b> · Ruptura: 2 marcos; defensor −1 Força e −1 Moral</div>
<p><b>Marcos.</b> 3 por região, 4 nas cidades-chave. Completos, a região muda de lado e os defensores recuam. Região neutra ou sem defensor cede 2 marcos sem rolagem.</p>
<p><b>Debandada.</b> Moral 0: recua e reorganiza. Sem região amiga vizinha, o exército é destruído.</p>
<p><b>Generais.</b> Valem os traços do general do exército mais forte na região e os de qualquer general de três estrelas ali presente. Em ruptura sofrida, o general do defensor é perdido com 1 em um dado.</p>
${Object.entries(TRACOS).map(([t,d])=>`<p><span class="tag tg">${t}</span> ${d}</p>`).join('')}
<p><b>Águas.</b> Quem tem a única flotilha de uma zona a domina: +1 nas batalhas em regiões ribeirinhas ou costeiras dessa zona. Zona disputada: combate naval com 2 dados + Força vermelha − Força branca; 9 ou mais, a branca perde 1; 5 ou menos, a vermelha perde 1.</p>
<p><b>Aviação.</b> Ficha de uso único por sessão: +1 em uma batalha ou revela Força e Moral de um exército inimigo.</p>
<p><b>Apoio à Guerra.</b> Região perdida −1; cidade-chave perdida −2; debandada −1; exército destruído −2; cidade-chave tomada +1.</p>`}
function formSenha(){
 const n={V:'Gabinete Vermelho',B:'Gabinete Branco',C:'Sala de Controle'}[modo];
 if(modo==='C'&&!REM)return `<h2>Iniciar o mapa</h2><p>Este mapa ainda não foi iniciado. Defina as três senhas. Elas cifram os dados sigilosos: cada gabinete só enxerga os próprios números com a sua senha.</p>
 <div class="row"><label>Sala de Controle <input type="password" id="sC"></label></div><div class="row"><label>Gabinete Vermelho <input type="password" id="sV"></label></div><div class="row"><label>Gabinete Branco <input type="password" id="sB"></label></div>
 <div class="row"><button data-a="iniciar">Iniciar mapa</button></div><p class="muted">${esc(msgSenha)}</p><p class="muted">Anote as senhas: não há como recuperá-las.</p>`;
 if(!REM)return `<h2>${n}</h2><p>A Sala de Controle ainda não iniciou este mapa.</p>`;
 return `<h2>${n}</h2><p>Digite a senha para ver os dados sigilosos desta visão.</p><div class="row"><input type="password" id="senha"><button data-a="entrar">Entrar</button></div><p class="muted">${esc(msgSenha)}</p>`}
function render(){
 S=visao();cabecalho();desenhar();
 const precisa=online&&modo!=='P'&&(modo==='C'?!(chaves.C&&FULL):!SEC[modo]);
 if(precisa&&aba!=='reg2'){pane.innerHTML=formSenha();return}
 pane.innerHTML=aba==='reg'?painelRegiao():aba==='ex'?painelEx():aba==='res'?painelRes():aba==='bol'?painelBol():painelRegras();
 if(aba==='res'&&ULT){const d=document.createElement('div');d.className='res';d.textContent=ULT;pane.appendChild(d)}
}
pane.addEventListener('click',async ev=>{
 const go=ev.target.closest('[data-go]');if(go){ev.preventDefault();sel=go.dataset.go;render();return}
 const a=ev.target.closest('[data-a]');if(!a)return;const k=a.dataset.a;
 if(k==='entrar'){const ok=await destravar(modo,document.getElementById('senha').value);msgSenha=ok?'':'Senha incorreta.';atualizar();return}
 if(k==='iniciar'){const v=['sC','sV','sB'].map(i=>document.getElementById(i).value);
  if(v.some(x=>x.length<4)||new Set(v).size<3){msgSenha='Use três senhas diferentes, com pelo menos 4 caracteres.';render();return}
  msgSenha='';await iniciarMapa(v[0],v[1],v[2]);atualizar();return}
 if(k==='enviar'){await enviarOrdens(modo);return}
 if(!ctl())return;
 if(k==='aplicarOrd'){for(const l of['V','B']){const d=DECORD[l];if(!d||d.turno!==S.turno)continue;let n=0;S.ex.filter(e=>e.lado===l).forEach(e=>{const o=d.ex[e.id];if(!o)return;let p=o.post;if(p==='Avançar'&&(++n>S.ofensivas||!o.alvo))p='Defender';if(p==='Transferir'&&!o.alvo)p='Defender';e.post=p;e.alvo=(p==='Avançar'||p==='Transferir')?o.alvo:'';e.estr=p==='Avançar'?(o.estr||''):'';e.feito=false})}S.log.unshift('Turno '+S.turno+' · Ordens dos gabinetes recebidas e aplicadas.')}
 if(k==='frente'){const e=S.ex.find(x=>x.id===a.dataset.e);if(e&&S.reg[e.alvo].c!==S.reg[e.reg].c){RES.de=e.reg;RES.para=e.alvo;RES.ter=['rio','montanha','urbano'].includes(R(e.alvo).terreno);const d=exEm(e.alvo,S.reg[e.alvo].c)[0];RES.ent=!!d&&d.post==='Defender';ULT=''}render();return}
 if(k==='ctrl'){const st=S.reg[sel];st.c=st.c==='V'?'B':st.c==='B'?'N':'V';st.p=0;st.s=null}
 if(k==='p+'){const st=S.reg[sel];if(!st.s)st.s=st.c==='V'?'B':'V';st.p=Math.min(R(sel).max,st.p+1)}
 if(k==='p-'){const st=S.reg[sel];st.p=Math.max(0,st.p-1);if(!st.p)st.s=null}
 if(k==='rmLog'){ev.preventDefault();S.log.splice(+a.dataset.i,1)}
 if(k==='rmEx'||k==='rmFl'){const id=a.dataset.e||a.dataset.f;if(RM!==id){RM=id;render();return}RM=null;if(k==='rmEx')S.ex=S.ex.filter(x=>x.id!==id);else S.fl=S.fl.filter(x=>x.id!==id)}
 if(k==='novoEx'){const g=i=>document.getElementById(i).value.trim();const nome=g('nxNome');if(!nome)return;
  S.ex.push({id:'e'+Date.now().toString(36),nome,ab:g('nxAb')||nome.slice(0,3),lado:g('nxLado'),reg:g('nxReg'),F:Math.max(1,+g('nxF')||1),M:Math.max(1,+g('nxM')||1),sup:'Suprido',tags:[],post:'Defender'});S.log.unshift(`Turno ${S.turno} · ${nome} entra em campo em ${R(g('nxReg')).nome}.`)}
 if(k==='novaFl'){const g=i=>document.getElementById(i).value.trim();const nome=g('nfNome');if(!nome)return;
  S.fl.push({id:'f'+Date.now().toString(36),nome,lado:g('nfLado'),zona:g('nfZona'),F:Math.max(1,+g('nfF')||1)})}
 if(k==='rmGen'){const n=a.dataset.g;if(RM!=='g'+n){RM='g'+n;render();return}RM=null;S.res=(S.res||[]).filter(g=>g.n!==n)}
 if(k==='novoGen'){const g=i=>document.getElementById(i).value.trim();const n=g('ngNome');if(!n)return;S.res=S.res||[];
  S.res.push({n,p:Math.max(1,Math.min(3,+g('ngP')||1)),t:[g('ngT1'),g('ngT2')].filter((t,i,a)=>t&&a.indexOf(t)===i),f:FACCOES[g('ngLado')][0],lado:g('ngLado')})}
 if(k==='rolar')aplicar();
 if(k==='naval')naval(a.dataset.z);
 if(k==='nota'){const t=document.getElementById('nota').value.trim();if(t)S.log.unshift(`Turno ${S.turno} · ${t}`)}
 if(k==='turno'){S.turno++;S.ex.forEach(e=>{if(e.post==='Reorganizar'&&e.sup!=='Cortado')e.M=Math.min(4,e.M+(e.sup==='Suprido'?2:1)+(e.gen&&e.gen.t.includes('Carismático')?1:0));if(e.post==='Transferir'&&e.alvo&&S.reg[e.alvo]&&S.reg[e.alvo].c===e.lado)e.reg=e.alvo;e.post='Defender';e.alvo='';e.estr='';e.feito=false});S.log.unshift('Início do turno '+S.turno+'.')}
 if(k==='cen'){FULL=estadoInicial(document.getElementById('cen').value);sel=null;ULT=''}
 if(k==='copiar'){const t=document.getElementById('cod');t.select();const m=document.getElementById('msg');
  (navigator.clipboard?navigator.clipboard.writeText(t.value):Promise.reject()).then(()=>m.textContent='Código copiado.',()=>m.textContent='Selecione o texto e copie manualmente.');return}
 if(k==='carregar'){try{const s=JSON.parse(document.getElementById('cod').value);if(s&&s.v===2&&s.reg&&s.ex&&s.fl){s.res=s.res||[];FULL=s}else throw 0}catch(e){document.getElementById('msg').textContent='Código inválido.';return}}
 salvar();render()});
pane.addEventListener('change',ev=>{const t=ev.target;
 if(t.dataset.o&&(modo==='V'||modo==='B')){const o=rascunho(modo),k=t.dataset.k;o.ex[t.dataset.o]=o.ex[t.dataset.o]||{post:'Defender',alvo:'',estr:''};o.ex[t.dataset.o][k]=t.value;if(k==='post')o.ex[t.dataset.o].alvo='';msgOrd='';render();return}
 if(t.dataset.r){const k=t.dataset.r;RES[k]=t.type==='checkbox'?t.checked:t.value;if(k==='de')RES.para=null;
  if(k==='para'&&RES.para){RES.ter=['rio','montanha','urbano'].includes(R(RES.para).terreno);const d=exEm(RES.para,S.reg[RES.para].c)[0];RES.ent=!!d&&d.post==='Defender'}
  if(k==='ea'||k==='ed')RES[k]=Math.max(0,Math.min(2,+t.value||0));ULT='';render();return}
 if(!ctl())return;
 if(t.dataset.e&&t.dataset.k==='gen'){const e=S.ex.find(x=>x.id===t.dataset.e);if(t.value==='=')return;S.res=S.res||[];
  if(e.gen){S.res.push(Object.assign({lado:e.lado},e.gen));if(e.gen.t.includes('Politicamente influente')){apoio(e.lado,-1);S.log.unshift(`Turno ${S.turno} · A destituição do general ${e.gen.n} custa 1 de Apoio à Guerra aos ${LADO[e.lado]}.`)}}
  const i=S.res.findIndex(g=>g.n===t.value&&g.lado===e.lado);e.gen=i>=0?S.res.splice(i,1)[0]:null;salvar();render();return}
 if(t.dataset.e&&t.dataset.k==='genp'){const e=S.ex.find(x=>x.id===t.dataset.e);if(e.gen)e.gen.p=Math.max(1,Math.min(3,+t.value||1));salvar();render();return}
 if(t.dataset.e){const e=S.ex.find(x=>x.id===t.dataset.e),k=t.dataset.k;e[k]=(k==='F'||k==='M')?Math.max(0,+t.value||0):k==='tags'?t.value.split(',').map(s=>s.trim()).filter(Boolean):t.value}
 else if(t.dataset.f){const f=S.fl.find(x=>x.id===t.dataset.f),k=t.dataset.k;f[k]=k==='F'?Math.max(0,+t.value||0):t.value}
 else if(t.dataset.ap)S.apoio[t.dataset.ap]=Math.max(0,Math.min(10,+t.value||0));
 else if(t.dataset.s)S[t.dataset.s]=Math.max(1,+t.value||1);
 else return;
 salvar();render()});
document.getElementById('modo').addEventListener('change',ev=>{modo=ev.target.value;msgSenha='';render()});
render();conectar();
