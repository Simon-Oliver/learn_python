const fetch = require('node-fetch');
const fs = require('fs');
const ObjectsToCsv = require('objects-to-csv');


let urls = [
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3',
  'https://jsonplaceholder.typicode.com/users/4',
  'https://jsonplaceholder.typicode.com/users/5',
  'https://jsonplaceholder.typicode.com/users/6',
  'https://jsonplaceholder.typicode.com/users/7',
  'https://jsonplaceholder.typicode.com/users/8',
  'https://jsonplaceholder.typicode.com/users/9',
  'https://jsonplaceholder.typicode.com/users/10',
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3',
  'https://jsonplaceholder.typicode.com/users/4',
  'https://jsonplaceholder.typicode.com/users/5',
  'https://jsonplaceholder.typicode.com/users/6',
  'https://jsonplaceholder.typicode.com/users/7',
  'https://jsonplaceholder.typicode.com/users/8',
  'https://jsonplaceholder.typicode.com/users/9',
  'https://jsonplaceholder.typicode.com/users/10',
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3',
  'ht://jsonplaceholder.typicode.com/userss/4', // <--- Error on purpose
  'https://jsonplaceholder.typicode.com/users/5',
  'https://jsonplaceholder.typicode.com/users/6',
  'https://jsonplaceholder.typicode.com/users/7',
  'https://jsonplaceholder.typicode.com/users/8',
  'https://jsonplaceholder.typicode.com/users/9',
  'https://jsonplaceholder.typicode.com/users/10',
  'https://jsonplaceholder.typicode.com/users/1',
  'https://jsonplaceholder.typicode.com/users/2',
  'https://jsonplaceholder.typicode.com/users/3',
  'https://jsonplaceholder.typicode.com/users/4',
  'https://jsonplaceholder.typicode.com/users/5',
  'https://jsonplaceholder.typicode.com/users/6',
  'https://jsonplaceholder.typicode.com/users/7',
  'https://jsonplaceholder.typicode.com/users/8',
  'https://jsonplaceholder.typicode.com/users/9',
  'https://jsonplaceholder.typicode.com/users/10',
];

function chunkArray(array, size) {
  let result = [];
  for (let i = 0; i < array.length; i += size) {
    let chunk = array.slice(i, i + size);
    result.push(chunk);
  }
  return result;
}

// returns username
const getData = (user) => {
  let obj = {
    name: user.name,
    company: user.company.name,
  };
  return obj;
};

// Gets url and runs getData on json
let getUser = async (url) => {
  const data = await fetch(url)
    .then((r) => r.json())
    .then((json) => getData(json))
    .catch((e) => {
      return { error: e.name, message: e.message, name: "n/a", company: "n/a" };
    });
  return data;
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
    savingToFile('testDataSave.json', [...arr, ...d]);
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


batchScrape(urls, 10).then(async (d) => {
  //console.log(await new ObjectsToCsv(d).toString())
  console.log(new CreateCSV(["name","company"],d).getCSV())
});
