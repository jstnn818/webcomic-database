import React from 'react'
import { Series } from '../interfaces'

type Props = {
    singleSeries: Series,
}

const CommentSection = ({ singleSeries }: Props) => {

    const submitComment = () => {
        return
    }

    return (
        <div id="featured">
            <div id="section-title"><strong> Comments: </strong></div>
            <div className="featured-box">
                {singleSeries.comments && singleSeries.comments.map((comment) => (
                    <div> { comment.text } </div>
                ))}
                <div>
                    <form onSubmit={ submitComment }>
                    <input type="text"></input>
                    <div className="submit-button">
                        <button type="submit"> Send </button>
                    </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default CommentSection