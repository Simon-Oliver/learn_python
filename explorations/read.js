const data = require('./data.json');
const fs = require('fs');

const arr = []

data.forEach((e) => {
    e.markets.forEach(m => {
        arr.push(m)
    })
    
});

function getUnique(arr, comp) {

    // store the comparison  values in array
const unique =  arr.map(e => e[comp])

  // store the indexes of the unique objects
  .map((e, i, final) => final.indexOf(e) === i && i)

  // eliminate the false indexes & return unique objects
 .filter((e) => arr[e]).map(e => arr[e]);

return unique;
}


fs.writeFile('finalData.json', JSON.stringify(getUnique(arr,'id')), function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });

  console.log(getUnique(arr,'id').length);

console.log(arr.length)