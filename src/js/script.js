const elements = {
  themeBtn: document.getElementById('theme-trigger'),
  themeModal: document.getElementById('theme-modal'),
  btnCloseModalTheme: document.getElementById('btn-close-modal-theme'),
  themeForm: document.getElementById('theme-form'),
  themeText: document.getElementById('theme-text'),
  themeIcon: document.getElementById('theme-icon'),
  themeMode: ['system', ''],
};
const openModalTheme = () => {
  elements.themeBtn.setAttribute('aria-expanded', true);
  elements.themeModal.showModal();
};
const closeModal = () => {
  elements.themeBtn.setAttribute('aria-expanded', false);
  elements.themeModal.close();
};
const handleThemeTrigger = () => {
  elements.themeBtn.addEventListener('click', openModalTheme);
  elements.btnCloseModalTheme.addEventListener('click', closeModal);
  document.addEventListener('keydown', e => {
    if (!(e.key === 'Escape')) return;
    elements.themeBtn.setAttribute('aria-expanded', 'false');
  });
  elements.themeModal.addEventListener('click', e => {
    const targetEl = e.target;
    if (targetEl !== elements.themeModal) return;
    closeModal();
  });
};
const changeClassInDOCEl = cls => {
  document.documentElement.classList = cls;
};
const updateThemeUi = (text, srcIcon) => {
  elements.themeText.textContent = text;
  elements.themeIcon.setAttribute('href', srcIcon);
};
const updateCheckedAttrInInps = inp => {
  inp.checked = true;
};
const setThemeModeInLocalStorege = themeMode => {
  console.log(themeMode);
  localStorage.setItem('themeMode', JSON.stringify(themeMode));
};
const getThemeModeFromLocalStorege = () => {
  const data = localStorage.getItem('themeMode');
  if (!data) return;
  elements.themeMode = JSON.parse(data);
};
const handleThemeLocalStorge = () => {
  getThemeModeFromLocalStorege();
  const [val, src] = elements.themeMode;
  const targetInput = document.querySelector(`input[value='${val}']`)
  updateThemeUi(val, src);
  updateCheckedAttrInInps(targetInput)
  if (val === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (isDark) changeClassInDOCEl('dark');
    else changeClassInDOCEl('light');
    return;
  }
  changeClassInDOCEl(val);
};
const handleThemeBtns = () => {
  elements.themeForm.addEventListener('change', e => {
    const radioInput = e.target;
    if (!radioInput.matches('input[type="radio"]')) return;
    const label = radioInput.closest('label');
    if (!label) return;
    const val = radioInput.value;
    const src = label.querySelector('use')?.getAttribute('href');
    elements.themeMode = [val, src];
    setThemeModeInLocalStorege(elements.themeMode);
    updateThemeUi(val, src);
    if (val === 'system') {
      const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (isDark) changeClassInDOCEl('dark');
      else changeClassInDOCEl('light');
      return;
    }
    changeClassInDOCEl(val);
  });
};
const init = () => {
  handleThemeTrigger();
  handleThemeBtns();
  handleThemeLocalStorge();
};
init();
