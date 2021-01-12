var INIT_ROTATION = 160
var RAMP_ON = 0.1
var MAX_SPEED = 3
var WIDTH = 125
var MARGIN = 45

setup()

window.onresize = setup

function setup() {
  var el = document.getElementById('chapter-1-animation')
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
  var faces = []
  for (var j = 0; j < 2; j++) {
    faces[j] = cube.appendChild(createTriangle())
  }
  for (var j = 2; j < 5; j++) {
    faces[j] = cube.appendChild(createSquare())
  }

  console.log(faces)

  function style(width, height) {
    var base = `position: absolute; width: ${width}px; height: ${height}px`
    var transforms = {
      0: `transform: translateZ(${-width/2}px);`,
      1: `transform: translateZ(${width/2}px);`,
      2: `transform: translateY(${width/2}px) rotateX(90deg);`,
      3: `transform: translateX(${width * 0.25}px) translateY(${width * 0.065}px) rotateY(90deg) rotateX(30deg);`,
      4: `transform: translateX(${-width * 0.25}px) translateY(${width * 0.065}px) rotateY(90deg) rotateX(-30deg);`
    }
    for (var j = 0; j < 5; j++) {
      faces[j].setAttribute('style', transforms[j] + base)
    }
    cube.style.transformOrigin = `${width*0.5}px ${width*0.68}px 0px`
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

function createSquare() {
  var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
  svg.setAttribute('viewBox', '0 0 100 100')
  svg.setAttribute('fill', 'none')
  svg.setAttribute('stroke', 'black')
  svg.setAttribute('stroke-width', 1)
  svg.setAttribute('stroke-opacity', 0.5)
  var polygon = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
  polygon.setAttribute('points', '0 0, 0 100, 100 100, 100 0')
  svg.appendChild(polygon)
  return svg
}