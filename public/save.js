const csv = require('csvtojson')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/bigDataGD'
const filename = 'mock.csv'

const createNewEntries = (client, entries) => (
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
    resolve(client)
  })
)

process.on('message', data => {
  console.log('truc machin ')
  console.log(data)
  csv()
  .fromFile(`mock/${data.data.file}`)
  .then(jsonObj => {
    MongoClient.connect(url, { useNewUrlParser: true }, (err, client) => {
      createNewEntries(client, jsonObj).then((res) => {
        res.close()
        console.log('ici')
        console.log(`mock/${data.data.file}`)
        posFile = data.data.totalFile.indexOf(data.data.file)
        remainingFile = data.data.totalFile.splice(posFile, 1)
        process.send({
          'type': 'messageToParent',
          'data': {
            'success': true,
            'totalFile': remainingFile
          }
        })
      })
    })
  })
})

