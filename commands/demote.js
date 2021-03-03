const { owners } = require('../data/owners.json');
const { admins } = require('../data/admins.json');
const FileSystem = require('fs');
const { Bot } = require('../utils/Bot');

module.exports = {
  run(message) {
    const user = message.mentions.users.first();

    if (!owners.includes(message.author.id)) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'You Don\'t Have Permissions to Run This Command'], 0
      );

      return;
    };

    if (!user) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'You Need to Mention a User'], 0
      );

      return;
    };

    if (!admins.includes(user.id)) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'This User Not An Admin'], 0
      );

      return;
    } else {
      Bot.remove(admins, user.id);

      FileSystem.writeFileSync('./data/admins.json', JSON.stringify({ "admins": admins }, null, 2));

      Bot.SendEmbed(message,
        ['Success', 'GOLD', new Date(), 'endless OP', 'Action Performed Successfully'], 0
      );
    };
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Demote', 'GOLD', new Date(), 'endless OP', 'Demotes an Admin of the Bot'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}demote <user>\``,
          inline: false
        }
      ]
    );
  }
};