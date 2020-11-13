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
];

// let wait = async (num) => {
//   return new Promise((resolve) => setTimeout(() => resolve(`${num}, Waited one second`), 1000));
// };

// wait(1).then((res) => console.log(res));

// let arr = [1, 2, 3, 4, 5, 6, 7];

const getData = (user) => {
  return user.name;
};

let getUser = async (url) => {
  const data = await fetch(url)
    .then((r) => r.json())
    .then((json) => getData(json))
    .catch((e) => console.log(e));
  return data;
};

Promise.all(urls.map((e) => getUser(e))).then((val) => console.log(val));
