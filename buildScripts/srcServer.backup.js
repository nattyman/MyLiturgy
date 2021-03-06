import express from 'express';
// import request from 'request';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
import https from 'https'; // used to get api responses

// const router = express.Router();

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.get('/', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/index.html'));
});

// MEDITATIONS //
app.get('/meditations', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/meditations.html'));
});

app.get('/api/meditations', function(req, res) {
//Pretend this is hitting a database
  res.json([
    {"id": 1,"title":"Beginner","description":"Start here: Learn to meditate"},
    {"id": 2,"title":"Guided","description":"Go here next: Guided meditation"},
    {"id": 3,"title":"Unguided","description":"Quiet and calm environment for self guided meditation"},
  ]);
});

// LECTIONARY //
app.get('/lectionary', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/lectionary.html'));
});

// GET BIBLE VERSE //
var bibleUrl = {
  host: 'bible-api.com',
  port: '443',
  path: '/jn%203:17'
};
var verse = https.get(bibleUrl, function(res) {
    var body = '';
    res.on('data', function(chunk){
      body += chunk;
    });
    res.on('end', function(){
      var response = JSON.parse(body);
      console.log("Got a response: ", response);
    });
  }).on('error', function(e){
    console.log("Got an error: ", e);
  })

app.get('/api/lectionary', function(req, res) {
//Pretend this is hitting a database


res.json(verse);
// http://stackoverflow.com/questions/11826384/calling-a-json-api-with-node-js
//   res.json(http.get(bibleUrl, function(res) {
//     var body = '';
//     res.on('data', function(chunk){
//       body += chunk;
//     });
//     res.on('end', function(){
//       var response = JSON.parse(body);
//       console.log("Got a response: ", response);
//     });
//   }).on('error', function(e){
//     console.log("Got an error: ", e);
//   })
// )
})
    //     console.log("Got response: " + res.statusCode);
    //   }).on('error', function(e) {
    //     console.log("Got error: " + e.message);
    //   })
    // )
// console.log(verse);
// console.alert('verse');
// res.send(verse);

// module.exports = http;
  // res.json([
  //   {"reference":"John 3:16","verses":[{"book_id":"JHN","book_name":"John","chapter":3,"verse":16,"text":"\nFor God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.\n\n"}],"text":"\nFor God so loved the world, that he gave his one and only Son, that whoever believes in him should not perish, but have eternal life.\n\n","translation_id":"web","translation_name":"World English Bible","translation_note":"Public Domain"}
  // ]);
// });

// router.get('/api/lectionary', function(req, res) {
// //Pretend this is hitting a database
//   request({
//     uri: 'https://bible-api.com/jn%203:16',
//   }).pipe(res);
// });
//
// module.exports = router;
// http://stackoverflow.com/questions/39301227/external-api-calls-with-express-node-js-and-require-module

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
})
