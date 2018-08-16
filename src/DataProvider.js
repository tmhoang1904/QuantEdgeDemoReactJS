import _ from 'lodash';

const PAGE_LENGTH = 20;

export function getTopGainers(data) {
  if (data) {
    if (data.length > PAGE_LENGTH) return data.slice(data.length - PAGE_LENGTH, data.length).reverse();
    return data.slice().reverse();
  }
  return [];
}

export function getTopLosers(data) {
  if (data) {
    if (data.length > PAGE_LENGTH) return data.slice(0, PAGE_LENGTH);
    return data.slice();
  }
  return [];
}

export function calcDataFluctuation(initData, currentData) {
  let newData = [];
  if (
    initData &&
    currentData &&
    Array.isArray(initData) &&
    Array.isArray(currentData) &&
    initData.length === currentData.length
  ) {
    for (let i = 0; i < initData.length; i++) {
      const data = currentData[i];
      const newPrice = getPriceFluctuation(data.price);
      const newVolume = getVolumeFluctuation(data.volume);
      const newValue = Math.round(newVolume * newPrice);
      const change = newPrice - initData[i].price;
      const changePercent = (change / initData[i].price) * 100;

      newData.push({
        ...data,
        price: newPrice,
        volume: newVolume,
        value: newValue,
        change,
        changePercent
      });
    }

    newData = _.sortBy(newData, [
      item => {
        return item.value;
      }
    ]);
  }

  return newData;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.round((Math.random() * (max - min) + min) * 100) / 100;
}

function getRandomInteger(min, max) {
  return Math.round(getRandomArbitrary(min, max));
}

function getPriceFluctuation(currentPrice) {
  let changeValue = getRandomArbitrary(0, 6);
  const isNegative = getRandomInteger(0, 2) === 0;
  changeValue = isNegative ? changeValue * -1 : changeValue;
  const newPrice = Math.round((currentPrice + (currentPrice * changeValue) / 100) * 100) / 100;
  return newPrice;
}

function getVolumeFluctuation(currentVolume) {
  const changeValue = getRandomInteger(10, 31);
  return currentVolume + changeValue;
}
