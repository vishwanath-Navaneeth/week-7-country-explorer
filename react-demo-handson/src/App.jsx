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

    // Endpoint strategy:
    // 1. Try Vercel Serverless Function /api/countries
    // 2. Fall back to AllOrigins CORS Proxy wrapper
    // 3. Fall back to raw Github dataset
    try {
      try {
        const res = await fetch('/api/countries');
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            setCountries(data);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.warn('Vercel API endpoint unavailable, trying proxy fallback...', e);
      }

      // Fallback 1: CORS Proxy wrapper
      const proxyUrl = `https://api.allorigins.win/raw?url=${encodeURIComponent(
        'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,subregion,languages,currencies,cca3'
      )}`;

      const proxyRes = await fetch(proxyUrl);
      if (proxyRes.ok) {
        const data = await proxyRes.json();
        if (Array.isArray(data) && data.length > 0) {
          setCountries(data);
          setLoading(false);
          return;
        }
      }

      // Fallback 2: Raw Github dataset
      const githubRes = await fetch(
        'https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json'
      );
      if (!githubRes.ok) throw new Error('Failed to load country data from all sources.');

      const githubData = await githubRes.json();
      const formatted = githubData.map((c) => ({
        name: { common: c.name?.common || c.name, official: c.name?.official },
        capital: c.capital,
        population: c.population,
        region: c.region,
        subregion: c.subregion,
        flags: { svg: c.flags?.svg || c.flags?.png, png: c.flags?.png },
        languages: c.languages,
        currencies: c.currencies,
        cca3: c.cca3
      }));

      setCountries(formatted);
    } catch (err) {
      console.error('All fetch strategies failed:', err);
      setError(err.message || 'Failed to fetch country data.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  // Filter countries based on search term and selected region
  const filteredCountries = countries.filter((country) => {
    const matchesSearch =
      country.name?.common?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.capital?.[0]?.toLowerCase().includes(searchTerm.toLowerCase());

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
