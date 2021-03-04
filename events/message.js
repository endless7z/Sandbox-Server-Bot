const { id } = require('../config.json');

module.exports = {
  run(message) {
    if (message.content.includes('diep.io/#') && message.channel.type !== 'dm') {
      return message.delete();
    };

    if (message.channel.id == id.channel[1]) {
      message.react('✅').then(
        ({ message }) => {
          message.react('❌');
        }
      ).catch(
        () => { }
      );

      return;
    };
  }
};
