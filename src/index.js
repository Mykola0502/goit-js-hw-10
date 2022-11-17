// var debounce = require(' lodash.debounce ');
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import listTpl from './templates/country-list.hbs';
import countryCardTpl from './templates/country-card.hbs';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

const DEBOUNCE_DELAY = 300;
// const DEBOUNCE_DELAY = 1000;
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryCard: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchText = e.target.value.trim();

  //   console.log(searchText);
  //   console.log(searchText.length);

  clearCountryList();
  clearCountryCard();

  if (searchText.length === 0) {
    // clearCountryList();
    // clearCountryCard();
    return;
  }
  fetchCountries(searchText)
    .then(countries => {
      console.log(countries);

      if (countries.length > 10) {
        Notiflix.Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
        console.log(
          'Too many matches found. Please enter a more specific name.'
        );
        clearCountryList();
        clearCountryCard();
        return;
      } else if (countries.length >= 2 && countries.length <= 10) {
        appendCountryListMarkup(countries);
        clearCountryCard();
        return;
      }
      clearCountryList();
      appendCountryCardMarkup(countries);
      //   console.log('Big country');
    })
    .catch(error => {
      Notiflix.Notify.failure('Oops, there is no country with that name');
      console.log('Oops, there is no country with that name');
    });
}

function appendCountryListMarkup(countries) {
  //   refs.countryList.insertAdjacentHTML('beforeend', listTpl(countries));
  refs.countryList.innerHTML = listTpl(countries);
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}

function appendCountryCardMarkup(countries) {
  //   refs.countryList.insertAdjacentHTML('beforeend', listTpl(countries));
  refs.countryCard.innerHTML = countryCardTpl(countries);
}

function clearCountryCard() {
  refs.countryCard.innerHTML = '';
}
