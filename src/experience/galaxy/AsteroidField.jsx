import { useRef, useMemo, useState } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import { projects } from "../../data/projects"

function getRawChapterProgress(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return -1

  const vh = window.innerHeight
  const sectionTop = el.offsetTop
  return (window.scrollY - sectionTop) / vh
}

function Rock({ position, scale, spinSpeed, project, index }) {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state, delta) => {
    if (!ref.current) return
    ref.current.rotation.x += delta * spinSpeed * 0.6
    ref.current.rotation.y += delta * spinSpeed

    const targetScale = hovered ? scale * 1.35 : scale
    ref.current.scale.lerp(
      new THREE.Vector3(targetScale, targetScale, targetScale),
      0.15
    )
  })

  const isInteractive = Boolean(project)

  function handlePointerOver(e) {
    if (!isInteractive) return
    e.stopPropagation()
    setHovered(true)
    document.body.style.cursor = "pointer"
  }

  function handlePointerOut(e) {
    if (!isInteractive) return
    e.stopPropagation()
    setHovered(false)
    document.body.style.cursor = "auto"
  }

  function handleClick(e) {
    if (!isInteractive) return
    e.stopPropagation()
    const card = document.getElementById(`project-card-${index}`)
    if (card) card.scrollIntoView({ behavior: "smooth", block: "center" })
  }

  return (
    <mesh
      ref={ref}
      position={position}
      scale={scale}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
      onClick={handleClick}
    >
      <icosahedronGeometry args={[1, 0]} />
      <meshStandardMaterial
        color={hovered && isInteractive ? "#c9a876" : "#6b625a"}
        roughness={0.9}
        metalness={0.08}
        emissive={hovered && isInteractive ? "#5a4326" : "#000000"}
        emissiveIntensity={hovered && isInteractive ? 0.4 : 0}
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

    // One interactive rock per real project, placed toward the front.
    projects.forEach((project, i) => {
      list.push({
        position: [
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 3,
          1 + Math.random() * 2,
        ],
        scale: 0.55 + Math.random() * 0.25,
        spinSpeed: 0.1 + Math.random() * 0.2,
        project,
        index: i,
      })
    })

    // Decorative filler rocks fill out the rest of the field.
    const fillerCount = Math.max(0, count - projects.length)
    for (let i = 0; i < fillerCount; i++) {
      list.push({
        position: [
          (Math.random() - 0.5) * 9,
          (Math.random() - 0.5) * 5,
          (Math.random() - 0.5) * 6,
        ],
        scale: 0.25 + Math.random() * 0.55,
        spinSpeed: 0.15 + Math.random() * 0.4,
        project: null,
        index: null,
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
