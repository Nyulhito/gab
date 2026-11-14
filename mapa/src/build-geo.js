const fs=require('fs'),topoS=require('topojson-server'),topoC=require('topojson-client'),topoSimp=require('topojson-simplify');
const html=fs.readFileSync('/home/claude/mapa/index.html','utf8');
const SEEDS={pet:[30.3,59.9],psk:[27.6,58.0],nor:[41.0,63.8],vol:[45.5,59.6],tve:[34.2,57.6],mos:[37.6,55.75],smo:[31.6,54.6],tul:[38.3,54.0],ori:[36.0,52.2],vor:[40.0,51.4],niz:[44.0,56.5],kaz:[49.1,55.8],sam:[49.8,53.4],sar:[45.6,51.6],tsa:[44.5,48.7],ast:[48.0,46.6],kie:[30.5,50.4],kha:[36.6,49.3],cri:[34.3,45.9],don:[40.6,47.7],kub:[40.2,44.9],ufa:[56.0,54.7],ura:[59.0,57.6],ore:[54.6,51.4],oms:[70.0,55.4]};
const OVR=JSON.parse(fs.readFileSync('ovr.json','utf8'));
const all=JSON.parse(fs.readFileSync('adm1.json','utf8')).features;
const EXC=/Kaliningrad|Yamal|Khanty|Nenets|Novosibirsk|Tomsk|Altay|Kemerovo|Krasnoyarsk/i;
const feats=[];
for(const f of all){const p=f.properties,a=p.adm0_a3,lon=p.longitude,lat=p.latitude,n=p.name_en||p.name||'';
 if(!f.geometry)continue;
 let ok=false;
 if(a==='RUS')ok=lon<78.5&&lon>20&&!EXC.test(n);
 if(a==='UKR')ok=true;
 if(a==='BLR')ok=lon>28.4;
 if(!ok)continue;
 let best=null,bd=1e9;for(const k in SEEDS){const d=Math.hypot((lon-SEEDS[k][0])*0.57,lat-SEEDS[k][1]);if(d<bd){bd=d;best=k}}
 if(OVR[n]!==undefined)best=OVR[n];
 if(best===null||best==='')continue;
 f.properties={n,r:best};feats.push(f)}
if(process.argv[2]==='list'){const by={};feats.forEach(f=>(by[f.properties.r]=by[f.properties.r]||[]).push(f.properties.n));for(const k in SEEDS)console.log(k,':',(by[k]||[]).join(', '));process.exit()}
let topo=topoS.topology({u:{type:'FeatureCollection',features:feats}},1e5);
topo=topoSimp.presimplify(topo);const w=topoSimp.quantile(topo,+process.argv[3]||0.03);topo=topoSimp.simplify(topo,w);
const geoms=topo.objects.u.geometries;const ids=Object.keys(SEEDS);
const r2=p=>[+p[0].toFixed(2),+p[1].toFixed(2)];
const POL={};let pts=0;
for(const id of ids){const m=topoC.merge(topo,geoms.filter(g=>g.properties.r===id));
 const rings=[];for(const poly of m.coordinates){ // só anel externo, descarta ilhas minúsculas e o que fica acima de 70N
  const ring=poly[0].map(r2);let A=0;for(let i=0;i<ring.length-1;i++)A+=ring[i][0]*ring[i+1][1]-ring[i+1][0]*ring[i][1];
  if(Math.abs(A)/2<0.05)continue;if(Math.min(...ring.map(p=>p[1]))>70)continue;rings.push(ring.slice(0,-1));pts+=ring.length}
 POL[id]=rings}
const BOR=[];
for(let i=0;i<ids.length;i++)for(let j=i+1;j<ids.length;j++){const A=ids[i],B=ids[j];
 const m=topoC.mesh(topo,topo.objects.u,(a,b)=>a!==b&&((a.properties.r===A&&b.properties.r===B)||(a.properties.r===B&&b.properties.r===A)));
 let len=0;const ls=m.coordinates.map(l=>l.map(r2));ls.forEach(l=>{for(let k=1;k<l.length;k++)len+=Math.hypot((l[k][0]-l[k-1][0])*0.57,l[k][1]-l[k-1][1])});
 if(len>0.25){BOR.push({a:A,b:B,l:ls});pts+=ls.reduce((s,l)=>s+l.length,0)}}
const LAND=JSON.parse(fs.readFileSync('land.json','utf8'));
fs.writeFileSync('geo.json',JSON.stringify({POL,BOR,LAND}));
console.log('pts',pts,'bytes',fs.statSync('geo.json').size,'bordas',BOR.length);
const adj={};BOR.forEach(b=>{(adj[b.a]=adj[b.a]||[]).push(b.b);(adj[b.b]=adj[b.b]||[]).push(b.a)});
for(const id of ids)console.log(id,':',(adj[id]||[]).join(' '));
