import React, {Component} from 'react';
import { Link } from 'react-router-dom';

class Navbar extends Component {
    render () {
        return (
            <nav className='navbar'>
                <div>
                    <ul>
                        <li>
                            <Link className="nav-link" to="/">
                                Todos
                            </Link>
                        </li>

                        <li>
                            <Link className="nav-link" to="/add">
                                Add todo
                            </Link>
                        </li>

                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;