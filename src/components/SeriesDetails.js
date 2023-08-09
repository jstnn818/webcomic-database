import { useSeriesContext } from '../hooks/useSeriesContext'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

    if (!cover) {
        return <div> </div>
    }

    const imageConverter = () => {
        const base64String = btoa(new Uint8Array(cover.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte)
        }, ''))
        return <img alt="test" src={`data:image/png;base64,${base64String}`} width="300"/>
    }

    return (
        <div className="series-details">
            <Link to={'/series/' + seriesOne._id}>
                <h4> {seriesOne.title} </h4>
            </Link>
            <p><strong> Author: </strong>{seriesOne.author}</p>
            <div className="page-details">
                {imageConverter()}
            </div>
            <p>{formatDistanceToNow(new Date(seriesOne.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
        </div>
    )
}

export default SeriesDetails