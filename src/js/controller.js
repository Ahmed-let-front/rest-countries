import themeTrigger from './view/themeTrigger.js';
import * as modal from './modal.js';
import search from './view/search.js';
import pagination from './view/pagination.js';
import details from './view/details.js';
const controlThemeLocalStorage = () => {
  modal.getThemeModeFromLocalStorage();
  if (!modal.state.isValidDataFromLS) return;
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
  modal.setNewThemeMode([val, src]);
  modal.setThemeModeInLocalStorage(modal.state.themeMode);
  themeTrigger.updateThemeUi(val, src);
  if (val === 'system') {
    if (modal.state.isDark) themeTrigger.changeClassInDOCEl('dark');
    else themeTrigger.changeClassInDOCEl('light');
    return;
  }
  themeTrigger.changeClassInDOCEl(val);
};
const updateUiPagination = () => {
  pagination.showPagContainer();
  pagination.updateDom(modal.state.currPage, modal.state.totalPages);
  pagination.updatePagesCountContainer(modal.state.currPage, modal.state.totalPages);
};
const controlDisplayRESTCountries = async () => {
  try {
    search.loadSpinner();
    if (!modal.state.countries?.searchCountries[0]) await modal.loadRESTData();
    updateUiPagination();
    search.displayCardCountries(modal.state.countries.currCountries);
  } catch (err) {
    search.displayMessage(err.message);
  }
};
const controlSearch = async query => {
  try {
    pagination.hidePagContainer();
    search.loadSpinner();
    modal.resetCurrPage();
    details.clear()
    await modal.searchLoadData(query);
    updateUiPagination();
    if (modal.state.totalPages === 1) pagination.hidePagContainer();
    search.displayCardCountries(modal.state.countries.currCountries);
  } catch (err) {
    search.displayMessage(err.message);
  }
};
const controlBtnPag = goto => {
  pagination.loadSpinner();
  modal.getSearchResultsPage(goto);
  pagination.displayCardCountries(modal.state.countries.currCountries);
  pagination.updateDom(modal.state.currPage, modal.state.totalPages);
  pagination.updatePagesCountContainer(modal.state.currPage, modal.state.totalPages);
};
const controlDetailsCountry = countryName => {
  if (countryName === '') {
    controlDisplayRESTCountries();
    details.clear();
    return;
  }
  search.clear();
  pagination.hidePagContainer();
  modal.loadDetailsData(countryName);
  details.displayCardCountry(modal.state.currCountryDetails);
};
const init = () => {
  details.resetHash();
  themeTrigger.addHandlerThemeBtns(controlThemeBtns);
  search.addHandlerSearchInput(controlSearch);
  search.addHandlerSubmitSearchForm(controlSearch);
  pagination.addHandlerBtnPag(controlBtnPag);
  details.addHandlerClickInCard(controlDetailsCountry);
  controlThemeLocalStorage();
  controlDisplayRESTCountries();
};
init();
