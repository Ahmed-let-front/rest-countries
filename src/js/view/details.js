import { View } from './view';
class Details extends View {
  parentEl = document.getElementById('countryDetails');
  addHandlerClickInCard(handler) {
    window.addEventListener('hashchange', () => {
      const countryName = window.location.hash.slice(1);
      handler(countryName);
    });
  }
  displayCardCountry(el, currBorders) {
    const markup = `
       <div class="flex flex-col xl:flex-row items-center gap-12 lg:gap-20">
        <div class="flex flex-col gap-4 w-full xl:w-1/2">
           <a
              href="#"
              class="inline-flex items-center gap-2 px-8 py-2.5 bg-element text-main shadow-element rounded-sm text-sm font-semibold hover:opacity-80 transition-opacity w-fit"
            >
              <svg class="w-4 h-4 text-main rotate-180">
                <use href="./sprite.svg#icon-arrow-right"></use>
              </svg>
              <span>Back</span>
            </a>
            <figure
              class="w-full  shadow-element rounded-2xl overflow-hidden bg-element"
            >
              <img class="w-full h-auto aspect-[4/3] object-cover" alt="flag of ${this.formatProp(el.name)}" src="${this.formatProp(el.flag)}" />
            </figure>
         </div>

        <div class="w-full xl:w-1/2 flex flex-col gap-8 text-main">
          <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 class="text-3xl lg:text-4xl font-bold">${this.formatProp(el.name)}</h2>
          </div>

          <div class="flex flex-wrap gap-8 md:gap-4">
            <div class="flex flex-col gap-2">
              <p class="text-sm font-semibold">
                Native Name: <span class="font-light text-sub">${this.formatProp(el.nativeName)}</span>
              </p>
              <p class="text-sm font-semibold">
                Population: <span class="font-light text-sub">${this.formatProp(new Intl.NumberFormat('en-US').format(el.population))}</span>
              </p>
              <p class="text-sm font-semibold">
                Region: <span class="font-light text-sub">${this.formatProp(el.region)}</span>
              </p>
              <p class="text-sm font-semibold">
                Sub Region: <span class="font-light text-sub">${this.formatProp(el.subregion)}</span>
              </p>
              <p class="text-sm font-semibold">
                Capital: <span class="font-light text-sub">${this.formatProp(el.capital)}</span>
              </p>
            </div>
            <div class="flex flex-col gap-2">
              <p class="text-sm font-semibold">
                Top Level Domain: <span class="font-light text-sub">${this.formatProp(el.topLevelDomain?.[0])}</span>
              </p>
              <p class="text-sm font-semibold">
                Currencies: <span class="font-light text-sub">${this.formatProp(el.currencies?.[0].name)}</span>
              </p>
              <p class="text-sm font-semibold">
                Languages: <span class="font-light text-sub">${this.formatProp(el.languages.map(el => el.nativeName).join(' ,'))}</span>
              </p>
            </div>
          </div>

          <div class="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-4">
            <span class="text-sm font-semibold whitespace-nowrap">Border Countries:</span>
            <div class="flex flex-wrap gap-2">
            ${this.formatProp(
              el.borders
                ?.map((el, i) => {
                  return `
             <a
                href="#${el}"
                class="px-6 py-1.5 bg-element text-main shadow-element rounded-sm text-sm font-light hover:opacity-80 transition-opacity"
              >${currBorders[i]}</a>
                `;
                })
                .join(''),
            )}
            </div>
          </div>
        </div>
      </div>
    `;
    this.parentEl.innerHTML = markup;
  }
}
export default new Details();
