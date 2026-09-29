export class View {
  #elements = {
    countriesList: document.getElementById('countries-list'),
  };
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
            <p class="country-stat">Population: <span class="country-stat-value">${el.population}</span></p>
            <p class="country-stat">Region: <span class="country-stat-value">${el.region}</span></p>
            <p class="country-stat">Capital: <span class="country-stat-value">${el.capital}</span></p>
          </div>
       </article>
      `;
    });
    this.#elements.countriesList.insertAdjacentHTML('beforeend', markup);
  }
}
