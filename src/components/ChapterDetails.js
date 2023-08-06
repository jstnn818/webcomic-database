import { useSeriesContext } from '../hooks/useSeriesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ChapterDetails = ({ chapter, seriesOne }) => {
    const { dispatch } = useSeriesContext()

    const handleClick = async () => {

        const updatedSeries = {
            chapters: seriesOne.chapters.filter((w) => w._id !== chapter._id)
        }
        const responseSeries = await fetch(`http://localhost:4000/api/series/${seriesOne._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSeries)
        })
        const jsonSeries = await responseSeries.json()
        if (responseSeries.ok) {
            dispatch({type: 'UPDATE_SERIES', payload: jsonSeries})
        }

        const response = await fetch(`http://localhost:4000/api/chapters/${chapter._id}`, {
            method: 'DELETE'
        })
        const json = await response.json()
        // THIS ISNT DELETING FOR SOME REASON
        if (response.ok) {
            console.log('chapter deleted', json)
        }
    }

    return (
        <div className="series-details">
            <h4> {chapter.title} </h4>
            <p>{formatDistanceToNow(new Date(chapter.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
        </div>
    )
}

export default ChapterDetails