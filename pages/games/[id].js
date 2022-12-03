/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getSingleGame } from '../../API/GameData';
import GameCard from '../../components/GameCard';

export default function ViewGame() {
  const [game, setGame] = useState({});
  const router = useRouter();
  const { id } = router.query;

  const getTheGame = () => {
    getSingleGame(id).then(setGame);
  };

  useEffect(() => {
    getTheGame();
  }, [id]);

  return (
    <GameCard game={game} />
  );
}
