import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';


class Navbar extends Component {
    render () {
        return (
            <nav className="navbar">
                <div className ={'navbarContent'}>
                    <ul >
                        <li className="nav-item-todos">
                            <Link className={"nav-link"} to={"/"}>
                                Todos
                            </Link>
                        </li>

                        <li className = "nav-item-add">
                            <Link className={"nav-link"} to={"/add"}>
                                New Todo
                            </Link>
                        </li>

                        <li className = "nav-item-search">
                            <Link className={"nav-link"} to={"/search"}>
                                Search
                            </Link>

                        </li>

                        <li className = "nav-item-filter-by-date">
                            <Link className={"nav-link"} to={"/filter-by-date"}>
                                Show by date
                            </Link>

                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
}

export default Navbar;