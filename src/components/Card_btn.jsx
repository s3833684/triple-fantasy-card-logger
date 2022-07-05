import React, { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Popover from '@mui/material/Popover';
import IconButton from '@mui/material/IconButton';
import ButtonGroup from '@mui/material/ButtonGroup';

import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

import './Card_btn.css';

import knight from '../Knight.png';

/*
Card Buutton element to show the job image inside the button
<props name="onClick">onClick function passed from parent component, if none then run the default OnClick </props>
*/
function Card_btn(props) {
  const defaultOnClick = () => {
    //toggle the clicked to change the color
    clicked ? setClicked(false) : setClicked(true);
  };
  const [clicked, setClicked] = useState(false);
  const [isExtraCard, setIsExtraCard] = useState(
    props.isExtraCard !== undefined ? true : false
  );
  //popover
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handlePopoverOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;
  return (
    <div onContextMenu={(e) => e.preventDefault()}>
      <Button
        variant={props.variant ? props.variant : 'contained'}
        onClick={props.onClick ? props.onClick : defaultOnClick}
        onContextMenu={
          isExtraCard ? handlePopoverOpen : (event) => event.stopPropagation()
        }
        //change the color to grey if clicked
        color={clicked ? 'grey' : props.color}
        startIcon={props.job ? <Avatar src={props.job} margin="0px" /> : ''}
        aria-describedby={id}
        // onMouseLeave={handlePopoverClose}
      >
        {props.content}
      </Button>
      {/*popover element open by right click, for extra cards edit and delete purpose*/}
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        disableRestoreFocus
      >
        <ButtonGroup
          variant="contained"
          aria-label="outlined primary button group"
          color="primary"
        >
          <IconButton
            aria-label="edit"
            onClick={() => props.handleOpenEditCardForm(props.id)}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="delete"
            onClick={() => props.deleteCard(props.id)}
          >
            <DeleteIcon />
          </IconButton>
        </ButtonGroup>
      </Popover>
    </div>
  );
}

export default Card_btn;
