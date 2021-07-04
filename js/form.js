const adForm = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersSelects = mapFiltersForm.querySelectorAll('select');

/**
 * Переводит страницу в активное состояние
 */
const getActiveForm = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFiltersForm.classList.remove('map__filters--disabled');
  fieldsets.forEach((item) => item.disabled = false);
  mapFiltersSelects.forEach((item) => item.disabled = false);
};

/**
 * Переводит страницу в неактивное состояние
 */
const getInactiveForm = () => {
  adForm.classList.add('ad-form--disabled');
  mapFiltersForm.classList.add('map__filters--disabled');
  fieldsets.forEach((item) => item.disabled = true);
  mapFiltersSelects.forEach((item) => item.disabled = true);
};

export {getActiveForm, getInactiveForm};
