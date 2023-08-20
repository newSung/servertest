import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
function RegisterPage() {

    const [Email, setEmail] = useState("")
    const [UserName, setUserName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfrimPassword, setConfrimPassword] = useState("")

    const navigate = useNavigate();


    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfrimPasswordHandler = (event) => {
        setConfrimPassword(event.currentTarget.value)
    }
    const onUserNameHandler = (event) => {
        setUserName(event.currentTarget.value)
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if (Password !== ConfrimPassword) {

        }
        else {
            const date = new Date();

            var year = date.getFullYear();
            var month = ('0' + (date.getMonth() + 1)).slice(-2);
            var day = ('0' + date.getDate()).slice(-2);

            var hours = ('0' + date.getHours()).slice(-2);
            var minutes = ('0' + date.getMinutes()).slice(-2);
            var seconds = ('0' + date.getSeconds()).slice(-2);

            var dateString = year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds;

            let body = {
                email: Email,
                username: UserName,
                password: Password,
                registerDate: dateString
            }

            axios.post('/api/users/register', body)
                .then((response => {
                    if (!response.data.success) {
                        alert("이미 존재하는 email 입니다.")
                    }
                    else (navigate('/login'))

                }))

        }


    }

    return (
        <div className="container-fluid">
            <Header />
            <div style={{ border: '1px solid black', marginRight: '30%', marginLeft: '30%', marginTop: '5%', padding: '10px' }}>
                <form style={{ display: 'flex', flexDirection: 'column', }} onSubmit={onSubmitHandler}>
                    <div className="mb-3 row">
                        <label className="col-sm-2 col-form-label">Email</label>
                        <div className="col-sm-10">
                            <input type="email" className="form-control" id="Email" value={Email} onChange={onEmailHandler} />
                        </div>
                    </div>
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label">UserName</label>
                        <div className="col-sm-10">
                            <input type="username" className="form-control" id="UserName" value={UserName} onChange={onUserNameHandler} />
                        </div>
                    </div>
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label">Password</label>
                        <div className="col-sm-10">
                            <input type="password" className="form-control" id="InputPassword" value={Password} onChange={onPasswordHandler} />
                        </div>
                    </div>
                    <div className="mb-3 row" style={{ marginTop: '10px' }}>
                        <label className="col-sm-2 col-form-label" style={{ marginTop: '-10px' }}>Confrim Password</label>
                        <div className="col-sm-10" >
                            <input type="password" className="form-control" id="ConfirmPassword" value={ConfrimPassword} onChange={onConfrimPasswordHandler} />
                        </div>
                    </div>
                    <div className="col-auto  d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mb-3">회원가입</button>
                    </div>
                </form>
            </div>
        </div >

    )
}

export default RegisterPage