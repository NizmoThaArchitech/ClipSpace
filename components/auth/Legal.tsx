
import React from 'react';
import type { AuthView } from '../../AuthApp';

interface LegalProps {
  title: string;
  content: string;
  setAuthView: (view: AuthView) => void;
}

const Legal: React.FC<LegalProps> = ({ title, content, setAuthView }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
        <div 
          className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-indigo-400"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
             <button onClick={() => setAuthView('login')} className="font-medium text-indigo-400 hover:underline">
                &larr; Back to Sign In
            </button>
        </div>
      </div>
    </div>
  );
};

export default Legal;
