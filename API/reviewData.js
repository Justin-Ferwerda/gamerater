import { clientCredentials } from '../utils/client';

const dbURL = clientCredentials.databaseURL;

const createReview = (review) => new Promise((resolve, reject) => {
  const reviewData = {
    game: review.game,
    player: review.player,
    review: review.review,
  };
  fetch(`${dbURL}/reviews`, {
    method: 'POST',
    body: JSON.stringify(reviewData),
    headers: {
      'content-type': 'application/json',
    },
  })
    .then((response) => resolve(response.json()))
    .catch((error) => reject(error));
});

const getReviews = (gameId) => new Promise((resolve, reject) => {
  fetch(`${dbURL}/reviews?game=${gameId}`)
    .then((response) => response.json())
    .then(resolve)
    .catch(reject);
});

export { createReview, getReviews };
