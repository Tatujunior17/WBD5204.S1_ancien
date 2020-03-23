import React from 'react'
import {Link, NavLink} from "react-router-dom";

let token = localStorage.getItem('token');

const Header = () =>{

    const afficherLogin = () => {
        let loginoulogout = <NavLink to="/login" style={{color: "white"}}>Login</NavLink>;
        if(token){
            loginoulogout = <a className="nav-link" href="" onClick={logout}>Logout</a>;
        }
        return loginoulogout;
    };

    const logout = () => {
        localStorage.removeItem('token');
        this.history.push('/');
    };

    const afficherRegisterouchat = () => {
        let registerouchat = <NavLink to="/inscription" style={{color: "white"}}>Register</NavLink>;
        if(token){
            registerouchat = <Link className="nav-link" to='/chat'>Chat</Link>;
        }
        return registerouchat;
    };

    return (
        <header>
            <nav className="navbar navbar-dark bg-dark">
                <div className="container">
                    <Link to="/" className="navbar-brand">
                        Linko Legends
                    </Link>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        {afficherRegisterouchat()}
                    </li>
                    <li className="nav-item">
                        {afficherLogin()}
                    </li>
                </ul>
                </div>
            </nav>
        </header>
    );
};

export default Header;
