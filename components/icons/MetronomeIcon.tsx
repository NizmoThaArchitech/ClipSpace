
import React from 'react';

export const MetronomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21L6 3h12L12 21z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8 15h8" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 6L9 12" />
    </svg>
);
