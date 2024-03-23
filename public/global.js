window.onload = function() {
  const els = document.querySelectorAll("pre")
  if (!els.length) return

  const paddingX = 60
  const width = (window.innerWidth - els[0].clientWidth) / 2 + els[0].clientWidth - paddingX
  els.forEach(el => {
    el.style.minWidth = `${width}px`
  })
}
