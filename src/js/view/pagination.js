import { View } from './view.js';
class Pagination extends View {
  parentEl = document.getElementById('countries-list');
  #elements = {
    btnNext: document.getElementById('btn-pag-next'),
    btnPrev: document.getElementById('btn-pag-prev'),
    currentPage: document.getElementById('current-page'),
    totalPages: document.getElementById('total-pages'),
    paginationContainer: document.getElementById('pagination-container'),
  };
  updateDom(currPage, contriesNum) {
    const numPageNextEl = this.#elements.btnNext.querySelector('#numPage');
    const numPagePrevEl = this.#elements.btnPrev.querySelector('#numPage');
    this.#elements.btnPrev.dataset.goto = currPage - 1 <= 0 ? contriesNum : currPage - 1;
    this.#elements.btnNext.dataset.goto = currPage + 1 > contriesNum ? 1 : currPage + 1;
    numPageNextEl.textContent = currPage + 1 > contriesNum ? 1 : currPage + 1;
    numPagePrevEl.textContent = currPage - 1 <= 0 ? contriesNum : currPage - 1;
  }
  updatePagesCountContainer(currPage, totalPages) {
    this.#elements.currentPage.textContent = currPage;
    this.#elements.totalPages.textContent = totalPages;
  }
  addHandlerBtnPag(handler) {
    this.#elements.paginationContainer.addEventListener('click', e => {
      const btn = e.target.closest('button');
      if (!btn) return;
      let goto = +btn.dataset.goto;
      handler(goto);
    });
  }
  showPagContiner() {
    this.#elements.paginationContainer.classList.remove('disabled-container');
  }
  hiddenPagContiner() {
    this.#elements.paginationContainer.classList.add('disabled-container');
  }
}
export default new Pagination();
