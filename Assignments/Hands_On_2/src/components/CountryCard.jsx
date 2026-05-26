function CountryCard({ country }) {
  return (
    <div className="border rounded-lg shadow p-3 bg-white">

      <img
        src={country.flags.png}
        alt="flag"
        className="w-full h-32 object-cover rounded"
      />

      <h2 className="text-lg font-semibold mt-2">
        {country.name.common}
      </h2>

      <p className="text-sm text-gray-600">
        Capital: {country.capital?.[0]}
      </p>

      <p className="text-sm text-gray-600">
        Population: {country.population.toLocaleString()}
      </p>

      <p className="text-sm text-gray-600">
        Region: {country.region}
      </p>

    </div>
  );
}

export default CountryCard;