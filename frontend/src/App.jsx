import React from 'react'
import './App.css';
import FormItem from './components/Form/FormItem';
// import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import ExamForm from './components/Student/ExamForm';
import Template from './components/Template/Template';
import AddQuestions from './components/Template/AddQuestions';
import AllForm from './components/Form/AllForm';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
function App() {
  const loggedInUser = false

  return (
    <Router>
      <Routes>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/form' element={<Sidebar />}></Route>
        <Route path='/sidebar/form' element={<FormItem />}></Route>
        <Route path='/sidebar/template' element={<Template />}></Route>
        <Route path='/sidebar/addQuestions' element={<AddQuestions />}></Route>
        <Route path='/sidebar/exam' element={<ExamForm />}></Route>
        <Route path='/sidebar/allForms' element={<AllForm />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
