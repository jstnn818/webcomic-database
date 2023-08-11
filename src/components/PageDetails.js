import { useState, useEffect } from 'react'

const PageDetails = ({ pageId }) => {
    const [ page, setPage ] = useState(null)

    useEffect(() => {
        const fetchPage = async () => {
            const response = await fetch(`http://localhost:4000/api/images/${pageId}`)
            const json = await response.json()
            setPage(json)
        }
        fetchPage()
    }, [pageId])

    const imageConverter = () => {
        const base64String = btoa(new Uint8Array(page.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte)
        }, ''))
        return <img alt="page-details" src={`data:image/png;base64,${base64String}`} width="600" height="900"/>
    }

    if (!page) {
        return <div> </div>
    }

    return (
        <div className="page-details" width="600" height="900">
            {imageConverter()}
        </div>
    )
}

export default PageDetails