import React from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RangeSlider from '../../component/rangeSliders/rangeSlider.js';

const GroupSize = () => {
  const navigate = useNavigate();
  const notify = () => toast("Filters successfully applied!");
  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1> Enter desired group size </h1>
      </div>

      <RangeSlider min={1} max={10} onChange={({ min, max }) => console.log('min = ${min}, max=${max}')} />
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <Button onClick={notify}>Apply</Button>
      </div>

      <ToastContainer />
      <Button onClick={() => navigate("/Filters")}>Return to Filters</Button>
    </div>
  );
};

export default GroupSize;