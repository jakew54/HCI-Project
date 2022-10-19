import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import { Checkbox } from '@mantine/core';
import { useListState, randomId } from '@mantine/hooks';
import axios from 'axios';


const places = ['Library', 'Outside', 'Online', 'Study Room'];

const Place = () => {
  const navigate = useNavigate();
  const [selectedPlaces, setSelectedPlaces] = useState([]);

  const handleRequest = useCallback(async () => {
    if (selectedPlaces.length > 0) {
       const url = new URL('http://127.0.0.1:8000/place_type_filter');
       const searchParams = new URLSearchParams({
            "place_types": selectedPlaces.join(","),
       });
       url.search = searchParams.toString();
       const response = await axios.get(url);
       navigate("/Filters");
       }
   }, [selectedPlaces]);

   const onSelect = useCallback((place, checked) => {
    if (checked) {
      setSelectedPlaces((prev) => [...prev, place])
    } else {
      setSelectedPlaces((prev) => prev.filter((element) => element !== place));
    }
  }, [setSelectedPlaces]);

  const options = useMemo(() => places.map((place) => {
    return (
      <Checkbox
        mt="xs"
        ml={33}
        label={place}
        key={randomId()}
        checked={selectedPlaces.includes(place)}
        onChange={(event) => onSelect(place, event.currentTarget.checked)}
      />
    );
  }), [selectedPlaces, onSelect]);

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '10vh' }}>
        <h1>Choose your study places</h1>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '8vh' }}>
        {options}
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '15vh' }}>
        <Button onClick={handleRequest}>Apply and return to Filters</Button>
      </div>
    </div>
  );
};

export default Place;