import express from "express";
import { readFile } from "fs/promises";
import OpenAI from "openai";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.join(__dirname, "../data/plans.json");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// ✅ Add global conversation memory
let conversationHistory = [
  {
    role: "system",
    content: "Du är Adealas AI-assistent. Du har bra konversationsförmåga, ställer följdfrågor, och hjälper användaren att välja rätt mobilabonnemang."
  }
];

router.post("/", async (req, res) => {
  const { message } = req.body;
  if (!message?.trim()) {
    return res.json({ reply: "Jag hörde dig inte — kan du skriva igen?" });
  }

  try {
    const plans = JSON.parse(await readFile(dataPath, "utf-8"));
    const context = plans
      .map(p => `• ${p.operator}: ${p.title} — ${p.price || p.prices?.[0]} kr/mån`)
      .join("\n");

    // Add user message to conversation history
    conversationHistory.push({ role: "user", content: message });

    const completion = await openai.chat.completions.create({
      model: "gpt-5", // ← use GPT-5
      messages: [
        {
          role: "system",
          content:
            `Du är Adealas AI-assistent. Här är alla abonnemang:\n${context}\n\n` +
            `Svara vänligt, kortfattat och ställ gärna följdfrågor för att hjälpa kunden.`
        },
        ...conversationHistory
      ]
    });

    const reply = completion.choices?.[0]?.message?.content || "Jag förstod inte riktigt 😅";

    // Save the AI reply in conversation memory
    conversationHistory.push({ role: "assistant", content: reply });

    return res.json({ reply });

  } catch (err) {
    console.error("❌ Chat backend error:", err);
    return res.status(500).json({ reply: "Tekniskt fel 😭" });
  }
});

export default router;
