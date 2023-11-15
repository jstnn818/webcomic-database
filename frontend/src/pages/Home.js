import { useEffect } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'

//components
import SeriesDetails from '../components/SeriesDetails'
import SeriesForm from '../components/SeriesForm'

const Home = () => {
    const { series, dispatch } = useSeriesContext()
  
    useEffect(() => {
        const fetchSeries = async () => {
            const response = await fetch('http://localhost:4000/api/series')
            const json = await response.json()
    
            if (response.ok) {
                dispatch({type: 'SET_SERIES', payload: json})
            }
        }
        fetchSeries()
    }, [dispatch])

    return (
        <div className="home">
          <div className="series">
            {series && series.map(singleSeries => (
              <SeriesDetails singleSeries={singleSeries} key={singleSeries._id} />
            ))}
          </div>
          <SeriesForm />
        </div>
    )
}

export default Home