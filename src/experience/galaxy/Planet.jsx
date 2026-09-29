import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  sunVertexShader,
  sunFragmentShader,
  rockyVertexShader,
  rockyFragmentShader,
  venusVertexShader,
  venusFragmentShader,
  earthVertexShader,
  earthFragmentShader,
  marsVertexShader,
  marsFragmentShader,
  jupiterVertexShader,
  jupiterFragmentShader,
  uranusVertexShader,
  uranusFragmentShader,
  glowVertexShader,
  glowFragmentShader,
} from "./planetShaders"

// Returns the RAW (unclamped) progress: negative before the chapter
// starts, 0..1 during it, >1 after it ends. This lets us tell "hasn't
// arrived yet" (raw < 0) apart from "just arrived" (raw = 0), which a
// clamped value cannot distinguish.
function getRawChapterProgress(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return -1

  const vh = window.innerHeight
  const sectionTop = el.offsetTop
  return (window.scrollY - sectionTop) / vh
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
  axialTilt = 0,
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

  const vertexShader =
    variant === "sun"
      ? sunVertexShader
      : variant === "venus"
      ? venusVertexShader
      : variant === "earth"
      ? earthVertexShader
      : variant === "mars"
      ? marsVertexShader
      : variant === "jupiter"
      ? jupiterVertexShader
      : variant === "uranus"
      ? uranusVertexShader
      : rockyVertexShader
  const fragmentShader =
    variant === "sun"
      ? sunFragmentShader
      : variant === "venus"
      ? venusFragmentShader
      : variant === "earth"
      ? earthFragmentShader
      : variant === "mars"
      ? marsFragmentShader
      : variant === "jupiter"
      ? jupiterFragmentShader
      : variant === "uranus"
      ? uranusFragmentShader
      : rockyFragmentShader
  const lightColor = variant === "sun" ? "#FFA35C" : "#9AAEDD"

  useFrame((state, delta) => {
    if (!coreRef.current || !groupRef.current) return

    const raw = getRawChapterProgress(sectionId)

    // Completely hidden before the chapter starts or well after it ends.
    const isActive = raw > -0.05 && raw < 1.05
    groupRef.current.visible = isActive

    if (!isActive) return

    if (!reduceMotion) {
      coreUniforms.uTime.value += delta
      groupRef.current.rotation.y += delta * 0.03
    }

    const t = Math.min(1, Math.max(0, raw))
    const eased = t * t * (3 - 2 * t)

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, exitX, eased)
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, exitZ, eased)

    // Fully visible from chapter start, fades out in the final third.
    const fade = Math.max(0, 1 - Math.max(0, t - 0.65) / 0.35)

    coreUniforms.uOpacity.value = fade
    glowUniforms.uOpacity.value = fade * 0.55

    const scale = THREE.MathUtils.lerp(1, 0.65, eased)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={[startX, startY, startZ]} rotation={[0, 0, axialTilt]} visible={false}>
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
