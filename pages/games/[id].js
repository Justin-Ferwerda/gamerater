/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getGameCategories } from '../../API/CategoryData';
import { getSingleGame } from '../../API/GameData';
import GameCard from '../../components/GameCard';

export default function ViewGame() {
  const [game, setGame] = useState({});
  const [gameCategories, setGameCategories] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  const getTheGame = () => {
    getSingleGame(id).then(setGame);
    getGameCategories().then(setGameCategories);
  };

  const thisGameCategories = () => gameCategories.filter((category) => category.game.id === game.id);

  useEffect(() => {
    getTheGame();
  }, [id]);

  return (
    <GameCard game={game} categories={thisGameCategories()} />
  );
}
