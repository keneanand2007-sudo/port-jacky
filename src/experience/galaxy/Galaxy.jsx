import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import StarField from "./StarField"
import Sun from "./Sun"
import Mercury from "./Mercury"
import { isWebGLAvailable } from "../../utils/webgl"
import { useSectionProgress } from "../../hooks/useScrollProgress"

function Galaxy() {
  const [webglOk, setWebglOk] = useState(true)
  const [reduceMotion, setReduceMotion] = useState(false)
  const sunProgress = useSectionProgress("hero-section")
  const mercuryProgress = useSectionProgress("about-section")

  useEffect(() => {
    setWebglOk(isWebGLAvailable())
    setReduceMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
  }, [])

  if (!webglOk) return null

  return (
    <div
      className="fixed inset-0"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 11], fov: 50 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <StarField reduceMotion={reduceMotion} />
        <Sun scrollProgress={sunProgress} reduceMotion={reduceMotion} />
        <Mercury progress={mercuryProgress} reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  )
}

export default Galaxy
