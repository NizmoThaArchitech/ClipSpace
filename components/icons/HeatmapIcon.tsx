
import React from 'react';

export const HeatmapIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <circle cx="12" cy="12" r="3" fill="currentColor" className="text-red-500 opacity-70" />
        <circle cx="12" cy="12" r="6" stroke="currentColor" strokeWidth="1" fill="none" className="text-yellow-500 opacity-50" />
        <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-green-500 opacity-30" />
    </svg>
);
