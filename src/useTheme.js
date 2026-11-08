import { useEffect, useState } from 'react';

// Returns 'light' or 'dark'. Starts from the visitor's saved choice,
// otherwise from their device setting, and follows device changes
// until they pick a mode themselves.
function systemTheme() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

function savedTheme() {
  try {
    return localStorage.getItem('theme');
  } catch {
    return null;
  }
}

export function useTheme() {
  const [theme, setTheme] = useState(() => savedTheme() || systemTheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  useEffect(() => {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    const onChange = () => {
      if (!savedTheme()) setTheme(systemTheme());
    };
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    try {
      localStorage.setItem('theme', next);
    } catch {
      /* storage blocked: the choice still applies for this visit */
    }
    setTheme(next);
  };

  return [theme, toggle];
}
