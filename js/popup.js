const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const imgItem = similarAdTemplate.querySelector('.popup__photo');

const typeOfHousing = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

/**
 * Заменяет элементы в списке характерстик
 * @param {array} arr
 * @returns {string}
 */
const getFeatures = (arr) => arr.map( (feature) => `<li class="popup__feature popup__feature--${feature}"></li>`).join('');

/**
 * Определение верной словоформы
 * @param {number} room
 * @returns {string}
 */
const setRoomsText = (room) => {
  if (room === 1 || (room % 10 === 1 && room !== 11)) {
    return 'комната';
  }
  if ((room > 1 && room < 5) || (room % 10 === 2 && room !== 12) || (room % 10 === 3 && room !== 13) || (room % 10 === 4 && room !== 14)) {
    return 'комнаты';
  } else {
    return 'комнат';
  }
};

/**
 * Определение верной словоформы
 * @param {number} guest
 * @returns {string}
 */
const setGuestsText = (guest) => {
  if (guest === 1 || (guest % 10 === 1 && guest !== 11)) {
    return 'гостя';
  }
  return 'гостей';
};

/**
 * Перебирает массив с адресами изображений и добавляет в атрибут src
 * @param {array} arr
 * @returns DocumentFragment
 */
const createPhotosList = (arr) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < arr.length; i++) {
    const element = imgItem.cloneNode(true);
    element.src = arr[i];
    fragment.appendChild(element);
  }
  return fragment;
};

/**
 * Отрисовывает карточку объявления, заполненную по шаблону из сгенерированного объекта
 * @param {object} obj
 */
const renderCard = (obj) => {
  const cardItem = similarAdTemplate.cloneNode(true);

  if (obj.author.avatar) {
    cardItem.querySelector('.popup__avatar').src = obj.author.avatar;
  } else {
    cardItem.querySelector('.popup__avatar').remove();
  }

  if (obj.offer.title) {
    cardItem.querySelector('.popup__title').textContent = obj.offer.title;
  } else {
    cardItem.querySelector('.popup__title').remove();
  }

  if (obj.offer.address) {
    cardItem.querySelector('.popup__text--address').textContent = obj.offer.address;
  } else {
    cardItem.querySelector('.popup__text--address').remove();
  }

  if (obj.offer.price) {
    cardItem.querySelector('.popup__text--price').textContent = `${obj.offer.price} ₽/ночь`;
  } else {
    cardItem.querySelector('.popup__text--price').remove();
  }

  if (obj.offer.type) {
    cardItem.querySelector('.popup__type').textContent = typeOfHousing[obj.offer.type];
  } else {
    cardItem.querySelector('.popup__type').remove();
  }

  if (obj.offer.rooms || obj.offer.guests) {
    cardItem.querySelector('.popup__text--capacity').textContent = `${obj.offer.rooms} ${setRoomsText(obj.offer.rooms)} для ${obj.offer.guests} ${setGuestsText(obj.offer.guests)}`;
  } else {
    cardItem.querySelector('.popup__text--capacity').remove();
  }

  if (obj.offer.checkin && obj.offer.checkout) {
    cardItem.querySelector('.popup__text--time').textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  } else {
    cardItem.querySelector('.popup__text--time').remove();
  }

  if (obj.offer.features) {
    cardItem.querySelector('.popup__features').innerHTML = getFeatures(obj.offer.features);
  } else {
    cardItem.querySelector('.popup__features').remove();
  }

  if (obj.offer.description) {
    cardItem.querySelector('.popup__description').textContent = obj.offer.description;
  } else {
    cardItem.querySelector('.popup__description').remove();
  }

  if (obj.offer.photos) {
    cardItem.querySelector('.popup__photos').innerHTML = '';
    cardItem.querySelector('.popup__photos').appendChild(createPhotosList(obj.offer.photos));
  } else {
    cardItem.querySelector('.popup__photos').remove();
  }

  return cardItem;
};

export {renderCard};
