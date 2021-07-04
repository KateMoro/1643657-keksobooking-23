import {createSimilarAds} from './data.js';
import {renderCard} from './popup.js';
import {getActiveForm} from './form.js';

const SIMILAR_AD_COUNT = 10;

const ads = createSimilarAds(SIMILAR_AD_COUNT);
renderCard(ads[0]);
getActiveForm();
