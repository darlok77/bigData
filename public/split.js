const csvSplitStream = require('csv-split-stream')
const fs = require('fs')
const path = './split'
const csv = '../StockEtablissement_utf8.csv'
// const pm2 = require('pm2')

// tcheck if task folder exist
const createTask = () => {
  return new Promise((resolve) => {
    if (! fs.existsSync(path)) {
      fs.mkdirSync(path)
      resolve('NOT EXIST')
    } else {
      resolve('EXIST')
    }
  })
}

const splitSVG = (csv) => {
  return new Promise(()=> {
    csvSplitStream.split(
      fs.createReadStream(csv),
      {
        'lineLimit': 250000
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
  splitSVG(csv).then(() => {
    console.log(response)
  })
})
