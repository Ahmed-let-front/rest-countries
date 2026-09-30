class ThemeTrigger {
  elements = {
    themeBtn: document.getElementById('theme-trigger'),
    themeModal: document.getElementById('theme-modal'),
    btnCloseModalTheme: document.getElementById('btn-close-modal-theme'),
    themeForm: document.getElementById('theme-form'),
    themeText: document.getElementById('theme-text'),
    themeIcon: document.getElementById('theme-icon'),
  };
  constructor() {
    this.handleThemeTrigger();
  }
  openModalTheme() {
    this.elements.themeBtn.setAttribute('aria-expanded', true);
    this.elements.themeModal.showModal();
  }
  closeModal() {
    this.elements.themeBtn.setAttribute('aria-expanded', false);
    this.elements.themeModal.close();
  }
  handleThemeTrigger() {
    this.elements.themeBtn.addEventListener('click', this.openModalTheme.bind(this));
    this.elements.btnCloseModalTheme.addEventListener('click', this.closeModal.bind(this));
    document.addEventListener('keydown', e => {
      if (!(e.key === 'Escape')) return;
      this.elements.themeBtn.setAttribute('aria-expanded', 'false');
    });
    this.elements.themeModal.addEventListener('click', e => {
      const targetEl = e.target;
      if (targetEl !== this.elements.themeModal) return;
      this.closeModal();
    });
  }
  changeClassInDOCEl(cls) {
    document.documentElement.classList = cls;
  }
  updateThemeUi(text, srcIcon) {
    this.elements.themeText.textContent = text;
    this.elements.themeIcon.setAttribute('href', srcIcon);
  }
  updateCheckedAttrInInps(val) {
    const targetInput = document.querySelector(`input[value='${val}']`);
    if (!targetInput) return;
    targetInput.checked = true;
  }
  addHandlerThemeBtns = handler => {
    this.elements.themeForm.addEventListener('change', e => {
      const radioInput = e.target;
      if (!radioInput.matches('input[type="radio"]')) return;
      const label = radioInput.closest('label');
      if (!label) return;
      const val = radioInput.value;
      const src = label.querySelector('use')?.getAttribute('href');
      handler(val, src);
    });
  };
}
export default new ThemeTrigger();
