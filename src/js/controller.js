import themeTrigger from './view/themeTrigger.js';
import * as modal from './modal.js';
import search from './view/search.js';
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
const controldisplayRESTCountries = async () => {
  try {
    search.loadSpinner();
    await modal.loadRESTData();
    search.displayCardCountries(modal.state.contries);
  } catch (err) {
    search.displayMessage(err.message);
  }
};
const controlSearch = async query => {
  try {
    search.loadSpinner();
    await modal.searchLoadData(query);
    search.displayCardCountries(modal.state.serchContries);
  } catch (err) {
    search.displayMessage(err.message);
  }
};
const init = () => {
  themeTrigger.addHandlerThemeBtns(controlThemeBtns);
  search.addHandlerSearchInput(controlSearch);
  search.addHandlerSubmitSearchForm(controlSearch);
  controlThemeLocalStorge();
  controldisplayRESTCountries();
};
init();
