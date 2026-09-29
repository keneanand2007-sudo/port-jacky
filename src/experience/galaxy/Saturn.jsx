import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"
import {
  saturnVertexShader,
  saturnFragmentShader,
  glowVertexShader,
  glowFragmentShader,
} from "./planetShaders"

function getRawChapterProgress(sectionId) {
  const el = document.getElementById(sectionId)
  if (!el) return -1

  const vh = window.innerHeight
  const sectionTop = el.offsetTop
  return (window.scrollY - sectionTop) / vh
}

const ringVertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const ringFragmentShader = `
  uniform float uOpacity;
  varying vec2 vUv;

  void main() {
    float dist = vUv.y;
    float bands = sin(dist * 40.0) * 0.5 + 0.5;
    float gap = smoothstep(0.42, 0.46, dist) * smoothstep(0.54, 0.5, dist);
    vec3 color = mix(vec3(0.55, 0.48, 0.38), vec3(0.82, 0.74, 0.58), bands);
    float alpha = (0.55 + bands * 0.35) * (1.0 - gap * 0.7);
    gl_FragColor = vec4(color, alpha * uOpacity);
  }
`

function Saturn({
  sectionId,
  radius = 2.6,
  startX = 12,
  startY = 0.2,
  startZ = -8,
  exitX = -18,
  exitZ = -16,
  glowColor = "#E8D2A0",
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
  const ringUniforms = useMemo(() => ({ uOpacity: { value: 1 } }), [])

  useFrame((state, delta) => {
    if (!coreRef.current || !groupRef.current) return

    const raw = getRawChapterProgress(sectionId)
    const isActive = raw > -0.05 && raw < 1.05
    groupRef.current.visible = isActive

    if (!isActive) return

    if (!reduceMotion) {
      coreUniforms.uTime.value += delta
      groupRef.current.rotation.y += delta * 0.02
    }

    const t = Math.min(1, Math.max(0, raw))
    const eased = t * t * (3 - 2 * t)

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, exitX, eased)
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, exitZ, eased)

    const fade = Math.max(0, 1 - Math.max(0, t - 0.65) / 0.35)
    coreUniforms.uOpacity.value = fade
    ringUniforms.uOpacity.value = fade
    glowUniforms.uOpacity.value = fade * 0.55

    const scale = THREE.MathUtils.lerp(1, 0.65, eased)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group
      ref={groupRef}
      position={[startX, startY, startZ]}
      rotation={[0.35, 0, 0.15]}
      visible={false}
    >
      <mesh ref={coreRef}>
        <sphereGeometry args={[radius, 96, 96]} />
        <shaderMaterial
          uniforms={coreUniforms}
          vertexShader={saturnVertexShader}
          fragmentShader={saturnFragmentShader}
          transparent
        />
      </mesh>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius * 1.4, radius * 2.4, 96]} />
        <shaderMaterial
          uniforms={ringUniforms}
          vertexShader={ringVertexShader}
          fragmentShader={ringFragmentShader}
          transparent
          side={THREE.DoubleSide}
          depthWrite={false}
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

      <pointLight color="#E8D2A0" intensity={1.6} distance={22} />
    </group>
  )
}

export default Saturn
