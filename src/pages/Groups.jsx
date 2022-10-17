import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import axios from 'axios';
import gator from '../Styles/uf_gator_filters.png';


const Groups = () => {
    const navigate = useNavigate();
    //const [currGroupNum, setCurrGroupNum] = useState([]);
    let classes = [];
    let group_sizes = [];
    let languages = [];
    let majors = [];
    let pics = [];
    let places = [];
    let place_types = [];
    let study_roles = [];
    let times = [];
    let names = [];

    /*const getGroupNum = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/done_filtering');
        const response = await axios.get(url);
        console.log(response.data);
        for (let i = 0; i < response.data.students.length; i++) {
            if (!(names.length > response.data.students.length)) {
                //setNames(names => [...names, response.data.students[i].name]);
            }
        }
        console.log(names);
        setCurrGroupNum(response.data.students.length);
        //setCurrentStudents(response.data.students[0]);
    });*/

    //getGroupNum(); //set flag to make it only call a few times
    return (
        <>
            <div className="headerFilters">
                <h1>Choose a Group!</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <Button onClick={() => navigate("/Groups")}>DONE!</Button>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '60vh' }}>
                <img src={gator} />
                <div style={{ position: 'absolute', left: '46.5vh', top: '30.5vh', inlineSize: '24vh', textAlign: 'center' }}>
                    <h2 style={{ marginBottom: '-2vh' }}>There are</h2>
                    <h2 style={{ marginTop: '-2vh' }}>groups that match you!</h2>
                </div>
            </div>
        </>
    );
};

export default Groups;