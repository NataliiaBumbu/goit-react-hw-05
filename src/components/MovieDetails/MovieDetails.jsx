import { Suspense, useEffect, useRef, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useParams } from 'react-router-dom';
import { getDetailMovie } from '../../api/api';
import s from './MovieDetails.module.css';

const MovieDetails = () => {
    const { id } = useParams();
    const location = useLocation(); 
    const backLinkRef = useRef(location.state?.from ?? '/'); 
    const [film, setFilms] = useState([]);
    const [genres, setGenres] = useState([]);
    const [date, setDate] = useState('');
    const [urlImg, setUrlImg] = useState('');
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('idle');

    useEffect(() => {
        const fetchFilms = async () => {
          try {
            const film = await getDetailMovie(id);
            const genres = film.genres; 
            const date = film.release_date.split('-')[0]; 
            const url = film.poster_path
              ? `https://image.tmdb.org/t/p/w500${film.poster_path}`
              : 'https://en.wikipedia.org/wiki/React_Native#/media/File:React-icon.svg';
    
              if (film === []) {
                setError(`Інформація по фільму відсутня`);
                setStatus('rejected');
              } else {
                setGenres(genres);
                setFilms(film);
                setDate(date);
                setUrlImg(url);
                setStatus('resolved');
              }
            } catch (error) {
              setError(error.message);
              setStatus('rejected');
            }
          };
      
          fetchFilms();
        }, [id]);
      
        const { title, overview, vote_average } = film;
      
  return (
    <section className={s.container}>
  <NavLink to={backLinkRef.current}>Back</NavLink>

  {status === 'rejected' && <p>{error}</p>}

  {status === 'resolved' && (
    <div className={s.wrapper}>
      <img src={urlImg} alt={title} />
      <div>
        <h1 className={s.title}>
          {title} <span>({date})</span>
        </h1>
        <p>User Score: {(vote_average * 10).toFixed(0)} %</p>
        <h2 className={s.overview}>Overview</h2>
        <p>{overview}</p>
        <h3 className={s.genres}>Genres</h3>
        <p>{genres.map(el => el.name).join(' / ')}</p>
      </div>
    </div>
  )}

  {status === 'resolved' && (
    <div className={s.wrapperAdditional}>
      
      <h4 className={s.additional}>Additional information</h4>
      <ul className={s.additional}>
        <li><Link to="cast">Cast</Link></li>
        <li><Link to="reviews">Reviews</Link></li>
      </ul>
    </div>
  )}
</section>

  )
}

export default MovieDetails