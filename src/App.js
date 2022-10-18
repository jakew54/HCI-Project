import logo from './logo.svg';
import './App.css';

import React from 'react';
import Navbar from './NavbarComponents/index';
import { BrowserRouter as Router, Routes, Route }
    from 'react-router-dom';
import Home from './pages/Home';
import Filters from './pages/Filters';
import Groups from './pages/Groups';
import Login from './pages/Login';
import Class from './pages/FilterPages/Class';
import GroupSize from './pages/FilterPages/GroupSize';
import Language from './pages/FilterPages/Language';
import Major from './pages/FilterPages/Major';
import Place from './pages/FilterPages/Place';
import StudyRole from './pages/FilterPages/StudyRole';
import Time from './pages/FilterPages/Time';
import Map from './pages/Map';


function App() {
    return (
        <div className='background-App'>
        <Router>
            <Navbar />
            <Routes>
                <Route exact path='/' element={<Home />} />
                <Route path='/Home' element={<Home />} />
                <Route path='/Filters' element={<Filters />} />
                <Route path='/Groups' element={<Groups />} />
                <Route path='/Login' element={<Login />} />
                <Route path='/GroupSize' element={<GroupSize />} />
                <Route path='/Language' element={<Language />} />
                <Route path='/Major' element={<Major />} />
                <Route path='/Place' element={<Place />} />
                <Route path='/StudyRole' element={<StudyRole />} />
                <Route path='/Time' element={<Time />} />
                <Route path='/Class' element={<Class />} />
                <Route path='/Map' element={<Map />} />
            </Routes>
        </Router>
        </div>
    );
}

export default App;
