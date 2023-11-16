import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ChapterForm from '../components/ChapterForm'
import ChapterDetails from '../components/ChapterDetails'
import '../css/series-page.css'

const SeriesPage = () => {

  const { seriesId } = useParams()
  const [ singleSeries, setSingleSeries ] = useState(null)
  const [ cover, setCover ] = useState(null)
  const [ order, setOrder ] = useState({
    ascending: true,
    icon: "arrow_downward"
  })
  const [ editMode, setEditMode ] = useState(false)
    
  useEffect(() => {
      const fetchSingleSeries = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${seriesId}`)
        const json = await response.json()
        setSingleSeries(json)

        const coverRes = await fetch(`http://localhost:4000/api/images/${json.cover}`)
        const coverJson = await coverRes.json()
        setCover(coverJson)

      }
      fetchSingleSeries()
    }, [seriesId])
    
    if (!singleSeries) {
      return <div> </div>
    }

    const switchEditMode = () => {
      setEditMode(!editMode)
    }

    const imageConverter = () => {
      if (!cover) {
        return <div className='image-details' width="200" height="300"> </div>
      }
      const base64String = btoa(new Uint8Array(cover.image.data.data).reduce(function (data, byte) {
          return data + String.fromCharCode(byte)
      }, ''))
      return <img alt="cover" src={`data:image/png;base64,${base64String}`} width="200" height="300"/>
    }

    const switchChapterOrder = () => {
      setOrder({
        ascending: !order.ascending,
        icon: order.ascending ? "arrow_upward" : "arrow_downward"
      })
    }

    const chapterListRenderer = () => {
      if (order.ascending) {
        return singleSeries.chapters && singleSeries.chapters.map((chapterId, index) => (
          <ChapterDetails 
          singleSeries={singleSeries} 
          key={chapterId} 
          chapterId={chapterId}
          index={index}
          editMode={editMode}
          />
        ))
      }
      else {
        return singleSeries.chapters && singleSeries.chapters.toReversed().map((chapterId, index) => (
          <ChapterDetails 
          singleSeries={singleSeries} 
          key={chapterId} 
          chapterId={chapterId}
          index={singleSeries.chapters.length - index - 1}
          editMode={editMode}
          />
        ))
      }
    }


    return (
      <div className="home">
        <div className="series-container">
          <div className='series-title'>
            <h4> {singleSeries.title} </h4>
          </div>
          <div className='series-info'>
            <div className='image-details'>
              {imageConverter()}
            </div>
            <div className='series-about'>
              <p><strong> Author: </strong> {singleSeries.author} </p>
              <p><strong> Description: </strong> ... </p>
            </div>
          </div>
          <div className="chapters">
            <div className='chapter-header'><h4> 
                Chapters 
                <span id="reorder" className="material-symbols-outlined" 
                onClick={switchChapterOrder}> {order.icon} </span>
            </h4></div>
            <div className='chapter-rows'>
              {chapterListRenderer()}
            </div>
          </div>
        </div>
        <div className="side-column">
          <div className="edit-button" onClick={switchEditMode}> 
            <strong> {!editMode ? 'Edit' : 'Done'} </strong> 
            <span className="material-symbols-outlined"> {!editMode ? 'edit' : 'done'} </span>
          </div>
          {!editMode ? '' : (<ChapterForm singleSeries={singleSeries} />)}
        </div>
        
      </div>
    )  
}

export default SeriesPage