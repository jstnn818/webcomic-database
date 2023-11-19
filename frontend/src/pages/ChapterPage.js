import React, { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate, Link  } from 'react-router-dom'
import PageDetails from '../components/PageDetails'
import '../css/chapter-page.css'

const ChapterPage = () => {
    const location = useLocation()
    const navigate = useNavigate()

    const { seriesId } = useParams()
    const { seriesTitle, chapters, chapterIndex } = location.state
    const [ chapter, setChapter ] = useState(null)

    const [ pageNumber, setPageNumber ] = useState(0)
    const [ onePageView, setOnePageView ] = useState(true)
    const [ loading, setLoading ] = useState(true)

    useEffect(() => {
      const fetchChapter = async () => {
        setLoading(true)
        try {
          const response = await fetch(`http://localhost:4000/api/chapters/${chapters[chapterIndex]}`)
          const json = await response.json()
          setChapter(json)
        }
        finally {
          setPageNumber(0)
          setLoading(false)
        }
      }
      fetchChapter()
    }, [chapters, chapterIndex])

    const prevPage = () => {
      if (onePageView && pageNumber > 0) {
        setPageNumber(pageNumber - 1)
      }
      else if (chapterIndex > 0) {
        goToChapter(chapterIndex - 1)
      }
      else {
        navigate(`/series/${seriesId}`)
      }
    }

    const nextPage = () => {
      if (onePageView && pageNumber < chapter.pages.length - 1) {
        setPageNumber(pageNumber + 1)
      }
      else if (chapterIndex < chapters.length - 1) {
        goToChapter(chapterIndex + 1)
      }
      else {
        navigate(`/series/${seriesId}`)
      }
    }

    const goToChapter = (chapterIndex) => {
      const chapterData = {
          seriesTitle: seriesTitle,
          chapters: chapters,
          chapterIndex: chapterIndex 
      }
      navigate(`/series/${seriesId}/${chapterIndex + 1}`, { state: chapterData })
    }
    
    const firstPage = () => {
      setPageNumber(0)
    }

    const lastPage = () => {
      setPageNumber(chapter.pages.length - 1)
    }

    const switchPageView = () => {
        setPageNumber(0)
        setOnePageView(!onePageView)
    }

    const pageRenderer = () => {
      if (onePageView) {
        const singlePicture = chapter.pages[pageNumber]
        return (
          <div className='page-container'>
            <PageDetails pageId={singlePicture}></PageDetails>
            <button className="page-left" onClick={prevPage}></button>
            <button className="page-right" onClick={nextPage}></button>
          </div>
        )
      }
      else {
        return chapter.pages.map((singlePicture) => {
          return (
            <div className='page-container'>
              <PageDetails pageId={singlePicture}></PageDetails>
              <button className="page-left" onClick={prevPage}></button>
              <button className="page-right" onClick={nextPage}></button>
            </div>  
          )
        })
      }
    }
    if (!chapter || chapter.pages.length === 0) {
      return <div> </div>
    }
    return (
      <div>
        <Link id='chapter-title' to={'/series/' + seriesId}> {seriesTitle} </Link>
        <div id='chapter-info'>
          {loading ? '' : (
              <div>
                <div className="chapter-info-button"> Ch. {chapterIndex + 1} : {chapter.title} </div>
                {!onePageView ? '' : (
                  <div className="chapter-info-button"> Pg. {pageNumber + 1} / {chapter.pages.length} </div>
                )}
              </div>
          )}
        </div>
        <div id="chapter-button-container">
          <div className='chapter-buttons'>
            {onePageView && 
              (<>
                <span className="material-symbols-outlined" onClick={firstPage}> first_page </span>
                <span className="material-symbols-outlined" onClick={prevPage}> keyboard_arrow_left </span>
              </>
              )}
            <span className="material-symbols-outlined" onClick={switchPageView}> cameraswitch </span>
            {onePageView && 
              (<>
                <span className="material-symbols-outlined" onClick={nextPage}> keyboard_arrow_right </span>
                <span className="material-symbols-outlined" onClick={lastPage}> last_page </span>
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