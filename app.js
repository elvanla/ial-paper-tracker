"use strict";
/* ================= reference definitions ================= */
const LIB_SUBJECTS = [
  {id:"AC", name:"Accounting", units:["WAC11","WAC12"]},
  {id:"BI", name:"Biology", units:["WBI11","WBI12","WBI13","WBI14","WBI15","WBI16"]},
  {id:"BS", name:"Business", units:["WBS11","WBS12","WBS13","WBS14"]},
  {id:"CH", name:"Chemistry", units:["WCH11","WCH12","WCH13","WCH14","WCH15","WCH16"]},
  {id:"EC", name:"Economics", units:["WEC11","WEC12","WEC13","WEC14"]},
  {id:"FM", name:"Further Mathematics", units:["WFM01","WFM02","WFM03","WME01","WME02","WME03","WST01","WST02","WST03","WDM11"], def:["WFM01","WFM02","WFM03"]},
  {id:"IT", name:"Information Technology", units:["WIT11","WIT12","WIT13","WIT14"]},
  {id:"LA", name:"Law", units:["YLA1-01","YLA1-02"]},
  {id:"MA", name:"Mathematics", units:["WMA11","WMA12","WMA13","WMA14","WME01","WST01","WME02","WST02","WDM11"], def:["WMA11","WMA12","WMA13","WMA14","WME01","WST01"]},
  {id:"PH", name:"Physics", units:["WPH11","WPH12","WPH13","WPH14","WPH15","WPH16"]},
  {id:"PS", name:"Psychology", units:["WPS01","WPS02","WPS03","WPS04"]}
];
const U = (s,short,name,level,max,ums) => ({s,short,name,level,max,ums});
const BUILTIN_UNITS = {
  WPH11:U("PH","U1","Mechanics and Materials","AS",80,120), WPH12:U("PH","U2","Waves and Electricity","AS",80,120),
  WPH13:U("PH","U3","Practical Skills in Physics I","AS",50,60), WPH14:U("PH","U4","Further Mechanics, Fields and Particles","A2",90,120),
  WPH15:U("PH","U5","Thermodynamics, Radiation, Oscillations and Cosmology","A2",90,120), WPH16:U("PH","U6","Practical Skills in Physics II","A2",50,60),
  WMA11:U("MA","P1","Pure Mathematics 1","AS",75,100), WMA12:U("MA","P2","Pure Mathematics 2","AS",75,100),
  WMA13:U("MA","P3","Pure Mathematics 3","A2",75,100), WMA14:U("MA","P4","Pure Mathematics 4","A2",75,100),
  WME01:U("MA","M1","Mechanics 1","AS",75,100), WME02:U("MA","M2","Mechanics 2","A2",75,100), WME03:U("FM","M3","Mechanics 3","A2",75,100),
  WST01:U("MA","S1","Statistics 1","AS",75,100), WST02:U("MA","S2","Statistics 2","A2",75,100), WST03:U("FM","S3","Statistics 3","A2",75,100),
  WDM11:U("MA","D1","Decision Mathematics 1","AS",75,100),
  WFM01:U("FM","F1","Further Pure Mathematics 1","AS",75,100), WFM02:U("FM","F2","Further Pure Mathematics 2","A2",75,100), WFM03:U("FM","F3","Further Pure Mathematics 3","A2",75,100),
  WCH11:U("CH","U1","Structure, Bonding and Introduction to Organic Chemistry","AS",80,120), WCH12:U("CH","U2","Energetics, Group Chemistry, Halogenoalkanes and Alcohols","AS",80,120),
  WCH13:U("CH","U3","Practical Skills in Chemistry I","AS",50,60), WCH14:U("CH","U4","Rates, Equilibria and Further Organic Chemistry","A2",90,120),
  WCH15:U("CH","U5","Transition Metals and Organic Nitrogen Chemistry","A2",90,120), WCH16:U("CH","U6","Practical Skills in Chemistry II","A2",50,60),
  WBI11:U("BI","U1","Molecules, Diet, Transport and Health","AS",80,120), WBI12:U("BI","U2","Cells, Development, Biodiversity and Conservation","AS",80,120),
  WBI13:U("BI","U3","Practical Skills in Biology I","AS",50,60), WBI14:U("BI","U4","Energy, Environment, Microbiology and Immunity","A2",90,120),
  WBI15:U("BI","U5","Respiration, Internal Environment, Coordination and Gene Technology","A2",90,120), WBI16:U("BI","U6","Practical Skills in Biology II","A2",50,60),
  WEC11:U("EC","U1","Markets in Action","AS",80,100), WEC12:U("EC","U2","Macroeconomic Performance and Policy","AS",80,100),
  WEC13:U("EC","U3","Business Behaviour","A2",80,100), WEC14:U("EC","U4","Developments in the Global Economy","A2",80,100),
  WBS11:U("BS","U1","Marketing and People","AS",80,100), WBS12:U("BS","U2","Managing Business Activities","AS",80,100),
  WBS13:U("BS","U3","Business Decisions and Strategy","A2",80,100), WBS14:U("BS","U4","Global Business","A2",80,100),
  WAC11:U("AC","U1","The Accounting System and Costing","AS",200,300), WAC12:U("AC","U2","Corporate and Management Accounting","A2",200,300),
  WIT11:U("IT","U1","Information Technology Unit 1","AS",80,100), WIT12:U("IT","U2","Information Technology Unit 2","AS",80,100),
  WIT13:U("IT","U3","Information Technology Unit 3","A2",80,100), WIT14:U("IT","U4","Information Technology Unit 4","A2",80,100),
  WPS01:U("PS","U1","Social and Cognitive Psychology","AS",64,80), WPS02:U("PS","U2","Biological Psychology, Learning Theories and Development","AS",96,120),
  WPS03:U("PS","U3","Applications of Psychology","A2",64,80), WPS04:U("PS","U4","Clinical Psychology and Psychological Skills","A2",96,120),
  "YLA1-01":Object.assign(U("LA","P1","Underlying Principles of Law and the English Legal System","A2",100,0),{law:true,pair:"YLA1-02"}),
  "YLA1-02":Object.assign(U("LA","P2","The Law in Action","A2",100,0),{law:true,pair:"YLA1-01"})
};
const SERIES_LABEL = Object.fromEntries(SERIES);
const VARIANT_LABEL = {"":"Main paper","A":"Variant paper (e.g. 1A)","R":"Reissued paper (R)"};
const GRADES_AS = ["A","B","C","D","E"], GRADES_A2 = ["A*","A","B","C","D","E"];
const UMS_AS = [.8,.7,.6,.5,.4], UMS_A2 = [.9,.8,.7,.6,.5,.4];

/* ================= state ================= */
const DEFAULT_PROFILE = {subjects:null, countVariants:true, customSubjects:[], customUnits:[], examDates:{}};
const S = {
  attempts: [],              // [{id, ...}]
  profile: structuredClone(DEFAULT_PROFILE),
  tab: "overview",
  gridSubject: null, trendSubject: null, trendHidden: {}, histFilter: "all", histSort: {k:"date", dir:-1},
  mode: "connecting"         // connecting | cloud | local
};
try { const t = localStorage.getItem("ialpt.tab"); if (t) S.tab = t; } catch(e){}

/* ================= model helpers ================= */
function normalizeProfile(p){
  p = {...DEFAULT_PROFILE, ...(p||{})};
  // older versions kept units inside customSubjects
  const cu = (p.customUnits||[]).slice(); const cs = [];
  for (const c of (p.customSubjects||[])){
    cs.push({id:c.id, name:c.name});
    for (const u of (c.units||[])) if (!cu.some(x=>x.code===u.code)) cu.push({...u, subject:c.id});
  }
  p.customSubjects = cs; p.customUnits = cu;
  if (!p.examDates || typeof p.examDates !== "object") p.examDates = {};
  if (p.subjects && p.subjects.some(x=>!x || !Array.isArray(x.units))) p.subjects = null;
  return p;
}
function libSubject(id){ return LIB_SUBJECTS.find(s=>s.id===id) || (S.profile.customSubjects||[]).find(s=>s.id===id); }
function allUnitsOf(id){
  const lib = LIB_SUBJECTS.find(s=>s.id===id);
  return (lib ? lib.units.slice() : []).concat((S.profile.customUnits||[]).filter(u=>u.subject===id).map(u=>u.code));
}
/* The subjects this user has picked, with the papers they're sitting. Older profiles
   (from before subject picking) fall back to the three original subjects. */
function chosenList(){
  if (Array.isArray(S.profile.subjects)) return S.profile.subjects;
  if (!S.attempts.length) return [];
  const hidden = S.profile.hidden || [];
  const base = ["PH","MA","EC"].filter(id=>!hidden.includes(id)).map(id=>{ const l=libSubject(id); return {id, units:(l.def||l.units).slice()}; });
  for (const c of (S.profile.customSubjects||[])) base.push({id:c.id, units:allUnitsOf(c.id)});
  return base;
}
function subjects(){
  return chosenList().map(c => { const l = libSubject(c.id); if (!l) return null;
    return {id:c.id, name:l.name, custom:!LIB_SUBJECTS.some(x=>x.id===c.id), units:c.units.filter(code=>unitDef(code))}; }).filter(Boolean);
}
function visibleSubjects(){ return subjects(); }
function unitDef(code){
  if (BUILTIN_UNITS[code]) return {code, ...BUILTIN_UNITS[code]};
  const u = (S.profile.customUnits||[]).find(x=>x.code===code);
  if (u) return {code, s:u.subject, short:u.short||u.code, name:u.name, level:u.level, max:u.max, ums:u.ums||100, defaultBounds:u.bounds||null, custom:true};
  return null;
}
function subjectOf(id){ const l = libSubject(id); return subjects().find(s => s.id === id) || (l ? {id, name:l.name, units:allUnitsOf(id)} : null); }
function subjColor(id){ return ["PH","MA","FM","CH","BI","EC","BS","AC","IT","PS","LA"].includes(id) ? `var(--sub-${id})` : "var(--sub-X)"; }
function setChosen(list){ S.profile.subjects = list; saveProfile(); }
function officialBounds(series, code, variant){
  const row = B[series]; if (!row) return null;
  return row[variant ? code + "/" + variant : code] || null;
}
function variantsFor(series, code){
  const out = []; const row = B[series]; if (!row) return out;
  for (const v of ["","A","R"]) if (row[v ? code+"/"+v : code]) out.push(v);
  return out;
}
function seriesFor(code){ return SERIES.filter(([id]) => B[id] && B[id][code]).map(([id]) => id).reverse(); }
function gradeLetters(u){ return u.level === "A2" ? GRADES_A2 : GRADES_AS; }
function gradeFor(raw, bounds, u){
  if (!bounds) return null;
  const L = gradeLetters(u);
  for (let i=0;i<L.length;i++) if (raw >= bounds[i]) return L[i];
  return "U";
}
function umsFor(raw, bounds, u){
  if (!bounds || !u.ums) return null;
  const fr = u.level === "A2" ? UMS_A2 : UMS_AS;
  const pts = [[0,0]];
  for (let i=bounds.length-1;i>=0;i--) pts.push([bounds[i], fr[i]*u.ums]);
  // Full UMS is reached before full marks (Pearson/AQA rule): AS caps at A + 2×(A−B);
  // A2 caps the same distance above A* as A* is above A (or at full marks if A is close to it).
  const hasStar = u.level === "A2" && bounds.length >= 6, iA = hasStar ? 1 : 0;
  const A = bounds[iA], B = bounds[iA+1];
  let cap = u.max;
  if (A != null && B != null && A > B){
    if (!hasStar) cap = A + 2*(A-B);
    else if (u.max - A > 2*(A-B)) cap = bounds[0] + (bounds[0]-A);
  }
  pts.push([Math.min(u.max, cap), u.ums]);
  const clean = [];
  for (const p of pts){ if (clean.length && p[0] <= clean[clean.length-1][0]) { clean[clean.length-1][1] = Math.max(clean[clean.length-1][1], p[1]); continue; } clean.push(p.slice()); }
  const r = Math.max(0, Math.min(u.max, raw));
  for (let i=1;i<clean.length;i++){
    const [x0,y0]=clean[i-1],[x1,y1]=clean[i];
    if (r <= x1) return Math.round(y0 + (r-x0)*(y1-y0)/(x1-x0));
  }
  return u.ums;
}
function nextGradeGap(raw, bounds, u){
  if (!bounds) return null;
  const L = gradeLetters(u);
  for (let i=L.length-1;i>=0;i--){ /* walk from E upward */ }
  let idx = L.length; // index of current grade (L.length = U)
  for (let i=0;i<L.length;i++) if (raw >= bounds[i]) { idx = i; break; }
  if (idx === 0) return {top:true, over: raw - bounds[0]};
  return {grade:L[idx-1], need: bounds[idx-1] - raw};
}
function boundsOf(a){ return a.bounds || officialBounds(a.series, a.unit, a.variant||""); }
function enrich(a){
  const u = unitDef(a.unit); if (!u) return null;
  const max = a.max || u.max;
  const b = boundsOf(a);
  const uu = {...u, max};
  const est = !!u.law && a.series !== "custom";
  return {...a, u:uu, pct: a.raw/max*100, grade: gradeFor(a.raw,b,uu), ums: umsFor(a.raw,b,uu), gap: nextGradeGap(a.raw,b,uu), b,
    est, combined: est ? lawCombined(u, a.series, a.raw) : null,
    seriesLabel: a.series === "custom" ? (a.seriesLabel || "Other") : (SERIES_LABEL[a.series] || a.series)};
}
/* Law is graded on Paper 1 + Paper 2 together. If the other paper from the same series is logged, give the real combined grade. */
function lawCombined(u, series, raw){
  if (!u.law || typeof LAWB === "undefined" || !LAWB[series]) return null;
  const other = S.attempts.filter(x => x.unit === u.pair && x.series === series).sort((x,y)=>(y.created||0)-(x.created||0))[0];
  if (!other) return null;
  const total = raw + other.raw;
  return {total, grade: gradeFor(total, LAWB[series], {level:"A2"}), other: unitDef(u.pair).short};
}
function lawNote(e){
  if (!e.est) return "";
  return e.combined ? `With ${e.combined.other} from this series: ${e.combined.total}/200, grade ${e.combined.grade}` : "Estimated grade: Law is graded on both papers added together";
}
function allEnriched(){ return S.attempts.map(enrich).filter(Boolean).sort((x,y)=> (x.date||"").localeCompare(y.date||"") || (x.created||0)-(y.created||0)); }
function gClass(g){ if (!g) return "g-none"; return g === "A*" ? "g-As" : "g-"+g; }
function gradeChip(g){ return `<span class="g ${gClass(g)}">${g||"–"}</span>`; }
function esc(s){ return String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function fmtPct(p){ return (Math.round(p*10)/10).toFixed(1) + "%"; }
function fmtDate(d){ if (!d) return "—"; const [y,m,dd] = d.split("-").map(Number); return new Date(y,m-1,dd).toLocaleDateString(undefined,{day:"numeric",month:"short",year:"numeric"}); }
function today(){ const d=new Date(); return d.getFullYear()+"-"+String(d.getMonth()+1).padStart(2,"0")+"-"+String(d.getDate()).padStart(2,"0"); }

/* Predicted unit UMS per the chosen method */
function unitUMS(list){
  const withU = list.filter(a => a.ums != null);
  if (!withU.length) return null;
  const m = S.profile.predict;
  if (m === "latest") return withU[withU.length-1].ums;
  if (m === "best") return Math.max(...withU.map(a=>a.ums));
  const last = withU.slice(-3); return Math.round(last.reduce((s,a)=>s+a.ums,0)/last.length);
}
function overallFromPct(p){ return p>=80?"A":p>=70?"B":p>=60?"C":p>=50?"D":p>=40?"E":"U"; }
function predictSubject(subj, att){
  const units = subj.units.map(unitDef).filter(Boolean);
  let got = 0, gotMax = 0, total = 0, a2 = 0, a2Max = 0, a2Known = 0, a2Count = 0; const missing = [];
  const astarUnits = subj.astar || units.filter(u=>u.level==="A2").map(u=>u.code);
  for (const u of units){
    total += u.ums;
    const um = unitUMS(att.filter(a=>a.unit===u.code));
    const isA2 = astarUnits.includes(u.code);
    if (isA2){ a2Max += u.ums; a2Count++; }
    if (um == null){ missing.push(u); continue; }
    got += um; gotMax += u.ums;
    if (isA2){ a2 += um; a2Known += u.ums; }
  }
  if (!gotMax) return null;
  const complete = missing.length === 0;
  const pct = got/gotMax*100;
  let grade = overallFromPct(pct);
  const a2pct = a2Known ? a2/a2Known*100 : null;
  if (grade === "A" && a2pct != null && a2pct >= 90 && (complete || a2Known === a2Max)) grade = "A*";
  return {complete, pct, got, gotMax, total, grade, missing, a2pct, a2Max, a2Known, projected: complete ? got : Math.round(pct/100*total)};
}
function paperKey(unit, series, variant){ return unit+"|"+series+"|"+(variant||""); }
function availablePapers(subj){
  const out = [];
  for (const code of subj.units) for (const s of seriesFor(code)) for (const v of variantsFor(s, code)) {
    if (v && !S.profile.countVariants) continue;
    out.push(paperKey(code,s,v));
  }
  return out;
}

/* ================= storage (Supabase) ================= */
const CFG = window.TRACKER_CONFIG || {};
let sb = null, UID = null;
const DB = true;
async function initStore(){
  const bad = !CFG.supabaseUrl || /PASTE/i.test(CFG.supabaseUrl + CFG.supabaseKey);
  if (bad || !window.supabase){ S.mode = "config"; render(); return; }
  // A password-reset link lands here with ?reset=1 (and/or #type=recovery): show the "new password" form, not the app.
  if (/[?&]reset=1\b/.test(location.search) || /type=recovery/.test(location.hash)){ S.authMode = "newpass"; S.mode = "auth"; }
  sb = window.supabase.createClient(CFG.supabaseUrl, CFG.supabaseKey);
  sb.auth.onAuthStateChange((event, session) => {
    if (event === "PASSWORD_RECOVERY"){ S.authMode = "newpass"; S.mode = "auth"; render(); return; }
    setTimeout(() => handleSession(session), 0);
  });
  const { data } = await sb.auth.getSession();
  if (S.authMode === "newpass"){ S.mode = "auth"; render(); return; }
  await handleSession(data.session);
}
async function handleSession(session){
  if (S.authMode === "newpass") return;
  const user = session && session.user;
  if (!user){
    UID = null; S.user = null; S.attempts = []; S.profile = normalizeProfile({}); S.profileLoaded = false;
    S.mode = "auth"; render(); return;
  }
  if (UID === user.id && (S.mode === "cloud" || S.mode === "connecting")) return;
  UID = user.id; S.user = user; S.mode = "connecting"; render();
  await loadAll();
}
async function loadAll(){
  try {
    const rows = [];
    for (let from = 0; ; from += 1000){
      const { data, error } = await sb.from("attempts").select("id, body").order("created_at").range(from, from + 999);
      if (error) throw error;
      rows.push(...data); if (data.length < 1000) break;
    }
    const { data: prof, error: pe } = await sb.from("profiles").select("data").maybeSingle();
    if (pe) throw pe;
    S.attempts = rows.map(r => ({...r.body, id: r.id}));
    S.profile = normalizeProfile(prof && prof.data);
    S.profileLoaded = true; S.mode = "cloud"; render();
  } catch (e) { S.mode = "error"; S.loadError = (e && e.message) || String(e); render(); }
}
document.addEventListener("visibilitychange", () => {
  if (document.visibilityState === "visible" && S.mode === "cloud" && !document.getElementById("scrim")) loadAll();
});
function newId(){ return "a" + Date.now().toString(36) + Math.random().toString(36).slice(2,7); }
async function saveAttempt(a){
  const {id, ...body} = a;
  const { error } = await sb.from("attempts").upsert({user_id: UID, id, body: JSON.parse(JSON.stringify(body)), updated_at: new Date().toISOString()});
  if (error) throw error;
  const i = S.attempts.findIndex(x => x.id === id); if (i >= 0) S.attempts[i] = a; else S.attempts.push(a);
  render();
}
async function deleteAttempt(id){
  const { error } = await sb.from("attempts").delete().eq("id", id);
  if (error) throw error;
  S.attempts = S.attempts.filter(a => a.id !== id); render();
}
let profileWriting = Promise.resolve();
function saveProfile(){
  render();
  const body = JSON.parse(JSON.stringify(S.profile));
  profileWriting = profileWriting.then(async () => {
    const { error } = await sb.from("profiles").upsert({user_id: UID, data: body, updated_at: new Date().toISOString()});
    if (error) throw error;
  }).catch(() => toast("Couldn't save your settings. Check your connection and try again."));
}

/* ================= sign in / account ================= */
S.authMode = "signin";
function vAuth(){
  const m = S.authMode;
  const intro = `<div class="auth-intro"><span class="eyebrow">Edexcel International A Level</span>
    <h2>The free IAL past paper tracker.</h2>
    <p>Log your Edexcel IAL past-paper marks and get your grade and UMS straight away, worked out from Pearson's official grade boundaries for that exact paper and series.</p>
    <ul><li>Maths, Further Maths, Physics, Chemistry, Biology, Economics, Business, Accounting, IT, Psychology and Law, Jan 2019 onwards</li>
      <li>A grid of every past paper (WMA11, WPH11, WEC11…), so you can see what's left to do</li>
      <li>UMS converter, trends, daily streaks and exam countdowns</li>
      <li>Syncs across your phone, tablet and laptop</li></ul></div>`;
  let card;
  if (m === "signup") card = `<h3>Create your account</h3>
      <button type="button" class="btn google" id="googleBtn"><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Continue with Google</button>
      <div class="or"><span>or use email</span></div>
      <label class="f" for="aEmail">Email<input id="aEmail" type="email" autocomplete="email" required></label>
      <label class="f" for="aPass">Password (at least 8 characters)<input id="aPass" type="password" autocomplete="new-password" minlength="8" required></label>
      <label class="check" for="aAgree"><input type="checkbox" id="aAgree" required><span>I've read the <a href="privacy.html" target="_blank">privacy notice</a>. If I'm under 13, a parent or guardian has agreed to me using this site.</span></label>
      <button class="btn primary" type="submit">Create account</button>
      <div class="auth-links"><button type="button" class="linkbtn" data-auth="signin">I already have an account</button></div>`;
  else if (m === "reset") card = `<h3>Reset your password</h3>
      <p class="caption" style="margin:0">We'll email you a link to set a new password.</p>
      <label class="f" for="aEmail">Email<input id="aEmail" type="email" autocomplete="email" required></label>
      <button class="btn primary" type="submit">Send reset link</button>
      <div class="auth-links"><button type="button" class="linkbtn" data-auth="signin">Back to sign in</button></div>`;
  else if (m === "newpass") card = `<h3>Choose a new password</h3>
      <label class="f" for="aPass">New password (at least 8 characters)<input id="aPass" type="password" autocomplete="new-password" minlength="8" required></label>
      <button class="btn primary" type="submit">Save new password</button>`;
  else card = `<h3>Sign in</h3>
      <button type="button" class="btn google" id="googleBtn"><svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>Continue with Google</button>
      <div class="or"><span>or use email</span></div>
      <label class="f" for="aEmail">Email<input id="aEmail" type="email" autocomplete="email" required></label>
      <label class="f" for="aPass">Password<input id="aPass" type="password" autocomplete="current-password" required></label>
      <button class="btn primary" type="submit">Sign in</button>
      <p class="caption" style="margin:0">By continuing with Google you agree to the <a href="privacy.html" target="_blank">privacy notice</a>.</p>
      <div class="auth-links"><button type="button" class="linkbtn" data-auth="signup">Create an account</button><button type="button" class="linkbtn" data-auth="reset">Forgot your password?</button></div>`;
  return `<div class="auth">${intro}<form class="panel auth-card" id="authForm" novalidate>${card}<div class="err" id="aErr" role="alert"></div><div class="ok" id="aOk" role="status"></div></form></div>`;
}
function bindAuth(){
  const f = document.getElementById("authForm"); if (!f) return;
  f.querySelectorAll("[data-auth]").forEach(b => b.onclick = () => { S.authMode = b.dataset.auth; render(); });
  const gb = document.getElementById("googleBtn");
  if (gb) gb.onclick = async () => {
    const err = document.getElementById("aErr"); err.textContent = ""; gb.disabled = true;
    const { error } = await sb.auth.signInWithOAuth({provider: "google", options: {redirectTo: location.origin + location.pathname}});
    if (error){ gb.disabled = false; err.textContent = /not enabled|unsupported provider/i.test(error.message) ? "Google sign-in isn't switched on for this site yet. Use email for now." : error.message; }
  };
  f.onsubmit = async ev => {
    ev.preventDefault();
    const q = id => document.getElementById(id);
    const err = q("aErr"), ok = q("aOk"); err.textContent = ""; ok.textContent = "";
    const email = q("aEmail") ? q("aEmail").value.trim() : "", pass = q("aPass") ? q("aPass").value : "";
    const btn = f.querySelector('button[type="submit"]');
    if (q("aEmail") && !/^\S+@\S+\.\S+$/.test(email)){ err.textContent = "Enter a valid email address."; return; }
    if ((S.authMode === "signup" || S.authMode === "newpass") && pass.length < 8){ err.textContent = "Use at least 8 characters for your password."; return; }
    if (S.authMode === "signup" && !q("aAgree").checked){ err.textContent = "Tick the box to confirm you've read the privacy notice."; return; }
    btn.disabled = true;
    try {
      if (S.authMode === "signin"){
        const { error } = await sb.auth.signInWithPassword({email, password: pass});
        if (error) throw error;
      } else if (S.authMode === "signup"){
        const { data, error } = await sb.auth.signUp({email, password: pass, options: {emailRedirectTo: location.origin + location.pathname}});
        if (error) throw error;
        if (!data.session){
          if (data.user && Array.isArray(data.user.identities) && data.user.identities.length === 0) err.textContent = "That email already has an account. Sign in instead.";
          else ok.textContent = `Check ${email} for a link to confirm your account, then come back and sign in.`;
        }
      } else if (S.authMode === "reset"){
        const { error } = await sb.auth.resetPasswordForEmail(email, {redirectTo: location.origin + location.pathname + "?reset=1"});
        if (error) throw error;
        ok.textContent = `If ${email} has an account, a reset link is on its way.`;
      } else if (S.authMode === "newpass"){
        const { error } = await sb.auth.updateUser({password: pass});
        if (error) throw error;
        S.authMode = "signin"; toast("Password updated");
        try { history.replaceState(null, "", location.pathname); } catch(_){}
        const { data } = await sb.auth.getSession(); await handleSession(data.session);
      }
    } catch (e) {
      const msg = (e && e.message) || "Something went wrong.";
      err.textContent = /invalid login/i.test(msg) ? "That email and password don't match. Check them and try again."
        : /email not confirmed/i.test(msg) ? "Confirm your email first. Check your inbox for the link."
        : /rate limit/i.test(msg) ? "Too many emails sent in the last hour. Try again later."
        : msg;
    } finally { btn.disabled = false; }
  };
}
function updateChrome(){
  const inApp = S.mode === "cloud" || S.mode === "connecting";
  document.getElementById("tabs").hidden = !inApp;
  document.getElementById("logBtn").hidden = S.mode !== "cloud";
  const w = document.getElementById("acctWrap"); w.hidden = !S.user;
  if (S.user){
    const em = S.user.email || "";
    document.getElementById("acctInitial").textContent = (em[0] || "?").toUpperCase();
    document.getElementById("acctEmail").textContent = em;
    document.getElementById("acctWho").textContent = "Signed in as " + em;
  }
}
function closeAcctMenu(){ const m = document.getElementById("acctMenu"); m.hidden = true; document.getElementById("acctBtn").setAttribute("aria-expanded","false"); }
document.getElementById("acctBtn").onclick = e => { e.stopPropagation(); const m = document.getElementById("acctMenu"); m.hidden = !m.hidden; document.getElementById("acctBtn").setAttribute("aria-expanded", String(!m.hidden)); };
document.addEventListener("click", e => { if (!e.target.closest("#acctWrap")) closeAcctMenu(); });
document.getElementById("signOutBtn").onclick = async () => { closeAcctMenu(); S.authMode = "signin"; S.tab = "overview"; await sb.auth.signOut(); };
document.getElementById("deleteAcctBtn").onclick = () => {
  closeAcctMenu();
  const root = document.getElementById("modalRoot");
  root.innerHTML = `<div class="scrim" id="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="dTitle" style="width:min(460px,100%)">
    <div class="modal-h"><h2 id="dTitle">Delete your account</h2><button class="btn ghost sm" id="dClose" aria-label="Close">✕</button></div>
    <div class="modal-b"><p style="margin:0">This permanently deletes your account and every paper you've logged. It can't be undone.</p>
      <p class="caption" style="margin:0">Want a copy first? Use Copy backup in Subjects &amp; units.</p>
      <label class="f" for="dConfirm">Type DELETE to confirm<input id="dConfirm" autocomplete="off"></label><div class="err" id="dErr" role="alert"></div></div>
    <div class="modal-f"><button class="btn" id="dCancel">Cancel</button><button class="btn primary" id="dGo" style="background:var(--bad);border-color:var(--bad);color:#fff">Delete everything</button></div></div></div>`;
  const q = id => document.getElementById(id); const close = () => root.innerHTML = "";
  q("dClose").onclick = q("dCancel").onclick = close;
  q("dGo").onclick = async () => {
    if (q("dConfirm").value.trim() !== "DELETE"){ q("dErr").textContent = "Type DELETE in capitals to confirm."; return; }
    q("dGo").disabled = true;
    const { error } = await sb.rpc("delete_my_account");
    if (error){ q("dGo").disabled = false; q("dErr").textContent = "Couldn't delete your account: " + error.message; return; }
    close(); S.authMode = "signup"; S.tab = "overview"; await sb.auth.signOut(); toast("Your account and data have been deleted");
  };
};


/* ---------- theme ---------- */
function effectiveTheme(){ const t = document.documentElement.dataset.theme; return t || (matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"); }
function paintThemeBtn(){ const b = document.getElementById("themeBtn"); if (!b) return; const dark = effectiveTheme()==="dark";
  b.innerHTML = dark ? '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg><span>Light</span>'
                     : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg><span>Dark</span>';
  b.setAttribute("aria-label", dark ? "Switch to light mode" : "Switch to dark mode"); }
document.getElementById("themeBtn").onclick = () => { const next = effectiveTheme()==="dark" ? "light" : "dark"; document.documentElement.dataset.theme = next; try{ localStorage.setItem("theme", next); }catch(_){} paintThemeBtn(); };
matchMedia("(prefers-color-scheme: dark)").addEventListener?.("change", paintThemeBtn);
paintThemeBtn();
/* ================= rendering ================= */
const main = document.getElementById("main");
function render(){
  document.querySelectorAll(".tab").forEach(t => t.setAttribute("aria-selected", String(t.dataset.tab === S.tab)));
  const views = {overview:vOverview, grid:vGrid, trends:vTrends, history:vHistory, units:vUnits};
  updateChrome();
  if (S.mode === "config"){ main.innerHTML = `<div class="panel empty"><b>Almost there.</b> Open <code>config.js</code> and paste in your Supabase project URL and publishable key (step 3 of the launch guide).</div>`; return; }
  if (S.mode === "auth"){ main.innerHTML = vAuth(); bindAuth(); return; }
  if (S.mode === "error"){ main.innerHTML = `<div class="panel empty">Couldn't load your papers: ${esc(S.loadError)}. <button class="btn sm" id="retryLoad">Try again</button></div>`; document.getElementById("retryLoad").onclick = () => { S.mode = "connecting"; render(); loadAll(); }; return; }
  if (!views[S.tab]) S.tab = "overview";
  main.innerHTML = views[S.tab]();
  afterRender[S.tab] && afterRender[S.tab]();
}
const afterRender = {};

/* ---------- Overview ---------- */
function daysUntil(d){
  if (!d) return null; const [y,m,dd] = d.split("-").map(Number); const t = new Date(y,m-1,dd); const n = new Date(); n.setHours(0,0,0,0);
  return Math.round((t - n) / 86400000);
}
function examOf(code){ const d = (S.profile.examDates||{})[code]; const n = daysUntil(d); return d ? {date:d, days:n} : null; }
function examLabel(e){ if (!e) return ""; return e.days === 0 ? "Exam today" : e.days === 1 ? "Exam tomorrow" : e.days > 0 ? `Exam in ${e.days} days` : "Exam sat"; }
function fmtDay(d){ const [y,m,dd]=d.split("-").map(Number); return new Date(y,m-1,dd).toLocaleDateString(undefined,{weekday:"short",day:"numeric",month:"short"}); }
function vCountdown(shownUnits){
  const up = shownUnits.map(({subj,u})=>({subj,u,e:examOf(u.code)})).filter(x=>x.e && x.e.days >= 0).sort((a,b)=>a.e.days-b.e.days);
  if (!up.length) return `<div class="notice" style="border-left-color:var(--accent)">Add your exam dates to get a countdown. Tap "Set exam date" on any paper, or set them all in <button class="linkbtn" data-goto="units">Subjects &amp; units</button>.</div>`;
  return `<section class="panel"><div class="panel-h"><h2>Exam countdown</h2><span class="muted" style="font-size:13px">Tap one to change its date</span></div>
    <div class="countdown">${up.map(({subj,u,e})=>`<button class="cd" data-exam="${esc(u.code)}" style="--c:${subjColor(subj.id)}">
      <span class="cd-n">${e.days}</span><span class="cd-l">${e.days===1?"day":"days"}</span>
      <span class="cd-p"><b>${esc(u.short)}</b> · ${esc(subj.name)}</span><span class="cd-d">${fmtDay(e.date)}</span></button>`).join("")}</div></section>`;
}
function relTime(ts){
  if (!ts) return "";
  const d = Math.floor((Date.now()-ts)/86400000);
  return d<=0 ? "today" : d===1 ? "yesterday" : d<7 ? d+" days ago" : d<60 ? Math.round(d/7)+" wk ago" : Math.round(d/30)+" mo ago";
}

/* ---------- Daily streak + Today checklist ---------- */
function ymd(dt){ return dt.getFullYear()+"-"+String(dt.getMonth()+1).padStart(2,"0")+"-"+String(dt.getDate()).padStart(2,"0"); }
function addDays(d, n){ const [y,m,dd]=d.split("-").map(Number); return ymd(new Date(y,m-1,dd+n)); }
function attDay(a){ return a.date || (a.created ? ymd(new Date(a.created)) : null); }
function streakInfo(all){
  const days = new Map(); for (const a of all){ const d = attDay(a); if (d) days.set(d, (days.get(d)||0)+1); }
  const t = today();
  let start = days.has(t) ? t : addDays(t,-1), cur = 0;
  while (days.has(start)){ cur++; start = addDays(start,-1); }
  const sorted = [...days.keys()].sort(); let best = 0, run = 0, prev = null;
  for (const d of sorted){ run = prev && addDays(prev,1) === d ? run+1 : 1; best = Math.max(best, run); prev = d; }
  return {days, cur, best, todayDone: days.has(t)};
}
function suggestFor(subj, all){
  if (subj.custom) return null;
  const units = subj.units.map(c=>({c, e:examOf(c)})).filter(x=>unitDef(x.c));
  const upcoming = units.filter(x=>x.e && x.e.days>=0).sort((a,b)=>a.e.days-b.e.days);
  const order = upcoming.concat(units.filter(x=>!upcoming.includes(x)));
  const done = new Set(all.map(a=>paperKey(a.unit,a.series,a.variant)));
  for (const {c,e} of order){
    const s = seriesFor(c).find(s => !done.has(paperKey(c,s,"")));
    if (s) return {unit:c, series:s, e};
  }
  return null;
}
function vDaily(subs, all){
  const st = streakInfo(all), t = today();
  const rows = subs.filter(s=>s.units.length).map(subj => {
    const doneToday = all.filter(a=>attDay(a)===t && subj.units.includes(a.unit));
    if (doneToday.length){
      const a = doneToday[doneToday.length-1];
      return {subj, done:true, html:`<span class="td-sub">Done · ${esc(a.u.short)} ${esc(a.seriesLabel)} · <span class="mono">${a.raw}/${a.u.max}</span>${a.grade?` (${a.grade})`:""}</span>`, key:null};
    }
    const sg = suggestFor(subj, all);
    const lbl = sg ? `Next: ${esc(unitDef(sg.unit).short)} · ${esc(SERIES_LABEL[sg.series]||sg.series)}${sg.e&&sg.e.days>=0?` — exam in ${sg.e.days} day${sg.e.days===1?"":"s"}`:""}` : "Every past paper done — redo your weakest";
    return {subj, done:false, html:`<span class="td-sub">${lbl}</span>`, key: sg ? paperKey(sg.unit, sg.series, "") : null};
  });
  const nDone = rows.filter(r=>r.done).length, nAll = rows.length || 1;
  const C = 2*Math.PI*42, off = C*(1-nDone/nAll);
  const week = [...Array(7)].map((_,i)=>addDays(t, i-6)).map(d => {
    const [y,m,dd]=d.split("-").map(Number); const dt = new Date(y,m-1,dd); const n = st.days.get(d)||0;
    return `<div class="wk${n?" hit":""}${d===t?" now":""}" title="${n} paper${n===1?"":"s"} logged"><span class="wk-d">${dt.toLocaleDateString(undefined,{weekday:"short"})}</span><b class="mono">${dd}</b><span class="wk-n">${"<i></i>".repeat(Math.min(n,3))}</span></div>`;
  }).join("");
  const msg = st.cur === 0 ? "Log a past paper today to start a streak."
    : st.todayDone ? `You're on a <b>${st.cur}-day streak</b>. Nice — keep it going tomorrow.`
    : `You're on a <b>${st.cur}-day streak</b>. Log a paper today to keep it.`;
  return `<div class="daily">
    <section class="panel"><div class="panel-h"><h2>Daily streak</h2><span class="muted" style="font-size:13px">Best: <span class="mono">${st.best}</span> day${st.best===1?"":"s"}</span></div>
      <div class="streak-b">
        <div class="ring"><svg viewBox="0 0 100 100" aria-hidden="true"><circle cx="50" cy="50" r="42" class="ring-t"/><circle cx="50" cy="50" r="42" class="ring-p" stroke-dasharray="${C.toFixed(1)}" stroke-dashoffset="${off.toFixed(1)}"/></svg>
          <div><b class="mono">${st.cur}</b><span>day${st.cur===1?"":"s"}</span></div></div>
        <div style="min-width:0"><p class="streak-msg">${msg}</p><div class="week">${week}</div></div>
      </div></section>
    <section class="panel"><div class="panel-h"><h2>Today</h2><span class="muted" style="font-size:13px"><span class="mono">${nDone}/${rows.length}</span> subjects · ${fmtDay(t)}</span></div>
      <div class="todo">${rows.map(r=>`<button class="td${r.done?" on":""}" ${r.key?`data-log-paper="${esc(r.key)}"`:`data-log-subject="${esc(r.subj.id)}"`}>
        <span class="td-dot" style="background:${subjColor(r.subj.id)}"></span><span class="td-t"><b>${esc(r.subj.name)}</b>${r.html}</span>
        <span class="td-chk" aria-label="${r.done?"Done today":"Not done yet"}"></span></button>`).join("")}</div></section>
  </div>`;
}
function vOverview(){
  const all = allEnriched();
  const subs = visibleSubjects();
  if (!subs.length && (S.mode === "connecting" || (DB && !S.profileLoaded))) return `<div class="panel empty">Loading your papers…</div>`;
  if (!subs.length || S.stayOnboard) return vPicker(true);
  const f = S.ovFilter && subs.find(s=>s.id===S.ovFilter) ? S.ovFilter : "all";
  const shown = f === "all" ? subs : subs.filter(s=>s.id===f);
  const seg = `<div class="seg" role="group" aria-label="Filter by subject">${[["all","All"]].concat(subs.map(s=>[s.id,s.name])).map(([id,n])=>`<button data-ov="${id}" aria-pressed="${f===id}">${esc(n)}</button>`).join("")}</div>`;
  const papers = [];
  const seen = new Set();
  for (const subj of shown) for (const code of subj.units){
    const u = unitDef(code); if (!u || seen.has(code)) continue; seen.add(code);
    const att = all.filter(a=>a.unit===code);
    const lastLogged = att.reduce((m,a)=>Math.max(m, a.created||0), 0);
    papers.push({subj, u, att, lastLogged});
  }
  const started = papers.filter(p=>p.att.length).sort((a,b)=>b.lastLogged-a.lastLogged);
  const notStarted = papers.filter(p=>!p.att.length);
  const cards = started.map(({subj,u,att}) => {
    const byLogged = att.slice().sort((a,b)=>(a.created||0)-(b.created||0));
    const last = byLogged[byLogged.length-1];
    const avail = subj.custom ? [] : availablePapers(subj).filter(k=>k.startsWith(u.code+"|"));
    const done = new Set(att.filter(a=>a.series!=="custom").map(a=>paperKey(a.unit,a.series,a.variant)).filter(k=>avail.includes(k)));
    const mean = arr => arr.reduce((s,a)=>s+a.pct,0)/arr.length;
    const l3 = att.slice(-3), p3 = att.slice(-6,-3);
    const delta = p3.length ? mean(l3)-mean(p3) : null;
    const best = att.reduce((b,a)=>a.pct>b.pct?a:b, att[0]);
    const gap = last.gap;
    const gapTxt = last.est ? lawNote(last) : !gap ? "No boundaries for this paper" : gap.top && gap.over===0 ? "Top grade, exactly on the boundary" : gap.top ? `Top grade, ${gap.over} mark${gap.over===1?"":"s"} to spare` : `${gap.need} mark${gap.need===1?"":"s"} short of ${gap.grade}`;
    return `<section class="panel subj">
      <div class="subj-h"><span class="subj-dot" style="background:${subjColor(subj.id)}"></span>
        <div style="margin-right:auto;min-width:0"><span class="eyebrow">${esc(u.short)} · ${esc(subj.name)} <span class="mono" style="letter-spacing:0">${esc(u.code)}</span></span>
        <h3 class="pname">${esc(u.name)}</h3></div>
        <button class="btn sm ghost" data-log-unit="${u.code}" aria-label="Log a ${esc(u.short)} paper">+ Log</button></div>
      <div style="padding:8px 18px 0"><button class="exam-pill ${examOf(u.code)&&examOf(u.code).days>=0&&examOf(u.code).days<=14?"soon":""}" data-exam="${esc(u.code)}">${examOf(u.code) ? `${examLabel(examOf(u.code))} · ${fmtDay(examOf(u.code).date)}` : "Set exam date"}</button></div>
      <div class="pred">
        <div class="pred-grade ${gClass(last.grade)}">${last.grade||"–"}</div>
        <div class="pred-line">Latest: <strong class="mono">${last.raw}/${last.u.max} · ${fmtPct(last.pct)}</strong></div>
        <div class="pred-line">${esc(last.seriesLabel)}${last.variant?` (${last.variant})`:""} · logged ${relTime(last.created)}<br><span class="muted">${gapTxt}</span></div>
      </div>
      <div class="stats stats4">
        <div class="stat"><span class="eyebrow">Tries</span><b>${att.length}</b></div>
        <div class="stat"><span class="eyebrow" title="Average of your last 3 attempts">Last 3</span><b>${fmtPct(mean(l3))}</b></div>
        <div class="stat"><span class="eyebrow" title="Last 3 average compared with the 3 before">Change</span><b class="${delta==null?"":delta>=0?"up":"down"}">${delta==null?"—":(delta>=0?"+":"−")+Math.abs(delta).toFixed(1)}</b></div>
        <div class="stat"><span class="eyebrow">Best</span><b>${fmtPct(best.pct)}</b></div>
      </div>
      <div class="pfoot">
        ${att.length >= 2 ? sparkline(att.map(a=>a.pct), subjColor(subj.id)) : `<span class="muted" style="font-size:13px">Log another ${esc(u.short)} to see a trend line.</span>`}
        ${avail.length ? `<div class="pdone"><span><span class="mono">${done.size}/${avail.length}</span> past papers done</span><div class="bar"><i style="width:${(done.size/avail.length*100).toFixed(1)}%"></i></div></div>` : ""}
      </div>
    </section>`;
  }).join("");
  const rest = notStarted.length ? `<section class="panel"><div class="panel-h"><h2>Not started</h2><span class="muted" style="font-size:13px">Papers you're sitting but haven't logged yet. Log one and it moves up to the top.</span></div>
    <div class="panel-b" style="display:flex;flex-direction:column;gap:14px">${shown.map(sj => { const ns = notStarted.filter(p=>p.subj.id===sj.id); if (!ns.length) return "";
      return `<div style="display:flex;flex-direction:column;gap:6px"><span class="eyebrow">${esc(sj.name)}</span><div class="chips">${ns.map(({u})=>`<button class="chip" data-log-unit="${esc(u.code)}"><i style="background:${subjColor(sj.id)}"></i>${esc(u.short)} · ${esc(u.name)}${examOf(u.code)&&examOf(u.code).days>=0?` <b class="mono" style="font-size:11.5px">${examOf(u.code).days}d</b>`:""} <span class="muted">+ Log</span></button>`).join("")}</div></div>`; }).join("")}</div></section>` : "";
  const head = `<div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><h2 style="font-size:20px;margin-right:auto">Your papers <span class="muted" style="font:400 13px var(--f-body)">most recently logged first</span></h2>${seg}<button class="btn sm" data-goto="units">Edit subjects</button></div>`;
  return vDaily(subs, all) + head + vCountdown(papers) + (started.length ? `<div class="subjects">${cards}</div>` : `<div class="panel empty">No papers logged yet. Pick one below to log your first mark.</div>`) + rest;
}
function sparkline(vals, color){
  const W=300,H=40,pad=3; const n=vals.length;
  const x=i=> pad + i*(W-2*pad)/Math.max(1,n-1), y=v=> H-pad - (v/100)*(H-2*pad);
  const d = vals.map((v,i)=>(i?"L":"M")+x(i).toFixed(1)+" "+y(v).toFixed(1)).join(" ");
  const area = d + ` L${x(n-1).toFixed(1)} ${H-pad} L${x(0).toFixed(1)} ${H-pad} Z`;
  return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="width:100%;height:40px;display:block" role="img" aria-label="Percentage trend">
    <path d="${area}" fill="${color}" opacity=".10"/><path d="${d}" fill="none" stroke="${color}" stroke-width="2" vector-effect="non-scaling-stroke" stroke-linejoin="round"/>
    <circle cx="${x(n-1)}" cy="${y(vals[n-1])}" r="3.5" fill="${color}"/></svg>`;
}

/* ---------- Grid ---------- */
function vGrid(){
  const subs = visibleSubjects();
  if (!subs.length) return `<div class="panel empty">No subjects visible.</div>`;
  if (!S.gridSubject || !subs.find(s=>s.id===S.gridSubject)) S.gridSubject = subs[0].id;
  const subj0 = subjectOf(S.gridSubject);
  const subj = {...subj0, units: subj0.units.filter(c => seriesFor(c).length)};
  const all = allEnriched().filter(a => subj.units.includes(a.unit));
  const best = {};
  for (const a of all){ if (a.series === "custom") continue; const k = paperKey(a.unit,a.series,a.variant); if (!best[k] || a.pct > best[k].pct) best[k] = a; }
  const avail = availablePapers(subj); const doneN = avail.filter(k=>best[k]).length;
  const seg = `<div class="seg" role="group" aria-label="Subject">${subs.map(s=>`<button data-grid-subj="${s.id}" aria-pressed="${s.id===subj.id}">${esc(s.name)}</button>`).join("")}</div>`;
  if (!subj.units.length){
    return `<section class="panel"><div class="panel-h"><h2>Papers done</h2>${seg}</div>
      <div class="empty">${esc(subj.name)} has no papers with official Pearson boundaries, so there's no past-paper list to tick off. Its papers still show in the Overview, History and Trends.</div></section>`;
  }
  const perUnit = subj.units.map(code => { const ks = avail.filter(k=>k.startsWith(code+"|")); return [code, ks.filter(k=>best[k]).length, ks.length]; });
  const head = `<tr><th class="ser" style="text-align:left">Series</th>${subj.units.map(c=>{const u=unitDef(c);return `<th>${esc(u.short)}<span class="code">${c}</span></th>`}).join("")}</tr>`;
  const rows = SERIES.slice().reverse().map(([sid,label]) => {
    const cells = subj.units.map(code => {
      const vs = variantsFor(sid, code).filter(v => !v || S.profile.countVariants);
      if (!vs.length) return `<td><div class="cellbox"><span class="pc na" aria-hidden="true">·</span></div></td>`;
      return `<td><div class="cellbox">${vs.map(v => {
        const k = paperKey(code,sid,v); const a = best[k];
        const vt = v ? `<span class="vt">${v}</span>` : "";
        const lbl = `${unitDef(code).short} ${label}${v?" ("+v+")":""}`;
        return a ? `<button class="pc done ${gClass(a.grade)}" data-open-paper="${k}" title="${esc(lbl)} · best ${fmtPct(a.pct)}" aria-label="${esc(lbl)}, done, grade ${a.grade||"–"}">${a.grade||"✓"}${vt}</button>`
                 : `<button class="pc" data-log-paper="${k}" title="Log ${esc(lbl)}" aria-label="Log ${esc(lbl)}">+${vt}</button>`;
      }).join("")}</div></td>`;
    }).join("");
    return `<tr><th class="ser" scope="row">${label}</th>${cells}</tr>`;
  }).join("");
  const unitBars = perUnit.map(([c,d,t]) => `<span title="${c}"><b class="mono">${unitDef(c).short}</b> <span class="mono">${d}/${t}</span></span>`).join("");
  return `<section class="panel">
    <div class="panel-h"><h2>Papers done</h2>${seg}</div>
    <div class="panel-b" style="display:flex;flex-direction:column;gap:14px">
      <div style="display:flex;gap:24px;flex-wrap:wrap;align-items:flex-end">
        <div class="progress"><span class="eyebrow">${esc(subj.name)} · every paper since Jan 2019</span>
          <div style="font:600 26px var(--f-mono)">${doneN}<span class="muted" style="font-size:16px"> / ${avail.length} papers</span></div>
          <div class="bar"><i style="width:${avail.length? (doneN/avail.length*100).toFixed(1):0}%"></i></div></div>
        <div class="legend">${unitBars}</div>
      </div>
      <div class="legend"><span>${gradeChip("A*")}${gradeChip("A")}${gradeChip("B")}${gradeChip("C")} best grade on that paper</span>
        <span><span class="pc" style="pointer-events:none">+</span> not done yet — tap to log</span>
        ${S.profile.countVariants?`<span><span class="pc" style="pointer-events:none">+<span class="vt">A</span></span> variant paper (1A, 2A…)</span>`:""}
        <span><span class="pc na">·</span> not sat that series</span></div>
    </div>
    <div class="grid-wrap"><table class="pg"><thead>${head}</thead><tbody>${rows}</tbody></table></div>
  </section>`;
}

/* ---------- Trends ---------- */
const SERIES_COLORS = ["var(--s1)","var(--s2)","var(--s3)","var(--s4)","var(--s5)","var(--s6)"];
function vTrends(){
  const subs = visibleSubjects();
  if (!subs.length) return `<div class="panel empty">No subjects visible.</div>`;
  if (!S.trendSubject || !subs.find(s=>s.id===S.trendSubject)) S.trendSubject = subs[0].id;
  const subj = subjectOf(S.trendSubject);
  const hidden = S.trendHidden[subj.id] || [];
  const att = allEnriched().filter(a => subj.units.includes(a.unit) && !hidden.includes(a.unit));
  const seg = `<div class="seg" role="group" aria-label="Subject">${subs.map(s=>`<button data-trend-subj="${s.id}" aria-pressed="${s.id===subj.id}">${esc(s.name)}</button>`).join("")}</div>`;
  const chips = `<div class="chips">${subj.units.map((c,i)=>`<button class="chip" data-trend-unit="${c}" aria-pressed="${!hidden.includes(c)}"><i style="background:${SERIES_COLORS[i%6]}"></i>${esc(unitDef(c)?.short||c)}</button>`).join("")}</div>`;
  let body;
  if (att.length < 2){
    body = `<div class="empty">Log at least two ${esc(subj.name)} papers to see a trend.</div>`;
  } else {
    const ro = rollingAvg(att.map(a=>a.pct), 5);
    const first = ro[Math.min(4, ro.length-1)], lastR = ro[ro.length-1];
    const withB = att.filter(a=>a.b && a.u.level);
    body = `<div class="trend-grid">
      <div><h3 style="font-size:16px;margin-bottom:4px">Percentage per paper</h3>
        <p class="caption">Dots are single papers, coloured by unit. The line is your rolling average of the last 5 — ${att.length>=6 ? `now <b class="mono">${fmtPct(lastR)}</b>, ${lastR>=first?"up":"down"} from <b class="mono">${fmtPct(first)}</b>` : `now <b class="mono">${fmtPct(lastR)}</b>`}.</p>
        <div class="chart" id="chartPct"></div></div>
      <div><h3 style="font-size:16px;margin-bottom:4px">Marks above or below the A boundary</h3>
        <p class="caption">Adjusts for paper difficulty: +5 means 5 raw marks clear of an A on that paper's official boundaries.</p>
        <div class="chart" id="chartGap"></div></div>
    </div>`;
    afterRender.trends = () => { drawPct(att, ro, subj); drawGap(withB, subj); };
  }
  if (att.length < 2) afterRender.trends = null;
  return `<section class="panel"><div class="panel-h"><h2>Trends</h2>${seg}</div>
    <div class="panel-b" style="display:flex;flex-direction:column;gap:16px">${chips}${body}</div></section>`;
}
function rollingAvg(v, w){ return v.map((_,i)=>{ const s=v.slice(Math.max(0,i-w+1),i+1); return s.reduce((a,b)=>a+b,0)/s.length; }); }
function unitColor(subj, code){ return SERIES_COLORS[subj.units.indexOf(code) % 6]; }
function chartFrame(el, W, H, m){
  return {x0:m.l, x1:W-m.r, y0:H-m.b, y1:m.t};
}
function drawPct(att, ro, subj){
  const el = document.getElementById("chartPct"); if (!el) return;
  const W=560,H=280,m={l:40,r:12,t:10,b:30}; const n=att.length;
  const X=i=> m.l + (n===1?0.5:i/(n-1))*(W-m.l-m.r), Y=v=> H-m.b - v/100*(H-m.t-m.b);
  let g = "";
  for (let v=0; v<=100; v+=20){ g += `<line x1="${m.l}" x2="${W-m.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="var(--rule)" stroke-width="1"/><text x="${m.l-8}" y="${Y(v)+4}" text-anchor="end">${v}%</text>`; }
  const ticks = pickTicks(n, 5);
  for (const i of ticks) g += `<text x="${X(i)}" y="${H-8}" text-anchor="middle">${shortDate(att[i].date)}</text>`;
  const line = ro.map((v,i)=>(i?"L":"M")+X(i).toFixed(1)+" "+Y(v).toFixed(1)).join(" ");
  g += `<path d="${line}" fill="none" stroke="var(--ink)" stroke-width="2" stroke-linejoin="round" opacity=".85"/>`;
  att.forEach((a,i)=>{ g += `<circle cx="${X(i)}" cy="${Y(a.pct)}" r="5" fill="${unitColor(subj,a.unit)}" stroke="var(--surface)" stroke-width="2"/>`; });
  g += `<circle cx="${X(n-1)}" cy="${Y(ro[n-1])}" r="4" fill="var(--ink)"/>`;
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Percentage per paper over time">${g}<rect id="hitPct" x="${m.l}" y="${m.t}" width="${W-m.l-m.r}" height="${H-m.t-m.b}" fill="transparent"/></svg><div class="tip" hidden></div>`;
  attachHover(el, W, i => X(i), n, i => {
    const a = att[i]; return {y: Y(a.pct), html:`<b>${esc(a.u.short)} · ${esc(a.seriesLabel)}${a.variant?" ("+a.variant+")":""}</b><br>${a.raw}/${a.u.max} = <b>${fmtPct(a.pct)}</b> ${a.grade?"· "+a.grade:""}<br>5-paper avg ${fmtPct(ro[i])}`};
  });
}
function drawGap(att, subj){
  const el = document.getElementById("chartGap"); if (!el) return;
  if (!att.length){ el.innerHTML = `<div class="empty">No official boundaries for these papers yet.</div>`; return; }
  const W=560,H=280,m={l:40,r:12,t:10,b:30}; const n=att.length;
  const gaps = att.map(a => a.raw - a.b[a.u.level==="A2"?1:0]);
  const ext = Math.max(10, ...gaps.map(Math.abs)); const lim = Math.ceil(ext/5)*5;
  const bw = Math.max(3, Math.min(22, (W-m.l-m.r)/n - 3));
  const X=i=> m.l + (i+0.5)*(W-m.l-m.r)/n, Y=v=> m.t + (lim - v)/(2*lim)*(H-m.t-m.b);
  let g = "";
  const step = lim<=10?5:lim<=30?10:20;
  for (let v=-lim; v<=lim; v+=step){ g += `<line x1="${m.l}" x2="${W-m.r}" y1="${Y(v)}" y2="${Y(v)}" stroke="${v===0?"var(--rule-strong)":"var(--rule)"}" stroke-width="1"/><text x="${m.l-8}" y="${Y(v)+4}" text-anchor="end">${v>0?"+":""}${v}</text>`; }
  gaps.forEach((v,i)=>{ const y0=Y(0), y1=Y(v); const top=Math.min(y0,y1), h=Math.max(1.5,Math.abs(y1-y0));
    g += `<rect x="${(X(i)-bw/2).toFixed(1)}" y="${top.toFixed(1)}" width="${bw.toFixed(1)}" height="${h.toFixed(1)}" rx="${Math.min(4,bw/2)}" fill="${v>=0?"var(--s1)":"var(--bad)"}"/>`; });
  for (const i of pickTicks(n,5)) g += `<text x="${X(i)}" y="${H-8}" text-anchor="middle">${shortDate(att[i].date)}</text>`;
  el.innerHTML = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Raw marks relative to the A boundary">${g}</svg><div class="tip" hidden></div>`;
  attachHover(el, W, X, n, i => { const a = att[i], v = gaps[i];
    return {y: Y(Math.max(0,v)), html:`<b>${esc(a.u.short)} · ${esc(a.seriesLabel)}</b><br>${a.raw}/${a.u.max}, A at ${a.b[a.u.level==="A2"?1:0]}<br><b>${v>=0?"+":""}${v}</b> marks ${v>=0?"above":"below"} A`}; });
}
function pickTicks(n, k){ if (n<=k) return [...Array(n).keys()]; const out=[]; for (let j=0;j<k;j++) out.push(Math.round(j*(n-1)/(k-1))); return [...new Set(out)]; }
function shortDate(d){ if (!d) return ""; const [y,m,dd]=d.split("-").map(Number); return new Date(y,m-1,dd).toLocaleDateString(undefined,{day:"numeric",month:"short"}); }
function attachHover(el, W, X, n, info){
  const svg = el.querySelector("svg"), tip = el.querySelector(".tip");
  const move = ev => {
    const r = svg.getBoundingClientRect(); const sx = (ev.clientX - r.left) * W / r.width;
    let best=0, bd=Infinity; for (let i=0;i<n;i++){ const d=Math.abs(X(i)-sx); if (d<bd){bd=d;best=i;} }
    const inf = info(best); tip.innerHTML = inf.html; tip.hidden = false;
    const scale = r.width / W; let left = X(best)*scale; left = Math.max(80, Math.min(r.width-80, left));
    tip.style.left = left + "px"; tip.style.top = (inf.y*scale) + "px";
  };
  svg.addEventListener("pointermove", move); svg.addEventListener("pointerdown", move);
  svg.addEventListener("pointerleave", () => tip.hidden = true);
}

/* ---------- History ---------- */
function vHistory(){
  const subs = visibleSubjects();
  let rows = allEnriched();
  if (S.histFilter !== "all"){ const s = subjectOf(S.histFilter); if (s) rows = rows.filter(a=>s.units.includes(a.unit)); }
  const {k, dir} = S.histSort;
  const val = a => k==="date" ? (a.date||"")+String(a.created||0).padStart(15,"0") : k==="paper" ? a.unit+a.series : k==="pct" ? a.pct : k==="ums" ? (a.ums??-1) : k==="grade" ? ["A*","A","B","C","D","E","U"].indexOf(a.grade) * -1 : 0;
  rows.sort((x,y)=>{ const a=val(x), b=val(y); return (a<b?-1:a>b?1:0)*dir; });
  const seg = `<div class="seg" role="group" aria-label="Filter">${[["all","All"]].concat(subs.map(s=>[s.id,s.name])).map(([id,n])=>`<button data-hist="${id}" aria-pressed="${S.histFilter===id}">${esc(n)}</button>`).join("")}</div>`;
  const th = (key, label, cls="") => `<th class="${cls}" data-sort="${key}" aria-sort="${k===key?(dir>0?"ascending":"descending"):"none"}">${label}${k===key?(dir>0?" ↑":" ↓"):""}</th>`;
  const body = rows.length ? rows.map(a => `<tr>
    <td class="mono" style="white-space:nowrap">${fmtDate(a.date)}</td>
    <td><b>${esc(a.u.short)}</b> <span class="muted">${esc(a.u.name)}</span></td>
    <td style="white-space:nowrap">${esc(a.seriesLabel)}${a.variant?` <span class="muted mono">(${a.variant})</span>`:""}</td>
    <td class="n">${a.raw}/${a.u.max}</td><td class="n">${fmtPct(a.pct)}</td><td class="n">${a.ums??"—"}</td>
    <td>${gradeChip(a.grade)}</td><td class="note">${esc(a.notes||"")}</td>
    <td style="white-space:nowrap"><button class="btn sm ghost" data-edit="${a.id}">Edit</button></td></tr>`).join("")
    : `<tr><td colspan="9" class="empty">No papers logged yet.</td></tr>`;
  return `<section class="panel"><div class="panel-h"><h2>History</h2>${seg}</div>
    <div class="hist-wrap"><table class="hist"><thead><tr>${th("date","Date sat")}${th("paper","Paper")}<th>Series</th>${th("pct","Mark","n")}${th("pct","%","n")}${th("ums","UMS","n")}${th("grade","Grade")}<th>Notes</th><th></th></tr></thead><tbody>${body}</tbody></table></div></section>`;
}

/* ---------- Subjects & units ---------- */
function vPicker(onboarding){
  const chosen = chosenList();
  const ids = chosen.map(c=>c.id);
  const all = LIB_SUBJECTS.concat(S.profile.customSubjects||[]);
  const tiles = all.map(s => { const on = ids.includes(s.id);
    return `<button class="tile" data-pick-subj="${s.id}" aria-pressed="${on}"><i style="background:${subjColor(s.id)}"></i><span>${esc(s.name)}</span><b>${on?"✓":"+"}</b></button>`; }).join("");
  const panels = chosen.map(c => {
    const l = libSubject(c.id); if (!l) return "";
    const codes = allUnitsOf(c.id);
    const rows = codes.map(code => { const u = unitDef(code); if (!u) return "";
      const on = c.units.includes(code); const n = S.attempts.filter(a=>a.unit===code).length;
      return `<label class="urow"><input type="checkbox" id="u-${c.id}-${code}" data-unit-toggle="${c.id}|${code}" ${on?"checked":""}>
        <span class="mono code">${esc(u.short)}</span><span class="nm">${esc(u.name)}</span>
        <span class="lvl">${u.level}${u.custom?" · yours":""}</span>${n?`<span class="muted" style="font-size:12px">${n} logged</span>`:"<span></span>"}
        ${on ? `<input type="date" class="udate" id="d-${c.id}-${code}" data-exam-date="${esc(code)}" value="${esc((S.profile.examDates||{})[code]||"")}" aria-label="Exam date for ${esc(u.short)}" title="Exam date">` : "<span></span>"}
        ${u.custom && !n ? `<button class="btn sm ghost danger" data-del-unit="${esc(code)}" aria-label="Delete ${esc(u.short)}">Delete</button>` : ""}</label>`; }).join("");
    const isCustom = !LIB_SUBJECTS.some(x=>x.id===c.id);
    return `<section class="panel"><div class="panel-h"><span class="subj-dot" style="background:${subjColor(c.id)}"></span><h2>${esc(l.name)}</h2>
      <span class="muted" style="font-size:13px">${c.units.length} paper${c.units.length===1?"":"s"} picked</span></div>
      <div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
        <p class="caption" style="margin:0">Tick the papers you're sitting and add the exam date for a countdown. Ticked papers you haven't logged show as "Not started" on the Overview.</p>
        <div class="ulist">${rows || `<span class="muted">No papers yet. Add your first one below.</span>`}</div>
        <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn sm" data-add-unit="${c.id}">+ Add your own paper</button>
        ${isCustom ? `<button class="btn sm ghost danger" data-del-csubj="${c.id}">Delete subject</button>` : ""}</div>
      </div></section>`;
  }).join("");
  const head = `<section class="panel"><div class="panel-h"><h2>${onboarding ? "Which subjects are you taking?" : "Your subjects"}</h2></div>
    <div class="panel-b" style="display:flex;flex-direction:column;gap:12px">
      <p class="caption" style="margin:0">${onboarding ? "Pick your subjects, then tick the papers you're sitting in each. Your Overview fills in from there." : "Tap a subject to add or remove it. Removing one hides it but keeps any marks you've logged."}</p>
      <div class="tiles">${tiles}<button class="tile add" id="addSubject"><span>+ Your own subject</span></button></div>
      ${onboarding && chosen.length ? `<button class="btn primary" data-goto="overview" style="align-self:flex-start">Done — show my papers</button>` : ""}
    </div></section>`;
  return `<div style="display:flex;flex-direction:column;gap:16px">${head}${panels}</div>`;
}
function vUnits(){
  return vPicker(false) + `<div class="settings">
    <section class="panel"><div class="panel-h"><h2>Papers done grid</h2></div><div class="panel-b">
      <label class="toggle"><input type="checkbox" id="countVariants" ${S.profile.countVariants?"checked":""}><span>Count variant papers (1A, 2A, R) as separate papers</span></label></div></section>
    <section class="panel"><div class="panel-h"><h2>Backup</h2></div><div class="panel-b" style="display:flex;flex-direction:column;gap:10px">
      <p class="caption" style="margin:0">Copy everything as text to keep a backup, or paste a backup to restore it. Restoring adds papers; it doesn't delete any.</p>
      <div style="display:flex;gap:8px;flex-wrap:wrap"><button class="btn" id="copyBackup">Copy backup</button><button class="btn" id="restoreBackup">Restore from backup</button></div>
      <label class="f" for="backupBox" hidden id="backupWrap">Paste backup text<textarea id="backupBox" rows="4"></textarea><button class="btn primary sm" id="doRestore" style="align-self:flex-start">Restore</button></label>
    </div></section>
    <section class="panel"><div class="panel-h"><h2>Where the boundaries come from</h2></div><div class="panel-b">
      <p class="caption">Raw-mark boundaries for every Accounting, Biology, Business, Chemistry, Economics, Further Mathematics, Information Technology, Mathematics, Physics and Psychology paper are copied from Pearson's official IAL grade boundary PDFs. Law is graded on Paper 1 + Paper 2 together, so a single Law paper's grade is an estimate (half of each combined boundary); log both papers from the same series to see the real grade. "Jun 2020" papers were sat in October/November 2020, so they use Pearson's November 2020 boundaries. May/June 2021 grades were teacher-assessed, so that series has no boundaries. To log one of those papers, pick "Other series" and type the boundaries yourself.</p>
      <ul class="src-list">${SERIES.map(([id,l])=>`<li><a href="${SRC_BASE+SRC[id]}" target="_blank" rel="noopener">${l}</a></li>`).join("")}</ul></div></section>
  </div>`;
}

/* ================= log / edit modal ================= */
let M = null; // modal state
function openLog(prefill = {}, editing = null){
  const subs = subjects().filter(s=>s.units.length);
  if (!subs.length){ S.tab = "units"; render(); toast("Pick your subjects and papers first"); return; }
  let subjId = prefill.subject || (prefill.unit && (subs.find(s=>s.units.includes(prefill.unit))?.id)) || subs[0].id;
  if (prefill.unit && !subs.some(s=>s.id===subjId && s.units.includes(prefill.unit))){ const own = unitDef(prefill.unit); if (own) subjId = subs.find(s=>s.units.includes(prefill.unit))?.id || subjId; }
  M = {editing, subjId, unit: prefill.unit || null, series: prefill.series || null, variant: prefill.variant ?? "",
       raw: prefill.raw ?? "", date: prefill.date || today(), notes: prefill.notes || "", seriesLabel: prefill.seriesLabel || "",
       bounds: prefill.bounds ? prefill.bounds.slice() : null, max: prefill.max || null, confirmDel:false};
  normalizeModal(); drawModal();
}
function normalizeModal(){
  const subj = subjects().filter(s=>s.units.length).find(s=>s.id===M.subjId) || subjects().filter(s=>s.units.length)[0]; M.subjId = subj.id;
  if (!M.unit || !subj.units.includes(M.unit)) M.unit = subj.units[0];
  const u = unitDef(M.unit);
  const ser = seriesFor(M.unit);
  if (!M.series || (M.series !== "custom" && !ser.includes(M.series))) M.series = ser[0] || "custom";
  if (M.series !== "custom"){ const vs = variantsFor(M.series, M.unit); if (!vs.includes(M.variant)) M.variant = vs[0] ?? ""; M.bounds = null; M.max = null; }
  else { M.variant = ""; if (!M.bounds) M.bounds = (u.defaultBounds || []).slice(); if (!M.max) M.max = u.max; }
}
function drawModal(){
  const root = document.getElementById("modalRoot");
  if (!M){ root.innerHTML = ""; return; }
  const subs = subjects().filter(s=>s.units.length); const u = unitDef(M.unit);
  const subj = subs.find(s=>s.id===M.subjId);
  const ser = seriesFor(M.unit);
  const vs = M.series !== "custom" ? variantsFor(M.series, M.unit) : [];
  const L = gradeLetters(u);
  const customB = M.series === "custom" ? `<div class="row"><label class="f" for="mSerLabel">Name this series<input id="mSerLabel" placeholder="e.g. Jun 2021, school mock" value="${esc(M.seriesLabel)}"></label>
      <label class="f" for="mMax">Paper out of<input id="mMax" inputmode="numeric" value="${esc(M.max)}"></label></div>
      <div><span class="eyebrow">Boundaries (optional — leave blank for percentage only)</span>
      <div class="bgrid" style="margin-top:6px;grid-template-columns:repeat(${L.length},1fr)">${L.map((g,i)=>`<label class="f" for="mb${i}">${g}<input id="mb${i}" inputmode="numeric" value="${M.bounds && M.bounds[i]!=null ? esc(M.bounds[i]) : ""}"></label>`).join("")}</div></div>` : "";
  root.innerHTML = `<div class="scrim" id="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="mTitle">
    <div class="modal-h"><h2 id="mTitle">${M.editing?"Edit paper":"Log a paper"}</h2><button class="btn ghost sm" id="mClose" aria-label="Close">✕</button></div>
    <div class="modal-b">
      <div class="row">
        <label class="f" for="mSubj">Subject<select id="mSubj">${subs.map(s=>`<option value="${s.id}" ${s.id===M.subjId?"selected":""}>${esc(s.name)}</option>`).join("")}</select></label>
        <label class="f" for="mUnit">Paper<select id="mUnit">${subj.units.map(c=>{const d=unitDef(c);return `<option value="${c}" ${c===M.unit?"selected":""}>${esc(d.short)} · ${esc(d.name)}</option>`}).join("")}</select></label>
      </div>
      <div class="row">
        <label class="f" for="mSeries">Series<select id="mSeries">${ser.map(s=>`<option value="${s}" ${s===M.series?"selected":""}>${SERIES_LABEL[s]}</option>`).join("")}<option value="custom" ${M.series==="custom"?"selected":""}>Other series / mock…</option></select></label>
        ${vs.length>1 ? `<label class="f" for="mVar">Version<select id="mVar">${vs.map(v=>`<option value="${v}" ${v===M.variant?"selected":""}>${VARIANT_LABEL[v]}</option>`).join("")}</select></label>` : `<label class="f" for="mDate">Date sat<input id="mDate" type="date" value="${esc(M.date)}"></label>`}
      </div>
      ${vs.length>1 ? `<div class="row"><label class="f" for="mDate">Date sat<input id="mDate" type="date" value="${esc(M.date)}"></label><span></span></div>` : ""}
      ${customB}
      <label class="f" for="mRaw">Your raw mark<div class="markin"><input id="mRaw" inputmode="numeric" autocomplete="off" value="${esc(M.raw)}" aria-describedby="mOutOf"><span id="mOutOf">/ ${M.series==="custom" ? esc(M.max) : u.max}</span></div></label>
      <div id="mResult"></div>
      <label class="f" for="mNotes">Notes (optional)<textarea id="mNotes" placeholder="e.g. ran out of time on Q8">${esc(M.notes)}</textarea></label>
      <div class="err" id="mErr" role="alert"></div>
    </div>
    <div class="modal-f">
      ${M.editing ? (M.confirmDel ? `<span style="margin-right:auto;display:flex;gap:8px;align-items:center"><span class="err">Delete this paper?</span><button class="btn sm danger" id="mDelYes">Delete</button><button class="btn sm ghost" id="mDelNo">Keep</button></span>` : `<button class="btn ghost danger" id="mDel" style="margin-right:auto">Delete</button>`) : ""}
      <button class="btn" id="mCancel">Cancel</button><button class="btn primary" id="mSave">${M.editing?"Save changes":"Save paper"}</button>
    </div></div></div>`;
  updateResult();
  const q = id => document.getElementById(id);
  q("mClose").onclick = q("mCancel").onclick = closeModal;
  q("scrim").onclick = e => { if (e.target.id === "scrim") closeModal(); };
  q("mSubj").onchange = e => { readModal(); M.subjId = e.target.value; M.unit = null; M.series = null; normalizeModal(); drawModal(); };
  q("mUnit").onchange = e => { readModal(); const prev = M.series; M.unit = e.target.value; M.series = prev; normalizeModal(); drawModal(); };
  q("mSeries").onchange = e => { readModal(); M.series = e.target.value; M.bounds = null; M.max = null; normalizeModal(); drawModal(); };
  if (q("mVar")) q("mVar").onchange = e => { M.variant = e.target.value; updateResult(); };
  ["mRaw","mMax",...L.map((_,i)=>"mb"+i)].forEach(id => { if (q(id)) q(id).oninput = () => { readModal(); updateResult(); }; });
  q("mSave").onclick = submitModal;
  if (q("mDel")) q("mDel").onclick = () => { readModal(); M.confirmDel = true; drawModal(); };
  if (q("mDelNo")) q("mDelNo").onclick = () => { M.confirmDel = false; drawModal(); };
  if (q("mDelYes")) q("mDelYes").onclick = async () => { const id = M.editing; closeModal(); try { await deleteAttempt(id); toast("Paper deleted"); } catch(e){ toast("Couldn't delete — check your connection"); } };
  setTimeout(()=>{ const r=q("mRaw"); if (r && !M.raw) r.focus(); }, 30);
}
function readModal(){
  const q = id => document.getElementById(id);
  if (q("mRaw")) M.raw = q("mRaw").value.trim();
  if (q("mDate")) M.date = q("mDate").value;
  if (q("mNotes")) M.notes = q("mNotes").value;
  if (q("mVar")) M.variant = q("mVar").value;
  if (M.series === "custom"){
    if (q("mSerLabel")) M.seriesLabel = q("mSerLabel").value;
    if (q("mMax")) M.max = q("mMax").value.trim();
    const u = unitDef(M.unit); M.bounds = gradeLetters(u).map((_,i)=>{ const v = q("mb"+i)?.value.trim(); return v===""||v==null ? null : Number(v); });
  }
}
function modalBounds(){
  if (M.series !== "custom") return officialBounds(M.series, M.unit, M.variant);
  const b = M.bounds || []; if (b.some(v=>v==null||isNaN(v))) return null; return b;
}
function updateResult(){
  const box = document.getElementById("mResult"); if (!box) return;
  const u = unitDef(M.unit); const max = M.series==="custom" ? Number(M.max) : u.max;
  const out = document.getElementById("mOutOf"); if (out) out.textContent = "/ " + (max||"?");
  const raw = Number(M.raw);
  const b = modalBounds();
  const bl = b ? `<div class="bounds">${gradeLetters(u).map((g,i)=>`<span class="${M.raw!==""&&gradeFor(raw,b,{...u,max})===g?"hit":""}">${g} ${b[i]}</span>`).join("")}</div>` : `<div class="bounds">No boundaries — percentage only</div>`;
  if (M.raw === "" || isNaN(raw) || !max){ box.innerHTML = `<div class="result"><div class="big g-none">?</div><div class="ln">Type your mark to see your grade.</div><div class="ln">${b?"Boundaries for this paper:":""}</div>${bl}</div>`; return; }
  const uu = {...u, max}; const g = gradeFor(raw,b,uu), ums = umsFor(raw,b,uu), gap = nextGradeGap(raw,b,uu);
  const isEst = !!u.law && M.series !== "custom";
  const comb = isEst ? lawCombined(u, M.series, raw) : null;
  const gapTxt = isEst ? (comb ? `With ${comb.other} from this series: <b>${comb.total}</b>/200, grade <b>${comb.grade}</b>` : "Estimated: Law is graded on Paper 1 + Paper 2 together. Log both papers from this series for the real grade.") : !gap ? "" : gap.top && gap.over===0 ? "Top grade, exactly on the boundary" : gap.top ? `Top grade, ${gap.over} mark${gap.over===1?"":"s"} to spare` : `<b>${gap.need}</b> mark${gap.need===1?"":"s"} short of ${gap.grade}`;
  box.innerHTML = `<div class="result"><div class="big ${gClass(g)}">${g||"–"}</div>
    <div class="ln"><b>${fmtPct(raw/max*100)}</b>${ums!=null?` · <b>${ums}</b>/${u.ums} UMS`:""}</div><div class="ln">${gapTxt}</div>${bl}</div>`;
}
async function submitModal(){
  readModal();
  const err = document.getElementById("mErr"); const u = unitDef(M.unit);
  const max = M.series==="custom" ? Number(M.max) : u.max; const raw = Number(M.raw);
  if (M.raw === "" || !Number.isFinite(raw) || raw < 0 || raw > max || !Number.isInteger(raw)){ err.textContent = `Enter a whole-number mark from 0 to ${max||"the paper's maximum"}.`; return; }
  if (M.series === "custom"){
    if (!Number.isFinite(max) || max <= 0){ err.textContent = "Enter what the paper is marked out of."; return; }
    const filled = (M.bounds||[]).filter(v=>v!=null);
    if (filled.length && filled.length !== gradeLetters(u).length){ err.textContent = "Fill in every boundary, or leave them all blank."; return; }
    if (filled.length && filled.some((v,i,a)=> i && v >= a[i-1])){ err.textContent = "Boundaries must go down from the top grade to E."; return; }
  }
  if (!M.date){ err.textContent = "Pick the date you sat it."; return; }
  const a = {id: M.editing || newId(), unit:M.unit, series:M.series, variant:M.series==="custom"?"":(M.variant||""), raw, date:M.date, notes:M.notes.trim(),
    created: (M.editing && S.attempts.find(x=>x.id===M.editing)?.created) || Date.now()};
  if (M.series === "custom"){ a.seriesLabel = M.seriesLabel.trim() || "Other"; a.max = max; const b = modalBounds(); if (b) a.bounds = b; }
  const btn = document.getElementById("mSave"); btn.disabled = true; btn.textContent = "Saving…";
  try { await saveAttempt(a); const was = !!M.editing; closeModal(); toast(was ? "Changes saved" : `Saved ${u.short} · ${a.series==="custom"?a.seriesLabel:SERIES_LABEL[a.series]}`); }
  catch(e){ btn.disabled = false; btn.textContent = "Save paper"; err.textContent = e && e.code === "quota_exceeded" ? "Storage is full. Delete some old papers and try again." : "Couldn't save — check your connection and try again."; }
}
function closeModal(){ M = null; drawModal(); }

/* ---------- exam date ---------- */
function openExamModal(code){
  const root = document.getElementById("modalRoot"); const u = unitDef(code); const cur = (S.profile.examDates||{})[code] || "";
  root.innerHTML = `<div class="scrim" id="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="eTitle" style="width:min(420px,100%)">
    <div class="modal-h"><h2 id="eTitle">${esc(u.short)} exam date</h2><button class="btn ghost sm" id="eClose" aria-label="Close">✕</button></div>
    <div class="modal-b"><p class="caption" style="margin:0">${esc(u.name)} <span class="mono muted">${esc(code)}</span></p>
      <label class="f" for="eDate">Date you sit it<input id="eDate" type="date" value="${esc(cur)}"></label></div>
    <div class="modal-f">${cur?`<button class="btn ghost danger" id="eClear" style="margin-right:auto">Remove date</button>`:""}<button class="btn" id="eCancel">Cancel</button><button class="btn primary" id="eSave">Save</button></div></div></div>`;
  const q = id => document.getElementById(id);
  const close = () => root.innerHTML = "";
  q("eClose").onclick = q("eCancel").onclick = close;
  q("scrim").onclick = e => { if (e.target.id === "scrim") close(); };
  q("eSave").onclick = () => { const v = q("eDate").value; if (!v){ q("eDate").focus(); return; } setExamDate(code, v); close(); toast(`${u.short}: ${examLabel(examOf(code)).toLowerCase()}`); };
  if (q("eClear")) q("eClear").onclick = () => { setExamDate(code, null); close(); };
}
function setExamDate(code, v){
  const d = {...(S.profile.examDates||{})}; if (v) d[code] = v; else delete d[code];
  S.profile.examDates = d; saveProfile();
}

/* ---------- your own subject / paper ---------- */
function openSubjectModal(){
  const root = document.getElementById("modalRoot");
  root.innerHTML = `<div class="scrim" id="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="sTitle">
    <div class="modal-h"><h2 id="sTitle">Your own subject</h2><button class="btn ghost sm" id="sClose" aria-label="Close">✕</button></div>
    <div class="modal-b"><p class="caption" style="margin:0">For a subject that isn't listed, from another board or your school's mocks. You'll add its papers next.</p>
      <label class="f" for="sName">Subject name<input id="sName" placeholder="e.g. Computer Science"></label><div class="err" id="sErr" role="alert"></div></div>
    <div class="modal-f"><button class="btn" id="sCancel">Cancel</button><button class="btn primary" id="sSave">Add subject</button></div></div></div>`;
  const q = id => document.getElementById(id);
  q("sClose").onclick = q("sCancel").onclick = () => root.innerHTML = "";
  q("scrim").onclick = e => { if (e.target.id === "scrim") root.innerHTML = ""; };
  setTimeout(()=>q("sName").focus(), 30);
  q("sSave").onclick = () => {
    const name = q("sName").value.trim();
    if (!name){ q("sErr").textContent = "Give the subject a name."; return; }
    const id = "C" + Date.now().toString(36);
    S.profile.customSubjects = (S.profile.customSubjects||[]).concat([{id, name}]);
    S.profile.subjects = chosenList().concat([{id, units:[]}]);
    root.innerHTML = ""; saveProfile(); toast(`Added ${name} — now add its papers`);
    setTimeout(() => openUnitModal(id), 50);
  };
}
function openUnitModal(subjectId){
  const root = document.getElementById("modalRoot"); const subj = libSubject(subjectId);
  root.innerHTML = `<div class="scrim" id="scrim"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="uTitle">
    <div class="modal-h"><h2 id="uTitle">Add a paper to ${esc(subj.name)}</h2><button class="btn ghost sm" id="uClose" aria-label="Close">✕</button></div>
    <div class="modal-b">
      <div class="row"><label class="f" for="uCode">Code<input id="uCode" placeholder="e.g. 9618/12 or MOCK1"></label>
        <label class="f" for="uShort">Short name<input id="uShort" placeholder="e.g. P1"></label></div>
      <label class="f" for="uName">Paper name<input id="uName" placeholder="e.g. Theory Fundamentals"></label>
      <div class="row"><label class="f" for="uLvl">Level<select id="uLvl"><option value="AS">AS (grades A–E)</option><option value="A2">A2 (grades A*–E)</option></select></label>
        <label class="f" for="uMax">Marked out of<input id="uMax" inputmode="numeric" placeholder="75"></label>
        <label class="f" for="uUms">UMS out of (optional)<input id="uUms" inputmode="numeric" placeholder="100"></label></div>
      <label class="f" for="uB">Usual grade boundaries (optional)<input id="uB" placeholder="AS: A,B,C,D,E  ·  A2: A*,A,B,C,D,E  e.g. 60,53,46,39,32"></label>
      <p class="caption" style="margin:0">Leave the boundaries blank if they change each time — you can type them in when you log each paper.</p>
      <div class="err" id="uErr" role="alert"></div></div>
    <div class="modal-f"><button class="btn" id="uCancel">Cancel</button><button class="btn primary" id="uSave">Add paper</button></div></div></div>`;
  const q = id => document.getElementById(id);
  q("uClose").onclick = q("uCancel").onclick = () => root.innerHTML = "";
  q("scrim").onclick = e => { if (e.target.id === "scrim") root.innerHTML = ""; };
  setTimeout(()=>q("uCode").focus(), 30);
  q("uSave").onclick = () => {
    const err = q("uErr");
    const code = q("uCode").value.trim().toUpperCase().replace(/[^A-Z0-9_.-]/g,"-").replace(/^-+|-+$/g,"");
    const short = q("uShort").value.trim().slice(0,8) || code.slice(0,8);
    const name = q("uName").value.trim() || code;
    const lvl = q("uLvl").value, max = Number(q("uMax").value), ums = Number(q("uUms").value || 100);
    if (!code){ err.textContent = "Give the paper a code, so it can't be mixed up with another."; return; }
    if (BUILTIN_UNITS[code] || (S.profile.customUnits||[]).some(u=>u.code===code)){ err.textContent = `${code} is already used. Pick a different code.`; return; }
    if (!Number.isInteger(max) || max <= 0){ err.textContent = "Enter what the paper is marked out of."; return; }
    let bounds = null; const bt = q("uB").value.trim();
    if (bt){ bounds = bt.split(/[,\s/]+/).map(Number); const need = lvl==="A2"?6:5;
      if (bounds.length !== need || bounds.some(v=>!Number.isFinite(v) || v > max) || bounds.some((v,j,a)=>j && v >= a[j-1])){ err.textContent = `Enter ${need} boundaries, highest first, none above ${max}.`; return; } }
    S.profile.customUnits = (S.profile.customUnits||[]).concat([{code, short, name, level:lvl, max, ums: Number.isFinite(ums) && ums > 0 ? ums : 100, bounds, subject: subjectId}]);
    const list = chosenList().map(c => c.id === subjectId ? {...c, units: c.units.concat(code)} : c);
    root.innerHTML = ""; setChosen(list); toast(`Added ${short} to ${subj.name}`);
  };
}

/* ================= events ================= */
document.getElementById("tabs").addEventListener("click", e => {
  const t = e.target.closest(".tab"); if (!t) return; S.tab = t.dataset.tab;
  try { localStorage.setItem("ialpt.tab", S.tab); } catch(_){}
  render();
});
document.getElementById("logBtn").onclick = () => { if (S.mode === "cloud") openLog(); };
main.addEventListener("click", async e => {
  if (e.target.classList && e.target.classList.contains("udate")) { e.preventDefault(); try { e.target.showPicker(); } catch(_){} return; }
  const el = e.target.closest("button"); if (!el) return;
  const d = el.dataset;
  if (d.logSubject) return openLog({subject:d.logSubject});
  if (d.logUnit) return openLog({unit:d.logUnit});
  if (d.ov){ S.ovFilter = d.ov; return render(); }
  if (d.logPaper){ const [unit,series,variant] = d.logPaper.split("|"); return openLog({unit, series, variant}); }
  if (d.openPaper){ const [unit,series,variant] = d.openPaper.split("|"); const a = allEnriched().filter(x=>x.unit===unit&&x.series===series&&(x.variant||"")===variant).sort((x,y)=>y.pct-x.pct)[0]; if (a) return openLog(a, a.id); }
  if (d.gridSubj){ S.gridSubject = d.gridSubj; return render(); }
  if (d.trendSubj){ S.trendSubject = d.trendSubj; return render(); }
  if (d.trendUnit){ const h = S.trendHidden[S.trendSubject] || []; S.trendHidden[S.trendSubject] = h.includes(d.trendUnit) ? h.filter(x=>x!==d.trendUnit) : h.concat(d.trendUnit); return render(); }
  if (d.hist){ S.histFilter = d.hist; return render(); }
  if (d.edit){ const a = S.attempts.find(x=>x.id===d.edit); if (a) return openLog(a, a.id); }
  if (d.goto){ S.stayOnboard = false; S.tab = d.goto; try { localStorage.setItem("ialpt.tab", S.tab); } catch(_){} window.scrollTo(0,0); return render(); }
  if (d.pickSubj){
    if (S.tab === "overview") S.stayOnboard = true;
    const list = chosenList(); const on = list.some(c=>c.id===d.pickSubj);
    if (on) return setChosen(list.filter(c=>c.id!==d.pickSubj));
    const l = libSubject(d.pickSubj);
    return setChosen(list.concat([{id:d.pickSubj, units: LIB_SUBJECTS.some(x=>x.id===d.pickSubj) ? (l.def||l.units).slice() : allUnitsOf(d.pickSubj)}]));
  }
  if (d.addUnit) return openUnitModal(d.addUnit);
  if (d.exam) return openExamModal(d.exam);
  if (d.delUnit){
    if (el.dataset.confirm !== "1"){ el.dataset.confirm = "1"; el.textContent = "Tap again"; return; }
    S.profile.customUnits = (S.profile.customUnits||[]).filter(u=>u.code!==d.delUnit);
    return setChosen(chosenList().map(c=>({...c, units:c.units.filter(x=>x!==d.delUnit)})));
  }
  if (d.delCsubj){
    const codes = allUnitsOf(d.delCsubj);
    if (S.attempts.some(a=>codes.includes(a.unit))){ toast("Delete this subject's logged papers in History first"); return; }
    if (el.dataset.confirm !== "1"){ el.dataset.confirm = "1"; el.textContent = "Tap again to delete"; return; }
    S.profile.customSubjects = (S.profile.customSubjects||[]).filter(c=>c.id!==d.delCsubj);
    S.profile.customUnits = (S.profile.customUnits||[]).filter(u=>u.subject!==d.delCsubj);
    return setChosen(chosenList().filter(c=>c.id!==d.delCsubj));
  }
  if (el.id === "addSubject") return openSubjectModal();
  if (el.id === "copyBackup"){
    const txt = JSON.stringify({app:"ial-paper-tracker", v:1, attempts:S.attempts, profile:S.profile});
    try { await navigator.clipboard.writeText(txt); toast("Backup copied — paste it into a note to keep it"); }
    catch(_){ const w=document.getElementById("backupWrap"); w.hidden=false; const b=document.getElementById("backupBox"); b.value=txt; b.select(); toast("Select all and copy the text shown"); }
    return;
  }
  if (el.id === "restoreBackup"){ const w=document.getElementById("backupWrap"); w.hidden=false; document.getElementById("backupBox").value=""; document.getElementById("backupBox").focus(); return; }
  if (el.id === "doRestore"){
    e.preventDefault();
    let j; try { j = JSON.parse(document.getElementById("backupBox").value); } catch(_){ toast("That text isn't a valid backup"); return; }
    if (!j || !Array.isArray(j.attempts)){ toast("That text isn't a valid backup"); return; }
    if (j.profile){ const p = normalizeProfile(j.profile);
      const hs = new Set((S.profile.customSubjects||[]).map(c=>c.id)), hu = new Set((S.profile.customUnits||[]).map(u=>u.code));
      S.profile.customSubjects = (S.profile.customSubjects||[]).concat(p.customSubjects.filter(c=>!hs.has(c.id)));
      S.profile.customUnits = (S.profile.customUnits||[]).concat(p.customUnits.filter(u=>!hu.has(u.code)));
      if (Array.isArray(p.subjects) && (!Array.isArray(S.profile.subjects) || !S.attempts.length)){
        const have = new Set(chosenList().map(c=>c.id));
        S.profile.subjects = chosenList().map(c => { const o = p.subjects.find(x=>x.id===c.id); return o ? {...c, units:[...new Set(c.units.concat(o.units))]} : c; })
          .concat(p.subjects.filter(x=>!have.has(x.id)));
      } else if (!Array.isArray(p.subjects) && (j.attempts||[]).length){
        const have = new Set(chosenList().map(c=>c.id));
        for (const id of ["PH","MA","EC"]) if (!have.has(id) && j.attempts.some(a => (BUILTIN_UNITS[a.unit]||{}).s === id)){ const l = libSubject(id); S.profile.subjects = chosenList().concat([{id, units:(l.def||l.units).slice()}]); }
      }
      S.profile.examDates = {...(p.examDates||{}), ...(S.profile.examDates||{})};
      saveProfile(); }
    const have = new Set(S.attempts.map(a=>a.id)); let n=0;
    for (const a of j.attempts){ if (!a || !a.id || have.has(a.id) || !a.unit) continue; try { await saveAttempt(a); n++; } catch(_){} }
    toast(`Restored ${n} paper${n===1?"":"s"}`); return;
  }
});
main.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.examDate !== undefined && t.classList.contains("udate")){ setExamDate(t.dataset.examDate, t.value || null); return; }
  if (t.dataset.unitToggle){ const [sid, code] = t.dataset.unitToggle.split("|");
    setChosen(chosenList().map(c => c.id !== sid ? c : {...c, units: t.checked ? (c.units.includes(code) ? c.units : allUnitsOf(sid).filter(x => x===code || c.units.includes(x))) : c.units.filter(x=>x!==code)})); }
  if (t.id === "countVariants"){ S.profile.countVariants = t.checked; saveProfile(); }
});
main.addEventListener("click", e => {
  const th = e.target.closest("th[data-sort]"); if (!th) return;
  const k = th.dataset.sort; S.histSort = S.histSort.k === k ? {k, dir:-S.histSort.dir} : {k, dir: k==="paper"?1:-1}; render();
});
document.addEventListener("keydown", e => { if (e.key === "Escape" && document.getElementById("scrim")) { M = null; document.getElementById("modalRoot").innerHTML = ""; } });
let toastT;
function toast(msg){ let t = document.querySelector(".toast"); if (!t){ t = document.createElement("div"); t.className="toast"; t.setAttribute("role","status"); document.body.appendChild(t); } t.textContent = msg; clearTimeout(toastT); toastT = setTimeout(()=>t.remove(), 2600); }

initStore();
