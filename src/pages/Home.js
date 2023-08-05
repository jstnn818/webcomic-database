import { useEffect } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'

//components
import SeriesDetails from '../components/SeriesDetails'
import SeriesForm from '../components/SeriesForm'

const Home = () => {
    const { series, dispatch } = useSeriesContext()
  
    useEffect(() => {
        const fetchSeries = async () => {
            const response = await fetch('/api/series')
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
            {series && series.map(seriesOne => (
              <SeriesDetails seriesOne={seriesOne} key={seriesOne._id} />
            ))}
          </div>
          <SeriesForm />
        </div>
    )
}

export default Home