var container = document.getElementById('cube-1')

container.classList.add('container')

var cube = createCube()

container.appendChild(cube)

var rotation = 0

setInterval(function () {
  rotation += 10
  cube.style.transform = `rotateX(${rotation}deg) rotateY(${rotation}deg) rotateZ(${0}deg)`
}, 100)

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