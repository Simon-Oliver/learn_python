const fetch = require('node-fetch');

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
    .catch((e) => console.log(e));
  return data;
};

// Takes an array of urls and maps them agains getUser methode and awaits them
let scrape = async (urls) => {
  const data = await Promise.all(urls.map((e) => getUser(e)));
  return data;
};

// breaks url arry into chuncks and runs scrape for each chunk and awaits befor appending to return arr
const batchScrape = async (list, num) => {
  const batch = chunkArray(list, num);
  let arr = [];

  for (let b of batch) {
    d = await scrape(b);
    arr = [...arr, ...d];
  }

  // for (let i = 0; i < batch.length; i++) {
  //   d = await scrape(batch[i]);
  //   arr = [...arr, ...d];
  // }

  return arr;
};

batchScrape(urls, 10).then((d) => console.log(d));
