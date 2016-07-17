$(function() {
  $('body').on('click keydown', function(e) {
    if (e.keyCode !== 13) { return; }

    var id = $(':focus').attr('id');
    if (id !== 'message') { return; }

    var message = $('#' + id).val();
    if (message === '') { return; }
    $('#' + id).val('');

    socket.emit('me', { text: message });
  });
});
