import { API_REST_URL, RES_PAGES } from './config';
import { AJAX } from './helper.js';
export const state = {
  themeMode: ['system', ''],
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isVaildDataFromLS: false,
  contries: {
    searchCountries: [],
    currContries: [],
  },
  get totalPages() {
    return Math.ceil(this.contries.searchCountries.length / this.resultsNumPages);
  },
  currPage: 1,
  resultsNumPages: RES_PAGES,
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
  state.contries.searchCountries = data;
  state.contries.totalPages = data.length;
  getSearchResultsPage();
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
  state.contries.searchCountries = filtredData;
  getSearchResultsPage();
};
export const getSearchResultsPage = (page = state.currPage) => {
  state.currPage = page;
  const start = (state.currPage - 1) * state.resultsNumPages;
  const end = state.currPage * state.resultsNumPages;
  state.contries.currContries = state.contries.searchCountries.slice(start, end);
};
export const resetCurrPage = () => {
  state.currPage = 1;
};
