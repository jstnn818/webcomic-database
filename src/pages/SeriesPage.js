import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSeriesContext } from '../hooks/useSeriesContext'
import ChapterForm from '../components/ChapterForm'
import ChapterDetails from '../components/ChapterDetails'

const SeriesPage = () => {

  const { seriesId } = useParams()
  const { series, dispatch} = useSeriesContext()
  const [ seriesOne, setSeriesOne ] = useState(null)
    
  useEffect(() => {
      const fetchSeriesOne = async () => {
        const response = await fetch('http://localhost:4000/api/series')
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'SET_SERIES', payload: json})
        }
        setSeriesOne(json.find((w) => w._id === seriesId))
      }
      fetchSeriesOne()
    }, [seriesId, series, dispatch])
    
    if (!seriesOne) {
      return <div>Loading...</div>
    }

    return (
      <div>
        <div className="series-details">
          <h4> {seriesOne.title} </h4>
          <p><strong> Author: </strong> {seriesOne.author} </p>
        </div>
        <div className="chapters">
          {seriesOne.chapters && seriesOne.chapters.map(chapterId => (
            <ChapterDetails seriesOne={seriesOne} key={chapterId} chapterId={chapterId}/>
          ))}
        </div>
        <ChapterForm seriesOne={seriesOne} />
      </div>
    )  
}

export default SeriesPage