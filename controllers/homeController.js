const path = require('path');
const fs = require('fs');

const countriesList = (req, res) => {
  //GET METHOD---------------------------
  const filePath = path.join(__dirname, '../data.json');

  const urlQuery = req.query.sort;

  const rawData = fs.readFileSync(filePath, 'utf8');
  const existingData = JSON.parse(rawData);

  //POST METHOD---------------------------
  if (req.method === 'POST') {
    const newCountry = req.body;
    const countryExists = existingData.some((country) => {
      return (
        country.alpha2Code === newCountry.alpha2Code ||
        country.alpha3Code === newCountry.alpha3Code
      );
    });
    if (!countryExists) {
      existingData.push(newCountry);
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      res.status(201).json(existingData);
      return;
    } else {
      res.status(400).json({ error: 'Country already exists in the list.' });
      return;
    }
  }
  if (urlQuery === 'true') {
    const sortedCountries = existingData
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name));
    res.json(sortedCountries);
  } else {
    res.json(existingData);
  }
};

module.exports = { countriesList };
