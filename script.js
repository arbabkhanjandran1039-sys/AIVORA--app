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

// Sirf Delete word show hoga
function handleBubbleClick(el){
  let old = el.querySelector('.del-label');
  if(old){ old.remove(); return; }
  // Pehle saare dusre delete words hata do
  document.querySelectorAll('.del-label').forEach(x=>x.remove());
  
  let del = document.createElement('span');
  del.className = 'del-label';
  del.innerText = '  Delete';
  del.style.cssText = 'font-size:11px;color:#ff2d2d;font-weight:700;margin-left:8px;cursor:pointer;';
  del.onclick = (e)=>{
    e.stopPropagation();
    el.remove();
    save();
  };
  el.appendChild(del);
}

async function sendMessage(){
 let input=document.getElementById('userInput');
 let text=input.value.trim();
 if(!text) return;
 let box=getBox();
 box.insertAdjacentHTML('beforeend', `<div class="msg user" onclick="handleBubbleClick(this)">${text}</div>`);
 input.value=''; checkBar(); box.scrollTop=box.scrollHeight;
 let typingId = 'typing-'+Date.now();
 box.insertAdjacentHTML('beforeend', `<div class="msg bot" id="${typingId}"><i>AIVORA likh raha hai...</i></div>`);
 box.scrollTop=box.scrollHeight;
 try{
   let response = await fetch('https://text.pollinations.ai/'+encodeURIComponent(text));
   let aiText = await response.text();
   if(!aiText || aiText.length < 2) aiText = "Maazrat Arbab, network slow hai.";
   document.getElementById(typingId).remove();
   box.insertAdjacentHTML('beforeend', `<div class="msg bot" onclick="handleBubbleClick(this)">${aiText}</div>`);
 }catch(err){
   document.getElementById(typingId).remove();
   box.insertAdjacentHTML('beforeend', `<div class="msg bot" onclick="handleBubbleClick(this)">Assalam-o-Alaikum Arbab! Main AIVORA hun.</div>`);
 }
 box.escrollTop=box.scrollHeight;
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
function clearChat(){if(confirm('Clear all chat?')){localStorage.clear(); location.reload();}}
function exportChat(){let t=getBox().innerText; let b=new Blob([t],{type:'text/plain'}); let a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='AIVORA-Chat.txt'; a.click()}
function startVoice(){alert('Voice jald aayega!');}
function save(){try{localStorage.setItem('aivora_chat', getBox().innerHTML);}catch(e){}}

let old=localStorage.getItem('chat');
if(old && old.includes('[{"text"')){localStorage.clear();}
let saved=localStorage.getItem('aivora_chat');
if(saved && !saved.includes('[{"text"')){getBox().innerHTML=saved;}
document.getElementById('userInput')?.addEventListener('input', checkBar);