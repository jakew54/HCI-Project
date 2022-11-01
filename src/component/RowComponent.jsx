import {React} from 'react';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import { Box, BackgroundImage, Center } from '@mantine/core';
import listBox from '../Styles/listBox.png';

const RowComponent = ({ name, class_name, group_size, language, major, picture, place, study_role, time, num, style }) => (
  <div style={style}>
    <div className='backImg'>
      <h1 style={{marginLeft:'1vh', fontSize:48}}>{name}</h1>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:24, marginLeft:'1vh'}}>Class:</div>
        <div className='child' style={{position:'absolute',fontWeight:100, fontSize:20, marginLeft:'1vh',wordBreak:'break-word', width:150,}}>{class_name}</div>
        <div className='child' style={{fontWeight:600, fontSize:24, position:'absolute', left: '30vh'}}>Major:</div>
        <div className='child' style={{fontWeight:100, fontSize:20, position:'absolute', left: '39.3vh', top:'14.2vh'}}>{major}</div>
        <img className='imgAvatar' src={picture} style={{position:'absolute', left:'59vh', top:'6vh'}}></img>
        <button className='buttonCool' style={{position:'absolute', left:'87vh', top:'9vh', padding:'30px 60px', fontSize:'20px', borderColor:'rgb(0,0,0)'}}
        >
          JOIN
          </button>
      </div>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:24, marginLeft:'1vh'}}>Studies until: </div>
        <div className='child' style={{fontWeight:100, fontSize:20, marginLeft:'1vh'}}> {time[0]}{time[1]}:{time[2]}{time[3]} </div>
        <div className='child' style={{fontWeight:600, fontSize:24, position:'absolute', left: '30vh'}}>Study Role:</div>
        <div className='child' style={{fontWeight:100, fontSize:20, position:'absolute', left: '44.5vh', top:'19.5vh'}}>{study_role}</div>
      </div>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:24, marginLeft:'1vh'}}>Language: </div>
        <div className='child' style={{fontWeight:100, fontSize:20, marginLeft:'1vh'}}>{language}</div>
        <div className='child' style={{fontWeight:600, fontSize:24, position:'absolute', left: '30vh'}}>Group Size:</div>
        <div className='child' style={{fontWeight:100, fontSize:20, position:'absolute', left: '45vh', top:'24.9vh'}}>{group_size}</div>
        <div className='child' style={{fontWeight:600, fontSize:24, position:'absolute', left: '53vh'}}>Location:</div>
        <div className='child' style={{fontWeight:100, fontSize:20, position:'absolute', left: '65.8vh', top:'24.9vh'}}>{place}</div>
      </div>
    </div>
    {/* <img className="imgAvatar" src={image} /> */}
  </div>
);

export default RowComponent;