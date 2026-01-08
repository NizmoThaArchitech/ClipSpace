
import React, { useState, useEffect } from 'react';
import type { VideoClip, LicenseTier } from '../types';
import type { Theme } from '../App';
import { CloseIcon } from './icons/CloseIcon';
import { LockClosedIcon } from './icons/LockClosedIcon';
import { CreditCardIcon } from './icons/CreditCardIcon';

interface MarketplaceListing extends VideoClip {
    type: 'sell' | 'buy' | 'gig';
}

interface CheckoutModalProps {
  listing: MarketplaceListing;
  onClose: () => void;
  theme: Theme;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({ listing, onClose, theme: _theme }) => {
    const [selectedLicense, setSelectedLicense] = useState<LicenseTier | null>(listing.licenseTiers?.[0] || null);
    const [paymentStep, setPaymentStep] = useState<'details' | 'processing' | 'success'>('details');

    const handlePayment = (e: React.FormEvent) => {
        e.preventDefault();
        setPaymentStep('processing');
        setTimeout(() => {
            setPaymentStep('success');
        }, 2000);
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-gray-800 rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden border border-gray-700">
                <div className="flex justify-between items-center p-4 border-b border-gray-700 flex-shrink-0">
                    <h2 className="text-xl font-bold text-white">Checkout</h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white"><CloseIcon className="w-6 h-6" /></button>
                </div>

                {paymentStep === 'success' ? (
                    <div className="flex flex-col items-center justify-center text-center p-12 flex-grow">
                        <div className="p-4 bg-green-500/20 rounded-full mb-4">
                            <svg className="w-16 h-16 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                        </div>
                        <h3 className="text-2xl font-bold text-white">Payment Successful!</h3>
                        <p className="text-gray-400 mt-2">Your download link has been sent to your email.</p>
                        <button onClick={onClose} className="mt-6 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-2 px-6 rounded-lg">Close</button>
                    </div>
                ) : (
                    <div className="flex flex-col md:flex-row flex-grow min-h-0">
                        {/* Left Side - Item Details */}
                        <div className="w-full md:w-1/2 p-6 flex flex-col space-y-4 border-b md:border-b-0 md:border-r border-gray-700">
                            <img src={listing.thumbnailUrl} alt={listing.title} className="w-full aspect-video object-cover rounded-lg" />
                            <div>
                                <h3 className="text-lg font-bold text-white">{listing.title}</h3>
                                <p className="text-sm text-gray-400">by {listing.creator.name}</p>
                            </div>
                            <div className="space-y-3">
                                <h4 className="font-semibold text-gray-300">Select License:</h4>
                                {listing.licenseTiers?.map(tier => (
                                    <label key={tier.name} className={`block p-3 rounded-lg border-2 cursor-pointer transition-colors ${selectedLicense?.name === tier.name ? 'bg-indigo-500/20 border-indigo-500' : 'bg-gray-700/50 border-gray-700 hover:border-gray-600'}`}>
                                        <div className="flex justify-between items-center">
                                            <span className="font-bold text-white">{tier.name}</span>
                                            <span className="font-bold text-green-400">${tier.price.toFixed(2)}</span>
                                        </div>
                                        <p className="text-xs text-gray-400 mt-1">{tier.description}</p>
                                        <input type="radio" name="license" value={tier.name} checked={selectedLicense?.name === tier.name} onChange={() => setSelectedLicense(tier)} className="hidden" />
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Right Side - Payment Form */}
                        <form onSubmit={handlePayment} className="w-full md:w-1/2 p-6 flex flex-col">
                            <h3 className="text-lg font-bold text-white mb-4">Payment Details</h3>
                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-gray-300">Card Number</label>
                                    <div className="relative mt-1">
                                        <CreditCardIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
                                        <input type="text" placeholder="•••• •••• •••• 4242" required className="w-full bg-gray-700 text-white rounded-lg pl-10 pr-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-gray-300">Expiry Date</label>
                                        <input type="text" placeholder="MM / YY" required className="w-full mt-1 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                    <div className="flex-1">
                                        <label className="text-sm font-medium text-gray-300">CVC</label>
                                        <input type="text" placeholder="123" required className="w-full mt-1 bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500"/>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-auto pt-6">
                                <div className="flex justify-between text-gray-300 mb-2">
                                    <span>Subtotal</span>
                                    <span>${selectedLicense?.price.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-gray-300 mb-4">
                                    <span>Taxes & Fees</span>
                                    <span>${(selectedLicense?.price * 0.08).toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-lg border-t border-gray-700 pt-4">
                                    <span>Total</span>
                                    <span>${(selectedLicense?.price * 1.08).toFixed(2)}</span>
                                </div>
                                <button type="submit" disabled={paymentStep === 'processing'} className="w-full mt-4 bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg flex items-center justify-center gap-2 transition-colors disabled:bg-green-400">
                                    {paymentStep === 'processing' ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Processing...
                                        </>
                                    ) : (
                                        <>
                                            <LockClosedIcon className="w-5 h-5" />
                                            Pay ${(selectedLicense?.price * 1.08).toFixed(2)}
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CheckoutModal;
