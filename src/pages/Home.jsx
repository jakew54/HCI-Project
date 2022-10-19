import {React, useCallback, useEffect} from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../NavbarComponents/index.js";
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import "../Styles/Home.css";
import "../Styles/Buttons.css";
import gator from '../Styles/uf_gator_home.png';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const clearFilters = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/clear_filters');
        const response = await axios.get(url);
    });

    useEffect(() => {
        clearFilters(); //set flag to make it only call a few times
    }, []);

    return (
        <>
            <div className="headerHome">
                <h1>Choose How You Would Like To Find Your Study Buddy!</h1>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '4vh' }}>
                <Button onClick={() => navigate("/Filters")}>List View</Button>
                <span style={{ paddingLeft: '10px' }}></span>
                <Button onClick={() => navigate("/Map")}>Map View</Button>
            </div>
            <div>
                <img src={gator} />
            </div>
        </>
    );
};

export default Home;