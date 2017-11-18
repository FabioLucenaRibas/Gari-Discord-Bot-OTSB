/*
  A bot to clear/delete messages of a channel

  Usage: !gari-otsb  ==> clears all messages of
  that channel on which the command was run

*/

const HELP = '!gari-help';
const CLEAR_MESSAGES = '!gari-otsb';

const Discord = require('discord.js');
const bot = new Discord.Client();

// Token of my bot
const token = 'TOKEN HERE';

bot.on('ready', () => {
  console.log('O gari esta pronto!');
  bot.user.setStatus('Online');
  bot.user.setGame('Comando: !gari-help');
  bot.on('message', message => {
    if (message.content == CLEAR_MESSAGES) {

      // Check the following permissions before deleting messages:
      //    1. Check if the user has enough permissions
      //    2. Check if I have the permission to execute the command

      if (!message.channel.permissionsFor(message.author).has("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Desculpe, você não tenho permissão para executar o comando \""+message.content+"\"");
        console.log("Desculpe, você não tenho permissão para executar o comando \""+message.content+"\"");
        return;
      } else if (!message.channel.permissionsFor(bot.user).has("MANAGE_MESSAGES")) {
        message.channel.sendMessage("Desculpe, não tenho permissão para executar o comando \""+message.content+"\"");
        console.log("Desculpe, não tenho permissão para executar o comando \""+message.content+"\"");
        return;
      }

      // Only delete messages if the channel type is TextChannel
      // DO NOT delete messages in DM Channel or Group DM Channel
      if (message.channel.type == 'text') {
        message.channel.fetchMessages()
          .then(messages => {
            message.channel.bulkDelete(messages);
            messagesDeleted = messages.array().length; // number of messages deleted

            // Logging the number of messages deleted on both the channel and console.
            message.channel.send("Mensagens excluidas com sucesso. Total de mensagens excluidas: "+messagesDeleted);
            console.log('Mensagens excluidas com sucesso. Total de mensagens excluidas: '+messagesDeleted)
          })
          .catch(err => {
            console.log('Erro ao excluir mensagem. Se o erro persistir por favor contate o administrador');
            console.log(err);
          });
      }
    }

	if (message.content == HELP) {
		message.channel.send("* Para excluir as mensagens digite o seguinte comando: !gari-otsb");
		console.log("* Para excluir as mensagens digite o seguinte comando: !gari-otsb");
	}

  });
});


bot.login(token);
