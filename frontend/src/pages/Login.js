import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')
    const { login, isLoading, error } = useLogin()

    const handleSubmit = async (e) => {
        e.preventDefault()
        await login(username, password)
    }

    return (
        <div className="authform">
            <div id="title">
                <h3> Login </h3>
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
                    <button disabled={isLoading}> Login </button>
                </div>
            </form>
            {error && <div className="error"> {error} </div>}
            <Link id="signup-link" to={'/signup'}> Don't have an account? Sign Up! </Link>
        </div>
    )
}
export default Login