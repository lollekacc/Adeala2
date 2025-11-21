// ===============================
// FETCH PLANS LOGIC
// ===============================
async function fetchPlans(userInput) {
  try {
    const response = await fetch('/api/search', {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userInput)
    });

    const result = await response.json();
    console.log("Backend response:", result);

    const output = document.getElementById("result");
    if (output) {
      output.innerHTML = JSON.stringify(result, null, 2);
    }

    return result;

  } catch (err) {
    console.error("Error fetching plans:", err);
  }
}

// ===============================
// AI CHAT FRONTEND LOGIC
// ===============================

document.addEventListener("DOMContentLoaded", () => {

  const sendBtn = document.getElementById("chatSend");
  const input = document.getElementById("freeSearch");
  const chatBody = document.getElementById("chatBody");

  if (!sendBtn || !input || !chatBody) {
    console.warn("⚠️ Chat elements not found on this page.");
    return;
  }

  function addMessage(text, type) {
    const msg = document.createElement("div");
    msg.className = `${type}-message`;
    msg.innerHTML = `<p>${text}</p>`;
    chatBody.appendChild(msg);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  async function sendMessage() {
    const message = input.value.trim();
    if (!message) return;

    addMessage(message, "user");
    input.value = "";

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
      });

      const data = await res.json();
      addMessage(data.reply, "bot");
    } catch (err) {
      console.error("Chat error:", err);
      addMessage("Oj! Något gick fel 😭", "bot");
    }
  }

  sendBtn.addEventListener("click", sendMessage);

  input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });

});
