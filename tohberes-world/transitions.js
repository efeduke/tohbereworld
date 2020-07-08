$('nav').on('click', function(event) {
  event.preventDefault()

  const href = $(this).attr('href')

  window.history.pushState(null, null, href)

  $('nav').removeClass('active')
  $(this).addClass('active')

  $.ajax({
    url: href,
    success: function(data) {
      $('div').fadeOut(250, function() {
        const newPage = $(data)
          .filter('div')
          .html()

        $('div').html(newPage)

        $('section').fadeIn(250)
      })
    }
  })
})
