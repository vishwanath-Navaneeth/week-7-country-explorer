export default async function handler(req, res) {
  try {
    const response = await fetch(
      'https://restcountries.com/v3.1/all?fields=name,capital,population,region,flags,subregion,languages,currencies,cca3'
    );
    if (!response.ok) {
      throw new Error(`REST Countries API returned status ${response.status}`);
    }
    const data = await response.json();
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');
    res.setHeader('Cache-Control', 's-maxage=86400, stale-while-revalidate');
    return res.status(200).json(data);
  } catch (error) {
    console.error('Serverless function fetch error:', error);
    return res.status(500).json({ error: 'Failed to fetch country data' });
  }
}
