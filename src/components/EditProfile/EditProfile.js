import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom'
import axios from "axios";

const EditProfile = (props) => {

    const getUserInfo = () => {
        axios.get(`http://localhost:3000/api/users/userId/${props.user.userId}`)
        .then(res => {
            props.seteditProfileForm(res.data[0])
            console.log(res.data[0]);
        })
      }

    useEffect(() => {
        getUserInfo()
    },[])


    return(
        <div className="signUpBox">
            <div className="header">
            <h2>Edit Profile</h2>
            </div>

            <div className="name">  
                <input onChange={(e) => props.handleProfileForm(e)} value={`${props.editProfileForm.firstName}`} className="nameInput" placeholder="First name" name="firstName" />
                <input onChange={(e) => props.handleProfileForm(e)} value={`${props.editProfileForm.lastName}`} className="nameInput" placeholder="Last name" name="lastName" />
                <input onChange={(e) => props.handleProfileForm(e)} value={`${props.editProfileForm.age}`} className="ageInput" placeholder="Age" name="age" />
            </div>
            <input onChange={(e) => props.handleProfileForm(e)} value={`${props.editProfileForm.password}`} placeholder="Password" name="password" />
            <input onChange={(e) => props.handleProfileForm(e)} value={`${props.editProfileForm.email}`} placeholder="Email address" name="email" />
            
            <Link to="/account">
            <button onClick={() => props.editUser()} className="submitBtn">Submit</button>
            </Link>

        </div>
    )
}

export default EditProfile