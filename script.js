setTimeout(()=>{document.getElementById('splash').style.display='none'},1500);
function toggleMenu(e){e.stopPropagation();document.getElementById('topMenu').classList.toggle('show')}
document.addEventListener('click',()=>{let m=document.getElementById('topMenu'); if(m) m.classList.remove('show')})
function sendMessage(){
 let i=document.getElementById('userInput'); let t=i.value.trim(); if(!t)return;
 let b=document.getElementById('chat-box'); 
 b.innerHTML+=`<div class="msg user">${t}</div>`; i.value='';
 setTimeout(()=>{b.innerHTML+=`<div class="msg bot">Samajh gaya Arbab: "${t}". Main AIVORA hun, aapki madad ke liye!</div>`; b.scrollTop=b.scrollHeight; localStorage.setItem('chat',b.innerHTML)},500);
 b.scrollTop=b.scrollHeight; localStorage.setItem('chat',b.innerHTML);
}
function showAbout(){document.getElementById('aboutScreen').classList.add('show')}
function hideAbout(){document.getElementById('aboutScreen').classList.remove('show')}
function shareApp(){if(navigator.share)navigator.share({title:'AIVORA',url:location.href})}
function clearChat(){if(confirm('Clear chat?')){document.getElementById('chat-box').innerHTML='<div class="welcome"><h2>AIVORA</h2><p>AI ASSISTANT<br><small>Ask anything. Discover everything.</small></p></div>'; localStorage.removeItem('chat')}}
function exportChat(){let t=document.getElementById('chat-box').innerText; let blob=new Blob([t],{type:'text/plain'}); let a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='AIVORA.txt'; a.click()}
let saved=localStorage.getItem('chat'); if(saved)document.getElementById('chat-box').innerHTML=saved;
