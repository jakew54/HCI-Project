import React from 'react';
import "../Styles/Filters.css";

const RowComponent = ({ name, num, style }) => (
  <div style={style} className={"list-group-item"}>
    <div className="avatar">
      <h1>{name}</h1>
      {/* <img className="imgAvatar" src={image} /> */}
    </div>
    
    <div className="details">
      <div className="info">
        <p className="number">#{num + 1}</p>
      </div>

    </div>
  </div>
);

export default RowComponent;