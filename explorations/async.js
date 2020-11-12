const fetch = require('node-fetch');

let url = 'https://jsonplaceholder.typicode.com/users/';

// let wait = async (num) => {
//   return new Promise((resolve) => setTimeout(() => resolve(`${num}, Waited one second`), 1000));
// };

// wait(1).then((res) => console.log(res));

// let arr = [1, 2, 3, 4, 5, 6, 7];

let getUser = async (url) => {
  return fetch(url).then((r) => r.json());
};

let arr = [];

for (let index = 0; index < 10; index++) {
  arr.push(url + index);
}

Promise.all(arr.map((e) => getUser(e))).then((val) => console.log(val));
