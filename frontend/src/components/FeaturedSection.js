import React from 'react'
import '../css/featured-section.css'
import FeaturedItem from '../components/FeaturedItem'

const FeaturedSection = ({ series, title, count }) => {

    return (
        <div id="featured">
            <div id="section-title"><strong> {title} </strong></div>
            <div className="featured-box">
                {series && series.slice(0, count).map((singleSeries, index) => (
                    <FeaturedItem index={index} singleSeries={singleSeries} key={singleSeries._id}/>
                ))}
            </div>
        </div>
    )
}
export default FeaturedSection