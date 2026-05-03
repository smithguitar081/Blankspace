// Nav.jsx — BLANKSLATE Navbar
const Nav = ({ active }) => {
  const links = [
    { label: 'About',   href: 'about.html' },
    { label: 'Artists', href: 'artists.html' },
    { label: 'Stream',  href: 'shop.html' },
    { label: 'Contact', href: 'contact.html' },
  ];

  const [visible, setVisible] = React.useState(true);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY.current || y < 10);
      lastY.current = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const [menuOpen, setMenuOpen] = React.useState(false);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 600;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0,
      background: '#fff', zIndex: 100,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      boxSizing: 'border-box',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.35s ease',
    }}>
      <div style={{ height: 70, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        <a href="index.html" style={{ fontSize: '1.3rem', fontWeight: 400, letterSpacing: 1, color: '#000', textDecoration: 'none' }}>
          BLANKSLATE
        </a>
        {/* Desktop links */}
        <div style={{ display: 'flex', gap: 30, '@media(maxWidth:600px)': { display: 'none' } }} className="nav-desktop">
          {links.map(({ label, href }) => (
            <a key={label} href={href} style={{
              color: '#000', textDecoration: 'none', fontSize: '1rem', fontWeight: 400,
              borderBottom: active === label ? '1px solid #000' : '1px solid transparent',
              paddingBottom: 2, transition: 'border-color 0.2s ease',
            }}
            onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#000'}
            onMouseLeave={e => e.currentTarget.style.borderBottomColor = active === label ? '#000' : 'transparent'}
            >{label}</a>
          ))}
        </div>
        {/* Hamburger */}
        <button onClick={() => setMenuOpen(o => !o)} className="nav-hamburger" style={{
          display: 'none', background: 'none', border: 'none', cursor: 'pointer', padding: 8, fontSize: '1.4rem'
        }}>☰</button>
      </div>
      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="nav-mobile-menu" style={{ borderTop: '1px solid #eee', padding: '12px 24px 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
          {links.map(({ label, href }) => (
            <a key={label} href={href} style={{ color: '#000', textDecoration: 'none', fontSize: '1.1rem', fontWeight: 400, borderBottom: active === label ? '1px solid #000' : 'none', paddingBottom: 2 }}>{label}</a>
          ))}
        </div>
      )}
      <style>{`
        @media (max-width: 600px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </nav>
  );
};

Object.assign(window, { Nav });
