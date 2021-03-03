const { Bot } = require('../utils/Bot');
const { prefix } = require('../config.json');
const FileSystem = require('fs');

module.exports = {
  run(message, args) {
    const cmds = [];

    if (!args.length) {
      Bot.SendEmbed(message,
        ['Help', 'GOLD', new Date(), 'endless OP'],
        [
          {
            name: '**Basic Commands**',
            value: `\
            \`${prefix}help <command>\` - Provides More Information About A Command
            \`${prefix}servers\` - Gets Available Servers
            \`${prefix}createsbx\` - Create a Sandbox
            \`${prefix}report\` - Report a User Abusing in Sandbox
            \`${prefix}convert\` - Converts a Server ID Into A Link
            \`${prefix}device\` - Gets the Device of a User\
            `,
            inline: false
          },
          {
            name: '**Admin Commands**',
            value: `\
            \`${prefix}admins\` - Shows a List of Admins
            \`${prefix}blacklisted\` - Shows a List of Blacklisted Users
            \`${prefix}blacklist\` - Prevents a User From Using the Bot
            \`${prefix}whitelist\` - Allows a Blacklisted User to Use the Bot\
            `,
            inline: false
          },
          {
            name: '**Owner Commands**',
            value: `\
            \`${prefix}admin\` - Promotes a User to Admin of the Bot
            \`${prefix}demote\` - Demotes an Admin of the Bot\
            `,
            inline: false
          }
        ]
      );

      return;
    };

    const files = FileSystem.readdirSync('./commands').filter(
      file => file.endsWith('.js')
    );

    files.forEach(
      file => {
        file = file.slice(0,-3);
        cmds.push(file);
      }
    );

    if (cmds.includes(args[0])) {
      require(`./${args[0]}`).help(message);
    };
  }
};