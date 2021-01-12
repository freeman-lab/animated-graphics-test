var INIT_ROTATION = 0
var RAMP_ON = 0.1
var MAX_SPEED = 3
var WIDTH = 125
var MARGIN = 45

setup()

window.onresize = setup

function setup() {
  var el = document.getElementById('chapter-4-animation')
  while (el.firstChild) {
    el.removeChild(el.firstChild)
  }
  var width = WIDTH
  var margin = MARGIN
  var height = el.offsetHeight

  var ncubes = Math.floor(el.offsetWidth / (width + margin * 2)) * Math.floor(height / (width + margin * 2))

  var cubes = []

  for (var i = 0; i < ncubes; i++) {
    cubes[i] = createContainer(i, width, width, margin)
    el.appendChild(cubes[i].container)
  }

  function update() {
    for (var i = 0; i < ncubes; i++) {
      cubes[i].update()
    }
    window.requestAnimationFrame(update)
  }
  window.requestAnimationFrame(update)
}

function createContainer(i, width, height, margin) {
  var init = INIT_ROTATION
  var rotation = INIT_ROTATION
  var velocity = 0
  var target = 0
  var state = 0
  var ramp = 0

  var container = document.createElement('div')
  container.classList.add('container')

  var cube = createCube(i)
  container.appendChild(cube.el)

  container.addEventListener('mouseenter', function() {
    target = MAX_SPEED
    state = 1
    ramp = 0
  })

  container.addEventListener('mouseleave', function() {
    target = 0
    state = -1
    ramp = 0
  })

  style(width, height, margin)

  function style(width, height, margin) {
    container.style.width = `${width}px`
    container.style.height = `${height}px`
    container.style.margin = `${margin}px`
    cube.style(width, height)
  }

  function update() {
    if (state == 1) {
      velocity += (target - velocity) * RAMP_ON
      velocity = Math.min(Math.max(velocity, 0), MAX_SPEED)
      rotation += 1 * velocity
    }
    if (state == -1) {
      if (Math.abs(rotation.toFixed(0) - init) < 0.1) {
        state = 0
        rotation = INIT_ROTATION
      }
      if (ramp == 0) {
        velocity = MAX_SPEED
        if (rotation > init) {
          ramp = 4 * Math.log(2) / ((init + 360 - rotation) + 0.01)
        } else {
          ramp = 4 * Math.log(2) / ((init - rotation) + 0.01)
        }
      }
      velocity += (target - velocity) * ramp
      velocity = Math.min(Math.max(velocity, 0), MAX_SPEED)
      rotation += 1 * velocity
    }
    if (rotation >= 360) {
      rotation = (rotation - 360)
    }
    cube.el.style.transform = `rotateX(${rotation}deg) rotateY(${rotation}deg) rotateZ(${0}deg)`
  }

  return {
    container: container,
    update: update,
    style: style
  }
}

function createCube(i) {
  var cube = document.createElement('div')
  cube.id='cube-' + i
  cube.classList.add('cube')
  var faces = {}
  for (var j = 0; j < 8; j++) {
    faces[j] = cube.appendChild(createTriangle())
  }

  function style(width, height) {
    var base = `position: absolute; width: ${width}px; height: ${height}px`
    var transforms = {
      0: `transform: translateZ(${-width/2}px);`,
      1: `transform: translateZ(${width/2}px);`,
      2: `translateZ(${0}px);`,
      3: `translateZ(${0}px);`,
      4: `translateZ(${0}px);`,
      5: `translateZ(${0}px);`,
      6: `translateZ(${0}px);`,
      7: `translateZ(${0}px);`,
    }
    for (var j = 0; j < 8; j++) {
      faces[j].setAttribute('style', transforms[j] + base)
      faces[j].style.width = `${width}px`
      faces[j].style.height = `${height}px`
    }
    cube.style.transformOrigin = `${width*0.5}px ${width*0.65}px 0px`
  }
  return {
    el: cube,
    style: style
  }
}

function createTriangle() {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 100 100')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'black')
  svg.setAttribute('stroke-width', 1)
  svg.setAttribute('stroke-opacity', 0.5)
  var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  polygon.setAttribute('points', '0 100, 50 13.397, 100 100')
  svg.appendChild(polygon)
  return svg
}