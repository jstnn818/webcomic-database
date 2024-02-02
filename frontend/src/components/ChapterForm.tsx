import React, { FormEvent, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import { Series } from '../interfaces'
import '../css/form.css'

type Props = {
    singleSeries: Series
}

const ChapterForm = (props: Props) => {

    const { user } = useAuthContext()
    const { singleSeries } = props
    const [ title, setTitle ] = useState('')
    const [ images, setImages ] = useState<File[]>([])
    const [ error, setError ] = useState<string | null>(null)
    const [ emptyFields, setEmptyFields ] = useState<string[]>([])
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!user) {
            setError('Not logged in')
            return
        }

        const pages = []

        const uploadPromises = images.map(async (image, index) => {
            const page = new FormData()
            page.append('name', `image${index}`)
            page.append('testImage', image)
        
            const response = await fetch('/api/images', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${(user as any).token}`
                },
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
            const response = await fetch('/api/chapters', {
                method: 'POST',
                body: JSON.stringify(chapter),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${(user as any).token}`
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
                const responseSeries = await fetch(`/api/series/${singleSeries._id}`, {
                  method: 'PATCH',
                  headers: {
                      'Content-Type': 'application/json',
                      'Authorization': `Bearer ${(user as any).token}`
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

    const handlePageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedImages = e.target.files ? Array.from(e.target.files) : []
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