import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const SeriesPage = () => {

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
    
      console.log(series)
      if (!series) {
        return <div>Loading...</div>
      }

    return (
        <div className="series-details">
            <h4>  {series.title}  </h4>
            <p><strong> Author: </strong> {series.author} </p>
        </div>
    )
}

export default SeriesPage