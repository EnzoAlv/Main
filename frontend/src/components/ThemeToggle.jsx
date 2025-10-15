import { useContext } from 'react';
import ThemeContext from '../context/ThemeContext';

export default function ThemeToggle() {

  const { theme, toggleTheme } = useContext(ThemeContext);
  
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      className="btn btn-ghost"
      onClick={toggleTheme}
      title={isDark ? 'Tema claro' : 'Tema escuro'}
      style={{ padding: '6px 10px', fontWeight: 700 }}
    >
      {isDark ? '☀️' : '🌙'}
    </button>
  );
}