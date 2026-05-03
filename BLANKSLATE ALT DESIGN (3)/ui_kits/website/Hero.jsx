// Hero.jsx — BLANKSLATE Hero Section
const Hero = () => (
  <section style={{
    backgroundImage: "url('../../assets/glass-head.png')",
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
  }}>
    <div style={{
      background: 'rgba(0,0,0,0.4)',
      padding: 40,
      textAlign: 'center',
    }}>
      <h1 style={{ fontSize: '3rem', color: '#fff', margin: 0, fontWeight: 400 }}>
        bl_nk_slate
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#ccc', margin: '10px 0 0' }}>
        The music of tomorrow, today.
      </p>
    </div>
  </section>
);

Object.assign(window, { Hero });
