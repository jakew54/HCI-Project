import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavbarComponents/index.js";
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';

const Home = () => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
                <h1>Find Your Study Buddy!</h1>
            </div>
            Probably gonna get rid of the navigation bar at the top, just have it for testing currently.
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4vh' }}>
                <Button onClick={() => navigate("/Login")}>List yourself</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Filters")}>Find a study buddy</Button>
            </div>
        </>
    );
};

export default Home;