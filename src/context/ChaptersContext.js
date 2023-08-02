import { createContext, useReducer } from 'react'

export const ChaptersContext = createContext()

export const chaptersReducer = (state, action) => {
    switch (action.type) {
      case 'SET_CHAPTER':
        return { 
          chapters: action.payload 
        }
      case 'CREATE_CHAPTER':
        return { 
          chapters: [action.payload, ...state.chapters] 
        }
      case 'DELETE_CHAPTER':
        return {
          chapters: state.chapters.filter((w) => w._id !== action.payload._id)
        }
      case 'GET_CHAPTER':
          // Find the chapter with the matching _id
        const foundChapter = state.chapters.find((chapter) => chapter._id === action.payload._id);
          
          // Return the single chapter object, or return an empty object if not found
        return {
          chapters: foundChapter ? [foundChapter] : [],
        };
      default:
        return state
    }
  }
  
  export const ChaptersContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(chaptersReducer, { 
      chapters: null
    })
    
    return (
      <ChaptersContext.Provider value={{ ...state, dispatch }}>
        { children }
      </ChaptersContext.Provider>
    )
  }