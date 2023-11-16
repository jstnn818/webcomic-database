import '../css/featured-section.css'
import { useState, useEffect } from 'react'

const FeaturedItem = ({ singleSeries, index }) => {

    const [ cover, setCover ] = useState(null)

    useEffect(() => {
        const fetchCover = async () => {
            const response = await fetch(`http://localhost:4000/api/images/${singleSeries.cover}`)
            const json = await response.json()
            setCover(json)
          }
          fetchCover()
    }, [singleSeries])

    const imageConverter = () => {
        if (!cover) {
            return <div className="series-image-details"> </div>
        }
        const base64String = btoa(new Uint8Array(cover.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte)
        }, ''))
        return <img alt="cover" src={`data:image/png;base64,${base64String}`} width="75" height="117"/>
    }

    const seriesTitleRender = () => {
        if (singleSeries.title.length > 18){
            return singleSeries.title.slice(0, 16) + "..."
        }
        return singleSeries.title
    }

    return (
        <div id="featured-item">
            <h4> {index + 1} </h4>
            <div id="featured-description"> 
                {imageConverter()}
                <p> {seriesTitleRender()} </p>
            </div>
        </div>
    )
}
export default FeaturedItem