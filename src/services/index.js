// const DOMAIN = 'http://127.0.0.1:8080';
const DOMAIN = 'https://quantedgedemoserver.herokuapp.com';
const API_URL = DOMAIN + '/api/';

const GET_DATA_URL = API_URL + 'getdata';

export function requestData() {
  return new Promise((resolve, reject) => {
    fetch(GET_DATA_URL, { method: 'GET', headers: { 'Content-Type': 'application/json' } })
      .then(resp => resp.json())
      .then(result => {
        console.log('Resp: ', result);
        if (result && result.data) {
          resolve(result.data);
        } else {
          reject('No data');
        }
      })
      .catch(err => {
        console.log(err);
        reject(err);
      });
  });
}
