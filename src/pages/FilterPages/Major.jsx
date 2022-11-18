import {React, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Text, TextInput, Autocomplete} from '@mantine/core';
import axios from 'axios';

const majors = ["Computer Science", "Math", "Biology", "Political Science", "Chemistry", "Physics"]

const Major = () => {
  const navigate = useNavigate();
  const [majorName, setMajorName] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleReq = useCallback(async () => {
    if (majorName.length > 0) {
       const url = new URL('http://127.0.0.1:8000/major_filter');
       const searchParams = new URLSearchParams({
            "majors": majorName,
       });
       url.search = searchParams.toString();
       const response = await axios.get(url);
       console.log(response.data);
       setIsApplied(true);
       }
   }, [majorName]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <h1>Choose your major!</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
          <Autocomplete label="Major" placeholder="Enter your major" data={majors} 
          value={majorName}
          onChange={setMajorName} />
          <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={handleReq}>Apply</Button>
          {isApplied && (
            <Text style={{position:'absolute', marginLeft:'10.8vw', marginTop:'-2.5vh', color:'green'}}>Applied!</Text>
          )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh' }}>
        <Button style={{marginLeft:'1vw'}} onClick={() => navigate("/Filters")}>Return to Filters</Button>
      </div>
    </div>
  );
};

export default Major;