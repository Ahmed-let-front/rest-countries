import themeTrigger from './view/themeTrigger.js';
import * as modal from './modal.js';
import { View } from './view/view.js';
const view = new View();
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
  await modal.loadRESTData();
  view.displayCardCountries(modal.state.contries);
};
const init = () => {
  themeTrigger.addHandlerThemeBtns(controlThemeBtns);
  controlThemeLocalStorge();
  controldisplayRESTCountries();
};
init();
