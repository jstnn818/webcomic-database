import React, { useState, useEffect } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'
import { useAuthContext } from '../hooks/useAuthContext'
import { useNavigate  } from 'react-router-dom'
import { Series } from '../interfaces'

//components
import SeriesDetails from '../components/SeriesDetails'
import FeaturedSection from '../components/FeaturedSection'
import SeriesForm from '../components/SeriesForm'


const Home = () => {

    const navigate = useNavigate()

    const { series, dispatch } = useSeriesContext()
    const { user } = useAuthContext()
    const [ order, setOrder ] = useState({
      ascending: true,
      icon: "arrow_downward"
    })
    const [ editMode, setEditMode ] = useState(false)
  
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

    const switchEditMode = () => {
      if (user) {
        setEditMode(!editMode)
      }
      else {
        navigate(`/login`)
      }
    }

    const stringCompare = (a: Series, b: Series) => {
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

    const viewsCompare = (a: Series, b: Series) => {
      var viewsDiff = b.views - a.views
      if (viewsDiff === 0) {
        return b.title.localeCompare(a.title);
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
      if (series) {
        const sortedOrder = [...series].sort(stringCompare)

      if (order.ascending) {
        return series && sortedOrder.map(singleSeries => (
          <SeriesDetails singleSeries={singleSeries} key={singleSeries._id} editMode={editMode}/>
        ))
      }
      else {
        return series && [...sortedOrder].reverse().map(singleSeries => (
          <SeriesDetails singleSeries={singleSeries} key={singleSeries._id} editMode={editMode}/>
        ))
      }
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
              <FeaturedSection series={[...series].sort(viewsCompare)} title="Most Viewed" count={1}/>
              <FeaturedSection series={series} title="Most Recent" count={3}/>
            </div>
          </div>
        </div>
    )
}
export default Home