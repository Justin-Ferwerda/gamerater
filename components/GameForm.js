/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createGameCategory, getCategories, updateGameCategory } from '../API/CategoryData';
import { createGame, getSingleGame, updateGame } from '../API/GameData';

export default function GameForm({ gameObject }) {
  const [categories, setCategories] = useState([]);
  const [currentGame, setCurrentGame] = useState({
    title: '',
    description: '',
    designer: '',
    year_released: null,
    no_of_players: null,
    time_to_play: null,
    age_recommendation: null,
  });
  const router = useRouter();
  const [currentCategory, setCurrentCategory] = useState({
    category: null,
    game: null,
  });

  const getGameCategory = () => categories.filter((category) => category.game === gameObject?.id);

  useEffect(() => {
    getCategories().then(setCategories);
    if (gameObject?.id) setCurrentGame(gameObject);
    if (getGameCategory().length) setCurrentCategory(getGameCategory);
  }, [gameObject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const categoryHandleChange = (e) => {
    const { name, value } = e.target;
    setCurrentCategory((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (gameObject?.id) {
      updateGame(currentGame, gameObject.id)
        .then(updateGameCategory(currentCategory, currentCategory.id))
        .then(() => router.push('/games'));
    } else {
      const game = {
        title: currentGame.title,
        no_of_players: Number(currentGame.no_of_players),
        description: currentGame.description,
        year_released: Number(currentGame.year_released),
        designer: currentGame.designer,
        time_to_play: currentGame.time_to_play,
        age_recommendation: currentGame.age_recommendation,
      };

      createGame(game).then((response) => getSingleGame(response.id)).then((response) => {
        const gameCategory = {
          game: response.id,
          category: currentCategory.category,
        };
        createGameCategory(gameCategory).then(() => router.push('/games'));
      });
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control name="title" value={currentGame.title} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control name="description" value={currentGame.description} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Designer</Form.Label>
          <Form.Control name="designer" value={currentGame.designer} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Enter Number of Players</Form.Label>
          <Form.Control name="no_of_players" value={currentGame.no_of_players} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Length To Play - in minutes</Form.Label>
          <Form.Control name="time_to_play" value={currentGame.time_to_play} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Year Released</Form.Label>
          <Form.Control name="year_released" value={currentGame.year_released} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Age Recommendation - just put number</Form.Label>
          <Form.Control name="age_recommendation" value={currentGame.age_recommendation} onChange={handleChange} required />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select onChange={categoryHandleChange} className="mb-3" name="category" value={currentCategory.id} required>
            <option value="">Select a Category</option>
            {categories.map((category) => (
              <option defaultValue={category.id === currentCategory.id} key={category.label} value={category.id}>
                {category.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
    </>
  );
}

GameForm.propTypes = {
  gameObject: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }).isRequired,
};
