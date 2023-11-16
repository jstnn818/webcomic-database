import { useSeriesContext } from '../hooks/useSeriesContext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/series-details.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const SeriesDetails = ({ singleSeries, editMode }) => {

    const { dispatch } = useSeriesContext()
    const [ cover, setCover ] = useState(null)

    useEffect(() => {
        const fetchCover = async () => {
            const response = await fetch(`http://localhost:4000/api/images/${singleSeries.cover}`)
            const json = await response.json()
            setCover(json)
          }
          fetchCover()
    }, [singleSeries])

    const handleClick = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${singleSeries._id}`, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_SERIES', payload: json.series})
        }
    }

    const imageConverter = () => {
        if (!cover) {
            return <div className="series-image-details"> </div>
        }
        const base64String = btoa(new Uint8Array(cover.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte)
        }, ''))
        return <img alt="cover" src={`data:image/png;base64,${base64String}`} width="150" height="235"/>
    }

    const seriesTitleRender = () => {
        if (singleSeries.title.length > 18){
            return singleSeries.title.slice(0, 16) + "..."
        }
        return singleSeries.title
    }

    return (
        <div className="series-details">
            <Link to={'/series/' + singleSeries._id} style={{ textDecoration: 'none' }}>
                <h4> {seriesTitleRender()} </h4>
            </Link>
            <div className="series-description">
                <div className="series-image-details">
                    {imageConverter()}
                </div>
                <div className="description"> 
                    <p><strong> {singleSeries.author} </strong></p>
                </div>
            </div>
            <p className='create-date'>{formatDistanceToNow(new Date(singleSeries.createdAt), { addSuffix: true })}</p>
            {!editMode ? '' : (
                <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
            )}
        </div>
    )
}

export default SeriesDetails