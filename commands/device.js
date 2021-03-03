const { Bot } = require("../utils/Bot");
const { prefix } = require('../config.json');

module.exports = {
  run(message) {
    const user = message.mentions.users.first();

    let devices = [];

    if (!user) {
      var status = message.author.presence.clientStatus;
    } else {
      var status = user.presence.clientStatus;

      if (user.bot) {
        Bot.SendEmbed(message,
          ['Device', 'GOLD', new Date(), 'endless OP', 'Web'], 0
        );

        return;
      };
    };

    if (!status) {
      Bot.SendEmbed(message,
        ['Device', 'GOLD', new Date(), 'endless OP', 'Unavailable'], 0
      );

      return;
    };

    if (status.desktop) {
        devices.push('Desktop');
    };

    if (status.web) {
        devices.push('Web');
    };

    if (status.mobile) {
        devices.push('Mobile');
    };

    devices = devices.join(', ') || 'None';

    Bot.SendEmbed(message,
      ['Device', 'GOLD', new Date(), 'endless OP', devices], 0
    );
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Device', 'GOLD', new Date(), 'endless OP', 'Gets the Device of a User'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}device <user>\``,
          inline: false
        },
        {
          name: 'Devices',
          value: '`Web, Desktop, Mobile`',
          inline: false
        }
      ]
    );
  }
};