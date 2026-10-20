setTimeout(()=>{document.getElementById('splash').style.display='none'},1500);
const aboutContent = `AIVORA kya hai?
AIVORA ek smart AI Assistant App hai, jise Arbab Khan ne Lahore, Pakistan me banaya hai.

Iska maqsad aapko ChatGPT aur Meta AI ki tarah fori, sahi aur asaan malumat dena hai.

Khasusiyat:
• ChatGPT jaisa jawab, Meta AI jaisa design
• Parhai, general knowledge, life problems me madad
• Tez, mehfooz aur mobile-friendly
• 100% free, koi login nahi

Banane wala:
Arbab Khan Jandrani - Lahore

Mission:
Pakistan ka apna AI Assistant banana jo har Pakistani ki madad kare.`;

document.getElementById('aboutText').innerText = aboutContent;

function toggleMenu(e){e.stopPropagation();document.getElementById('topMenu').classList.toggle('show')}
document.addEventListener('click',()=>{document.getElementById('topMenu')?.classList.remove('show')})

function sendMessage(){
 let input=document.getElementById('userInput'); let text=input.value.trim(); if(!text)return;
 let box=document.getElementById('chat-box');
 box.innerHTML+=`<div class="msg user">${text}</div>`; input.value=''; checkBar();
 setTimeout(()=>{ box.innerHTML+=`<div class="msg bot">AIVORA: ${text} ke bare me aapko tafseel se batata hun. Ye ek ahem topic hai...</div>`; box.scrollTop=box.scrollHeight; save(); },600);
 box.scrollTop=box.scrollHeight; save();
}
function checkBar(){
 let i=document.getElementById('userInput'); let mic=document.getElementById('micBtn'); let send=document.getElementById('sendBtn');
 if(i.value.trim().length>0){mic.style.display='none'; send.style.display='flex';} else {mic.style.display='flex'; send.style.display='none';}
}
document.getElementById('userInput').addEventListener('input',checkBar);
function showAbout(){document.getElementById('aboutScreen').classList.add('show')}
function hideAbout(){document.getElementById('aboutScreen').classList.remove('show')}
function shareApp(){if(navigator.share)navigator.share({title:'AIVORA', text:'Mera AI App dekho', url:location.href});}
function clearChat(){if(confirm('Clear all chat?')){document.getElementById('chat-box').innerHTML='<div class="welcome"><h2>AIVORA</h2><p>AI ASSISTANT<br><small>Ask anything. Discover everything.</small></p></div>'; localStorage.removeItem('aivora_chat')}}
function exportChat(){let t=document.getElementById('chat-box').innerText; let b=new Blob([t],{type:'text/plain'}); let a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download='AIVORA-Chat.txt'; a.click()}
function startVoice(){alert('Voice feature jald aayega!')}
function save(){localStorage.setItem('aivora_chat',document.getElementById('chat-box').innerHTML)}
let s=localStorage.getItem('aivora_chat'); if(s)document.getElementById('chat-box').innerHTML=s;