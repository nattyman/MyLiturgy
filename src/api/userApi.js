import 'whatwg-fetch';
import getBaseUrl from './baseUrl';

const baseUrl = getBaseUrl();

export function getUsers() {
  return get('users');
}

export function deleteUser(id) {
  return del(`users/${id}`);
}

function get(url) {
  return fetch(baseUrl + url).then(onSuccess, OnError);
}

// Can't call func "delete" since it's a reserved word in JS.
function del(url) {
  const request = new Request(baseUrl + url, {
    method: 'Delete'
  });

  return fetch(request).then(onSuccess, OnError);
}

function onSuccess(response){
  return response.json();
}

function OnError(error) {
  console.log(error); // eslint-disable-line no-console
}
