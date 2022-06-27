import { useEffect, useState } from 'react';
import './App.css';
import {Routes, Route, Link} from 'react-router-dom'
import Board from './components/Board/Board'
import PostInput from './components/PostInput/PostInput';
import HowToUse from './components/HowToUse/HowToUse';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import axios from 'axios';
import UserBoard from './components/UserBoard/UserBoard';
import EditProfile from './components/EditProfile/EditProfile';
import { RiFileUploadLine } from 'react-icons/ri';

function App() {

  //Sign Up
  const [signUpForm, setSignUpForm] = useState({
    firstName: "",
    lastName: "",
    age: "",
    userId: "",
    password: "",
    email: "",
    logIn: false
  })

 

  // const handleValide = (e) => { 
  //   setSignUpForm({
  //     ...signUpForm,
  //     [e.target.name]: e.target.value}) 
  //   if(signUpForm.password === signUpForm.confirmPassword) {
  //     setSignUpForm({
  //       firstName: signUpForm.firstName,
  //       lastName: signUpForm.lastName,
  //       id: signUpForm.id,
  //       password: signUpForm.password,
  //       confirmPassword: e.target.value,
  //       valid: true,
  //       logIn: false,
  //   })
  // } else {
  //   setSignUpForm({
  //     firstName: signUpForm.firstName,
  //     lastName: signUpForm.lastName,
  //     id: signUpForm.id,
  //     password: signUpForm.password,
  //     confirmPassword: e.target.value,
  //     valid: false,
  //     logIn: false,
  //   })
  // }
  // }

  //UserData
  const [userData, setUserData] = useState([])
  //Get User Data before it renders
  useEffect(() => {
    axios.get('http://localhost:3000/api/users')
    .then(res => setUserData(res.data))
  },[userData])

  const deleteUser = () => {
    console.log("delete user");
    console.log(user.userId);
    axios.delete(`http://localhost:3000/api/users/userId/${user.userId}`)
    .then(res => {
      setUser({
        ...user,
        logIn: false
      })
    })
    .then(res => document.location.reload())
  }

  const createUser = () => {
    console.log(userData);
    axios.post('http://localhost:3000/api/users/', signUpForm)
  }

  const handleSignUp = (e) => {  
    setSignUpForm({
      ...signUpForm,
      [e.target.name]: e.target.value   
    })
  }

  // const saveUserData = () => { 
  //   setUserData([...userData, signUpForm])    
  // }

  //User logged in
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    age: null,
    userId: null,
    password: "",
    email: "",
    logIn: false
  })

  const [editProfileForm, seteditProfileForm] = useState({
    firstName: user.firstName,
    lastName: user.lastName,
    age: user.age,
    userId: user.userId,
    password: user.password,
    email: user.email,
    logIn: true
  })

  const handleProfileForm = (e) => {
    seteditProfileForm({
      ...editProfileForm,
      [e.target.name]: e.target.value,
      userId: user.userId   
    })
  }

  const editUser = () => {
    axios.put(`http://localhost:3000/api/users/userId/${user.id}`, editProfileForm)
    .then(res => {
      setUser(res.data)
    })
  }

  //Log In
  const [loginForm, setLoginForm] = useState({
    userId: "",
    password: ""
  })

  const handleLogin = (e) => {  
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value   
    })
  }

  const validateLogin = () => {
    const user = userData.find((user) => user.userId === loginForm.userId)
    if(user.password == loginForm.password) {
      console.log("welcome");
      setUser({
        firstName: user.firstName,
        lastName: user.lastName,
        age: user.age,
        userId: user.userId,
        password: user.password,
        email: user.email,
        logIn: true,
      })
    } else {
      alert("The password you’ve entered is incorrect.");
    }
  }
  
  //Post Input
  const [postInputForm, setPostInputForm] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
    complete: false,
    coordinates: null,
    requested: false
  })

  const handlePostChange = (e) => {  
    setPostInputForm({
      ...postInputForm,
      [e.target.name]: e.target.value,
      complete: false,
      coordinates: {},
      requested: false   
    })
  }

  const [postList, setPostList] = useState([])

  useEffect(() => {
    axios.get('http://localhost:3000/api/posts')
    .then(res => setPostList(res.data))
  },[postList])

  const saveUserPost = () => {
    axios.post(`http://localhost:3000/api/posts/userId/${user.userId}`, postInputForm)   
  }

  const askToJoin = (e) => {
    e.preventDefault()
    const copy = [...postList]
    const index = postList.indexOf(e)
    console.log(index);
    copy[0].requested = true
  }

  const[sidebar, setSidebar] = useState(false)

  const showSidebar = () => {
    console.log("clicked");
    setSidebar(!sidebar)
  }
  

  return (
    <div className="App">
      
      <nav>
        <div className='navBox'>
          <Link className='navTitle' to="/">
          <h1 className='title'>Gather</h1>
          </Link>
          <ul>
            <Link className='navLink' to="/">
              <li>Home</li>
            </Link>
            <Link className='navLink' to="/howToUse">
              <li>How To Use</li>
            </Link>
              {!user.logIn ? <Link className='navLink' to="/login"><li>Log In</li></Link> : <li onClick={() => showSidebar()} className='navLink'>Hi {user.firstName} </li>} 
          </ul>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Board user = {user} postList={postList} askToJoin={askToJoin} deleteUser={deleteUser} sidebar={sidebar}/>}  />
          <Route path="/howToUse" element={<HowToUse/>} />
          <Route path="/login" element={<Login handleLogin={handleLogin} validateLogin={validateLogin}/>} />
          <Route path="/create-new-account" element={<SignUp handleSignUp={handleSignUp} signUpForm={signUpForm} createUser={createUser}/>} />
          <Route path="/post-input" element={<PostInput handlePostChange={handlePostChange} saveUserPost={saveUserPost} postInputForm={postInputForm} setPostInputForm={setPostInputForm}/>} />
          <Route path="/account/" element={<UserBoard user = {user}/>}/>
          <Route path="/edit-profile/" element={<EditProfile user = {user} setUser={setUser} editUser={editUser} handleSignUp={handleSignUp} handleProfileForm={handleProfileForm} editProfileForm={editProfileForm} seteditProfileForm={seteditProfileForm}/>}/>
        </Routes>
      </main>

    </div>
  );
}

export default App;
