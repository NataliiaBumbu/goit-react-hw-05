import { useEffect, useState } from "react";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import s from './MoviesPage.module.css';
import { getFilm } from "../../api/api";
import { Formik, Form, Field } from "formik";

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
        const data = await getFilm(filmName);
        const films = data.results;

        if (!films.length && filmName !== '') {
          setError(`Movies with the word ${filmName} not found`);
          setFilms([]);
          setStatus('rejected');
        } else {
          setFilms(films);
          setError(null);
          setStatus('resolved');
        }
      } catch (error) {
        setError(error.message);
        setStatus('rejected');
      }
    };

    if (filmName) {
      fetchFilm();
    }
  }, [filmName]);

  const handleSubmit = (values, { setSubmitting }) => {
    const { filmName } = values;
    if (filmName === '') {
      setSearchFilm({});
    } else {
      setSearchFilm({ filmName });
    }
    setSubmitting(false);
  };

  return (
    <div className={s.container}>
      <Formik
        initialValues={{ filmName }}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className={s.wrapper}>
            <Field type="text" name="filmName" />
            <button type="submit" disabled={isSubmitting}>
              Search
            </button>
    
          </Form>
        )}
      </Formik>

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
    </div>
  );
};

export default MoviesPage;