const fs = require('fs')
const path = './split'
const pm2 = require('pm2')

class Test {
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
        // 'exec_mode': 'cluster'
      }, (err, apps) => {
        if (err) {
          console.log(err)
        }
        console.log('app started!')
        pm2.list((err, list) => {
          if (err) {
            console.log(err)
          }
          pm2.sendDataToProcessId(list[0].pm2_env.pm_id, {
            'id': 0,
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
          pm2.disconnect()
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
}

const test = new Test()

test.run()
