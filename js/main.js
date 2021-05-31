function getRandomNumber(min, max, precision) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапазон чисел');
  } else {
    return Number((Math.random() * (max - min) + min).toFixed(precision));
  }
}

getRandomNumber(2, 5);
