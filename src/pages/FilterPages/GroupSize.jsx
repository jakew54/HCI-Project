import React, { useState, useCallback } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { RangeSlider, Button } from '@mantine/core';
import axios from 'axios';


const GroupSize = () => {
  const navigate = useNavigate();
  const notify = () => toast("Filters successfully applied!");

  const [rangeValue, setRangeValue] = useState([0, 10]);

  const handleReq = useCallback(async () => {
   if (rangeValue.length === 2) {
      const url = new URL('http://127.0.0.1:8000/group_size_filter');
      const searchParams = new URLSearchParams({
            "min_group_size": rangeValue[0] / 10,
            "max_group_size": rangeValue[1] / 10,
      });
      url.search = searchParams.toString();
      const response = await axios.get(url);
      console.log(response.data);
        //navigate("/Filters");
      }
  }, [rangeValue]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1> Enter desired group size </h1>
      </div>

       <RangeSlider value={rangeValue} onChange={setRangeValue} step={10} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button onClick={() => handleReq()}>Apply and return to Filters</Button>
      </div>

      <ToastContainer />

    </div>
  );
};

export default GroupSize;