import { React, useState, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Styles/Map.css';
import mapPic from '../Styles/hci_map_with_pc.png';
import { Text, TextInput, BackgroundImage, Center, Box, Checkbox, RangeSlider, Container } from '@mantine/core';
import { useListState, randomId } from '@mantine/hooks';
import axios from 'axios';
import { Translate } from '@mui/icons-material';
import pin from '../Styles/pin.png';
import pinSmall from '../Styles/pinSmall.png';

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

const roles = ["Tutor", "Student", "Study-Buddy", "Expert", "Novice"];
const languages = ["English", "Spanish", "Hindi", "Japanese", "French", "German"]
const locations = ['Library', 'Outside', 'Online', 'Study Room']

const initialRoles1 = [
    { label: roles[0], checked: false, key: randomId() },
    { label: roles[1], checked: false, key: randomId() },
    { label: roles[2], checked: false, key: randomId() },
];
const initialRoles2 = [
    { label: roles[3], checked: false, key: randomId() },
    { label: roles[4], checked: false, key: randomId() },
];
const initialLanguages1 = [
    { label: languages[0], checked: false, key: randomId() },
    { label: languages[1], checked: false, key: randomId() },
    { label: languages[2], checked: false, key: randomId() },
];
const initialLanguages2 = [
    { label: languages[3], checked: false, key: randomId() },
    { label: languages[4], checked: false, key: randomId() },
    { label: languages[5], checked: false, key: randomId() },
];
const initialLocations1 = [
    { label: locations[0], checked: false, key: randomId() },
    { label: locations[1], checked: false, key: randomId() },
];
const initialLocations2 = [
    { label: locations[2], checked: false, key: randomId() },
    { label: locations[3], checked: false, key: randomId() },
];


const Map = () => {
    const [majorName, setMajorName] = useState('');
    const [className, setClassName] = useState('');
    const [groupSizeValue, setGroupSizeValue] = useState([0, 10]);
    const [timeValue, setTimeValue] = useState([0, 10]);
    const [currGroupNum, setCurrGroupNum] = useState();

    //hover functionality for lcoations
    const [isShownLibWest, setIsShownLibWest] = useState(false);
    const [isShownMarston, setIsShownMarston] = useState(false);
    const [isShownComputer, setIsShownComputer] = useState(false);
    const [isShownPlaza, setIsShownPlaza] = useState(false);


    const navigate = useNavigate();

    const [roles1, handleRoles1] = useListState(initialRoles1);
    const [roles2, handleRoles2] = useListState(initialRoles2);

    const [languages1, handleLanguages1] = useListState(initialLanguages1);
    const [languages2, handleLanguages2] = useListState(initialLanguages2);

    const [locations1, handleLocations1] = useListState(initialLocations1);
    const [locations2, handleLocations2] = useListState(initialLocations2);

    const handleFilters = () => {
        handleClassReq();
        handleMajorReq();
        handleGroupSizeReq();
        handleTimeReq();
        getGroupNum();
    }

    const handleClassReq = useCallback(async () => {
        if (className.length > 0) {
            const url = new URL('http://127.0.0.1:8000/class_filter');
            const searchParams = new URLSearchParams({
                "classes": className,
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
            console.log("class_filter success");
            console.log(response.data);
        }
    }, [className]);

    const handleMajorReq = useCallback(async () => {
        if (majorName.length > 0) {
            const url = new URL('http://127.0.0.1:8000/major_filter');
            const searchParams = new URLSearchParams({
                "majors": majorName,
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
            console.log("major_filter success");
            console.log(response.data);
        }
    }, [majorName]);

    const handleGroupSizeReq = useCallback(async () => {
        if (groupSizeValue.length === 2) {
            const url = new URL('http://127.0.0.1:8000/group_size_filter');
            const searchParams = new URLSearchParams({
                "min_group_size": groupSizeValue[0],
                "max_group_size": groupSizeValue[1],
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
            console.log("group_size_filter success");
            console.log(response.data);
        }
    }, [groupSizeValue]);

    const handleTimeReq = useCallback(async () => {
        if (timeValue.length === 2) {
            const url = new URL('http://127.0.0.1:8000/time_filter');
            const searchParams = new URLSearchParams({
                "min_time": timeValue[0],
                "max_time": timeValue[1],
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
            console.log("time_filter success");
            console.log(response.data);
        }
    }, [timeValue]);

    const getGroupNum = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/done_filtering');
        const response = await axios.get(url);
        console.log(response.data);
        setCurrGroupNum(response.data.number_of_students);
        //setCurrentStudents(response.data.students);
    });

    const roleItems1 = roles1.map((value, index) => (
        <Checkbox
            mt="xs"
            size="xs"
            ml={33}
            label={value.label}
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleRoles1.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));
    const roleItems2 = roles2.map((value, index) => (
        <Checkbox
            mt="xs"
            ml={33}
            label={value.label}
            size="xs"
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleRoles2.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));

    const languageItems1 = languages1.map((value, index) => (
        <Checkbox
            mt="xs"
            size="xs"
            ml={33}
            label={value.label}
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleLanguages1.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));
    const languageItems2 = languages2.map((value, index) => (
        <Checkbox
            mt="xs"
            ml={33}
            label={value.label}
            size="xs"
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleLanguages2.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));

    const locationItems1 = locations1.map((value, index) => (
        <Checkbox
            mt="xs"
            size="xs"
            ml={33}
            label={value.label}
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleLocations1.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));
    const locationItems2 = locations2.map((value, index) => (
        <Checkbox
            mt="xs"
            ml={33}
            label={value.label}
            size="xs"
            key={value.key}
            checked={value.checked}
            onChange={(event) => handleLocations2.setItemProp(index, 'checked', event.currentTarget.checked)}
        />
    ));

    return (
        <div>
            <div class="split left">
                <div className='rectangle' />
                <div className='headerMap'>StudyBuddy</div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}>
                </div>

                <Container size={300} style={{ marginLeft: '-0.5vh', marginTop: '0vh' }}>
                    <TextInput placeholder="Your major" label="Major:"
                        value={majorName}
                        size="lg"
                        onChange={(event) => setMajorName(event.currentTarget.value)} />
                </Container>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}>
                </div>

                <Container size={300} style={{ marginLeft: '-0.5vh', marginTop: '0vh' }}>
                    <TextInput placeholder="Your class" label="Class:"
                        value={className}
                        size="lg"
                        onChange={(event) => setClassName(event.currentTarget.value)} />
                </Container>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}>
                </div>

                <div style={{ marginLeft: '1vh' }}>
                    <Text size="lg" weight={500}>Study Roles:</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '3vh', marginLeft: '-2vh' }}>
                    {roleItems1}
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh', marginLeft: '-2vh' }}>
                    {roleItems2}
                </div>
                <div style={{ marginLeft: '1vh' }}>
                    <Text size="lg" weight={500}>Languages:</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '3vh', marginLeft: '-2vh' }}>
                    {languageItems1}
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh', marginLeft: '-2vh' }}>
                    {languageItems2}
                </div>
                <div style={{ marginLeft: '1vh' }}>
                    <Text size="lg" weight={500}>Locations:</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '3vh', marginLeft: '-2vh' }}>
                    {locationItems1}
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh', marginLeft: '-2vh' }}>
                    {locationItems2}
                </div>
                <div style={{ marginLeft: '1vh' }}>

                    <Text size="lg" weight={500}>Group Size:</Text>
                </div>
                <Container size={300} style={{ marginLeft: '2.5vh', marginTop: '3vh' }}>
                    <RangeSlider max={10} minRange={1} marks={MARKS} value={groupSizeValue} onChange={setGroupSizeValue}
                        step={1} styles={{ markLabel: { display: 'none', width: '0vh' } }}
                        size='md' width='20%' />
                </Container>
                <div style={{ marginLeft: '1vh', marginTop: '2vh' }}>
                    <Text size="lg" weight={500}>Study Duration (in hours):</Text>
                </div>
                <Container size={300} style={{ marginLeft: '2.5vh', marginTop: '3vh' }}>
                    <RangeSlider max={10} minRange={1} marks={MARKS} value={timeValue} onChange={setTimeValue}
                        step={1} styles={{ markLabel: { display: 'none', width: '0vh' } }}
                        size='md' width='20%' />
                </Container>
                <Button className='buttonMap' style={{ marginLeft: '7vh', marginTop: '5vh' }} onClick={handleFilters}>Apply Filters</Button>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginLeft: '-2vh' }}>
                    <Button className='buttonMap' style={{ marginLeft: '7.5vh', marginTop: '2vh' }} onClick={() => navigate("/Home")}>Return to Home</Button>
                </div>
            </div>
            <div class="split right">
                <Box sx={{ marginTop: -20, maxHeight: 1900 }} mx="auto">
                    <BackgroundImage src={mapPic} radius="xs">
                        <Center style={{ height: 980 }}>
                            <h1>{currGroupNum}</h1>
                        </Center>
                        <div>
                            <img onMouseEnter={() => setIsShownLibWest(true)}
                                onMouseLeave={() => setIsShownLibWest(false)} src={pinSmall}
                                style={{ position: 'absolute', left: '104.5vh', top: '11.5vh', }} />
                        </div>
                        {isShownLibWest && (
                                <div style={{ position: 'absolute', left: '109.5vh', top: '11.5vh', }}>
                                    I'll appear when you hover over the button.
                                </div>
                            )}
                        <div>
                            <img onMouseEnter={() => setIsShownPlaza(true)}
                                onMouseLeave={() => setIsShownPlaza(false)} src={pinSmall}
                                style={{ position: 'absolute', left: '102.5vh', top: '30vh', }} />
                        </div>
                        <div>
                            <img onMouseEnter={() => setIsShownComputer(true)}
                                onMouseLeave={() => setIsShownComputer(false)} src={pinSmall}
                                style={{ position: 'absolute', left: '136vh', top: '79vh', }} />
                        </div>
                        <div>
                            <img onMouseEnter={() => setIsShownMarston(true)}
                                onMouseLeave={() => setIsShownMarston(false)} src={pinSmall}
                                style={{ position: 'absolute', left: '89vh', top: '68vh', }} />
                        </div>
                    </BackgroundImage>
                </Box>
            </div>
        </div>
    );
};

export default Map;