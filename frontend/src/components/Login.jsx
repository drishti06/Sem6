import React, { useState } from "react";
import './Login.css'
import logo from './Logo.jpeg'
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [isSignIn, setIsSignIn] = useState(true);
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')
  const [confirmPassword, setConfrimPassword] = useState('')
  const navigate = useNavigate()

  const handleSwitchForm = () => {
    setIsSignIn((prevIsSignIn) => !prevIsSignIn);
  };
  const baseURl = 'http://localhost:8080/auth'
  const handleLogin = (e) => {
    e.preventDefault()
    try {
      const data = { username, password }
      axios.post(`${baseURl}/login`, data)
        .then((res) => {
          localStorage.setItem('loggedInUser', res.data.token)
          localStorage.setItem('loggedInUsername', res.data.username)
          alert('Logged in Successfuly')
          navigate('/form')
        })
    } catch (error) {
      console.log(error.message)
    }
  }

  const handleSignup = (e) => {
    e.preventDefault()
    try {
      const data = { username, password, confirmPassword }
      axios.post(`${baseURl}/signup`, data)
        .then((res) => {
          localStorage.setItem('loggedInUser', res.data.token)
          localStorage.setItem('loggedInUsername', res.data.username)
          alert('Registered Successfuly')
          navigate('/form')
        })
    } catch (error) {
      console.log(error.message)
    }
  }
  return (
    <div className={`wrapper ${isSignIn ? "animated-signin" : "animated-signup"}`}>
      <div className="logo">
        <img src={logo} alt="" />
      </div>
      <div className={`form-container ${isSignIn ? "sign-in" : "sign-up"}`}>
        <form className="form" action="#">
          <h2>{isSignIn ? "Login" : "Sign Up"}</h2>
          <div className="form-group">
            <input onChange={(e) => setUsername(e.target.value)} type="text" required placeholder="Enter Username" />
            <i className="fas fa-user"></i>
            <label htmlFor="">Username</label>
          </div>
          {/* {isSignIn || (
            <div className="form-group">
              <input onChange={(e) => setEmail(e.target.value)} type="email" required placeholder="Enter Email" />
              <i className="fas fa-at"></i>
              <label htmlFor="">Email</label>
            </div>
          )} */}
          <div className="form-group">
            <input onChange={(e) => setPassword(e.target.value)} type="password" required placeholder="Enter Password" />
            <i className="fas fa-lock"></i>
            <label htmlFor="">Password</label>
          </div>
          {!isSignIn && (
            <div className="form-group">
              <input onChange={(e) => setConfrimPassword(e.target.value)} type="password" required placeholder=" Confirm Password" />
              <i className="fas fa-lock"></i>
              <label htmlFor="">Confirm Password</label>
            </div>
          )}
          {isSignIn ? (
            <button onClick={handleLogin} type="submit" className="sub-btn btn">
              Login
            </button>
          ) : (
            <button onClick={handleSignup} type="submit" className="sub-btn btn">
              Sign Up
            </button>
          )}
          <div className="link">
            <p>
              {isSignIn ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                className="switch-link"
                onClick={handleSwitchForm}
              >
                {isSignIn ? " Sign Up" : " Sign In"}
              </button>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
