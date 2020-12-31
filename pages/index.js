import { useState, useEffect } from 'react'

const Index = () => {
  const [rotation, setRotation] = useState(0)
  console.log(rotation)

  useEffect(() => {
    const interval = setInterval(() => {
      setRotation(rotation => rotation + 5)
    }, 50)
    return () => clearInterval(interval)
  }, [])

  return (
    <div>
      <div style={{
        width: '200px', 
        height: '200px',
        margin: '75px 0 0 75px'
      }}>
        <div style={{
          width: '100%', 
          height: '100%',
          perspective: '10000px',
          backfaceVisibility: 'visible',
          perspectiveOrigin: '100% 100%',
          transition: '0.05s',
          transformStyle: 'preserve-3d',
          transformOrigin: '50px 50px 0px',
          transform: `rotateX(${rotation}deg) rotateY(${rotation}deg) rotateZ(${rotation/2}deg)`,
        }}
        >
          <div style={{
            transform: 'translateZ(50px)',
            border: 'solid 1px black',
            width: '100px',
            height: '100px',
            display: 'block',
            position: 'absolute'
          }}
          />
          <div style={{
            transform: 'rotateY(180deg) translateZ(50px)',
            border: 'solid 1px black',
            width: '100px',
            height: '100px',
            display: 'block',
            position: 'absolute'
          }}
          />
          <div style={{
            transform: 'rotateY(90deg) translateZ(50px)',
            border: 'solid 1px black',
            width: '100px',
            height: '100px',
            display: 'block',
            position: 'absolute'
          }}
          />
          <div style={{
            transform: 'rotateY(-90deg) translateZ(50px)',
            border: 'solid 1px black',
            width: '100px',
            height: '100px',
            display: 'block',
            position: 'absolute'
          }}
          />
          <div style={{
            transform: 'rotateX(90deg) translateZ(50px)',
            border: 'solid 1px black',
            width: '100px',
            height: '100px',
            display: 'block',
            position: 'absolute'
          }}
          />
          <div style={{
            transform: 'rotateX(-90deg) translateZ(50px)',
            border: 'solid 1px black',
            width: '100px',
            height: '100px',
            display: 'block',
            position: 'absolute'
          }}
          />
        </div>
      </div>
    </div>
  )
}

export default Index