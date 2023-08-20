import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios'
import { useEffect } from "react";

import "../../css/Modal2.css"
function MyRequests() {
    const [flist, setFlist] = useState([])
    const [clicked, setClicked] = useState(false)
    const [flen, setFlen] = useState(0)
    const [isloading, setIsloading] = useState(true)

    useEffect(() => {
        setIsloading(true)
        axios.get(`/api/friendrequest/read`)
            .then(response => {
                setFlen(response.data.length)
                console.log(flen)
                setFlist(response.data)
                setIsloading(false)
            })


    }, [clicked])

    const onAcceptHandler = (event, id) => {

        axios.post(`/api/friendrequest/addfriend/${id}`)
            .then(response => {
                console.log(response)
                setClicked(!clicked)
            })

    }
    const onRefuseHandler = (event, id) => {
        console.log(id)

        axios.delete(`/api/friendrequest/delete/${id}`)
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
                        <div>신청없음</div>
                    )
                        : (
                            flist.map((item) => (
                                <div key={item._id} style={{ border: 'solid 1px black', width: '250px', display: 'flex', justifyContent: 'space-between' }}>
                                    <span >{item.from}</span>
                                    <div >
                                        < button type="button" style={{ margin: '0 5px' }} onClick={(event) => onAcceptHandler(event, item._id)}>수락</button>
                                        < button type="button" onClick={(event) => onRefuseHandler(event, item._id)}>거부</button>
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
export default MyRequests