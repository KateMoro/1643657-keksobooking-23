import {getActiveForm, addressInput} from './form.js';
import {renderCard} from './popup.js';

const DefaultСoordinates = {
  LAT: 35.68171,
  LNG: 139.75389,
};

const map = L.map('map-canvas')
  .on('load', () => getActiveForm())
  .setView(
    {
      lat: DefaultСoordinates.LAT,
      lng: DefaultСoordinates.LNG,
    }, 13);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
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

  mainMarker.on('moveend', (evt) => {
    const location = evt.target.getLatLng();
    addressInput.value = `${location.lat.toFixed(5)}, ${location.lng.toFixed(5)}`;
  });
};

setAddressCoordinates();

/**
 * Создает на карте метку с объявлением
 */
const createMarkers = (arr) => {
  arr.forEach((element) => {
    const {lat, lng} = element.location;

    const icon = L.icon({
      iconUrl: '../img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
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
      .addTo(map)
      .bindPopup(
        renderCard(element),
        {
          keepInView: true,
        },
      );
  });
};

export {createMarkers};
