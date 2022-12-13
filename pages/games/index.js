import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { getGames } from '../../API/GameData';

export default function Games() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, [router]);

  return (
    <>
      <div className="add game">
        <Button onClick={() => router.push('/games/new')}>Add Game</Button>
      </div>
      <div className="gamesListContainer">
        {
        games.map((game) => (
          <Link href={`/games/${game.id}`}>{game.title}</Link>
        ))
      }
      </div>
    </>

  );
}
