import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import axios from 'axios'

export default function aa(SpecificComponent, option, adminRoute = null) {
    //option
    //null => 아무나 출입이 가능한 페이지
    //true => 로그인한 유저만 출입이 가능한 페이지
    //false => 로그인한 유저는 출입 불가능
    function AuthenticationCheck(props) {

        const navigate = useNavigate();

        useEffect(() => {
            axios.get('/api/users/auth')
                .then(response => {
                    //로그인 x
                    if (!response.data.isAuth) {
                        if (option) {
                            //로그인 하지 않은 사람이 로그인 필요한 페이지 들어가려고함
                            alert("로그인이 필요한 페이지 입니다")
                            navigate('/login')
                        }
                    } else {
                        //로그인 o
                        if (adminRoute && !response.data.isAdmin) {
                            //로그인 했지만 관리자x
                            navigate('/after')
                        } else {
                            if (option === false) {
                                //로그인한 유저는 출입 불가
                                navigate('/after')
                            }
                        }
                    }
                })

        }, []);

        return (
            <SpecificComponent /> // component return이 없으면 React 실행이 안됨.
        );
    }

    return AuthenticationCheck;
}