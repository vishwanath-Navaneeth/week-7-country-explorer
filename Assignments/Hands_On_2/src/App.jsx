import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch countries on page load
  useEffect(() => {
    async function fetchCountries() {
      try {
        const res = await fetch(
          "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags"
        );

        const data = await res.json();

        setCountries(data);
        setFiltered(data);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch countries");
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  // search function
  function handleSearch(query) {
    const result = countries.filter((c) =>
      c.name.common.toLowerCase().includes(query.toLowerCase())
    );

    setFiltered(result);
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold text-center mb-6">
        🌍 Country Explorer
      </h1>

      <SearchBar onSearch={handleSearch} />

      {loading && <p className="text-center mt-6">Loading countries...</p>}

      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && <CountryList countries={filtered} />}

    </div>
  );
}

export default App;