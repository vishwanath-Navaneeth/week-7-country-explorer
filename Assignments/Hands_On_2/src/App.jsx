import { useEffect, useState } from "react";
import SearchBar from "./components/SearchBar";
import CountryList from "./components/CountryList";

function App() {
  const [countries, setCountries] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch countries on page load using CORS-enabled dataset
  useEffect(() => {
    async function fetchCountries() {
      setLoading(true);
      setError(null);
      try {
        // Direct CORS-supported dataset
        const res = await fetch(
          "https://raw.githubusercontent.com/mledoze/countries/master/dist/countries.json"
        );
        if (!res.ok) throw new Error("HTTP error! status: " + res.status);

        const data = await res.json();
        
        // Transform data into expected country shape
        const formatted = data.map((c) => {
          const cca2 = c.cca2 ? c.cca2.toLowerCase() : "";
          return {
            name: {
              common: c.name?.common || c.name || "Unknown",
              official: c.name?.official || c.name?.common || "Unknown",
            },
            capital: Array.isArray(c.capital) && c.capital.length > 0 ? c.capital : ["N/A"],
            population: typeof c.population === "number" ? c.population : 0,
            region: c.region || "Other",
            subregion: c.subregion || "N/A",
            flags: {
              svg: cca2 ? "https://flagcdn.com/" + cca2 + ".svg" : "",
              png: cca2 ? "https://flagcdn.com/w320/" + cca2 + ".png" : "",
            },
            cca3: c.cca3 || cca2.toUpperCase(),
          };
        });

        formatted.sort((a, b) => a.name.common.localeCompare(b.name.common));

        setCountries(formatted);
        setFiltered(formatted);
      } catch (err) {
        console.warn("Primary fetch failed, attempting proxy fallback...", err);
        try {
          const proxyUrl = "https://api.allorigins.win/raw?url=" + encodeURIComponent(
            "https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags"
          );
          const fallbackRes = await fetch(proxyUrl);
          if (!fallbackRes.ok) throw new Error("Fallback failed");
          const fallbackData = await fallbackRes.json();
          setCountries(fallbackData);
          setFiltered(fallbackData);
        } catch (fallbackErr) {
          setError("Failed to fetch countries. Please check your connection.");
        }
      } finally {
        setLoading(false);
      }
    }

    fetchCountries();
  }, []);

  // Search function
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
