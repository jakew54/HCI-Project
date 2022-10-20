import React, { useState, useCallback, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { FixedSizeList } from "react-window";
import ReactDOM from 'react-dom';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import axios from 'axios';
import ListComponent from '../component/ListComponent';
import RowComponent from '../component/RowComponent';
import gator from '../Styles/uf_gator_filters.png';


const Groups = () => {
    const navigate = useNavigate();
    const [currGroupNum, setCurrGroupNum] = useState([]);
    const [currentStudents, setCurrentStudents] = useState([]);
    const [isShownGroupChosen, setIsShownGroupChosen] = useState(false);

    useEffect(() => {
        getGroupNum(); //set flag to make it only call a few times
    }, []);

    const Row = ({ index, style }) => (
        <RowComponent name={currentStudents[index]?.name} major={currentStudents[index]?.major}
            class_name={currentStudents[index]?.class_name} place={currentStudents[index]?.place}
            time={currentStudents[index]?.time.toString()} language={currentStudents[index]?.language}
            study_role={currentStudents[index]?.study_role} group_size={currentStudents[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudents[index]?.picture)}
            num={index} style={style} />
    );

    const getGroupNum = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/done_filtering');
        const response = await axios.get(url);
        console.log(response.data);
        setCurrGroupNum(response.data.number_of_students);
        setCurrentStudents(response.data.students);
    });

    const clearFilters = useCallback(async () => {
        setIsShownGroupChosen(false);
        const url = new URL('http://127.0.0.1:8000/clear_filters');
        const response = await axios.get(url);
        console.log(response.data);
        setCurrGroupNum(response.data.number_of_students);
        setCurrentStudents(response.data.students);
    });

    return (
        <>
            <div className="headerFilters">
                <h1 style={{ fontSize: '54px' }}>There are {currGroupNum} that match your preferences!</h1>
            </div>
            <div style={{ display: 'flex', alignItems: 'left', justifyContent: 'left', marginLeft: '5vh' }}>
                <FixedSizeList
                    height={650}
                    width={1118}
                    itemSize={207}
                    itemCount={currentStudents.length}
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
                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '92vh', top: '20vh', height: '66.7vh', width: '17.5vh', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                {isShownGroupChosen &&
                        <div className='chooseGroupRect' style={{position:'absolute', left:'70vh', top:'20vh'}}>
                            <div className='chooseGroupText' style={{ left: '2vh', top: '20vh' }}>
                                <h1 style={{ marginTop: '3vh' }}>Group Joined Successfully!</h1>
                            </div>
                        </div>
                }
            </div>
            <img src={gator} style={{ position: 'absolute', left: '68%', top: '45%' }} />
            <div style={{ position: 'absolute', left: '89.7%', top: '50.5%', textAlign: 'center' }}>
                <h2 style={{ margin: 0, fontSize: 30 }}>How can I</h2>
                <h2 style={{ margin: 0, fontSize: 30 }}>help you?</h2>
            </div>
            <button className='buttonCool'
                style={{
                    position: 'absolute', left: '65%', top: '24%',
                    padding: '30px 60px', fontSize: '20px', backgroundColor: '#FA4616', borderColor: 'rgb(0,0,0)'
                }}
                onClick={clearFilters}>
                Clear Filters
            </button>
            <button className='buttonCool'
                style={{
                    position: 'absolute', left: '83%', top: '23.8%',
                    padding: '30px 60px', fontSize: '20px', backgroundColor: '#FA4616', borderColor: 'rgb(0,0,0)'
                }}
                onClick={() => navigate("/Home")}>
                Return Home
            </button>
        </>
    );
};

export default Groups;