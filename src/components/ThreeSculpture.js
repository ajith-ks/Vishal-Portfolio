import * as THREE from 'three';

export class ThreeSculpture {
  constructor(canvasContainerId = 'hero-3d-stage') {
    this.container = document.getElementById(canvasContainerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.group = null;
    this.rings = [];
    this.core = null;
    this.particles = null;
    this.rafId = null;
    this.mouseX = 0;
    this.mouseY = 0;
    this.targetRotationX = 0;
    this.targetRotationY = 0;
    this.isVisible = true;
    this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }

  init() {
    if (!this.container) return;

    const width = this.container.clientWidth || 460;
    const height = this.container.clientHeight || 460;

    // 1. Scene
    this.scene = new THREE.Scene();

    // 2. Camera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.camera.position.set(0, 0, 7.5);

    // 3. Renderer with alpha and antialiasing
    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance'
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;

    // Clear container and attach canvas
    this.container.innerHTML = '';
    this.renderer.domElement.className = 'hero-3d-canvas';
    this.container.appendChild(this.renderer.domElement);

    // 4. Lighting — Emerald, Forest & Mint Atmospheric Lighting (Reference 02)
    const ambientLight = new THREE.AmbientLight(0x0b2b26, 2.5);
    this.scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xdaf1de, 3.2);
    keyLight.position.set(5, 7, 6);
    this.scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x1f6b52, 4.0);
    rimLight.position.set(-6, -4, -4);
    this.scene.add(rimLight);

    const coreLight = new THREE.PointLight(0x8eb69b, 3.5, 8);
    coreLight.position.set(0, 0, 0);
    this.scene.add(coreLight);

    // 5. Build Academic Knowledge Sculpture Group
    this.group = new THREE.Group();
    this.scene.add(this.group);

    // Outer & Middle Orbital Rings (Knowledge & Direction)
    const ringMaterial1 = new THREE.MeshStandardMaterial({
      color: 0x8eb69b,
      metalness: 0.85,
      roughness: 0.22,
      wireframe: false
    });

    const ringMaterial2 = new THREE.MeshStandardMaterial({
      color: 0x163832,
      metalness: 0.9,
      roughness: 0.18,
      wireframe: false
    });

    const ringMaterial3 = new THREE.MeshStandardMaterial({
      color: 0xdaf1de,
      metalness: 0.6,
      roughness: 0.35,
      wireframe: true
    });

    // Ring 1 (Equatorial)
    const torus1 = new THREE.Mesh(new THREE.TorusGeometry(2.35, 0.045, 24, 100), ringMaterial1);
    torus1.rotation.x = Math.PI / 4;
    this.group.add(torus1);
    this.rings.push({ mesh: torus1, speedX: 0.003, speedY: 0.005 });

    // Ring 2 (Polar)
    const torus2 = new THREE.Mesh(new THREE.TorusGeometry(2.05, 0.04, 24, 100), ringMaterial2);
    torus2.rotation.y = Math.PI / 3;
    this.group.add(torus2);
    this.rings.push({ mesh: torus2, speedX: -0.004, speedY: 0.003 });

    // Ring 3 (Oblique Wireframe Knowledge Meridian)
    const torus3 = new THREE.Mesh(new THREE.TorusGeometry(1.75, 0.025, 16, 72), ringMaterial3);
    torus3.rotation.z = Math.PI / 6;
    this.group.add(torus3);
    this.rings.push({ mesh: torus3, speedX: 0.005, speedY: -0.004 });

    // Inner Faceted Core (Wisdom / Mentorship Center)
    const coreGeo = new THREE.IcosahedronGeometry(0.85, 1);
    const coreMat = new THREE.MeshPhysicalMaterial({
      color: 0x163832,
      emissive: 0x0b2b26,
      roughness: 0.15,
      metalness: 0.65,
      clearcoat: 1.0,
      clearcoatRoughness: 0.1,
      wireframe: false,
      flatShading: true
    });
    this.core = new THREE.Mesh(coreGeo, coreMat);
    this.group.add(this.core);

    // Inner Wireframe Aura
    const auraGeo = new THREE.IcosahedronGeometry(1.05, 1);
    const auraMat = new THREE.MeshBasicMaterial({
      color: 0x8eb69b,
      wireframe: true,
      transparent: true,
      opacity: 0.35
    });
    const aura = new THREE.Mesh(auraGeo, auraMat);
    this.group.add(aura);
    this.rings.push({ mesh: aura, speedX: 0.002, speedY: 0.003 });

    // Floating Knowledge Nodes / Particles
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const posArray = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount * 3; i += 3) {
      const radius = 1.4 + Math.random() * 1.6;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      posArray[i] = radius * Math.sin(phi) * Math.cos(theta);
      posArray[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
      posArray[i + 2] = radius * Math.cos(phi);
    }

    particleGeo.setAttribute('position', new THREE.BufferAttribute(posArray, 3));
    const particleMat = new THREE.PointsMaterial({
      size: 0.055,
      color: 0xdaf1de,
      transparent: true,
      opacity: 0.85
    });
    this.particles = new THREE.Points(particleGeo, particleMat);
    this.group.add(this.particles);

    // 6. Interactive Mouse Movement
    window.addEventListener('mousemove', (e) => {
      const halfW = window.innerWidth / 2;
      const halfH = window.innerHeight / 2;
      this.mouseX = (e.clientX - halfW) / halfW;
      this.mouseY = (e.clientY - halfH) / halfH;
      this.targetRotationX = this.mouseY * 0.45;
      this.targetRotationY = this.mouseX * 0.65;
    }, { passive: true });

    // 7. Responsive Resizing
    window.addEventListener('resize', () => this.onResize(), { passive: true });

    // 8. Visibility observer to pause RAF when offscreen
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(([entry]) => {
        this.isVisible = entry.isIntersecting;
      }, { threshold: 0.05 });
      observer.observe(this.container);
    }

    // 9. Start Render Loop
    this.animate();
  }

  onResize() {
    if (!this.container || !this.renderer || !this.camera) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.rafId = requestAnimationFrame(() => this.animate());

    if (!this.isVisible) return;

    // Interactive group rotation with smooth spring lerp
    if (!this.reducedMotion) {
      this.group.rotation.y += (this.targetRotationY - this.group.rotation.y) * 0.05 + 0.003;
      this.group.rotation.x += (this.targetRotationX - this.group.rotation.x) * 0.05;

      // Rotate individual orbital rings
      this.rings.forEach(item => {
        item.mesh.rotation.x += item.speedX;
        item.mesh.rotation.y += item.speedY;
      });

      // Core rotation
      if (this.core) {
        this.core.rotation.x += 0.006;
        this.core.rotation.y += 0.008;
      }

      // Particles subtle counter-rotation
      if (this.particles) {
        this.particles.rotation.y -= 0.002;
      }
    }

    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
    if (this.renderer && this.renderer.domElement) {
      this.renderer.domElement.remove();
      this.renderer.dispose();
    }
  }
}
