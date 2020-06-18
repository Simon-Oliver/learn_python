const data = require('./finalData.json');
const fs = require("fs")


const header = `store, address,state,email,phone,imprintName,imprintAddress\n`


var csv = "store|address|state|email|phone|imprintName|imprintAddress\n"



for (i = 0; i < data.length; i++) {
  const name = data[i].name
  const address = `"${data[i].contact.address.street}, ${data[i].contact.address.city.zipCode} ${data[i].contact.address.city.name}"`
  const federalState = data[i].contact.address.federalState
  const email = data[i].contact.emailAddress
  const phone = data[i].contact.phoneNumber
  const legalName = data[i].imprint ? data[i].imprint.companyName:"N/A"
  const legalAddress = data[i].imprint ? `"${data[i].imprint.address.street}, ${data[i].imprint.address.city.zipCode} ${data[i].imprint.address.city.name}"`:"N/A"

 
  const row = `${name}|${address}|${federalState}|${email}|${phone}|${legalName}|${legalAddress}\n`
  csv += row
  }

  fs.writeFile('edeka.csv',csv , function (err, data) {
    if (err) {
      return console.log(err);
    }
    console.log('Saved');
  });
