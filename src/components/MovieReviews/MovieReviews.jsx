import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getReviews } from '../../api/api';
import s from './MovieReviews.module.css';

const MovieReviews = () => {
    const { id } = useParams();
    const [reviews, setReviews] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');

    useEffect(() => {
    const fetchReviews = async () => {
        try {
          const data = await getReviews(id);
          const reviews = data.results;
  
          if (!reviews.length) {
            setError(`No reviews yet`);
            setStatus('rejected');
          }
  
          setReviews(reviews);
        } catch (error) {
          setError(error.message);
          setStatus('rejected');
        }
      };
  
      fetchReviews();
    }, [id]);
  
  
  return (
    <ul className={s.reviewsStyle}>
    {status === 'rejected' && <p>{error}</p>}

    {reviews.map(review => (
      <li key={review.id}>
        <p>Author: {review.author}</p>
        <p>{review.content}</p>
      </li>
    ))}
  </ul >
  )
}

export default MovieReviews