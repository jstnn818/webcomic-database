import React, { createContext, useReducer, useEffect, Dispatch, ReactNode } from 'react'
import { User } from '../interfaces'

interface AuthAction {
    type: string
    payload: User | null
}

interface AuthState {
    user: User | null
}

interface AuthContextType {
    user: User | null
    dispatch: Dispatch<AuthAction>
}

interface AuthProps {
    children?: ReactNode
}

export const AuthContext = createContext<AuthContextType | null>(null)

export const AuthReducer = (state: AuthState, action: AuthAction) => {
    switch (action.type) {
        case 'LOGIN':
            return { user: action.payload }
        case 'LOGOUT':
            return { user: null }
        default:
            return state
    }
}

export const AuthContextProvider: React.FC<AuthProps> = ({ children }) => {
    const [state, dispatch] = useReducer<React.Reducer<AuthState, AuthAction>>(AuthReducer, {
        user: null
    })

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user')!) as User
        if (user) {
            dispatch({ type: 'LOGIN', payload: user })
        }
    }, [])

    console.log('AuthContext state: ', state)
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            { children }
        </AuthContext.Provider>
    )
}