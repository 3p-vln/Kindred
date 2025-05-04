import { getElement, getElements } from '../composables/use-call-dom.ts';

const tabsBtn = getElements('.tabs__nav-btn');
const tabsItems = getElements('.tabs__item');
const params = new URLSearchParams(window.location.search);

export function initTab() {
  activeTab()

  tabsBtn.forEach((tab) => {
    tab.addEventListener('click', () => onTabClick(tab));
  });
}

function onTabClick(tab: HTMLElement) {
  const tabId = tab.getAttribute('data-tab');
  const currentTab = getElement(tabId!);

  if (!tabId) return;

  if (!tab.classList.contains('active')) {
    tabsBtn.forEach((item) => item.classList.remove('tabs__nav-btn_active'));
    tabsItems.forEach((item) => item.classList.remove('tabs__item_active'));

    tab.classList.add('tabs__nav-btn_active');
    if (currentTab) currentTab.classList.add('tabs__item_active');

    params.set('tab', tabId);
    window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
  }
}

function activeTab() {
  const active = params.get('tab');

  if(!active) {
    tabsBtn[0].classList.add('tabs__nav-btn_active');
    tabsItems[0]?.classList.add('tabs__item_active');
    return;
  }

  const activeTab = getElement(`.tabs__nav-btn[data-tab="${active}"]`);
  const activeItem = getElement(`.tabs__item${active}`);

  tabsBtn.forEach((item) => item.classList.remove('tabs__nav-btn_active'));
  tabsItems.forEach((item) => item.classList.remove('tabs__item_active'));

  if (active) {
    activeTab?.classList.add('tabs__nav-btn_active');
    activeItem?.classList.add('tabs__item_active');
  }
}
