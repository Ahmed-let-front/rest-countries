export class View {
  #elements = {
    countriesList: document.getElementById('countries-list'),
  };
  loadSpinner() {
    const markup = `
    <div class="rounded-full size-12 border-8 border-sub border-r-transparent animate-spin">
    </div>`;
    this.parentEl.innerHTML = markup;
  }
  clear() {
    this.parentEl.innerHTML = '';
  }
  displayMessage(message) {
    const markup = `
    <div class="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div class="bg-element text-main p-5 rounded-full mb-4 shadow-element text-3xl">
       <svg class="size-10">
            <use href="./sprite.svg#icon-search"></use>
        </svg>
      </div>
      <p class="text-sub max-w-sm text-sm font-light">${message}</p>
    </div>
  `;
    this.parentEl.innerHTML = markup;
  }
  displayCardCountries(data) {
    let markup = '';

    data.forEach(el => {
      const formatName = el.name.split('(')[0];
      markup += `
      <li class="w-[90%] md:w-fit">
       <a href="#${el.alpha3Code}" class="country-card rounded-xl overflow-hidden">
        <article>
          <figure class="h-40  w-full overflow-hidden">
            <img src="${this.formatProp(el.flag)}" alt="Flag of ${this.formatProp(el.name)}" class="w-full h-full object-cover" />
          </figure>
          <div class="country-card-body">
            <h2 class="text-xl font-bold mb-1 max-md:w-45">${this.formatProp(formatName)}</h2>
            <p class="country-stat">Population: <span class="country-stat-value">${this.formatProp(new Intl.NumberFormat('en-US').format(el.population))}</span></p>
            <p class="country-stat">Region: <span class="country-stat-value">${this.formatProp(el.region)}</span></p>
            <p class="country-stat">Capital: <span class="country-stat-value">${this.formatProp(el.capital)}</span></p>
          </div>
        </article>
       </a>
      </li>
      `;
    });
    this.#elements.countriesList.innerHTML = markup;
  }
  formatProp(prop) {
    return prop !== undefined && prop !== null && prop !== '' ? prop : 'Nothing';
  }
  updateContainerListCountriesHight() {
    this.#elements.countriesList.classList.remove('min-h-[40rem]');
  }
}
