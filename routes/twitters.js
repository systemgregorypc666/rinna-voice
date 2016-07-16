var express = require('express');
var twitter = require('twitter');
var sqlite3 = require('sqlite3').verbose();

var settings = require('../settings');

var router = express.Router();
var client = new twitter({
  consumer_key: settings.consumer_key,
  consumer_secret: settings.consumer_secret,
  access_token_key: settings.access_token_key,
  access_token_secret: settings.access_token_secret
});

var db = new sqlite3.Database('rinna.db');

router.get('/tweets', function(req, res, next) {
  var data = {};
  db.serialize(function() {
    db.each('SELECT * FROM tweets WHERE in_reply_to_status_id_str = ' + req.param('id'), function(err, row) {
      data = row;
    }, function(err, count) {
      if (count === 0) { data = {}; }
      res.json(data);
    });
  });
});

router.post('/tweets', function(req, res, next) {
  var text = '@ms_rinna ' + req.body.text;
  client.post('statuses/update', { status: text },  function(error, tweet, response) {
    res.json(tweet);
  });
});

module.exports = router;
