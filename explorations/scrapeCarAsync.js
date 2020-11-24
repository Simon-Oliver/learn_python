const urls = require("./error.json")
const fetch = require('node-fetch');
const fs = require('fs');
const cheerio = require('cheerio');
const ObjectsToCsv = require('objects-to-csv');

// const urls = [
//     "https://www.caritas.de/search.ashx?g=0580b30e-070c-4555-b3f6-2fe738a72908&p=21&r=f722047f-1420-414b-856e-32946ef514f6&u=http%3a%2f%2fwww.caritas.de%2fadressen%2fcaritas-schwarzwald-gaeu-zentrum-horb%2fzentrumsverwaltung%2f72160-horb-a.-n%2f79479%3fsearchterm%3d",
//     "https://www.caritas.de/search.ashx?g=0580b30e-070c-4555-b3f6-2fe738a72908&p=26&r=c85b9dca-d374-4681-b9d9-40b5b32d367f&u=http%3a%2f%2fwww.caritas.de%2fadressen%2fcaritas-fils-neckar-alb-zentrum-goeppingen%2f73033-goeppingen%2f81627%3fsearchterm%3d",
//     "https://www.caritas.de/search.ashx?g=0580b30e-070c-4555-b3f6-2fe738a72908&p=35&r=30a9cf41-4e32-45ff-979d-505c6da7ea58&u=http%3a%2f%2fwww.caritas.de%2fadressen%2fcaritas-schwarzwald-gaeu-zentrum-calw%2fzentrumsverwaltung%2f75365-calw%2f84007%3fsearchterm%3d",
//     "https://www.caritas.de/search.ashx?g=0580b30e-070c-4555-b3f6-2fe738a72908&p=11695&r=adcab15f-5265-42e1-bc46-d74f38f3012a&u=http%3a%2f%2fwww.caritas.de%2fadressen%2fgeschaeftsstelle%2fdioezesancaritasverband%2f65549-limburg-lahn%2f104339%3fsearchterm%3d"
// ]

function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

// returns username
const getData = (user,url) => {
    const obj = {}
    obj.url = url
    try{
        const $ = cheerio.load(user);
        const el = $('.address__info').text()
        obj.address = el.trim().split("\n").map(e => e.replace(/\s+/g, " ").trim()).filter(e => e != "").join(",")
        obj.tel = $("div[title=\"Telefon\"]").text().split("\n").map(e => e.replace(/\s+/g, " ").trim()).filter(e => e != "")
        obj.email = $(".link.link--mail").attr("href").replace("mailto:","")
        obj.web = $(".link.link--external").attr("href")
    }
    catch(error){
        obj.error = true
    }

    
    
    
//   let obj = {
//     name: user.name,
//     company: user.company.name,
//   };
  return obj;
};

// Gets url and runs getData on json
let getUser = async (url) => {
    const finaldata = await fetch(url)
    .then((res) => res.text())
    .then((data) => {
      return getData(data,url)
    })
    .catch((e) => console.log('-------->', e));
  return finaldata;
};

// Takes an array of urls and maps them agains getUser methode and awaits them
let scrape = async (urls) => {
  const data = await Promise.all(urls.map((e) => getUser(e)));
  return data;
};

let savingToFile = (fileName, data) => {
  fs.writeFile(fileName, JSON.stringify(data), (err, saved) => {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });
};

// breaks url arry into chuncks and runs scrape for each chunk and awaits befor appending to return arr
const batchScrape = async (list, num) => {
  const batch = chunkArray(list, num);
  let arr = [];

  // for (const [key, value] of batch.entries()) {
  //   d = await scrape(value);
  //   savingToFile('testDataSave.json', [...arr, ...d]);
  //   arr = [...arr, ...d];
  // }

  for (let b of batch) {
    d = await scrape(b);
    console.log()
    savingToFile('carReError.json', [...arr, ...d]);
    arr = [...arr, ...d];
  }

  // for (let i = 0; i < batch.length; i++) {
  //   d = await scrape(batch[i]);
  //   arr = [...arr, ...d];
  // }

  return arr;
};

class CreateCSV {
  constructor(headings, data) {
    this.headings = headings
    this.headStr = headings.join()
    this.data =data 
  }

  getHeadings(){
    return this.headings
  }

  getStrHeadings(){
    return this.headStr
  }

  getCSV(){
    let csvStr = ""
    csvStr += this.headStr
    this.data.forEach(d => {
      let str = "\n"
      this.headings.forEach(h => {
        str += d[h] + ","
      })
      csvStr += str.replace(/,\s*$/, "") // Removes the trailing comma and whitespace
    })
    return csvStr
  }

}


batchScrape(urls, 25).then(async (d) => {
  //console.log(await new ObjectsToCsv(d).toString())
  //console.log(new CreateCSV(["name","company"],d).getCSV())
  console.log("Done")
});