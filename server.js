require("dotenv").config();
const express = require("express");
const app = express();
const fetch = require("node-fetch");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const BOT_TOKEN = process.env.BOT_TOKEN;
const CHAT_ID = process.env.CHAT_ID;

app.post("/api/send", async (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ error: "Message is required" });

  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text: message,
      parse_mode: "MarkdownV2"
    })
  });

  const data = await response.json();

  if (!data.ok) {
    return res.status(500).json({ error: "Failed to send Telegram message", details: data });
  }

  res.json({ success: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
