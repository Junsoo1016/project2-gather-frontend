import React from "react";
import "./HowToUse.css"
import {Link} from 'react-router-dom'

const HowToUse = () => {
    return(
        <div className="aboutBox">
            <div className="h1Box" data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1000">
            <h1 className="abouth1">Make new friends with activities that you are into on Gather. </h1>
            <Link to="/create-new-account">
                <button className="signUpBtn">Sign Up</button>
            </Link>
            </div>

            <div className="pBox" data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
            <p className="aboutp">Gather is a platform for finding and building local communites. Users gather
                to meet new people, learn new things, find support, get out of their comfort
                zones, and pursue their passioins, together.
            </p>
            </div>
        </div>
    )
}

export default HowToUse