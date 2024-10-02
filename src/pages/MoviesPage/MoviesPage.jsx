import { useEffect, useState } from "react";

import { Link, useLocation, useSearchParams } from "react-router-dom";
import s from './MoviesPage.module.css';
import { getFilm } from "../../api/api";

const MoviesPage = () => {
    const [searchFilm, setSearchFilm] = useSearchParams();
    const [films, setFilms] = useState([]);
    const [error, setError] = useState(null);
    const [status, setStatus] = useState('');
    const location = useLocation(); 
    const filmName = searchFilm.get('filmName') ?? '';
  
    useEffect(() => {
      const fetchFilm = async () => {
        try {
          const date = await getFilm(filmName);
          const films = date.results;
  
          if (!films.length && filmName !== '') {
            setError(`Фільми зі словом ${filmName} не знайдені`);
            setFilms([]);
            setStatus('rejected');
          } else {
            setFilms(films);
            setError(null);
          }
        } catch (error) {
          setError(error.message);
        }
      };
  
      fetchFilm();
    });
  
    const updateSearch = event => {
      const filmNameValue = event.target.value;
      if (filmNameValue === '') {
        return setSearchFilm({});
      }
      setSearchFilm({ filmName: filmNameValue });
    };
  
    return (
      <section className={s.container}>
        <form className={s.wrapper}>
          <input type="text" value={filmName} onChange={updateSearch} />
          <label> Пошук фільму за ключовим словом</label>
        </form>
  
        {status === 'rejected' && <p className="s.errorText">{error}</p>}
  
        <ul className={s.listOfFilm}>
          {films.map(film => (
            <li key={film.id}>
              <Link to={`${film.id}`} state={{ from: location }}>
                {film.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>
    );
  };
  
  export default MoviesPage;