import {similarAds} from './data.js';

const mapCanvas = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const imgItem = similarAdTemplate.querySelector('.popup__photo');

const TYPE_OF_HOUSING = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

/**
 * Удаляет элементы из списка характеристик
 * @param {Array} arr
 * @returns {Array}
 */
const getFeatures = (arr) => {
  const featuresList = similarAdTemplate.querySelector('.popup__features');
  const modifiers = arr.map( (feature) => `popup__feature--${feature}`);
  featuresList.querySelectorAll('.popup__feature').forEach((item) => {
    const modifier = item.classList[1];
    if (!modifiers.includes(modifier)) {
      item.remove();
    }
  });
  return featuresList;
};

/**
 * Определение верной словоформы
 * @param {number} room
 * @returns {string}
 */
const roomsText = (room) => {
  let text = 'комната';
  if (room > 1) {
    text = 'комнаты';
  }
  if (room > 4) {
    text = 'комнат';
  }
  return text;
};

/**
 * Определение верной словоформы
 * @param {number} guest
 * @returns {string}
 */
const guestsText = (guest) => {
  let text = 'гостя';
  if (guest > 1) {
    text = 'гостей';
  }
  return text;
};


/**
 * Перебирает массив с адресами изображений и добавляет в атрибут src
 * @param {Array} arr
 * @returns
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

const similarAdsFragment = document.createDocumentFragment();

similarAds.forEach((ad) => {
  const adItem = similarAdTemplate.cloneNode(true);

  if (ad.author.avatar) {
    adItem.querySelector('.popup__avatar').src = ad.author.avatar;
  } else {
    adItem.querySelector('.popup__avatar').remove();
  }

  if (ad.offer.title) {
    adItem.querySelector('.popup__title').textContent = ad.offer.title;
  } else {
    adItem.querySelector('.popup__title').remove();
  }

  if (ad.offer.address) {
    adItem.querySelector('.popup__text--address').textContent = ad.offer.address;
  } else {
    adItem.querySelector('.popup__text--address').remove();
  }

  if (ad.offer.price) {
    adItem.querySelector('.popup__text--price').textContent = `${ad.offer.price} ₽/ночь`;
  } else {
    adItem.querySelector('.popup__text--price').remove();
  }

  if (ad.offer.type) {
    adItem.querySelector('.popup__type').textContent = TYPE_OF_HOUSING[ad.offer.type];
  } else {
    adItem.querySelector('.popup__type').remove();
  }

  if (ad.offer.rooms || ad.offer.guests) {
    adItem.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms} ${roomsText(ad.offer.rooms)} для ${ad.offer.guests} ${guestsText(ad.offer.guests)}`;
  } else {
    adItem.querySelector('.popup__text--capacity').remove();
  }

  if (ad.offer.checkin && ad.offer.checkout) {
    adItem.querySelector('.popup__text--time').textContent = `Заезд после ${ad.offer.checkin}, выезд до ${ad.offer.checkout}`;
  } else {
    adItem.querySelector('.popup__text--time').remove();
  }

  if (ad.offer.features) {
    getFeatures(ad.offer.features);
  } else {
    adItem.querySelector('.popup__features').remove();
  }

  if (ad.offer.description) {
    adItem.querySelector('.popup__description').textContent = ad.offer.description;
  } else {
    adItem.querySelector('.popup__description').remove();
  }

  if (ad.offer.photos) {
    adItem.querySelector('.popup__photos').innerHTML = '';
    adItem.querySelector('.popup__photos').appendChild(createPhotosList(ad.offer.photos));
  } else {
    adItem.querySelector('.popup__photos').remove();
  }

  similarAdsFragment.appendChild(adItem);
});

mapCanvas.appendChild(similarAdsFragment);
