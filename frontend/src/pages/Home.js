import { useState, useEffect } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'

//components
import SeriesDetails from '../components/SeriesDetails'
import FeaturedSection from '../components/FeaturedSection'
import SeriesForm from '../components/SeriesForm'

const Home = () => {
    const { series, dispatch } = useSeriesContext()
    const [ order, setOrder ] = useState({
      ascending: true,
      icon: "arrow_downward"
    })
    const [ editMode, setEditMode ] = useState(false)
  
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

    const switchEditMode = () => {
      setEditMode(!editMode)
    }

    const stringCompare = (a, b) => {
      var nameA = a.title.toUpperCase()
      var nameB = b.title.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
          return 1
      }
      return 0
    }

    const viewsCompare = (a, b) => {
      var viewsDiff = b.views - a.views
      if (viewsDiff === 0) {
        return b.name.localeCompare(a.name);
      }
      return viewsDiff
    }

    const switchSeriesOrder = () => {
      setOrder({
        ascending: !order.ascending,
        icon: order.ascending ? "arrow_upward" : "arrow_downward"
      })
    }

    const seriesListRenderer = () => {
      const sortedOrder = [...series].sort(stringCompare)

      if (order.ascending) {
        return series && sortedOrder.map(singleSeries => (
          <SeriesDetails singleSeries={singleSeries} key={singleSeries._id} editMode={editMode}/>
        ))
      }
      else {
        return series && sortedOrder.toReversed().map(singleSeries => (
          <SeriesDetails singleSeries={singleSeries} key={singleSeries._id} editMode={editMode}/>
        ))
      }
    }

    if (!series) {
      return <div> </div>
    }

    return (
        <div className="home">
          <div>
            <div id="series-top"> 
             <strong> Comic List </strong>
             <span id="reorder" className="material-symbols-outlined" 
              onClick={switchSeriesOrder}> {order.icon} </span>
            </div>
            <div className="series">
              {seriesListRenderer()}
            </div>
          </div>
          <div className="side-column">
            <div className="edit-button" onClick={switchEditMode}> 
              <strong> {!editMode ? 'Edit' : 'Back'} </strong> 
              <span className="material-symbols-outlined"> {!editMode ? 'edit' : 'exit_to_app'} </span>
            </div>
            
            {!editMode ? '' : (<SeriesForm />)}
            <div className="side-column-box">
              <FeaturedSection series={[...series].sort(viewsCompare)} title="Most Viewed Comic" count={1}/>
              <FeaturedSection series={series} title="Most Recent Comics" count={3}/>
            </div>
              
          </div>
        </div>
    )
}

export default Home