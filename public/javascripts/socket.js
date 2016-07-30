var socket = io();

socket.on('me', function(tweet) {
  if (typeof tweet.text !== 'undefined') {
    var message = tweet.text.replace('@ms_rinna ', '');
    $('#chat-frame').append('<p class="chat-talk"><span class="talk-icon"><img src="./images/me.png" alt="me" class="icon"></span><span class="talk-content grey lighten-3 left-align">' + message + '</span></p>');
    $('#chat-frame').animate({scrollTop: $('#chat-frame')[0].scrollHeight}, 'fast');
    setTimeout(function() {
      socket.emit('rinna', { id_str: tweet.id_str });
    }, 3000);
  }
});

socket.on('rinna', function(tweet) {
  if (typeof tweet.text !== 'undefined') {
    var message = tweet.text.replace('@rinna_voice ', '');
    $('#chat-frame').append('<p class="chat-talk rinna"><span class="talk-icon"><img src="./images/rinna.jpg" alt="rinna" class="icon"></span><span class="talk-content green accent-1 right-align">' + message + '</span></p>');
    $('#chat-frame').animate({scrollTop: $('#chat-frame')[0].scrollHeight}, 'fast');
    $('.chat').append('<audio src="../voices/' + tweet.id_str + '.wav" autoplay></audio>');
  }
});
