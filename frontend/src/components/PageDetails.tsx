import React, { useState, useEffect } from 'react'
import { Image } from '../interfaces'

type Props = {
    pageId: string,
}

const PageDetails = ({ pageId }: Props) => {
    const [ page, setPage ] = useState<Image | null>(null)

    useEffect(() => {
        const fetchPage = async () => {
            const response = await fetch(`/api/images/${pageId}`)
            const json = await response.json()
            setPage(json)
        }
        fetchPage()
    }, [pageId])

    const imageConverter = () => {
        const base64String = btoa(new Uint8Array(page!.image.data.data).reduce(function (data, byte) {
            return data + String.fromCharCode(byte)
        }, ''))
        return <img alt="page-details" src={`data:image/png;base64,${base64String}`} width="600" height="900"/>  
    }

    if (!page) {
        return <div> </div>
    }

    return (
        <div className="page-details" style={{ width: '600px', height: '900px', margin: '0 auto'}}>
            { imageConverter() }
        </div>
    )
}

export default PageDetails