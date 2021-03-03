const { Bot } = require("../utils/Bot");
const { prefix } = require('../config.json');
const { owners } = require('../data/owners.json');
const { cooldown } = require('../data/report.json');

module.exports = {
  run(message, args = []) {
    const client = message.client;

    const user = message.mentions.users.first();
    const reason = args.slice(1, args.length).join(' ');

    if (cooldown.includes(message.author.id)) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'Cooldown is `1 hour`.'], 0
      );

      return;
    };

    if (!user) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'You Need to Mention a User'], 0
      );

      return;
    };

    if (!args.length || !reason.length) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'No Arguements Have Been Provided'], 0
      );

      return;
    };

    const embed = {
      title: 'Report',
      description: `**Submitted By: ${message.author.tag}**`,
      color: 'GOLD',
      fields: [
        {
          name: `\`${user.tag}\``, 
          value: `\`${reason}\``,
          inline: false
        }
      ]
    };

    owners.map(
      owner => {
        client.users.fetch(owner).then(
          user => user.send({ embed: embed }).catch(() => { })
        );
      }
    );

    cooldown.push(message.author.id);

    setTimeout(() => {
      Bot.remove(cooldown, message.author.id);
    }, 3600000);
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Report', 'GOLD', new Date(), 'endless OP', 'Report Someone Abusing in Sandbox'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}report <user-id> <reason>\``,
          inline: false
        },
        {
          name: 'Reasons',
          value: 'Valid Reasons Include:\n`Pressing O, Targeting, Scripting, Not Being Level 45`',
          inline: false
        }
      ]
    );
  }
};