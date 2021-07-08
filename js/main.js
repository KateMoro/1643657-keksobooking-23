import {createSimilarAds} from './data.js';
import {createMarkers} from './map.js';

const SIMILAR_AD_COUNT = 10;
const ads = createSimilarAds(SIMILAR_AD_COUNT);
createMarkers(ads);
