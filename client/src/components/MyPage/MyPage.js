import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Header2 from '../Header/Header2';
import "../../css/MainPage.css"
import MyAccount from "../MyPage/MyAccount"
import Myfriends from "./Myfriends"
import MyRequests from './MyRequests';

function MyPage() {

    const [selected, setSelected] = useState(0)


    const onClickHandler1 = (event) => {
        setSelected(0)
    }

    const onClickHandler2 = (event) => {
        setSelected(1)
    }
    const onClickHandler3 = (event) => {
        setSelected(2)
    }

    return (
        <div className="container-fluid">
            <Header2 />
            <div className='parent'>
                <div className="first">
                    <div>
                        <button className="btnnn" type="" onClick={onClickHandler1}>내 정보</button>
                    </div>
                    <div >
                        <button className="btnnn" type="" onClick={onClickHandler2} >친구 관리</button>
                    </div>
                    <div>
                        <button className="btnnn" type="" onClick={onClickHandler3} >친구 신청</button>
                    </div>
                </div>
                <div className="second">
                    {
                        selected === 0
                            ? < MyAccount />
                            : (selected === 1
                                ? < Myfriends />
                                : <MyRequests />)
                    }

                </div>
            </div>
        </div>
    )
}

export default MyPage