const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=2",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=3",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=4",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=5",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=6",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=7",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=8",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=9",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=10",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=11",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=12",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=13",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=14",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=15",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=16",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=17",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=18",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=19",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=20",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=21",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=22",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=23",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=24",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=25",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=26",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=27",
  "https://www.herold.at/gelbe-seiten/was_rotes-kreuz/?page=28",
];

const parseData = (data) => {
  const $ = cheerio.load(data);
  links = [];
  // console.log(data)

  $('.btn.btn-md.btn-hbd.btn-light-white.fullWidth').each((index, value) => {
    var link = $(value).attr('href');
    links.push(link);
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
  fs.writeFile("202101_rk_links.json", JSON.stringify(newVar), (err, saved) => {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });
  console.log(newVar)
});