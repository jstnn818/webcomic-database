import { useState } from 'react'
import { useSeriesContext } from '../hooks/useSeriesContext'
import '../css/series-form.css'

// Forms don't reset. value="" kinda works, but doesn't show when you have a file there either

const SeriesForm = () => {
    const { dispatch } = useSeriesContext()

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState(null)
    const [chapters, setChapters] = useState([])
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const uploadImage = async (image) => {
            const coverData = new FormData()
            coverData.append('name', 'cover')
            coverData.append('testImage', image)

            console.log(coverData)
        
            const response = await fetch('http://localhost:4000/api/images', {
                method: 'POST',
                body: coverData,
            })
        
            const json = await response.json()
            console.log(json)
            return json
        }

        try {
            var cover = null
            if (image) {
                cover = await uploadImage(image)
            }
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
                setChapters([])
                setImage(null)
                setError(null)
                setEmptyFields([])
                console.log('new series added', json)
                dispatch({type: 'CREATE_SERIES', payload: json})
            }
        } catch (error) {
            console.error('Error uploading images:', error)
        }
    }

    return (
        <form className="create" onSubmit={ handleSubmit } encType=''>
            <h3> Add a New Series </h3>
            <div className="form-info">
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
                    id="form-upload"
                    type="file"
                    onChange={(e) => setImage(e.target.files[0])}
                    className={emptyFields.includes('cover') ? 'error' : ''}
                ></input>
            </div>
            <div className="submit-button">
                <button> Add Series </button>
            </div>
            {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default SeriesForm