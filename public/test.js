const fs = require('fs')
const path = './split'
const pm2 = require('pm2')

class Test {
  getNameSplitFile () {
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

  startProcess (fileTab) {
    pm2.connect((err) => {
      if (err) {
        console.error(err)
        process.exit(2) //sigint
      }

      pm2.start({
        'name': fileTab[0],
        'script': './task/' + fileTab[0], // Script to be run
        'exec_mode': 'cluster', // Allows your app to be clustered
        'instances': 1, // Optional: Scales your app by 4
        'max_memory_restart': '100M', // Optional: Restarts your app if it reaches 100Mo
        'interpreter': 'none'
      }, (err, apps) => {
        if (err) {
          throw err
        }
        // Ici envoie d'un message pour démarer un autre process
        pm2.delete(fileTab[0])
      })
    })
  }

  run () {
    this.getNameSplitFile ()
    /* getNameSplitFile().then((res) => {
      startProcess(res)
    }) */
  }
}

Test.run()
