import React, {useRef} from 'react';
import { useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
    const userData = useSelector((state)=> state.userData);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const navigate = useNavigate();
    const users = () =>{
        let user = {
            "email":emailRef.current.value,
            "password":passwordRef.current.value
        }
        console.log(user);
        emailRef.current.value="";
        passwordRef.current.value="";

        axios.post('api/users/login', user)
        .then(response => console.log(response.data));
        // axios.get('')
        navigate('/');
    }
    return (
        <div className='card' style={{width: 18 + 'rem', padding: 1 + 'rem', margin:`1rem auto`}}>
            <h2>Sign In</h2>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" placeholder="name@example.com" ref={emailRef}/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" className="form-control" ref={passwordRef}/>
            </div>
            <button type="button" className="btn btn-success" onClick={()=>{
                users();
            }}>Join</button>
        </div>
    );
}

export default Login; 