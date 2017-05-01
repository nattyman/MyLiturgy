import express from 'express';
// import request from 'request';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';
// import https from 'https'; // used to get api responses
var request = require('request-json');

// var contemplationVideo = require("../src/video/CONTEMPLATION-low.mp4"); // eslint-disable-line no-unused-vars



// const router = express.Router();

/* eslint-disable no-console */

const port = 3000;
const app = express();
const compiler = webpack(config);

app.set('view engine', 'ejs');
app.use(express.static('../src/video'));
app.use('/static', express.static(path.join(__dirname, '../src/video')));

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
  res.json([{
      "id": 1,
      "title": "Beginner",
      "description": "Start here: Learn to meditate",
      "path": "/meditations/contemplation"
    },
    {
      "id": 2,
      "title": "Guided",
      "description": "Go here next: Guided meditation",
      "path": "/meditations/contemplation"

    },
    {
      "id": 3,
      "title": "Unguided",
      "description": "Quiet and calm environment for self guided meditation",
      "path": "/meditations/contemplation"

    },
  ]);
});

app.get('/meditations/contemplation', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/contemplation.html'));
});


// ROUTE LECTIONARY //
app.get('/lectionary', function(req, res) {
  res.sendFile(path.join(__dirname, '../src/lectionary.html'));
});

// GET TODAYS DATE //
var today = getTodaysDate();
console.log("**Today is: " + today);

// READ LECTIONARY JSON FILE //
var fs = require('fs');
var lectJson = JSON.parse(fs.readFileSync('./src/data/YearA1617.json', 'utf8'));

var i = 0;
for (i = 0; i < lectJson.length; i++) {

  var lectDate = lectJson[i].DTSTART;

  if (lectDate <= today) {
    var verses = lectJson[i].DESCRIPTION;
  }

}
// split the verses/description into individual verses in an array
var verseArray = [];
verseArray = verses.split("\\n");

console.log(verseArray);

// LOOP THROUGH

var response = [];

for (i = 0; i < (verseArray.length - 1); i++) {
  var scrubbedVerse = verseArray[i].replace(/(\d)[ab]/, '$1')
  var client = request.createClient('https://bible-api.com/');
  client.get(encodeURI(scrubbedVerse), function(err, res, body) {

    var verse = body.text.replace(/\n/g, '<br>')

    response.push({
      "reference": body.reference,
      "text": verse
    });
  });
}

app.get('/api/lectionary', function(req, res) {
  res.json(response);
});




app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
})

function getTodaysDate() {
  var date = new Date();
  var month = ("0" + (date.getMonth() + 1)).slice(-2);
  var year = date.getFullYear();
  var day = date.getDate();
  var today = (year + '' + month + '' + day);
  return today;
}
