'use strict';

const scenarios = [
  {
    id:'bec', target:'ACME FINANCIAL', objective:'Divert a high-value vendor payment.', impact:'MONEY STOLEN', impactDetail:'A fraudulent transfer clears before the organization can recall it.',
    stages:[
      stage('Initial Access','Find a believable way into an employee workflow.',[
        move('Spoof a vendor email','Impersonate a familiar supplier and prompt a sign-in.','medium','Phishing-resistant MFA','Email gateway flags the message','Mailbox telemetry records the lure.'),
        move('Reuse exposed credentials','Try previously exposed credentials against the sign-in portal.','high','Phishing-resistant MFA','Authentication control blocks the attempt','Identity telemetry records a risky sign-in.'),
        move('Abuse a trusted app prompt','Use a deceptive app-consent request.','low','App consent restrictions','Consent policy blocks the app','Cloud audit logs record new app consent.')]),
      stage('Foothold','Stay inside without attracting immediate attention.',[
        move('Create an inbox rule','Hide replies and forward selected messages.','medium','Mailbox rule monitoring','Automated policy rejects the rule','Exchange logs record a new forwarding rule.'),
        move('Register a new sign-in method','Add another way to access the account.','high','Strong identity verification','Identity protection blocks registration','Identity telemetry records a new factor.'),
        move('Blend into normal webmail use','Read recent threads and mimic ordinary activity.','low','Session risk controls','Risk engine challenges the session','Mail access logs record unusual browsing.')]),
      stage('Expand Access','Get closer to the payment process.',[
        move('Search finance mailboxes','Look for invoice and approval patterns.','medium','Least privilege access','Permissions prevent access','Audit logs record unusual mailbox discovery.'),
        move('Impersonate the finance lead','Send an internal payment-change request.','high','Out-of-band payment verification','Finance verifies independently and blocks it','Messaging telemetry records an unusual request.'),
        move('Study a live invoice thread','Wait for a real payment conversation to appear.','low','Security awareness training','A trained employee reports the odd context','Mailbox telemetry links your access pattern.')]),
      stage('Prepare Impact','Set up the final diversion.',[
        move('Change bank instructions','Insert new payment details into the thread.','medium','Dual approval for payment changes','Second approver rejects the change','Email history exposes a changed destination.'),
        move('Rush the approver','Create urgency to bypass normal checks.','high','Security awareness training','Employee escalates the request','User report and message telemetry correlate.'),
        move('Wait for the normal payment window','Time the request to look routine.','low','Out-of-band payment verification','Vendor confirmation catches the change','Payment workflow logs show anomalous edits.')]),
      stage('Business Impact','Complete the theft.',[
        move('Send the fraudulent payment','Push the altered payment through.','high','Transaction verification','Banking control stops release','Payment and identity signals converge.'),
        move('Split the transfer','Use smaller transfers to avoid attention.','medium','Anomaly-based payment monitoring','Transaction pattern is blocked','Multiple unusual transfers create a strong pattern.'),
        move('Redirect one scheduled payment','Change only a single legitimate transfer.','low','Out-of-band payment verification','Independent confirmation stops it','Final approval logs expose the diversion.')])
    ], correctDefense:'Phishing-resistant MFA', explanation:'The earliest break in this chain is stronger, phishing-resistant identity protection. It prevents the initial account takeover that makes every later payment-manipulation step possible.'
  },
  {
    id:'ransomware', target:'NORTHSTAR MANUFACTURING', objective:'Deploy ransomware across production systems.', impact:'OPERATIONS SHUT DOWN', impactDetail:'Critical systems are encrypted and production grinds to a halt.',
    stages:[
      stage('Initial Access','Find a path into an employee endpoint.',[
        move('Send a malicious attachment','Use a plausible business document as the lure.','high','Email security gateway','Attachment is quarantined','Mail telemetry records a malicious payload.'),
        move('Exploit an exposed remote service','Probe a public-facing remote access point.','medium','Network access control','Access policy rejects the connection','Remote access logs record repeated anomalies.'),
        move('Use stolen credentials','Try a previously exposed username and password.','low','Phishing-resistant MFA','Identity challenge blocks access','Identity telemetry records risky authentication.')]),
      stage('Foothold','Establish a stable presence.',[
        move('Launch a suspicious script','Use a script to maintain access.','high','Endpoint detection and response','EDR blocks the behavior','Endpoint telemetry records suspicious execution.'),
        move('Create a persistence mechanism','Add a startup behavior that survives reboot.','medium','Endpoint hardening','Policy prevents the change','System logs record persistence activity.'),
        move('Hide inside a legitimate process','Blend activity into common system behavior.','low','Behavioral endpoint monitoring','Behavioral controls isolate the process','EDR records unusual process relationships.')]),
      stage('Expand Access','Reach more systems.',[
        move('Reuse privileged credentials','Try credentials found on the first system.','high','Least privilege access','Credentials lack lateral rights','Identity telemetry records unusual privilege use.'),
        move('Move through a shared admin tool','Abuse software already used by IT.','medium','Privileged access management','Admin controls deny the session','Management logs show abnormal tool use.'),
        move('Probe nearby file servers','Test which systems accept your current access.','low','Network segmentation','Segmentation blocks the route','Network telemetry records unusual discovery.')]),
      stage('Prepare Impact','Position the attack for maximum disruption.',[
        move('Disable recovery options','Try to weaken backups and recovery paths.','high','Immutable backups','Protected backups cannot be altered','Backup logs record unauthorized activity.'),
        move('Stage the encryption job','Prepare widespread execution.','medium','Application allowlisting','Unapproved execution is blocked','Endpoint telemetry shows coordinated staging.'),
        move('Target production shares first','Focus on operationally critical data.','low','Network segmentation','Production shares are isolated','File access telemetry shows unusual concentration.')]),
      stage('Business Impact','Trigger encryption.',[
        move('Encrypt broadly','Launch the ransomware across reachable systems.','high','Endpoint detection and response','EDR isolates affected endpoints','Correlated endpoint activity reveals the attack.'),
        move('Encrypt critical systems first','Prioritize the systems that halt operations.','medium','Network segmentation','Critical systems are unreachable','Network and endpoint signals converge.'),
        move('Start with shared storage','Attack central file repositories.','low','Immutable backups','Recovery controls reduce the impact','File-system telemetry exposes mass changes.')])
    ], correctDefense:'Phishing-resistant MFA', explanation:'In this scenario the earliest reliable interruption is preventing the stolen-credential entry. Once the attacker establishes a foothold, later controls still matter, but stopping initial access breaks the whole chain sooner.'
  },
  {
    id:'data', target:'BRIGHTWAY HEALTH', objective:'Steal a sensitive customer dataset.', impact:'SENSITIVE DATA EXPOSED', impactDetail:'Protected customer information leaves the environment and becomes a breach.',
    stages:[
      stage('Initial Access','Acquire access to a trusted account.',[
        move('Use a fake sign-in page','Capture a user login through a deceptive prompt.','high','Phishing-resistant MFA','Authentication cannot be replayed','Identity telemetry records the failed attempt.'),
        move('Abuse a stale account','Try an account that should have been removed.','low','Identity lifecycle management','The stale account is disabled','Directory logs record rejected authentication.'),
        move('Trigger repeated MFA prompts','Pressure a user to approve a sign-in.','medium','Number matching / phishing-resistant MFA','Strong MFA prevents approval abuse','Identity telemetry records repeated prompts.')]),
      stage('Foothold','Learn where valuable data lives.',[
        move('Search cloud storage','Browse for large or sensitive repositories.','medium','Data access governance','Access policy limits discovery','Cloud audit logs record unusual search behavior.'),
        move('Enumerate shared folders','Map what the account can reach.','low','Least privilege access','Permissions expose little useful data','File telemetry records broad discovery.'),
        move('Query internal collaboration tools','Look for links to protected systems.','high','Conditional access','Risk controls challenge the session','SaaS logs record unusual exploration.')]),
      stage('Expand Access','Gain access to higher-value data.',[
        move('Request elevated access','Use a plausible workflow to gain more permissions.','medium','Approval-based privileged access','Request requires independent approval','Identity logs record privilege request.'),
        move('Reuse a privileged token','Try an existing session artifact.','high','Session protection','Token replay is rejected','Identity telemetry records session anomaly.'),
        move('Exploit overbroad permissions','Use access the account never needed.','low','Least privilege access','Permissions are appropriately constrained','Data logs expose unusual access concentration.')]),
      stage('Prepare Impact','Collect the dataset for removal.',[
        move('Bundle many files','Aggregate data into one location.','high','Data loss prevention','DLP blocks bulk aggregation','Storage telemetry records mass collection.'),
        move('Download in smaller batches','Reduce obvious spikes in activity.','low','Behavioral data monitoring','Repeated unusual downloads correlate','Cloud logs reveal sustained extraction.'),
        move('Use a sync client','Leverage a normal sync mechanism.','medium','Managed application controls','Unmanaged sync is denied','Application telemetry records abnormal sync.')]),
      stage('Business Impact','Move the data outside.',[
        move('Upload to external storage','Transfer the dataset to an outside service.','high','Data loss prevention','DLP prevents external transfer','Egress telemetry records attempted exfiltration.'),
        move('Send through an approved app','Use a trusted collaboration channel.','medium','App governance','Policy blocks external sharing','SaaS logs show anomalous sharing.'),
        move('Exfiltrate gradually','Move small amounts over time.','low','Behavioral data monitoring','Pattern analysis surfaces the activity','Cross-session telemetry forms a coherent pattern.')])
    ], correctDefense:'Identity lifecycle management', explanation:'A properly managed identity lifecycle removes stale accounts before they become an entry point. That defense interrupts this attack at Stage 1, earlier than controls that only react after data access begins.'
  },
  {
    id:'recovery', target:'RIVERSTONE LOGISTICS', objective:'Create a destructive compromise that is expensive to recover from.', impact:'MAJOR RECOVERY COSTS', impactDetail:'Systems require extensive incident response, rebuilding, and business recovery work.',
    stages:[
      stage('Initial Access','Find a weak remote path into the environment.',[
        move('Try an exposed remote login','Target a public-facing remote access service.','medium','Secure remote access controls','Access is restricted and blocked','Remote authentication logs record the attempt.'),
        move('Use a contractor account','Try an account with broad lingering access.','low','Identity lifecycle management','Contractor access was removed','Directory telemetry records rejected access.'),
        move('Send a targeted credential lure','Impersonate an internal support workflow.','high','Phishing-resistant MFA','Captured password is not enough','Mail and identity telemetry correlate.')]),
      stage('Foothold','Make your access resilient.',[
        move('Create a hidden admin account','Add a new privileged identity.','high','Privileged access monitoring','Unauthorized admin creation is blocked','Directory logs record privilege creation.'),
        move('Change a scheduled task','Use a system task for persistence.','medium','Endpoint hardening','Policy prevents the modification','Endpoint telemetry records task changes.'),
        move('Use an existing service account','Blend into machine-to-machine activity.','low','Service account governance','Account use is tightly constrained','Identity telemetry flags unusual source use.')]),
      stage('Expand Access','Reach infrastructure with recovery value.',[
        move('Access backup management','Try to reach systems used for restoration.','high','Privileged access management','Separate credentials block access','Admin audit logs record the attempt.'),
        move('Explore management servers','Find tools with wide reach.','medium','Network segmentation','Management network is isolated','Network telemetry records blocked traversal.'),
        move('Reuse administrative sessions','Piggyback on trusted admin access.','low','Session protection','Session anomaly is rejected','Identity telemetry records unusual session use.')]),
      stage('Prepare Impact','Increase the cost of cleanup.',[
        move('Delete recovery snapshots','Try to remove easy rollback options.','high','Immutable backups','Protected snapshots cannot be deleted','Backup telemetry records destructive intent.'),
        move('Disable security tooling','Try to weaken monitoring before impact.','medium','Tamper protection','Security controls resist changes','Endpoint telemetry records tampering.'),
        move('Change core configurations','Create widespread remediation work.','low','Configuration management','Unauthorized drift is reversed','Config logs show abnormal changes.')]),
      stage('Business Impact','Make recovery painful.',[
        move('Destroy key system configurations','Force broad rebuilding work.','high','Configuration management','Known-good configuration is restored','System telemetry exposes coordinated changes.'),
        move('Corrupt shared infrastructure','Damage services used across teams.','medium','Network segmentation','Blast radius stays limited','Infrastructure signals converge.'),
        move('Remove local recovery options','Make endpoint restoration harder.','low','Immutable backups','Recovery remains available','Backup and endpoint logs expose the attempt.')])
    ], correctDefense:'Identity lifecycle management', explanation:'Removing old contractor access closes the attacker’s earliest path. That is the strongest prevention point because every destructive step depends on the initial foothold.'
  },
  {
    id:'trust', target:'MERCURY RETAIL', objective:'Compromise a customer-facing channel.', impact:'CUSTOMER TRUST DAMAGED', impactDetail:'Customers encounter fraudulent or compromised communications and confidence drops.',
    stages:[
      stage('Initial Access','Get into an account connected to customer communications.',[
        move('Target a marketing login','Use a realistic credential lure.','high','Phishing-resistant MFA','Stolen password cannot complete login','Identity telemetry records the attempt.'),
        move('Try a shared team password','Use a password reused across staff.','medium','Unique accounts + MFA','Shared credentials are eliminated','Authentication logs show repeated failures.'),
        move('Abuse a connected SaaS app','Attempt access through a trusted integration.','low','App governance','Unapproved app access is denied','Cloud audit logs record app activity.')]),
      stage('Foothold','Learn the customer communication workflow.',[
        move('Read campaign drafts','Study tone, timing, and audience.','low','Least privilege access','Account cannot reach campaign content','SaaS logs record unusual access.'),
        move('Export contact lists','Find customers to target.','high','Data loss prevention','Bulk export is blocked','Data telemetry records an export attempt.'),
        move('Change a sender profile','Prepare a believable impersonation.','medium','Change approval workflow','Profile edits require approval','Admin logs record sender changes.')]),
      stage('Expand Access','Gain the ability to publish externally.',[
        move('Request campaign permissions','Use normal workflow to seek broader rights.','medium','Approval-based privileged access','Independent approval blocks elevation','Audit logs record the request.'),
        move('Reuse an administrator session','Attempt to inherit higher privileges.','high','Session protection','Session replay is rejected','Identity telemetry flags the anomaly.'),
        move('Exploit excessive role permissions','Use access the account already has.','low','Least privilege access','Role permissions are constrained','SaaS telemetry shows abnormal actions.')]),
      stage('Prepare Impact','Create a customer-facing deception.',[
        move('Draft a fraudulent promotion','Prepare a convincing message.','low','Content approval workflow','Publishing requires independent review','Campaign logs show unusual drafting activity.'),
        move('Insert a malicious destination','Change where customers are sent.','medium','Link protection','Unsafe destination is blocked','Security tooling records a risky link.'),
        move('Change reply handling','Route responses away from staff.','high','Mailbox rule monitoring','Rule change is blocked','Mail telemetry records forwarding changes.')]),
      stage('Business Impact','Publish the fraudulent content.',[
        move('Send to the full customer list','Maximize reach before detection.','high','Content approval workflow','Unapproved campaign cannot send','Campaign audit logs expose the attempt.'),
        move('Send to a small segment first','Test whether anyone notices.','low','Behavioral monitoring','Unexpected campaign behavior triggers review','SaaS telemetry shows anomalous sending.'),
        move('Post through a connected social account','Use another customer-facing channel.','medium','App governance','Connected-app permissions block publishing','Cloud telemetry exposes cross-app activity.')])
    ], correctDefense:'Phishing-resistant MFA', explanation:'The fastest way to protect the entire customer-facing workflow is to stop the initial account takeover. Strong phishing-resistant authentication prevents the attacker from gaining the trusted identity they need.'
  },
  {
    id:'failure', target:'CEDAR RIDGE SERVICES', objective:'Create a cascading compromise across the business.', impact:'BUSINESS FAILURE RISK', impactDetail:'The attack combines operational, financial, and trust damage severe enough to threaten the organization’s survival.',
    stages:[
      stage('Initial Access','Choose the weakest human or identity entry point.',[
        move('Use an old employee account','Try credentials that should no longer exist.','low','Identity lifecycle management','Departed-user access is disabled','Directory telemetry records rejected access.'),
        move('Send a targeted phishing lure','Use a believable internal request.','medium','Phishing-resistant MFA','Captured credentials cannot be replayed','Mail and identity telemetry correlate.'),
        move('Pressure an MFA user','Generate repeated approval prompts.','high','Phishing-resistant MFA','Strong authentication blocks the tactic','Identity telemetry records prompt abuse.')]),
      stage('Foothold','Find systems with broad business reach.',[
        move('Explore finance systems','Look for payment and accounting access.','high','Least privilege access','Permissions deny finance access','Application logs record unusual exploration.'),
        move('Explore shared file systems','Search for operational documents.','low','Data access governance','Access is tightly scoped','File telemetry records broad discovery.'),
        move('Explore admin tooling','Find controls used across the business.','medium','Privileged access management','Separate privileged identity is required','Admin logs record denied access.')]),
      stage('Expand Access','Link together multiple parts of the environment.',[
        move('Reuse discovered credentials','Try one identity across several systems.','high','Unique credentials + MFA','Credential reuse fails','Identity logs show repeated cross-system attempts.'),
        move('Use existing integrations','Move through trusted connections.','low','App governance','Integration permissions are restricted','Cloud logs record cross-app activity.'),
        move('Request elevated privileges','Abuse routine access workflows.','medium','Approval-based privileged access','Independent approval stops elevation','Directory audit logs record the request.')]),
      stage('Prepare Impact','Set up simultaneous business disruption.',[
        move('Target backup and finance systems','Prepare both operational and financial impact.','high','Network segmentation','Critical systems are separated','Multiple telemetry sources reveal coordinated targeting.'),
        move('Prepare customer-facing fraud','Add a trust-damaging component.','medium','Content approval workflow','External publishing requires review','SaaS logs expose the preparation.'),
        move('Stage destructive endpoint activity','Prepare broad system disruption.','low','Endpoint detection and response','EDR contains suspicious activity','Endpoint telemetry forms a strong pattern.')]),
      stage('Business Impact','Trigger cascading damage.',[
        move('Launch all prepared actions','Maximize simultaneous impact.','high','Layered security controls','Multiple defenses contain the blast radius','Cross-domain telemetry gives Huntress a complete picture.'),
        move('Prioritize financial damage','Strike money flows first.','medium','Transaction verification','Payment controls block the loss','Identity and finance telemetry converge.'),
        move('Prioritize operational damage','Strike critical systems first.','low','Network segmentation','Critical systems remain isolated','Network and endpoint signals reveal the attack.')])
    ], correctDefense:'Identity lifecycle management', explanation:'The attack begins with an account that should no longer exist. Removing stale identities is the earliest preventive control and eliminates the foothold before the cascading compromise can begin.'
  }
];

function stage(name,prompt,moves){return{name,prompt,moves}}
function move(name,desc,risk,defense,blockedText,trace){return{name,desc,risk,defense,blockedText,trace}}

const $=s=>document.querySelector(s);
const screens={start:$('#startScreen'),game:$('#gameScreen'),consequence:$('#consequenceScreen'),forensics:$('#forensicsScreen')};
const scenarioMeta={
  bec:'Industry: Financial services • Systems: Email • Identity • Payments',
  ransomware:'Industry: Manufacturing • Systems: Endpoint • Network • Production',
  data:'Industry: Healthcare • Systems: Identity • Cloud • Data',
  recovery:'Industry: Professional services • Systems: Endpoint • Backup • Network',
  trust:'Industry: Retail • Systems: SaaS • Email • Customer channels',
  failure:'Industry: Small business • Systems: Identity • Endpoint • Cloud • Finance'
};
const state={scenario:null,stageIndex:0,detection:0,traces:[],moves:[],startTime:0,timerId:null,elapsed:0,remaining:300,finished:false,sound:true,resolving:false};

const missionProfiles={
  bec:{label:'FINANCIAL FRAUD',tone:'finance'},
  ransomware:{label:'RANSOMWARE',tone:'ransomware'},
  data:{label:'DATA THEFT',tone:'data'},
  recovery:{label:'DESTRUCTIVE COMPROMISE',tone:'recovery'},
  trust:{label:'CUSTOMER TRUST',tone:'trust'},
  failure:{label:'CASCADING COMPROMISE',tone:'failure'}
};
const traceIcons={Identity:'ID',Email:'@',Endpoint:'PC',Cloud:'CL',Network:'NW',Data:'DB'};
function traceType(text=''){
  const t=text.toLowerCase();
  if(/mail|email|message|exchange|inbox/.test(t))return 'Email';
  if(/identity|sign-in|login|authentication|factor|credential|account/.test(t))return 'Identity';
  if(/cloud|app|consent|saas/.test(t))return 'Cloud';
  if(/data|file|record|dataset|database|payment|finance/.test(t))return 'Data';
  if(/endpoint|process|device|powershell|system|edr/.test(t))return 'Endpoint';
  return 'Network';
}

const riskMap={
  low:{detect:10,label:'LOW TRACE',speed:'SLOWEST',bolts:'ϟ',tone:'green'},
  medium:{detect:18,label:'MED TRACE',speed:'MODERATE',bolts:'ϟ ϟ',tone:'amber'},
  high:{detect:27,label:'HIGH TRACE',speed:'FASTEST',bolts:'ϟ ϟ ϟ',tone:'red'}
};
const huntressStates=[
  {max:19,word:'QUIET',msg:'No active threat hunter assigned.',step:0},
  {max:39,word:'WATCHING',msg:'Unusual activity is being watched. You are not a confirmed threat yet.',step:1},
  {max:59,word:'CORRELATING',msg:'Signals from different systems are starting to line up.',step:2},
  {max:79,word:'HUNTING',msg:'A threat hunter is actively piecing together your path.',step:3},
  {max:99,word:'CLOSING IN',msg:'Huntress has enough evidence to move. One noisy step could end the run.',step:3},
  {max:Infinity,word:'CAUGHT',msg:'Huntress connected the chain and contained your access.',step:4}
];

function showScreen(name){Object.values(screens).forEach(s=>s.classList.remove('active'));screens[name].classList.add('active');window.scrollTo({top:0,behavior:'smooth'})}
function randomScenario(){return scenarios[Math.floor(Math.random()*scenarios.length)]}
function formatTime(sec){sec=Math.max(0,sec);return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`}
function tone(freq=440,duration=.06,volume=.025){if(!state.sound)return;try{const A=window.AudioContext||window.webkitAudioContext;if(!A)return;const ctx=state.audio||(state.audio=new A());const o=ctx.createOscillator(),g=ctx.createGain();o.type='sine';o.frequency.value=freq;g.gain.value=volume;o.connect(g);g.connect(ctx.destination);o.start();g.gain.exponentialRampToValueAtTime(.0001,ctx.currentTime+duration);o.stop(ctx.currentTime+duration)}catch(e){}}
function resetGame(){
  clearInterval(state.timerId);
  state.scenario=randomScenario(); state.stageIndex=0; state.detection=0; state.traces=[]; state.moves=[];
  state.elapsed=0; state.remaining=300; state.finished=false; state.resolving=false; state.startTime=Date.now();
  $('#restartBtn').classList.remove('hidden'); $('#blockFeedback').classList.add('hidden');
  renderMission(); renderStage(); renderDetection(); renderTraces(); updateProgressSnapshot(); updateTimer();
  state.timerId=setInterval(updateTimer,500); showScreen('game'); tone(520,.06);
}
function updateTimer(){
  if(state.finished)return;
  state.elapsed=Math.floor((Date.now()-state.startTime)/1000); state.remaining=Math.max(0,300-state.elapsed);
  $('#timer').textContent=formatTime(state.remaining); $('#snapTime').textContent=formatTime(state.remaining);
  const wrap=$('.timer-wrap'); wrap.classList.toggle('warning',state.remaining<=60&&state.remaining>20); wrap.classList.toggle('danger',state.remaining<=20);
  if(state.remaining<=0)finish(false,'timeout');
}
function renderMission(){
  const sc=state.scenario, profile=missionProfiles[sc.id];
  $('#targetName').textContent=sc.target; $('#targetDetails').textContent=scenarioMeta[sc.id]||'Fictional target environment'; $('#missionObjective').textContent=sc.objective;
  $('#missionBadge').textContent=`MISSION TYPE: ${profile.label}`; $('.target-card').dataset.mission=profile.tone;
  const track=$('#stageTrack'); track.innerHTML='';
  sc.stages.forEach((st,i)=>{const n=document.createElement('div');n.className='stage-node';n.textContent=`${i+1} · ${st.name.toUpperCase()}`;if(i<state.stageIndex)n.classList.add('done');if(i===state.stageIndex)n.classList.add('active');track.appendChild(n)});
  updateProgressSnapshot();
}
function renderStage(){
  const st=state.scenario.stages[state.stageIndex];
  $('#stageLabel').textContent=`STAGE ${state.stageIndex+1} OF 5`; $('#stageName').textContent=st.name; $('#stagePrompt').textContent=st.prompt; $('#stageHint').textContent=state.stageIndex===4?'FINAL MOVE':'CHOOSE WISELY';
  $('#blockFeedback').classList.add('hidden');
  const wrap=$('#choices'); wrap.innerHTML=''; const icons=['◇','⌁','◈'];
  st.moves.forEach((mv,i)=>{const meta=riskMap[mv.risk];const b=document.createElement('button');b.type='button';b.className='choice-card';b.dataset.risk=mv.risk;b.setAttribute('aria-label',`${mv.name}. ${meta.label}. Defense: ${mv.defense}.`);b.innerHTML=`<span class="choice-icon" aria-hidden="true">${icons[i]}</span><h4>${mv.name}</h4><p>${mv.desc}</p><div class="choice-meta"><span>${meta.label}</span><span>DEFENSE: ${mv.defense}</span></div><div class="choice-speed"><span>${meta.speed}</span><strong aria-hidden="true">${meta.bolts}</strong></div>`;b.addEventListener('click',()=>chooseMove(mv,b));wrap.appendChild(b)});
  updateTension(); updateProgressSnapshot();
}
function chooseMove(mv,button){
  if(state.finished||state.resolving)return; state.resolving=true;
  document.querySelectorAll('.choice-card').forEach(b=>b.disabled=true); button.classList.add('resolving');
  const meta=riskMap[mv.risk], blockChance={low:.12,medium:.19,high:.28}[mv.risk], blocked=Math.random()<blockChance, delta=meta.detect+(blocked?8:0);
  state.detection=Math.min(100,state.detection+delta);
  const record={...mv,stage:state.stageIndex+1,stageName:state.scenario.stages[state.stageIndex].name,blocked,type:traceType(mv.trace),time:formatTime(state.elapsed)};
  state.moves.push(record); state.traces.push({text:mv.trace,hot:mv.risk==='high'||blocked,time:record.time,type:record.type,risk:meta.label,action:mv.name});
  renderDetection(); renderTraces(); flashChoiceOutcome(mv,blocked); updateProgressSnapshot(); updateTension();
  tone(blocked?180:650,.1,blocked?.04:.025);
  if(state.detection>=100){setTimeout(()=>finish(false,'caught'),760);return}
  setTimeout(()=>{state.resolving=false;if(blocked){renderStage();return}if(state.stageIndex>=4){finish(true,'impact');return}state.stageIndex++;renderMission();renderStage()},900);
}
function flashChoiceOutcome(mv,blocked){
  const fb=$('#blockFeedback');
  if(blocked){
    $('#stagePrompt').textContent=`BLOCKED: ${mv.blockedText}.`;
    fb.className='block-feedback';
    fb.innerHTML=`<strong>DEFENSE BLOCKED YOUR MOVE</strong><span><b>${mv.defense}</b> stopped: ${mv.name}.</span><span class="why">WHY IT MATTERS: ${mv.blockedText}. This breaks your path at Stage ${state.stageIndex+1} and forces you to adapt.</span>`;
  }else{
    $('#stagePrompt').textContent=`SUCCESS: ${mv.trace}`;
    fb.className='block-feedback warn';
    fb.innerHTML=`<strong>TRACE CREATED</strong><span>${traceType(mv.trace)} telemetry now links back to <b>${mv.name}</b>.</span><span class="why">Huntress can correlate this with traces from other systems.</span>`;
  }
}
function renderDetection(){
  const pct=Math.min(100,state.detection); $('#detectionFill').style.width=pct+'%'; const hs=huntressStates.find(s=>pct<=s.max);
  $('#detectionWord').textContent=hs.word; $('#huntressMessage').textContent=hs.msg; $('#traceCount').textContent=state.traces.length;
  $('#detectionWord').style.color=pct>=80?'var(--red)':pct>=60?'var(--amber)':'var(--cyan2)';
  const stateName=hs.word==='CLOSING IN'?'hunting':hs.word.toLowerCase(); $('.huntress-panel').dataset.state=stateName;
  const steps=[...document.querySelectorAll('#detectionSteps span')]; steps.forEach((el,i)=>{el.classList.toggle('on',i<=hs.step);el.classList.toggle('hot',hs.step===4&&i===4)});
  updateProgressSnapshot(); if(pct>=80)tone(220,.04,.012);
}
function renderTraces(){
  const wrap=$('#traceTimeline'); wrap.innerHTML='';
  state.traces.slice().reverse().slice(0,7).forEach(t=>{const d=document.createElement('div');d.className='trace-item'+(t.hot?' hot':'');d.dataset.type=t.type;d.innerHTML=`<span class="trace-icon" aria-hidden="true">${traceIcons[t.type]}</span><span class="trace-copy"><strong>${t.type} Trace</strong><span>${t.action}: ${t.text}</span></span><span class="trace-risk">${t.risk}<br>${t.time}</span>`;wrap.appendChild(d)});
  if(!state.traces.length)wrap.innerHTML='<p class="trace-sub">No traces yet. That won’t last.</p>';
  $('#traceCount').textContent=state.traces.length; updateProgressSnapshot();
}
function updateProgressSnapshot(){
  if(!state.scenario)return; const hs=huntressStates.find(s=>Math.min(100,state.detection)<=s.max);
  $('#snapStage').textContent=`${state.stageIndex+1} / 5`; $('#snapTraces').textContent=state.traces.length; $('#snapTime').textContent=formatTime(state.remaining); $('#snapHuntress').textContent=hs.word;
  $('#snapshotFill').style.width=`${Math.max(20,(state.stageIndex+1)*20)}%`; $('.progress-snapshot').classList.toggle('danger',state.detection>=60||state.stageIndex>=3);
}
function updateTension(){
  const game=$('#gameScreen'); game.classList.toggle('escalating',state.stageIndex>=2||state.detection>=40); game.classList.toggle('danger-zone',state.stageIndex>=3||state.detection>=70);
}
function finish(win,type){
  if(state.finished)return; state.finished=true;state.resolving=false;clearInterval(state.timerId);const sc=state.scenario;
  $('#resultStage').textContent=`Stage ${Math.min(5,state.stageIndex+1)}`;$('#resultDetection').textContent=`${state.detection}%`;$('#resultTime').textContent=formatTime(state.elapsed);
  if(win){$('#resultEyebrow').textContent='VICTORY · STAGE 5: BUSINESS IMPACT';$('#resultTitle').textContent='BREACH SUCCESSFUL';$('#resultBody').textContent=`${sc.impact}: ${sc.impactDetail} You reached impact before Huntress completed the picture.`;$('#forensicsBtn').innerHTML='SEE WHY YOU GOT THROUGH <span aria-hidden="true">→</span>';tone(760,.18,.04)}
  else if(type==='timeout'){$('#resultEyebrow').textContent='TIME EXPIRED';$('#resultTitle').textContent='HUNTRESS CLOSED THE WINDOW';$('#resultBody').textContent=`Five minutes are up. Huntress denied you the time needed to complete the attack. You reached Stage ${state.stageIndex+1}.`;$('#forensicsBtn').innerHTML='SEE HOW YOU LEFT A TRAIL <span aria-hidden="true">→</span>';tone(160,.22,.05)}
  else{$('#resultEyebrow').textContent='CAUGHT';$('#resultTitle').textContent='HUNTRESS CONNECTED THE DOTS';$('#resultBody').textContent=`Huntress correlated your traces before you could complete the job. You reached Stage ${state.stageIndex+1}.`;$('#forensicsBtn').innerHTML='SEE HOW YOU LEFT A TRAIL <span aria-hidden="true">→</span>';tone(160,.22,.05)}
  showScreen('consequence');
}
function renderForensics(){
  const recap=$('#recapChain'); recap.innerHTML='';
  state.moves.forEach((m,i)=>{const d=document.createElement('div');d.className='recap-item'+(m.blocked?' blocked':'');d.innerHTML=`<span class="stage-num">STAGE ${m.stage}</span><strong>${m.name}${m.blocked?' · BLOCKED':''}</strong><span class="control-tag">DEFENSE: ${m.defense}</span><span class="trace-detail"><b>${m.type} TRACE:</b> ${m.trace} ${i===0?'<span class="timeline-turn">← FIRST TURNING POINT</span>':''}</span>`;recap.appendChild(d)});
  $('#earliestBreak').innerHTML=`<strong>EARLIEST PREVENTION POINT: STAGE 1</strong><br><b>${state.scenario.correctDefense}</b> would have interrupted the chain before later traces and business impact could develop.`;
  const candidateSet=new Set([state.scenario.correctDefense]);state.moves.forEach(m=>candidateSet.add(m.defense));const fillers=['Network segmentation','Endpoint detection and response','Data loss prevention','Security awareness training','Privileged access management','App governance'];fillers.forEach(x=>candidateSet.add(x));let candidates=[...candidateSet].sort(()=>Math.random()-.5).slice(0,4);if(!candidates.includes(state.scenario.correctDefense))candidates[0]=state.scenario.correctDefense;candidates.sort(()=>Math.random()-.5);
  const grid=$('#defenseChoices');grid.innerHTML='';$('#defenseFeedback').textContent='Choose one control. The strongest answer interrupts the attack at the earliest possible stage.';$('#anotherBtn').classList.add('hidden');
  candidates.forEach(c=>{const b=document.createElement('button');b.type='button';b.className='defense-card';b.innerHTML=`<strong>${c}</strong><span>Would this break the chain earliest?</span>`;b.addEventListener('click',()=>checkDefense(b,c));grid.appendChild(b)}); showScreen('forensics');
}
function checkDefense(button,choice){
  document.querySelectorAll('.defense-card').forEach(b=>b.disabled=true);const correct=choice===state.scenario.correctDefense;button.classList.add(correct?'correct':'wrong');
  if(!correct){[...document.querySelectorAll('.defense-card')].find(b=>b.querySelector('strong').textContent===state.scenario.correctDefense)?.classList.add('correct')}
  $('#defenseFeedback').innerHTML=correct?`<strong>CHAIN INTERRUPTED.</strong><br>${state.scenario.explanation}`:`<strong>NOT THE EARLIEST BREAK.</strong><br>The stronger answer is <strong>${state.scenario.correctDefense}</strong>. ${state.scenario.explanation}`;
  $('#anotherBtn').classList.remove('hidden');tone(correct?700:190,.12,.035);
}

$('#startBtn').addEventListener('click',resetGame);$('#restartBtn').addEventListener('click',resetGame);$('#forensicsBtn').addEventListener('click',renderForensics);$('#anotherBtn').addEventListener('click',resetGame);$('#soundBtn').addEventListener('click',e=>{state.sound=!state.sound;e.currentTarget.innerHTML=`<span aria-hidden="true">${state.sound?'◖))':'◖'}</span> SOUND: ${state.sound?'ON':'OFF'}`;e.currentTarget.setAttribute('aria-pressed',String(state.sound));if(state.sound)tone(520,.05)});
