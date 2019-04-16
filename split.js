const csvSplitStream = require('csv-split-stream')
const fs = require('fs')
const path = './task'
const csv = '/Users/benede.a/Documents/mds.master.bigdata/StockEtablissement_utf8.csv'
var pm2 = require('pm2')

// tcheck if task folder exist
const createTask = () => {
  return new Promise((resolve) => {
    if (! fs.existsSync(path)) {
      fs.mkdirSync(path);
      resolve('NOT EXIST')
    } else {
      resolve('EXIST')
    }
  })
}

// séparation du CSV en 112 csv
const splitSVG = (csv) => {
  return new Promise((reoslve)=> {
    csvSplitStream.split(
      fs.createReadStream(csv),
      {
        lineLimit: 250000
      },
      (index) => fs.createWriteStream(`./task/output-${index}.csv`)
    ).then((response) => {
      console.log(response)
    })
  })
}

// EXECUTION
createTask().then((response) => {
  //SVG SPLIT
  splitSVG(csv).then((resolve) => {
    console.log(response)
  })
})