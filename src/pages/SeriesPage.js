import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useSeriesContext } from '../hooks/useSeriesContext'
import ChapterForm from '../components/ChapterForm'

const SeriesPage = () => {

  const { seriesId } = useParams()
  const { series, dispatch} = useSeriesContext()
  const [ seriesOne, setSeriesOne ] = useState(null)
    
  useEffect(() => {
      const fetchSeriesOne = async () => {
        const response = await fetch('/api/series')
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
          {seriesOne.chapters && seriesOne.chapters.map(chapter => (
            <div className="chapter-row">
              <p> 
                <strong>{chapter.number}</strong> {chapter.title} 
              </p>
            </div>
          ))}
        </div>
        <ChapterForm seriesOne={seriesOne} />
      </div>
    )  
}

export default SeriesPage