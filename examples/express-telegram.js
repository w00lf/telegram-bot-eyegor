// Does not work on aws - async calbacks
const serverless = require('serverless-http');
const express = require('express');
const TOKEN = process.env.TELEGRAM_TOKEN;
const url = process.env.PUBLIC_URL;
const TelegramBot = require('node-telegram-bot-api');
const bodyParser = require('body-parser');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN);

// This informs the Telegram servers of the new webhook.
console.log(`${url}/bot${TOKEN}`);
bot.setWebHook(`${url}/bot${TOKEN}`).then((res) => console.log('setted hook'));

const app = express();
// parse the updates to JSON
app.use(bodyParser.json());

// We are receiving updates at the route below!
app.post(`/bot${TOKEN}`, (req, res) => {
  console.log('Recived the message');
  console.log(req.body);
  // bot.processUpdate(req.body);
  // bot.sendMessage(req.body.message.chat.id, 'I am alive!').then((res) => console.log(res));
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get(`/`, (_req, res) => {
  res.send('Hello World!');
});

// Just to ping!
bot.on('message', msg => {
  console.log('response');
  console.log(msg);
  console.log(msg.chat.id);
  bot.sendMessage(msg.chat.id, 'I am alive!').then((res) => console.log('received response!'));
});

module.exports.main = serverless(app);