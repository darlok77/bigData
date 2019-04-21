var pm2 = require('pm2');

pm2.connect(function(err) {
  if (err) {
    console.error(err);
    process.exit(2);
  }

  pm2.start({
    script    : "public/save.js"   // Script to be run
  }, function(err, apps) {

    if(err) {
      console.log(err);
    }
    console.log("app started!");
    pm2.list(function(err, list) {

      pm2.sendDataToProcessId({
      		id:1,
          type : 'process:msg',
          data : {
            some : 'data',
            hello : true
          },
          topic: "my topic"

        },
        function(err, res) {
          console.log(err);
        });

      pm2.disconnect();
    });
  });
});
