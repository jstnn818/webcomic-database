import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'
import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import '../css/chapter-details.css'

const ChapterDetails = ({ chapterId, seriesOne }) => {

    const { dispatch } = useSeriesContext()
    const [ chapter, setChapter ] = useState(null)

    useEffect(() => {
        const fetchChapter = async () => {
            const response = await fetch(`http://localhost:4000/api/chapters/${chapterId}`)
            const json = await response.json()
            setChapter(json)
        }
        fetchChapter()
    }, [chapterId])

    const handleClick = async () => {

        const updatedSeries = {
            chapters: seriesOne.chapters.filter((w) => w !== chapterId)
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

        const response = await fetch(`http://localhost:4000/api/chapters/${chapterId}`, {
            method: 'DELETE'
        })
        const json = await response.json()
        if (response.ok) {
            console.log('chapter deleted', json)
        }
    }

    if (!chapter) {
        return <div></div>
    }

    return (
        <div className="chapter-details">
            <Link to={`/series/${seriesOne._id}/${chapterId}`}>
                <h4> 
                    Chapter {chapter.number}: {chapter.title} 
                </h4>
            </Link>
            <p>{formatDistanceToNow(new Date(chapter.createdAt), { addSuffix: true })}</p>
            <span className="material-symbols-outlined" onClick={handleClick}> delete </span>
        </div>
    )
}

export default ChapterDetails