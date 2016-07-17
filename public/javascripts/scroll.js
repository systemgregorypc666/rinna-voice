$(function() {
  $('.wrapper').onepage_scroll({
    loop: false
  });

  $('.arrow').on('click', function() {
    $('.wrapper').moveDown();
  });
});
