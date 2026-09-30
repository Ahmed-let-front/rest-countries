import { View } from './view';
class Search extends View {
  #elements = {
    countriesList: document.getElementById('countries-list'),
    searchInput: document.getElementById('search-input'),
    searchForm: document.getElementById('search-form'),
  };
  parentEl = document.getElementById('countries-list');
  displayCardCountries(data) {
    this.clear();
    let markup = '';
    data.forEach(el => {
      markup += `
      <article
          class="country-card rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          tabindex="0"
        >
          <figure class="h-40 md:h-40 w-full overflow-hidden">
            <img src="${el.flag}" alt="Flag of ${el.name}" class="w-full h-full object-cover" />
          </figure>
          <div class="country-card-body">
            <h2 class="text-lg font-bold mb-1">${el.name}</h2>
            <p class="country-stat">Population: <span class="country-stat-value">${new Intl.NumberFormat('en-US').format(el.population)}</span></p>
            <p class="country-stat">Region: <span class="country-stat-value">${el.region}</span></p>
            <p class="country-stat">Capital: <span class="country-stat-value">${el.capital}</span></p>
          </div>
       </article>
      `;
    });
    this.#elements.countriesList.insertAdjacentHTML('beforeend', markup);
  }
  addHandlerSearchInput(handler) {
    this.#elements.searchInput.addEventListener('input', e => {
      const query = e.target.value;
      handler(query);
    });
  }
  clearInput() {
    this.#elements.searchInput.value = '';
  }
  addHandlerSubmitSearchForm(handler) {
    this.#elements.searchForm.addEventListener('submit', e => {
      e.preventDefault();
      const query = e.target.querySelector('input').value;
      this.clearInput();
      document.activeElement.blur();
      handler(query);
    });
  }
}
export default new Search();
