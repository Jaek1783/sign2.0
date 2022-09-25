import React, {useEffect} from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import Nav from './LandingPage/Nav';
import Main from './LandingPage/Main';
import Login from './LoadingPage/Login';
import SignUp from './LoadingPage/SignUp';
import Auth from './hoc/auth';

function App() {
  return (
    <div className="App">
      <Nav/>
      <Routes>
        <Route path='/' element={Auth(Main,null)}/>
        <Route path='/login' element={Auth(Login,false)}/>
        <Route path='/signUp' element={Auth(SignUp,false)}/>
      </Routes>
    </div>
  );
}
//Auth option
//null => 아무나 출입이 가능한 페이지
//true => 로그인한 유저만 출입이 가능한 페이지
//false => 로그인한 유저는 출입이 불가능한 페이지

//AdminRoute
//true => Admin만 가능
//null => 모두 가능
export default App;
