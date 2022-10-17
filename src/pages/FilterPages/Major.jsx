import {React, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Text, TextInput} from '@mantine/core';
import axios from 'axios';


const Major = () => {
  const navigate = useNavigate();
  const [majorName, setMajorName] = useState('');

  const handleReq = useCallback(async () => {
    if (majorName.length > 0) {
       const url = new URL('http://127.0.0.1:8000/major_filter');
       const searchParams = new URLSearchParams({
            "majors": majorName,
       });
       url.search = searchParams.toString();
       const response = await axios.get(url);
       console.log(response.data);
       navigate("/Filters");
       }
   }, [majorName]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <h1>Choose your major!</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
          <TextInput placeholder="Your major" label="Enter your major name" 
          value={majorName}
          onChange={(event) => setMajorName(event.currentTarget.value)}/>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh' }}>
        <Button onClick={handleReq}>Apply and return to filters</Button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Major;