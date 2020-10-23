const fs = require('fs');

let rawdata = fs.readFileSync('dai.json');
let arr = JSON.parse(rawdata);

arr.forEach((e) => console.log(`https://hilfe.diakonie.de${e}`));
