
import React from 'react';
import type { AuthView } from '../../AuthApp';
import { CheckIcon } from '../icons/CheckIcon';

interface PricingProps {
    setAuthView: (view: AuthView) => void;
}

const Pricing: React.FC<PricingProps> = ({ setAuthView }) => {

    const tiers = [
        {
            name: 'Free',
            price: '$0',
            freq: '/forever',
            description: 'Get started and explore the ClipSpace community.',
            features: [
                'Browse and purchase clips',
                'Upload and sell up to 5 clips',
                '20% transaction fee on sales',
                'Participate in community forums',
            ],
            cta: 'Get Started',
            isPopular: false,
        },
        {
            name: 'Pro',
            price: '$12',
            freq: '/month',
            description: 'For active creators looking to grow their business.',
            features: [
                'Upload up to 50 clips per month',
                '10% transaction fee on sales',
                'Access to advanced analytics',
                'Live Co-Create participation',
                'Profile customization options',
                'Priority support',
            ],
            cta: 'Start Pro Trial',
            isPopular: true,
        },
        {
            name: 'Studio',
            price: '$35',
            freq: '/month',
            description: 'The ultimate toolkit for professional creators and teams.',
            features: [
                'Unlimited clip uploads',
                '5% transaction fee on sales',
                'Full access to AI Storyboard Studio',
                'Host conference rooms',
                'Syndication & Distribution tools',
                'Team collaboration features',
            ],
            cta: 'Go Studio',
            isPopular: false,
        },
    ];

    return (
         <div className="w-full max-w-6xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-white">Find the perfect plan for you</h1>
                <p className="text-gray-400 mt-2">Start for free, then upgrade as you grow.</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {tiers.map(tier => (
                    <div key={tier.name} className={`relative flex flex-col bg-gray-800 rounded-2xl p-8 border ${tier.isPopular ? 'border-indigo-500' : 'border-gray-700'}`}>
                        {tier.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">MOST POPULAR</div>}
                        <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                        <p className="text-gray-400 mt-2 flex-grow">{tier.description}</p>
                        <div className="mt-6">
                            <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                            <span className="text-lg font-medium text-gray-400">{tier.freq}</span>
                        </div>
                        <button onClick={() => setAuthView('register')} className={`mt-8 w-full py-3 font-semibold rounded-lg ${tier.isPopular ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white'}`}>
                            {tier.cta}
                        </button>
                        <ul className="mt-8 space-y-4 text-sm text-gray-300">
                            {tier.features.map(feature => (
                                <li key={feature} className="flex items-center gap-3">
                                    <CheckIcon className="w-5 h-5 text-green-400 flex-shrink-0" />
                                    <span>{feature}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                ))}
            </div>
            <p className="mt-12 text-center text-sm text-gray-400">
                Already have an account?{' '}
                <button onClick={() => setAuthView('login')} className="font-medium text-indigo-400 hover:underline">
                    Sign in
                </button>
            </p>
         </div>
    );
};

export default Pricing;
