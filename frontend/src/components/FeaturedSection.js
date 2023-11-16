import '../css/featured-section.css'
import FeaturedItem from '../components/FeaturedItem'

const FeaturedSection = ({ series }) => {

    return (
        <div id="featured">
            <div id="section-title"><strong> Most Recent Comics </strong></div>
            <div className="featured-box">
                {series && series.slice(0,3).map((singleSeries, index) => (
                    <FeaturedItem index={index} singleSeries={singleSeries} key={singleSeries._id}/>
                ))}
            </div>
        </div>
    )
}
export default FeaturedSection