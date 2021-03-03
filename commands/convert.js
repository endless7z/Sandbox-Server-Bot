const { Bot } = require('../utils/Bot');
const { prefix } = require('../config.json');

module.exports = {
  run(message, args = []) {
    if (!args.length || args[0].length !== 4) {
      Bot.SendEmbed(message,
        ['Error', 0xFF0000, new Date(), 'endless OP', 'An Error Has Occurred'], 0
      );

      return;
    };

    const code = Bot.convert(args[0]);

    Bot.SendEmbed(message,
      ['Link', 'GOLD', new Date(), 'endless OP', code], 0
    );
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Convert', 'GOLD', new Date(), 'endless OP', 'Converts a Server ID Into a Link'],
      [
        {
          name: 'Usage',
          value: `\`${prefix}convert <ID>\``,
          inline: false
        },
        {
          name: 'Example ID',
          value: `\`b4k7\``,
          inline: false
        }
      ]
    );
  }
};