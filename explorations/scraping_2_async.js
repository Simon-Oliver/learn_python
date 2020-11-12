const fetch = require('node-fetch');
const cheerio = require('cheerio');
const fs = require('fs');

const urls = [
  'https://www.comparis.ch/gesundheit/spitex/detail/abad-associazione-bellinzonese-per-l-assistenza-e-cura-a-domicilio/1010000462000',
  'https://www.comparis.ch/gesundheit/spitex/detail/abd-plus-gmbh/1010000855000',
  'https://www.comparis.ch/gesundheit/spitex/detail/acasa-spitex-suisse-ag/1010000555000',
  'https://www.comparis.ch/gesundheit/spitex/detail/acasa-spitex-suisse-ag-basel/1010000555006',
  'https://www.comparis.ch/gesundheit/spitex/detail/acasa-spitex-suisse-ag-sissach/1010000555001',
  'https://www.comparis.ch/gesundheit/spitex/detail/acasa-spitex-suisse-ag-solothurn/1010000555005',
  'https://www.comparis.ch/gesundheit/spitex/detail/adlibit-home-sa/1010000857000',
  'https://www.comparis.ch/gesundheit/spitex/detail/aktiv-leben-aktiv-pflegen/1010000879000',
  'https://www.comparis.ch/gesundheit/spitex/detail/allcura-spitex-gmbh/1010000748000',
  'https://www.comparis.ch/gesundheit/spitex/detail/alphaclear-gmbh/1010000556000',
  'https://www.comparis.ch/gesundheit/spitex/detail/alters-und-pflegeheim-lueg-is-land-ag/1010000558000',
  'https://www.comparis.ch/gesundheit/spitex/detail/altersheime-baar/1010000921000',
  'https://www.comparis.ch/gesundheit/spitex/detail/alterssiedlung-sonnmatt/1010000739000',
  'https://www.comparis.ch/gesundheit/spitex/detail/alterstagesst-tte-zum-lebenslauf-/1010000924000',
];

const fetchData = async (url) => {
  const finaldata = await fetch(url)
    .then((res) => res.text())
    .then((data) => {
      const $ = cheerio.load(data);
      obj = {};

      obj.name = $('h1').text() ? $('h1').text() : 'N/A';
      obj.tel = $("a[href^='tel:']").text() ? $("a[href^='tel:']").text() : 'N/A';
      obj.web = $("a[href^='http:']").text() ? $("a[href^='http:']").text() : 'N/A';
      obj.address = $('li em.fa-map-marker').parent().text().trim()
        ? $('li em.fa-map-marker').parent().text().trim()
        : 'N/A';

      return obj;
    });
  return finaldata;
};

Promise.all(urls.map((e) => fetchData(e))).then((val) => console.log(val));
