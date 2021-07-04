import {createSimilarAds} from './data.js';
import {renderCard} from './popup.js';

const SIMILAR_AD_COUNT = 10;

const ads = createSimilarAds(SIMILAR_AD_COUNT);
renderCard(ads[0]);
