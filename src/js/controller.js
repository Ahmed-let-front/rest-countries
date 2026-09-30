import themeTrigger from './view/themeTrigger.js';
import * as modal from './modal.js';
import search from './view/search.js';
import pagination from './view/pagination.js';
const controlThemeLocalStorge = () => {
  modal.getThemeModeFromLocalStorege();
  if (!modal.state.isVaildDataFromLS) return;
  const [val, src] = modal.state.themeMode;
  themeTrigger.updateThemeUi(val, src);
  themeTrigger.updateCheckedAttrInInps(val);
  if (val === 'system') {
    if (modal.state.isDark) themeTrigger.changeClassInDOCEl('dark');
    else themeTrigger.changeClassInDOCEl('light');
    return;
  }
  themeTrigger.changeClassInDOCEl(val);
};
const controlThemeBtns = (val, src) => {
  modal.setNewThemeModal([val, src]);
  modal.setThemeModeInLocalStorege(modal.state.themeMode);
  themeTrigger.updateThemeUi(val, src);
  if (val === 'system') {
    if (modal.state.isDark) themeTrigger.changeClassInDOCEl('dark');
    else themeTrigger.changeClassInDOCEl('light');
    return;
  }
  themeTrigger.changeClassInDOCEl(val);
};
const updateUiPagination = () => {
  pagination.showPagContiner();
  pagination.updateDom(modal.state.currPage, modal.state.totalPages);
  pagination.updatePagesCountContainer(modal.state.currPage, modal.state.totalPages);
};
const controldisplayRESTCountries = async () => {
  try {
    search.loadSpinner();
    await modal.loadRESTData();
    updateUiPagination();
    search.displayCardCountries(modal.state.contries.currContries);
  } catch (err) {
    search.displayMessage(err.message);
  }
};
const controlSearch = async query => {
  try {
    pagination.hiddenPagContiner();
    search.loadSpinner();
    modal.resetCurrPage();
    await modal.searchLoadData(query);
    updateUiPagination();
    search.displayCardCountries(modal.state.contries.currContries);
  } catch (err) {
    search.displayMessage(err.message);
  }
};
const controlBtnPag = goto => {
  pagination.loadSpinner();
  modal.getSearchResultsPage(goto);
  pagination.displayCardCountries(modal.state.contries.currContries);
  pagination.updateDom(modal.state.currPage, modal.state.totalPages);
  pagination.updatePagesCountContainer(modal.state.currPage, modal.state.totalPages);
};
const init = () => {
  themeTrigger.addHandlerThemeBtns(controlThemeBtns);
  search.addHandlerSearchInput(controlSearch);
  search.addHandlerSubmitSearchForm(controlSearch);
  pagination.addHandlerBtnPag(controlBtnPag);
  controlThemeLocalStorge();
  controldisplayRESTCountries();
};
init();
