import React,{useState} from "react";
import './Login.css'
import logoPng from './logo.png'
import { style } from "@mui/system";
// import { useNavigate } from "react-router-dom";
import axios from "axios"

function Login(props) {
  const [isSignIn, setIsSignIn] = useState(true);
  const [loginData, setloginData] = useState({
    name:"",
  email:"",
  password:""
});
// const navigate = useNavigate()
//   const history = useHistory();
const handleSwitchForm = () => {
  setIsSignIn((prevIsSignIn) => !prevIsSignIn);
};
const baseURL= 'http://localhost:8080'
// const header ={
//   "ngrok-skip-browser-warning": true
// }
const handleForm=async(e)=>{
   console.log(loginData);
   e.preventDefault();
  if (!isSignIn) {
      const response= await axios.post(`${baseURL}/api/register`, loginData)
   .then(function (response) {
      // localStorage.setItem("token",response.data.token);
      console.log(response.data);
      handleSwitchForm();
      
      
  })
  .catch(function (error) {
      console.log(error);
      alert(error.msg);
  });
}else{ 
  const response= await axios.post(`${baseURL}/api/login`, loginData)
  .then(function (response) {
      localStorage.setItem("token",response.data.token);
      console.log(response.data.token);
      // navigate('/Form/TotalForm');
      props.loginState(isSignIn);
      //  navigate('/');

      })
      .catch(function (error) {
          console.log(error);
          alert(error.msg);
      });}
      setloginData({
        name:"",
      email:"",
      password:""
    });
}

 

  return (
    <div className="body">
      <div className="logo d-flex">
        <img src={logoPng} alt="" />
        <h1>
          
          formjam </h1>
      </div>
      <div className="loginBlock">
    <div
      className={`wrapper  ${isSignIn ? "animated-signin" : "animated-signup"}`}
    >
      <div className={`form-container ${isSignIn ? "sign-in" : "sign-up"}`}>
        <form onSubmit={handleForm} className='form'>
          <h2>{isSignIn ? "Login" : "Sign Up"}</h2>
          <div className="form-group">
            <input type="text" required onChange={(e) => setloginData({ ...loginData, name: e.target.value })}/>
            <i className="fas fa-user"></i>
            <label htmlFor="">Username</label>
          </div>
          {isSignIn || (
            <div className="form-group">
              <input type="email" required onChange={(e) => setloginData({ ...loginData, email: e.target.value })}/>
              <i className="fas fa-at"></i>
              <label htmlFor="">Email</label>
            </div>
          )}
          <div className="form-group">
            <input type="password" required onChange={(e) => setloginData({ ...loginData, password: e.target.value })}/>
            <i className="fas fa-lock"></i>
            <label htmlFor="">Password</label>
          </div>
          {!isSignIn && (
            <div className="form-group">
              <input type="password" required />
              <i className="fas fa-lock"></i>
              <label htmlFor="">Confirm Password</label>
            </div>
          )}
          {isSignIn ? (
            <button type="submit" className="btn">
              Login
            </button>
          ) : (
            <button type="submit" className="btn">
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
    </div>
    </div>
  );
}

export default Login;
