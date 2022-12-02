/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import { getSingleGame } from '../../API/GameData';

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
    <div className="singleGameContainer">
      <Card className="gameCard">
        <Card.Body className="gameCardBody">
          <Card.Header>
            {game.title}
          </Card.Header>
          <Card.Text>Designer: {game.designer}</Card.Text>
          <Card.Text>Year Released: {game.year_released}</Card.Text>
          <Card.Text><GroupIcon /> {game.no_of_players} Players</Card.Text>
          <Card.Text><AccessTimeIcon /> {game.time_to_play} minutes</Card.Text>
          <Card.Text>Ages {game.age_recommendation} +</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
