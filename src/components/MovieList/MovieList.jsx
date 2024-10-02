import { Link, useLocation } from 'react-router-dom';
import styles from './MovieList.module.css';
import { useEffect, useState } from 'react';
import { getMovies } from '../../api/api';

const MovieList = () => {
    const [movies, setMovie] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();
  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getMovies();
        const movies = data.results;
        setMovie(movies);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Trending today</h2>

      {error && <p>Sorry, but something went wrong</p>}

      <ul className={styles.listFilm}>
        {movies.map(movie => (
          <li key={movie.id}>
            <Link to={`movies/${movie.id}`} state={{ from: location }}>
              {movie.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default MovieList