import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RangeSlider from '../../component/rangeSliders/rangeSlider.js';

const GroupSize = () => {
  const navigate = useNavigate();
  const notify = () => toast("Filters successfully applied!");

  const [groupSizes, setGroupSizes] = useState([]);
  //const groupSizes = [];

  var jsonGroupSizes = {
    "groupSizes": {
      "min": groupSizes[0],
      "max": groupSizes[1]
    }
  }


  const handleReq = async () => {
    const response = await fetch('http://localhost:8000/groupsize', {
      method: 'POST',
      body: JSON.stringify(jsonGroupSizes)
    });
    const data = await response.json();
    console.log(data);
    //navigate("/Filters");
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1> Enter desired group size </h1>
      </div>

      <RangeSlider min={1} max={10} onChange={({ min, max }) => setGroupSizes([min, max])} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button onClick={handleReq}>Apply and return to Filters</Button>
      </div>

      <ToastContainer />

    </div>
  );
};

export default GroupSize;