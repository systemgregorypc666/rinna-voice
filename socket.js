module.exports = function(io) {
  var sqlite3 = require('sqlite3').verbose();
  var twitter = require('twitter');
  var settings = require('./settings');

  var db = new sqlite3.Database('rinna.db');
  var client = new twitter({
    consumer_key: settings.consumer_key,
    consumer_secret: settings.consumer_secret,
    access_token_key: settings.access_token_key,
    access_token_secret: settings.access_token_secret
  });

  io.on('connection', function(socket) {
    socket.on('me', function(data) {
      var text = '@ms_rinna ' + data.text;
      client.post('statuses/update', { status: text },  function(error, tweet, response) {
        socket.emit('me', tweet);
        socket.broadcast.emit('me', tweet);
      });
    });

  	socket.on('rinna', function(data) {
      var tweet = {};
      db.serialize(function() {
        db.each('SELECT * FROM tweets WHERE in_reply_to_status_id_str = ' + data.id_str, function(err, row) {
          tweet = row;
        }, function(err, count) {
          if (count === 0) {
            tweet = {};
          }
          socket.emit('rinna', tweet);
        });
      });
  	});
  });
};
