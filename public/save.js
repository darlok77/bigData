const csv = require('csvtojson')

const filename = 'mock.csv'

process.on('message', data => {

  csv()
  .fromFile(filename)
  .then(jsonObj => {
    console.log(jsonObj[0]);
  })
  console.log('test1')
  console.log('your actual data object', data.data.file)
})
