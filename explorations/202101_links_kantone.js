const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
  "https://www.redcross-edu.ch/de/rotkreuz-kantonalverbaende"
];

const parseData = (data) => {
  const $ = cheerio.load(data);
  links = [];
  // console.log(data)

  $('li a').each((index, value) => {
    var link = $(value).attr('href');
    links.push(`https://www.redcross-edu.ch${link}`);
  });

  return links;
};

const fetchData = async (url) => {
  const finaldata = await fetch(url)
    .then((res) => res.text())
    .then((data) => {
      return parseData(data);
    })
    .catch((e) => console.log('-------->', e));
  return finaldata;
};

Promise.all(urls.map((e) => fetchData(e))).then((val) => {
  let newVar = val.reduce((finalArr, currentarr) => [...finalArr, ...currentarr])
  // fs.writeFile("202101_kantone_links.json", JSON.stringify(newVar), (err, saved) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   console.log('Saved');
  // });
  console.log(newVar)
});