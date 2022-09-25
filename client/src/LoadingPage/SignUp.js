import { applyMiddleware } from '@reduxjs/toolkit';
import React,{useRef} from 'react';
import { useSelector,useDispatch } from 'react-redux';
import {setName, setEmail, setPassword} from './../State/userSlice';
import axios from 'axios';

const SignUp = () => {
    const userData = useSelector((state)=>state.userData);
    const dispatch = useDispatch();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
const sign = (event)=>{
    event.preventDefault();

    dispatch(setName(nameRef.current.value));
    dispatch(setEmail(emailRef.current.value));
    dispatch(setPassword(passwordRef.current.value));
    let body = userData;
    axios.post('/api/users/register', body)
    .then(response => response.data);

    nameRef.current.value = "";
    emailRef.current.value = "";
    passwordRef.current.value = "";
}
    return (
        <div className='card' style={{width: 18 + 'rem', padding: 1 + 'rem', margin:`1rem auto`}}>
            <h2>Sign Up</h2>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Name</label>
                <input type="email" className="form-control" placeholder="Your Name" ref={nameRef}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" placeholder="name@example.com" ref={emailRef}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput1"  ref={passwordRef}/>
            </div>
            <form  onSubmit = {sign} style={{width:`100%`}}>
            <button type="submit" className="btn btn-success">Sign Up</button>
            </form>

        </div>
    );
}

export default SignUp;