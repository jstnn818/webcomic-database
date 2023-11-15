import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'

import ChapterForm from '../components/ChapterForm'
import ChapterDetails from '../components/ChapterDetails'
import '../css/series-page.css'

const SeriesPage = () => {

  const { seriesId } = useParams()
  const [ seriesOne, setSeriesOne ] = useState(null)
  const [ cover, setCover ] = useState(null)
  const [ order, setOrder ] = useState({
    ascending: true,
    icon: "arrow_downward"
  })
    
  useEffect(() => {
      const fetchSeriesOne = async () => {
        const response = await fetch(`http://localhost:4000/api/series/${seriesId}`)
        const json = await response.json()
        setSeriesOne(json)

        const coverRes = await fetch(`http://localhost:4000/api/images/${json.cover}`)
        const coverJson = await coverRes.json()
        setCover(coverJson)

      }
      fetchSeriesOne()
    }, [seriesId])
    
    if (!seriesOne) {
      return <div> </div>
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
        return seriesOne.chapters && seriesOne.chapters.map((chapterId, index) => (
          <ChapterDetails 
          seriesOne={seriesOne} 
          key={chapterId} 
          chapterId={chapterId}
          index={index}
          />
        ))
      }
      else {
        return seriesOne.chapters && seriesOne.chapters.toReversed().map((chapterId, index) => (
          <ChapterDetails 
          seriesOne={seriesOne} 
          key={chapterId} 
          chapterId={chapterId}
          index={seriesOne.chapters.length - index - 1}
          />
        ))
      }
    }


    return (
      <div className="home">
        <div className="series-container">
          <div className='series-title'>
            <h4> {seriesOne.title} </h4>
          </div>
          <div className='series-info'>
            <div className='image-details'>
              {imageConverter()}
            </div>
            <div className='series-about'>
              <p><strong> Author: </strong> {seriesOne.author} </p>
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
        <ChapterForm seriesOne={seriesOne} />
      </div>
    )  
}

export default SeriesPage