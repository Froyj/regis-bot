/**
 * A ping pong bot, whenever you send "ping", it replies "pong".
 */

// Import the discord.js module
const { Client, Attachment } = require('discord.js');
const moderate = require('./moderate')


// Create an instance of a Discord client
const client = new Client();
const fetch = require('node-fetch');


// async function getPlayerStats(battleTag) {
//   const response = await fetch(`http://owapi.net/api/v3/u/${battleTag}/stats`);
//   const stats = await response.json();
//   return stats;
// }

async function getPlayerStats(battleTag) {
  // GET a list of book IDs of the current user
  return await fetch(`http://owapi.net/api/v3/u/${battleTag}/stats`)
    .then(res => console.log(res))
    .catch(err => {
      return 'y\'a pas de donnée, ce gars la doit être mauvais';
    })
}

function sendStats(battleTag) {
  getPlayerStats(battleTag)
    .then(res => message.channel.send(res))
}


/**
 * The ready event is vital, it means that only _after_ this will your bot start reacting to information
 * received from Discord
 */
client.on('ready', () => {
  console.log('I am ready!');
});

// Create an event listener for messages
client.on('message', message => {
  // If the message is "ping"
  if (message.content === 'ping') {
    // Send "pong" to the same channel
    message.channel.send('pong');
  }
  if (message.content === '!rip') {
    // Create the attachment using Attachment
    const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
    // Send the attachment in the message channel
    message.channel.send(attachment);
  }
  if (message.content.startsWith === '!bully') {
    moderate.bully(message);
  }
  const msgArr = message.content.split(' ')
  const cmd = msgArr[0]
  const battleTag = msgArr[1]
  if (cmd === '!stats' && battleTag) {
    sendStats(battleTag)
  } else {
    message.channel.send("On comprend rien à ce que tu dis! (!stats BattleTag-23415)");
  }
});

// Log our bot in using the token from https://discordapp.com/developers/applications/me
client.login('');

connection()