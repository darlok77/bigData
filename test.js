const fs = require('fs')
const path = './task'
const pm2 = require('pm2')

//Creation d'un tableau avec tout les noms de fichier crées
const getNameTaskValue = () => {
  return new Promise((resolve) => {
    // get name csv
    // and push into tabl
    fs.readdir(path, function(err, items) {
      const fileTab = []
      for (var i=1; i<items.length; i++) {
        fileTab.push(items[i])
      }
      resolve(fileTab)
    })
  })
}

// Démarer les process
const startProcess = (fileTab) => {
  console.log('fileTab: ', fileTab)

  pm2.connect(function(err) {
    if (err) {
      console.error(err)
      process.exit(2);
    }

    pm2.start({
      name: fileTab[0],
      script    : './task/' + fileTab[0],         // Script to be run
      exec_mode : 'cluster',        // Allows your app to be clustered
      instances : 1,                // Optional: Scales your app by 4
      max_memory_restart : '100M',   // Optional: Restarts your app if it reaches 100Mo
      interpreter: 'none'
    }, function(err, apps) {
      if (err) throw err
      // Ici envoie d'un message pour démarer un autre process
      pm2.delete(fileTab[0])
    })
  })
}

// EXECUTION
getNameTaskValue().then((res) => {
  startProcess(res)
})