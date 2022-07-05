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
import EditCardForm from './EditCardForm';

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
  const [currCardID, setCurrCardID] = useState(null);

  const addExtraCard = (newCard, num) => {
    for (let i = 0; i < num; i++) {
      extraCards.push(newCard);
    }
    setExtraCards(extraCards);
    handleCloseAddCardForm();
    return true;
  };

  const saveEditCard = (newCard) => {
    console.log('before edit:', extraCards);
    console.log(currCardID);
    extraCards[currCardID] = newCard;
    setExtraCards(
      extraCards.map((card, i) => {
        if (i === currCardID) {
          return newCard;
        }
      })
    );
    // setExtraCards({ ...extraCards });
    handleCloseEditCardForm();
    console.log('after edit:', extraCards);
  };

  const deleteCard = (id) => {
    console.log('delete card:', id);
    extraCards.splice(id, 1);
    setExtraCards(Object.assign(extraCards, []));
    console.log(extraCards);
  };

  const [openAddCardForm, setOpenAddCardForm] = React.useState(false);
  const handleOpenAddCardForm = (id) => {
    setCurrCardID(id);
    setOpenAddCardForm(true);
  };
  const handleCloseAddCardForm = () => setOpenAddCardForm(false);

  const [openEditCardForm, setOpenEditCardForm] = React.useState(false);
  const handleOpenEditCardForm = (id) => {
    setCurrCardID(id);
    setOpenEditCardForm(true);
  };

  const handleCloseEditCardForm = () => setOpenEditCardForm(false);

  const resetAll = () => {
    setCount(count + 1);
    setExtraCards([]);
  };

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
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
            onClick={() => handleOpenAddCardForm()}
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
        {
          //divide the extraCards to slices of length of 9 and put each row 9 items only
          //use i as index to find the corresponding item in each row
          [...Array(Math.ceil(extraCards.length / 9)).keys()].map((i) => {
            return (
              <Stack
                direction="row"
                spacing={2}
                justifyContent="center"
                padding={1}
              >
                {extraCards
                  .slice(
                    i * 9,
                    extraCards.length < i * 9 ? undefined : (i + 1) * 9
                  )
                  .map((ec, index) => {
                    return (
                      <Card_btn
                        color={ec.color}
                        job={jobs[ec.job]}
                        isExtraCard={true}
                        handleOpenEditCardForm={handleOpenEditCardForm}
                        id={i * 9 + index}
                        deleteCard={deleteCard}
                      ></Card_btn>
                    );
                  })}
              </Stack>
            );
          })
        }
        <Modal open={openAddCardForm} onClose={handleCloseAddCardForm}>
          <Box sx={modalStyle}>
            <ExtraCardForm
              addExtraCard={addExtraCard}
              jobs={jobs}
            ></ExtraCardForm>
          </Box>
        </Modal>

        <Modal open={openEditCardForm} onClose={handleCloseEditCardForm}>
          <Box sx={modalStyle}>
            <EditCardForm
              saveEditCard={saveEditCard}
              currCardID={currCardID}
              jobs={jobs}
            ></EditCardForm>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default Card_Logger;
