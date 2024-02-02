import React, { FormEvent, useState } from 'react'
import { useAuthContext } from '../hooks/useAuthContext'
import '../css/form.css'

const SeriesForm = () => {

    const { user } = useAuthContext()
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [image, setImage] = useState<File | null>(null)
    const [chapters, setChapters] = useState<string[]>([])
    const [error, setError] = useState<string | null>(null)
    const [emptyFields, setEmptyFields] = useState<string[]>([])
    
    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if (!user) {
            setError('Not logged in')
            return
        }

        const uploadImage = async (image: File) => {
            const coverData = new FormData()
            coverData.append('name', 'cover')
            coverData.append('testImage', image)

            console.log(coverData)
        
            const response = await fetch('/api/images', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${(user as any).token}`
                },
                body: coverData,
            })
        
            const json = await response.json()
            console.log(json)
            return json
        }

        try {
            var cover: File = null
            console.log("before image")
            if (image) {
                cover = await uploadImage(image)
            }
            console.log('after image')
            const series = {title, author, cover, chapters}

            const response = await fetch('/api/series', {
                method: 'POST',
                body: JSON.stringify(series),
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

    return (
        <div>
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
                        onChange={(e) => setImage(e.target.files?.[0] || null)}
                        className={emptyFields.includes('cover') ? 'error' : ''}
                    ></input>
                </div>
                <div className="submit-button">
                    <button> Upload </button>
                </div>
                
            </form>
            {error && <div id="series-error" className="error"> {error} </div>}
        </div>
    )
}

export default SeriesForm