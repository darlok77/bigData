const csv = require('csvtojson')

const filename = 'mock.csv'
csv()
.fromFile(filename)
.then((jsonObj)=>{
  console.log(jsonObj);
})