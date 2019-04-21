const fs = require('fs')
const path = './split'
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

const startProcess = (fileTab) => {
  pm2.connect(err => {
    if (err) {
      console.error(err)
      process.exit(2)
    }
    pm2.start({
      'script': 'public/save.js', // Script to be run
      'instances': 4
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
getNameSplitFile().then((res) => {
  startProcess(res)
})

pm2.launchBus((err, bus) => {
  bus.on('process:msg', packet => {
    console.log('test')
    packet.data.success.should.eql(true)
    packet.process.pm_id.should.eql(proc1.pm2_env.pm_id)
    done()
  })
})
