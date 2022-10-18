import { React, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { Text, TextInput } from '@mantine/core';
import { useListState } from '@mantine/hooks';
import axios from 'axios';


const Class = () => {
  const navigate = useNavigate();
  const [className, setClassName] = useState('');
  const [finalStr, setFinalStr] = useState('');

  const buildString = () => {
    setFinalStr(finalStr + className + ",");
  }

  const handleReq = useCallback(async () => {
    if (className.length > 0) {
      const url = new URL('http://127.0.0.1:8000/class_filter');
      const searchParams = new URLSearchParams({
        "classes": className,
      });
      url.search = searchParams.toString();
      const response = await axios.get(url);
      console.log(response.data);
      navigate("/Filters");
    }
  }, [className]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
        <h1>Choose your course!</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <TextInput placeholder="Your course" label="Enter your course name"
          value={className}
          onChange={(event) => setClassName(event.currentTarget.value)} />
        <Button className="buttonCool" onClick={buildString} style={{marginLeft:'1vh', marginTop:'3.5vh'}}>Add class</Button>

      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '7vh' }}>
        <Button onClick={handleReq}>Apply and return to filters</Button>
      </div>
    </div>
  );
};

export default Class;