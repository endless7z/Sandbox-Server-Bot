const express = require('express');
const port = require('../../config.json').port || 3000;

const { Color } = require('../../utils/Design');
const server = express();

server.use(express.static(__dirname + '/../'));

server.get('/endless', (req, res) => {
  res.send();
});

server.use((req, res) => {
  res.status(404).sendFile('index.html', {
    root: '../Diep-Bot-v2/views'
  });
});

server.listen(port, () => {
  Color.log('Server listening on Port: ' + port);
});