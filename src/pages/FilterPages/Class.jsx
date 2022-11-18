import { React, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Autocomplete, Text, TextInput } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import axios from 'axios';

const classes = ['Data Bases', 'Calc 1', 'Statistics', 'Introduction to Computer Science']

const Class = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleReq = useCallback(async () => {
    if (className.length > 0) {
      const url = new URL('http://127.0.0.1:8000/class_filter');
      const searchParams = new URLSearchParams({
        "classes": className,
      });
      url.search = searchParams.toString();
      const response = await axios.get(url);
      console.log(response.data);
    }
    setIsApplied(true);
  }, [className]);



  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <h1>Choose your course!</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
          <Autocomplete label="Class" placeholder="Enter your class name" data={classes} 
          value={className}
          onChange={setClassName} />
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

export default Class;