import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import s from './MovieCast.module.css';
import { getCast } from '../../api/api';

import picture from '../../icon/icon.png';
const MovieCast = () => {
  const { id } = useParams();
  const [casts, setCasts] = useState([]);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('');

  useEffect(() => {
    const fetchCast = async () => {
        
      try {
        const data = await getCast(id);
        const casts = data.cast;

        if (!casts.length) {
          setError(`There is no cast list`);
          setStatus('rejected');
        }
        
        setCasts(casts);
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    };

    fetchCast();
   
  }, [id]);
  
  return (
    <ul className={s.castlist}>
      {status === 'rejected' && <p>{error}</p>}

      {casts.map(cast => {
        if (cast.profile_path) {
          return (
            <li key={cast.id}>
              <img
                src={`https://image.tmdb.org/t/p/w500${cast.profile_path}`}
                alt={cast.name}
              />
              <p>Name: {cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          );
        } else {
          return (
            <li key={cast.id}>
              <img src={picture}/>
              <p>Name: {cast.name}</p>
              <p>Character: {cast.character}</p>
            </li>
          );
        }
      })}
    </ul>
  );
};

export default MovieCast;