import {similarAds} from './data.js';
import {renderCard} from './popup.js';

const SIMILAR_AD_COUNT = 10;

const ads = similarAds(SIMILAR_AD_COUNT);
renderCard(ads[0]);
