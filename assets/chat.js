async function sendMessage() {
  const input = document.getElementById("ai-text");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  // Show bot is thinking
  const thinkingMsg = addMessage("bot", "...");
  
  try {
    const res = await fetch("https://adeala-ai-server.onrender.com/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message })
    });

    const data = await res.json();

    // Replace "..." with final message
    thinkingMsg.textContent = data.reply;

  } catch (err) {
    thinkingMsg.textContent = "Servern svarar inte just nu. Försök igen om en stund.";
  }
}
function addMessage(sender, text) {
  const box = document.getElementById("ai-messages");
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "msg-user" : "msg-bot";
  msg.textContent = text;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
  return msg; // <--- IMPORTANT
}
document.getElementById("ai-send").addEventListener("click", sendMessage);

document.getElementById("ai-text").addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});
