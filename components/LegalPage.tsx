
import React from 'react';
import type { View } from '../App';

interface LegalPageProps {
  title: string;
  content: string;
  setCurrentView: (view: View) => void;
}

const LegalPage: React.FC<LegalPageProps> = ({ title, content, setCurrentView }) => {
  return (
    <div className="w-full max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="bg-gray-800 p-8 rounded-lg border border-gray-700">
        <h1 className="text-3xl font-bold text-white mb-6">{title}</h1>
        <div 
          className="prose prose-invert max-w-none prose-p:text-gray-300 prose-headings:text-white prose-a:text-indigo-400"
          dangerouslySetInnerHTML={{ __html: content }}
        />
        <div className="mt-8 pt-6 border-t border-gray-700 text-center">
             <button onClick={() => setCurrentView('feed')} className="font-medium text-indigo-400 hover:underline">
                &larr; Back to Feed
            </button>
        </div>
      </div>
    </div>
  );
};

export default LegalPage;
