import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'
import { useAuthContext } from '../hooks/useAuthContext'

const Navbar = () => {
    const { logout } = useLogout()
    const { user } = useAuthContext()

    const handleClick = () => {
        logout()
    }

    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Comic Database</h1>
                </Link>
                <nav>
                    {user && (
                        <div className="user-bar">
                            <button><strong> {user.username} </strong></button>
                            <button onClick={handleClick}> <strong> Logout </strong></button>
                        </div>
                    )}
                    
                    {!user && (
                        <div>
                            <Link to="/login"><strong> Login </strong></Link>
                            <Link to="/signup"><strong> Sign Up </strong></Link>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    )
}

export default Navbar