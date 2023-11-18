import '../css/featured-section.css'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

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

    const handleClick = async () => {
        const updatedSeries = {
            views: singleSeries.views + 1
        }
        const response = await fetch(`http://localhost:4000/api/series/${singleSeries._id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedSeries)
        })
        const json = await response.json()
        if (response.ok) {
            console.log(`Series ${json.views}`)
        }
    }

    return (
        <div id="featured-item">
            <h4> {index + 1} </h4>
            <div id="featured-description"> 
                {imageConverter()}
                <Link 
                    onClick={handleClick}
                    to={'/series/' + singleSeries._id} 
                    style={{ textDecoration: 'none', color: 'white' }}>
                <p><strong> {seriesTitleRender()} </strong></p>
                <div style={{ color: '#9b9b9b' }}>
                    <p> {singleSeries.author}</p>
                    <p> <span className="material-symbols-outlined" style={{ fontSize: 15 }}> visibility 
                    </span> {singleSeries.views} </p>
                </div>
                </Link>
            </div>
        </div>
    )
}
export default FeaturedItem