import {Link} from 'react-router-dom'

const NavBar = () => {
    return (
        <div>
            <Link to='/'>WELCOME</Link>
            <Link to='/home'>HOME</Link>
            <Link to='/create'>NEW DOG</Link>
        </div>
    )
}

export default NavBar;