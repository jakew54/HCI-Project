
import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Filters = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <h1>Choose your preferences</h1>
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
                <Button onClick={() => navigate("/Groups")}>Done!</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/")}>Home</Button>
            </div>
        </div>
    );
};

export default Filters;