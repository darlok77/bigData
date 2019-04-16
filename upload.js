var csv = require('fast-csv');
var mongoose = require('mongoose');
var bigData = require('./model');
 
exports.get = function (req, res) {
     
  var dataFile = './StockEtablissement_utf8.csv';
 
  var data = [];
         
  csv
    .fromString(dataFile.toString(), {
        headers: true,
        ignoreEmpty: true
    })
    .on("data", function(data){
        data['_id'] = new mongoose.Types.ObjectId();
          
        data.push(data);
    })
    .on("end", function(){
        bigData.create(data, function(err, documents) {
          if (err) throw err;
        });
          
        res.send(data.length + ' data have been successfully uploaded.');
     });
};