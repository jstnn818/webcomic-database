import { useState } from 'react'

const Login = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(username, password)
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
                    <button> Login </button>
                </div>
            </form>
        </div>
    )
}
export default Login