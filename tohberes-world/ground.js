var angle = 0

var changeBackground = function() {
  angle = angle + 0.5

  document.body.style.backgroundImage =
    'linear-gradient(' + angle + 'deg, #05730f, #471c91, #ffffff)'
  document.body.style.backgroundSize = 'cover'

  requestAnimationFrame(changeBackground)
}

changeBackground()
