
import React from 'react';

interface EndorsementLevelIconProps {
  endorsements: number;
  size?: number;
}

interface TierStyle {
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum' | 'Master';
  colors: {
    gradStart: string;
    gradEnd: string;
    stroke: string;
    text: string;
    shadow: string;
    glow?: string;
  };
}

const EndorsementLevelIcon: React.FC<EndorsementLevelIconProps> = ({ endorsements, size = 24 }) => {
  const level = Math.min(20, Math.floor((endorsements || 0) / 250) + 1);

 const getTierStyle = (lvl: number): TierStyle => {
    if (lvl <= 4) { // Bronze
      return { tier: 'Bronze', colors: { gradStart: '#CD7F32', gradEnd: '#8C5A2D', stroke: '#E59F68', text: '#000000', shadow: '#4a2c13' } };
    }
    if (lvl <= 8) { // Silver
      return { tier: 'Silver', colors: { gradStart: '#E0E0E0', gradEnd: '#A0A0A0', stroke: '#FFFFFF', text: '#000000', shadow: '#4b4b4b' } };
    }
    if (lvl <= 12) { // Gold
      return { tier: 'Gold', colors: { gradStart: '#FFD700', gradEnd: '#B8860B', stroke: '#FFFACD', text: '#000000', shadow: '#7c5801', glow: '#FFD700' } };
    }
    if (lvl <= 16) { // Platinum
      return { tier: 'Platinum', colors: { gradStart: '#F0F8FF', gradEnd: '#B0C4DE', stroke: '#FFFFFF', text: '#000000', shadow: '#3c4d5e', glow: '#add8e6' } };
    }
    // Master
    return { tier: 'Master', colors: { gradStart: '#ff4800', gradEnd: '#e00078', stroke: '#ffb399', text: '#000000', shadow: '#6b003a', glow: '#ff4800' } };
  };
  
  const { tier, colors } = getTierStyle(level);

  const Defs = () => (
    <defs>
      <radialGradient id={`grad-${tier}`} cx="50%" cy="50%" r="65%">
        <stop offset="0%" stopColor={colors.gradStart} />
        <stop offset="100%" stopColor={colors.gradEnd} />
      </radialGradient>
      <filter id={`filter-${tier}`} x="-50%" y="-50%" width="200%" height="200%">
        <feDropShadow dx="0" dy="4" stdDeviation="4" floodColor={colors.shadow} floodOpacity="0.7" />
        {colors.glow && <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="glow" />}
        {colors.glow && <feComposite in="glow" in2="SourceGraphic" operator="atop" />}
      </filter>
    </defs>
  );

  const Emblem = () => {
    const commonProps = { fill: `url(#grad-${tier})`, stroke: colors.stroke, strokeLinejoin: "round" as const };
    return (
      <circle cx="50" cy="50" r="45" strokeWidth="3" {...commonProps} />
    );
  }

  return (
    <div style={{ width: size, height: size }}>
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ filter: `url(#filter-${tier})` }}>
        <Defs />
        <Emblem />
        <text
          x="50"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          fontSize="45"
          fontWeight="900"
          fill={colors.text}
          fontFamily="sans-serif, Arial"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1.5"
          strokeLinejoin="round"
          paintOrder="stroke"
        >
          {level}
        </text>
      </svg>
    </div>
  );
};

export default EndorsementLevelIcon;