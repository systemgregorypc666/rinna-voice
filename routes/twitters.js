var express = require('express');
var twitter = require('twitter');

var settings = require('../settings');

var router = express.Router();
var client = new twitter({
  consumer_key: settings.consumer_key,
  consumer_secret: settings.consumer_secret,
  access_token_key: settings.access_token_key,
  access_token_secret: settings.access_token_secret
});

router.post('/tweets', function(req, res, next) {
  client.post('statuses/update', { status: req.body.text },  function(error, tweet, response) {
    res.json(response);
  });
});

module.exports = router;
