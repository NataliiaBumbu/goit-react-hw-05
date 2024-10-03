import { useEffect, useState } from 'react';
import MovieList from '../../components/MovieList/MovieList';
import { getMovies } from '../../api/api';
import s from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFilms = async () => {
      try {
        const data = await getMovies();
        const movies = data.results;
        setMovies(movies);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchFilms();
  }, []);

  return (
    <div className={s.container}>
      <h2 className={s.title}>Trending today</h2>
      {error && <p>Sorry, but something went wrong</p>}
      <MovieList movies={movies} />
    </div>
  );
}

export default HomePage;
