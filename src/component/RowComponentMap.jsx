import React from 'react';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import { Box, BackgroundImage, Center } from '@mantine/core';
import listBox from '../Styles/listBoxMap.png';

const RowComponentMap = ({ name, class_name, group_size, language, major, picture, place, study_role, time, num, style }) => (
  <div style={style}>
    <div style={{backgroundColor:'white', marginTop:'0vh', width:'25.5vw', height:'136px', borderColor:'#0021A5', borderStyle:'solid', borderWidth:'thick', cursor:'default'}}>
      <h1 style={{marginLeft:'1vh', fontSize:'calc(1vh + 1vw)', marginBottom:'0.5vh', color:'black', marginTop:'-0.3vh'}}>{name}</h1>
      <div className='parent' style={{marginBottom:'1vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:'calc(0.6vh + 0.6vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>Class:</div>
        <div className='child' style={{fontWeight:100, fontSize:'calc(0.5vh + 0.5vw)', wordBreak:'break-word', width:'5.6vw', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>{class_name}</div>
        <div className='child' style={{fontWeight:600, fontSize:'calc(0.6vh + 0.6vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>Major:</div>
        <div className='child' style={{fontWeight:100, fontSize:'calc(0.5vh + 0.5vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>{major}</div>
          <img className='imgAvatar' src={picture} style={{position:'absolute', display:'inline-block', marginLeft:'1vw', width:'3vw', height:'6vh',marginTop:'-4vh'}}></img>
        <button className='buttonCool' style={{position:'absolute', padding:'2vh 2vw', fontSize:'calc(0.5vh + 0.5vw)', borderColor:'rgb(0,0,0)', display:'inline-block', left:'19vw', marginTop:'3vh'}}
        >
          JOIN
          </button>
      </div>
      <div className='parent' style={{marginBottom:'1vh'}}>
      <div className='child' style={{fontWeight:600, fontSize:'calc(0.6vh + 0.6vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>Studies until: </div>
        <div className='child' style={{fontWeight:100, fontSize:'calc(0.5vh + 0.5vw)',  display:'inline-block', marginLeft:'0.5vw', color:'black'}}> {time[0]}{time[1]}:{time[2]}{time[3]} </div>
        <div className='child' style={{fontWeight:600, fontSize:'calc(0.6vh + 0.6vw)', display:'inline-block', marginLeft:'2vw', color:'black'}}>Study Role: </div>
        <div className='child' style={{fontWeight:100, fontSize:'calc(0.5vh + 0.5vw)',  display:'inline-block', marginLeft:'0.5vw', color:'black'}}>{study_role}</div>
      </div>
      <div className='parent' style={{marginBottom:'1vh'}}>
      <div className='child' style={{fontWeight:600, fontSize:'calc(0.6vh + 0.6vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>Language: </div>
        <div className='child' style={{fontWeight:100, fontSize:'calc(0.5vh + 0.5vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>{language}</div>
        <div className='child' style={{fontWeight:600, fontSize:'calc(0.6vh + 0.6vw)', display:'inline-block', marginLeft:'2vw', color:'black'}}>Group Size:</div>
        <div className='child' style={{fontWeight:100, fontSize:'calc(0.5vh + 0.5vw)', display:'inline-block', marginLeft:'0.5vw', color:'black'}}>{group_size}</div>
      </div>
    </div>
    {/* <img className="imgAvatar" src={image} /> */}
  </div>
);

export default RowComponentMap;