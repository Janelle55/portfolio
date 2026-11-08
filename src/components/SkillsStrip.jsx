import { skills } from '../data/content.js';

export default function SkillsStrip() {
  const loop = [...skills, ...skills];
  return (
    <div className="skills-strip">
      <p className="visually-hidden">Skills: {skills.join(', ')}</p>
      <div className="skills-track" aria-hidden="true">
        {loop.map((s, i) => (
          <span key={i}>
            {s} <span className="flower">✿</span>
          </span>
        ))}
      </div>
    </div>
  );
}
