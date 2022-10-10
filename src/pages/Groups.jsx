
import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

const Groups = () => {
    const navigate = useNavigate();
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <h1>Available groups</h1>
            </div>
            This is where the groups will be displayed. I imagine we will keep track of each group in the backend
            or if we want to hardcode it we could also just do it in the frontend.
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <Button onClick={() => navigate("/")}>Home</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Filters")}>Return to filters</Button>
            </div>
        </div>
    );
};

export default Groups;