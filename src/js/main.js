import CountryApiService from './fetchCountries';
import debounce from 'lodash.debounce';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';

const countryApiService = new CountryApiService();

const refs = {
  nameInputField: document.querySelector('.js-input-country-name'),
  countruesRenderCard: document.querySelector('.js-render-result'),
};

function renderCountries(countries) {
  if (countries.length > 10) {
    error({
      title: 'Too many matches found. Please enter a more specific query!',
    });
    refs.countruesRenderCard.innerHTML = '';
  } else if (countries.length >= 2 && countries.length <= 10) {
    const markup = countryListTpl(countries);
    refs.countruesRenderCard.innerHTML = markup;
  } else if (countries.length === 1) {
    const markup = countryCardTpl(countries);
    refs.countruesRenderCard.innerHTML = markup;
  }
}

refs.nameInputField.addEventListener('input', debounce(onNameInput, 500));

function onNameInput(e) {
  e.preventDefault();
  refs.countruesRenderCard.innerHTML = '';
  countryApiService.query = e.target.value.trim();
  if (e.target.value === '') {
    return;
  }
  countryApiService
    .fetchCountryApi()
    .then(country => {
      clearImagesContainer();
      renderCountries(country);
    })
    .catch(onFetchError);
}

// function onNameInput(e) {
//   e.preventDefault();
//   refs.countruesRenderCard.innerHTML = '';
//   const countriesQuery = e.target.value.trim();
//   fetchCountries(countriesQuery).then(renderCountries).catch(onFetchError);
//   if (countriesQuery === '') {
//     return;
//   }
//   console.log(e.target.value.trim());
// }

function onFetchError(err) {
  error({
    title: 'Search error. Please start typing the country name',
  });
}

function clearImagesContainer() {
  refs.countruesRenderCard.innerHTML = '';
}
