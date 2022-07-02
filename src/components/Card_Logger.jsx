import React, { useState } from 'react';

import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

import AddIcon from '@mui/icons-material/Add';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import Card_btn from './Card_btn';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

import knight from '../Knight.png';
import thief from '../Thief.png';
import warrior from '../Warrior.png';
import sorcerer from '../Sorcerer.png';
import wizard from '../Wizard.png';
import warlock from '../Warlock.png';
import monk from '../Monk.png';
import paladin from '../Paladin.png';
import priest from '../Priest.png';
import ExtraCardForm from './ExtraCardForm';

const jobs = {
  knight: knight,
  thief: thief,
  warrior: warrior,
  sorcerer: sorcerer,
  wizard: wizard,
  warlock: warlock,
  monk: monk,
  paladin: paladin,
  priest: priest,
};

const theme = createTheme({
  palette: {
    red: { main: '#F40B27' },
    green: { main: '#5DBA40' },
    blue: { main: '#5C76B7' },
    grey: { main: '#808080' },
    white: { main: '#FFFFFF' },
  },
});

function Card_Logger(props) {
  const [count, setCount] = useState(1);

  const [extraCards, setExtraCards] = useState([]);

  const addExtraCard = (newCard, num) => {
    console.log(
      extraCards.length,
      num,
      parseInt(extraCards.length) + parseInt(num),
      extraCards.length + num > 9
    );
    if (parseInt(extraCards.length) + parseInt(num) > 9) return false;
    for (let i = 0; i < num; i++) {
      extraCards.push(newCard);
    }
    setExtraCards(extraCards);
    return true;
  };

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const resetAll = () => {
    setCount(count + 1);
    setExtraCards([]);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  return (
    <div key={count}>
      <ThemeProvider theme={theme}>
        <h1>Welcome to card logger</h1>
        <Stack direction="row" spacing={2} justifyContent="center">
          <Button
            variant="contained"
            onClick={() => setCount(count + 1)}
            margin={3}
          >
            Reset
          </Button>
          <Button variant="contained" onClick={resetAll} spacing={3}>
            Reset All
          </Button>
          <IconButton
            aria-label="add extra card"
            component="span"
            onClick={() => setOpen(true)}
          >
            <AddIcon />
          </IconButton>
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
          {Object.values(jobs).map((job) => {
            return <Card_btn color="red" job={job}></Card_btn>;
          })}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
          {Object.values(jobs).map((job) => {
            return <Card_btn color="blue" job={job}></Card_btn>;
          })}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
          {Object.values(jobs).map((job) => {
            return <Card_btn color="green" job={job}></Card_btn>;
          })}
        </Stack>
        <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
          {extraCards.map((ec) => {
            return <Card_btn color={ec.color} job={jobs[ec.job]}></Card_btn>;
          })}
        </Stack>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={modalStyle}>
            <ExtraCardForm
              addExtraCard={addExtraCard}
              jobs={jobs}
            ></ExtraCardForm>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default Card_Logger;
