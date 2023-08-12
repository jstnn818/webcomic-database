import { SeriesContext } from "../context/SeriesContext";
import { useContext } from 'react'

export const useSeriesContext = () => {
    const context = useContext(SeriesContext)

    if (!context) {
        throw Error('useSeriesContext must be used inside a SeriesContextProvider')
    }

    return context
}