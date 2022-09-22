import React from 'react';

function Login(props) {
    return (
        <div className='card' style={{width: 18 + 'rem', padding: 1 + 'rem', margin:`1rem .5rem`}}>
            <h2>Sign In</h2>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Email address</label>
                <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="name@example.com"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleFormControlInput1" className="form-label">Password</label>
                <input type="password" className="form-control" id="exampleFormControlInput1"/>
            </div>
        </div>
    );
}

export default Login;