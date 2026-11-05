import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Heart } from 'lucide-react';

const moments = [
  { tag: 'THE LAUGH ATTACKS', title: 'The silly moments', text: 'The kind of laughter where absolutely nothing makes sense — and somehow everything is perfect.', icon: '☀️', tone: 'orbit-peach' },
  { tag: 'THE LITTLE ADVENTURES', title: 'The spontaneous plans', text: 'Every tiny plan turns into a story. Here is to many more unplanned, unforgettable days.', icon: '🦋', tone: 'orbit-lilac' },
  { tag: 'THE ALWAYS THERE', title: 'The comfort moments', text: 'No grand occasion needed. Just knowing you are there makes an ordinary day feel special.', icon: '🌷', tone: 'orbit-pink' },
  { tag: 'THE NEXT CHAPTER', title: 'All that is waiting', text: 'More photos, more inside jokes, more late conversations, and a million memories we have not made yet.', icon: '✨', tone: 'orbit-mint' },
];

export default function MemoryOrbit() {
  const [active, setActive] = useState(0);
  const move = (step) => setActive((current) => (current + step + moments.length) % moments.length);
  return (
    <div className="memory-orbit" aria-roledescription="carousel" aria-label="Friendship memories">
      <div className="orbit-stage">
        <div className="orbit-ring" />
        {moments.map((item, index) => {
          const offset = (index - active + moments.length) % moments.length;
          const angle = offset * 90;
          return (
            <button
              type="button"
              key={item.title}
              className={`orbit-card ${item.tone} ${offset === 0 ? 'is-active' : ''}`}
              style={{ '--orbit-angle': `${angle}deg`, '--orbit-counter': `${-angle}deg`, '--orbit-depth': offset === 0 ? 0 : 1 }}
              onClick={() => setActive(index)}
              aria-label={`Show ${item.title}`}
              aria-pressed={offset === 0}
            >
              <span className="orbit-card-icon">{item.icon}</span>
              <span className="orbit-card-tag">{item.tag}</span>
              <strong>{item.title}</strong>
              <span className="orbit-card-copy">{item.text}</span>
              <Heart className="orbit-card-heart" size={16} />
            </button>
          );
        })}
        <div className="orbit-center"><span>F</span><small>+ YOU</small></div>
      </div>
      <div className="orbit-controls">
        <button type="button" onClick={() => move(-1)} aria-label="Previous memory"><ChevronLeft size={18}/></button>
        <div className="orbit-dots" aria-label={`Memory ${active + 1} of ${moments.length}`}>
          {moments.map((item, i) => <button key={item.title} onClick={() => setActive(i)} aria-label={`Go to memory ${i + 1}`} aria-current={active === i ? 'true' : undefined}/>)}
        </div>
        <button type="button" onClick={() => move(1)} aria-label="Next memory"><ChevronRight size={18}/></button>
      </div>
      <p className="orbit-caption">a friendship that keeps going round ♡</p>
    </div>
  );
}
