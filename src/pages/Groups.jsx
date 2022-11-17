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
import gator from '../Styles/uf_gator_groups.png';


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
            <div style={{marginLeft: '5vh', height: 'auto' }}>
                <FixedSizeList
                    height={650} //650
                    width="60vw"
                    itemSize={207} //207
                    itemCount={currentStudents.length}
                    className="list-container"
                >
                    {Row}
                </FixedSizeList>
                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '42.5vw', top: '28vh', height: '66.7vh', width: '9vw', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                {isShownGroupChosen &&
                    <div className='rectangleGroup' style={{position:'absolute', left:'64vw', top:'44vh', width:'15vw'}}>
                        <h1 style={{fontSize:'1.8vw', textAlign:'center'}}>Group Joined Successfully!</h1>
                    </div>

                }
                {/* {isShownGroupChosen &&
                        <div className='chooseGroupRect' style={{position:'absolute', left:'45vw', top:'20vh'}}>
                            <div className='chooseGroupText' style={{ left: '0vw', top: '20vh', backgroundColor:'rgba(0,0,0,0)', width:'15vw', height:'15vh'}}>
                                <h1 style={{ marginTop: '3vh' , fontSize:'1.8vw'}}>Group Joined Successfully!</h1>
                            </div>
                        </div>
                } */}
            </div>
            <img src={gator} style={{ position: 'absolute', left: '64vw', top: '50vh', width:'35vw', height:'48vh'}} />
            <button className='buttonCool'
                style={{
                    position: 'absolute', left: '65%', top: '24%',
                    padding: '3vh 3vw', fontSize: '1.5vw', backgroundColor: '#FA4616', borderColor: 'rgb(0,0,0)'
                }}
                onClick={clearFilters}>
                Clear Filters
            </button>
            <button className='buttonCool'
                style={{
                    position: 'absolute', left: '83%', top: '23.8%',
                    padding: '3vh 4vw', fontSize: '1.5vw', backgroundColor: '#FA4616', borderColor: 'rgb(0,0,0)'
                }}
                onClick={() => navigate("/Home")}>
                Go Home
            </button>
        </>
    );
};

export default Groups;