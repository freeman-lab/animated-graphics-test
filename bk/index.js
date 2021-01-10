import { useState, useEffect } from 'react'

const Cube = () => {
  const [rotation, setRotation] = useState(45)
  const [velocity, setVelocity] = useState(0)
  const [target, setTarget] = useState(0)

  useEffect(() => {
    setTimeout(() => {
      setRotation(rotation => rotation + velocity * 1)
    }, 50)
  }, [velocity, rotation])

  useEffect(() => {
    setVelocity(velocity => velocity + 0.1 * (target - velocity))
  }, [target, velocity])

  return <div 
    onMouseEnter={() => setTarget(1)}
    onMouseLeave={() => setTarget(0)}
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
      transform: `rotateX(${rotation}deg) rotateY(${rotation}deg) rotateZ(${0}deg)`,
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