import { useAuthContext } from "./useAuthContext"
import { useSeriesContext } from "./useSeriesContext"

export const useLogout = () => {

    const { dispatch } = useAuthContext()
    const { dispatch: seriesDispatch } = useSeriesContext()

    const logout = () => {
        localStorage.removeItem('user')
        dispatch({type: 'LOGOUT'})
        seriesDispatch({type: 'SET_SERIES', payload: null})
    }
    return {logout}
}