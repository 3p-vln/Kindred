import { getElement, getElements } from '../composables/use-call-dom.ts';

const dropdownMenu = getElement(".cabinet__tabs");
const dropdownSelect = getElement(".drop-down__select");

export function initDropdownMenu() {
  if (window.innerWidth <= 768) {
    setupDropdown();
  }

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
      setupDropdown();
    } else {
      dropdownSelect?.classList.remove('active');
      dropdownMenu?.classList.remove('hidden');
      dropdownMenu?.classList.remove('drop-down__menu');
    }
  });
}

function onItemClick(item: HTMLElement) {
  const selectedValue = item.textContent;
  if (selectedValue && dropdownSelect) {
    dropdownSelect.textContent = selectedValue;
    teardownDropdown();
  }
}

function toggleDropdownMenu(event: Event) {
  event.stopPropagation();
  if(!dropdownSelect || !dropdownMenu) return;

  dropdownSelect.classList.toggle('active');
  dropdownMenu.classList.toggle('hidden');
}

function setupDropdown() {
  if(!dropdownMenu || !dropdownSelect) return;

  dropdownMenu.classList.add('drop-down__menu');
  dropdownMenu.classList.add('hidden');

  const activeItem = getElement('.tabs__nav-btn_active');

  if (activeItem && activeItem.textContent) {
    dropdownSelect.textContent = activeItem.textContent.trim();
  }

  const dropdownMenuItems = getElements(".tabs__nav-btn");

  dropdownMenuItems.forEach(menuItem => {
    menuItem.addEventListener("click", () => onItemClick(menuItem));
  })

  document.addEventListener('click', (event) => handleOutsideClick(event));
  dropdownSelect.addEventListener("click", toggleDropdownMenu);
}

function teardownDropdown() {
  dropdownSelect?.classList.remove('active');
  dropdownMenu?.classList.add('hidden');
}

function handleOutsideClick(event: MouseEvent) {
  if (!dropdownSelect?.contains(event.target as Node) && !dropdownMenu?.contains(event.target as Node)) {
    teardownDropdown();
  }
}