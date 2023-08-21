const path = require('path');
const fs = require('fs');

const country = (req, res) => {
  const filePath = path.join(__dirname, '../data.json');
  const rawData = fs.readFileSync(filePath, 'utf8');
  const existingData = JSON.parse(rawData);
  const paramsCode = req.params.code.toUpperCase();

  //GET MOTHOD-------------------------------------------------------
  if (req.method == 'GET') {
    const foundCountry = existingData.find((country) => {
      return (
        country.alpha2Code === paramsCode || country.alpha3Code === paramsCode
      );
    });
    if (foundCountry) {
      res.send(foundCountry);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  }

  //PUT METHOD--------------------------------------------------------
  if (req.method == 'PUT') {
    const countryCode = req.params.code.toUpperCase();
    const updatedCountryData = req.body;
    const countryIndex = existingData.findIndex((country) => {
      return (
        country.alpha2Code === countryCode || country.alpha3Code === countryCode
      );
    });
    if (countryIndex !== -1) {
      existingData[countryIndex] = {
        ...existingData[countryIndex],
        ...updatedCountryData,
      };
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      res.status(200).send(existingData[countryIndex]);
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  }
  //DELETE METHOD-------------------------------------------------------
  if (req.method == 'DELETE') {
    const countryCode = req.params.code.toUpperCase();
    const countryIndex = existingData.findIndex((country) => {
      return (
        country.alpha2Code === countryCode || country.alpha3Code === countryCode
      );
    });
    if (countryIndex !== -1) {
      const deletedCountry = existingData.splice(countryIndex, 1)[0];
      fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));
      res
        .status(200)
        .json({ message: 'Country deleted', country: deletedCountry });
    } else {
      res.status(404).json({ error: 'Country not found' });
    }
  }
};
module.exports = { country };
