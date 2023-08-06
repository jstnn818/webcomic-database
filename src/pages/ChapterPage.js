import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

const ChapterPage = () => {

    const { seriesId, chapterId } = useParams()
    const [ chapter, setChapter ] = useState(null)
    const pages = [1,2,3,4]
    const [pageNumber, setPageNumber] = useState(0)
    
    useEffect(() => {
      const fetchSeriesOne = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${seriesId}`)
        const json = await response.json()

        setChapter(json.chapters.find((w) => w._id === chapterId))
      }
      fetchSeriesOne()
    }, [seriesId, chapterId])
    if (!chapter) {
        return <div>Loading...</div>
    }

    const prevPage = () => {
        if (pageNumber > 0) {
            setPageNumber(pageNumber - 1)
        }
    }

    const nextPage = () => {
        if (pageNumber < pages.length - 1) {
            setPageNumber(pageNumber + 1)
        }
    }

    return (
      <div>
        <div className="series-details">
            {chapter.title}
        </div>
        <div className="chapters">
            {pages[pageNumber]}
        </div>
        <button onClick={prevPage}> PREV </button>
        <button onClick={nextPage}> NEXT </button>
      </div>
    )  
}

export default ChapterPage