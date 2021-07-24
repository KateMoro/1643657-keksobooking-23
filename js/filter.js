import {debounce} from './utils/debounce.js';

const ANY = 'any';

const priceMap = {
  low: {start: 0, end: 10000},
  middle: {start: 10000, end: 50000},
  high: {start: 50000, end: 1000000},
};

const mapFiltersForm = document.querySelector('.map__filters');
const housingTypeSelect = mapFiltersForm.querySelector('#housing-type');
const housingPriceSelect = mapFiltersForm.querySelector('#housing-price');
const housingRoomsSelect = mapFiltersForm.querySelector('#housing-rooms');
const housingGuestsSelect = mapFiltersForm.querySelector('#housing-guests');

const filterTypeField = (ad) => housingTypeSelect.value === ANY || ad.offer.type === housingTypeSelect.value;
const filterRoomsField = (ad) => housingRoomsSelect.value === ANY || ad.offer.rooms === Number(housingRoomsSelect.value);
const filterGuestsField = (ad) => housingGuestsSelect.value === ANY || ad.offer.guests === Number(housingGuestsSelect.value);

const filterPriceField = (ad) => housingPriceSelect.value === ANY || (ad.offer.price >= priceMap[housingPriceSelect.value].start && ad.offer.price <= priceMap[housingPriceSelect.value].end);

const filterFeatures = (ad) => {
  const checkedFeatures = mapFiltersForm.querySelectorAll('input[name="features"]:checked');
  if (ad.offer.features) {
    return Array.from(checkedFeatures).every((feature) => ad.offer.features.includes(feature.value));
  }
};

const mapFiltersChangeHandler = (cb) => {
  mapFiltersForm.addEventListener('change', debounce(() => {
    cb();
  }));
};

const resetMapFilters = () => {
  mapFiltersForm.reset();
};

export {filterTypeField, filterRoomsField, filterGuestsField, filterPriceField, filterFeatures, mapFiltersChangeHandler, resetMapFilters};
