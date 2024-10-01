
import { Route, Routes } from 'react-router-dom'
import './App.css'


import Header from './components/Header/Header'

import NotFound from './components/NotFound/NotFound'
import Home from './pages/home'
import Movies from './pages/movies'


const App = () => {
  return (
    <>
  
				<Header />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<Movies />} />
        <Route path='*' element={<NotFound />} />
        </Routes>
    </>
 )
}

export default App