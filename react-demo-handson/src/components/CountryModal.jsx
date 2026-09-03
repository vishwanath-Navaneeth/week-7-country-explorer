import React, { useEffect } from 'react';

const CountryModal = ({ country, onClose, darkMode }) => {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!country) return null;

  const name = country.name?.common || 'Unknown';
  const officialName = country.name?.official || name;
  const flag = country.flags?.svg || country.flags?.png || '';
  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const region = country.region || 'N/A';
  const subregion = country.subregion || 'N/A';
  const capital = Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital || 'N/A');
  
  const languages = country.languages 
    ? Object.values(country.languages).join(', ') 
    : 'N/A';

  const currencies = country.currencies 
    ? Object.values(country.currencies).map(c => `${c.name} (${c.symbol || ''})`).join(', ') 
    : 'N/A';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div 
        className={`relative w-full max-w-2xl rounded-2xl shadow-2xl p-6 sm:p-8 max-h-[90vh] overflow-y-auto border transition-all ${
          darkMode ? 'bg-slate-800 text-white border-slate-700' : 'bg-white text-slate-900 border-slate-200'
        }`}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className={`absolute top-4 right-4 p-2 rounded-full transition-colors ${
            darkMode ? 'hover:bg-slate-700 text-slate-400 hover:text-white' : 'hover:bg-slate-100 text-slate-500 hover:text-slate-900'
          }`}
          aria-label="Close modal"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start">
          {/* Flag Image */}
          <div className="w-full sm:w-1/2 aspect-video rounded-xl overflow-hidden shadow-md bg-slate-100 dark:bg-slate-700 flex-shrink-0">
            <img src={flag} alt={`Flag of ${name}`} className="w-full h-full object-cover" />
          </div>

          {/* Details */}
          <div className="w-full sm:w-1/2 space-y-4">
            <div>
              <h2 className="text-2xl font-black">{name}</h2>
              {officialName !== name && (
                <p className="text-xs text-slate-400 italic mt-0.5">{officialName}</p>
              )}
            </div>

            <div className="space-y-2 text-sm">
              <p><span className="font-semibold text-slate-400">Capital:</span> {capital}</p>
              <p><span className="font-semibold text-slate-400">Population:</span> {population}</p>
              <p><span className="font-semibold text-slate-400">Region:</span> {region}</p>
              <p><span className="font-semibold text-slate-400">Subregion:</span> {subregion}</p>
              <p><span className="font-semibold text-slate-400">Languages:</span> {languages}</p>
              <p><span className="font-semibold text-slate-400">Currencies:</span> {currencies}</p>
            </div>

            <div className="pt-2">
              <button
                onClick={onClose}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-sm"
              >
                Close Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryModal;
