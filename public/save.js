const csv = require('csvtojson')
const mongo = require('mongodb').MongoClient

const { MongoClient } = mongo
const url = 'mongodb://localhost:27017/bigDataGD'

/*
* createNewEntries
* @param {Object} client
* @param {array} entries
* @return {object} client
*/
const createNewEntries = (client, entries) => (
  new Promise((resolve) => {
    // Get the collection and bulk api artefacts
    const db = client.db('bigDataGD')
    const collection = db.collection('entries')
    let bulkUpdateOps = []

    entries.forEach((doc) => {
      bulkUpdateOps.push({ insertOne: { document: doc } })
      if (bulkUpdateOps.length === 1000) {
        collection.bulkWrite(bulkUpdateOps)
        bulkUpdateOps = []
      }
    })
    if (bulkUpdateOps.length > 0) {
      collection.bulkWrite(bulkUpdateOps)
    }
    resolve(client)
  })
)

process.on('message', (data) => {
  console.log(data.data.file)
  csv()
    .fromFile(`mock/${data.data.file}`)
    .then((jsonObj) => {
      MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
        createNewEntries(client, jsonObj).then((res) => {
          res.close()
          console.log('ici')
          console.log(`mock/${data.data.file}`)
          const posFile = data.data.totalFile.indexOf(data.data.file)
          const remainingFile = data.data.totalFile.splice(posFile, 1)
          process.send({
            type: 'messageToParent',
            data: {
              totalFile: remainingFile
            }
          })
        })
      })
    })
})

