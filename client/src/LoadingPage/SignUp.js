
import React,{useRef} from 'react';
// import { useSelector,useDispatch } from 'react-redux';
// import {setName, setEmail, setPassword} from './../State/userSlice';
import axios from 'axios';

const SignUp = () => {
    // const userData = useSelector((state)=>state.userData);
    // const dispatch = useDispatch();
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
const sign = async ()=>{
try{
    // dispatch(setName(nameRef.current.value));
    // dispatch(setEmail(emailRef.current.value));
    // dispatch(setPassword(passwordRef.current.value));
    // let body = userData;
    let body = {
        "name":nameRef.current.value,
        "email":emailRef.current.value,
        "password":passwordRef.current.value
    }
    console.log(body);
    const result = await  axios.post('/api/users/register', body)
    .then(response => response.data);
}catch(err){
    console.log(err);
}

   

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
            <button onClick={()=>{
                sign();
            }} className="btn btn-success">Sign Up</button>

        </div>
    );
}

export default SignUp;