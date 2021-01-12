var arrows = [createContainer()]
document.getElementById('landing-animation').appendChild(arrows[0].container)

function update() {
  arrows[0].update()
  window.requestAnimationFrame(update)
}
window.requestAnimationFrame(update)

function createContainer() {
  var rotation = 0

  var container = document.createElement('div')
  container.classList.add('container')

  var arrow = createArrow()
  container.appendChild(arrow)

  function update() {
    rotation += 1
    arrow.style.transform = `rotateX(${20}deg) rotateY(${rotation}deg) rotateZ(${0}deg)`
  }

  return {
    update: update,
    container: container
  }
}

function createArrow() {
  var arrow = document.createElement('div')
  arrow.classList.add('arrow')
  arrow.appendChild(createFace('front'))
  arrow.appendChild(createFace('back'))
  arrow.appendChild(createFace('top'))
  arrow.appendChild(createFace('left'))
  arrow.appendChild(createFace('right'))
  arrow.appendChild(createFace('bottom-left'))
  arrow.appendChild(createFace('bottom-right'))
  arrow.appendChild(createFace('left-side'))
  arrow.appendChild(createFace('right-side'))
  return arrow
}

function createFace(name) {
  var y = 80
  var z = 214
  var h = 264
  var transforms = {
    'front': {
      transform: 'translateZ(50px)',
      width: '100px',
      height: '300px'
    },
    'back': {
      transform: 'translateZ(-50px)',
      width: '100px',
      height: '300px'
    },
    'top': {
      transform: 'rotateX(-90deg) translateZ(-50px)',
      width: '100px',
      height: '95px'
    },
    'left': {
      transform: 'rotateX(-135deg) translateY(-6px) translateZ(177px)',
      width: '100px',
      height: '200px'
    },
    'right': {
      transform: 'rotateX(-45deg) translateY(6px) translateZ(177px)',
      width: '100px',
      height: '200px'
    },
    'bottom-left': {
      transform: `rotateX(-135deg) translateY(-80px) translateZ(216px)`,
      width: '100px',
      height: '267px'
    },
    'bottom-right': {
      transform: 'rotateX(-45deg) translateY(80px) translateZ(216px)',
      width: '100px',
      height: '267px'
    },
    'left-side': {
      transform: `rotateX(-180deg) translateY(-160px) translateZ(-191px)`,
      width: '100px',
      height: `85px`
    },
    'right-side': {
      transform: `rotateX(180deg) translateY(-160px) translateZ(191px)`,
      width: '100px',
      height: `85px`
    }
  }
  var face = document.createElement('div')
  face.classList.add('face')
  face.style.width = transforms[name].width
  face.style.height = transforms[name].height
  face.style.transform = transforms[name].transform
  return face
}