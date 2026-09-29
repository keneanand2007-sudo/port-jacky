import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

function getRawChapterProgress(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return -1

  const vh = window.innerHeight
  const sectionTop = el.offsetTop
  return (window.scrollY - sectionTop) / vh
}

function Rock({ position, scale, spinSpeed }) {
  const ref = useRef(null)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * spinSpeed * 0.6
    ref.current.rotation.y += delta * spinSpeed
  })

  return (
    <mesh ref={ref} position={position} scale={scale}>
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color="#6b625a"
        roughness={0.95}
        metalness={0.05}
        flatShading
      />
    </mesh>
  )
}

function AsteroidField({
  sectionId,
  count = 26,
  startX = 14,
  startZ = -6,
  exitX = -16,
  exitZ = -14,
  reduceMotion,
}) {
  const groupRef = useRef(null)

  const rocks = useMemo(() => {
    const list = []
    for (let i = 0; i < count; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 6,
        ],
        scale: 0.25 + Math.random() * 0.55,
        spinSpeed: 0.15 + Math.random() * 0.4,
      })
    }
    return list
  }, [count])

  useFrame(() => {
    if (!groupRef.current) return

    const raw = getRawChapterProgress(sectionId)
    const isActive = raw > -0.05 && raw < 1.05
    groupRef.current.visible = isActive

    if (!isActive) return

    const t = Math.min(1, Math.max(0, raw))
    const eased = t * t * (3 - 2 * t)

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, exitX, eased)
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, exitZ, eased)
  })

  return (
    <group ref={groupRef} position={[startX, 0, startZ]} visible={false}>
      <ambientLight intensity={0.4} />
      <pointLight color="#FFD9A0" intensity={1.2} distance={20} position={[-4, 2, 4]} />
      {!reduceMotion &&
        rocks.map((rock, i) => <Rock key={i} {...rock} />)}
      {reduceMotion &&
        rocks.slice(0, 10).map((rock, i) => <Rock key={i} {...rock} />)}
    </group>
  )
}

export default AsteroidField
