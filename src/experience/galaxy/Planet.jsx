import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  sunVertexShader,
  sunFragmentShader,
  rockyVertexShader,
  rockyFragmentShader,
  glowVertexShader,
  glowFragmentShader,
} from "./planetShaders"

function getChapterProgress(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return 0

  const vh = window.innerHeight
  const sectionTop = el.offsetTop
  const t = (window.scrollY - sectionTop) / vh

  return Math.min(1, Math.max(0, t))
}

function Planet({
  sectionId,
  variant = "sun",
  radius = 2,
  startX = 10,
  startY = 0,
  startZ = -6,
  exitX = -14,
  exitZ = -14,
  glowColor = "#FFB067",
  reduceMotion,
}) {
  const coreRef = useRef(null)
  const groupRef = useRef(null)

  const coreUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOpacity: { value: 1 } }),
    []
  )
  const glowUniforms = useMemo(
    () => ({
      uOpacity: { value: 0.55 },
      uColor: { value: new THREE.Color(glowColor) },
    }),
    [glowColor]
  )

  const vertexShader = variant === "sun" ? sunVertexShader : rockyVertexShader
  const fragmentShader =
    variant === "sun" ? sunFragmentShader : rockyFragmentShader
  const lightColor = variant === "sun" ? "#FFA35C" : "#9AAEDD"

  useFrame((state, delta) => {
    if (!coreRef.current || !groupRef.current) return

    if (!reduceMotion) {
      coreUniforms.uTime.value += delta
      groupRef.current.rotation.y += delta * 0.03
    }

    const t = getChapterProgress(sectionId)
    const eased = t * t * (3 - 2 * t)

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, exitX, eased)
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, exitZ, eased)

    // Fully visible the instant this chapter starts (t=0).
    // Only fades out as the chapter's scroll window ends.
    const fade = Math.max(0, 1 - Math.max(0, t - 0.55) / 0.35)

    coreUniforms.uOpacity.value = fade
    glowUniforms.uOpacity.value = fade * 0.55

    const scale = THREE.MathUtils.lerp(1, 0.65, eased)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={[startX, startY, startZ]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial
          uniforms={coreUniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
        />
      </mesh>

      <mesh scale={radius * 1.3}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          uniforms={glowUniforms}
          vertexShader={glowVertexShader}
          fragmentShader={glowFragmentShader}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      <pointLight color={lightColor} intensity={1.8} distance={25} />
    </group>
  )
}

export default Planet
