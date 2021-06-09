import debounce from 'lodash.debounce';
import countryCardTpl from '../templates/country-card.hbs';
import countryListTpl from '../templates/country-list.hbs';
import { error } from '@pnotify/core/dist/PNotify.js';

const refs = {
  nameInputField: document.querySelector('.js-input-country-name'),
  countruesRenderCard: document.querySelector('.js-render-result'),
};

function fetchCountries(searchQuery) {
  return fetch(`https://restcountries.eu/rest/v2/name/${searchQuery}`).then(response => {
    return response.json();
  });
}

function renderCountries(countries) {
  if (countries.length > 10) {
    error({
      title: 'Too many matches found. Please enter a more specific query!',
    });
    refs.countruesRenderCard.innerHTML = '';
    console.log('Too many matches found. Please enter a more specific query!');
  } else if (countries.length >= 2 && countries.length <= 10) {
    const markup = countryListTpl(countries);
    console.log(countries.length);
    console.log(markup);
    refs.countruesRenderCard.innerHTML = markup;
  } else {
    const markup = countryCardTpl(countries);
    console.log(countries.length);
    console.log(markup);
    refs.countruesRenderCard.innerHTML = markup;
  }
}

refs.nameInputField.addEventListener('input', debounce(onNameInput, 500));

function onNameInput(e) {
  e.preventDefault();
  const countriesQuery = e.target.value.trim();
  fetchCountries(countriesQuery)
    .then(renderCountries)
    .catch(error =>
      error({
        title: 'Search error. Please start typing the country name',
      }),
    );
  if (e.target.value === '') {
    refs.countruesRenderCard.innerHTML = '';
    console.log('input pustoy');
  }
  console.log(e.target.value.trim());
}
