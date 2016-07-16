$(function() {
  $('body').on("click keydown", function(e) {
    if (e.keyCode !== 13) { return; }

    var id = $(':focus').attr('id');
    if (id !== 'message') { return; }

    var message = $('#' + id).val();
    if (message === '') { return; }

    $('#chat-frame').append('<p class="chat-talk"><span class="talk-icon"><img src="./images/me.png" alt="me" class="icon"></span><span class="talk-content grey lighten-3 left-align">' + message + '</span></p>');
    $('#chat-frame').animate({scrollTop: $('#chat-frame')[0].scrollHeight}, 'fast');
    $('#' + id).val('');

    $.ajax({
      url: '/twitters/tweets',
      type: 'POST',
      data: {
        text: message
      },
      dataType: 'html'
    })
    .done(function(data, textStatus, jqXHR) {
      var d = JSON.parse(data);
      setTimeout(function() {
        $.ajax({
          url: '/twitters/tweets',
          type: 'GET',
          data: {
            id: d['id_str']
          },
          dataType: 'html'
        })
        .done(function(data2, textStatus, jqXHR) {
          var d2 = JSON.parse(data2);
          var m = d2['text'];
          m = m.replace( /@rinna_voice /g , "");
          $('#chat-frame').append('<p class="chat-talk rinna"><span class="talk-icon"><img src="./images/rinna.jpg" alt="rinna" class="icon"></span><span class="talk-content green accent-1 right-align">' + m + '</span></p>');
          $('#chat-frame').animate({scrollTop: $('#chat-frame')[0].scrollHeight}, 'fast');
        })
        .fail(function(jqXHR, textStatus, errorThrown) {
          alert("fail");
        });
      }, 1000);
    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("fail");
    });
  });
});
