import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'

//pages and components
import Home from './pages/Home'
import Navbar from './components/Navbar'
//import UserPage from './pages/UserPage'
import SeriesPage from './pages/SeriesPage'
import ChapterPage from './pages/ChapterPage'
import Login from './pages/Login'
import Signup from './pages/Signup'

function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className='pages'>
          <Routes>
            <Route path="/" element= { <Home />} />
            <Route path="/login" element= {!user ? <Login /> : <Navigate to="/" />} />
            <Route path="/signup" element= {!user ? <Signup /> : <Navigate to="/" />} />
            <Route path="/series/:seriesId" element={ <SeriesPage />} />
            <Route path="/series/:seriesId/:index" element={ <ChapterPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
