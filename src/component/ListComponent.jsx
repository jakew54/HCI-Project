import React from 'react';
import { FixedSizeList } from 'react-window';
import RowComponent from './RowComponent';

const items = [process.env.PUBLIC_URL + "/pictures/Jake.jpg", process.env.PUBLIC_URL + "/pictures/Liron.jpg", process.env.PUBLIC_URL + "/pictures/Seggev.jpg"] // some list of items

const Row = ({ index, style }) => (
  <RowComponent image={items[index]} num={index} style={style}/>
);

const ListComponent = () => (
  <FixedSizeList
    height={500}
    width={500}
    itemSize={120}
    itemCount={items.length}
    className="list-container"
  >
    {Row}
  </FixedSizeList>
);

export default ListComponent;