import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Header2 from '../Header/Header2';
import Modal2 from '../Modal/Modal'
import "../../css/Modal2.css"
function Myfriends() {
    const [flist, setFlist] = useState([])
    const [clicked, setClicked] = useState(false)
    const [flen, setFlen] = useState(0)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        setIsloading(true)
        axios.get('/api/users/auth')
            .then(response => {
                setFlen(response.data.friends.length)
                setFlist(response.data.friends)
                setIsloading(false)
            })
    }, [clicked])

    const onDeleteHandler = (event, id) => {

        axios.delete(`/api/users/frienddelete/${id}`)
            .then((response => {
                console.log(response)
                setClicked(!clicked)
            }))
    }
    return (
        <div className="container-fluid" >
            <div>
                {isloading ? null
                    : (flen === 0 ? (
                        <div>친구없음</div>
                    )
                        : (
                            flist.map((item) => (
                                <div key={item} style={{ border: 'solid 1px black', width: '250px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span >{item}</span>
                                    <div >
                                        < button type="button" onClick={(event) => onDeleteHandler(event, item)}>삭제하기</button>
                                    </div>
                                </div>
                            ))
                        )
                    )
                }

            </div>
        </div >

    )
}

export default Myfriends