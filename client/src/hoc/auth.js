import axios from "axios";
import React, {useEffect} from "react";
import { Navigate, useNavigate } from "react-router-dom";

export default function(SpecificComponent, option, adminRoute = null) {
    const AuthenticationCheck = (props)=>{
        const navigate = useNavigate();
        useEffect(()=>{
            axios.get('/api/users/auth')
            .then(response => {
                //로그인 하지 않은 상태
                if(!response.data.isAuth){
                    if(option){
                        Navigate('/login');
                    }
                }//로그인 한 상태
                else{
                    //일반유저
                    if(adminRoute && !response.data.isAdmin){
                        navigate('/');
                    }else{
                        if(option === false){
                            navigate('/');
                        }
                    }
                }
            });
        },[]);
        return (<SpecificComponent/>)
    };
    return <AuthenticationCheck/>;
};