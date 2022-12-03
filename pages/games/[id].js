/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getGameCategories } from '../../API/CategoryData';
import { getSingleGame } from '../../API/GameData';
import GameCard from '../../components/GameCard';
import { getReviews } from '../../API/reviewData';
import Review from '../../components/Review';

export default function ViewGame() {
  const [game, setGame] = useState({});
  const [gameCategories, setGameCategories] = useState([]);
  const [reviews, setReviews] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getTheGame = () => {
    getSingleGame(id).then(setGame);
    getGameCategories().then(setGameCategories);
    getReviews(id).then(setReviews);
  };

  const thisGameCategories = () => gameCategories.filter((category) => category.game.id === game.id);

  useEffect(() => {
    getTheGame();
    console.warn(reviews);
  }, [id]);

  return (
    <>
      <GameCard game={game} categories={thisGameCategories()} />
      <Button onClick={() => router.push(`/games/review/${id}`)}>Add a Review</Button>
      {reviews.map((review) => (
        <Review review={review.review} />
      ))}
    </>

  );
}
