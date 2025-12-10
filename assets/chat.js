async function sendMessage() {
  const input = document.getElementById("ai-text");
  const message = input.value.trim();
  if (!message) return;

  addMessage("user", message);
  input.value = "";

  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  });

  const data = await res.json();
  addMessage("bot", data.reply);
}

function addMessage(sender, text) {
  const box = document.getElementById("ai-messages");
  const msg = document.createElement("div");
  msg.className = sender === "user" ? "msg-user" : "msg-bot";
  msg.textContent = text;
  box.appendChild(msg);
  box.scrollTop = box.scrollHeight;
}
