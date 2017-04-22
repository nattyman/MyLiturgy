import express from 'express';
import path from 'path';
import open from 'open';
import webpack from 'webpack';
import config from '../webpack.config.dev';

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

app.listen(port, function(err) {
  if (err) {
    console.log(err);
  } else {
    open('http://localhost:' + port);
  }
})
