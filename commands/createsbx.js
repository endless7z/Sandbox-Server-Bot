const { Bot } = require("../utils/Bot");
const { id, prefix } = require('../config.json');
const { blacklisted } = require('../data/blacklisted.json');
const { cooldown } = require('../data/sandbox.json');

module.exports = {
  run(message, args = []) {
    if (cooldown.includes(message.author.id)) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'Cooldown is `10 minutes`'], 0
      );

      return;
    };

    if (message.channel.type !== 'dm') {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'This Command Can Only Be Ran in DMs'], 0
      );

      return;
    };

    if (!args[1]) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'Not Enough Arguments Provided'], 0
      );

      return;
    };

    const client = message.client;
    const notes = args.slice(2, args.length).join(' ') || 'None';

    const regex = new RegExp('(https:\/\/diep\.io|diep\.io)\/#.[a-z0-9]{19,24}$', 'i');
    const regions = ['la', 'miami', 'eu', 'syd', 'sg'];

    const search = (key, array, value) => {
      for (var i=0; i < array.length; i++) {
        if (array[i][key] === value) {
          return true;
        };
      };
    };

    args[1] = args[1].toLowerCase();

    if (regex.test(args[0])) {
      if (!args[0].startsWith('https://')) args[0] = 'https://' + args[0];

      if (!regions.includes(args[1])) {
        Bot.SendEmbed(message,
          ['Error', 0xFF0000, new Date(), 'endless OP', 'Invalid Region | Regions: `la, miami, eu, syd, sg`'], 0
        );
      
        return;
      };

      const embed = {
        title: 'New Sandbox',
        color: 'GOLD',
        description: `\`Region: ${args[1].toUpperCase()}\nHost: ${message.author.tag}\nNotes: ${notes}\``,
        footer: {
          text: 'endless OP'
        },
        timestamp: new Date(),
        fields: [
          { name: 'Players (0)', value: 'None', inline: false }
        ]
      };

      client.channels.cache.get(id.channel).send(`<@&${id.role}>`);
      client.channels.cache.get(id.channel).send({ embed: embed }).then(
        sandbox => {
          cooldown.push(message.author.id);

          setTimeout(() => {
            Bot.remove(cooldown, message.author.id);
          }, 600000);

          sandbox.react('✅');

          const players = [];
          const string = [];

          message.author.send({
            embed: {
              title: 'Success',
              color: 'GOLD',
              timestamp: new Date(),
              footer: {
                text: 'endless OP'
              },
              description: 'Sent to Sandbox Server'
            }
          }).catch(() => { });

          const filter = (reaction, sandbox, user) => {
            return user.bot || reaction.emoji.name !== '✅' || search('id', players, user.id) || blacklisted.includes(user.id) || reaction.message.id !== sandbox.id;
          };

          client.on('messageReactionAdd', (reaction, user) => {
            if (filter(reaction, sandbox, user)) return;

            const time = new Date().toLocaleString('en-US', {
              hour: 'numeric', minute: 'numeric', hour12: true }
            );
            
            players.push(
              { id: user.id, time: time }
            );

            embed.fields = [];
            string.length = 0;

            players.map(
              player => {
                string.push(`${client.users.cache.get(player.id).tag} - ${player.id} - ${player.time}`);
              }
            );
        
            user.send({
              embed: {
                title: 'Link',
                description: args[0],
                color: 'GOLD',
                timestamp: new Date(),
                footer: {
                  text: 'endless OP'
                }
              }
            }).catch(() => {
              Bot.remove(players, user.id);
            });

            embed.fields.splice(0, embed.fields.length, ...[
              { name: `Players (${players.length})`, value: `\`${string.join('\n')}\``, inline: false }
            ]);

            sandbox.edit({ embed: embed });
          });
        }
      );

    } else {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'Invalid Party Link'], 0
      );

      return;
    };
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Createsbx', 'GOLD', new Date(), 'endless OP', `**Creates A Sandbox**\nCommand: \`${prefix}createsbx <link> <region> <notes>\``],
      [
        {
          name: 'Regions',
          value: '`LA, Miami, EU, SYD, SG`',
          inline: false
        },
        {
          name: 'Link',
          value: 'Example: `diep.io/#2617536700A5AC1C20F5EC`',
          inline: false
        }
      ]
    );
  }
};