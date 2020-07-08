var angle = 0

var changeBackground = function() {
  angle = angle + 0.5

  document.body.style.backgroundImage =
    'linear-gradient(' + angle + 'deg, #00000f, #471c91, #00000f)'
  document.body.style.backgroundSize = 'cover'

  requestAnimationFrame(changeBackground)
}

changeBackground()
