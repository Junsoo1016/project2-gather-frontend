import React from "react";
import "./UserWindow.css"
import {FaRegUserCircle} from 'react-icons/fa';
import {Link} from 'react-router-dom'

const UserWindow = (props) => {

    return (
        <div className={props.sidebar ? "showSidebar" : "hideSidebar"}>
            <div className="profile">
                <FaRegUserCircle size={35} id="userCircle"/>
                <p className="userName">{props.user.firstName} {props.user.lastName}</p>
            </div>

            <div>
                <Link to="/account">
                <p className="aLink aLinkP">Profile</p>
                </Link>
            </div>
            
            <div className="saved">
                <p className="aLink">Saved</p>
            </div>

            <div className="setting">
                <p className="aLink">Setting</p>
            </div>

            <div className="signOut">
                <p className="aLink">Sign Out</p>
            </div>

            <div>
                <Link to="/">
                <p className="aLink" onClick={() => props.deleteUser()}>Delete Account</p>
                </Link>
            </div>
        </div>
    )
}

export default UserWindow