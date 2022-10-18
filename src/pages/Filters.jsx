
import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import gator from '../Styles/uf_gator_filters.png';
import axios from 'axios';
import { type } from '@testing-library/user-event/dist/type';


const Filters = () => {
    const navigate = useNavigate();
    const [currGroupNum, setCurrGroupNum] = useState();
    const [currentStudents, setCurrentStudents] = useState([])


    const getGroupNum = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/done_filtering');
        const response = await axios.get(url);
        console.log(response.data);
        setCurrGroupNum(response.data.number_of_students);
        setCurrentStudents(response.data.students);
    });

    const clearFilters = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/clear_filters');
        const response = await axios.get(url);
        console.log(response.data);
        setCurrGroupNum(response.data.number_of_students);
        //setCurrentStudents(response.data.students);
    });

    useEffect(() => {
        getGroupNum(); //set flag to make it only call a few times
    }, []);

    useEffect(() => {
        console.log(currentStudents);
    }, [currentStudents]);

    return (
        <>
            <div className="headerFilters">
                <h1>Choose Your Preferences</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <Button onClick={() => navigate("/Class")}>Class</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/GroupSize")}>Group Size</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Language")}>Language</Button>{' '}
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Major")}>Major</Button>{' '}
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Place")}>Place</Button>{' '}
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/StudyRole")}>Study Role</Button>{' '}
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Time")}>Time</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <Button onClick={() => navigate("/Groups")}>DONE!</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '60vh' }}>
                <img src={gator} />
                <div style={{ position: 'absolute', left: '46.5vh', top: '30.5vh', inlineSize: '24vh', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '-2vh' }}>There are</h2>
                    <h1 style={{ color: '#FA4616' }}>{currGroupNum}</h1>
                    <h2 style={{ marginTop: '-2vh' }}>groups that match you!</h2>
                </div>
            </div>
        </>
    );
};

export default Filters;