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

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 70,
      background: '#fff', display: 'flex', alignItems: 'center',
      justifyContent: 'space-between', padding: '0 40px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)', zIndex: 100,
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      boxSizing: 'border-box',
      transform: visible ? 'translateY(0)' : 'translateY(-100%)',
      transition: 'transform 0.35s ease',
    }}>
      <a href="index.html" style={{ fontSize: '1.3rem', fontWeight: 400, letterSpacing: 1, color: '#000', textDecoration: 'none' }}>
        BLANKSLATE
      </a>
      <div style={{ display: 'flex', gap: 30 }}>
        {links.map(({ label, href }) => (
          <a key={label} href={href} style={{
            color: '#000', textDecoration: 'none', fontSize: '1rem', fontWeight: 400,
            borderBottom: active === label ? '1px solid #000' : '1px solid transparent',
            paddingBottom: 2,
            transition: 'border-color 0.2s ease',
          }}
          onMouseEnter={e => e.currentTarget.style.borderBottomColor = '#000'}
          onMouseLeave={e => e.currentTarget.style.borderBottomColor = active === label ? '#000' : 'transparent'}
          >{label}</a>
        ))}
      </div>
    </nav>
  );
};

Object.assign(window, { Nav });
