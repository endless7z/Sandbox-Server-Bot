const FileSystem = require('fs');
const { Color } = require('../utils/Design');

module.exports = {
  run(client, commands) {
    process.title = 'endless OP';
    Color.log('Loading Commands...');

    const files = FileSystem.readdirSync('./commands').filter(file => file.endsWith('.js'));
  
    files.forEach(
      file => {
        file = file.slice(0,-3);
  
        commands.push(file);
        Color.log(`Loaded "${file}" command`);
      }
    );
  
    setTimeout(() => {
      console.clear();
      console.log(Color.banner);

      require('../views/public/server');
      Color.log('Logged in as ' + client.user.tag);
  
      client.user.setActivity(
        { type: 'WATCHING', name: 'you' }
      );
      
      const time = client.readyAt.toLocaleString('en-US',
        { hour: 'numeric', minute: 'numeric', hour12: true }
      );

      Color.log(`Online Since: ${time}`);
    }, 2000);
  }
};
