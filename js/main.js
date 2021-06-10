function getRandomNumber(min, max, precision) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапазон чисел');
  }
  return Number((Math.random() * (max - min) + min).toFixed(precision));
}

const TITLE = [
  'Апартаменты-студио',
  'Апартаменты-студио с балконом',
  'Апартаменты с 1 спальней',
  'Апартаменты с 3 спальнями',
  'Апартаменты Делюкс',
  'Апартаменты с видом на сад',
  'Стандартные апартаменты',
  'Улучшенные апартаменты',
  'Двухместный номер с 1 кроватью',
  'Улучшенный трехместный номер',
];

const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];

const TIME = [
  '12:00',
  '13:00',
  '14:00',
];

const DESCRIPTION = [
  'Гостям предлагаются апартаменты с кондиционером и бесплатным Wi-Fi.',
  'Среди удобств полностью оборудованная кухня с микроволновой печью.',
  'Это любимая часть города среди наших гостей согласно независимым отзывам.',
  'По утрам для гостей сервируют континентальный завтрак.',
  'На территории обустроена детская игровая площадка.',
  'На территории обустроена частная парковка.',
  'К услугам гостей бассейн и ресторан.',
  'Гости, желающие ознакомиться с районом, могут отправиться на пешую или велосипедную прогулку.',
  'В собственной ванной комнате имеются тапочки и фен.',
  'Гости могут взять напрокат автомобиль и отправиться на прогулку по окрестностям.',
];

const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];

const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

const SIMILAR_AD_COUNT = 10;
const LAT_MIN = 35.65000;
const LAT_MAX = 35.70000;
const LNG_MIN = 139.70000;
const LNG_MAX = 139.80000;
const POINTS = 5;
const PRICE_MIN = 100;
const PRICE_MAX = 1000;
const ROOMS_MIN = 1;
const ROOMS_MAX = 5;
const GUESTS_MIN = 1;
const GUESTS_MAX = 10;

//поиск случайного элемента в переданном массиве
const getRandomArrayElement = (elements) => elements[getRandomNumber(0, elements.length - 1)];

//массив случайной длины из значений другого массива
const getRandomArray = (arr) => {
  const rand = getRandomNumber(1, arr.length);
  const newArr = [];
  while (newArr.length !== rand) {
    const elem = arr[getRandomNumber(0, arr.length-1)];
    if (newArr.indexOf(elem) === -1) {
      newArr.push(elem);
    }
  }
  return newArr;
};

// адрес изображения
const createNumber = () => {
  const rand = getRandomNumber(1, 10);
  if (rand < 10) {
    return`img/avatars/user0${rand}.png`;
  }
  return`img/avatars/user${rand}.png`;
};

// author (объект — описывает автора)
const createAuthor = () => ({
  avatar: createNumber(),
});

// offer (объект — содержит информацию об объявлении)
const createOffer = () => ({
  title: getRandomArrayElement(TITLE),
  address: `${getRandomNumber(LAT_MIN, LAT_MAX, POINTS)}, ${getRandomNumber(LNG_MIN, LNG_MAX, POINTS)}`,
  price: getRandomNumber(PRICE_MIN, PRICE_MAX),
  type: getRandomArrayElement(TYPE),
  rooms: getRandomNumber(ROOMS_MIN, ROOMS_MAX),
  guests: getRandomNumber(GUESTS_MIN, GUESTS_MAX),
  checkin: getRandomArrayElement(TIME),
  checkout: getRandomArrayElement(TIME),
  features: getRandomArray(FEATURES),
  description: getRandomArrayElement(DESCRIPTION),
  photos: getRandomArray(PHOTOS),
});

// location (объект — местоположение в виде географических координат)
const createLocation = () => ({
  lat: getRandomNumber(LAT_MIN, LAT_MAX, POINTS),
  lng: getRandomNumber(LNG_MIN, LNG_MAX, POINTS),
});

const createAd = () => ({
  author: createAuthor(),
  offer: createOffer(),
  location: createLocation(),
});

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
similarAds;
