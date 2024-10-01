import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3/';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization:
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMWRkOTQxZjNhNWE1ZTJmNzM0ZTgxZWU5MTIwOTAyNCIsIm5iZiI6MTcyNzc4MjQ3Ni43NTExNTYsInN1YiI6IjY2ZmJiYzhiNmVjNzgwNDc5NmQ2MzY4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.cQSqTMy42BGIBF5UBaaIpJ6Y8V24OxnFNs32jeBiyEE',
  },
};

export const getMovies = async () => {
  const response = await axios.get(
    `${BASE_URL}trending/movie/day?language=en-US`,
    options
  );
  return response.data;
};
export const getDetailMovie = async movie_id => {
    const response = await axios.get(
      `${BASE_URL}movie/${movie_id}?language=en-US`,
      options
    );
    return response.data;
  };
  
  export const getCast = async movie_id => {
    const response = await axios.get(
      `${BASE_URL}movie/${movie_id}/credits?language=en-US`,
      options
    );
    return response.data;
  };
  
  export const getReviews = async movie_id => {
    const response = await axios.get(
      `${BASE_URL}movie/${movie_id}/reviews?language=en-US`,
      options
    );
    return response.data;
  };

  export const getFilm = async filmName => {
    const response = await axios.get(
      `${BASE_URL}search/movie?query=${filmName}&include_adult=false&language=en-US&page=1`,
      options
    );
    return response.data;
  };
  