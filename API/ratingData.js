import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const createRating = (rating) => new Promise((resolve, reject) => {
  const ratingData = {
    game: rating.game,
    player: rating.player,
    rating: rating.rating,
  };
  fetch(`${dbURL}/ratings`, {
    method: 'POST',
    body: JSON.stringify(ratingData),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

export default createRating;
