import { useState } from 'react'
import { useChaptersContext } from '../hooks/useChaptersContext'

const ChapterForm = () => {
    const { dispatch } = useChaptersContext()

    const [title, setTitle] = useState('')
    const [number, setNumber] = useState('')
    const [error, setError] = useState(null)
    const [emptyFields, setEmptyFields] = useState([])
    
    const handleSubmit = async (e) => {
        e.preventDefault()
        const chapter = {title, number}

        const response = await fetch('/api/chapters', {
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
            setNumber('')
            setError(null)
            setEmptyFields([])
            console.log('new chapter added', json)
            dispatch({type: 'CREATE_CHAPTER', payload: json})
        }
    }

    return (
        <form className="create" onSubmit={ handleSubmit } encType=''>
            <h3> Add a New Chapter </h3>

            <label> Title: </label>
            <input
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                className={emptyFields.includes('title') ? 'error' : ''}
            ></input>

            <label> Number: </label>
            <input
                type="text"
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                className={emptyFields.includes('number') ? 'error' : ''}
            ></input>

            <button> Add Chapter </button>
            {error && <div className="error"> {error} </div>}
        </form>
    )
}

export default ChapterForm