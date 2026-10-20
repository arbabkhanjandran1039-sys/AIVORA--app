let selectedBubble=null;
let chatHistory=[];
window.onload=()=>{setTimeout(()=>{document.getElementById('splash').style.display='none'},1200); loadChat(); checkInput();}

function toggleTopMenu(){document.getElementById('topMenu').classList.toggle('show')}
document.addEventListener('click',e=>{if(!e.target.closest('.right'))document.getElementById('topMenu')?.classList.remove('show')})

function sendMessage(){
  let input=document.getElementById('userInput'); let text=input.value.trim(); if(!text)return;
  addMsg(text,'user'); input.value=''; checkInput();
  setTimeout(()=>{ let reply = getAIReply(text); addMsg(reply,'bot'); },800);
}
function addMsg(text,type){
  let box=document.getElementById('chat-box'); let div=document.createElement('div'); div.className='msg '+type;
  div.innerHTML=`<div class="txt">${text}</div>${type==='bot'?`<div class="msg-actions"><button onclick="copyText(this)">📋</button><button onclick="shareText(this)">↗️</button><button onclick="like(this)">👍</button><button onclick="dislike(this)">👎</button></div>`:''}`;
  div.onclick=()=>{selectedBubble=div; document.getElementById('bubbleMenu').classList.add('show')}
  box.appendChild(div); box.scrollTop=box.scrollHeight; saveChat();
}
function getAIReply(q){
  q=q.toLowerCase();
  if(q.includes('salam'))return "Walaikum Salam Arbab! 😊 Kya haal hai?";
  if(q.includes('kaun'))return "Main AIVORA hun, Arbab ne mujhe Lahore me banaya hai. Main ChatGPT aur Meta AI ki tarah kaam karta hun.";
  return "Samajh gaya Arbab! Aapne poocha: '"+q+"'. Main is par tafseel se jawab de raha hun, jaise ChatGPT deta hai. Aap mazeed sawal pooch sakte hain.";
}
function copyText(btn){navigator.clipboard.writeText(btn.closest('.msg').querySelector('.txt').innerText); btn.innerText='✅'}
function shareText(btn){if(navigator.share)navigator.share({text:btn.closest('.msg').querySelector('.txt').innerText})}
function like(b){b.innerText='❤️';} function dislike(b){b.innerText='👎'}
function showBubbleMenu(el){selectedBubble=el; document.getElementById('bubbleMenu').classList.add('show')}
function hideBubbleMenu(){document.getElementById('bubbleMenu').classList.remove('show')}
function deleteBubble(){if(selectedBubble)selectedBubble.remove(); hideBubbleMenu(); saveChat();}
function copyBubble(){if(selectedBubble)navigator.clipboard.writeText(selectedBubble.innerText); hideBubbleMenu();}
function clearChat(){if(confirm('Clear all chat?')){document.getElementById('chat-box').innerHTML=''; localStorage.removeItem('aivora'); hideBubbleMenu(); toggleTopMenu();}}
function exportChat(){let t=document.getElementById('chat-box').innerText; let blob=new Blob([t],{type:'text/plain'}); let a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download='AIVORA-chat.txt'; a.click(); toggleTopMenu();}
function shareApp(){if(navigator.share)navigator.share({title:'AIVORA',url:location.href}); toggleTopMenu();}
function showAbout(){document.getElementById('aboutScreen').classList.add('show'); toggleTopMenu();}
function hideAbout(){document.getElementById('aboutScreen').classList.remove('show')}
function viewContact(){alert('AIVORA by Arbab - Lahore'); toggleTopMenu();}
function searchChat(){let s=prompt('Search in chat:'); if(!s)return; let msgs=document.querySelectorAll('.txt'); msgs.forEach(m=>{if(m.innerText.includes(s))m.parentElement.style.background='yellow'})}
function showMedia(){alert('Media, Links, Docs - Coming soon'); toggleTopMenu();}
function muteNoti(){alert('Notifications Muted'); toggleTopMenu();}
function addShortcut(){alert('Shortcut Added!'); toggleTopMenu();}
function startVoice(){alert('Voice - Mic permission needed');}
function saveChat(){localStorage.setItem('aivora',document.getElementById('chat-box').innerHTML)}
function loadChat(){let d=localStorage.getItem('aivora'); if(d)document.getElementById('chat-box').innerHTML=d;}
function checkInput(){let i=document.getElementById('userInput'); let mic=document.getElementById('micBtn'); let send=document.getElementById('sendBtn'); i.addEventListener('input',()=>{if(i.value.trim()){mic.style.display='none'; send.style.display='flex'}else{mic.style.display='flex'; send.style.display='none'}})}
