import React, { useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import Header2 from '../Header/Header2';

function ShowDiaryPage() {

    const [NewDiary, setNewDiary] = useState("")
    const [Title, setTitle] = useState("")
    const [User, setUser] = useState("")
    const title = useLocation().state.ptitle;
    const diary = useLocation().state.pdiary;
    const writer = useLocation().state.pwriter;
    const id = useLocation().state.p_id;
    const navigate = useNavigate();
    let sbt = null;

    useEffect(() => {
        axios.get('/api/users/auth').then(
            response => {
                setUser(response.data.username)
            }
        )

    }, [])

    const onEditHandler = (event) => {
        event.preventDefault();
        navigate('/newdiary', { replace: true, state: { ptitle: title, pdiary: diary, pwriter: writer, p_id: id } })
    }

    const onDeleteHandler = (event) => {
        event.preventDefault();
        console.log(id)
        let body = {
            _id: id
        }
        axios.delete('/api/diary/delete', { data: body })
            .then((response => {
                console.log(response)
                navigate('/after')
            }))
    }

    if (User === writer) {
        sbt = <div><button type="submit" className="btn btn-primary mb-3" onClick={onEditHandler}>수정하기</button><button type="submit" className="btn btn-primary mb-3" onClick={onDeleteHandler}>삭제하기</button></div>
    }

    const onNewDiaryHandler = (event) => {
        setNewDiary(event.currentTarget.value)
    }

    return (
        <div className="container-fluid">
            <Header2 />
            <div style={{ border: '1px solid black', marginRight: '30%', marginLeft: '30%', marginTop: '5%', padding: '20px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', }} >
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label" style={{ marginTop: '-5px' }}>Title</label>
                        <div className="col-sm-10" >
                            <input readOnly type="title" className="form-control" id="Title" value={title} onChange={onNewDiaryHandler} />
                        </div>
                    </div>
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label" style={{ marginTop: '-10px' }}>Diary</label>
                        <div className="col-sm-10" >
                            <textarea readOnly type="newdiary" className="form-control" id="Diary" style={{ height: '200px' }} value={diary} onChange={onNewDiaryHandler}></textarea>
                        </div>
                    </div>
                </form>
                <div className="col-auto  d-flex justify-content-center">
                    {sbt}
                </div>
            </div>
        </div >
    )
}

export default ShowDiaryPage