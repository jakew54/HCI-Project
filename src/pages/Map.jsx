import { React, useState, useCallback, useMemo, useEffect, Image } from 'react';
import { Button } from 'react-bootstrap';
import { Navigate, useNavigate } from 'react-router-dom';
import '../Styles/Map.css';
import mapPic from '../Styles/hci_map_final.png';
import { Text, TextInput, BackgroundImage, Center, Box, Checkbox, RangeSlider, Container, Autocomplete } from '@mantine/core';
import { useListState, randomId } from '@mantine/hooks';
import axios from 'axios';
import { Translate } from '@mui/icons-material';
import pinSmall from '../Styles/pinSmall.png';
import RowComponentMap from '../component/RowComponentMap';
import { FixedSizeList } from "react-window";
import { AutoSizer } from 'react-virtualized';

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

const GS_MARKS = [
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
const places = ['Library', 'Outside', 'Online', 'Study Room']
const majors = ["Computer Science", "Math", "Biology", "Political Science", "Chemistry", "Physics"]
const classes = ['Data Bases', 'Calc 1', 'Statistics', 'Introduction to Computer Science']


const Map = () => {
    const [majorName, setMajorName] = useState('');
    const [className, setClassName] = useState('');
    const [groupSizeValue, setGroupSizeValue] = useState([2, 10]);
    const [timeValue, setTimeValue] = useState([0, 2400]);
    const [currGroupNum, setCurrGroupNum] = useState();
    const [selectedRoles, setSelectedRoles] = useState([]);
    const [selectedLanguages, setSelectedLanguages] = useState([]);
    const [selectedPlaces, setSelectedPlaces] = useState([]);
    const [currentStudents, setCurrentStudents] = useState([]);

    //to determine whether or not a pin should be shown (if there are any groups that belong in that pin's menu)
    const [isPinShownLibWest, setIsPinShownLibWest] = useState(true);
    const [isPinShownMarston, setIsPinShownMarston] = useState(true);
    const [isPinShownComputer, setIsPinShownComputer] = useState(true);
    const [isPinShownPlaza, setIsPinShownPlaza] = useState(true);
    const [isPinShownLawn, setIsPinShownLawn] = useState(true);
    const [isPinShownNewell, setIsPinShownNewell] = useState(true);

    //click functionality for pin menus
    const [isShownLibWest, setIsShownLibWest] = useState(false);
    const [isShownMarston, setIsShownMarston] = useState(false);
    const [isShownComputer, setIsShownComputer] = useState(false);
    const [isShownPlaza, setIsShownPlaza] = useState(false);
    const [isShownLawn, setIsShownLawn] = useState(false);
    const [isShownNewell, setIsShownNewell] = useState(false);
    const [isShownGroupChosen, setIsShownGroupChosen] = useState(false);

    //current groups per location
    const [currentStudentsLibWest, setCurrentStudentsLibWest] = useState([]);
    const [currentStudentsMarston, setCurrentStudentsMarston] = useState([]);
    const [currentStudentsComputer, setCurrentStudentsComputer] = useState([]);
    const [currentStudentsPlaza, setCurrentStudentsPlaza] = useState([]);
    const [currentStudentsLawn, setCurrentStudentsLawn] = useState([]);
    const [currentStudentsNewell, setCurrentStudentsNewell] = useState([]);


    const navigate = useNavigate();

    const handleClassReq = useCallback(async () => {
        if (className.length > 0) {
            const url = new URL('http://127.0.0.1:8000/class_filter');
            const searchParams = new URLSearchParams({
                "classes": className,
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
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
        }
    }, [timeValue]);

    const handleStudyRoleReq = useCallback(async () => {
        if (selectedRoles.length > 0) {
            const url = new URL('http://127.0.0.1:8000/study_roles_filter');
            const searchParams = new URLSearchParams({
                "study_roles": selectedRoles.join(","),
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
        }
    }, [selectedRoles]);

    const handleLanguageReq = useCallback(async () => {
        if (selectedLanguages.length > 0) {
            const url = new URL('http://127.0.0.1:8000/languages_filter');
            const searchParams = new URLSearchParams({
                "languages": selectedLanguages.join(","),
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
        }
    }, [selectedLanguages]);

    const handlePlacesReq = useCallback(async () => {
        if (selectedPlaces.length > 0) {
            const url = new URL('http://127.0.0.1:8000/place_type_filter');
            const searchParams = new URLSearchParams({
                "place_types": selectedPlaces.join(","),
            });
            url.search = searchParams.toString();
            const response = await axios.get(url);
        }
    }, [selectedPlaces]);

    const getGroupNum = useCallback(async () => {
        const url = new URL('http://127.0.0.1:8000/done_filtering');
        const response = await axios.get(url);
        setCurrGroupNum(response.data.number_of_students);
        setCurrentStudents(response.data.students);
        console.log(response.data);
    });

    const clearFilters = useCallback(async () => {
        setCurrentStudentsLibWest([]);
        setCurrentStudentsNewell([]);
        setCurrentStudentsComputer([]);
        setCurrentStudentsLawn([]);
        setCurrentStudentsMarston([]);
        setCurrentStudentsPlaza([]);

        //clearing filters on screen
        setMajorName("");
        setClassName("");
        setSelectedRoles([]);
        setSelectedLanguages([]);
        setSelectedPlaces([]);
        setGroupSizeValue([2,10]);
        setTimeValue([0,2400]);

        const url = new URL('http://127.0.0.1:8000/clear_filters');
        const response = await axios.get(url);
        console.log(response.data);
        setCurrGroupNum(response.data.number_of_students);
        setCurrentStudents(response.data.students);
        handleLibWestPin(true);
        handleLawnFlag(true);
        handleNewellFlag(true);
        handleMarstonFlag(true);
        handleComputerFlag(true);
        handlePlazaPin(true);
    });

    const onSelectStudyRole = useCallback((role, checked) => {
        if (checked) {
            setSelectedRoles((prev) => [...prev, role])
        } else {
            setSelectedRoles((prev) => prev.filter((element) => element !== role));
        }
    }, [setSelectedRoles]);

    const optionsStudyRole = useMemo(() => roles.map((role) => {
        return (
            <Checkbox
                mt="xs"
                ml={33}
                label={role}
                key={randomId()}
                checked={selectedRoles.includes(role)}
                size='calc(0.5vw + 0.5vh)'
                style={{marginLeft:'1vw', marginTop:'0.5vh'}}
                onChange={(event) => onSelectStudyRole(role, event.currentTarget.checked)}
            />
        );
    }), [selectedRoles, onSelectStudyRole]);

    const onSelectLanguage = useCallback((language, checked) => {
        if (checked) {
            setSelectedLanguages((prev) => [...prev, language])
        } else {
            setSelectedLanguages((prev) => prev.filter((element) => element !== language));
        }
    }, [setSelectedLanguages]);

    const optionsLanguage = useMemo(() => languages.map((language) => {
        return (
            <Checkbox
                mt="xs"
                ml={33}
                label={language}
                key={randomId()}
                checked={selectedLanguages.includes(language)}
                size='calc(0.5vw + 0.5vh)'
                style={{marginLeft:'1vw', marginTop:'0.5vh'}}
                onChange={(event) => onSelectLanguage(language, event.currentTarget.checked)}
            />
        );
    }), [selectedLanguages, onSelectLanguage]);

    const onSelectPlace = useCallback((place, checked) => {
        if (checked) {
            setSelectedPlaces((prev) => [...prev, place])
        } else {
            setSelectedPlaces((prev) => prev.filter((element) => element !== place));
        }
    }, [setSelectedPlaces]);

    const optionsPlaces = useMemo(() => places.map((place) => {
        return (
            <Checkbox
                mt="xs"
                ml={33}
                label={place}
                key={randomId()}
                checked={selectedPlaces.includes(place)}
                size='calc(0.5vw + 0.5vh)'
                style={{marginLeft:'1vw', marginTop:'0.5vh'}}
                onChange={(event) => onSelectPlace(place, event.currentTarget.checked)}
            />
        );
    }), [selectedPlaces, onSelectPlace]);

    const handleLibWestPin = useCallback((flag) => {
        if (!flag) {
            setIsPinShownLibWest(false);
        } else {
            setIsPinShownLibWest(true);
        }
    }, [setIsPinShownLibWest]);

    const handlePlazaPin = useCallback((flag) => {
        if (!flag) {
            setIsPinShownPlaza(false);
        } else {
            setIsPinShownPlaza(true);
        }
    }, [setIsPinShownPlaza]);

    const handleNewellFlag = useCallback((flag) => {
        if (!flag) {
            setIsPinShownNewell(false);
        } else {
            setIsPinShownNewell(true);
        }
    }, [setIsPinShownNewell]);

    const handleLawnFlag = useCallback((flag) => {
        if (!flag) {
            setIsPinShownLawn(false);
        } else {
            setIsPinShownLawn(true);
        }
    }, [setIsPinShownLawn]);

    const handleMarstonFlag = useCallback((flag) => {
        if (!flag) {
            setIsPinShownMarston(false);
        } else {
            setIsPinShownMarston(true);
        }
    }, [setIsPinShownMarston]);

    const handleComputerFlag = useCallback((flag) => {
        if (!flag) {
            setIsPinShownComputer(false);
        } else {
            setIsPinShownComputer(true);
        }
    }, [setIsPinShownComputer]);

    const handleFilters = () => {
        handleClassReq();
        handleMajorReq();
        handleGroupSizeReq();
        handleTimeReq();
        handleStudyRoleReq();
        handleLanguageReq();
        handlePlacesReq();
        getGroupNum();

        let libWestFlag = false;
        let plazaFlag = false;
        let newellFlag = false;
        let lawnFlag = false;
        let marstonFlag = false;
        let computerFlag = false;

        for (let i = 0; i < currentStudents.length; i++) {
            switch (currentStudents[i].place) {
                case "Library West":
                    libWestFlag = true;
                    break;
                case "Plaza of the Americas":
                    plazaFlag = true;
                    break;
                case "Newell":
                    newellFlag = true;
                    break;
                case "Reitz Lawn":
                    lawnFlag = true;
                    break;
                case "Marston Library":
                    marstonFlag = true;
                    break;
                default:
                    computerFlag = true;
                    break;
            }
        }
        handleLibWestPin(libWestFlag);
        handlePlazaPin(plazaFlag);
        handleNewellFlag(newellFlag);
        handleLawnFlag(lawnFlag);
        handleMarstonFlag(marstonFlag);
        handleComputerFlag(computerFlag);
    }



    useEffect(() => {
        getGroupNum();
    }, []);


    useEffect(() => {
        setCurrentStudentsLibWest([]);
        setCurrentStudentsNewell([]);
        setCurrentStudentsComputer([]);
        setCurrentStudentsLawn([]);
        setCurrentStudentsMarston([]);
        setCurrentStudentsPlaza([]);
        currentStudents.map((student) => {
            switch (student.place) {
                case "Library West":
                    setCurrentStudentsLibWest(currentStudentsLibWest => [...currentStudentsLibWest, student]);
                    break;
                case "Newell":
                    setCurrentStudentsNewell(currentStudentsNewell => [...currentStudentsNewell, student]);
                    break;
                case "Reitz Lawn":
                    setCurrentStudentsLawn(currentStudentsLawn => [...currentStudentsLawn, student]);
                    break;
                case "Marston Library":
                    setCurrentStudentsMarston(currentStudentsMarston => [...currentStudentsMarston, student]);
                    break;
                case "Plaza of the Americas":
                    setCurrentStudentsPlaza(currentStudentsPlaza => [...currentStudentsPlaza, student]);
                    break;
                default:
                    setCurrentStudentsComputer(currentStudentsComputer => [...currentStudentsComputer, student]);
                    break;
            }
        })
    }, [currentStudents]);

    const Row = ({ index, style }) => (
        <RowComponentMap name={currentStudents[index]?.name} major={currentStudents[index]?.major}
            class_name={currentStudents[index]?.class_name} place={currentStudents[index]?.place}
            time={currentStudents[index]?.time.toString()} language={currentStudents[index]?.language}
            study_role={currentStudents[index]?.study_role} group_size={currentStudents[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudents[index]?.picture)}
            num={index} style={style} />
    );

    const RowLibWest = ({ index, style }) => (
        <RowComponentMap name={currentStudentsLibWest[index]?.name} major={currentStudentsLibWest[index]?.major}
            class_name={currentStudentsLibWest[index]?.class_name} place={currentStudentsLibWest[index]?.place}
            time={currentStudentsLibWest[index]?.time.toString()} language={currentStudentsLibWest[index]?.language}
            study_role={currentStudentsLibWest[index]?.study_role} group_size={currentStudentsLibWest[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudentsLibWest[index]?.picture)}
            num={index} style={style} />
    );

    const RowNewell = ({ index, style }) => (
        <RowComponentMap name={currentStudentsNewell[index]?.name} major={currentStudentsNewell[index]?.major}
            class_name={currentStudentsNewell[index]?.class_name} place={currentStudentsNewell[index]?.place}
            time={currentStudentsNewell[index]?.time.toString()} language={currentStudentsNewell[index]?.language}
            study_role={currentStudentsNewell[index]?.study_role} group_size={currentStudentsNewell[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudentsNewell[index]?.picture)}
            num={index} style={style} />
    );

    const RowLawn = ({ index, style }) => (
        <RowComponentMap name={currentStudentsLawn[index]?.name} major={currentStudentsLawn[index]?.major}
            class_name={currentStudentsLawn[index]?.class_name} place={currentStudentsLawn[index]?.place}
            time={currentStudentsLawn[index]?.time.toString()} language={currentStudentsLawn[index]?.language}
            study_role={currentStudentsLawn[index]?.study_role} group_size={currentStudentsLawn[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudentsLawn[index]?.picture)}
            num={index} style={style} />
    );

    const RowMarston = ({ index, style }) => (
        <RowComponentMap name={currentStudentsMarston[index]?.name} major={currentStudentsMarston[index]?.major}
            class_name={currentStudentsMarston[index]?.class_name} place={currentStudentsMarston[index]?.place}
            time={currentStudentsMarston[index]?.time.toString()} language={currentStudentsMarston[index]?.language}
            study_role={currentStudentsMarston[index]?.study_role} group_size={currentStudentsMarston[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudentsMarston[index]?.picture)}
            num={index} style={style} />
    );

    const RowPlaza = ({ index, style }) => (
        <RowComponentMap name={currentStudentsPlaza[index]?.name} major={currentStudentsPlaza[index]?.major}
            class_name={currentStudentsPlaza[index]?.class_name} place={currentStudentsPlaza[index]?.place}
            time={currentStudentsPlaza[index]?.time.toString()} language={currentStudentsPlaza[index]?.language}
            study_role={currentStudentsPlaza[index]?.study_role} group_size={currentStudentsPlaza[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudentsPlaza[index]?.picture)}
            num={index} style={style} />
    );

    const RowComputer = ({ index, style }) => (
        <RowComponentMap name={currentStudentsComputer[index]?.name} major={currentStudentsComputer[index]?.major}
            class_name={currentStudentsComputer[index]?.class_name} place={currentStudentsComputer[index]?.place}
            time={currentStudentsComputer[index]?.time.toString()} language={currentStudentsComputer[index]?.language}
            study_role={currentStudentsComputer[index]?.study_role} group_size={currentStudentsComputer[index]?.group_size}
            picture={process.env.PUBLIC_URL.concat("/pictures/", currentStudentsComputer[index]?.picture)}
            num={index} style={style} />
    );

    const onCloseListClickLibWest = () => {
        setIsShownGroupChosen(false);
        setIsShownLibWest(false);
    }

    const onCloseListClickPlaza = () => {
        setIsShownGroupChosen(false);
        setIsShownPlaza(false);
    }

    const onCloseListClickNewell = () => {
        setIsShownGroupChosen(false);
        setIsShownNewell(false);
    }

    const onCloseListClickMarston = () => {
        setIsShownGroupChosen(false);
        setIsShownMarston(false);
    }

    const onCloseListClickComputer = () => {
        setIsShownGroupChosen(false);
        setIsShownComputer(false);
    }

    const onCloseListClickLawn = () => {
        setIsShownGroupChosen(false);
        setIsShownLawn(false);
    }

    return (
        <div>
            <div class="split left">
                <div className='rectangle'>
                    <div className='headerMap' style={{fontSize:'calc(2vw + 2vh)', marginLeft:'0.7vw', marginTop:'2vh'}}>StudyBuddy</div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}>
                </div>

                <div style={{ marginTop: '-.5vh', marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Major:
                </div>
                <Container size={'calc(12vw + 5vh)'} style={{ marginLeft: '-0.5vh', marginTop: '1vh' }}>
                    <Autocomplete  placeholder="Enter your major" data={majors} paddingLeft="5vw" style={{size:"calc(0.9vw + 0.9vh)"}}
                    value={majorName}
                    onChange={setMajorName} />
                </Container>

                <div style={{ marginTop: '1vh', marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Class:
                </div>
                <Container size={'calc(12vw + 5vh)'} style={{ marginLeft: '-0.5vh', marginTop: '1vh' }}>
                    <Autocomplete  placeholder="Enter your class" data={classes} paddingLeft="5vw" style={{size:"calc(0.9vw + 0.9vh)"}}
                    value={className}
                    onChange={setClassName} />
                </Container>

                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '2vh' }}>
                </div>

                <div style={{ marginTop: '-1vh',marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Study Roles:
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '3vh', width:'20vw'}}>
                    {optionsStudyRole[0]}
                    {optionsStudyRole[1]}
                    {optionsStudyRole[2]}
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh', marginLeft: '5vh', marginTop: '1vh' }}>
                    {optionsStudyRole[3]}
                    {optionsStudyRole[4]}
                </div>
                <div style={{ marginTop: '-1vh',marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Languages:
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '3vh' }}>
                    {optionsLanguage[0]}
                    {optionsLanguage[1]}
                    {optionsLanguage[2]}
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh', marginTop: '1vh' }}>
                    {optionsLanguage[3]}
                    <div style={{ marginLeft: '-.6vw' }}>
                        {optionsLanguage[4]}
                    </div>
                    <div style={{ marginLeft: '.3vw' }}>
                        {optionsLanguage[5]}
                    </div>
                </div>
                <div style={{ marginTop: '-1vh',marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Locations:
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '3vh' }}>
                    {optionsPlaces[0]}
                    {optionsPlaces[1]}
                </div>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', height: '5vh'}}>
                    {optionsPlaces[2]}
                    <div style={{ marginLeft: '0.05vw' }}>
                        {optionsPlaces[3]}
                    </div>
                </div>
                <div style={{ marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Group Size:
                </div>
                <Container size='20vw' style={{ marginLeft:'1vw', marginTop: '2.5vh' }}>
                    <RangeSlider min={2} max={10} minRange={1} marks={GS_MARKS} value={groupSizeValue} onChange={setGroupSizeValue}
                        step={1} styles={{ markLabel: { display: 'none', width: '0vh' }, track: {width: '15vw'} }}
                        size='md' width='20%' />
                </Container>
                <div style={{ marginTop: '2vh',marginLeft: '0.5vw', fontSize:'calc(0.8vw + 0.8vh)' }}>
                    Study Time Range (24 hour time):
                </div>
                <Container size='20vw' style={{ marginLeft:'1vw', marginTop: '2.5vh' }}>
                    <RangeSlider max={2400} minRange={50} marks={TIME_MARKS} value={timeValue} onChange={setTimeValue}
                        step={50} styles={{ markLabel: { display: 'none', width: '15vw' }, track: {width: '15vw'}}}
                        size='md' />
                </Container>
                <Button className='buttonMap' style={{marginTop: '3vh', marginLeft:'5vw',padding:'1vw', fontSize:'calc(0.6vh + 0.6vw)'}} onClick={handleFilters}>Apply Filters</Button>
                <div style={{ display: 'flex', justifyContent: 'left', alignItems: 'left', marginLeft: '-1vw' }}>
                    <Button className='buttonMap' style={{ marginLeft: '6vh', marginTop: '1vh', fontSize:'calc(0.6vh + 0.6vw)', padding:'calc(0.5vw + 0.5vh)', maxWidth:'7vw'}} onClick={clearFilters}>Clear Filters</Button>
                    <Button className='buttonMap' style={{ marginLeft: '1vw', marginTop: '1vh', padding:'calc(0.5vw + 0.5vh)', fontSize:'calc(0.6vh + 0.6vw)', maxWidth:'7vw' }} onClick={() => navigate("/Home")}>Return Home</Button>
                </div>
            </div>
            <div class="split right">
                {/* <Box sx={{height: 'auto', width:'80vw'}} mx="auto">
                    <BackgroundImage src={mapPic} radius="xs" width="auto" height="auto">
                    </BackgroundImage>
                </Box> */}
                <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                        <td class="style1">
                            <div class="bg">
                                <img src={mapPic} alt="" />
                                    <div class="linkcontainer">
                                        <a class="link" href="#">
                                            <Center style={{ height: '100vh' , cursor:'default'}}>
                                                <h1 style={{ position: 'absolute', left: '1.8vw', top: '0vh', fontSize:'calc(1.1vw + 1.1vh)', color:'black'}}>There are</h1>
                                                <h1 style={{ position: 'absolute', left: '4.4vw', top: '3.3vh', color: '#FA4616', fontSize:'calc(1.5vw + 1.5vh)'}}>{currGroupNum}</h1>
                                                <h1 style={{ position: 'absolute', left: '2.7vw', top: '9.5vh', fontSize:'calc(1.1vw + 1.1vh)' , color:'black'}}>groups!</h1>
                                            </Center>
                                                {isPinShownLibWest && (
                                                    <Button style={{ position: 'absolute', left: '51vw', top: '11.5vh', height: 'calc(2vh + 2vw)', backgroundColor: 'rgba(0,0,0,0.0)', borderColor: 'rgba(0,0,0,0.0)', cursor: 'pointer' }} onClick={() => setIsShownLibWest(true)} ><img src={pinSmall} /></Button>
                                                )}
                                                {isPinShownPlaza && (
                                                    <Button style={{ position: 'absolute', left: '52vw', top: '30vh', height: 'calc(2vh + 2vw)', backgroundColor: 'rgba(0,0,0,0.0)', borderColor: 'rgba(0,0,0,0.0)', cursor: 'pointer' }} onClick={() => setIsShownPlaza(true)}><img src={pinSmall} /></Button>
                                                )}
                                                {(isPinShownComputer &&
                                                    <Button style={{ position: 'absolute', left: '67.2vw', top: '86vh', height: 'calc(2vh + 2vw)', backgroundColor: 'rgba(0,0,0,0.0)', borderColor: 'rgba(0,0,0,0.0)', cursor: 'pointer' }} onClick={() => setIsShownComputer(true)}><img src={pinSmall} /></Button>
                                                )}
                                                {(isPinShownMarston &&
                                                    <Button style={{ position: 'absolute', left: '44vw', top: '74vh', height: 'calc(2vh + 2vw)', backgroundColor: 'rgba(0,0,0,0.0)', borderColor: 'rgba(0,0,0,0.0)', cursor: 'pointer' }} onClick={() => setIsShownMarston(true)}><img src={pinSmall} /></Button>
                                                )}
                                                {(isPinShownLawn &&
                                                    <Button style={{ position: 'absolute', left: '32vw', top: '82vh', height: 'calc(2vh + 2vw)', backgroundColor: 'rgba(0,0,0,0.0)', borderColor: 'rgba(0,0,0,0.0)', cursor: 'pointer' }} onClick={() => setIsShownLawn(true)}><img src={pinSmall} /></Button>
                                                )}
                                                {(isPinShownNewell &&
                                                    <Button style={{ position: 'absolute', left: '35vw', top: '52vh', height: 'calc(2vh + 2vw)', backgroundColor: 'rgba(0,0,0,0.0)', borderColor: 'rgba(0,0,0,0.0)', cursor: 'pointer' }} onClick={() => setIsShownNewell(true)}><img src={pinSmall} /></Button>
                                                )}
                                            {isShownLibWest && (<div style={{ position: 'absolute', zIndex: '1000', left: '20vw', top: '2vh' }}>
                                                <Button className='buttonCool' onClick={onCloseListClickLibWest} style={{ borderColor: '#000000', position: 'absolute', left: '28vw', top: '0vh', height: '3vh', width: '8vh', backgroundColor: 'rgb(255,0,0)', fontSize:'calc(0.5vh + 0.5vw)' }}>Close</Button>
                                                    <FixedSizeList
                                                        height={250}
                                                        width='27vw'
                                                        itemSize={136}
                                                        itemCount={currentStudentsLibWest.length}
                                                        className="list-container"
                                                        cursor= 'default'
                                                    >
                                                        {RowLibWest}
                                                    </FixedSizeList>
                                                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '18vw', top: '-1vh', height: '250px', width: '6vw', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                                                {isShownGroupChosen &&
                                                        <div className='rectangleGroup' style={{ position:'absolute', left:'28vw', top: '6vh', width:'12vw' }}>
                                                            <h1 style={{ fontSize:'1.8vw', textAlign:'center', color:'black' }}>Group Joined Successfully!</h1>
                                                        </div>
                                                }
                                            </div>)}

                                            {isShownPlaza && (<div style={{ position: 'absolute', zIndex: '1000', left: '50vh', top: '17vh' }}>
                                                <Button className='buttonCool' onClick={onCloseListClickPlaza} style={{ borderColor: '#000000', position: 'absolute', left: '28vw', top: '0vh', height: '3vh', width: '8vh', backgroundColor: 'rgb(255,0,0)', fontSize:'calc(0.5vh + 0.5vw)'  }}>Close</Button>
                                                <FixedSizeList
                                                    height={250}
                                                    width='27vw'
                                                    itemSize={136}
                                                    itemCount={currentStudentsPlaza.length}
                                                    className="list-container"
                                                >
                                                    {RowPlaza}
                                                </FixedSizeList>
                                                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '18vw', top: '-1vh', height: '250px', width: '6vw', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                                                {isShownGroupChosen &&
                                                        <div className='rectangleGroup' style={{ position:'absolute', left: '28vw', top: '10vh', width:'12vw'  }}>
                                                            <h1 style={{ fontSize:'1.8vw', textAlign:'center', color:'black' }}>Group Joined Successfully!</h1>
                                                    </div>
                                                }
                                            </div>)}

                                            {isShownComputer && (<div style={{ position: 'absolute', zIndex: '1000', left: '83vh', top: '45vh' }}>
                                                <Button className='buttonCool' onClick={onCloseListClickComputer} style={{ borderColor: '#000000', position: 'absolute', left: '28vw', top: '0vh', height: '3vh', width: '8vh', backgroundColor: 'rgb(255,0,0)', fontSize:'calc(0.5vh + 0.5vw)'  }}>Close</Button>
                                                <FixedSizeList
                                                    height={250}
                                                    width='27vw'
                                                    itemSize={136}
                                                    itemCount={currentStudentsComputer.length}
                                                    className="list-container"
                                                >
                                                    {RowComputer}
                                                </FixedSizeList>
                                                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '18vw', top: '-1vh', height: '250px', width: '6vw', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                                                {isShownGroupChosen &&
                                                        <div className='rectangleGroup' style={{ position:'absolute', left: '18vw', top: '-15vh', width:'12vw'  }}>
                                                            <h1 style={{ fontSize:'1.8vw', textAlign:'center', color:'black' }}>Group Joined Successfully!</h1>
                                                        </div>
                                                }
                                            </div>)}

                                            {isShownMarston && (<div style={{ position: 'absolute', zIndex: '1000', left: '37vh', top: '45vh' }}>
                                                <Button className='buttonCool' onClick={onCloseListClickMarston} style={{ borderColor: '#000000', position: 'absolute', left: '28vw', top: '0vh', height: '3vh', width: '8vh', backgroundColor: 'rgb(255,0,0)', fontSize:'calc(0.5vh + 0.5vw)'  }}>Close</Button>
                                                <FixedSizeList
                                                    height={250}
                                                    width='27vw'
                                                    itemSize={136}
                                                    itemCount={currentStudentsMarston.length}
                                                    className="list-container"
                                                >
                                                    {RowMarston}
                                                </FixedSizeList>
                                                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '18vw', top: '-1vh', height: '250px', width: '6vw', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                                                {isShownGroupChosen &&
                                                        <div className='rectangleGroup' style={{position:'absolute', left: '28vw', top: '10vh', width:'12vw'  }}>
                                                            <h1 style={{ fontSize:'1.8vw', textAlign:'center', color:'black'}}>Group Joined Successfully!</h1>
                                                        </div>
                                                }
                                            </div>)}

                                            {isShownNewell && (<div style={{ position: 'absolute', zIndex: '1000', left: '19vh', top: '22vh' }}>
                                                <Button className='buttonCool' onClick={onCloseListClickNewell} style={{ borderColor: '#000000', position: 'absolute', left: '28vw', top: '0vh', height: '3vh', width: '8vh', backgroundColor: 'rgb(255,0,0)', fontSize:'calc(0.5vh + 0.5vw)'  }}>Close</Button>
                                                <FixedSizeList
                                                    height={250}
                                                    width='27vw'
                                                    itemSize={136}
                                                    itemCount={currentStudentsNewell.length}
                                                    className="list-container"
                                                >
                                                    {RowNewell}
                                                </FixedSizeList>
                                                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '38vh', top: '-1vh', height: '25.5vh', width: '10vh', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                                                {isShownGroupChosen &&
                                                        <div className='rectangleGroup' style={{ position:'absolute', left: '28vw', top: '10vh', width:'12vw' }}>
                                                            <h1 style={{ fontSize:'1.8vw', textAlign:'center', color:'black' }}>Group Joined Successfully!</h1>
                                                        </div>
                                                }
                                            </div>)}

                                            {isShownLawn && (<div style={{ position: 'absolute', zIndex: '1000', left: '13vh', top: '43vh' }}>
                                                <Button className='buttonCool' onClick={onCloseListClickLawn} style={{ borderColor: '#000000', position: 'absolute', left: '28vw', top: '0vh', height: '3vh', width: '8vh', backgroundColor: 'rgb(255,0,0)', fontSize:'calc(0.5vh + 0.5vw)'  }}>Close</Button>
                                                <FixedSizeList
                                                    height={250}
                                                    width='27vw'
                                                    itemSize={136}
                                                    itemCount={currentStudentsLawn.length}
                                                    className="list-container"
                                                >
                                                    {RowLawn}
                                                </FixedSizeList>
                                                <Button className='buttonCool' onClick={() => setIsShownGroupChosen(true)} style={{ borderColor: '#000000', position: 'absolute', left: '38vh', top: '-1vh', height: '25.5vh', width: '10vh', backgroundColor: 'rgba(255,0,0,0)', borderColor: 'rgba(255,0,0,0)' }}></Button>
                                                {isShownGroupChosen &&
                                                        <div className='rectangleGroup' style={{  position:'absolute', left: '28vw', top: '10vh', width:'12vw'  }}>
                                                            <h1 style={{ fontSize:'1.8vw', textAlign:'center', color:'black'}}>Group Joined Successfully!</h1>
                                                        </div>
                                                }
                                            </div>)}
                                        </a>
                                    </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    );
};

export default Map;