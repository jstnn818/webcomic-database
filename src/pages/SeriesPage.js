import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useChaptersContext } from '../hooks/useChaptersContext'
import ChapterForm from '../components/ChapterForm'

const SeriesPage = () => {

  const { chapters, dispatch } = useChaptersContext()
  const { seriesId } = useParams()
  const [ series, setSeries ]  = useState(null)
    

  useEffect(() => {
      const fetchSeries = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${seriesId}`)
        const json = await response.json()
    
        if (response.ok) {
          setSeries(json)
        }
      }
      fetchSeries()
    }, [seriesId])

    useEffect(() => {
      const fetchChapters = async () => {
        const response = await fetch('/api/chapters')
        const json = await response.json()
    
        if (response.ok) {
          dispatch({type: 'SET_CHAPTER', payload: json})
        }
      }
      fetchChapters()
    }, [dispatch])
    
    if (!series) {
      return <div>Loading...</div>
    }

      

    return (
      <div>
        <div className="series-details">
          <h4> {series.title} </h4>
          <p><strong> Author: </strong> {series.author} </p>
        </div>
        <div className="chapters">
          {chapters && chapters.map(chapter => (
            <div className="chapter-row">
              <p> 
                <strong>{chapter.number}</strong> {chapter.title} 
              </p>
            </div>
          ))}
        </div>
        <ChapterForm />
      </div>
    )  
}

export default SeriesPage