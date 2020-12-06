import fs from 'fs';

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

// for (const [key, value] of urls.entries()) {
//   console.log(key, value);
// }

function chunkArray(array, size) {
  if (array.length <= size) {
    return array;
  }
  return [array.slice(0, size), ...chunkArray(array.slice(size), size)];
}

//console.log(chunkArray(urls, 4));

const recLog = (num) => {
  if (num <= 0) {
    return num;
  }
  num -= 1;
  console.log(num);
  return recLog(num);
};

recLog(30);
