import { API_REST_URL, RES_PAGES } from './config';
import { AJAX } from './helper.js';
export const state = {
  themeMode: ['system', ''],
  isDark: window.matchMedia('(prefers-color-scheme: dark)').matches,
  isValidDataFromLS: false,
  countries: {
    allDataREST: [],
    regionCountries: [],
    searchCountries: [],
    currCountries: [],
    currbordersCountriesName: [],
  },
  get totalPages() {
    return Math.ceil(this.countries.searchCountries.length / this.resultsNumPages);
  },
  currPage: 1,
  resultsNumPages: RES_PAGES,
  currCountryDetails: {},
};
export const setThemeModeInLocalStorage = themeMode => {
  localStorage.setItem('themeMode', JSON.stringify(themeMode));
};
export const getThemeModeFromLocalStorage = () => {
  const data = localStorage.getItem('themeMode');
  if (!data || data.length === 0) return;
  setNewThemeMode(JSON.parse(data));
  state.isValidDataFromLS = true;
};
export const setNewThemeMode = data => {
  state.themeMode = data;
};
export const loadRESTData = async () => {
  const data = await AJAX(API_REST_URL);
  if (data === 0)
    throw new Error('Something went wrong with the server. Please try again later');
  state.countries.searchCountries = data;
  state.countries.allDataREST = data;
  state.countries.regionCountries = data;
  state.countries.totalPages = data.length;
  getSearchResultsPage();
};
export const searchLoadData = query => {
  state.countries.searchCountries = state.countries.regionCountries;
  const filteredData = state.countries.searchCountries.filter(el =>
    el.name.toLowerCase().includes(query.toLowerCase()),
  );
  if (filteredData.length === 0)
    throw new Error(
      "We couldn't find any countries matching your search. Please check the spelling or try searching for something else.",
    );
  state.countries.searchCountries = filteredData;
  getSearchResultsPage();
};
export const getSearchResultsPage = (page = state.currPage) => {
  state.currPage = page;
  const start = (state.currPage - 1) * state.resultsNumPages;
  const end = state.currPage * state.resultsNumPages;
  state.countries.currCountries = state.countries.searchCountries.slice(start, end);
};
export const resetCurrPage = () => {
  state.currPage = 1;
};
export const loadDetailsData = countryName => {
  const dataDetails = state.countries.allDataREST.find(
    el => el.alpha3Code.toLowerCase() === countryName.toLowerCase(),
  );
  if (!dataDetails) return;
  state.currCountryDetails = dataDetails;
  state.countries.currbordersCountriesName =
    state.currCountryDetails.borders?.map(con => {
      const foundCountry = state.countries.allDataREST.find(
        el => el.alpha3Code.toLowerCase() === con.toLowerCase(),
      );
      return foundCountry ? foundCountry.name : '';
    }) || [];
};
export const loadDataByRegion = region => {
  if (region === 'All') {
    state.countries.searchCountries = state.countries.allDataREST;
    state.countries.regionCountries = state.countries.allDataREST;
    return;
  }
  const filtredData = state.countries.allDataREST.filter(el => el.region === region);
  if (!filtredData[0]) return;
  state.countries.searchCountries = filtredData;
  state.countries.regionCountries = filtredData;
};
