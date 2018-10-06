'use strict';

const TOKEN = process.env.TELEGRAM_TOKEN;
const url = process.env.PUBLIC_URL;
const TelegramBot = require('node-telegram-bot-api');

// No need to pass any parameters as we will handle the updates with Express
const bot = new TelegramBot(TOKEN, { polling: false });

// This informs the Telegram servers of the new webhook.
console.log(`${url}/bot${TOKEN}`);
// bot.setWebHook(`${url}/bot${TOKEN}`).then((res) => console.log('setted hook'));
module.exports.hook = function (event, context) {
  console.log(TOKEN);
  console.log(url);
  // parse the chat ID so we can respond
  var chatId = JSON.parse(event.body).message.chat.id;

  // let them know we're working
  bot.sendMessage(chatId, 'Received your message').then((e) => {
    console.log(e);
    console.log('Succesfuly sended message');
    context.succeed({
      "statusCode": 200
    });
  });
};

module.exports.init = function (_event, context) {
  console.log(TOKEN);
  console.log(url);
  bot.setWebHook(`${url}/hook`).then((res) => {
    console.log(res);
    console.log('setted hook');
    context.succeed({
      "statusCode": 200
    });
  });
};