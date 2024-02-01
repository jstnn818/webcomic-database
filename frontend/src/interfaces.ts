
export interface User {
    _id: string
    username: string
    password: string
}

export interface Comment {
    _id: string
    username: string
    text: string
}

export interface Image {
    _id: string
    name: string
    image: {
        data: {
            data: Buffer
        }
        contentType: string
    }
}

export interface Chapter {
    _id: string
    title: string
    pages: string[]
}

export interface Series {
    _id: string
    title: string
    author: string
    cover: string
    description: string
    user_id: string
    views: number
    comments: Comment[]
    chapters: string[]
}