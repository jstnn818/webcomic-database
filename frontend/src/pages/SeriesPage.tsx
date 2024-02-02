import React, { useState, useEffect, FormEvent } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'
import { Series, Image } from '../interfaces'

import ChapterForm from '../components/ChapterForm'
import ChapterDetails from '../components/ChapterDetails'
//import CommentSection from '../components/CommentSection'
import '../css/series-page.css'

const SeriesPage = () => {

  const navigate = useNavigate()

  const { user } = useAuthContext()
  const { seriesId } = useParams()
  const [ singleSeries, setSingleSeries ] = useState<Series | null>(null)
  const [ cover, setCover ] = useState<Image | null>(null)
  const [ order, setOrder ] = useState({
    ascending: true,
    icon: "arrow_downward"
  })
  const [ editMode, setEditMode ] = useState(false)
    
  useEffect(() => {
      const fetchSingleSeries = async () => {
        const response = await fetch(`/api/series/${seriesId}`)
        const json = await response.json()
        setSingleSeries(json)

        const coverRes = await fetch(`/api/images/${json.cover}`)
        const coverJson = await coverRes.json()
        setCover(coverJson)

      }
      fetchSingleSeries()
    }, [seriesId])
    
    if (!singleSeries) {
      return <div> </div>
    }

    const switchEditMode = () => {
      if (user) {
        setEditMode(!editMode)
      }
      else {
        navigate(`/login`)
      }
    }

    const imageConverter = () => {
      if (!cover) {
        return <div className="image-details" style={{ width: '200px', height: '300px' }}> </div>
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

    const submitDescription = async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      if (!user) {
        return
      }

      const form = e.currentTarget
      const formData = new FormData(form)
      const updatedSeries = {
          description: formData.get("paragraph-text")
      }
      const response = await fetch(`/api/series/${singleSeries._id}`, {
          method: 'PATCH',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedSeries)
      })
      if (response.ok) {
          console.log('description updated')
          window.location.reload()
      }
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
        return singleSeries.chapters && [...singleSeries.chapters].reverse().map((chapterId, index) => (
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
              <div style={{ color: '#9b9b9b' }}>
                <p><strong> Views: </strong> 
                  <span className="material-symbols-outlined" style={{ fontSize: 15 }}> visibility  </span>
                  {singleSeries.views + 1}
                </p>
              </div>
               
              <p><strong> Description: </strong></p>
              {!editMode ? 
              <div className="description-textbox"> {singleSeries.description} </div>
              :
              <form onSubmit={ submitDescription }>
                <textarea 
                  name="paragraph-text" 
                  cols={96} rows={5} 
                  defaultValue={singleSeries.description}> 
                </textarea>
                <div className="submit-button">
                  <button type="submit" style={{margin: 0}}> Submit </button>
                </div>
              </form>
              }
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
            <strong> {!editMode ? 'Edit' : 'Back'} </strong> 
            <span className="material-symbols-outlined"> {!editMode ? 'edit' : 'exit_to_app'} </span>
          </div>
          {!editMode ? '' : (<ChapterForm singleSeries={singleSeries} />)}
        </div>
      </div>
    )  
}

export default SeriesPage