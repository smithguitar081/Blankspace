// Hero3D.jsx — BLANKSLATE spinning chrome head hero
// Props:
//   title   — page title (rendered as CSS overlay with z-index BELOW canvas)
//   axis    — 'y' | 'x' | 'z' | 'xy' | 'xz' | 'dvd'
//   zoom    — camera z (default 2.2)

const Hero3D = ({ title, axis = 'y', zoom = 2.2 }) => {
  const canvasRef = React.useRef(null);
  const wrapperRef = React.useRef(null);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    const wrapper = wrapperRef.current;
    const W = wrapper.clientWidth || window.innerWidth;
    const H = wrapper.clientHeight || window.innerHeight;

    // ── Renderer ──────────────────────────────────────────────────
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(W, H);
    renderer.outputEncoding = THREE.sRGBEncoding;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.6;
    renderer.physicallyCorrectLights = true;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x050505);

    const camera = new THREE.PerspectiveCamera(45, W / H, 0.1, 100);
    camera.position.set(0, 0, zoom);

    // ── Environment ───────────────────────────────────────────────
    const rgbeLoader = new THREE.RGBELoader();
    const pmrem = new THREE.PMREMGenerator(renderer);
    pmrem.compileEquirectangularShader();
    rgbeLoader.load(
      'https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/studio_small_08_1k.hdr',
      hdrTex => {
        scene.environment = pmrem.fromEquirectangular(hdrTex).texture;
        hdrTex.dispose(); pmrem.dispose();
      }
    );

    // ── Lights ────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const key = new THREE.DirectionalLight(0xffffff, 2.0);
    key.position.set(2, 3, 4); scene.add(key);
    const fillLight = new THREE.DirectionalLight(0xaaccff, 0.8);
    fillLight.position.set(-3, 1, -2); scene.add(fillLight);
    const rim = new THREE.DirectionalLight(0xffffff, 1.0);
    rim.position.set(0, -2, -3); scene.add(rim);

    // ── Model ─────────────────────────────────────────────────────
    let model = null;

    // DVD bounce state
    let dvdX = 0, dvdY = 0;
    let dvdVX = 0.004, dvdVY = 0.003;  // much slower
    const dvdBounds = { bX: 2.0, bY: 1.2 };

    // Rotation direction — flips on wall hit
    let dvdRotDir = 1;

    const loader = new THREE.GLTFLoader();
    loader.load(
      'assets/head2.glb',
      gltf => {
        model = gltf.scene;
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size   = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z);
        model.position.sub(center);
        // Face orientation: -90° X + 180° Z
        model.rotation.order = 'XYZ';
        model.rotation.x = -Math.PI / 2;
        model.rotation.y = 0;
        model.rotation.z = Math.PI;
        model.scale.setScalar(4.0 / maxDim);
        // Pivot slightly below center for spinning pages
        model.position.y = -0.15;

        const chromeMat = new THREE.MeshStandardMaterial({
          color: 0xffffff, metalness: 1.0, roughness: 0.0,
          envMapIntensity: 1.0, side: THREE.DoubleSide,
        });
        model.traverse(child => {
          if (child.isMesh) { child.material = chromeMat; child.castShadow = false; }
        });
        scene.add(model);

        // Wide bounds — head travels across full hero before bouncing
        const scaledRadius = (4.0 / maxDim) * (maxDim * 0.4);
        const halfH2 = zoom * Math.tan((22.5 * Math.PI) / 180);
        const halfW2 = halfH2 * (W / H);
        dvdBounds.bX = halfW2 + scaledRadius * 0.5;
        dvdBounds.bY = halfH2 + scaledRadius * 0.5;
      },
      null,
      err => console.error('GLTFLoader error:', err)
    );

    // ── Animate ───────────────────────────────────────────────────
    let animId;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (model) {
        if (axis === 'y')  { model.rotation.y += 0.008; }
        if (axis === 'x')  { model.rotation.z += 0.008; }
        if (axis === 'z')  { model.rotation.z += 0.008; }
        if (axis === 'xy') { model.rotation.z += 0.004; model.rotation.y += 0.007; }
        if (axis === 'xz') { model.rotation.z += 0.005; model.rotation.x += 0.006; }
        if (axis === 'dvd') {
          dvdX += dvdVX; dvdY += dvdVY;
          const { bX, bY } = dvdBounds;
          let bounced = false;
          if (dvdX >  bX) { dvdX =  bX; dvdVX *= -1; bounced = true; }
          if (dvdX < -bX) { dvdX = -bX; dvdVX *= -1; bounced = true; }
          if (dvdY >  bY) { dvdY =  bY; dvdVY *= -1; bounced = true; }
          if (dvdY < -bY) { dvdY = -bY; dvdVY *= -1; bounced = true; }
          if (bounced) dvdRotDir *= -1;  // flip rotation direction on hit
          model.position.x = dvdX;
          model.position.y = dvdY - 0.15;
          model.rotation.x += 0.006 * dvdRotDir;
          model.rotation.y += 0.004 * dvdRotDir;
        }
      }
      renderer.render(scene, camera);
    };
    animate();

    // ── Resize ────────────────────────────────────────────────────
    const onResize = () => {
      const w = wrapper.clientWidth, h = wrapper.clientHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div ref={wrapperRef} style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden', background: '#000' }}>
      {/* Canvas fills the background */}
      <canvas ref={canvasRef} style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
        display: 'block', zIndex: 0,
      }} />
      {/* Title on top of canvas */}
      {title && (
        <div style={{
          position: 'absolute', inset: 0, zIndex: 2,
          display: 'flex', justifyContent: 'center', alignItems: 'center',
          pointerEvents: 'none',
        }}>
          <h1 style={{
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontSize: 'clamp(4rem, 10vw, 9rem)', fontWeight: 400, color: '#fff',
            letterSpacing: '-1px', textAlign: 'center', margin: 0, lineHeight: 1,
            textShadow: '0 2px 40px rgba(0,0,0,0.5)',
          }}>{title}</h1>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { Hero3D });
