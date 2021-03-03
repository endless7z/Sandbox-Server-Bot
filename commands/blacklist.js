const { owners } = require('../data/owners.json');
const { admins } = require('../data/admins.json');
const { blacklisted } = require('../data/blacklisted.json');
const FileSystem = require('fs');
const { Bot } = require('../utils/Bot');

module.exports = {
  run(message) {
    const user = message.mentions.users.first();

    if (admins.includes(message.author.id) || owners.includes(message.author.id)) {

      if (!user) {
        Bot.SendEmbed(message,
          ['Error', 0xFF0000, new Date(), 'endless OP', 'You Need to Mention a User'], 0
        );
  
        return;
      };
  
      if (blacklisted.includes(user.id)) {
        Bot.SendEmbed(message,
          ['Error', 0xFF0000, new Date(), 'endless OP', 'This User is Already Blacklisted'], 0
        );
  
        return;
      } else {
        blacklisted.push(user.id);
  
        FileSystem.writeFileSync('./data/blacklisted.json', JSON.stringify({ "blacklisted": blacklisted }, null, 2));
  
        Bot.SendEmbed(message,
          ['Success', 'GOLD', new Date(), 'endless OP', 'Action Performed Successfully'], 0
        );
      };
    } else {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'You Don\'t Have Permissions to Run This Command'], 0
      );

      return;
    };
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Blacklist', 'GOLD', new Date(), 'endless OP', 'Prevents a User From Using the Bot'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}blacklist <user>\``,
          inline: false
        }
      ]
    );
  }
};