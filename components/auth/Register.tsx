
import React from 'react';
import type { AuthView } from '../../AuthApp';
import { ClipspaceLogo } from '../icons/ClipspaceLogo';
import { GoogleIcon } from '../icons/GoogleIcon';
import { MicrosoftIcon } from '../icons/MicrosoftIcon';

interface RegisterProps {
  setAuthView: (view: AuthView) => void;
  onLoginSuccess: () => void;
}

const Register: React.FC<RegisterProps> = ({ setAuthView, onLoginSuccess }) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you'd handle form validation and API calls here
    // For now, we'll just simulate a successful registration & login
    onLoginSuccess();
  };

  return (
    <div className="w-full max-w-md mx-auto p-8">
      <div className="text-center mb-8">
        <ClipspaceLogo className="h-20 w-20 mx-auto" theme="dark" />
        <h1 className="text-4xl font-bold tracking-wider mt-4">
          Join Clip<span className="text-indigo-400">Space</span>
        </h1>
        <p className="text-gray-400 mt-2">Start sharing and selling your B-roll today.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
          <input type="text" id="name" required className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-3" />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
          <input type="email" id="email" required className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-3" />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
          <input type="password" id="password" required className="mt-1 block w-full bg-gray-800 border-gray-700 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white p-3" />
        </div>
        <div>
          <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
            Create Account
          </button>
        </div>
      </form>
       <p className="mt-4 text-xs text-center text-gray-500">
            By creating an account, you agree to our{' '}
            <button onClick={() => setAuthView('terms')} className="underline hover:text-gray-300">Terms of Service</button> and{' '}
            <button onClick={() => setAuthView('privacy')} className="underline hover:text-gray-300">Privacy Policy</button>.
        </p>

      <div className="mt-6 relative">
        <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-700" />
        </div>
        <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-black text-gray-400">Or sign up with</span>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        <button className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
            <GoogleIcon className="w-5 h-5 mr-2"/> Google
        </button>
         <button className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-700 rounded-md shadow-sm bg-gray-800 text-sm font-medium text-gray-300 hover:bg-gray-700">
            <MicrosoftIcon className="w-5 h-5 mr-2"/> Microsoft
        </button>
      </div>
      
      <p className="mt-8 text-center text-sm text-gray-400">
        Already have an account?{' '}
        <button onClick={() => setAuthView('login')} className="font-medium text-indigo-400 hover:underline">
            Sign in
        </button>
      </p>
    </div>
  );
};

export default Register;
