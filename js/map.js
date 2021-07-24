import {getActiveForm, addressInput} from './form.js';
import {renderCard} from './popup.js';

const MAP_ZOOM = 13;

const DefaultСoordinates = {
  LAT: 35.68171,
  LNG: 139.75389,
};

const MainPin = {
  URL: 'img/main-pin.svg',
  SIZE: [52, 52],
  ANCHOR: [26, 52],
};

const RegularPin = {
  URL: 'img/pin.svg',
  SIZE: [40, 40],
  ANCHOR: [20, 40],
};

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: MainPin.URL,
  iconSize: MainPin.SIZE,
  iconAnchor: MainPin.ANCHOR,
});

const mainMarker = L.marker(
  {
    lat: DefaultСoordinates.LAT,
    lng: DefaultСoordinates.LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

mainMarker.addTo(map);

/**
 * Устанавливает координаты адреса.
 * По умолчанию установлены координаты центра города. При перемещении главной метки устанавливаются новые координаты.
 */
const setAddressCoordinates = () => {
  addressInput.value = `${DefaultСoordinates.LAT}, ${DefaultСoordinates.LNG}`;

  mainMarker.on('move', (evt) => {
    const location = evt.target.getLatLng();
    addressInput.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  });
};

/**
 * Иницилизация карты
 */
const initMap = (getData) => {
  map
    .on('load', () => {
      getActiveForm();
      getData();
    })
    .setView(
      {
        lat: DefaultСoordinates.LAT,
        lng: DefaultСoordinates.LNG,
      }, MAP_ZOOM);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  setAddressCoordinates();
};

/**
 * Создает отдельный слой на карте, куда будут добавляться метки
 */
const markerGroup = L.layerGroup().addTo(map);

/**
 * Удаляет слой с метками на карте
 */
const removeLayer = () => markerGroup.clearLayers();

/**
 * Создает на карте метку с объявлением
 */
const createMarkers = (arr) => {
  removeLayer();
  arr.forEach((element) => {
    const {lat, lng} = element.location;

    const icon = L.icon({
      iconUrl: RegularPin.URL,
      iconSize: RegularPin.SIZE,
      iconAnchor: RegularPin.ANCHOR,
    });

    const marker = L.marker(
      {
        lat,
        lng,
      },
      {
        icon,
      },
    );

    marker
      .addTo(markerGroup)
      .bindPopup(
        renderCard(element),
        {
          keepInView: true,
        },
      );
  });
};

/**
* Восстанавливает стандартные значения для карты, устанавливает главную метку в центр
*/
const resetMap = () => {
  map.setView(
    {
      lat: DefaultСoordinates.LAT,
      lng: DefaultСoordinates.LNG,
    }, MAP_ZOOM);
  mainMarker.setLatLng(
    {
      lat: DefaultСoordinates.LAT,
      lng: DefaultСoordinates.LNG,
    },
  );
};

export {resetMap, createMarkers, setAddressCoordinates, initMap};
