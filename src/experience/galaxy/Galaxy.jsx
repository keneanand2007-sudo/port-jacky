import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import StarField from "./StarField"
import Planet from "./Planet"
import { isWebGLAvailable } from "../../utils/webgl"

function Galaxy() {
  const [webglOk, setWebglOk] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)

  useEffect(() => {
    setWebglOk(isWebGLAvailable())
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }, [])

  if (!webglOk) return null

  return (
    <div className="fixed inset-0" style={{ zIndex: -1 }} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 11], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <StarField reduceMotion={reduceMotion} />

        <Planet
          sectionId="hero-section"
          variant="sun"
          radius={2.4}
          startX={10}
          startY={0.5}
          startZ={-6}
          exitX={-14}
          exitZ={-14}
          glowColor="#FFB067"
          reduceMotion={reduceMotion}
        />

        <Planet
          sectionId="about-section"
          variant="rocky"
          radius={2.0}
          startX={10}
          startY={-0.3}
          startZ={-6}
          exitX={-14}
          exitZ={-14}
          glowColor="#9AAEDD"
          reduceMotion={reduceMotion}
        />

        <Planet
          sectionId="skills-section"
          variant="venus"
          radius={2.2}
          startX={10}
          startY={0.2}
          startZ={-6}
          exitX={-14}
          exitZ={-14}
          glowColor="#E8B458"
          reduceMotion={reduceMotion}
        />
      </Canvas>
    </div>
  )
}

export default Galaxy
