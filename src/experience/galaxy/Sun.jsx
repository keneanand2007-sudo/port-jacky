import { useRef, useMemo } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

const noiseGLSL = `
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 mod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec4 permute(vec4 x) { return mod289(((x*34.0)+1.0)*x); }
  vec4 taylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

  float snoise(vec3 v) {
    const vec2  C = vec2(1.0/6.0, 1.0/3.0);
    const vec4  D = vec4(0.0, 0.5, 1.0, 2.0);

    vec3 i  = floor(v + dot(v, C.yyy));
    vec3 x0 = v - i + dot(i, C.xxx);

    vec3 g = step(x0.yzx, x0.xyz);
    vec3 l = 1.0 - g;
    vec3 i1 = min(g.xyz, l.zxy);
    vec3 i2 = max(g.xyz, l.zxy);

    vec3 x1 = x0 - i1 + C.xxx;
    vec3 x2 = x0 - i2 + C.yyy;
    vec3 x3 = x0 - D.yyy;

    i = mod289(i);
    vec4 p = permute(permute(permute(
              i.z + vec4(0.0, i1.z, i2.z, 1.0))
            + i.y + vec4(0.0, i1.y, i2.y, 1.0))
            + i.x + vec4(0.0, i1.x, i2.x, 1.0));

    float n_ = 0.142857142857;
    vec3 ns = n_ * D.wyz - D.xzx;

    vec4 j = p - 49.0 * floor(p * ns.z * ns.z);

    vec4 x_ = floor(j * ns.z);
    vec4 y_ = floor(j - 7.0 * x_);

    vec4 x = x_ *ns.x + ns.yyyy;
    vec4 y = y_ *ns.x + ns.yyyy;
    vec4 h = 1.0 - abs(x) - abs(y);

    vec4 b0 = vec4(x.xy, y.xy);
    vec4 b1 = vec4(x.zw, y.zw);

    vec4 s0 = floor(b0)*2.0 + 1.0;
    vec4 s1 = floor(b1)*2.0 + 1.0;
    vec4 sh = -step(h, vec4(0.0));

    vec4 a0 = b0.xzyw + s0.xzyw*sh.xxyy;
    vec4 a1 = b1.xzyw + s1.xzyw*sh.zzww;

    vec3 p0 = vec3(a0.xy, h.x);
    vec3 p1 = vec3(a0.zw, h.y);
    vec3 p2 = vec3(a1.xy, h.z);
    vec3 p3 = vec3(a1.zw, h.w);

    vec4 norm = taylorInvSqrt(vec4(dot(p0,p0), dot(p1,p1), dot(p2,p2), dot(p3,p3)));
    p0 *= norm.x; p1 *= norm.y; p2 *= norm.z; p3 *= norm.w;

    vec4 m = max(0.6 - vec4(dot(x0,x0), dot(x1,x1), dot(x2,x2), dot(x3,x3)), 0.0);
    m = m * m;
    return 42.0 * dot(m*m, vec4(dot(p0,x0), dot(p1,x1), dot(p2,x2), dot(p3,x3)));
  }

  float fbm(vec3 p) {
    float value = 0.0;
    float amp = 0.5;
    for (int i = 0; i < 5; i++) {
      value += amp * snoise(p);
      p *= 2.0;
      amp *= 0.5;
    }
    return value;
  }
`

const sunVertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(position) * 2.0;
    float displaceNoise = fbm(p * 1.8 + vec3(0.0, 0.0, uTime * 0.15));
    float flares = pow(max(0.0, fbm(p * 3.0 - uTime * 0.1)), 2.0);
    float displacement = displaceNoise * 0.18 + flares * 0.22;

    vDisplacement = displacement;
    vec3 displaced = position + normal * displacement;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const sunFragmentShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vDisplacement;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 2.2;
    float n1 = fbm(p + vec3(0.0, 0.0, uTime * 0.06));
    float n2 = fbm(p * 2.0 - vec3(0.0, uTime * 0.03, 0.0));
    float turbulence = n1 * 0.6 + n2 * 0.4 + vDisplacement * 0.8;

    vec3 deepRed = vec3(0.55, 0.05, 0.0);
    vec3 orange = vec3(1.0, 0.45, 0.05);
    vec3 yellow = vec3(1.0, 0.85, 0.35);
    vec3 hot = vec3(1.0, 0.98, 0.85);

    vec3 color = mix(deepRed, orange, smoothstep(-0.3, 0.3, turbulence));
    color = mix(color, yellow, smoothstep(0.15, 0.55, turbulence));
    color = mix(color, hot, smoothstep(0.55, 0.9, turbulence));

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    color += fresnel * vec3(1.0, 0.6, 0.2) * 0.9;

    gl_FragColor = vec4(color, 1.0);
  }
`

const glowVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const glowFragmentShader = `
  uniform float uOpacity;
  uniform vec3 uColor;
  uniform float uPower;
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), uPower);
    gl_FragColor = vec4(uColor, fresnel * uOpacity);
  }
`

function GlowShell({ scale, color, power, baseOpacity, fadeRef }) {
  const ref = useRef(null)
  const uniforms = useMemo(
    () => ({
      uOpacity: { value: baseOpacity },
      uColor: { value: new THREE.Color(color) },
      uPower: { value: power },
    }),
    [color, power, baseOpacity]
  )

  useFrame(() => {
    if (!ref.current) return
    uniforms.uOpacity.value = baseOpacity * fadeRef.current
  })

  return (
    <mesh ref={ref} scale={scale}>
      <sphereGeometry args={[3.2, 48, 48]} />
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={glowVertexShader}
        fragmentShader={glowFragmentShader}
        transparent
        side={THREE.BackSide}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function Sun({ scrollProgress, reduceMotion }) {
  const coreRef = useRef(null)
  const groupRef = useRef(null)
  const fadeRef = useRef(1)

  const coreUniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  const startX = 5.5
  const startZ = -7
  const exitX = -18
  const exitZ = -20

  useFrame((state, delta) => {
    if (!coreRef.current || !groupRef.current) return

    if (!reduceMotion) {
      coreUniforms.uTime.value += delta
      groupRef.current.rotation.y += delta * 0.02
    }

    const t = Math.min(1, scrollProgress * 1.15)
    const eased = t * t * (3 - 2 * t)

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, exitX, eased)
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, exitZ, eased)

    const fade = Math.max(0, 1 - t * 1.05)
    fadeRef.current = fade
    coreRef.current.material.opacity = fade

    const scale = THREE.MathUtils.lerp(1, 0.5, eased)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={[startX, 0.5, startZ]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[3.2, 96, 96]} />
        <shaderMaterial
          uniforms={coreUniforms}
          vertexShader={sunVertexShader}
          fragmentShader={sunFragmentShader}
          transparent
        />
      </mesh>

      <GlowShell scale={1.15} color="#FFDBA3" power={1.5} baseOpacity={0.9} fadeRef={fadeRef} />
      <GlowShell scale={1.45} color="#FF8A3D" power={2.2} baseOpacity={0.6} fadeRef={fadeRef} />
      <GlowShell scale={1.9} color="#B8290A" power={3.0} baseOpacity={0.35} fadeRef={fadeRef} />

      <pointLight color="#FFA35C" intensity={3} distance={35} />
    </group>
  )
}

export default Sun
