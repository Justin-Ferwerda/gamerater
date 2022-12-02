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

export { getGames, getSingleGame, createGame };
