/* eslint-disable react-hooks/exhaustive-deps */
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import Select from 'react-select';
import { getCategories } from '../API/CategoryData';
import { createGame, updateGame } from '../API/GameData';

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
  const [selected, setSelected] = useState([]);

  const categoryOptions = categories.map((category) => ({
    value: category.id,
    label: category.label,
  }));

  const getGameCategory = categories.filter((category) => category.game === gameObject?.id);

  useEffect(() => {
    getCategories().then(setCategories);
    if (gameObject?.id) setCurrentGame(gameObject);
    if (getGameCategory.length) setSelected(getGameCategory);
  }, [gameObject]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentGame((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const categoryHandleChange = (selectedOptions) => {
    setSelected(selectedOptions.map((option) => option.value));
  };

  const handleSubmit = (e) => {
    // Prevent form from being submitted
    e.preventDefault();
    if (gameObject?.id) {
      updateGame(currentGame, gameObject.id)
        .then(() => router.push('/games'));
    } else {
      const game = {
        title: currentGame.title,
        no_of_players: Number(currentGame.no_of_players),
        description: currentGame.description,
        year_released: Number(currentGame.year_released),
        designer: currentGame.designer,
        time_to_play: Number(currentGame.time_to_play),
        age_recommendation: Number(currentGame.age_recommendation),
        category_ids: selected,
      };

      createGame(game).then(() => router.push('/games'));
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
          <Select
            isMulti
            name="categories"
            options={categoryOptions}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={categoryHandleChange}
            required
          />
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
