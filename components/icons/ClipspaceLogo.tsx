
import React from 'react';
import type { Theme } from '../../App';

interface ClipspaceLogoProps extends React.SVGProps<SVGSVGElement> {
  theme: Theme;
}

export const ClipspaceLogo: React.FC<ClipspaceLogoProps> = ({ theme, ...props }) => {
  const isDark = theme === 'dark';

  const lightColors = {
    start: '#F87171', // red-400
    end: '#DC2626'   // red-600
  };
  const darkColors = {
    start: '#818cf8', // indigo-400
    end: '#4f46e5'   // indigo-600
  };

  const colors = isDark ? darkColors : lightColors;

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style={{ stopColor: colors.start }} />
          <stop offset="100%" style={{ stopColor: colors.end }} />
        </linearGradient>
      </defs>
      <path 
        d="M50 10 C 27.9 10 10 27.9 10 50 C 10 72.1 27.9 90 50 90 C 72.1 90 90 72.1 90 50 C 90 27.9 72.1 10 50 10 Z M 50 20 C 66.6 20 80 33.4 80 50 C 80 66.6 66.6 80 50 80 C 33.4 80 20 66.6 20 50 C 20 33.4 33.4 20 50 20 Z" 
        fill="url(#logoGradient)" 
      />
      <polygon points="43,35 65,50 43,65" fill="#FFFFFF" />
    </svg>
  );
};
