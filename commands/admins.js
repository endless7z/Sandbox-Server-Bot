const { admins } = require('../data/admins.json');
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

      admins.map(
        admin => {
          string.push(`${getUser(admin)} - ${admin}`);
          number += 1;
        }
      );

      Bot.SendEmbed(message,
        [`Admins (${number})`, 'GOLD', new Date(), 'endless OP', string.join('\n') || 'None'], 0
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
      ['Admins', 'GOLD', new Date(), 'endless OP', 'Sends a List of Admins.'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}admins\``,
          inline: false
        }
      ]
    );
  }
};
