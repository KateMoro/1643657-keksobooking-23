import {getData, sendData} from './api.js';
import {setNewAdFormSubmit} from './form.js';
import {showSuccessMessage, showErrorMessage} from './messages.js';
import {createMarkers} from './map.js';

const SIMILAR_AD_COUNT = 10;

getData((ads) => {
  createMarkers(ads.slice(0, SIMILAR_AD_COUNT));
});

setNewAdFormSubmit(sendData, showSuccessMessage, showErrorMessage);
