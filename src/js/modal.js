import { API_REST_URL } from './config';
import { AJAX } from './helper.js';
export const state = {
  themeMode: ['system', ''],
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isVaildDataFromLS: false,
  contries: [],
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
export const loadRESTData = async () => {
  const data = await AJAX(API_REST_URL);
  state.contries = data.slice(0, 10);
};
