import { useState } from 'react'
import '../css/form.css'

const SeriesForm = () => {

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
                window.location.reload()
            }
        } catch (error) {
            console.error('Error uploading images:', error)
        }
    }

    return (<div>
        <form className="create" id="series-form" onSubmit={ handleSubmit } encType=''>
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
                <button> Upload </button>
            </div>
            
        </form>
        {error && <div id="series-error" className="error"> {error} </div>}</div>
    )
}

export default SeriesForm