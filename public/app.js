const fs = require('fs')
const path = './mock'
const pm2 = require('pm2')
// ICI trow err

/* class Test {
  getNameSplitFile() {
    return new Promise((resolve) => {
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
  }

  startProcess(fileTab) {
    pm2.connect(err => {
      if (err) {
        console.error(err)
        process.exit(2)
      }
      pm2.start({
        'script': 'public/save.js' // Script to be run
        instances: 4
        // 'exec_mode': 'cluster'
      }, (err, apps) => {
        if (err) {
          console.log(err)
        }
        console.log('app started!')
        console.log(apps)
        pm2.list((err, list) => {
          if (err) {
            console.log(err)
          }
          pm2.sendDataToProcessId({
            'id': apps.pm2_env.pm_id,
            'type': 'process:msg',
            'data': {
              'file': 'mock.js',
            },
            'topic': 'my topic'
          },
          (err, res) => {
            if (err) {
              console.log(err)
            }
          })
          // pm2.disconnect()
        })
      })
    })
  }
  run() {
    // this.getNameSplitFile ()
    this.getNameSplitFile().then((res) => {
      this.startProcess(res)
    })
  }
} */

//const test = new Test()

//test.run()
/* pm2.launchBus((err, bus) => {
  bus.on('process:msg', packet => {
    console.log('test')
    packet.data.success.should.eql(true)
    packet.process.pm_id.should.eql(proc1.pm2_env.pm_id)
    done()
  })
}) */

/*
* getNameSplitFile
* @return {array} fileTab
*/
const getNameSplitFile = () => {
  return new Promise((resolve) => {
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
}

/*
* startProcess
* @param {array} fileTab 
* @param {int} processId 
*/
const startProcess = (fileTab, processId) => {
  console.log('ABBBA')
  console.log(processId)
  const id = processId + 1
  pm2.connect(err => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start({
      'script': 'public/save.js' // Script to be run
      // 'exec_mode': 'cluster'
    }, (err, apps) => {
      if (err) {
        console.log(err)
      }
      //console.log(apps)
      console.log('app started!')
      pm2.list((err, list) => {
        if (err) {
          console.log(err)
        }
        console.log('----------------------')
        console.log(list.length)
        console.log(list[list.length-1].pm2_env.pm_id)
        pm2.sendDataToProcessId({
          'id': id,
          'type': 'process:msg',
          'data': {
            'file': fileTab[0],
            'totalFile' :fileTab
          },
          'topic': 'my topic'
        },
        (err, res) => {
          if (err) {
            console.log(err)
          }
          console.log(res)
        })
        // pm2.disconnect()
      })
    })
  })
}
getNameSplitFile().then((res) => {
  startProcess(res, 0)
})

pm2.launchBus((err, bus) => {
  bus.on('messageToParent', packet => {
    pm2.delete(packet.process.pm_id)
    console.log(packet.data.totalFile.length)
    if (packet.data.totalFile.length !== 0) {
      startProcess(packet.data.totalFile, packet.process.pm_id)
    }
  })
})
