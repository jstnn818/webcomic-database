import { useState } from 'react'
import '../css/form.css'

const ChapterForm = (props) => {
    const { singleSeries } = props
    const [ title, setTitle ] = useState('')
    const [ images, setImages ] = useState([])
    const [ error, setError ] = useState(null)
    const [ emptyFields, setEmptyFields ] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()

        const pages = []

        const uploadPromises = images.map(async (image, index) => {
            const page = new FormData()
            page.append('name', `image${index}`)
            page.append('testImage', image)
        
            const response = await fetch('http://localhost:4000/api/images', {
                method: 'POST',
                body: page,
            })
        
            const json = await response.json()
            return json
        })

        try {
            const uploadedPages = await Promise.all(uploadPromises)
            pages.push(...uploadedPages)
            console.log(pages)
            const chapter = { title, pages }
            const response = await fetch('http://localhost:4000/api/chapters', {
                method: 'POST',
                body: JSON.stringify(chapter),
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
                setImages([])
                setError(null)
                setEmptyFields([])
                console.log('new chapter added', json)
      
                const updatedSeries = {
                    chapters: singleSeries.chapters ? [...singleSeries.chapters, json._id] : [json._id]
                }
                const responseSeries = await fetch(`http://localhost:4000/api/series/${singleSeries._id}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(updatedSeries)
                })
                const jsonSeries = await responseSeries.json()
                console.log(jsonSeries)
                if (responseSeries.ok) {
                    window.location.reload()
                }
            }

        } catch (error) {
            console.error('Error uploading images:', error)
        }
    }

    const handlePageChange = (e) => {
        const selectedImages = Array.from(e.target.files)
        setImages(selectedImages)
    }

return (
    <form className="create" id="chapter-form" onSubmit={ handleSubmit } encType=''>
        <h3> Add a New Chapter </h3>
        <div className="form-info">
            <label> Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            ></input>
            <label> Pages: </label>
            <input
                id="form-upload"
                type="file"
                onChange={handlePageChange}
                multiple
                className={emptyFields.includes('pages') ? 'error' : ''}
            ></input>
        </div>
        <div className="submit-button">
            <button> Upload </button>
        </div>
        {error && <div id="chapter-error" className="error"> {error} </div>}
    </form>
    )
}

export default ChapterForm