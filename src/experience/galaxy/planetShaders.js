export const noiseGLSL = `
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

export const sunVertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(position) * 2.0;
    float displaceNoise = fbm(p * 1.8 + vec3(0.0, 0.0, uTime * 0.15));
    float flares = pow(max(0.0, fbm(p * 3.0 - uTime * 0.1)), 2.0);
    float displacement = displaceNoise * 0.15 + flares * 0.18;

    vec3 displaced = position + normal * displacement;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

export const sunFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 2.2;
    float n1 = fbm(p + vec3(0.0, 0.0, uTime * 0.06));
    float n2 = fbm(p * 2.0 - vec3(0.0, uTime * 0.03, 0.0));
    float turbulence = n1 * 0.6 + n2 * 0.4;

    vec3 deepRed = vec3(0.65, 0.18, 0.02);
    vec3 orange = vec3(1.0, 0.5, 0.08);
    vec3 yellow = vec3(1.0, 0.82, 0.35);
    vec3 hot = vec3(1.0, 0.96, 0.82);

    vec3 color = mix(deepRed, orange, smoothstep(-0.3, 0.3, turbulence));
    color = mix(color, yellow, smoothstep(0.15, 0.55, turbulence));
    color = mix(color, hot, smoothstep(0.55, 0.9, turbulence));

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.5);
    color += fresnel * vec3(0.5, 0.25, 0.08);

    gl_FragColor = vec4(color, uOpacity);
  }
`

export const rockyVertexShader = `
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
    vec3 displaced = position + normal * craters * 0.1;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

export const rockyFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vCrater;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 3.0;
    float n = fbm(p * 2.5);

    vec3 slate = vec3(0.30, 0.34, 0.48);
    vec3 midtone = vec3(0.45, 0.44, 0.52);
    vec3 copper = vec3(0.75, 0.52, 0.30);
    vec3 highlight = vec3(0.92, 0.80, 0.62);

    vec3 color = mix(slate, midtone, smoothstep(-0.2, 0.3, n));
    color = mix(color, copper, smoothstep(0.15, 0.5, vCrater + n * 0.3));
    color = mix(color, highlight, smoothstep(0.45, 0.7, vCrater));

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.6);
    color += fresnel * vec3(0.25, 0.3, 0.42);

    gl_FragColor = vec4(color, uOpacity);
  }
`

export const glowVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`

export const glowFragmentShader = `
  uniform float uOpacity;
  uniform vec3 uColor;
  varying vec3 vNormal;
  void main() {
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.8);
    gl_FragColor = vec4(uColor, fresnel * uOpacity);
  }
`

export const venusVertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(position) * 2.5;
    float swirl = fbm(p * 1.5 + vec3(uTime * 0.04, 0.0, uTime * 0.03));
    vec3 displaced = position + normal * swirl * 0.05;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

export const venusFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 2.2;
    float n1 = fbm(p * 1.8 + vec3(uTime * 0.05, 0.0, 0.0));
    float n2 = fbm(p * 3.5 - vec3(0.0, uTime * 0.03, 0.0));
    float clouds = n1 * 0.65 + n2 * 0.35;

    vec3 deepGold = vec3(0.55, 0.38, 0.12);
    vec3 amber = vec3(0.85, 0.62, 0.25);
    vec3 cream = vec3(0.96, 0.85, 0.62);
    vec3 pale = vec3(1.0, 0.96, 0.85);

    vec3 color = mix(deepGold, amber, smoothstep(-0.2, 0.3, clouds));
    color = mix(color, cream, smoothstep(0.2, 0.6, clouds));
    color = mix(color, pale, smoothstep(0.55, 0.85, clouds));

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.6);
    color += fresnel * vec3(0.4, 0.3, 0.12);

    gl_FragColor = vec4(color, uOpacity);
  }
`

export const earthVertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vLand;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(position) * 2.8;
    float continents = fbm(p * 1.6);
    vLand = continents;
    vec3 displaced = position + normal * max(0.0, continents) * 0.04;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

export const earthFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vLand;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 1.6;
    float shape = fbm(p);
    float detail = fbm(p * 5.0 + 3.0) * 0.15;
    float landmass = shape + detail;

    vec3 deepOcean = vec3(0.02, 0.10, 0.30);
    vec3 shallowOcean = vec3(0.05, 0.32, 0.58);
    vec3 coast = vec3(0.55, 0.52, 0.32);
    vec3 lowland = vec3(0.16, 0.42, 0.18);
    vec3 highland = vec3(0.45, 0.38, 0.22);

    vec3 color = mix(deepOcean, shallowOcean, smoothstep(-0.6, 0.05, landmass));
    color = mix(color, coast, smoothstep(0.03, 0.09, landmass));
    color = mix(color, lowland, smoothstep(0.08, 0.25, landmass));
    color = mix(color, highland, smoothstep(0.3, 0.55, landmass));

    vec3 cloudP = normalize(vPosition) * 2.4;
    float clouds = fbm(cloudP * 1.8 + vec3(uTime * 0.025, uTime * 0.01, 0.0));
    float cloudMask = smoothstep(0.35, 0.65, clouds);
    color = mix(color, vec3(0.97, 0.98, 1.0), cloudMask * 0.65);

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.0);
    color += fresnel * vec3(0.15, 0.35, 0.6) * 0.7;

    gl_FragColor = vec4(color, uOpacity);
  }
`
export const marsVertexShader = `
  uniform float uTime;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vCrater;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(position) * 3.2;
    float largeForm = fbm(p * 1.4);
    float craterDetail = fbm(p * 7.0 + 20.0);
    float craters = min(largeForm, craterDetail * 0.5);

    vCrater = craters;
    vec3 displaced = position + normal * craters * 0.09;

    vPosition = displaced;
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(displaced, 1.0);
  }
`

export const marsFragmentShader = `
  uniform float uTime;
  uniform float uOpacity;
  varying vec3 vPosition;
  varying vec3 vNormal;
  varying float vCrater;

  ${noiseGLSL}

  void main() {
    vec3 p = normalize(vPosition) * 2.6;
    float n = fbm(p * 1.8);
    float dust = fbm(p * 4.5 + 8.0);

    vec3 darkRust = vec3(0.28, 0.10, 0.05);
    vec3 rust = vec3(0.55, 0.22, 0.10);
    vec3 orange = vec3(0.75, 0.38, 0.18);
    vec3 dustyTan = vec3(0.85, 0.55, 0.32);

    vec3 color = mix(darkRust, rust, smoothstep(-0.3, 0.2, n));
    color = mix(color, orange, smoothstep(0.1, 0.4, vCrater + dust * 0.25));
    color = mix(color, dustyTan, smoothstep(0.35, 0.6, vCrater));

    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 1.8);
    color += fresnel * vec3(0.4, 0.18, 0.08);

    gl_FragColor = vec4(color, uOpacity);
  }
`
