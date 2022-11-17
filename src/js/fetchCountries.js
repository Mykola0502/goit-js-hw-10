const BASE_URL = 'https://restcountries.com/v3.1';
// const BASE_URL = 'https://restcountries.com/v2';

const properties = `name,capital,population,flags,languages`;

function fetchCountries(name) {
  return fetch(`${BASE_URL}/name/${name}?fields=${properties}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      return data;
    });
}

export { fetchCountries };

// export const fetchCountries = name =>
//   fetch(`${BASE_URL}/name/${name}?fields=${properties}`)
//     .then(response => {
//       if (!response.ok) {
//         throw new Error(response.status);
//       }
//       return response.json();
//     })
//     .then(data => {
//       return data;
//     });
