const { Bot } = require("../utils/Bot");
const { prefix } = require('../config.json');
const Axios = require('axios').default;

module.exports = {
  run(message, args = []) {
    const ids = [];
    const base = 'http://api.n.m28.io/endpoint';

    const modes = [
      ['4teams', 'teams', 'tag', 'ffa', 'maze', 'survival', 'dom','sandbox'],
      ['4tdm', '2tdm', 'domination']
    ];

    modes[0].some(
      mode => {
        const embed = {
          title: 'Servers',
          color: 'GOLD',
          timestamp: new Date(),
          footer: {
            text: 'endless OP'
          },
          fields: []
        };

        const regions = [
          ['la', 'miami', 'amsterdam', 'sydney', 'singapore'],
          ['eu', 'syd', 'sg', 'la', 'miami']
        ];

        const string = [];

        if (args.length) {
          args[0] = args[0].toLowerCase();
        };

        if (args[1]) {
          args[1] = args[1].toLowerCase();
        };

        if (!args.length) {
          var url = base + `/diepio-${mode}/findEach`;
        } else if (modes[0].includes(args[0])) {
          var url = base + `/diepio-${args[0]}/findEach`;
        } else if (modes[1].includes(args[0])) {
          if (args[0] == modes[1][0]) {
            var url = base + `/diepio-4teams/findEach`;
          };

          if (args[0] == modes[1][1]) {
            var url = base + `/diepio-teams/findEach`;
          };

          if (args[0] == modes[1][2]) {
            var url = base + `/diepio-dom/findEach`;
          };
        } else if (regions[1].includes(args[0])) {
          var url = base + `/diepio-${mode}/findEach`;

          if (args[1]) {
            if (modes[0].includes(args[1]) || modes[1].includes(args[1])) {
              switch (args[1]) {
                case modes[1][0]:
                  var url = base + `/diepio-4teams/findEach`;
                  break;
                case modes[1][1]:
                  var url = base + `/diepio-teams/findEach`;
                  break;
                case modes[1][2]:
                  var url = base + `/diepio-teams/findEach`;
                  break;
                default:
                  var url = base + `/diepio-${mode}/findEach`;
                  break;
              };
            };
          };
        } else {
          if (mode == modes[0][modes[0].length - 1]) {
            Bot.SendEmbed(message,
              ['Error', 0xFF0000, new Date(), 'endless OP', 'Invalid Input'], 0
            );

            return;
          } else {
            return;
          };
        };

        Axios(
          { method: 'GET', url: url }
        ).then(
          Res => {
            if (!args.length) {
              regions[0].map(region => {
                ids.push(Res.data.servers[`vultr-${region}`].id);
              });
            } else if (regions[1].includes(args[0])) {
              switch(args[0]) {
                case 'eu':
                  ids.push(Res.data.servers[`vultr-amsterdam`].id);
                  break;
                case 'syd':
                    ids.push(Res.data.servers[`vultr-sydney`].id);
                    break;
                case 'sg':
                    ids.push(Res.data.servers[`vultr-singapore`].id);
                    break;
                default:
                    ids.push(Res.data.servers[`vultr-${args[0]}`].id);
                    break;
              };
            } else if (args[1] && regions[1].includes(args[1])) {
              switch (args[1]) {
                case 'eu':
                  ids.push(Res.data.servers[`vultr-amsterdam`].id);
                  break;
                case 'syd':
                  ids.push(Res.data.servers[`vultr-sydney`].id);
                  break;
                case 'sg':
                  ids.push(Res.data.servers[`vultr-singapore`].id);
                  break;
                default:
                  ids.push(Res.data.servers[`vultr-${args[1]}`].id);
                  break;
              };
            } else if (modes[0].includes(args[0]) || modes[1].includes(args[0])) {
              regions[0].map(region => {
                ids.push(Res.data.servers[`vultr-${region}`].id);
              });
            } else {
              return;
            };

            Bot.cut(ids).map(
              id => {
                string.push(Bot.convert(id) + ` | ${id}`);
              }
            );

            if (!args.length) {
              embed.fields.push({ name: 'Links', value: string, inline: false });
            } else {
              embed.fields.push({ name: `Links (${args[0]})`, value: string, inline: false });
            };

            if (mode == modes[0][modes[0].length - 1]) {
              message.channel.send({ embed: embed }).catch(
                () => {
                  function retry() {
                    embed.fields.pop();
                    string.pop();

                    if (!args.length) embed.fields.push({ name: 'Links', value: string, inline: false });
                    else embed.fields.push({ name: `Links (${args[0]})`, value: string, inline: false });

                    message.channel.send(embed).catch(
                        () => retry()
                    );
                  }

                  retry();
                }
              );
            }
          }
        ).catch(
          () => {
            if (mode == modes[0][modes[0].length - 1]) {
              Bot.SendEmbed(message,
                ['Error', 0xFF0000, new Date(), 'endless OP', 'Invalid Input'], 0
              );

              return;
            } else {
              return;
            };
          }
        );
      }
    );
  },

  help(message) {
    Bot.SendEmbed(message,
      ['Servers', 'GOLD', new Date(), 'endless OP',
        `**Sends A List of Servers**\nDefault: \`${prefix}servers\`\nFull: \`${prefix}servers <gamemode/region> <gamemode/region>\``
      ],
      [
        {
          name: 'Gamemodes',
          value: '`4tdm, 2tdm, tag, ffa, maze, survival, sandbox, domination`',
          inline: false
        },
        {
          name: 'Regions',
          value: '`LA, Miami, EU, SYD, SG`',
          inline: false
        },
      ]
    );
  }
};