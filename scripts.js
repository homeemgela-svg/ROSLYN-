// Background Theme Changer

const bgColor = document.getElementById("bgColor");

bgColor.addEventListener("input", () => {
document.body.style.background = bgColor.value;
});

// Recording Feature

let mediaRecorder;
let audioChunks = [];

const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const audioPlayback = document.getElementById("audioPlayback");

startBtn.addEventListener("click", async () => {

const stream =
await navigator.mediaDevices.getUserMedia({ audio:true });

mediaRecorder =
new MediaRecorder(stream);

mediaRecorder.start();

audioChunks = [];

mediaRecorder.addEventListener("dataavailable", event => {
audioChunks.push(event.data);
});

});

stopBtn.addEventListener("click", () => {

mediaRecorder.stop();

mediaRecorder.addEventListener("stop", () => {

const audioBlob =
new Blob(audioChunks);

const audioUrl =
URL.createObjectURL(audioBlob);

audioPlayback.src = audioUrl;

});
});

// Daily Reminder

const reminderBtn =
document.getElementById("setReminder");

reminderBtn.addEventListener("click", () => {

if(Notification.permission !== "granted"){

Notification.requestPermission();

}

setInterval(() => {

new Notification(
"🎵 ROSLYN Reminder",
{
body:
"Don't forget today's practice and upload your music!"
}
);

}, 86400000);

alert("Daily reminder enabled!");

});

// AI Chat Assistant

const chatBox =
document.getElementById("chatBox");

const userInput =
document.getElementById("userInput");

const sendBtn =
document.getElementById("sendBtn");

const encouragements = [

"You're doing amazing! Keep practicing.",
"Every great artist started somewhere.",
"Your consistency will make you outstanding.",
"Believe in your sound and keep creating.",
"Your next recording could be your breakthrough."

];

const soundSuggestions = [

"Soft Piano",
"Afrobeat Drums",
"Guitar Chords",
"Choir Background",
"Synth Pad",
"Acoustic Strings",
"Bass Groove"

];

function addMessage(text, sender){

const div = document.createElement("div");

div.classList.add(sender);

div.innerText = text;

chatBox.appendChild(div);

chatBox.scrollTop = chatBox.scrollHeight;

}

sendBtn.addEventListener("click", () => {

const message = userInput.value;

if(message === "") return;

addMessage(message, "user");

let response =
"🎵 ROSLYN: " +
encouragements[
Math.floor(Math.random() *
encouragements.length)
];

response +=
"\n\nRecommended Sound: " +
soundSuggestions[
Math.floor(Math.random() *
soundSuggestions.length)
];

setTimeout(() => {

addMessage(response, "bot");

}, 800);

userInput.value = "";

});

// Voice Command Recording

const SpeechRecognition =
window.SpeechRecognition ||
window.webkitSpeechRecognition;

if(SpeechRecognition){

const recognition =
new SpeechRecognition();

recognition.continuous = true;

recognition.start();

recognition.onresult = async function(event){

const transcript =
event.results[event.results.length - 1][0]
.transcript
.toLowerCase();

if(transcript.includes("start recording")){

startBtn.click();

}

if(transcript.includes("stop recording")){

stopBtn.click();

}

};

}