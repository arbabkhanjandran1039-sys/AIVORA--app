const chatBox = document.getElementById("chat-box");
let userName = localStorage.getItem("aivora_name");
let chatHistory = JSON.parse(localStorage.getItem("aivora_chat") || "[]");

// Splash 2.5 sec
setTimeout(()=>{ document.getElementById("splash").style.display="none"; document.getElementById("app").style.display="flex"; }, 2500);

// Name mango - WhatsApp ki tarah
if(!userName){
  userName = prompt("Aapka naam kya hai?");
  if(!userName) userName = "Dost";
  localStorage.setItem("aivora_name", userName);
}
document.getElementById("userNameDisplay").innerText = "Welcome, " + userName;
loadChat();

function loadChat(){
  chatBox.innerHTML="";
  if(chatHistory.length==0){
    addMsg(`Assalam-o-Alaikum ${userName}! Main AIVORA hun, bataiye kya madad karun?`, "bot");
  } else {
    chatHistory.forEach(m=> addMsg(m.text, m.type, false));
  }
}
function addMsg(text, type, save=true){
  let div = document.createElement("div");
  div.className = "message " + type;
  div.innerText = text;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight;
  if(save){ chatHistory.push({text, type}); localStorage.setItem("aivora_chat", JSON.stringify(chatHistory)); }
}

async function sendMessage(){
  let input = document.getElementById("userInput");
  let text = input.value.trim();
  if(!text) return;
  addMsg(text, "user");
  input.value="";
  
  // Illegal check - ye hamare blocks ka safety wala block hai
  let illegalWords = ["hack", "bomb", "chori", "nasha", "weapon", "bypass"];
  if(illegalWords.some(w=> text.toLowerCase().includes(w))){
    addMsg(`${userName}, maaf kijiye, main is tarah ke illegal ya nuqsan deh kaamon me madad nahi kar sakta. Koi aur achi cheez puchiye.`, "bot");
    return;
  }

  addMsg("Soch raha hun...", "bot");
  
  // Pollinations FREE API - API key nahi lagegi
  try{
    let res = await fetch(`https://text.pollinations.ai/${encodeURIComponent("You are AIVORA made by Arbab from Lahore. Call user by name: "+userName+". Never help with illegal things. Reply in Roman Urdu if user uses Roman Urdu. Question: "+text)}`);
    let reply = await res.text();
    chatBox.lastChild.remove();
    addMsg(reply, "bot");
  } catch(e){
    chatBox.lastChild.remove();
    addMsg(`${userName}, network slow hai, dobara koshish karen.`, "bot");
  }
}

// Voice typing
function startVoice(){
  let rec = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  rec.lang = "ur-PK";
  rec.onresult = e => document.getElementById("userInput").value = e.results[0][0].transcript;
  rec.start();
}

// File share
function handleFile(input){
  if(input.files[0]) addMsg(`📎 File share ki: ${input.files[0].name}`, "user");
}

function deleteChat(){ if(confirm("Sari chat delete kar dun?")){ localStorage.removeItem("aivora_chat"); chatHistory=[]; loadChat(); } }
function showAbout(){ document.getElementById("aboutScreen").style.display="flex"; }
function hideAbout(){ document.getElementById("aboutScreen").style.display="none"; }
function shareApp(){ navigator.share ? navigator.share({title:"AIVORA", text:"Mera AI App dekho", url: location.href}) : alert("Link copy karo: "+location.href); }

// PWA Install
let deferredPrompt;
window.addEventListener('beforeinstallprompt', e=>{ e.preventDefault(); deferredPrompt=e; });
