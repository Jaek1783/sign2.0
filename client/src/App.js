import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
// You can specify which plugins you need
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './LandingPage/Nav';
import Main from './LandingPage/Main';
import Login from './LoadingPage/Login';
import SignUp from './LoadingPage/SignUp';

function App() {

  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={<Main/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signUp' element={<SignUp/>}/>
      </Routes>
    </div>
  );
}

export default App;
