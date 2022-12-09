import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { RangeSlider, Container, Text } from '@mantine/core';
import axios from 'axios';

const TIME_MARKS = [
  { value:0, label: '00:00' },
  { value:50, label: "00:30" },
  { value:100, label: "01:00" },
  { value:150, label: "01:30" },
  { value:200, label: "02:00" },
  { value:250, label: "02:30" },
  { value:300, label: "03:00" },
  { value:350, label: "03:30" },
  { value:400, label: "04:00" },
  { value:450, label: "04:30" },
  { value:500, label: "05:00" },
  { value:550, label: "05:30" },
  { value:600, label: "06:00" },
  { value:650, label: "06:30" },
  { value:700, label: "07:00" },
  { value:750, label: "07:30" },
  { value:800, label: "08:00" },
  { value:850, label: "08:30" },
  { value:900, label: "09:00" },
  { value:950, label: "09:30" },
  { value:1000, label: "10:00" },
  { value:1050, label: "10:30" },
  { value:1100, label: "11:00" },
  { value:1150, label: "11:30" },
  { value:1200, label: "12:00" },
  { value:1250, label: "12:30" },
  { value:1300, label: "13:00" },
  { value:1350, label: "13:30" },
  { value:1400, label: "14:00" },
  { value:1450, label: "14:30" },
  { value:1500, label: "15:00" },
  { value:1550, label: "15:30" },
  { value:1600, label: "16:00" },
  { value:1650, label: "16:30" },
  { value:1700, label: "17:00" },
  { value:1750, label: "17:30" },
  { value:1800, label: "18:00" },
  { value:1850, label: "18:30" },
  { value:1900, label: "19:00" },
  { value:1950, label: "19:30" },
  { value:2000, label: "20:00" },
  { value:2050, label: "20:30" },
  { value:2100, label: "21:00" },
  { value:2150, label: "21:30" },
  { value:2200, label: "22:00" },
  { value:2250, label: "22:30" },
  { value:2300, label: "23:00" },
  { value:2350, label: "23:30" },
  { value:2400, label: "24:00" },
];


const Time = () => {
  const navigate = useNavigate();
  const [isApplied, setIsApplied] = useState(false);
  const [rangeValue, setRangeValue] = useState([0, 2400]);

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
      setIsApplied(true);
    }
  }, [rangeValue]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1> Enter desired study time range</h1>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '0vh' }}>
        <h4> 24 hour system </h4>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '5vh' }}>
      </div>
      <Container size={400}>
        <RangeSlider max={2400} minRange={50} marks={TIME_MARKS} value={rangeValue} onChange={setRangeValue} step={50} styles={{ markLabel: { display: 'none' } }} />
      </Container>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={handleReq}>Apply</Button>
          {isApplied && (
            <Text style={{position:'absolute', marginLeft:'-8vw', marginTop:'-2.5vh', color:'green'}}>Applied!</Text>
          )}
        <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={() => navigate("/Filters")}>Return to Filters</Button>

      </div>
    </div>
  );
};

export default Time;