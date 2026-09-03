import React from 'react';
import CountryCard from './CountryCard';

const CountryList = ({ countries, loading, error, onRetry, onSelectCountry, darkMode }) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className={`rounded-xl h-80 animate-pulse ${
              darkMode ? 'bg-slate-800' : 'bg-slate-200'
            }`}
          />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={`text-center py-16 px-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
        <svg className="w-12 h-12 mx-auto text-rose-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <h3 className="text-xl font-bold mb-2">Unable to Load Country Data</h3>
        <p className={`text-sm max-w-md mx-auto mb-6 ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          {error}
        </p>
        <button
          onClick={onRetry}
          className="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl transition-all shadow-md"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (countries.length === 0) {
    return (
      <div className={`text-center py-16 px-4 rounded-2xl border ${darkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
        <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <h3 className="text-xl font-bold mb-1">No Countries Found</h3>
        <p className={`text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
          Try adjusting your search query or region filter.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {countries.map((country, index) => (
        <CountryCard
          key={country.cca3 || country.name?.common || index}
          country={country}
          onSelect={onSelectCountry}
          darkMode={darkMode}
        />
      ))}
    </div>
  );
};

export default CountryList;
