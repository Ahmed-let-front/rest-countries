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
  displayMessage(meassage) {
    const markup = `
    <div class="col-span-full flex flex-col items-center justify-center py-20 px-4 text-center">
      <div class="bg-element text-main p-5 rounded-full mb-4 shadow-element text-3xl">
       <svg class="size-10">
            <use href="./sprite.svg#icon-search"></use>
        </svg>
      </div>
      <p class="text-sub max-w-sm text-sm font-light">${meassage}</p>
    </div>
  `;
    this.parentEl.innerHTML = markup;
  }
  displayCardCountries(data) {
    let markup = '';
    data.forEach(el => {
      markup += `
      <article
          class="country-card rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-main focus-visible:ring-offset-2 focus-visible:ring-offset-base"
          tabindex="0"
        >
          <figure class="h-40 md:h-40 w-full overflow-hidden">
            <img src="${el.flag}" alt="Flag of ${el.name}" class="w-full h-full object-cover" />
          </figure>
          <div class="country-card-body">
            <h2 class="text-lg font-bold mb-1">${el.name}</h2>
            <p class="country-stat">Population: <span class="country-stat-value">${new Intl.NumberFormat('en-US').format(el.population)}</span></p>
            <p class="country-stat">Region: <span class="country-stat-value">${el.region}</span></p>
            <p class="country-stat">Capital: <span class="country-stat-value">${el.capital}</span></p>
          </div>
       </article>
      `;
    });
    this.#elements.countriesList.innerHTML = markup;
  }
}
