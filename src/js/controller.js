import  themeTrigger  from './view/themeTrigger.js';
import * as modal from './modal.js';
const controlThemeLocalStorge = () => {
  modal.getThemeModeFromLocalStorege();
  if (!modal.state.isVaildDataFromLS) return;
  const [val, src] = modal.state.themeMode;
  const targetInput = document.querySelector(`input[value='${val}']`);
  themeTrigger.updateThemeUi(val, src);
  themeTrigger.updateCheckedAttrInInps(targetInput);
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
const init = () => {
  themeTrigger.addHandlerThemeBtns(controlThemeBtns);
  controlThemeLocalStorge();
};
init();
