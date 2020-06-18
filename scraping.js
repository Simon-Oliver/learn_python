const data = require('./data.json');
const fetch = require('node-fetch');
const request = require('request');
const fs = require('fs');

const letters = 'abcdefghijklmnopqrstuvwxyzäöü0123456789'.split('');
urls = ["https://www.edeka.de/api/marketsearch/markets?searchstring&size=2000",
"https://www.edeka.de/api/marketsearch/markets?&searchstring&page=1&size=2000",
"https://www.edeka.de/api/marketsearch/markets?&searchstring&page=2&size=2000"];

const makeUrls = (arr) => {
  arr.forEach((e) => {
    const str = `https://www.edeka.de/api/marketsearch/markets?searchstring=${e}&size=2000`;
    urls.push(str);
  });
};

makeUrls(letters);

var requestAsync = function (url) {
  return new Promise((resolve, reject) => {
    var req = request(url, (err, response, body) => {
      if (err) return reject(err, response, body);
      resolve(JSON.parse(body));
    });
  });
};

var getParallel = async function () {
  //transform requests into Promises, await all
  try {
    var data = await Promise.all(urls.map(requestAsync));
  } catch (err) {
    console.error(err);
  }
  fs.writeFile('data.json', JSON.stringify(data), function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });
};

getParallel();
