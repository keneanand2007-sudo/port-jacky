import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"

function StarField({ count = 2500, reduceMotion }) {
  const pointsRef = useRef(null)

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      const radius = 20 + Math.random() * 60
      const theta = Math.random() * Math.PI * 2
      const phi = Math.acos(2 * Math.random() - 1)

      arr[i * 3] = radius * Math.sin(phi) * Math.cos(theta)
      arr[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta)
      arr[i * 3 + 2] = radius * Math.cos(phi)
    }
    return arr
  }, [count])

  useFrame((state, delta) => {
    if (reduceMotion || !pointsRef.current) return
    pointsRef.current.rotation.y += delta * 0.015
    pointsRef.current.rotation.x += delta * 0.005
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.12}
        color="#F5F5F5"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  )
}

export default StarField
