import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import PageDetails from '../components/PageDetails'

const ChapterPage = () => {
    const { chapterId } = useParams()
    const [ pages, setPages ] = useState([])
    const [ chapter, setChapter ] = useState(null)
    const [ pageNumber, setPageNumber ] = useState(0)
    const [ onePageView, setOnePageView ] = useState(true)  

    useEffect(() => {
      /*const fetchSeriesOne = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${seriesId}`)
        const json = await response.json()

        setChapter(json.chapters.find((w) => w._id === chapterId))
      }*/

      const fetchChapter = async () => {
        const response = await fetch(`http://localhost:4000/api/chapters/${chapterId}`)
        const json = await response.json()
        setChapter(json)
        setPages(json.pages)
      }
      fetchChapter()
    }, [chapterId])

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

    const switchPageView = () => {
        setPageNumber(0)
        setOnePageView(!onePageView)
    }

    const pageRenderer = () => {
      if (onePageView) {
        const singlePicture = pages[pageNumber]
        return <PageDetails pageId={singlePicture}></PageDetails>
      }
      else {
        return pages.map((singlePicture) => {
          return <PageDetails pageId={singlePicture}></PageDetails>
        })
      }
    }

    if (!chapter || pages.length === 0) {
      return <div> </div>
    }

    return (
      <div>
        <div className="series-details">
          {chapter.title}
        </div>
        <button onClick={switchPageView}> SWITCH VIEW </button>
        <div className="images">
          {pageRenderer()}
        </div>
        {onePageView && (
          <div>
            <button onClick={prevPage}>PREV</button>
            <button onClick={nextPage}>NEXT</button>
          </div>
        )}
      </div>
    )  
}

export default ChapterPage