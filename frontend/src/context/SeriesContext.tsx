import React, { createContext, useReducer, Dispatch, ReactNode } from 'react'
import { Series } from '../interfaces'

interface SeriesAction {
    type: string
    payload: any
}

interface SeriesState {
    series: Series[] | null
}

interface SeriesContextType {
    series: Series[] | null
    dispatch: Dispatch<SeriesAction>
}

interface SeriesProps {
    children?: ReactNode
}

export const SeriesContext = createContext<SeriesContextType | null>(null)

export const SeriesReducer = (state: SeriesState, action: SeriesAction) => {
    switch (action.type) {
      case 'SET_SERIES':
        return { 
          series: action.payload 
        }
      case 'CREATE_SERIES':
        return { 
          series: [action.payload, ...state.series!] 
        }
      case 'DELETE_SERIES':
        return {
          series: state.series!.filter((w) => w._id !== action.payload!._id)
        }
      case 'UPDATE_SERIES':
        return {
          series: state.series!.map(w => w._id === action.payload!._id ? action.payload : w)
        }
      default:
        return state
    }
  }
  
  export const SeriesContextProvider: React.FC<SeriesProps> = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<SeriesState, SeriesAction>>(SeriesReducer, { 
      series: null
    })
    
    return (
      <SeriesContext.Provider value={{ ...state, dispatch }}>
        { children }
      </SeriesContext.Provider>
    )
  }