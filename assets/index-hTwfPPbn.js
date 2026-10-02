(function(){let e=document.createElement(`link`).relList;if(e&&e.supports&&e.supports(`modulepreload`))return;for(let e of document.querySelectorAll(`link[rel="modulepreload"]`))n(e);new MutationObserver(e=>{for(let t of e)if(t.type===`childList`)for(let e of t.addedNodes)e.tagName===`LINK`&&e.rel===`modulepreload`&&n(e)}).observe(document,{childList:!0,subtree:!0});function t(e){let t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),t.credentials=e.crossOrigin===`use-credentials`?`include`:e.crossOrigin===`anonymous`?`omit`:`same-origin`,t}function n(e){if(e.ep)return;e.ep=!0;let n=t(e);fetch(e.href,n)}})();var e=new class{elements={themeBtn:document.getElementById(`theme-trigger`),themeModal:document.getElementById(`theme-modal`),btnCloseModalTheme:document.getElementById(`btn-close-modal-theme`),themeForm:document.getElementById(`theme-form`),themeText:document.getElementById(`theme-text`),themeIcon:document.getElementById(`theme-icon`)};constructor(){this.handleThemeTrigger()}openModalTheme(){this.elements.themeBtn.setAttribute(`aria-expanded`,!0),this.elements.themeModal.showModal()}closeModal(){this.elements.themeBtn.setAttribute(`aria-expanded`,!1),this.elements.themeModal.close()}handleThemeTrigger(){this.elements.themeBtn.addEventListener(`click`,this.openModalTheme.bind(this)),this.elements.btnCloseModalTheme.addEventListener(`click`,this.closeModal.bind(this)),document.addEventListener(`keydown`,e=>{e.key===`Escape`&&this.elements.themeBtn.setAttribute(`aria-expanded`,`false`)}),this.elements.themeModal.addEventListener(`click`,e=>{e.target===this.elements.themeModal&&this.closeModal()})}changeClassInDOCEl(e){document.documentElement.classList=e}updateThemeUi(e,t){this.elements.themeText.textContent=e,this.elements.themeIcon.setAttribute(`href`,t)}updateCheckedAttrInInps(e){let t=document.querySelector(`input[value='${e}']`);t&&(t.checked=!0)}addHandlerThemeBtns=e=>{this.elements.themeForm.addEventListener(`change`,t=>{let n=t.target;if(!n.matches(`input[type="radio"]`))return;let r=n.closest(`label`);if(!r)return;let i=n.value,a=r.querySelector(`use`)?.getAttribute(`href`);e(i,a)})}},t=`./data/data.json`,n=e=>new Promise((t,n)=>{setTimeout(()=>{n(Error(`Request took too long! Timeout after ${e} seconds`))},e*1e3)}),r=async e=>{let t=await Promise.race([n(10),fetch(e)]);if(!t.ok)throw Error(`Failed to fetch data! Status: ${t.status}`);return await t.json()},i={themeMode:[`system`,``],isDark:window.matchMedia(`(prefers-color-scheme: dark)`).matches,isValidDataFromLS:!1,countries:{allDataREST:[],regionCountries:[],searchCountries:[],currCountries:[],currbordersCountriesName:[]},get totalPages(){return Math.ceil(this.countries.searchCountries.length/this.resultsNumPages)},currPage:1,resultsNumPages:12,currCountryDetails:{}},a=e=>{localStorage.setItem(`themeMode`,JSON.stringify(e))},o=()=>{let e=localStorage.getItem(`themeMode`);e&&e.length!==0&&(s(JSON.parse(e)),i.isValidDataFromLS=!0)},s=e=>{i.themeMode=e},c=async()=>{let e=await r(t);if(e===0)throw Error(`Something went wrong with the server. Please try again later`);i.countries.searchCountries=e,i.countries.allDataREST=e,i.countries.regionCountries=e,i.countries.totalPages=e.length,u()},l=e=>{i.countries.searchCountries=i.countries.regionCountries;let t=i.countries.searchCountries.filter(t=>t.name.toLowerCase().includes(e.toLowerCase()));if(t.length===0)throw Error(`We couldn't find any countries matching your search. Please check the spelling or try searching for something else.`);i.countries.searchCountries=t,u()},u=(e=i.currPage)=>{i.currPage=e;let t=(i.currPage-1)*i.resultsNumPages,n=i.currPage*i.resultsNumPages;i.countries.currCountries=i.countries.searchCountries.slice(t,n)},d=()=>{i.currPage=1},f=e=>{let t=i.countries.allDataREST.find(t=>t.alpha3Code.toLowerCase()===e.toLowerCase());t&&(i.currCountryDetails=t,i.countries.currbordersCountriesName=i.currCountryDetails.borders?.map(e=>{let t=i.countries.allDataREST.find(t=>t.alpha3Code.toLowerCase()===e.toLowerCase());return t?t.name:``})||[])},p=e=>{if(e===`All`){i.countries.searchCountries=i.countries.allDataREST,i.countries.regionCountries=i.countries.allDataREST;return}let t=i.countries.allDataREST.filter(t=>t.region===e);t[0]&&(i.countries.searchCountries=t,i.countries.regionCountries=t)},m=class{#e={countriesList:document.getElementById(`countries-list`)};loadSpinner(){this.parentEl.innerHTML=`
    <div class="rounded-full size-12 border-8 border-sub border-r-transparent animate-spin">
    </div>`}clear(){this.parentEl.innerHTML=``}displayMessage(e){let t=`
    <div class="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div class="bg-element text-main p-5 rounded-full mb-4 shadow-element text-3xl">
       <svg class="size-10">
            <use href="./sprite.svg#icon-search"></use>
        </svg>
      </div>
      <p class="text-sub max-w-sm text-sm font-light">${e}</p>
    </div>
  `;this.parentEl.innerHTML=t}displayCardCountries(e){let t=``;e.forEach(e=>{let n=e.name.split(`(`)[0];t+=`
      <li>
       <a href="#${e.alpha3Code}">
        <article class="country-card rounded-md">
          <figure class="h-40  w-65 sm:w-60 overflow-hidden">
            <img src="${this.formatProp(e.flag)}" alt="Flag of ${this.formatProp(e.name)}" class="w-full h-full object-cover" />
          </figure>
          <div class="country-card-body">
            <h2 class="text-xl font-bold mb-1 max-md:w-45">${this.formatProp(n)}</h2>
            <p class="country-stat">Population: <span class="country-stat-value">${this.formatProp(new Intl.NumberFormat(`en-US`).format(e.population))}</span></p>
            <p class="country-stat">Region: <span class="country-stat-value">${this.formatProp(e.region)}</span></p>
            <p class="country-stat">Capital: <span class="country-stat-value">${this.formatProp(e.capital)}</span></p>
          </div>
        </article>
       </a>
      </li>
      `}),this.#e.countriesList.innerHTML=t}formatProp(e){return e!=null&&e!==``?e:`Nothing`}resetHash(){window.location.hash=``}updateContainerListCountriesHight(){this.#e.countriesList.classList.remove(`min-h-[40rem]`)}},h=new class extends m{#e={countriesList:document.getElementById(`countries-list`),searchInput:document.getElementById(`search-input`),searchForm:document.getElementById(`search-form`)};parentEl=document.getElementById(`countries-list`);addHandlerSearchInput(e){this.#e.searchInput.addEventListener(`input`,t=>{let n=t.target.value;e(n)})}clearInput(){this.#e.searchInput.value=``}addHandlerSubmitSearchForm(e){this.#e.searchForm.addEventListener(`submit`,t=>{t.preventDefault();let n=t.target.querySelector(`input`).value;this.clearInput(),document.activeElement.blur(),e(n)})}},g=new class extends m{parentEl=document.getElementById(`countries-list`);#e={btnNext:document.getElementById(`btn-pag-next`),btnPrev:document.getElementById(`btn-pag-prev`),currentPage:document.getElementById(`current-page`),totalPages:document.getElementById(`total-pages`),paginationContainer:document.getElementById(`pagination-container`)};updateDom(e,t){let n=this.#e.btnNext.querySelector(`.numPage`),r=this.#e.btnPrev.querySelector(`.numPage`);this.#e.btnPrev.dataset.goto=e-1<=0?t:e-1,this.#e.btnNext.dataset.goto=e+1>t?1:e+1,n.textContent=e+1>t?1:e+1,r.textContent=e-1<=0?t:e-1}updatePagesCountContainer(e,t){this.#e.currentPage.textContent=e,this.#e.totalPages.textContent=t}addHandlerBtnPag(e){this.#e.paginationContainer.addEventListener(`click`,t=>{let n=t.target.closest(`button`);n&&e(+n.dataset.goto)})}showPagContainer(){this.#e.paginationContainer.classList.remove(`disabled-container`)}hidePagContainer(){this.#e.paginationContainer.classList.add(`disabled-container`)}},_=new class extends m{parentEl=document.getElementById(`countryDetails`);addHandlerClickInCard(e){window.addEventListener(`hashchange`,()=>{e(window.location.hash.slice(1))})}displayCardCountry(e,t){let n=`
       <div class="flex flex-col xl:flex-row items-center gap-12 lg:gap-20">
        <div class="flex flex-col gap-4 w-full xl:w-1/2">
           <a
              href="#"
              class="inline-flex items-center gap-2 px-8 py-2.5 bg-element text-main shadow-sement rounded-sm text-sm font-semibold hover:opacity-80 transition-opacity w-fit"
            >
              <svg class="w-4 h-4 text-main rotate-180">
                <use href="./sprite.svg#icon-arrow-right"></use>
              </svg>
              <span>Back</span>
            </a>
            <figure
              class="w-full  shadow-element rounded-2xl overflow-hidden bg-element"
            >
              <img class="w-full h-auto aspect-[4/3] object-cover" alt="flag of ${this.formatProp(e.name)}" src="${this.formatProp(e.flag)}" />
            </figure>
         </div>

        <div class="w-full xl:w-1/2 flex flex-col gap-8 text-main">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 class="text-3xl lg:text-4xl font-bold">${this.formatProp(e.name)}</h2>
          </div>

          <div class="flex flex-wrap gap-8 md:gap-4">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-semibold">
                Native Name: <span class="font-light text-sub">${this.formatProp(e.nativeName)}</span>
              </p>
              <p class="text-sm font-semibold">
                Population: <span class="font-light text-sub">${this.formatProp(new Intl.NumberFormat(`en-US`).format(e.population))}</span>
              </p>
              <p class="text-sm font-semibold">
                Region: <span class="font-light text-sub">${this.formatProp(e.region)}</span>
              </p>
              <p class="text-sm font-semibold">
                Sub Region: <span class="font-light text-sub">${this.formatProp(e.subregion)}</span>
              </p>
              <p class="text-sm font-semibold">
                Capital: <span class="font-light text-sub">${this.formatProp(e.capital)}</span>
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-sm font-semibold">
                Top Level Domain: <span class="font-light text-sub">${this.formatProp(e.topLevelDomain?.[0])}</span>
              </p>
              <p class="text-sm font-semibold">
                Currencies: <span class="font-light text-sub">${this.formatProp(e.currencies?.[0].name)}</span>
              </p>
              <p class="text-sm font-semibold">
                Languages: <span class="font-light text-sub">${this.formatProp(e.languages.map(e=>e.nativeName).join(` ,`))}</span>
              </p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <span class="text-sm font-semibold whitespace-nowrap">Border Countries:</span>
            <div class="flex flex-wrap gap-2">
            ${this.formatProp(e.borders?.map((e,n)=>`
             <a
                href="#${e}"
                class="px-6 py-1.5 bg-element text-main shadow-element rounded-sm text-sm font-light hover:opacity-80 transition-opacity"
              >${t[n]}</a>
                `).join(``))}
            </div>
          </div>
        </div>
      </div>
    `;this.parentEl.innerHTML=n}},v=new class extends m{#e={filterByRegionContainer:document.getElementById(`filterByRegionContainer`),summaryRegion:document.getElementById(`summary-region`),listOfRegion:document.getElementById(`region-filter`)};updateAriaExpanded(e){if(e.closest(`#summary-region`)!==this.#e.summaryRegion)return;let t=this.#e.summaryRegion.getAttribute(`aria-expanded`);t=t===`false`,this.#e.summaryRegion.setAttribute(`aria-expanded`,t)}updateDom(e){this.#e.summaryRegion.textContent=e}hiddenContainer(){this.#e.filterByRegionContainer.removeAttribute(`open`)}addHandlerClickInContainer(e){this.#e.filterByRegionContainer.addEventListener(`click`,t=>{let n=t.target.closest(`li`)?.querySelector(`button`).dataset.region;this.updateAriaExpanded(t.target),n&&(e(n),console.log(n))})}},y=()=>{if(o(),!i.isValidDataFromLS)return;let[t,n]=i.themeMode;if(e.updateThemeUi(t,n),e.updateCheckedAttrInInps(t),t===`system`){i.isDark?e.changeClassInDOCEl(`dark`):e.changeClassInDOCEl(`light`);return}e.changeClassInDOCEl(t)},b=(t,n)=>{if(s([t,n]),a(i.themeMode),e.updateThemeUi(t,n),t===`system`){i.isDark?e.changeClassInDOCEl(`dark`):e.changeClassInDOCEl(`light`);return}e.changeClassInDOCEl(t)},x=()=>{g.showPagContainer(),g.updateDom(i.currPage,i.totalPages),g.updatePagesCountContainer(i.currPage,i.totalPages)},S=async()=>{try{h.loadSpinner(),i.countries?.searchCountries[0]||await c(),x(),h.displayCardCountries(i.countries.currCountries),h.updateContainerListCountriesHight()}catch(e){h.displayMessage(e.message)}},C=e=>{try{g.hidePagContainer(),h.loadSpinner(),d(),_.clear(),l(e),x(),i.totalPages===1&&g.hidePagContainer(),h.displayCardCountries(i.countries.currCountries)}catch(e){h.displayMessage(e.message)}};_.resetHash(),e.addHandlerThemeBtns(b),h.addHandlerSearchInput(C),h.addHandlerSubmitSearchForm(C),g.addHandlerBtnPag(e=>{g.loadSpinner(),u(e),g.displayCardCountries(i.countries.currCountries),g.updateDom(i.currPage,i.totalPages),g.updatePagesCountContainer(i.currPage,i.totalPages)}),_.addHandlerClickInCard(e=>{if(e===``){S(),_.clear();return}h.clear(),g.hidePagContainer(),f(e),_.displayCardCountry(i.currCountryDetails,i.countries.currbordersCountriesName)}),v.addHandlerClickInContainer(e=>{p(e),d(),_.clear(),u(),v.displayCardCountries(i.countries.currCountries),v.updateDom(e),v.hiddenContainer(),x()}),y(),S();