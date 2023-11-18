import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import SeriesPage from './pages/SeriesPage'
import ChapterPage from './pages/ChapterPage'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element= { <Home />} />
            <Route path="/login" element= { <Login />} />
            <Route path="/signup" element= { <Signup />} />
            <Route path="/series/:seriesId" element={ <SeriesPage />} />
            <Route path="/series/:seriesId/:index" element={ <ChapterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
