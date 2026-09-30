import { View } from './view.js';
class Search extends View {
  #elements = {
    countriesList: document.getElementById('countries-list'),
    searchInput: document.getElementById('search-input'),
    searchForm: document.getElementById('search-form'),
  };
  parentEl = document.getElementById('countries-list');
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
