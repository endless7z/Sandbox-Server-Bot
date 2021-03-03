const { admins } = require('../data/admins.json');
const { blacklisted } = require('../data/blacklisted.json');
const { owners } = require('../data/owners.json');
const { Bot } = require('../utils/Bot');

module.exports = {
  run(message) {
    function getUser(user) {
      try {
        return message.client.users.cache.get(user).tag
      } catch(e) {
        return 'Unknown';
      };
    };

    var number = 0;

    if (admins.includes(message.author.id) || owners.includes(message.author.id)) {
      const string = [];

      blacklisted.map(
        user => {
          string.push(`${getUser(user)} - ${user}`);
          number += 1;
        }
      );

      Bot.SendEmbed(message,
        [`Blacklisted (${number})`, 'GOLD', new Date(), 'endless OP', string.join('\n') || 'None'], 0
      );

      return;
    } else {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'You Don\'t Have Permissions to Run This Command'], 0
      );

      return;
    };
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Blacklisted', 'GOLD', new Date(), 'endless OP', 'Sends a List of Blacklisted Users'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}blacklisted\``,
          inline: false
        }
      ]
    );
  }
};
