import React, { createContext, useContext, useState, useEffect } from 'react';

type Theme = 'dark' | 'light' | 'system';

interface ThemeContextType {
  theme: Theme;
  effectiveTheme: 'dark' | 'light';
  setTheme: (t: Theme) => void;
}

const ThemeContext = createContext<ThemeContextType | null>(null);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem('badra_theme') as Theme) || 'dark';
  });

  const getEffective = (t: Theme): 'dark' | 'light' => {
    if (t === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return t;
  };

  const [effectiveTheme, setEffectiveTheme] = useState<'dark' | 'light'>(getEffective(theme));

  const setTheme = (t: Theme) => {
    setThemeState(t);
    localStorage.setItem('badra_theme', t);
    const eff = getEffective(t);
    setEffectiveTheme(eff);
    document.documentElement.classList.toggle('dark', eff === 'dark');
  };

  useEffect(() => {
    const eff = getEffective(theme);
    document.documentElement.classList.toggle('dark', eff === 'dark');
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, effectiveTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
