import React from "react";
import '../Nav/Nav.css';
import {
    Link, NavLink,
} from "react-router-dom";

class Nav extends React.Component {
    render() {
        return (
            <div className="topnav">
                <Link to="/" className="active">Home</Link>
                <Link to="/todo" >Todos</Link>
                <Link to="/about " >About</Link>
                <NavLink
                    to="/user"
                    className={({ isActive, isPending }) =>
                        isPending ? "pending" : isActive ? "active" : ""
                    }
                >
                    User
                </NavLink>;
                <Link to="/detail " >Detail User</Link>
                <Link to="/fetch" >Fetch User</Link>
            </div>
        )
    }
}

export default Nav;