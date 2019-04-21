const csv = require('csvtojson')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017'
const filename = 'split/output-0.csv'

const createNewEntries = (db, entries, callback) => {

  // Get the collection and bulk api artefacts
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
      // do something with result
    })
  }
}
csv()
  .fromFile(filename)
  .then(jsonObj => {
    MongoClient.connect(url, (err, client) => {
      const db = client.db('bigDataGD')
      createNewEntries(db, jsonObj, () => {
        db.close()
      })
    });
  })