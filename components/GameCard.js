import { Card } from 'react-bootstrap';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import PropTypes from 'prop-types';

export default function GameCard({ game }) {
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

GameCard.propTypes = {
  game: PropTypes.shape({
    title: PropTypes.string,
    designer: PropTypes.string,
    year_released: PropTypes.number,
    no_of_players: PropTypes.number,
    time_to_play: PropTypes.number,
    age_recommendation: PropTypes.number,
  }).isRequired,
};
