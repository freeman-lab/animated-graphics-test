import { useState, useEffect } from 'react'

const Cube = () => {
  const [rotation, setRotation] = useState(45)
  const [rotating, setRotating] = useState(false)

  console.log(rotation)

  // useEffect(() => {
  //   if (rotation == 360) {
  //     setIncreasing(false)
  //   }
  //   if (rotation == 0) {
  //     setIncreasing(true)
  //   }
  // }, [rotation])

  useEffect(() => {
    if (rotating) {
      setTimeout(() => {
          setRotation(rotation => rotation + 5)
      }, 50)
    } else {
      setRotation(160)
    }
  }, [rotating, rotation])

  return <div 
    onMouseEnter={() => setRotating(true)}
    onMouseLeave={() => setTimeout(() => setRotating(false), 600)}
    style={{
      width: '150px', 
      height: '150px',
      marginLeft: '50px',
      marginTop: '50px',
      display: 'inline-block'
    }}
    >
    <div style={{
      width: '100%', 
      height: '100%',
      perspective: '10000px',
      backfaceVisibility: 'visible',
      perspectiveOrigin: '100% 100%',
      transition: '0.5s',
      transformStyle: 'preserve-3d',
      transformOrigin: '50px 50px 0px',
      transform: `rotateX(${rotation}deg) rotateY(${rotation}deg) rotateZ(${rotation/2}deg)`,
    }}
    >
      <div style={{
        transform: 'translateZ(50px)',
        border: 'solid 1px black',
        opacity: 0.5,
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'absolute'
      }}
      >
        <svg viewBox='0 0 30 30'>
          <circle cx='15' cy='15' r='10'/>
        </svg>
      </div>
      <div style={{
        transform: 'rotateY(180deg) translateZ(50px)',
        opacity: 0.5,
        border: 'solid 1px black',
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'absolute'
      }}
      />
      <div style={{
        transform: 'rotateY(90deg) translateZ(50px)',
        opacity: 0.5,
        border: 'solid 1px black',
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'absolute'
      }}
      />
      <div style={{
        transform: 'rotateY(-90deg) translateZ(50px)',
        opacity: 0.5,
        border: 'solid 1px black',
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'absolute'
      }}
      />
      <div style={{
        transform: 'rotateX(90deg) translateZ(50px)',
        opacity: 0.5,
        border: 'solid 1px black',
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'absolute'
      }}
      />
      <div style={{
        transform: 'rotateX(-90deg) translateZ(50px)',
        opacity: 0.5,
        border: 'solid 1px black',
        width: '100px',
        height: '100px',
        display: 'block',
        position: 'absolute'
      }}
      />
    </div>
  </div>
}

const Index = () => {

  return (
    <div style={{backgroundColor: '#da4457'}}>
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
      <Cube />
    </div>
  )
}

export default Index