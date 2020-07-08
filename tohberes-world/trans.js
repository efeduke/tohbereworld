$('a').on('click', function(event) {
  event.preventDefault()

  const href = $(this).attr('href')

  window.history.pushState(null, null, href)

  $('a').removeClass('active')
  $(this).addClass('active')

  $.ajax({
    url: href,
    success: function(data) {
      $('p').fadeOut(250, function() {
        const newPage = $(data)
          .filter('section')
          .html()

        $('p').html(nnewPage)

        $$('p').fadeIn(250)
      })
    }
  })
})
