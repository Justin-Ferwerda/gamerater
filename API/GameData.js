import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const getGames = () => new Promise((resolve, reject) => {
  fetch(`${dbURL}/games`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

const getSingleGame = (gameId) => new Promise((resolve, reject) => {
  fetch(`${dbURL}/games/${gameId}`)
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const createGame = (game) => new Promise((resolve, reject) => {
  fetch(`${dbURL}/games`, {
    method: 'POST',
    body: JSON.stringify(game),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const updateGame = (data, id) => new Promise((resolve, reject) => {
  fetch(`${clientCredentials.databaseURL}/games/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  })
    .then((response) => resolve(response))
    .catch((error) => reject(error));
});

export {
  getGames, getSingleGame, createGame, updateGame,
};
