import {setAddressCoordinates, resetMap} from './map.js';
import {resetMapFilters} from './filter.js';
import {resetAdForm} from './form.js';
import {resetImages} from './avatar.js';

const successMessageTemplate = document.querySelector('#success').content.querySelector('.success');
const errorMessageTemplate = document.querySelector('#error').content.querySelector('.error');
const errorButton = errorMessageTemplate.querySelector('.error__button');

const isEscEvent = (evt) => evt.key === 'Escape' || evt.key === 'Esc';

const popupEscKeydownHandler = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    closePopup();
  }
};

const popupCloseClickHandler = () => closePopup();

/**
 * Удаляет сообщение со страницы и обработчики событий
 */
function closePopup () {
  const popup = document.querySelector('.popup-message');
  popup.remove();
  document.removeEventListener('keydown', popupEscKeydownHandler);
}

/**
 * Создает сообщение из шаблона в разметке и добавляет на страницу, добавляет обработчики событий
 */
const showMessage = (value) => {
  const popupMessage = value.cloneNode(true);
  popupMessage.classList.add('popup-message');
  document.body.insertAdjacentElement('beforeend', popupMessage);

  popupMessage.addEventListener('click', popupCloseClickHandler);
  document.addEventListener('keydown', popupEscKeydownHandler);
};

/**
 * Показывает сообщение об успешной отправке формы
 */
const showSuccessMessage = () => {
  showMessage(successMessageTemplate);
  resetMap();
  resetMapFilters();
  resetAdForm();
  setAddressCoordinates();
  resetImages();
};

/**
 * Показывает сообщение об ошибке
 */
const showErrorMessage = () => {
  showMessage(errorMessageTemplate);
  errorButton.addEventListener('click', popupCloseClickHandler);
};

export {showSuccessMessage, showErrorMessage};
