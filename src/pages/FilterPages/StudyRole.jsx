import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Checkbox, Text } from '@mantine/core';
import { useListState, randomId } from '@mantine/hooks';
import axios from 'axios';


const roles = ["Tutor", "Student", "Study-Buddy", "Expert", "Novice"];

const StudyRole = () => {
  const navigate = useNavigate();
  const [selectedRoles, setSelectedRoles] = useState([]);
  const [isApplied, setIsApplied] = useState(false);

  const handleRequest = useCallback(async () => {
    if (selectedRoles.length > 0) {
       const url = new URL('http://127.0.0.1:8000/study_roles_filter');
       const searchParams = new URLSearchParams({
            "study_roles": selectedRoles.join(","),
       });
       url.search = searchParams.toString();
       const response = await axios.get(url);
       setIsApplied(true);
       }
   }, [selectedRoles]);

   const onSelect = useCallback((role, checked) => {
    if (checked) {
      setSelectedRoles((prev) => [...prev, role])
    } else {
      setSelectedRoles((prev) => prev.filter((element) => element !== role));
    }
  }, [setSelectedRoles]);

  const options = useMemo(() => roles.map((role) => {
    return (
      <Checkbox
        mt="xs"
        ml={33}
        label={role}
        key={randomId()}
        checked={selectedRoles.includes(role)}
        onChange={(event) => onSelect(role, event.currentTarget.checked)}
      />
    );
  }), [selectedRoles, onSelect]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1>Choose your study roles</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh' }}>
        {options}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
      <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={handleRequest}>Apply</Button>
          {isApplied && (
            <Text style={{position:'absolute', marginLeft:'-8vw', marginTop:'-2.5vh', color:'green'}}>Applied!</Text>
          )}
        <Button style={{marginLeft:'1vw', marginTop:'3vh'}} onClick={() => navigate("/Filters")}>Return to Filters</Button>
      </div>
    </div>
  );
};

export default StudyRole;