
import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import Header from '../Header/Header';
import { Container, Table, Button } from "react-bootstrap";
function LandingPage() {

    const navigate = useNavigate();

    const [amount, setAmount] = useState(10)
    const [active, setActive] = useState("1");
    const [sort, setSort] = useState('1');



    const onSelect = (e) => {
        setAmount(e.target.value)
        setActive("1");
    }
    const onSelectSort = (e) => {
        setSort(e.target.value)
    }



    return (
        <div className="container-fluid" >
            <Header />
            <div>
                <Container style={{ paddingTop: 100 }}>

                    <div style={{ textAlign: "right", marginBottom: 5 }}>
                        <select onChange={onSelect}>
                            <option value='10'> 10개 보기</option>
                            <option value='15'> 15개 보기</option>
                            <option value='20'> 20개 보기</option>
                        </select>
                        <select onChange={onSelectSort}>
                            <option value='1'> 오름차순</option>
                            <option value='0'> 내림차순</option>
                        </select>
                    </div>
                    <Table striped bordered hover size="sm" >
                        <thead>
                            <tr style={{ fontSize: 20 }}>
                                <th style={{ width: 40 }}>#</th>
                                <th>Method</th>
                                <th>URL</th>
                                <th>Description</th>
                            </tr>
                        </thead>
                        <tbody id="diaryTable">
                            <tr key='1'>< th>1</th><th >POST</th><th>/api/users/register</th><th>회원가입</th></tr >
                            <tr key='2'>< th>2</th><th >POST</th><th>/api/users/login</th><th>로그인</th></tr >
                            <tr key='3'>< th>3</th><th >GET</th><th> /api/users/logout</th><th> 로그아웃</th></tr >
                            <tr key='4'>< th>4</th><th >PUT</th><th>/api/users/change</th><th>비밀번호 변경</th></tr >
                            <tr key='5'>< th>5</th><th >DELETE</th><th>/api/users/delete </th><th>회원탈퇴</th></tr >
                            <tr key='6'>< th>6</th><th >GET</th><th> /api/users/auth</th><th>인증처리</th></tr >
                            <tr key='7'>< th>7</th><th >DELETE</th><th> /api/users/frienddelete/:username</th><th> 친구 삭제</th></tr >
                            <tr key='8'>< th>8</th><th >GET</th><th> /api/users/search/:username</th><th> 친구검색</th></tr >
                            <tr key='99'>< th></th><th ></th><th> </th><th> </th></tr >

                            <tr key='9'>< th>9</th><th >POST</th><th>/api/diary/write </th><th> 일기 작성</th></tr >
                            <tr key='10'>< th>10</th><th >GET</th><th>/api/diary/read </th><th>일기 읽기 </th></tr >
                            <tr key='11'>< th>11</th><th >PUT</th><th> /api/diary/update</th><th> 일기 수정</th></tr >
                            <tr key='12'>< th>12</th><th >DELETE</th><th> /api/diary/delete</th><th> 일기 삭제</th></tr >
                            <tr key='100'>< th></th><th ></th><th> </th><th> </th></tr >

                            <tr key='13'>< th>13</th><th >POST</th><th>/api/friendrequest/add </th><th>친구 요청 </th></tr >
                            <tr key='14'>< th>14</th><th >DELETE</th><th> /api/friendrequest/delete/:_id</th><th>친구요청 거절</th></tr >
                            <tr key='15'>< th>15</th><th >POST</th><th> /api/friendrequest/addfriend/:_id</th><th> 친구요청 수락</th></tr >
                            <tr key='16'>< th>16</th><th >GET</th><th> /api/friendrequest/read</th><th> 친구 요청 확인</th></tr >



                        </tbody>
                    </Table>
                    <div id="pageBtn" style={{ textAlign: "center" }}>
                    </div>
                    {/* <div style={{ textAlign: "right", paddingTop: 10 }}>
                        <Button variant="outline-dark" onClick={onNewDiaryHandler}>New Dairy</Button>
                    </div> */}
                </Container >
            </div >
        </div >


    )
}

export default LandingPage