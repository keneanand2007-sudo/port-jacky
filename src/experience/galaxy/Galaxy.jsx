import { useState, useEffect } from "react"
import { Canvas } from "@react-three/fiber"
import StarField from "./StarField"
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
    <div
      className="fixed inset-0"
      style={{ zIndex: -1 }}
      aria-hidden="true"
    >
      <Canvas
        camera={{ position: [0, 0, 30], fov: 60 }}
        gl={{ alpha: true, antialias: true }}
        dpr={[1, 1.5]}
      >
        <StarField reduceMotion={reduceMotion} />
      </Canvas>
    </div>
  )
}

export default Galaxy
