import React, { useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mantine/core';
import { useListState, randomId } from '@mantine/hooks';
import axios from 'axios';


const roles = ["Tutor", "Student", "Study-Buddy", "Expert", "Novice"];
const initialVals = [
  { label: roles[0], checked: false, key: randomId() },
  { label: roles[1], checked: false, key: randomId() },
  { label: roles[2], checked: false, key: randomId() },
  { label: roles[3], checked: false, key: randomId() },
  { label: roles[4], checked: false, key: randomId() },
];

const StudyRole = () => {
  const navigate = useNavigate();
  let finalStr = "";

  const [values, handlers] = useListState(initialVals);
  const [str, setStr] = useState("");

  const handleRequest = useCallback(async () => {
    //console.log(str);
    if (finalStr.length > 0) {
      console.log("Hi");
       const url = new URL('http://127.0.0.1:8000/study_roles_filter');
       const searchParams = new URLSearchParams({
            "study_roles": finalStr,
       });
       url.search = searchParams.toString();
       const response = await axios.get(url);
       //console.log(response.data);
       //navigate("/Filters");
       }
   }, [finalStr]);

  const handleReturn = event => {
    values.map((value) => 
      {if (value.checked) {
        finalStr += value.label;
        finalStr += ",";
      }}
    );
    finalStr = finalStr.substring(0,finalStr.length-1);
    setStr(finalStr);
    console.log(str);
    console.log("HI");
    //console.log(finalStr);
    handleRequest();
  };

  const items = values.map((value, index) => (
    <Checkbox
      mt="xs"
      ml={33}
      label={value.label}
      key={value.key}
      checked={value.checked}
      onChange={(event) => handlers.setItemProp(index, 'checked', event.currentTarget.checked)}
    />
  ));


  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1>Choose your study roles</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh' }}>
        {items}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
        <Button onClick={handleReturn}>Apply and return to Filters</Button>
      </div>
    </div>
  );
};

export default StudyRole;