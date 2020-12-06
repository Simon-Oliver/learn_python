const links = require("./carLink.json")
const data = require('./carDataSaveFinal.json')

let scrapeLink = []
let notYet = []

data.forEach(e=> {
    try{
        scrapeLink.push(e.url)
    } catch(e){
        return
    }
})

links.forEach(link => {
    if(!scrapeLink.includes(link)){
        notYet.push(link)
    }
})

console.log(notYet)