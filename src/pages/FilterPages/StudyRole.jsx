import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';


const roles = ["Tutor", "Student", "Study-Buddy", "Expert", "Novice"];

const StudyRole = () => {
  const navigate = useNavigate();
  const notify = () => toast("Filters successfully applied!");
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1>Choose your study roles</h1>
      </div>
      <FormGroup>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}>
          <FormControlLabel control={<Checkbox />} label={roles[0]} />
          <FormControlLabel control={<Checkbox />} label={roles[1]} />
          <FormControlLabel control={<Checkbox />} label={roles[2]} />
          <FormControlLabel control={<Checkbox />} label={roles[3]} />
          <FormControlLabel control={<Checkbox />} label={roles[4]} />
        </div>
      </FormGroup>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '6vh' }}>
        <Button onClick={notify}>Apply</Button>
      </div>
      <ToastContainer />
      <Button onClick={() => navigate("/Filters")}>Return to Filters</Button>
    </div>
  );
};

export default StudyRole;