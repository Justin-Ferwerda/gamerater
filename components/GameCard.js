import { Card } from 'react-bootstrap';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GroupIcon from '@mui/icons-material/Group';
import PropTypes from 'prop-types';

export default function GameCard({ game, categories }) {
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
          <Card.Footer className="categories">Categories: {categories.map((category) => (
            <div>{category.category.label}</div>
          ))}
            {game.average_rating ? (
              <div className="rating">Average Rating: {game.average_rating} of 10 stars</div>
            ) : (
              <div />
            )}
          </Card.Footer>
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
    average_rating: PropTypes.number,
  }).isRequired,
  categories: PropTypes.arrayOf(PropTypes.shape({
    category: PropTypes.shape({
      id: PropTypes.number,
      label: PropTypes.string,
    }).isRequired,
    game: PropTypes.shape({
      id: PropTypes.number,
      title: PropTypes.string,
      description: PropTypes.string,
      age_recommendation: PropTypes.number,
      designer: PropTypes.string,
      year_released: PropTypes.number,
      no_of_players: PropTypes.number,
      time_to_play: PropTypes.number,
    }).isRequired,
  })).isRequired,
};
