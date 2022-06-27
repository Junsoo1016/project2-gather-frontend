import React, { useEffect, useState } from "react";  
import Post from "../Post/Post";
import {Link} from 'react-router-dom'
import Map from "../Map/Map";
import './Board.css'
import UserWindow from "../UserWindow/UserWindow";


const Board = (props) => {
            const post = props.postList.map((post, index) => {
                return <Post
                userId = {post.userId} 
                title = {post.title}
                date = {post.date}
                location = {post.location}
                description = {post.description}
                complete = {post.complete}
                coordinates = {post.coordinates}
                requested = {post.requested}
                askToJoin={props.askToJoin}
                index={index}
                />
        })
 
    // console.log(props);
    return(
        <div className="board">
            
            <Map postList={props.postList}/>
            <UserWindow user = {props.user} deleteUser={props.deleteUser} sidebar={props.sidebar}/>

            <Link to="/post-input">
                 <button className="postBtn">Create a new post</button>
            </Link>

            <div className="postArea">
            {post}
            </div>

        </div>
    )
}

export default Board