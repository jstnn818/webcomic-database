import { useState } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'

const SeriesForm = () => {
    const { dispatch } = useSeriesContext()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [cover, setCover] = useState('')
    const [chapters, setChapters] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const series = {title, author, cover, chapters}

        const response = await fetch('/api/series', {
            method: 'POST',
            body: JSON.stringify(series),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()

        if (!response.ok) {
            setError(json.error)
            setEmptyFields(json.emptyFields)
        }
        if (response.ok) {
            setTitle('')
            setAuthor('')
            setCover('')
            setChapters([])
            setError(null)
            setEmptyFields([])
            console.log('new series added', json)
            dispatch({type: 'CREATE_SERIES', payload: json})
        }
    }


    return (
        <form className="create" onSubmit={ handleSubmit } encType=''>
            <h3> Add a New Series </h3>

            <label> Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            ></input>

            <label> Author: </label>
            <input
                type="text"
                onChange={(e) => setAuthor(e.target.value)}
                value={author}
                className={emptyFields.includes('author') ? 'error' : ''}
            ></input>

            <label> Cover: </label>
            <input
                type="text"
                onChange={(e) => setCover(e.target.value)}
                value={cover}
                className={emptyFields.includes('cover') ? 'error' : ''}
            ></input>

            <button> Add Series </button>
            {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default SeriesForm