import React, { useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { RangeSlider, Button, Container } from '@mantine/core';
import axios from 'axios';

const MARKS = [
  { value: 0 },
  { value: 1 },
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


const Time = () => {
  const navigate = useNavigate();

  const [rangeValue, setRangeValue] = useState([0, 10]);

  const handleReq = useCallback(async () => {
    if (rangeValue.length === 2) {
      const url = new URL('http://127.0.0.1:8000/time_filter');
      const searchParams = new URLSearchParams({
        "min_time": rangeValue[0],
        "max_time": rangeValue[1],
      });
      url.search = searchParams.toString();
      const response = await axios.get(url);
      console.log(response.data);
      navigate("/Filters");
    }
  }, [rangeValue]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1> Enter desired study duration</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0vh' }}>
        <h4> All time is measured in hours </h4>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
      </div>
      <Container size={400}>
        <RangeSlider max={10} minRange={1} marks={MARKS} value={rangeValue} onChange={setRangeValue} step={1} styles={{ markLabel: { display: 'none' } }} />
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button onClick={() => handleReq()}>Apply and return to Filters</Button>
      </div>
    </div>
  );
};

export default Time;