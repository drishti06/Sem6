import React,{useState} from 'react'
import './App.css';
import FormItem from './components/Form/FormItem';
// import Login from './components/Login';
import Sidebar from './components/Sidebar';
import Template from './components/Template/Template';
import Login from './components/Login';

function App() {
  const [logedin, setlogedin] = useState(true);

  return (
    <>
      {
        logedin? (<Sidebar />):(<Login />)
      }
      
      {/* <FormItem /> */}
      {/* <Template /> */}
      {/*  */}
    </>
  );
}

export default App;
