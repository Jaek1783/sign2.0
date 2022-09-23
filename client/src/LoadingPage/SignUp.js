import React,{useRef} from 'react';

const SignUp = () => {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);
    const user = [];
const sign = ()=>{
    user.push({
        name:nameRef.current.value,
        email:emailRef.current.value,
        password:passwordRef.current.value
    });
    console.log(user);
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
            <button type="button" className="btn btn-success" onClick={()=>{
                sign();
            }}>Sign Up</button>
        </div>
    );
}

export default SignUp;