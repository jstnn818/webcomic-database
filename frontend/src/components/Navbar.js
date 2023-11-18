import { Link } from 'react-router-dom'
import { useLogout } from '../hooks/useLogout'

const Navbar = () => {
    const { logout } = useLogout()

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
                    <div>
                        <button onClick={handleClick}> <strong> Logout </strong></button>
                    </div>
                    <div>
                        <Link to="/login"><strong> Login </strong></Link>
                        <Link to="/signup"><strong> Sign Up </strong></Link>
                    </div>
                </nav>
            </div>
        </header>
    )
}

export default Navbar