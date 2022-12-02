import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { getGames } from '../../API/GameData';

export default function Games() {
  const [games, setGames] = useState([]);
  const router = useRouter();

  useEffect(() => {
    getGames().then((data) => setGames(data));
  }, [router]);

  return (
    <div className="gamesListContainer">
      {
        games.map((game) => (
          <Link href={`/games/${game.id}`}>{game.title}</Link>
        ))
      }
    </div>
  );
}
