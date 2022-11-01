import React from 'react';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import { Box, BackgroundImage, Center } from '@mantine/core';
import listBox from '../Styles/listBoxMap.png';

const RowComponentMap = ({ name, class_name, group_size, language, major, picture, place, study_role, time, num, style }) => (
  <div style={style}>
    <div className='backImgMap'>
      <h1 style={{marginLeft:'1vh', fontSize:24}}>{name}</h1>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:16, marginLeft:'1vh'}}>Class:</div>
        <div className='child' style={{position:'absolute', fontWeight:100, fontSize:14, wordBreak:'break-word', width:130, left:'6vh', top:'7.1vh'}}>{class_name}</div>
        <div className='child' style={{fontWeight:600, fontSize:16, position:'absolute', left: '18vh'}}>Major:</div>
        <div className='child' style={{fontWeight:100, fontSize:14, position:'absolute', left: '24.2vh', top:'7.1vh'}}>{major}</div>
        <img className='imgAvatar' src={picture} style={{position:'absolute', left:'43.5vh', top:'3vh', width:'7.5vh'}}></img>
        <button className='buttonCool' style={{position:'absolute', left:'42vh', top:'10.2vh', padding:'10px 30px', fontSize:'12px', borderColor:'rgb(0,0,0)'}}
        >
          JOIN
          </button>
      </div>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:16, marginLeft:'1vh'}}>Studies until: </div>
        <div className='child' style={{fontWeight:100, fontSize:14, marginLeft:'0.5vh'}}> {time[0]}{time[1]}:{time[2]}{time[3]} </div>
        <div className='child' style={{fontWeight:600, fontSize:16, position:'absolute', left: '18vh'}}>Study Role:</div>
        <div className='child' style={{fontWeight:100, fontSize:14, position:'absolute', left: '27.7vh', top:'11.2vh'}}>{study_role}</div>
      </div>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:16, marginLeft:'1vh'}}>Language: </div>
        <div className='child' style={{fontWeight:100, fontSize:14, marginLeft:'0.5vh'}}>{language}</div>
        <div className='child' style={{fontWeight:600, fontSize:16, position:'absolute', left: '18vh'}}>Group Size:</div>
        <div className='child' style={{fontWeight:100, fontSize:14, position:'absolute', left: '28vh', top:'15.3vh'}}>{group_size}</div>
      </div>
    </div>
    {/* <img className="imgAvatar" src={image} /> */}
  </div>
);

export default RowComponentMap;