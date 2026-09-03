import React from 'react';

const CountryCard = ({ country, onSelect, darkMode }) => {
  const name = country.name?.common || 'Unknown';
  const flag = country.flags?.svg || country.flags?.png || 'https://via.placeholder.com/150';
  const population = country.population ? country.population.toLocaleString() : 'N/A';
  const region = country.region || 'N/A';
  const capital = Array.isArray(country.capital) ? country.capital.join(', ') : (country.capital || 'N/A');

  return (
    <div
      onClick={() => onSelect(country)}
      className={`rounded-xl shadow-md overflow-hidden cursor-pointer transform hover:-translate-y-1.5 transition-all duration-300 border ${
        darkMode
          ? 'bg-slate-800 border-slate-700/60 hover:border-slate-500 hover:shadow-slate-900/50'
          : 'bg-white border-slate-100 hover:border-slate-300 hover:shadow-xl'
      }`}
    >
      <div className="h-44 w-full overflow-hidden bg-slate-200 dark:bg-slate-700 relative">
        <img
          src={flag}
          alt={`Flag of ${name}`}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="p-5">
        <h3 className={`font-extrabold text-lg mb-3 truncate ${darkMode ? 'text-white' : 'text-slate-900'}`}>
          {name}
        </h3>
        <div className="space-y-1.5 text-xs sm:text-sm">
          <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
            <span className="font-semibold text-slate-400">Population: </span>
            {population}
          </p>
          <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
            <span className="font-semibold text-slate-400">Region: </span>
            {region}
          </p>
          <p className={darkMode ? 'text-slate-300' : 'text-slate-600'}>
            <span className="font-semibold text-slate-400">Capital: </span>
            {capital}
          </p>
        </div>
      </div>
    </div>
  );
};

export default CountryCard;
