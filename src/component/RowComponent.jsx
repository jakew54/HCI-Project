import {React} from 'react';
import "../Styles/Filters.css";
import "../Styles/Buttons.css";
import { Box, BackgroundImage, Center, Text } from '@mantine/core';
import listBox from '../Styles/listBox.png';

const RowComponent = ({ name, class_name, group_size, language, major, picture, place, study_role, time, num, style }) => (
  <div style={style}>
    <div className='backImg'>
      <h1 style={{marginLeft:'1vh', fontSize:'4vh'}}>{name}</h1>
      <div className='parent' style={{marginBottom:'1vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'0.5vw'}}>Class:</div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh', wordBreak:'break-word', width:'9vw', display:'inline-block', marginLeft:'0.5vw'}}>{class_name}</div>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'0.5vw'}}>Major:</div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh', display:'inline-block', marginLeft:'0.5vw'}}>{major}</div>
        <img className='imgAvatar' src={picture} style={{position:'absolute', display:'inline-block', marginLeft:'4vw', width:'6.5vw', marginTop:'-6vh'}}></img>
        <button className='buttonCool' style={{position:'absolute', padding:'2vh 2vw', fontSize:'2vh', borderColor:'rgb(0,0,0)', display:'inline-block', left:'40vw', marginTop:'-1vh'}}
        >
          JOIN
          </button>
      </div>
      <div className='parent' style={{marginBottom:'1vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'0.5vw'}}>Studies until: </div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh',  display:'inline-block', marginLeft:'0.5vw'}}> {time[0]}{time[1]}:{time[2]}{time[3]} </div>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'2vw'}}>Study Role: </div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh',  display:'inline-block', marginLeft:'0.5vw'}}>{study_role}</div>
      </div>
      <div className='parent' style={{marginBottom:'2vh'}}>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'0.5vw'}}>Language: </div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh', display:'inline-block', marginLeft:'0.5vw'}}>{language}</div>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'2vw'}}>Group Size:</div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh', display:'inline-block', marginLeft:'0.5vw'}}>{group_size}</div>
        <div className='child' style={{fontWeight:600, fontSize:'2.5vh', display:'inline-block', marginLeft:'2vw'}}>Location:</div>
        <div className='child' style={{fontWeight:100, fontSize:'2vh', display:'inline-block', marginLeft:'0.5vw'}}>{place}</div>
      </div>
    </div>
    {/* <img className="imgAvatar" src={image} /> */}
  </div>
);

export default RowComponent;