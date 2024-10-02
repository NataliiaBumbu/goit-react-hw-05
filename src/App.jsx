
import { Route, Routes } from 'react-router-dom'
import './App.css'


import Header from './components/Header/Header'
import MovieDetails from './components/MovieDetails/MovieDetails'
import HomePage from './pages/HomePage/HomePage'
import MoviesPage from './pages/MoviesPage/MoviesPage'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage'
import MovieCast from './components/MovieCast/MovieCast'


const App = () => {
  return (
    <>
  
				<Header />
        <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/about' element={<MoviesPage />} />
        <Route path='*' element={<NotFoundPage />} />
        <Route path="movies/:id" element={<MovieDetails />}></Route>
        <Route path="cast" element={<MovieCast />} />
        </Routes>
    </>
 )
}

export default App