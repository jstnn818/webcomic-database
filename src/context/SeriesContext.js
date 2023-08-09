import { createContext, useReducer } from 'react'

export const SeriesContext = createContext()

export const seriesReducer = (state, action) => {
    switch (action.type) {
      case 'SET_SERIES':
        return { 
          series: action.payload 
        }
      case 'CREATE_SERIES':
        return { 
          series: [action.payload, ...state.series] 
        }
      case 'DELETE_SERIES':
        return {
          series: state.series.filter((w) => w._id !== action.payload._id)
        }
      case 'UPDATE_SERIES':
        const { seriesId, newChapterId } = action.payload
        const updatedSeries = state.series.map(seriesOne => {
          if (seriesOne.id === seriesId) {
            return {...seriesOne, chapters: [newChapterId, ...seriesOne.chapters]}
          }
          return seriesOne
        })
        return updatedSeries
      default:
        return state
    }
  }
  
  export const SeriesContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(seriesReducer, { 
      series: null
    })
    
    return (
      <SeriesContext.Provider value={{ ...state, dispatch }}>
        { children }
      </SeriesContext.Provider>
    )
  }