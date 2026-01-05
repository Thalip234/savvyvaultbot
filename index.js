require("dotenv").config();
const express = require("express");
const { Telegraf } = require("telegraf");

const BOT_TOKEN = process.env.BOT_TOKEN;
if (!BOT_TOKEN) throw new Error("Missing BOT_TOKEN env var");

const bot = new Telegraf(BOT_TOKEN);

bot.start((ctx) => ctx.reply("✅ Bot is running!"));
bot.command("ping", (ctx) => ctx.reply("pong 🏓"));

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SECRET_PATH = process.env.SECRET_PATH || "mysecretpath";

app.use(`/telegraf/${SECRET_PATH}`, bot.webhookCallback(`/telegraf/${SECRET_PATH}`));
app.get("/", (req, res) => res.send("OK"));

app.listen(PORT, () => console.log(`Server listening on ${PORT}`));
