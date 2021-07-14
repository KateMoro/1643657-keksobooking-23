const ALERT_SHOW_TIME = 5000;

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

/**
 * Показывает сообщение с ошибкой
 * @param {string} message
 */
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 1000;
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = 0;
  alertContainer.style.top = '30%';
  alertContainer.style.right = 0;
  alertContainer.style.padding = '50px 10px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'tomato';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomNumber, showAlert};
