require("dotenv").config();

const express = require("express");
const { Telegraf } = require("telegraf");

const app = express();
app.use(express.json());

// Always respond for health check
app.get("/", (req, res) => res.status(200).send("OK"));

// Read env
const BOT_TOKEN = process.env.BOT_TOKEN;
const SECRET_PATH = process.env.SECRET_PATH;

if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN env var");
if (!SECRET_PATH) throw new Error("Missing SECRET_PATH env var");

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply("✅ SavvyVault bot is live!"));
bot.command("ping", (ctx) => ctx.reply("pong 🏓"));

// ✅ Probe route so we can prove the path exists in browser
app.get(`/telegraf/${SECRET_PATH}`, (req, res) => {
  res.status(200).send("Webhook endpoint exists ✅ (GET)");
});

// ✅ Correct Telegraf webhook handler (POST)
app.post(`/telegraf/${SECRET_PATH}`, bot.webhookCallback(`/telegraf/${SECRET_PATH}`));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
