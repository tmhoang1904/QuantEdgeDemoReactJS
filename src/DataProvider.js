import _ from 'lodash';

const PAGE_LENGTH = 20;

const COMPANIES = [
  { name: 'Quant Edge', code: 'QAE.VN' },
  { name: 'FPT Software', code: 'FPT.VN' },
  { name: 'NashTech', code: 'NAT.VN' },
  { name: 'Google', code: 'GOO.VN' },
  { name: 'Facebook', code: 'FAB.VN' },
  { name: 'Amazon', code: 'AMA.VN' },
  { name: 'Apple', code: 'APL.VN' },
  { name: 'Samsung', code: 'SAM.VN' },
  { name: 'Oppo', code: 'OPP.VN' }
];

export function getInitData() {
  let n = 40 + Math.random() * 50;
  let data = [];
  for (let i = 0; i < n; i++) {
    const company = getCompany();
    const price = getPrice();
    const volume = getVolume();
    const value = Math.round(price * volume);
    const change = 0;
    const changePercent = 0;
    data.push({ id: i + 1, company, price, volume, value, change, changePercent });
  }

  data = _.sortBy(data, [
    item => {
      return item.value;
    }
  ]);

  return data;
}

export function getTopGainers(data) {
  return data.slice(data.length - PAGE_LENGTH, data.length).reverse();
}

export function getTopLosers(data) {
  return data.slice(0, PAGE_LENGTH);
}

export function calcDataFluctuation(initData, currentData) {
  let newData = [];
  for (let i = 0; i < initData.length; i++) {
    const data = currentData[i];
    const { newPrice, isNegative } = getPriceFluctuation(data.price);
    const newVolume = getVolumeFluctuation(data.volume);
    const newValue =  Math.round(newVolume * newPrice);
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

  return newData;
}

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

function getRandomInteger(min, max) {
  return Math.round(getRandomArbitrary(min, max));
}

function getVolume() {
  return getRandomInteger(1000, 1000001);
}

function getCompany() {
  const index = getRandomInteger(0, COMPANIES.length - 1);
  return COMPANIES[index];
}

function getPrice() {
  return Math.round(Math.random() * 100 * 100) / 100;
}

function getPriceFluctuation(currentPrice) {
  let changeValue = getRandomArbitrary(0, 6);
  const isNegative = getRandomInteger(0, 2) === 0;
  changeValue = isNegative ? changeValue * -1 : changeValue;
  const newPrice = Math.round((currentPrice + (currentPrice * changeValue) / 100) * 100) / 100;
  return { newPrice, isNegative };
}

function getVolumeFluctuation(currentVolume) {
  const changeValue = getRandomInteger(10, 31);
  return currentVolume + changeValue;
}

let id = 0;
function createData(code, company, price, value, change, changePercent) {
  id += 1;
  return { id, code, company, price, value, change, changePercent };
}

const data = [
  createData('ABC.DE', 'Quant Edge', 85.55, 555425065, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 45.5, 255425065, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 190.7, 255525065, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 120.55, 255542565, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24),
  createData('ABC.DE', 'Quant Edge', 60.4, 255542505, 0.99, 1.24)
];
