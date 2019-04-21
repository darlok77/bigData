const fs = require('fs')

const filename = 'mock.csv'
// Create a readable stream
const readerStream = fs.createReadStream(filename);
const data = ''

// Set the encoding to be utf8. 
readerStream.setEncoding('UTF8');

// Handle stream events --> data, end, and error
readerStream.on('data', chunk =>  {
    console.log(chunk)
})

readerStream.on('end', () => {
  console.log(data)
})

readerStream.on('error', err => {
  console.log(err.stack)
})


process.on('message', (data) => {
   console.log('your actual data object', data.data);
})

