const BASE_URL = 'https://restcountries.com/v3.1';
// const BASE_URL = 'https://restcountries.com/v2';

const properties = `name,capital,population,flags,languages`;

export const fetchCountries = name =>
  fetch(`${BASE_URL}/name/${name}?fields=${properties}`)
    .then(response => response.json())
    .then(data => {
      return data;
    });
