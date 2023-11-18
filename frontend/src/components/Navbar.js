import { Link } from 'react-router-dom'

const Navbar = () => {
    return (
        <header>
            <div className="container">
                <Link to="/">
                    <h1>Comic Database</h1>
                </Link>
                <nav>
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