const adForm = document.querySelector('.ad-form');
const fieldsets = document.querySelectorAll('fieldset');
const mapFiltersForm = document.querySelector('.map__filters');
const mapFiltersSelects = mapFiltersForm.querySelectorAll('select');

const titleInput = adForm.querySelector('#title');
const addressInput = adForm.querySelector('#address');
const priceInput = adForm.querySelector('#price');
const typeSelect = adForm.querySelector('#type');
const roomNumberSelect = adForm.querySelector('#room_number');
const capacitySelect = adForm.querySelector('#capacity');
const capacityOptions = capacitySelect.querySelectorAll('option');
const timeinSelect = adForm.querySelector('#timein');
const timeoutSelect = adForm.querySelector('#timeout');

const TitleLength = {
  MIN: 30,
  MAX: 100,
};

const MAX_PRICE = 1000000;

const housingMinPrice = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const roomsToCapacity = {
  '1': ['1'],
  '2': ['1', '2'],
  '3': ['1', '2', '3'],
  '100': ['0'],
};

/**
 * Переводит форму в активное состояние
 */
const getActiveForm = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsets.forEach((item) => item.disabled = false);
};

/**
 * Переводит фильтры в активное состояние
 */
const getActiveFilters = () => {
  mapFiltersForm.classList.remove('map__filters--disabled');
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

getInactiveForm();

addressInput.readOnly = true;

titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;
  if (valueLength < TitleLength.MIN) {
    titleInput.setCustomValidity(`Длина заголовка должна быть не менее 30 символов. Сейчас ${valueLength}, нужно еще ${TitleLength.MIN - valueLength} симв.`);
  } else if (valueLength > TitleLength.MAX) {
    titleInput.setCustomValidity(`Длина заголовка должна быть не более 100 символов. Удалите лишние ${valueLength - TitleLength.MAX} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }
  titleInput.reportValidity();
});

typeSelect.addEventListener('change', () => {
  const selectValue = typeSelect.value;
  priceInput.placeholder = housingMinPrice[selectValue];
  priceInput.min = housingMinPrice[selectValue];
});

priceInput.addEventListener('input', () => {
  const price = +priceInput.value;
  const placeholder = +priceInput.placeholder;
  if (price < placeholder) {
    priceInput.setCustomValidity(`Минимальная стоимость для данного типа жилья - ${placeholder}`);
  } else if (price > MAX_PRICE) {
    priceInput.setCustomValidity(`Максимальная стоимость не должна быть больше ${MAX_PRICE}`);
  } else {
    priceInput.setCustomValidity('');
  }
  priceInput.reportValidity();
});

roomNumberSelect.addEventListener('change', () => {
  const roomsValue = roomNumberSelect.value;
  capacityOptions.forEach((option) => option.disabled = !roomsToCapacity[roomsValue].includes(option.value));
});

timeinSelect.addEventListener('change', () => {
  timeoutSelect.value = timeinSelect.value;
});

timeoutSelect.addEventListener('change', () => {
  timeinSelect.value = timeoutSelect.value;
});

/**
 * Отправляет данные из формы на сервер и выводит сообщение об успешной отправке, если все поля заполненны корректно.
 * В противном случае выводит сообщение об ошибке.
 */
const setNewAdFormSubmit = (sendData, onSuccess, onError) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    sendData(
      () => onSuccess(),
      () => onError(),
      new FormData(evt.target),
    );
  });
};

/**
 * Восстанавливает стандартные значения всем элементам формы
 */
const resetAdForm = () => {
  adForm.reset();
};

export {resetAdForm, setNewAdFormSubmit, getActiveForm, getActiveFilters, addressInput};
