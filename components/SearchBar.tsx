
import React from 'react';
import { SearchIcon } from './icons/SearchIcon';
import type { Theme } from '../App';
import { ImageIcon } from './icons/ImageIcon';

interface SearchBarProps {
  theme: Theme;
}

const SearchBar: React.FC<SearchBarProps> = ({ theme }) => {
  const isDark = theme === 'dark';
  return (
    <div className="w-full max-w-lg lg:max-w-xs">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <div className={`relative ${isDark ? 'text-gray-400 focus-within:text-gray-200' : 'text-gray-500 focus-within:text-gray-700'}`}>
        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
          <SearchIcon className="h-5 w-5" />
        </div>
        <input
          id="search"
          className={`block w-full border rounded-md py-2 pl-10 pr-10 leading-5 placeholder-gray-400 focus:outline-none sm:text-sm
            ${isDark 
              ? 'bg-gray-700 text-gray-200 border-gray-600 focus:bg-white focus:border-white focus:ring-white focus:text-gray-900' 
              : 'bg-gray-200 text-gray-900 border-gray-300 focus:bg-white focus:border-gray-400 focus:ring-gray-400'
            }`}
          placeholder="explore ClipSpace"
          type="search"
          name="search"
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <button className="text-gray-400 hover:text-gray-200">
                <ImageIcon className="h-5 w-5" />
            </button>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
