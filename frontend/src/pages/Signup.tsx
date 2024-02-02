import React, { FormEvent } from 'react'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'

const Signup = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { signup, isLoading, error } = useSignup()

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        await signup(username, password)
    }

    return (
        <div className="authform">
            <div id="title">
                <h3> Sign Up </h3>
            </div>
            <form onSubmit={handleSubmit}>
                <label> Username: </label>
                <input
                    type="text"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                />
                <label> Password: </label>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <div className="submit-button">
                    <button disabled={isLoading || undefined}> Sign Up </button>
                </div>
                
            </form>
            {error && <div className="error"> {error} </div>}
        </div>
    )
}
export default Signup