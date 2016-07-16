$(function() {
  $('body').on("click keydown", function(e) {
    // Enterキー以外の場合は対象外
    if (e.keyCode !== 13) { return; }

    // フォーカスされている要素のidがmessage以外の場合は対象外
    var id = $(':focus').attr('id');
    if (id !== 'message') { return; }

    // messageが空文字列の場合は対象外
    var message = $('#' + id).val();
    if (message === '') { return; }

    // 追加
    $('#chat-frame').append('<p class="chat-talk"><span class="talk-icon"><img src="./images/me.png" alt="me" class="icon"></span><span class="talk-content grey lighten-3 left-align">' + message + '</span></p>');

    // スクロール
    $('#chat-frame').animate({scrollTop: $('#chat-frame')[0].scrollHeight}, 'fast');

    // 初期化
    $('#' + id).val('');

    // Tweet
    $.ajax({
      url: '/twitters/tweets',
      type: 'POST',
      data: {
        text: message
      },
      dataType: 'html'
    })
    .done(function(data, textStatus, jqXHR) {



      $.ajax({
        url: '/twitters/tweets',
        type: 'GET',
        data: {
          id: data.id_str
          // id: '754180908731604992'
        },
        dataType: 'html'
      })
      .done(function(data2, textStatus, jqXHR) {
        alert(data2);
      })
      .fail(function(jqXHR, textStatus, errorThrown) {
        alert("fail");
      });



    })
    .fail(function(jqXHR, textStatus, errorThrown) {
      alert("fail");
    });
  });
});
