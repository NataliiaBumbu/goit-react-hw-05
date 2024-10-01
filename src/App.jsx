
import { Route, Routes } from 'react-router-dom'
import './App.css'


import Header from './components/Header/Header'

import NotFound from './components/NotFound/NotFound'
import Home from './pages/home'
import Movies from './pages/movies'
import MovieDetails from './components/MovieDetails/MovieDetails'


const App = () => {
  return (
    <>
  
				<Header />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Movies />} />
        <Route path='*' element={<NotFound />} />
        <Route path="movies/:id" element={<MovieDetails />}></Route>
        </Routes>
    </>
 )
}

export default App