import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { FixedSizeList } from "react-window";
import ReactDOM from 'react-dom';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import axios from 'axios';
import gator from '../Styles/uf_gator_filters.png';
import ListComponent from '../component/ListComponent';
import RowComponent from '../component/RowComponent';


const Groups = () => {
    const navigate = useNavigate();
    //const [currGroupNum, setCurrGroupNum] = useState([]);
    const [currentStudents, setCurrentStudents] = useState([]);
    let classes = ["Calc 1", "Stats", "Data"];
    let group_sizes = ["3", "2", "5"];
    let languages = ["English", "Hindi", "French"];
    let majors = ["Computer Science", "Political Science", "Business"];
    let pics = [process.env.PUBLIC_URL + "/pictures/Jake.jpg", process.env.PUBLIC_URL + "/pictures/Liron.jpg", process.env.PUBLIC_URL + "/pictures/Seggev.jpg"];
    let places = ["Library West", "Marston Library", "Online"];
    let place_types = ["Library"];
    let study_roles = ["Study Buddy", "Study Buddy", "Tutor"];
    let times = ["2000", "1800", "1500"];
    let names = ["Jake Watson", "Liron", "Seggev"];

    const Row = ({ index, style }) => (
        <RowComponent name={currentStudents[index]?.name} num={index} style={style} />
    );

    const getGroupNum = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/done_filtering');
        const response = await axios.get(url);
        console.log(response.data);
        // setCurrGroupNum(response.data.number_of_students);
        setCurrentStudents(response.data.students);
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
                <h1>Choose a Group!</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '10vh' }}>
                <img className='imgAvatar' src={pics[0]}></img>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FixedSizeList
                    height={650}
                    width={1200}
                    itemSize={1200}
                    itemCount={pics.length}
                    className="list-container"
                >
                    {Row}
                    {/* {currentStudents.map((student, index) => {
                        return (
                            <div key={`${student.name}-${index}`}>
                                <h3>{student.name}</h3>
                            </div>
                        );
                    })} */}
                </FixedSizeList>
            </div>
        </>
    );
};

export default Groups;