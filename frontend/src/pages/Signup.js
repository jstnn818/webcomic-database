import { useState } from 'react'

const Signup = () => {
    const [ username, setUsername ] = useState('')
    const [ password, setPassword ] = useState('')

    const handleSubmit = async (e) => {
        e.preventDefault()

        console.log(username, password)
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
                    <button> Sign Up </button>
                </div>
            </form>
        </div>
    )
}
export default Signup