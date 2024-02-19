import React from 'react'
import './App.css';
import FormItem from './components/Form/FormItem';
// import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import ExamForm from './components/Student/ExamForm';
function App() {
  const loggedInUser = true

  return (
    <>
      {/* {loggedInUser ?
        <Sidebar /> :
        <Login />
      } */}
      <ExamForm />
    </>
  );
}

export default App;
