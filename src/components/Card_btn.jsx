import React, { useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';

import './Card_btn.css';

import knight from '../Knight.png';

function Card_btn(props) {
  const [clicked, setClicked] = useState(false);

  return (
    <Button
      variant="contained"
      onClick={() => (clicked ? setClicked(false) : setClicked(true))}
      color={clicked ? 'grey' : props.color}
      startIcon={<Avatar src={props.job} margin="0px" />}
    ></Button>
  );
}

export default Card_btn;
