import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from "react";
// import "../../css/MainPage.css"
function MyAccount() {


    const [Email, setEmail] = useState("")
    const [UserName, setUserName] = useState("")
    const [RegisterDate, setRegisterDate] = useState("")

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpen2, setIsModalOpen2] = useState(false);

    const [Curpw, setCurpw] = useState("")
    const [Newpw, setNewpw] = useState("")
    const [Chkpw, setChkpw] = useState("")

    const navigate = useNavigate();

    useEffect(() => {
        axios.get('/api/users/auth')
            .then(response => {
                setUserName(response.data.username)
                setRegisterDate(response.data.registerDate)
                console.log(response.data.registerDate)
                setEmail(response.data.email)
            })
    }, [])

    const onCurpwHandler = (event) => {
        setCurpw(event.currentTarget.value)
    }
    const onNewpwHandler = (event) => {
        setNewpw(event.currentTarget.value)
    }
    const onChkpwHandler = (event) => {
        setChkpw(event.currentTarget.value)
    }

    const CancelHandler = () => {
        setIsModalOpen(false)
        setIsModalOpen2(false)
        setChkpw("")
        setNewpw("")
        setCurpw("")
    }


    const accountDeleteHandler = () => {
        setIsModalOpen(true)
    }
    const onChangePasswordHandler = () => {
        setIsModalOpen2(true)
    }
    const onDeleteAccount = () => {

        let body = {
            curpw: Curpw
        }


        axios.delete('/api/users/delete', { data: body })
            .then(response => {
                if (response.data.loginSuccess === false)
                    alert(response.data.message)
                if (response.data.success === true)
                    navigate('/')
            })

    }
    const onChangePassword = () => {

        console.log(Curpw, Newpw, Chkpw)
        if (Curpw === "" || Newpw === "" || Chkpw === "") {
            alert("비밀번호를 입력해 주세요")
        }
        else if (Newpw !== Chkpw) {
            alert("새로운 비밀번호와 비밀번호 확인이 다릅니다")
        }
        else {
            let body = {
                curpw: Curpw,
                newpw: Newpw,
                chkpw: Chkpw

            }


            axios.put('/api/users/change', body)
                .then(response => {
                    if (response.data.loginSuccess === false)
                        alert(response.data.message)
                    if (response.data.loginSuccess2 === false)
                        alert(response.data.message)
                    if (response.data.success === true) {
                        alert("비밀번호가 변경되었습니다")
                        CancelHandler()
                    }
                })
        }


    }

    return (
        <div className="container-fluid">


            <form style={{ display: 'flex', flexDirection: 'column', }}>
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Email</label>
                    <div className="col-sm-10">
                        <input readOnly type="email" className="form-control" id="Email" value={Email} />
                    </div>
                </div>
                <div className="mb-3 row" style={{ marginTop: '10px' }}>
                    <label className="col-sm-2 col-form-label">UserName</label>
                    <div className="col-sm-10">
                        <input readOnly type="username" className="form-control" id="UserName" value={UserName} />
                    </div>
                </div>
                <div className="mb-3 row" style={{ marginTop: '10px' }}>
                    <label className="col-sm-2 col-form-label">RegisterDate</label>
                    <div className="col-sm-10">
                        <input readOnly type="registerDate" className="form-control" id="InputPassword" value={RegisterDate} />
                    </div>
                </div>
            </form>
            <button type="" onClick={onChangePasswordHandler}>비밀번호 변경</button>
            {isModalOpen2 && (
                <div className="modal">
                    <div className="modal-content">
                        <label>현재비밀번호</label>
                        <input type="" name="curpw" value={Curpw} onChange={onCurpwHandler} />
                        <label>새 비밀번호</label>
                        <input type="" name="newpw" value={Newpw} onChange={onNewpwHandler} />
                        <label>비밀번호 확인</label>
                        <input type="" name="chkpw" value={Chkpw} onChange={onChkpwHandler} />
                        <button onClick={CancelHandler}>취소</button>
                        <button onClick={onChangePassword}>변경하기</button>
                    </div>
                </div>
            )}
            <button type="" onClick={accountDeleteHandler}>회원 탈퇴</button>
            {isModalOpen && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>정말로 탈퇴하시겠습니까?</h3>
                        <label>현재비밀번호</label>
                        <input type="" name="curpw" value={Curpw} onChange={onCurpwHandler} />
                        <button onClick={CancelHandler}>취소</button>
                        <button onClick={onDeleteAccount}>탈퇴하기</button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default MyAccount