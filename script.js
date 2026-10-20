// Splash hide
setTimeout(()=>{document.getElementById('splash').style.display='none'},1200);

// About - Final with Khan Jandrani
const aboutContent = `AIVORA - Advanced AI Assistant

Developed by: Arbab Khan Jandran - Lahore, Pakistan

What is AIVORA?
AIVORA is an advanced AI Assistant, built like ChatGPT and Meta AI to give you fast, accurate and easy answers.

Features:
✓ ChatGPT-style human-like answers
✓ Meta AI-style clean design
✓ Help in studies, general knowledge & daily life
✓ Fast, Secure, Mobile-friendly & Lightweight
✓ 100% Free, No login required
✓ Chat history saved

Created by: Arbab Khan Jandran

Mission:
To build Pakistan's own AI Assistant that helps every Pakistani.`;
try{document.getElementById('aboutText').innerText = aboutContent;}catch(e){}

function toggleMenu(e){e.stopPropagation();document.getElementById('topMenu').classList.toggle('show')}
document.addEventListener('click',()=>{document.getElementById('topMenu')?.classList.remove('show')})

function getBox(){return document.getElementById('chat-box');}

function sendMessage(){
 let input=document.getElementById('userInput');
 let text=input.value.trim();
 if(!text) return;
 let box=getBox();
 // User message - natural bubble
 box.insertAdjacentHTML('beforeend', `<div class="msg user">${text}</div>`);
 input.value='';
 checkBar();
 box.scrollTop = box.scrollHeight;

 // Bot reply - natural, not code
 setTimeout(()=>{
   let reply = `Samajh gaya Arbab! Aapne kaha: "${text}". Main AIVORA hun, is bare me aapko mukamal tafseel se batata hun...`;
   box.insertAdjacentHTML('beforeend', `<div class="msg bot">${reply}</div>`);
   box.scrollTop = box.scrollHeight;
   save();
 },600);
 save();
}

function checkBar(){
 let i=document.getElementById('userInput'); 
 let mic=document.getElementById('micBtn'); 
 let send=document.getElementById('sendBtn');
 if(!i) return;
 if(i.value.trim().length>0){mic.style.display='none'; send.style.display='flex';}
 else {mic.style.display='flex'; send.style.display='none';}
}

function showAbout(){document.getElementById('aboutScreen').classList.add('show')}
function hideAbout(){document.getElementById('aboutScreen').classList.remove('show')}
function shareApp(){if(navigator.share){navigator.share({title:'AIVORA', url:location.href})}}
function clearChat(){
 if(confirm('Clear chat?')){
   localStorage.removeItem('aivora_chat');
   localStorage.removeItem('chat');
   location.reload();
 }
}
function exportChat(){let t=getBox().innerText; let b=new Blob([t],{type:'text/plain'}); let a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='AIVORA-Chat.txt'; a.click()}
function startVoice(){alert('Voice feature jald aayega!');}
function save(){
 try{localStorage.setItem('aivora_chat', getBox().innerHTML);}catch(e){}
}

// IMPORTANT: Purana corrupted cache delete
let old = localStorage.getItem('chat');
if(old && old.includes('[{"text"')){ localStorage.removeItem('chat'); localStorage.removeItem('aivora_chat'); }

let saved = localStorage.getItem('aivora_chat');
if(saved && !saved.includes('[{"text"')){
  getBox().innerHTML = saved;
}

// Enter se send
document.getElementById('userInput')?.addEventListener('input', checkBar);
document.getElementById('userInput')?.addEventListener('keypress', (e)=>{ if(e.key==='Enter') sendMessage(); });