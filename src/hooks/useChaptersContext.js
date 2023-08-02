import { ChaptersContext } from "../context/ChaptersContext";
import { useContext } from 'react'

export const useChaptersContext = () => {
    const context = useContext(ChaptersContext)

    if (!context) {
        throw Error('useChaptersContext must be used inside a ChaptersContextProvider')
    }

    return context
}