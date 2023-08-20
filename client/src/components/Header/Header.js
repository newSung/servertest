import React from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';

function Header() {

    const navigate = useNavigate();

    return (
        <div className="container-fluid" style={{ border: '1px solid red' }}>
            <nav className="navbar navbar-expand-lg bg-light fixed-top" >
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">My Project</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    {/* <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form> */}
                    <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarNav">
                        <ul className="navbar-nav" >
                            <li className="nav-item" >
                                <a className="nav-link" href="/login" >로그인</a>
                            </li>
                            <li className="nav-item " >
                                <a className="nav-link" href="/register">회원가입</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Header