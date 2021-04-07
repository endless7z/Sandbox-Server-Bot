const { Client } = require('discord.js');
const { token, prefix } = require('./config.json');
const { Bot } = require('./utils/Bot');

const { blacklisted } = require('./data/blacklisted.json');
const { Color } = require('./utils/Design');

const client = new Client({
  ws: {
    properties: {
      $browser: 'Discord iOS'
    }
  }
});

const commands = [];

client.on('ready', () => {
  console.log(Color.banner);
  require('./events/ready').run(client, commands);
});

client.on('message', (message) => {
  require('./events/message').run(message);

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (blacklisted.includes(message.author.id)) {
    Bot.SendEmbed(message,
      ['Error', 0xFF0000, new Date(), 'endless OP', 'You Have Been Blacklisted'], 0
    );

    return;
  };

  if (commands.includes(command)) {
    require(`./commands/${command}`).run(message, args);
  } else {
    Bot.SendEmbed(message,
      ['Help', 'GOLD', new Date(), 'endless OP', `Try \`${prefix}help\` for more information.`], 0
    );
  };
});

client.on('messageUpdate', (OldMessage, NewMessage) => {
  require('./events/message').run(NewMessage);
});

client.login(token).catch(() => {
  Color.log('Invalid Token');

  setTimeout(() => {
    client.destroy();
    process.exit(1);
  }, 1000);
});
