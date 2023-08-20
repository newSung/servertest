import React, { useState } from 'react'
import 'bootstrap/dist/css/bootstrap.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import { useEffect } from "react";
import { Container, Table, Button } from "react-bootstrap";
import Header2 from '../Header/Header2';

function LandingPage2() {

    const navigate = useNavigate();
    const [amount, setAmount] = useState(10)
    const [active, setActive] = useState("1");
    const [btns, setBtns] = useState(1);
    const [cnt, setCnt] = useState(0);
    const [test, setTest] = useState('');
    const [sort, setSort] = useState('1');
    let dList
    useEffect(() => {
        axios.get(`/api/diary/read`)
            .then(response => {
                setTest(response.data)
                setCnt(response.data.length)
            })

    }, [])

    // const onLogoutHandler = (event) => {

    //     axios.get('/api/users/logout')
    //         .then((response => {
    //             navigate('/')
    //         }))
    // }
    const onClickHandler = (e) => {
        // console.log(Object.entries(test)[e.target.title])
        console.log(Object.entries(test)[e.target.title][1].title)
        navigate('/showdiary', { state: { ptitle: Object.entries(test)[e.target.title][1].title, pdiary: Object.entries(test)[e.target.title][1].diary, pwriter: Object.entries(test)[e.target.title][1].username, p_id: Object.entries(test)[e.target.title][1]._id } })
    }

    const onNewDiaryHandler = () => {
        navigate('/newdiary', { state: { ptitle: '', pdiary: '', pwriter: '', p_id: '' } })
    }

    // const arr = [];
    // for (let i = 0; i < cnt; i++) {
    //     arr[i] = i;
    // }

    const onClickPaging = (e) => {
        setActive(e.target.id);
    }

    const onSelect = (e) => {
        setAmount(e.target.value)
        setActive("1");
    }
    const onSelectSort = (e) => {
        setSort(e.target.value)
    }
    useEffect(() => {
        setBtns(cnt / amount >= 1 ? cnt / amount : 1);
    }, [cnt, amount])

    useEffect(() => {
        const test = document.getElementById("pageBtn");

        while (test.firstChild) {
            test.removeChild(test.firstChild);
        }
        for (let i = 0; i < btns; i++) {
            const button = document.createElement("button");
            button.innerText = `${i + 1}`;
            button.id = `${i + 1}`
            if (i !== 0) { button.className = "button" }


            if (button.id === active) {
                button.style.backgroundColor = "#495057";
                button.style.color = "white";
            }
            button.addEventListener('click', onClickPaging)
            test.appendChild(button);
        }
    }, [btns, active])

    if (sort === '1') {
        dList = Object.entries(test).reverse().slice(active * amount - amount, active * amount).map((item) => <tr key={item[0]} >< th> {cnt - item[0]}</th><th title={item[0]} onClick={onClickHandler}>{item[1].title}</th><th>{item[1].username}</th><th>{item[1].date}</th></tr >);
    }
    else {
        dList = Object.entries(test).slice(active * amount - amount, active * amount).map((item) => <tr key={item[0]} >< th> {cnt - item[0]}</th><th title={item[0]} onClick={onClickHandler}>{item[1].title}</th><th>{item[1].username}</th><th>{item[1].date}</th></tr >);
    }


    return (
        <div className="container-fluid" >
            <Header2 />
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
                                <th>Title</th>
                                <th>Writer</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody id="diaryTable">
                            {dList}
                        </tbody>
                    </Table>
                    <div id="pageBtn" style={{ textAlign: "center" }}>
                    </div>
                    <div style={{ textAlign: "right", paddingTop: 10 }}>
                        <Button variant="outline-dark" onClick={onNewDiaryHandler}>New Dairy</Button>
                    </div>
                </Container >
            </div >
        </div >

    )
}

export default LandingPage2