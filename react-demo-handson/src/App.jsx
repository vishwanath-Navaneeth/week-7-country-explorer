import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import CountryList from './components/CountryList';
import CountryModal from './components/CountryModal';

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('All');
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [darkMode, setDarkMode] = useState(true);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);

    try {
      // Primary direct CORS-enabled source: raw GitHub dataset
      const res = await fetch(
        'https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json'
      );
      if (!res.ok) {
        throw new Error(`Dataset HTTP error: ${res.status}`);
      }

      const data = await res.json();
      
      // Transform data into standardized REST Countries format
      const formatted = data.map((c) => {
        const cca2 = c.cca2 ? c.cca2.toLowerCase() : '';
        return {
          name: {
            common: c.name?.common || c.name || 'Unknown',
            official: c.name?.official || c.name?.common || 'Unknown',
          },
          capital: Array.isArray(c.capital) && c.capital.length > 0 ? c.capital : ['N/A'],
          population: typeof c.population === 'number' ? c.population : 0,
          region: c.region || 'Other',
          subregion: c.subregion || 'N/A',
          flags: {
            svg: cca2 ? `https://flagcdn.com/${cca2}.svg` : '',
            png: cca2 ? `https://flagcdn.com/w320/${cca2}.png` : '',
          },
          languages: c.languages || {},
          currencies: c.currencies || {},
          cca3: c.cca3 || cca2.toUpperCase(),
        };
      });

      // Sort alphabetically by common name
      formatted.sort((a, b) => a.name.common.localeCompare(b.name.common));

      setCountries(formatted);
    } catch (primaryErr) {
      console.warn('Primary fetch failed, attempting proxy fallback...', primaryErr);
      try {
        const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
          'https://restcountries.com/v3.1/all'
        )}`;
        const fallbackRes = await fetch(proxyUrl);
        if (!fallbackRes.ok) throw new Error('Proxy fallback failed.');
        const fallbackData = await fallbackRes.json();
        setCountries(fallbackData);
      } catch (fallbackErr) {
        console.error('All country data fetch attempts failed:', fallbackErr);
        setError('Failed to load country data. Please check your network connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries by search term and region
  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.name?.official?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (Array.isArray(country.capital) &&
        country.capital.some((cap) => cap.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesRegion =
      selectedRegion === 'All' || selectedRegion === '' || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  return (
    <div className={`min-h-screen font-sans transition-colors duration-200 ${darkMode ? 'bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'}`}>
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedRegion={selectedRegion}
          setSelectedRegion={setSelectedRegion}
          darkMode={darkMode}
        />

        <CountryList
          countries={filteredCountries}
          loading={loading}
          error={error}
          onRetry={fetchCountries}
          onSelectCountry={setSelectedCountry}
          darkMode={darkMode}
        />
      </main>

      {selectedCountry && (
        <CountryModal
          country={selectedCountry}
          onClose={() => setSelectedCountry(null)}
          darkMode={darkMode}
        />
      )}
    </div>
  );
}

export default App;
