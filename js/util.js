/**
 *Функция, возвращающая случайное число из переданного диапазона включительно.
 * @param {number} min любое положительное число, включая 0
 * @param {number} max любое положительное число, больше чем min
 * @param {number} precision количеством знаков после запятой
 * @returns {number} целое число из диапазона (от, до), если передано два параметра или число с плавающей точкой из диапазона (от, до, количество знаков), если передано три параметра
 */
function getRandomNumber(min, max, precision) {
  if (min < 0 || min >= max) {
    throw new Error('Некорректный диапазон чисел');
  }
  return Number((Math.random() * (max - min) + min).toFixed(precision));
}

export {getRandomNumber};
