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

const mercuryVertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vCrater;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(position) * 3.5;
    float largeForm = fbm(p);
    float craterDetail = fbm(p * 6.0 + 10.0);
    float craters = min(largeForm, craterDetail * 0.6);

    vCrater = craters;
    vec3 displaced = position + normal * craters * 0.12;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

const mercuryFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vCrater;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 3.0;
    float n = fbm(p * 2.5);

    vec3 navy = vec3(0.08, 0.10, 0.20);
    vec3 slate = vec3(0.22, 0.27, 0.42);
    vec3 copper = vec3(0.72, 0.45, 0.22);
    vec3 highlight = vec3(0.92, 0.78, 0.58);

    vec3 color = mix(navy, slate, smoothstep(-0.2, 0.3, n));
    color = mix(color, copper, smoothstep(0.15, 0.5, vCrater + n * 0.3));
    color = mix(color, highlight, smoothstep(0.45, 0.7, vCrater));

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 3.0);
    color += fresnel * vec3(0.3, 0.4, 0.6) * 0.6;

    gl_FragColor = vec4(color, uOpacity);
  }
`

const rimVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

const rimFragmentShader = `
  uniform float uOpacity;
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    vec3 rimColor = vec3(0.45, 0.55, 0.85);
    gl_FragColor = vec4(rimColor, fresnel * uOpacity);
  }
`

function Mercury({ progress, reduceMotion }) {
  const coreRef = useRef(null)
  const groupRef = useRef(null)

  const coreUniforms = useMemo(
    () => ({ uTime: { value: 0 }, uOpacity: { value: 0 } }),
    []
  )
  const rimUniforms = useMemo(() => ({ uOpacity: { value: 0 } }), [])

  const startX = 16
  const startZ = -9
  const exitX = -18
  const exitZ = -20

  useFrame((state, delta) => {
    if (!coreRef.current || !groupRef.current) return

    if (!reduceMotion) {
      coreUniforms.uTime.value += delta
      groupRef.current.rotation.y += delta * 0.03
    }

    const t = Math.min(1, Math.max(0, progress))
    const eased = t * t * (3 - 2 * t)

    groupRef.current.position.x = THREE.MathUtils.lerp(startX, exitX, eased)
    groupRef.current.position.z = THREE.MathUtils.lerp(startZ, exitZ, eased)

    // Invisible until this chapter starts, fully visible in the
    // middle, invisible again before the chapter ends.
    const fadeIn = Math.min(1, t / 0.15)
    const fadeOut = Math.max(0, 1 - Math.max(0, t - 0.8) / 0.2)
    const fade = Math.min(fadeIn, fadeOut)

    coreUniforms.uOpacity.value = fade
    rimUniforms.uOpacity.value = fade * 0.7

    const scale = THREE.MathUtils.lerp(1, 0.75, eased)
    groupRef.current.scale.setScalar(scale)
  })

  return (
    <group ref={groupRef} position={[startX, -0.3, startZ]}>
      <mesh ref={coreRef}>
        <sphereGeometry args={[3.4, 96, 96]} />
        <shaderMaterial
          uniforms={coreUniforms}
          vertexShader={mercuryVertexShader}
          fragmentShader={mercuryFragmentShader}
          transparent
        />
      </mesh>
      <mesh scale={1.1}>
        <sphereGeometry args={[3.4, 48, 48]} />
        <shaderMaterial
          uniforms={rimUniforms}
          vertexShader={rimVertexShader}
          fragmentShader={rimFragmentShader}
          transparent
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
      <pointLight color="#8FA3D9" intensity={1.2} distance={22} />
    </group>
  )
}

export default Mercury
