import { useRouter } from 'next/router';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { Rating } from 'react-simple-star-rating';
import { createReview } from '../API/reviewData';
import createRating from '../API/ratingData';

export default function ReviewForm({ gameId, user }) {
  const [currentReview, setCurrentReview] = useState({
    game: gameId,
    player: user.uid,
    review: '',
  });
  const router = useRouter();
  const [rating, setRating] = useState({
    game: gameId,
    player: user.uid,
    rating: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentReview((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleRating = (e) => {
    const name = 'rating';
    const value = e;
    setRating((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createReview(currentReview).then(createRating(rating)).then(router.push(`/games/${gameId}`));
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Review</Form.Label>
          <Form.Control as="textarea" rows={5} name="review" required value={currentReview.review} onChange={handleChange} />
        </Form.Group>
        <div className="starRating">
          Rating:
          <Rating
            allowHover={false}
            size={26}
            allowFraction
            iconsCount={10}
            ratingValue={rating.rating}
            onClick={handleRating}
            tooltipStyle={{
              height: 'auto', width: 'auto', fontSize: '13px', padding: '2px 4px', textAlign: 'center', marginTop: '4px', marginLeft: '10px',
            }}
          />
        </div>
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
