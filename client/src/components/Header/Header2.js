import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'


function Header2() {

    const navigate = useNavigate();
    const [fname, setFname] = useState("")
    const [test, setTest] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);

    const onLogoutHandler = (event) => {

        axios.get('/api/users/logout')
            .then((response => {
                navigate('/')
            }))
    }
    const onMyPageHandler = (event) => {

        navigate('/mypage')
    }

    const handleOpenModal = (event) => {
        event.preventDefault();
        if (fname === "") {
            alert("찾을 친구를 입력해 주세요")

        }
        else {

            axios.get(`/api/users/search/${fname}`)
                .then((response => {
                    console.log(response.data)
                    if (response.data === 'User not found') {
                        alert("검색한 친구가 없습니다.")
                    }
                    else {
                        setIsModalOpen(true);
                        setTest(response.data.username)
                    }
                }))
        }
    };

    const addFriendHandler = () => {
        let user = ""
        axios.get('/api/users/auth')
            .then(response => {
                user = response.data.username
                if (user === fname) {
                    setFname("")
                    setIsModalOpen(false)
                    alert("본인을 추가할수 없습니다")

                } else {
                    let body = {
                        username: fname,
                        from: user
                    }
                    axios.post('/api/friendrequest/add', body)
                        .then(response => {
                            if (response.data.success === false) {
                                alert("이미 친구신청을 보냈습니다.")
                                setIsModalOpen(false)
                                setFname("")
                            }
                            else if (response.data.err === "이미 친구입니다") {
                                setFname("")
                                setIsModalOpen(false)
                                alert("이미 친구입니다.")
                            }
                            else {
                                setFname("")
                                setIsModalOpen(false)
                            }
                        })
                }
            })



    };


    const onFnameHandler = (event) => {
        setFname(event.target.value)
        console.log(fname)
    }

    return (
        <div className="container-fluid" style={{ border: '1px solid red' }}>
            <nav className="navbar navbar-expand-lg bg-light fixed-top" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Project</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex" role="search" onSubmit={handleOpenModal}>
                        <input className="form-control me-2" type="search" placeholder="친구찾기" aria-label="Search" value={fname} onChange={onFnameHandler} />
                        <button className="btn btn-outline-success" type="submit" >search</button>
                    </form>
                    {/* <div className="collapse navbar-collapse d-flex justify-content-start" id="navbarNav">
                        

                    </div> */}
                    {isModalOpen && (
                        <div className="modal">
                            <div className="modal-content">
                                <h1>{test}</h1>
                                <button onClick={addFriendHandler}>친구추가</button>
                                <button onClick={() => setIsModalOpen(false)}>닫기</button>
                            </div>
                        </div>
                    )}

                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav" >
                            <li className="nav-item" >
                                <button type="button" style={{ border: 'none', backgroundColor: '#f8f9fa' }} onClick={onMyPageHandler}>마이페이지</button>

                            </li>
                            <li className="nav-item" >
                                <button type="button" style={{ border: 'none', backgroundColor: '#f8f9fa' }} onClick={onLogoutHandler}>로그아웃</button>

                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header2