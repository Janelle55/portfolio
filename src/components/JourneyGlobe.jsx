import { useEffect, useRef, useState } from 'react';
import Globe from 'globe.gl';
import { journey } from '../data/content.js';

// A real 3D globe (globe.gl / three.js) showing the route from Accra to D.C.
// It spins on its own, can be dragged, and falls back to a still image
// if the visitor's browser can't run WebGL.
export default function JourneyGlobe() {
  const holder = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const el = holder.current;
    if (!el) return undefined;
    let globe;
    try {
      const size = el.clientWidth || 420;
      const [from, to] = journey;
      globe = new Globe(el, { animateIn: true })
        .width(size)
        .height(size)
        .backgroundColor('rgba(0,0,0,0)')
        .globeImageUrl('/earth.jpg')
        .showAtmosphere(true)
        .atmosphereColor('#FFD9A8')
        .atmosphereAltitude(0.2)
        .arcsData([{ startLat: from.lat, startLng: from.lng, endLat: to.lat, endLng: to.lng }])
        .arcColor(() => ['#F6DD95', '#FF7EB6'])
        .arcStroke(0.9)
        .arcAltitude(0.28)
        .arcDashLength(0.45)
        .arcDashGap(0.15)
        .arcDashAnimateTime(2600)
        .pointsData(journey)
        .pointLat('lat')
        .pointLng('lng')
        .pointColor(() => '#FF7EB6')
        .pointAltitude(0.015)
        .pointRadius(0.75)
        .htmlElementsData(journey)
        .htmlLat('lat')
        .htmlLng('lng')
        .htmlElement((d) => {
          const tag = document.createElement('div');
          tag.className = 'globe-tag';
          tag.textContent = d.label;
          return tag;
        });

      globe.pointOfView({ lat: 24, lng: -38, altitude: 1.9 }, 0);

      const controls = globe.controls();
      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      controls.autoRotate = !reduceMotion;
      controls.autoRotateSpeed = 0.55;
      controls.enableZoom = false;

      const resize = new ResizeObserver(() => {
        const w = el.clientWidth;
        if (w) globe.width(w).height(w);
      });
      resize.observe(el);

      return () => {
        resize.disconnect();
        if (typeof globe._destructor === 'function') globe._destructor();
        el.innerHTML = '';
      };
    } catch (err) {
      setFailed(true);
      return undefined;
    }
  }, []);

  if (failed) {
    return <div className="globe-fallback" role="img" aria-label="Earth showing Accra and Washington, D.C." />;
  }

  return (
    <div
      ref={holder}
      className="globe-holder"
      role="img"
      aria-label="Spinning globe with a gold route from Accra, Ghana to Washington, D.C."
    />
  );
}
