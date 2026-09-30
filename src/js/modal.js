import { API_REST_URL } from './config';
import { AJAX } from './helper.js';
export const state = {
  themeMode: ['system', ''],
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isVaildDataFromLS: false,
  contries: [],
  serchContries: [],
};
export const setThemeModeInLocalStorege = themeMode => {
  localStorage.setItem('themeMode', JSON.stringify(themeMode));
};
export const getThemeModeFromLocalStorege = () => {
  const data = localStorage.getItem('themeMode');
  if (data.length === 0) return;
  setNewThemeModal(JSON.parse(data));
  state.isVaildDataFromLS = true;
};
export const setNewThemeModal = data => {
  state.themeMode = data;
};
export const loadRESTData = async () => {
  const data = await AJAX(API_REST_URL);
  if (data === 0)
    throw new Error('Something went wrong with the server. Please try again later');
  state.contries = data.slice(0, 10);
};
export const searchLoadData = async query => {
  const data = await AJAX(API_REST_URL);
  const filtredData = data.filter(el =>
    el.name.toLowerCase().includes(query.toLowerCase()),
  );
  if (filtredData.length === 0)
    throw new Error(
      "We couldn't find any countries matching your search. Please check the spelling or try searching for something else.",
    );
  state.serchContries = filtredData;
};
