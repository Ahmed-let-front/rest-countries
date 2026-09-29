export const state = {
  themeMode: ['system', ''],
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isVaildDataFromLS: false,
};
export const setThemeModeInLocalStorege = themeMode => {
  localStorage.setItem('themeMode', JSON.stringify(themeMode));
};
export const getThemeModeFromLocalStorege = () => {
  const data = localStorage.getItem('themeMode');
  if (!data[0]) return;
  setNewThemeModal(JSON.parse(data));
  state.isVaildDataFromLS = true;
};
export const setNewThemeModal = data => {
  state.themeMode = data;
};
