import { useSeriesContext } from '../hooks/useSeriesContext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../css/series-details.css'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const SeriesDetails = ({ seriesOne }) => {

    const { dispatch } = useSeriesContext()
    const [ cover, setCover ] = useState(null)

    useEffect(() => {
        const fetchCover = async () => {
            const response = await fetch(`http://localhost:4000/api/images/${seriesOne.cover}`)
            const json = await response.json()
            setCover(json)
          }
          fetchCover()
    }, [seriesOne])

    const handleClick = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${seriesOne._id}`, {
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

    return (
        <div className="series-details">
            <Link to={'/series/' + seriesOne._id} style={{ textDecoration: 'none' }}>
                <h4> {seriesOne.title} </h4>
            </Link>
            <div className="series-description">
                <div className="series-image-details">
                    {imageConverter()}
                </div>
                <div className="description"> 
                    <p><strong> {seriesOne.author} </strong></p>
                </div>
            </div>
            <p className='create-date'>{formatDistanceToNow(new Date(seriesOne.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
        </div>
    )
}

export default SeriesDetails