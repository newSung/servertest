import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function LoginPage() {

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")

    const navigate = useNavigate();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        console.log(Email)
        console.log(Password)

        let body = {
            email: Email,
            password: Password
        }

        axios.post('/api/users/login', body)
            .then((response => {
                if (!response.data.loginSuccess) {
                    alert(response.data.message)
                }
                else (navigate('/after'))
            }))
    }

    const onRegisterHandler = (event) => {
        navigate('/register')
    }

    return (
        <div className="container-fluid" >
            <nav className="navbar navbar-expand-lg bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Project</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav" >
                            <li className="nav-item " >
                                <a className="nav-link" href="/register">회원가입</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
            <div style={{ border: '1px solid black', marginRight: '30%', marginLeft: '30%', marginTop: '5%', padding: '10px' }}>
                <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={onSubmitHandler}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="Email" value={Email} onChange={onEmailHandler} />
                        </div>
                    </div>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="inputPassword" value={Password} onChange={onPasswordHandler} />
                        </div>
                    </div>
                    <div className="col-auto  d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mb-3">로그인</button>
                    </div>

                </form>
                <div className="col-auto  d-flex justify-content-center">
                    <button type="submit" className="btn btn-primary mb-3" onClick={onRegisterHandler}>회원가입</button>
                </div>
            </div>

        </div >

    )
}

export default LoginPage