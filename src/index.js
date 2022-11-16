// var debounce = require(' lodash.debounce ');
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import listTpl from './templates/list.hbs';
import './css/styles.css';
import { fetchCountries } from './js/fetchCountries';

// const DEBOUNCE_DELAY = 300;
const DEBOUNCE_DELAY = 2000;
const refs = {
  searchBox: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};

refs.searchBox.addEventListener('input', debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(e) {
  const searchText = e.target.value.trim();

  //   console.log(searchText);
  //   console.log(searchText.length);

  if (searchText.length === 0) {
    clearCountryList();
    return;
  }
  fetchCountries(searchText).then(items => {
    console.log(items);

    if (items.length > 10) {
      Notiflix.Notify.info(
        'Too many matches found. Please enter a more specific name.'
      );
      console.log('Too many matches found. Please enter a more specific name.');
      clearCountryList();
      return;
    } else if (items.length >= 2 && items.length <= 10) {
      appendListMarkup(items);
    }
    console.log('Big country');
  });
}

function appendListMarkup(items) {
  //   refs.countryList.insertAdjacentHTML('beforeend', listTpl(items));
  refs.countryList.innerHTML = listTpl(items);
}

function clearCountryList() {
  refs.countryList.innerHTML = '';
}
