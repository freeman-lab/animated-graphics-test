var INIT_ROTATION = 160
var RAMP_ON = 0.1
var MAX_SPEED = 3
var WIDTH = 125
var MARGIN = 45

setup()

window.onresize = setup

function setup() {
  var el = document.getElementById('chapter-3-animation')
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
  var list = ['front', 'back', 'left', 'right']
  var faces = {}
  for (var j = 0; j < 4; j++) {
    faces[list[j]] = cube.appendChild(createFace(list[j], i))
  }

  function style(width, height) {
    var transforms = {
      'front': `translateZ(${0}px)`,
      'back': `rotateY(120deg) translateZ(${0}px)`,
      'left': `rotateX(90deg) translateZ(${0}px)`,
      'right': `rotateY(60deg) translateZ(${0}px)`,
    }
    for (var j = 0; j < 4; j++) {
      faces[list[j]].style.transform = transforms[list[j]]
      faces[list[j]].style.width = `${width}px`
      faces[list[j]].style.height = `${height}px`
      faces[list[j]].style.borderRadius = `${height/2}px`
    }
    cube.style.transformOrigin = `${width/2}px ${width/2}px 0px`
  }
  return {
    el: cube,
    style: style
  }
}

function createFace(name, i) {
  var face = document.createElement('div')
  face.classList.add('face')
  return face
}