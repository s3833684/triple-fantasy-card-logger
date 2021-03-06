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
import BonusForm from './BonusForm';

export const jobs = {
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

export const colors = ['red', 'blue', 'green'];

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

  const addExtraCard = (job, color, num) => {
    for (let i = 0; i < num; i++) {
      var newCard = {
        job: job,
        color: color,
        id: extraCards.length ? extraCards[extraCards.length - 1].id + 1 : 1,
      };
      extraCards.push(newCard);
    }
    setExtraCards(extraCards);
    handleCloseAddCardForm();
  };

  const saveEditCard = (job, color) => {
    var newCard = {
      job: job,
      color: color,
    };
    var newArr = extraCards.map((card) => {
      if (card.id === currCardID) return newCard;
      else return card;
    });
    setExtraCards(newArr);
    // setExtraCards({ ...extraCards });
    handleCloseEditCardForm();
  };

  const deleteCard = (id) => {
    console.log('delete card:', id);
    var newArr = extraCards
      .map((card) => {
        if (card.id !== id) {
          return card;
        }
      })
      .filter((n) => n);
    setExtraCards(newArr);
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

  const [openBonusModal, setOpenBonusModal] = React.useState(false);
  const handleOpenBonusModal = () => {
    setOpenBonusModal(true);
  };

  const handleCloseBonusModal = () => setOpenBonusModal(false);

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
          <Button
            variant="contained"
            onClick={() => handleOpenBonusModal()}
            spacing={3}
          >
            Bonus
          </Button>
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
                  .map((ec) => {
                    return (
                      <Card_btn
                        color={ec.color}
                        job={jobs[ec.job]}
                        isExtraCard={true}
                        handleOpenEditCardForm={handleOpenEditCardForm}
                        id={ec.id}
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

        <Modal open={openBonusModal} onClose={handleCloseBonusModal}>
          <Box sx={modalStyle}>
            <BonusForm></BonusForm>
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}

export default Card_Logger;
