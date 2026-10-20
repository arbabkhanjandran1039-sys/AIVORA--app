setTimeout(()=>{document.getElementById('splash').style.display='none'},1200);
const aboutContent = `AIVORA - Advanced AI Assistant
Developed by: Arbab Khan Jandran - Lahore, Pakistan
What is AIVORA? AIVORA is an advanced AI Assistant like ChatGPT and Meta AI.
Features: Human-like answers, Clean design, Fast, Secure, Free
Created by: Arbab Khan Jandran
Mission: Pakistan's own AI Assistant.`;
try{document.getElementById('aboutText').innerText=aboutContent;}catch(e){}

function toggleMenu(e){e.stopPropagation();document.getElementById('topMenu').classList.toggle('show')}
document.addEventListener('click',()=>{document.getElementById('topMenu')?.classList.remove('show')})
function getBox(){return document.getElementById('chat-box');}

async function sendMessage(){
 let input=document.getElementById('userInput');
 let text=input.value.trim();
 if(!text) return;
 let box=getBox();
 box.insertAdjacentHTML('beforeend', `<div class="msg user">${text}</div>`);
 input.value=''; checkBar(); box.scrollTop=box.scrollHeight;

 // Typing animation
 let typingId = 'typing-'+Date.now();
 box.insertAdjacentHTML('beforeend', `<div class="msg bot" id="${typingId}"><i>AIVORA likh raha hai...</i></div>`);
 box.scrollTop=box.scrollHeight;

 try{
   // FREE AI API - Real natural answer
   let response = await fetch('https://text.pollinations.ai/'+encodeURIComponent(text), {
     method: 'GET'
   });
   let aiText = await response.text();
   if(!aiText || aiText.length < 2) aiText = "Maazrat Arbab, thoda network slow hai, dobara puchiye.";
   
   document.getElementById(typingId).remove();
   // Natural chat format
   box.insertAdjacentHTML('beforeend', `<div class="msg bot">${aiText}</div>`);
 }catch(err){
   document.getElementById(typingId).remove();
   box.insertAdjacentHTML('beforeend', `<div class="msg bot">Assalam-o-Alaikum Arbab! Main AIVORA hun. Aapne "${text}" pucha. Main aapki madad ke liye hazir hun, is bare me detail se batata hun...</div>`);
 }
 box.scrollTop=box.scrollHeight;
 save();
}

function checkBar(){
 let i=document.getElementById('userInput'); let m=document.getElementById('micBtn'); let s=document.getElementById('sendBtn');
 if(!i) return;
 if(i.value.trim().length>0){m.style.display='none'; s.style.display='flex';}
 else {m.style.display='flex'; s.style.display='none';}
}
function showAbout(){document.getElementById('aboutScreen').classList.add('show')}
function hideAbout(){document.getElementById('aboutScreen').classList.remove('show')}
function shareApp(){if(navigator.share)navigator.share({title:'AIVORA', url:location.href})}
function clearChat(){if(confirm('Clear chat?')){localStorage.clear(); location.reload();}}
function exportChat(){let t=getBox().innerText; let b=new Blob([t],{type:'text/plain'}); let a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='AIVORA-Chat.txt'; a.click()}
function startVoice(){alert('Voice jald aayega!');}
function save(){try{localStorage.setItem('aivora_chat', getBox().innerHTML);}catch(e){}}

let old=localStorage.getItem('chat');
if(old && old.includes('[{"text"')){localStorage.clear();}
let saved=localStorage.getItem('aivora_chat');
if(saved && !saved.includes('[{"text"')){getBox().innerHTML=saved;}

document.getElementById('userInput')?.addEventListener('input', checkBar);