const { BotError } = require('./errors/BotError');

class Bot {
  static SendEmbed(message, settings = [
    'Title', 'Color', 'Timestamp', 'Footer', 'Description'
  ], fields = [
    {
      name: undefined,
      value: undefined,
      inline: false
    }
  ]) {

    const embed = {
      title: settings[0],
      color: settings[1],
      timestamp: settings[2],

      footer: {
        text: settings[3]
      },

      description: settings[4],
      fields: fields
    };

    if (!settings[4]) {
      delete embed.description;
    };

    if (!settings[0]) {
      delete embed.title;
    };

    if (!settings.length) {
      throw new BotError('No Embed Values Detected');
    };

    if (fields == 0) delete embed.fields;

    message.channel.send({
      embed: embed
    }).catch(() => {});
  };

  static hex(string = '') {
    var result = '';
    for (var i = 0; i < string.length; i++) {
      result += string.charCodeAt(i).toString(16);
    };

    return result;
  };

  static convert(string = '') {
    const converted = [];
    const array = string.split('');

    function reverse(s) {
      return s.split('').reverse().join('');
    };

    array.map((i) => {
      converted.push(reverse(this.hex(i)))
    });

    return 'https://diep.io/#' + converted.join('');
  };

  static remove(a = [], item) {
    const index = a.indexOf(item);

    if (index > -1) {
      a.splice(index, 1);
    };
  };

  static cut(a = []) {
    return a.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
  };
};

module.exports.Bot = Bot;
