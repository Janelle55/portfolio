import { useMemo } from 'react';

// Deterministic star field so the sky looks the same on every visit.
export default function Stars({ count = 70, maxTop = 70, seed = 11 }) {
  const stars = useMemo(() => {
    let s = seed;
    const rnd = () => {
      s = (s * 9301 + 49297) % 233280;
      return s / 233280;
    };
    return Array.from({ length: count }, () => ({
      left: `${(rnd() * 100).toFixed(2)}%`,
      top: `${(rnd() * maxTop).toFixed(2)}%`,
      size: `${(1 + rnd() * 2.4).toFixed(1)}px`,
      opacity: (0.35 + rnd() * 0.65).toFixed(2),
    }));
  }, [count, maxTop, seed]);

  return (
    <div className="stars" aria-hidden="true">
      {stars.map((st, i) => (
        <span
          key={i}
          className="star"
          style={{ left: st.left, top: st.top, width: st.size, height: st.size, opacity: st.opacity }}
        />
      ))}
    </div>
  );
}
