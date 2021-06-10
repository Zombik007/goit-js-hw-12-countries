const BASE_URL = 'https://restcountries.eu';

export default class CountryApiService {
  constructor() {
    this.seachQuery = '';
  }

  fetchCountryApi() {
    return fetch(`${BASE_URL}/rest/v2/name/${this.searchQuery}`).then(response => {
      return response.json();
    });
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
