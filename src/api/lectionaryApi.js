import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getLectionary() {
  return get('api/lectionary');
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, OnError);
}

function onSuccess(response) {
  return response.json();
}

function OnError(error) {
  console.log(error); // eslint-disable-line no-console
}
