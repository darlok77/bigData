const csv = require('csvtojson')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/bigDataGD'
// const filename = 'split/output-0.csv'
const path = './split'


const getNameSplitFile = () => (
  new Promise((resolve) => {
    fs.readdir(path, (err, items) => {
      if (err) {
        console.log(err)
      }
      const fileTab = []

      for (var i = 0; i < items.length; i ++) {
        if (items[i] !== '.DS_Store') {
          fileTab.push(items[i])
        }
      }
      resolve(fileTab)
    })
  })
)

/*
* createNewEntries
* @param {Object} client 
* @param {array} entries 
* @return {object} client
*/
const createNewEntries = (client, entries, filename ) => (
  new Promise(resolve => {
    // Get the collection and bulk api artefacts
    const db = client.db('bigDataGD')
    const collection = db.collection('entries')
    let bulkUpdateOps = []

    entries.forEach(doc => {
      bulkUpdateOps.push({ "insertOne": { "document": doc } })
      if (bulkUpdateOps.length === 1000) {
        collection.bulkWrite(bulkUpdateOps).then(r => {
          // do something with result
        })
        bulkUpdateOps = []
      }
    })
    if (bulkUpdateOps.length > 0) {
      collection.bulkWrite(bulkUpdateOps).then(r => {
      })
    }
    file = filename.splice(1)
    if (file.length !== 0){
      truc(file)
    }
    resolve(client)
  })
)

const truc = (filename) => {
  console.log(filename)
  console.log(filename[0])
  csv()
  .fromFile('split/'+filename[0])
  .then(jsonObj => {
    MongoClient.connect(url, (err, client) => {
      createNewEntries(client, jsonObj).then((res) => {
        res.close()
      })
    })
  })
}

getNameSplitFile().then(file => {
  truc(file)
})

