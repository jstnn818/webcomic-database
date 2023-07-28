import { useSeriesContext } from '../hooks/useSeriesContext'
import { Link } from 'react-router-dom'

// date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const SeriesDetails = ({ series }) => {
    const { dispatch } = useSeriesContext()

    /*const linkName = ( name ) => {
        return name.toLowerCase().replace(/\s/g, "-")
    }*/

    const handleClick = async () => {
        const response = await fetch('api/series/' + series._id, {
            method: 'DELETE'
        })
        const json = await response.json()

        if (response.ok) {
            dispatch({type: 'DELETE_SERIES', payload: json})
        }
    }

    return (
        <div className="series-details">
            <Link to={'/series/' + series._id}>
                <h4> {series.title} </h4>
            </Link>
            <p><strong> Author: </strong>{series.author}</p>
            <p><strong> Cover: </strong>{series.cover}</p>
            <p>{formatDistanceToNow(new Date(series.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
        </div>
    )
}

export default SeriesDetails