import {SIMILAR_AD_COUNT, createAd} from './data.js';

const similarAds = new Array(SIMILAR_AD_COUNT).fill(null).map(() => createAd());
similarAds;
