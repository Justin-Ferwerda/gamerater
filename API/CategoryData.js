import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbURL}/categories`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getGameCategories = () => new Promise((resolve, reject) => {
  fetch(`${dbURL}/gamecategories`)
    .then((response) => resolve(response.json()))
    .catch(reject);
});

const createGameCategory = (category) => new Promise((resolve, reject) => {
  fetch(`${dbURL}/gamecategories`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(category),
  })
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const updateGameCategory = (data, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/gamecategories/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getCategories, createGameCategory, updateGameCategory, getGameCategories,
};
