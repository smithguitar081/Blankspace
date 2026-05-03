// MusicPlayer.jsx — BLANKSLATE Music Sections
const BuyButton = ({ label }) => {
  const [hovered, setHovered] = React.useState(false);
  return (
    <a href="#" style={{
      display: 'inline-block', marginTop: 10,
      color: hovered ? '#000' : '#fff',
      background: hovered ? '#fff' : 'transparent',
      border: '1px solid #fff',
      padding: '10px 20px',
      textDecoration: 'none',
      fontSize: '1rem',
      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
      transition: 'background 0.3s, color 0.3s',
    }}
    onMouseEnter={() => setHovered(true)}
    onMouseLeave={() => setHovered(false)}
    onClick={e => e.preventDefault()}
    >{label}</a>
  );
};

const NowPlaying = () => (
  <section style={{ padding: '40px 0', textAlign: 'center', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
    <h2 style={{ color: '#fff', fontWeight: 400, fontSize: '1.5rem' }}>Now Playing</h2>
    <audio controls style={{ marginTop: 10 }}>
      <source src="../../mp3/Distress.m4a" type="audio/mp4" />
      Your browser does not support audio.
    </audio>
  </section>
);

const tracks = [
  { title: 'Track One',  src: '../../mp3/Dishitout.flac' },
  { title: 'Track Two',  src: '../../mp3/instrumental 2 sped.mp3' },
];

const MusicPlayer = () => (
  <section style={{ padding: '40px 0', textAlign: 'center', fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
    <h2 style={{ color: '#fff', fontWeight: 400, fontSize: '1.5rem' }}>Tracks</h2>
    {tracks.map(t => (
      <div key={t.title} style={{ margin: '20px 0' }}>
        <p style={{ color: '#fff', margin: '0 0 8px' }}>{t.title}</p>
        <audio controls>
          <source src={t.src} />
        </audio>
        <br />
        <BuyButton label="Buy MP3 – $1.00" />
      </div>
    ))}
  </section>
);

const LabelImage = () => (
  <div style={{ textAlign: 'center', padding: '20px 0' }}>
    <img src="../../assets/Blank Slate Label.jpg" alt="BLANKSLATE Label"
      style={{ maxWidth: '100%', display: 'block', margin: '0 auto' }} />
  </div>
);

Object.assign(window, { NowPlaying, MusicPlayer, LabelImage, BuyButton });
