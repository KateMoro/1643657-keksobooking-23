const mapCanvas = document.querySelector('#map-canvas');
const similarAdTemplate = document.querySelector('#card').content.querySelector('.popup');
const imgItem = similarAdTemplate.querySelector('.popup__photo');

const TypeOfHousing = {
  FLAT: 'Квартира',
  BUNGALOW: 'Бунгало',
  HOUSE: 'Дом',
  PALACE: 'Дворец',
  HOTEL: 'Отель',
};

/**
 * Удаляет элементы из списка характеристик
 * @param {array} arr
 * @returns {array}
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
  if (room === 1 || (room % 10 === 1 && room !== 11)) {
    return 'комната';
  }
  if ( (room > 1 && room < 5) || (room % 10 === 2 && room !== 12) || (room % 10 === 3 && room !== 13) || (room % 10 === 4 && room !== 14) ) {
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
const guestsText = (guest) => {
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
 * Удаляет пустые элементы
 * @param {*} elem1
 * @param {*} elem2
 */
const checkData = (elem1, elem2) => {
  if (!elem1 || elem1.length === 0) {
    elem2.remove();
  }
};

/**
 * Отрисовывает карточку объявления, заполненную по шаблону из сгенерированного объекта
 * @param {object} obj
 */
const renderCard = (obj) => {
  const cardItem = similarAdTemplate.cloneNode(true);

  const avatar = cardItem.querySelector('.popup__avatar');
  const title = cardItem.querySelector('.popup__title');
  const address = cardItem.querySelector('.popup__text--address');
  const price = cardItem.querySelector('.popup__text--price');
  const type = cardItem.querySelector('.popup__type');
  const capacity = cardItem.querySelector('.popup__text--capacity');
  const time = cardItem.querySelector('.popup__text--time');
  const features = cardItem.querySelector('.popup__features');
  const description = cardItem.querySelector('.popup__description');
  const photos = cardItem.querySelector('.popup__photos');

  title.textContent = obj.offer.title;
  address.textContent = obj.offer.address;
  price.textContent = `${obj.offer.price} ₽/ночь`;
  type.textContent = TypeOfHousing[obj.offer.type];
  capacity.textContent = `${obj.offer.rooms} ${roomsText(obj.offer.rooms)} для ${obj.offer.guests} ${guestsText(obj.offer.guests)}`;
  time.textContent = `Заезд после ${obj.offer.checkin}, выезд до ${obj.offer.checkout}`;
  description.textContent = obj.offer.description;
  avatar.src = obj.author.avatar;
  photos.innerHTML = '';
  photos.appendChild(createPhotosList(obj.offer.photos));
  features.innerHTML = '';
  features.appendChild(getFeatures(obj.offer.features));

  checkData(obj.author.avatar, avatar);
  checkData(obj.offer.title, title);
  checkData(obj.offer.address, address);
  checkData(obj.offer.price, price);
  checkData(obj.offer.type, type);
  checkData(obj.offer.rooms, capacity);
  checkData(obj.offer.guests, capacity);
  checkData(obj.offer.checkin, time);
  checkData(obj.offer.checkout, time);
  checkData(obj.offer.features, features);
  checkData(obj.offer.description, description);
  checkData(obj.offer.photos, photos);

  mapCanvas.appendChild(cardItem);
};

export {renderCard};
