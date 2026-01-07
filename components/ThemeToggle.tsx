
import React from 'react';
import type { Theme } from '../App';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, setTheme }) => {
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  const isDark = theme === 'dark';

  return (
    <button
      onClick={toggleTheme}
      className={`relative inline-flex items-center h-8 w-14 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 ${isDark ? 'bg-gray-600 focus:ring-offset-gray-800' : 'bg-yellow-400 focus:ring-offset-black'}`}
    >
      <span
        className={`inline-block w-6 h-6 transform bg-white rounded-full transition-transform duration-300 ease-in-out ${isDark ? 'translate-x-1' : 'translate-x-7'}`}
      />
      <SunIcon className={`absolute left-1.5 w-5 h-5 text-yellow-500 transition-opacity duration-200 ${isDark ? 'opacity-0' : 'opacity-100'}`} />
      <MoonIcon className={`absolute right-1.5 w-5 h-5 text-gray-200 transition-opacity duration-200 ${isDark ? 'opacity-100' : 'opacity-0'}`} />
    </button>
  );
};

export default ThemeToggle;
