import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Checkbox, Text } from '@mantine/core';
import { useListState, randomId } from '@mantine/hooks';
import axios from 'axios';


const languages = ["English", "Spanish", "Hindi", "Japanese", "French", "German"];

const Language = () => {
  const navigate = useNavigate();
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [isApplied, setIsApplied] = useState(false);

  const handleRequest = useCallback(async () => {
    if (selectedLanguages.length > 0) {
       const url = new URL('http://127.0.0.1:8000/languages_filter');
       const searchParams = new URLSearchParams({
            "languages": selectedLanguages.join(","),
       });
       url.search = searchParams.toString();
       const response = await axios.get(url);
       setIsApplied(true);
       }
   }, [selectedLanguages]);

   const onSelect = useCallback((language, checked) => {
    if (checked) {
      setSelectedLanguages((prev) => [...prev, language])
    } else {
      setSelectedLanguages((prev) => prev.filter((element) => element !== language));
    }
  }, [setSelectedLanguages]);

  const options = useMemo(() => languages.map((language) => {
    return (
      <Checkbox
        mt="xs"
        ml={33}
        label={language}
        key={randomId()}
        checked={selectedLanguages.includes(language)}
        onChange={(event) => onSelect(language, event.currentTarget.checked)}
      />
    );
  }), [selectedLanguages, onSelect]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1>Choose your study languages</h1>
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

export default Language;