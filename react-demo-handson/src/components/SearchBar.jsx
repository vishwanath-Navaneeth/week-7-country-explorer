import React from 'react';

const SearchBar = ({ searchTerm, setSearchTerm, selectedRegion, setSelectedRegion, darkMode }) => {
  const regions = ['All', 'Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 mb-8">
      {/* Search Input */}
      <div className={`relative flex-1 max-w-md rounded-lg shadow-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}>
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a country..."
          className={`w-full pl-12 pr-4 py-3.5 rounded-lg text-sm bg-transparent outline-none placeholder-slate-400 border transition-colors ${
            darkMode ? 'border-slate-700 focus:border-blue-500' : 'border-slate-200 focus:border-blue-500'
          }`}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm('')}
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Region Filter Dropdown */}
      <div className={`relative min-w-[200px] rounded-lg shadow-sm ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}`}>
        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className={`w-full px-4 py-3.5 rounded-lg text-sm appearance-none bg-transparent outline-none border cursor-pointer ${
            darkMode ? 'border-slate-700 focus:border-blue-500' : 'border-slate-200 focus:border-blue-500'
          }`}
        >
          <option value="" disabled hidden>Filter by Region</option>
          {regions.map((region) => (
            <option key={region} value={region} className={darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-900'}>
              {region === 'All' ? 'Filter by Region (All)' : region}
            </option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none text-slate-400">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
