/* const createCsvWriter = require('csv-writer').createObjectCsvWriter;  
const csv = require('csvtojson')

const csvWriter = createCsvWriter({
  path: 'mock.csv',
  header: [
    {id: 'siren', title: 'siren'},
    {id: 'nic', title: 'nic'},
    {id: 'statutdiffusionetablissement', title: 'statutdiffusionetablissement'},
    {id: 'datecreationetablissement', title: 'datecreationetablissement'},
    {id: 'trancheeffectifsetablissement', title: 'trancheeffectifsetablissement'},
    {id: 'anneeeffectifsetablissement', title: 'anneeeffectifsetablissement'},
    {id: 'activiteprincipaleregistremetiersetablissement', title: 'activiteprincipaleregistremetiersetablissement'},
    {id: 'to_char', title: 'to_char'},
    {id: 'etablissementsiege', title: 'etablissementsiege'},
    {id: 'nombreperiodesetablissement', title: 'nombreperiodesetablissement'},
    {id: 'complementadresseetablissement', title: 'complementadresseetablissement'},
    {id: 'numerovoieetablissement', title: 'numerovoieetablissement'},
    {id: 'indicerepetitionetablissement', title: 'indicerepetitionetablissement'},
    {id: 'typevoieetablissement', title: 'typevoieetablissement'},
    {id: 'libellevoieetablissement', title: 'libellevoieetablissement'},
    {id: 'codepostaletablissement', title: 'codepostaletablissement'},
    {id: 'libellecommuneetablissement', title: 'libellecommuneetrangeretablissement'},
    {id: 'codecommuneetablissement', title: 'codecommuneetablissement'},
    {id: 'codecedexetablissement', title: 'codecedexetablissement'},
    {id: 'libellecedexetablissement', title: 'libellecedexetablissement'},
    {id: 'codepaysetrangeretablissement', title: 'codepaysetrangeretablissement'},
    {id: 'libellepaysetrangeretablissement', title: 'libellepaysetrangeretablissement'},
    {id: 'complementadresse2etablissement', title: 'complementadresse2etablissement'},
    {id: 'numerovoie2etablissement', title: 'numerovoie2etablissement'},
    {id: 'indicerepetition2etablissement', title: 'indicerepetition2etablissement'},
    {id: 'typevoie2etablissementtypevoie2etablissement', title: 'typevoie2etablissement'},
    {id: 'libellevoie2etablissement', title: 'libellevoie2etablissement'},
    {id: 'codepostal2etablissement', title: 'codepostal2etablissement'},
    {id: 'libellecommune2etablissement', title: 'libellecommune2etablissement'},
    {id: 'libellecommuneetranger2etablissement', title: 'libellecommuneetranger2etablissement'},
    {id: 'distributionspeciale2etablissement', title: 'distributionspeciale2etablissement'},
    {id: 'codecommune2etablissement', title: 'codecommune2etablissement'},
    {id: 'codecedex2etablissement', title: 'codecedex2etablissement'},
    {id: 'libellecedex2etablissement', title: 'libellecedex2etablissement'},
    {id: 'codepaysetranger2etablissement', title: 'codepaysetranger2etablissement'},
    {id: 'libellepaysetranger2etablissement', title: 'libellepaysetranger2etablissement'},
    {id: 'datedebut', title: 'datedebut'},
    {id: 'etatadministratifetablissement', title: 'etatadministratifetablissement'},
    {id: 'enseigne1etablissement', title: 'enseigne1etablissement'},
    {id: 'enseigne2etablissement', title: 'enseigne2etablissement'},
    {id: 'enseigne3etablissement', title: 'enseigne3etablissement'},
    {id: 'denominationusuelleetablissement', title: 'denominationusuelleetablissement'},
    {id: 'activiteprincipaleetablissement', title: 'activiteprincipaleetablissement'},
    {id: 'nomenclatureactiviteprincipaleetablissement', title: 'nomenclatureactiviteprincipaleetablissement'},
    {id: 'caractereemployeuretablissement', title: 'caractereemployeuretablissement'}
  ]
})
function convertToCSV(objArray) {
    var array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
    var str = '';

    for (var i = 0; i < array.length; i++) {
        var line = '';
        for (var index in array[i]) {
            if (line != '') line += ','

            line += array[i][index];
        }

        str += line + '\r\n';
    }

    return str;
}

csv()
  .fromFile('mock.csv')
  .then(jsonObj => {
    var jsonObject = JSON.stringify(jsonObj)
    var data = convertToCSV(jsonObject)
    //console.log(jsonObj)
    console.log(data)
    //csvWriter  
    //  .writeRecords(data)
  })
*/

  /* 

siren,nic,siret,statutdiffusionetablissement,datecreationetablissement,trancheeffectifsetablissement,anneeeffectifsetablissement,activiteprincipaleregistremetiersetablissement,to_char,etablissementsiege,nombreperiodesetablissement,complementadresseetablissement,numerovoieetablissement,indicerepetitionetablissement,typevoieetablissement,libellevoieetablissement,codepostaletablissement,libellecommuneetablissement,libellecommuneetrangeretablissement,distributionspecialeetablissement,codecommuneetablissement,codecedexetablissement,libellecedexetablissement,codepaysetrangeretablissement,libellepaysetrangeretablissement,complementadresse2etablissement,numerovoie2etablissement,indicerepetition2etablissement,typevoie2etablissement,libellevoie2etablissement,codepostal2etablissement,libellecommune2etablissement,libellecommuneetranger2etablissement,distributionspeciale2etablissement,codecommune2etablissement,codecedex2etablissement,libellecedex2etablissement,codepaysetranger2etablissement,libellepaysetranger2etablissement,datedebut,etatadministratifetablissement,enseigne1etablissement,enseigne2etablissement,enseigne3etablissement,denominationusuelleetablissement,activiteprincipaleetablissement,nomenclatureactiviteprincipaleetablissement,caractereemployeuretablissement
000325175,00016,00032517500016,O,2000-09-26,,,3212ZZ,2015-03-18T00:58:59,false,3,,,,,MANIHI COTE MONTAGNE TUAMOTU,98770,MANIHI,,,98727,,,,,,,,,,,,,,,,,,,2009-05-27,F,,,,,32.12Z,NAFRev2,N
000325175,00024,00032517500024,O,2008-05-20,,,,2011-12-12T09:40:04,false,2,,1,,PL,LEONCE DE SEYNES,84140,AVIGNON,,,84007,,,,,,,,,,,,,,,,,,,2011-10-21,F,TAHITI PERLES CREATIONS,,,,47.89Z,NAFRev2,N
000325175,00016,00032517500016,O,2000-09-26,,,3212ZZ,2015-03-18T00:58:59,false,3,,,,,MANIHI COTE MONTAGNE TUAMOTU,98770,MANIHI,,,98727,,,,,,,,,,,,,,,,,,,2009-05-27,F,,,,,32.12Z,NAFRev2,N
000325175,00024,00032517500024,O,2008-05-20,,,,2011-12-12T09:40:04,false,2,,1,,PL,LEONCE DE SEYNES,84140,AVIGNON,,,84007,,,,,,,,,,,,,,,,,,,2011-10-21,F,TAHITI PERLES CREATIONS,,,,47.89Z,NAFRev2,N
000325175,00016,00032517500016,O,2000-09-26,,,3212ZZ,2015-03-18T00:58:59,false,3,,,,,MANIHI COTE MONTAGNE TUAMOTU,98770,MANIHI,,,98727,,,,,,,,,,,,,,,,,,,2009-05-27,F,,,,,32.12Z,NAFRev2,N
000325175,00024,00032517500024,O,2008-05-20,,,,2011-12-12T09:40:04,false,2,,1,,PL,LEONCE DE SEYNES,84140,AVIGNON,,,84007,,,,,,,,,,,,,,,,,,,2011-10-21,F,TAHITI PERLES CREATIONS,,,,47.89Z,NAFRev2,N

*/
/*

const truc = () => (
  new Promise((resolve)=> {
    entries.forEach(function(doc, done) {
      bulkUpdateOps.push({ "insertOne": { "document": doc } })
      if (bulkUpdateOps.length === 1000) {
        collection.bulkWrite(bulkUpdateOps).then(function(r) {
          // do something with result
        });
        bulkUpdateOps = [];
      }
    })
  })
)


truc().then(
  console.log('tets')
)

.then(
  process.send({
    type: 'process:end',
    data: {
      ended: true
    }
  })
)
*/

const csv = require('csvtojson')
const fs = require('fs')
const MongoClient = require('mongodb').MongoClient

const url = 'mongodb://localhost:27017/bigDataGD'
// const filename = 'split/output-0.csv'
const path = './mock'


const getNameSplitFile = () => (
  new Promise((resolve) => {
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
)

/*
* createNewEntries
* @param {Object} client 
* @param {array} entries 
* @return {object} client
*/
const createNewEntries = (client, entries, filename ) => (
  new Promise(resolve => {
    // Get the collection and bulk api artefacts
    const db = client.db('bigDataGD')
    const collection = db.collection('entries')
    let bulkUpdateOps = []

    entries.forEach(doc => {
      bulkUpdateOps.push({ "insertOne": { "document": doc } })
      if (bulkUpdateOps.length === 1000) {
        collection.bulkWrite(bulkUpdateOps).then(r => {
          // do something with result
        })
        bulkUpdateOps = []
      }
    })
    if (bulkUpdateOps.length > 0) {
      collection.bulkWrite(bulkUpdateOps).then(r => {
      })
    }
    file = filename.splice(1)
    if (file.length !== 0){
      truc(file)
    }
    resolve(client)
  })
)

const truc = (filename) => {
  console.log(filename)
  console.log(filename[0])
  csv()
  .fromFile('mock/'+filename[0])
  .then(jsonObj => {
    MongoClient.connect(url, (err, client) => {
      createNewEntries(client, jsonObj).then((res) => {
        res.close()
      })
    })
  })
}

getNameSplitFile().then(file => {
  truc(file)
})

