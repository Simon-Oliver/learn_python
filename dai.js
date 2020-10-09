const cheerio = require('cheerio');
const fetch = require('node-fetch');
const fs = require('fs');

const search = [
  '',
  'gmbh',
  'ag',
  'praxis',
  'ich',
  'ein',
  'der',
  'sch',
  'die',
  'und',
  'che',
  'cht',
  'den',
  'gen',
  'ine',
  'ten',
  'ung',
  'hen',
  'nde',
  'lic',
  'ver',
  'sie',
  'ste',
  'nen',
  'eit',
  'ber',
  'ter',
  'nge',
  'das',
  'ach',
  'and',
];

function cfDecodeEmail(encodedString) {
  var email = '',
    r = parseInt(encodedString.substr(0, 2), 16),
    n,
    i;
  for (n = 2; encodedString.length - n; n += 2) {
    i = parseInt(encodedString.substr(n, 2), 16) ^ r;
    email += String.fromCharCode(i);
  }
  return email;
}
// let urls = [];

let rawdata = fs.readFileSync('dai.json');
let urls = JSON.parse(rawdata);
// let urls = [
//   '/hilfe-vor-ort/einrichtung/orthopaedische-klinik-58300-wetter-ruhr',
//   '/hilfe-vor-ort/einrichtung/diako-bremen-das-gesundheitszentrum-im-bremer-westen-28239-bremen',
// ];
// arr.forEach((e) => console.log(`https://hilfe.diakonie.de${e}`));
let arr = [];

const fetchData = async () => {
  for (let i = 0; i < urls.length; i++) {
    console.log(i);
    const data = await fetch(
      //   `https://hilfe.diakonie.de/hilfe-vor-ort/results-html.php?ersteller=&kategorie=1&text=${search[i]}`
      `https://hilfe.diakonie.de${urls[i]}`
    )
      .then((res) => res.text())
      .then((data) => {
        const $ = cheerio.load(data.replace('<br>', ','));

        const obj = {};

        obj.email = $('p.link-wrapper:nth-child(3) > a:nth-child(3)').attr('href')
          ? cfDecodeEmail(
              $('p.link-wrapper:nth-child(3) > a:nth-child(3)')
                .attr('href')
                .replace('/cdn-cgi/l/email-protection#', '')
            )
          : '';
        // obj.phone = $('.col-sm-10 > p:nth-child(4)').text()
        //   ? $('.col-sm-10 > p:nth-child(4)').text()
        //   : '';
        // obj.website = $('p.link-wrapper:nth-child(5) > a:nth-child(2)').text()
        //   ? $('p.link-wrapper:nth-child(5) > a:nth-child(2)').text()
        //   : '';
        // obj.address = $('.col-sm-10 > p:nth-child(7)').text();

        obj.name = $('header.static-sm-16 > h1:nth-child(1)').text()
          ? $('header.static-sm-16 > h1:nth-child(1)').text()
          : '';
        obj.html = $('.col-sm-10.event').text();
        var wpattern = /\b(\w*Website\w*)\b(.*)/g;
        let webstr = obj.html.match(wpattern) ? obj.html.match(wpattern)[0] : '';
        obj.website = webstr.slice(webstr.indexOf('Website:') + 8).trim()
          ? webstr.slice(webstr.indexOf('Website:') + 8).trim()
          : '';
        obj.address = obj.html.slice(obj.html.indexOf('Adresse\n') + 9).trim()
          ? obj.html.slice(obj.html.indexOf('Adresse\n') + 9).trim()
          : ''; // let arr = $('.link-wrapper a');
        var tpattern = /\b(\w*Telefon\w*)\b(.*)/g;
        let telstr = obj.html.match(tpattern) ? obj.html.match(tpattern)[0] : '';
        obj.phone = telstr.slice(telstr.indexOf('Telefon:') + 8).trim()
          ? telstr.slice(telstr.indexOf('Telefon:') + 8).trim()
          : '';
        // let arr = $('.sn-detail-address__headline');
        // arr.each((i, e) => {
        //   if (urls.indexOf(e.attribs.href) == -1) {
        //     urls.push(e.attribs.href);
        //   }
        // });
        arr.push(obj);
      });
  }
};

fetchData().then(() => {
  fs.writeFile('dai_data.json', JSON.stringify(arr), function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });
  console.log(arr);
});

// AND	0,41 %
// ERS	0,41 %
// REN	0,40 %
// ERE	0,39 %
// NIC	0,39 %
// IST	0,37 %
// SIC	0,37 %
// BEN	0,35 %
// AUF	0,35 %
// LLE	0,35 %
// ABE	0,34 %
// END	0,33 %
// MIT	0,32 %
// MEN	0,32 %
// SEI	0,32 %
// SEN	0,32 %
// IGE	0,32 %
// AUS	0,32 %
// NTE	0,31 %
// ESE
