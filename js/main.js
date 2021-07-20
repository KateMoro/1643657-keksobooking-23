import {getData, sendData} from './api.js';
import {setNewAdFormSubmit, resetAdForm, getActiveFilters} from './form.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {setAddressCoordinates, createMarkers, resetMap} from './map.js';
import {filterTypeField, filterRoomsField, filterGuestsField, filterPriceField, filterFeatures, mapFiltersChangeHandler, resetMapFilters} from './filter.js';
import {resetImages} from './avatar.js';

const SIMILAR_AD_COUNT = 10;

const resetButton = document.querySelector('.ad-form__reset');

getData((ads) => {
  createMarkers(ads.slice(0, SIMILAR_AD_COUNT));
  getActiveFilters();

  mapFiltersChangeHandler(() => {
    createMarkers(ads
      .slice()
      .filter((ad) => (filterTypeField(ad) && filterRoomsField(ad) && filterGuestsField(ad) && filterPriceField(ad) && filterFeatures (ad)))
      .slice(0, SIMILAR_AD_COUNT));
  });
});

setNewAdFormSubmit(sendData, showSuccessMessage, showErrorMessage);

resetButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  resetMap();
  resetMapFilters();
  resetAdForm();
  setAddressCoordinates();
  resetImages();
});
