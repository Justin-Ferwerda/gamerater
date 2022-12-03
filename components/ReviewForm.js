import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { createReview } from '../API/reviewData';

export default function ReviewForm({ gameId, user }) {
  const [currentReview, setCurrentReview] = useState({
    game: gameId,
    player: user.uid,
    review: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview(currentReview).then(router.push(`/games/${gameId}`));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control as="textarea" rows={5} name="review" required value={currentReview.review} onChange={handleChange} />
        </Form.Group>

        <Button variant="primary" type="submit">Add Review</Button>
      </Form>
    </>
  );
}

ReviewForm.propTypes = {
  gameId: PropTypes.number.isRequired,
  user: PropTypes.shape({
    uid: PropTypes.string,
  }).isRequired,
};
