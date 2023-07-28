import { useQuery } from 'react-query'
import axios from 'axios'

const fetchSeries = seriesId => {
    return axios.get(`http://localhost:4000/api/series/${seriesId}`)
}

export const useSeriesData = (seriesId) => {
    return useQuery(['series', seriesId], () => fetchSeries(seriesId))
}
