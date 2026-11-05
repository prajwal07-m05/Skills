import React, { useEffect, useState } from 'react';
import DreamParticles from './DreamParticles.jsx';
import MemoryOrbit from './MemoryOrbit.jsx';
import { Heart, Music2, VolumeX, Sparkles, Camera, Mail, Stars, Gift, ArrowDown, X, Plus, ImagePlus } from 'lucide-react';

const memories = [
  { title: 'The little things', note: 'The random laughs that somehow become the best memories.', tone: 'peach', emoji: '☀️' },
  { title: 'Our kind of chaos', note: 'A little silly, a little loud, and always a lot of fun.', tone: 'lilac', emoji: '🦋' },
  { title: 'The comfort zone', note: 'Some people just make ordinary days feel special.', tone: 'mint', emoji: '🌷' },
];

const reasons = [
  ['Your heart', 'You make people feel seen, heard, and cared for.'],
  ['Your laugh', 'It has a way of making even a regular day brighter.'],
  ['Your energy', 'You bring your own kind of magic wherever you go.'],
  ['Just being you', 'No big reason needed. You are simply one of a kind.'],
];

function App() {
  const [opened, setOpened] = useState(false);
  const [letterOpen, setLetterOpen] = useState(false);
  const [music, setMusic] = useState(false);
  const [candles, setCandles] = useState([true, true, true]);
  const [photos, setPhotos] = useState([]);
  const [toast, setToast] = useState('');
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(''), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const addPhotos = (event) => {
    const selected = Array.from(event.target.files || []);
    if (!selected.length) return;
    const next = selected.map(file => ({ url: URL.createObjectURL(file), name: file.name }));
    setPhotos(prev => [...prev, ...next].slice(0, 12));
    setToast('Your memories have been added ♡');
    event.target.value = '';
  };

  const blowCandles = () => {
    setCandles([false, false, false]);
    setShowConfetti(true);
    setToast('Wish made. May this year be your sweetest one yet! ✨');
    setTimeout(() => setShowConfetti(false), 4200);
  };

  return (
    <main>
      {showConfetti && <div className="confetti" aria-hidden="true">{Array.from({length: 34}, (_,i)=><i key={i} style={{'--i':i}} />)}</div>}
      <div className="topbar">
        <a className="brand" href="#home"><span className="brand-mark">f.</span> a little something for you</a>
        <button className="music-button" onClick={() => { setMusic(!music); setToast(music ? 'Music paused in this demo ♡' : 'Add your favourite song in the setup notes below ♡'); }} aria-label="Toggle music">
          {music ? <VolumeX size={16}/> : <Music2 size={16}/>} <span>{music ? 'Pause' : 'Our song'}</span>
        </button>
      </div>

      <section className="hero section" id="home">
        <DreamParticles />
        <div className="hero-sparkle s1">✳</div><div className="hero-sparkle s2">✧</div><div className="hero-sparkle s3">♡</div>
        <div className="hero-copy">
          <p className="eyebrow"><span /> a tiny corner of the internet, made just for you <span /></p>
          <h1>Happy birthday,<br/><em>Frooti!</em></h1>
          <p className="hero-sub">For the girl who makes life a little softer, brighter, and infinitely more fun.</p>
          <button className="primary-button" onClick={() => { setOpened(true); document.getElementById('scrapbook')?.scrollIntoView({behavior:'smooth'}); }}>
            {opened ? 'Let’s relive the magic' : 'Open your little surprise'} <Heart size={16} fill="currentColor"/>
          </button>
          <p className="tiny-note">made with lots of love & a little bit of sparkle</p>
        </div>
        <div className="hero-art">
          <div className="sunburst">✺</div>
          <div className="photo-frame hero-frame">
            <div className="photo-placeholder"><span>♡</span><small>your favourite<br/>memory goes here</small></div>
            <div className="tape"></div>
            <p className="handwriting">the birthday girl ✿</p>
          </div>
          <div className="sticker sticker-one">bestie<br/>energy <span>♡</span></div>
          <div className="sticker sticker-two">100%<br/>iconic ✨</div>
          <div className="doodle-flower">✿</div>
        </div>
        <a className="scroll-cue" href="#scrapbook"><ArrowDown size={15}/> scroll a little</a>
      </section>

      <section className="intro section" id="scrapbook">
        <div className="section-kicker"><Sparkles size={15}/> THE LITTLE SCRAPBOOK</div>
        <h2>Some people feel like <em>sunshine.</em></h2>
        <p className="section-lead">And then there's you, Frooti. This page is a tiny collection of all the warm, funny, lovely things that make you <em>you.</em></p>
        <div className="memory-grid">
          {memories.map((m, i) => <article className={`memory-card ${m.tone}`} key={m.title} style={{'--rotate': `${i===0?-2:i===1?2:-1}deg`}}>
            <div className="memory-icon">{m.emoji}</div><span className="card-number">0{i+1} / little moments</span>
            <h3>{m.title}</h3><p>{m.note}</p><span className="card-heart">♡</span>
          </article>)}
        </div>
        <div className="orbit-intro">
          <span className="orbit-label">A LITTLE UNIVERSE OF US</span>
          <h3>Our friendship, in <em>orbit.</em></h3>
          <p>Tap through the little things that make our story ours.</p>
        </div>
        <MemoryOrbit />
      </section>

      <section className="gallery-section section">
        <div className="section-kicker"><Camera size={15}/> THE MEMORY WALL</div>
        <h2>Proof that we make <em>great memories.</em></h2>
        <p className="section-lead">Add your favourite photos together. They'll show up here like little Polaroids.</p>
        <label className="upload-button"><ImagePlus size={17}/> Add our photos<input type="file" accept="image/*" multiple onChange={addPhotos}/></label>
        <div className={`polaroid-grid ${photos.length ? 'has-photos' : ''}`}>
          {photos.map((p,i)=><div className="polaroid" key={p.url} style={{'--tilt':`${(i%5-2)*2}deg`}}><img src={p.url} alt={`Memory ${i+1}`}/><span>{['the good days ♡','core memory','us being us','my favourite people'][i%4]}</span></div>)}
          {photos.length===0 && <>
            <div className="polaroid sample p-one"><div className="sample-art peach-art">☀️</div><span>sunshine days ♡</span></div>
            <div className="polaroid sample p-two"><div className="sample-art lilac-art">🦋</div><span>little adventures</span></div>
            <div className="polaroid sample p-three"><div className="sample-art pink-art">🌷</div><span>my favourite human</span></div>
          </>}
        </div>
        <p className="photo-hint">Your photos stay in this browser session. Add them again if you reopen the page.</p>
      </section>

      <section className="reasons-section section">
        <div className="section-kicker"><Stars size={15}/> A FEW REMINDERS</div>
        <h2>Reasons you're <em>so loved.</em></h2>
        <div className="reasons-grid">{reasons.map((r,i)=><div className="reason" key={r[0]}><span className="reason-no">0{i+1}</span><div><h3>{r[0]}</h3><p>{r[1]}</p></div><Heart size={17}/></div>)}</div>
      </section>

      <section className="letter-section section">
        <div className="letter-deco">✿</div>
        <div className="section-kicker"><Mail size={15}/> A NOTE FROM ME TO YOU</div>
        <h2>One little <em>letter.</em></h2>
        <p className="section-lead">Because some things deserve more than a text message.</p>
        <button className="envelope" onClick={() => setLetterOpen(true)} aria-label="Open birthday letter">
          <div className="envelope-flap"></div><Mail size={36}/><span>tap to open ♡</span>
        </button>
        {letterOpen && <div className="modal-backdrop" onClick={() => setLetterOpen(false)}>
          <article className="letter-paper" onClick={e => e.stopPropagation()}>
            <button className="close-button" onClick={() => setLetterOpen(false)} aria-label="Close letter"><X size={18}/></button>
            <span className="letter-top">to my favourite human ♡</span>
            <h3>Dear Frooti,</h3>
            <p>Happy birthday, bestie! I hope today reminds you how loved, appreciated, and special you are. Thank you for being you — for the laughs, the little moments, the random conversations, and all the memories still waiting for us.</p>
            <p>I hope this new chapter brings you the kind of happiness that stays, dreams that come true, and a hundred reasons to smile. No matter where life takes us, I'm always cheering for you.</p>
            <p className="letter-sign">Lots of love, always <span>♡</span></p>
          </article>
        </div>}
      </section>

      <section className="cake-section section">
        <div className="section-kicker"><Gift size={15}/> MAKE A WISH</div>
        <h2>One more thing… <em>cake!</em></h2>
        <p className="section-lead">Close your eyes, make a wish, and tap the candles.</p>
        <div className="cake-wrap">
          <div className="candles">{candles.map((on,i)=><button key={i} className={`candle ${on?'lit':''}`} onClick={() => setCandles(prev=>prev.map((v,j)=>j===i?false:v))} aria-label={`Toggle candle ${i+1}`}><span className="flame">✦</span><i/></button>)}</div>
          <div className="cake-top"></div><div className="cake-body"><span>♡</span><span>♡</span><span>♡</span></div><div className="cake-plate"></div>
        </div>
        <button className="primary-button wish-button" onClick={blowCandles}>Blow out the candles <Sparkles size={16}/></button>
        <p className="tiny-note">may every wish find its way to you ✨</p>
      </section>

      <footer><div className="footer-heart">♡</div><p>made for Frooti, with all my heart.</p><span>THE WORLD IS LUCKIER WITH YOU IN IT ✿</span></footer>
      {toast && <div className="toast"><Heart size={15} fill="currentColor"/>{toast}</div>}
    </main>
  );
}

export default App;
