const fs = require('fs')
const pm2 = require('pm2')

const path = './split'

/*
* getNameSplitFile
* @return {array} fileTab
*/
const getNameSplitFile = () => (
  new Promise((resolve) => {
    fs.readdir(path, (err, items) => {
      if (err) {
        console.log(err)
      }
      const fileTab = []

      for (let i = 0; i < items.length; i += 1) {
        if (items[i] !== '.DS_Store') {
          fileTab.push(items[i])
        }
      }
      resolve(fileTab)
    })
  })
)

/*
*startProcess
* @param {array} fileTab
* @param {int} processId
*/
const startProcess = (fileTab, processId) => {
  const id = processId + 1
  pm2.connect((err) => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start({
      script: 'public/save.js' // Script to be run
      // 'exec_mode': 'cluster'
    }, (errStart) => {
      if (errStart) {
        console.log(errStart)
      }
      // console.log(apps)
      console.log('app started!')
      pm2.list((errList) => {
        if (errList) {
          console.log(errList)
        }
        pm2.sendDataToProcessId({
          id,
          type: 'process:msg',
          data: {
            file: fileTab[0],
            totalFile: fileTab
          },
          topic: 'my topic'
        },
        (errSendData, res) => {
          if (errSendData) {
            console.log(errSendData)
          }
          console.log(res)
        })
        // pm2.disconnect()
      })
    })
  })
}
getNameSplitFile().then((res) => {
  startProcess(res, 0) // 2 lunch wtf
})

pm2.launchBus((err, bus) => {
  bus.on('messageToParent', (packet) => {
    pm2.delete(packet.process.pm_id)
    if (packet.data.totalFile.length !== 0) {
      startProcess(packet.data.totalFile, packet.process.pm_id)
    }
  })
})
