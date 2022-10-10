import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import { style } from '@mui/system';

const currentClasses = [];

const Class = () => {
  const navigate = useNavigate();
  const notifyCourse = () => toast("Course added!");
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <h1>Choose your courses!</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <Paper
          component="form"
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 200 }}
        >
          <InputBase
            sx={{ ml: 1, flex: 1 }}
            placeholder="Enter Course Number"
          />
          <Button onClick={notifyCourse} type="button" sx={{ p: '10px' }}></Button>
        </Paper>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <Button onClick={() => navigate("/Filters")}>Return to Filters</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Class;