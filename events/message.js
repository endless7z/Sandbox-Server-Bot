module.exports = {
  run(message) {
    if (message.content.includes('diep.io/#') && message.channel.type !== 'dm') {
      return message.delete();
    };
  }
};