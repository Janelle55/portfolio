import { useContent } from '../ContentContext.jsx';

export default function SkillsStrip() {
  const { skills } = useContent();
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
