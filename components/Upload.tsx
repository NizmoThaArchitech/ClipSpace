
import React, { useState } from 'react';
import { generateTagsAndDescription } from '../services/geminiService';
import type { AIGeneratedContent } from '../services/geminiService';
import { SparklesIcon } from './icons/SparklesIcon';
import { UploadIcon } from './icons/UploadIcon';
import type { Theme } from '../App';
import { MagicWandIcon } from './icons/MagicWandIcon';

interface UploadProps {
  theme: Theme;
}

const Upload: React.FC<UploadProps> = () => {
  const [fileName, setFileName] = useState<string | null>(null);
  const [aiPrompt, setAiPrompt] = useState('');
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [generatedContent, setGeneratedContent] = useState<AIGeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFileName(e.target.files[0].name);
    }
  };
  
  const resetForm = () => {
    setFileName(null);
    setAiPrompt('');
    setTitle('');
    setPrice('');
    setGeneratedContent(null);
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic to submit the form data would go here
    
    // Show success message and reset form
    setSuccessMessage('Your clip has been submitted successfully!');
    resetForm();
    setTimeout(() => setSuccessMessage(null), 5000);
  };

  const handleGenerateContent = async () => {
    if (!aiPrompt.trim()) {
      setError('Please enter a description for the AI to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);
    try {
      const content = await generateTagsAndDescription(aiPrompt);
      setGeneratedContent(content);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'An unknown error occurred.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-8">
      <div className="bg-gray-800 rounded-lg shadow-xl p-8">
        <h1 className="text-3xl font-bold text-white mb-2">Upload Your B-Roll</h1>
        <p className="text-gray-400 mb-6">Share your unused footage with the creator community.</p>

        {successMessage && (
            <div className="mb-6 p-4 bg-green-500/20 text-green-300 rounded-lg text-center">
                {successMessage}
            </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Video File</label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-600 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <UploadIcon className="mx-auto h-12 w-12 text-gray-500"/>
                <div className="flex text-sm text-gray-400">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-gray-800 rounded-md font-medium text-indigo-400 hover:text-indigo-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-800 focus-within:ring-indigo-500"
                  >
                    <span>Upload a file</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} required/>
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">MP4, MOV, AVI up to 2GB</p>
                {fileName && <p className="text-sm text-green-400 mt-2">{fileName}</p>}
              </div>
            </div>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-lg border border-teal-500/30">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <MagicWandIcon className="h-5 w-5 mr-2 text-teal-400"/>
              AI Video Enhancement Toolkit
            </h2>
            <p className="text-sm text-gray-400 mt-1 mb-3">Improve your clip's quality before uploading.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white text-sm">Auto Color</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" />
                </div>
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white text-sm">Stabilization</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" defaultChecked/>
                </div>
                <div className="flex items-center justify-between bg-gray-700/50 p-3 rounded-lg">
                    <div>
                        <p className="font-medium text-white text-sm">4K Upscale</p>
                    </div>
                    <input type="checkbox" className="toggle-checkbox" />
                </div>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-300">Title</label>
            <input type="text" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" placeholder="e.g., Drone Shot of a Winding Mountain Road" required/>
          </div>

          <div className="bg-gray-900/50 p-4 rounded-lg border border-indigo-500/30">
            <h2 className="text-lg font-semibold text-white flex items-center">
              <SparklesIcon className="h-5 w-5 mr-2 text-indigo-400"/>
              AI-Powered Tagging & Description
            </h2>
            <p className="text-sm text-gray-400 mt-1 mb-3">Describe your video, and let AI do the heavy lifting.</p>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              <input 
                type="text"
                value={aiPrompt}
                onChange={(e) => setAiPrompt(e.target.value)}
                className="flex-grow w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
                placeholder="e.g., A slow motion video of coffee pouring into a cup"
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={handleGenerateContent}
                disabled={isLoading}
                className="w-full sm:w-auto flex justify-center items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:cursor-not-allowed"
              >
                {isLoading ? 'Generating...' : 'Generate'}
              </button>
            </div>
             {error && <p className="text-red-400 text-sm mt-2">{error}</p>}
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-300">Description</label>
            <textarea
              id="description"
              rows={3}
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
              placeholder="A compelling description of your video clip..."
              value={generatedContent?.description || ''}
              onChange={(e) => setGeneratedContent(prev => prev ? {...prev, description: e.target.value} : { description: e.target.value, tags: []})}
              required
            ></textarea>
          </div>
          
          <div>
            <label htmlFor="tags" className="block text-sm font-medium text-gray-300">Tags</label>
            <input
              type="text"
              id="tags"
              className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white"
              placeholder="e.g., drone, mountains, road, nature, cinematic"
              value={generatedContent?.tags.join(', ') || ''}
              onChange={(e) => setGeneratedContent(prev => prev ? {...prev, tags: e.target.value.split(',').map(t => t.trim())} : { description: '', tags: e.target.value.split(',').map(t => t.trim())})}
              required
            />
             <p className="mt-2 text-xs text-gray-500">Separate tags with commas.</p>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-300">Price ($)</label>
            <input type="number" id="price" min="0" step="0.01" value={price} onChange={(e) => setPrice(e.target.value)} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 text-white" placeholder="29.99" required/>
          </div>
          
          <div className="pt-5">
            <div className="flex justify-end">
              <button type="button" onClick={resetForm} className="bg-gray-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-gray-500">Cancel</button>
              <button type="submit" className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-green-500">Submit Clip</button>
            </div>
          </div>
        </form>
      </div>
       <style>{`
        .toggle-checkbox {
          appearance: none;
          width: 40px;
          height: 20px;
          background-color: #4b5563;
          border-radius: 9999px;
          position: relative;
          cursor: pointer;
          transition: background-color 0.2s ease-in-out;
        }
        .toggle-checkbox::before {
          content: '';
          width: 16px;
          height: 16px;
          background-color: white;
          border-radius: 9999px;
          position: absolute;
          top: 2px;
          left: 2px;
          transition: transform 0.2s ease-in-out;
        }
        .toggle-checkbox:checked {
          background-color: #10b981;
        }
        .toggle-checkbox:checked::before {
          transform: translateX(20px);
        }
       `}</style>
    </div>
  );
};

export default Upload;
