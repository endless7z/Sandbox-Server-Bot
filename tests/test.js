const axios = require('axios');

function hex(str) {
  var result = '';
  for (var i = 0; i < str.length; i++) {
    result += str.charCodeAt(i).toString(16);
  };
  return result;
};

function reverse(s) {
  return s.split('').reverse().join('');
};

String.prototype.convert = function() {
  const a = [];
  const array = this.split('')

  array.forEach((i) => {
    a.push(reverse(hex(i)));
  });

  return 'https://diep.io/#' + a.join('');
};

const ids = [];
const modes = ['4teams', 'teams', 'tag', 'ffa', 'maze', 'survival', 'sandbox'];

modes.some(
  (mode) => {
    const regions = ['la', 'miami', 'amsterdam', 'sydney', 'singapore'];

    axios({
      method: 'GET',
      url: `http://api.n.m28.io/endpoint/diepio-${mode}/findEach`
    }).then(
      (r) => {

        function trim(a = []) {
          return a.sort().filter(function(item, pos, ary) {
            return !pos || item != ary[pos - 1];
          });
        };

        regions.map((region) => {
          ids.push(r.data.servers[`vultr-${region}`].id);
        });

        trim(ids).map(
          (id) => {
            return console.log(id.convert());
          }
        );
      }
    ).catch(
      () => console.error('An Error Has Occurred')
    );
  }
);