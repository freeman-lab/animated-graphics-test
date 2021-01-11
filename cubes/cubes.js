var N_CUBES = 12
var INIT_ROTATION = 160
var RAMP_ON = 0.1
var MAX_SPEED = 3

var cubes = []

for (var i = 0; i < N_CUBES; i++) {
  cubes[i] = createContainer(i)
  document.getElementById('cubes').appendChild(cubes[i].container)
}

function update() {
  for (var i = 0; i < N_CUBES; i++) {
    cubes[i].update()
  }
  window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

function createContainer(i) {
  var init = INIT_ROTATION
  var rotation = INIT_ROTATION
  var velocity = 0
  var target = 0
  var state = 0
  var ramp = 0

  var container = document.createElement('div')
  container.classList.add('container')

  var cube = createCube()
  container.appendChild(cube)

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
    cube.style.transform = `rotateX(${rotation}deg) rotateY(${rotation}deg) rotateZ(${0}deg)`
  }

  return {
    container: container,
    update: update
  }
}

function createCube() {
  var cube = document.createElement('div')
  cube.classList.add('cube')
  cube.appendChild(createFace('front'))
  cube.appendChild(createFace('back'))
  cube.appendChild(createFace('left'))
  cube.appendChild(createFace('right'))
  cube.appendChild(createFace('top'))
  cube.appendChild(createFace('bottom'))
  return cube
}

function createFace(name) {
  var transforms = {
    'front': 'translateZ(50px)',
    'back': 'rotateY(180deg) translateZ(50px)',
    'left': 'rotateY(90deg) translateZ(50px)',
    'right': 'rotateY(-90deg) translateZ(50px)',
    'top': 'rotateX(90deg) translateZ(50px)',
    'bottom': 'rotateX(-90deg) translateZ(50px)'
  }
  var face = document.createElement('div')
  face.classList.add('face')
  face.style.transform = transforms[name]
  return face
}