import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate  } from 'react-router-dom'
import PageDetails from '../components/PageDetails'
import '../css/chapter-page.css'

const ChapterPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { seriesId } = useParams()
    const { chapters, index } = location.state
    const [ pages, setPages ] = useState([])
    const [ chapter, setChapter ] = useState(null)
    const [ pageNumber, setPageNumber ] = useState(0)
    const [ onePageView, setOnePageView ] = useState(true)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
      const fetchChapter = async () => {
        setLoading(true)
        try {
          const response = await fetch(`http://localhost:4000/api/chapters/${chapters[index]}`)
          const json = await response.json()
          setChapter(json)
          setPages(json.pages)
        }
        finally {
          setPageNumber(0)
          setLoading(false)
        }
      }
      fetchChapter()
    }, [chapters, index])

    const prevPage = () => {
      if (pageNumber > 0) {
        setPageNumber(pageNumber - 1)
      }
      else if (index > 0) {
        goToChapter(index - 1)
      }
    }

    const nextPage = () => {
      if (pageNumber < pages.length - 1) {
        setPageNumber(pageNumber + 1)
      }
      else if (index < chapters.length - 1) {
        goToChapter(index + 1)
      }
    }

    const goToChapter = (index) => {
      const chapterData = {
          chapters: chapters,
          index: index 
      }
      navigate(`/series/${seriesId}/${index + 1}`, { state: chapterData })
    }
    
    const firstPage = () => {
      setPageNumber(0)
    }

    const lastPage = () => {
      setPageNumber(pages.length - 1)
    }

    const switchPageView = () => {
        setPageNumber(0)
        setOnePageView(!onePageView)
    }

    const pageRenderer = () => {
      if (onePageView) {
        const singlePicture = pages[pageNumber]
        return (
          <div className='page-container'>
            <PageDetails pageId={singlePicture}></PageDetails>
            <button className="page-left" onClick={prevPage}></button>
            <button className="page-right" onClick={nextPage}></button>
          </div>
        )
      }
      else {
        return pages.map((singlePicture) => {
          return (
            <div className='page-container'>
              <PageDetails pageId={singlePicture}></PageDetails>
            </div>  
          )
        })
      }
    }

    if (!chapter || pages.length === 0) {
      return <div> </div>
    }
    return (
      <div>
        <div className="chapter-info">
          <div className='chapter-title'>
            {loading  ? '' : `Chapter ${index + 1}: ${chapter.title}`}
          </div>
          <div className='chapter-buttons'>
            {onePageView && 
              (<>
                <span className="material-symbols-outlined" onClick={firstPage}> keyboard_double_arrow_left </span>
                <span className="material-symbols-outlined" onClick={prevPage}> keyboard_arrow_left </span>
              </>
              )}
            <span className="material-symbols-outlined" onClick={switchPageView}> cameraswitch </span>
            {onePageView && 
              (<>
                <span className="material-symbols-outlined" onClick={nextPage}> keyboard_arrow_right </span>
                <span className="material-symbols-outlined" onClick={lastPage}> keyboard_double_arrow_right </span>
              </>
              )}
          </div>
        </div>
        <div className="images">
          {pageRenderer()}
        </div>
      </div>
    )  
}

export default ChapterPage