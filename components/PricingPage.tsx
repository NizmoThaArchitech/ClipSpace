
import React from 'react';
import type { View } from '../App';
import { CheckIcon } from './icons/CheckIcon';
import { CloseIcon } from './icons/CloseIcon';

interface PricingPageProps {
    setCurrentView: (view: View) => void;
}

const PricingPage: React.FC<PricingPageProps> = ({ setCurrentView }) => {

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
            cta: 'Current Plan',
            isPopular: false,
            isCurrent: true,
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
            cta: 'Upgrade to Pro',
            isPopular: true,
            isCurrent: false,
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
            cta: 'Upgrade to Studio',
            isPopular: false,
            isCurrent: false,
        },
    ];

    const comparisonFeatures = {
        'Marketplace': [
            { feature: 'Clip Uploads', free: '5 per month', pro: '50 per month', studio: 'Unlimited' },
            { feature: 'Transaction Fee', free: '20%', pro: '10%', studio: '5%' },
            { feature: 'Custom License Tiers', free: false, pro: true, studio: true },
        ],
        'Creator Studio': [
            { feature: 'Basic Analytics', free: true, pro: true, studio: true },
            { feature: 'Advanced Analytics', free: false, pro: true, studio: true },
            { feature: 'AI Storyboard Studio', free: false, pro: 'Limited', studio: 'Full Access' },
            { feature: 'Rights Hub', free: false, pro: 'Limited', studio: 'Full Access' },
            { feature: 'Syndication Tools', free: false, pro: false, studio: true },
            { feature: 'Affiliate Program', free: false, pro: true, studio: true },
        ],
        'Connect': [
            { feature: 'Community Forums', free: true, pro: true, studio: true },
            { feature: 'Live Co-Create', free: 'Viewer', pro: 'Participant', studio: 'Host' },
            { feature: 'Mentorship Hub', free: 'Mentees only', pro: 'Mentees only', studio: 'Become a Mentor' },
            { feature: 'Team Collaboration', free: false, pro: false, studio: true },
        ],
    };

    return (
         <div className="w-full max-w-7xl mx-auto py-16 px-4">
            <div className="text-center mb-12">
                <h1 className="text-4xl lg:text-5xl font-bold text-white">Find the perfect plan for you</h1>
                <p className="text-gray-400 mt-2">Upgrade your plan to unlock more features and maximize your earnings.</p>
            </div>

            {/* Pricing Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
                {tiers.map(tier => (
                    <div key={tier.name} className={`relative flex flex-col bg-gray-800 rounded-2xl p-8 border ${tier.isPopular ? 'border-indigo-500 shadow-indigo-500/20 shadow-2xl' : 'border-gray-700'}`}>
                        {tier.isPopular && <div className="absolute top-0 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">Most Popular</div>}
                        <h3 className="text-2xl font-bold text-white">{tier.name}</h3>
                        <p className="text-gray-400 mt-2 flex-grow">{tier.description}</p>
                        <div className="mt-6">
                            <span className="text-5xl font-extrabold text-white">{tier.price}</span>
                            <span className="text-lg font-medium text-gray-400">{tier.freq}</span>
                        </div>
                        <button 
                            onClick={() => !tier.isCurrent && setCurrentView('wallet')} 
                            disabled={tier.isCurrent}
                            className={`mt-8 w-full py-3 font-semibold rounded-lg transition-colors ${tier.isCurrent ? 'bg-gray-600 text-gray-400 cursor-not-allowed' : (tier.isPopular ? 'bg-indigo-600 hover:bg-indigo-700 text-white' : 'bg-gray-700 hover:bg-gray-600 text-white')}`}>
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

            {/* Feature Comparison Table */}
            <div className="mt-24">
                <h2 className="text-3xl font-bold text-white text-center mb-8">Compare Features</h2>
                <div className="bg-gray-800 rounded-lg border border-gray-700 overflow-hidden">
                    {Object.entries(comparisonFeatures).map(([category, features]) => (
                        <div key={category} className="border-b border-gray-700 last:border-b-0">
                            <h3 className="text-lg font-semibold bg-gray-700/50 p-4 text-white">{category}</h3>
                            {features.map((item, index) => (
                                <div key={item.feature} className={`grid grid-cols-4 items-center gap-4 p-4 text-sm ${index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-800/50'}`}>
                                    <p className="col-span-1 text-gray-300">{item.feature}</p>
                                    <p className="col-span-1 text-center text-white">
                                        {typeof item.free === 'boolean' ? (item.free ? <CheckIcon className="w-6 h-6 text-green-400 mx-auto"/> : <CloseIcon className="w-5 h-5 text-red-400 mx-auto"/>) : item.free}
                                    </p>
                                    <p className="col-span-1 text-center text-white">
                                        {typeof item.pro === 'boolean' ? (item.pro ? <CheckIcon className="w-6 h-6 text-green-400 mx-auto"/> : <CloseIcon className="w-5 h-5 text-red-400 mx-auto"/>) : item.pro}
                                    </p>
                                    <p className="col-span-1 text-center text-white">
                                        {typeof item.studio === 'boolean' ? (item.studio ? <CheckIcon className="w-6 h-6 text-green-400 mx-auto"/> : <CloseIcon className="w-5 h-5 text-red-400 mx-auto"/>) : item.studio}
                                    </p>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>

            {/* Detailed Tier Descriptions */}
            <div className="mt-24 text-center">
                 <h2 className="text-3xl font-bold text-white mb-8">Detailed Plan Information</h2>
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                     <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                         <h3 className="text-xl font-bold text-indigo-400">Why Go Pro?</h3>
                         <p className="text-gray-300 mt-2">The Pro plan is designed for the active creator who's ready to turn their passion into a profession. With significantly lower transaction fees and higher upload limits, you keep more of what you earn. Access to Advanced Analytics gives you the data you need to understand what content performs best, helping you refine your strategy and grow your audience.</p>
                     </div>
                      <div className="bg-gray-800 p-6 rounded-lg border border-gray-700">
                         <h3 className="text-xl font-bold text-purple-400">Why Go Studio?</h3>
                         <p className="text-gray-300 mt-2">The Studio plan is our all-in-one solution for professionals, agencies, and teams. With the lowest transaction fees and unlimited uploads, there are no limits to your marketplace potential. But Studio is more than that—it's a full production suite. Host collaborative sessions, use the AI Co-Director to storyboard projects, and distribute your content across platforms with our powerful Syndication tools.</p>
                     </div>
                 </div>
            </div>

             {/* Fine Print */}
            <div className="mt-24 text-center">
                 <h2 className="text-3xl font-bold text-white mb-8">The Fine Print</h2>
                 <div className="text-left max-w-3xl mx-auto space-y-4 text-gray-400">
                     <div>
                        <h4 className="font-semibold text-gray-200">Billing Cycle</h4>
                        <p>All paid plans are billed monthly or annually, based on your selection at checkout. Your subscription will automatically renew at the end of each billing period.</p>
                     </div>
                      <div>
                        <h4 className="font-semibold text-gray-200">Cancellation Policy</h4>
                        <p>You can cancel your subscription at any time from your account settings. Your plan will remain active until the end of the current billing period, and you will not be charged again.</p>
                     </div>
                      <div>
                        <h4 className="font-semibold text-gray-200">Transaction Fees</h4>
                        <p>Transaction fees are calculated based on the sale price of a clip and are deducted automatically at the time of sale. The percentage is determined by your subscription tier.</p>
                     </div>
                 </div>
            </div>

            <p className="mt-24 text-center text-sm text-gray-400">
                <button onClick={() => setCurrentView('feed')} className="font-medium text-indigo-400 hover:underline">
                    &larr; Back to Feed
                </button>
            </p>
         </div>
    );
};

export default PricingPage;
