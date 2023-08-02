import { BrowserRouter, Routes, Route } from 'react-router-dom'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
import SeriesPage from './pages/SeriesPage'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element= { <Home />} />
            <Route path="/series/:seriesId" element={ <SeriesPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
