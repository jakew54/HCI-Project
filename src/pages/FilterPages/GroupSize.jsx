import React, { useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RangeSlider, Container, Text } from '@mantine/core';
import axios from 'axios';

const MARKS = [
  { value: 2 },
  { value: 3 },
  { value: 4 },
  { value: 5 },
  { value: 6 },
  { value: 7 },
  { value: 8 },
  { value: 9 },
  { value: 10 },
];


const GroupSize = () => {
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);

  const [rangeValue, setRangeValue] = useState([2, 10]);

  const handleReq = useCallback(async () => {
    if (rangeValue.length === 2) {
      const url = new URL('http://127.0.0.1:8000/group_size_filter');
      const searchParams = new URLSearchParams({
        "min_group_size": rangeValue[0],
        "max_group_size": rangeValue[1],
      });
      url.search = searchParams.toString();
      const response = await axios.get(url);
      console.log(response.data);
      setIsApplied(true);
    }
  }, [rangeValue]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1> Enter desired group size </h1>
      </div>
      <Container size={400}>
        <RangeSlider min={2} max={10} minRange={1} marks={MARKS} value={rangeValue} onChange={setRangeValue}
          step={1} styles={{ markLabel: { display: 'none' } }}
          size='lg' width='50%' />
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
      <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={handleReq}>Apply</Button>
          {isApplied && (
            <Text style={{position:'absolute', marginLeft:'-8vw', marginTop:'-2.5vh', color:'green'}}>Applied!</Text>
          )}
        <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={() => navigate("/Filters")}>Return to Filters</Button>
      </div>

      <ToastContainer />

    </div>
  );
};

export default GroupSize;