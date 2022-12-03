import { Card } from 'react-bootstrap';
import PropTypes from 'prop-types';

export default function Review({ review }) {
  return (
    <>
      <Card.Body>
        <Card.Text>{review}</Card.Text>
      </Card.Body>
    </>
  );
}

Review.propTypes = {
  review: PropTypes.string.isRequired,
};
