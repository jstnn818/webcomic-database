import React from 'react'
import '../css/featured-section.css'
import { Series } from '../interfaces'
import FeaturedItem from './FeaturedItem'

type Props = {
    series: Series[],
    title: string,
    count: number,
}

const FeaturedSection = ({ series, title, count }: Props) => {

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