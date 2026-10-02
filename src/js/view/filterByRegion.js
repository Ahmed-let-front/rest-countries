import { View } from './view';
class FilterByRegion extends View {
  #elements = {
    filterByRegionContainer: document.getElementById('filterByRegionContainer'),
    summaryRegion: document.getElementById('summary-region'),
    listOfRegion: document.getElementById('region-filter'),
  };
  updateDom(region) {
    this.#elements.summaryRegion.textContent = region;
  }
  hiddenContainer() {
    this.#elements.filterByRegionContainer.removeAttribute('open');
  }
  addHandlerClickInContainer(handler) {
    this.#elements.filterByRegionContainer.addEventListener('click', e => {
      const region = e.target.closest('li')?.querySelector('button').dataset.region;
      if (!region) return;
      handler(region);
      console.log(region);
    });
  }
}
export default new FilterByRegion();
