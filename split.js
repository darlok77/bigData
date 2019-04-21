const csvSplitStream = require('csv-split-stream')
const fs = require('fs')

const path = './split'
const csv = 'StockEtablissement_utf8.csv'

// tcheck if task folder exist
const createTask = () => (
  new Promise((resolve) => {
    if (! fs.existsSync(path)) {
      fs.mkdirSync(path)
      resolve('NOT EXIST')
    } else {
      resolve('EXIST')
    }
  })
)

const splitSVG = (csv) => (
  new Promise(()=> {
    csvSplitStream.split(
      fs.createReadStream(csv),
      {
        'lineLimit': 250000
      },
      (index) => fs.createWriteStream(`./split/output-${index}.csv`)
    ).then((response) => {
      console.log(response)
    })
  })
)

createTask().then((response) => {
  splitSVG(csv).then(() => {
    console.log(response)
  })
})
