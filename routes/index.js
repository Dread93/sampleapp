var express = require('express');
var router = express.Router();
var mongodb = require('mongodb');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/thelist', function(req, res){

  // Get a Mongo client to work with the Mongo sever
  var MongoClient = mongodb.MongoClient;

  // Define where the MongoDB server is
  var url = 'mongodb://localhost:27017/samplesite';

  // Connect to the sever
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
    // We are connected
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('tenants');

    // Find all the tenants
    collection.find({}).toArray(function (err, result) {
      if (err) {
        res.send(err);
      } else if (result.length) {
        res.render('tenantlist',{

          // Pass the returned database documents to Jade
          "tenantlist" : result
        });
      } else {
        res.send('No documents found');
      }
      // Close connection
      db.close();
    });
  }
  });
});


module.exports = router;
