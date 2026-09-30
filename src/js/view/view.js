export class View {
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
}
