import axios from 'axios';
import React, { useEffect,useRef } from 'react';
import {useNavigate} from 'react-router-dom';
const Header = () => {
    const navigate = useNavigate();
    const logoutRef = useRef(null);
    const myPageRef = useRef(null);

   //로그아웃 작동 
    const Logout = ()=>{
        axios.get('/api/users/logout')
        .then(response =>response.data);

        const date = new Date("2020-01-01").toUTCString();
        document.cookie = 'x_auth=; expires='+date+';';
    }


useEffect(()=>{
    console.log(document.cookie);
    if(!document.cookie){
        logoutRef.current.style.display = 'none';
    }else{
        logoutRef.current.style.display = 'block';
    }
   
},[document.cookie]);
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <h1 onClick={()=>{
                        navigate('/');
                    }}>Portfolio</h1>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <p className="nav-link active">Home</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link">My Page</p>
                            </li>
                        </ul>
                    </div>
                    <div className="collapse d-flex" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <p className="nav-link" aria-current="page" onClick={()=>{
                                    navigate('/login');
                                }}>Sign In</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link" onClick={()=>{
                                    navigate('/signUp');
                                }}>Sign Up</p>
                            </li>
                            <li className="nav-item">
                                <p className="nav-link" onClick={Logout} ref={logoutRef}>Logout</p>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
}

export default Header;