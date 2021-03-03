const string = "diep.io/#ffffffff";
const str = "diep.io/#2617536700A5AC1C20F5EC"
const regex = /(https:\/\/diep\.io|diep\.io)\/#.[a-z0-9]{21}$/i;

console.log(regex.test(string));
console.log(regex.test(str));