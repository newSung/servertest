import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Header2 from '../Header/Header2';
import { useEffect } from "react";

function NewDiaryPage() {

    const [NewDiary, setNewDiary] = useState("")
    const [Title, setTitle] = useState("")
    const [condition, setCondition] = useState(true)



    const navigate = useNavigate();

    const writer = useLocation().state.pwriter;
    const diary = useLocation().state.pdiary;
    const title = useLocation().state.ptitle;
    const id = useLocation().state.p_id;

    useEffect(() => {
        if (writer !== '') {
            setCondition(false)
        }
        setNewDiary(diary)
        setTitle(title)

    }, [])


    const onNewDiaryHandler = (event) => {
        setNewDiary(event.currentTarget.value)
    }
    const ontitleHandler = (event) => {
        setTitle(event.currentTarget.value)
    }
    const onSaveHandler = (event) => {

        event.preventDefault();
        const date = new Date();

        var year = date.getFullYear();
        var month = ('0' + (date.getMonth() + 1)).slice(-2);
        var day = ('0' + date.getDate()).slice(-2);

        var hours = ('0' + date.getHours()).slice(-2);
        var minutes = ('0' + date.getMinutes()).slice(-2);
        var seconds = ('0' + date.getSeconds()).slice(-2);

        var dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

        axios.get('/api/users/auth')
            .then(response => {

                if (condition === true) {
                    let body = {
                        title: Title,
                        diary: NewDiary,
                        date: dateString,
                        username: response.data.username
                    }
                    axios.post('/api/diary/write', body)
                        .then((response => {
                            navigate('/after')
                        }))
                }
                else {
                    let body = {
                        title: Title,
                        diary: NewDiary,
                        date: dateString,
                        username: response.data.username,
                        _id: id
                    }
                    axios.put('/api/diary/update', body)
                        .then((response => {
                            navigate('/after')
                        }))
                }
            })
    }

    return (
        <div className="container-fluid">
            <Header2 />
            <div style={{ border: '1px solid black', marginRight: '30%', marginLeft: '30%', marginTop: '5%', padding: '20px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', }} >
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label" style={{ marginTop: '-5px' }}>Title</label>
                        <div className="col-sm-10" >
                            <input type="title" className="form-control" id="Title" value={Title} onChange={ontitleHandler} />
                        </div>
                    </div>
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label" style={{ marginTop: '-10px' }}>Diary</label>
                        <div className="col-sm-10" >
                            <textarea type="newdiary" className="form-control" id="Diary" style={{ height: '200px' }} value={NewDiary} onChange={onNewDiaryHandler}></textarea>

                        </div>
                    </div>
                </form>
                <div className="col-auto  d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mb-3" onClick={onSaveHandler}>작성하기</button>
                </div>

            </div>



        </div >

    )
}

export default NewDiaryPage