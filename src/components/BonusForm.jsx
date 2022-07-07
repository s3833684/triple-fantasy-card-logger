import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { jobs, colors } from './Card_Logger';
import Card_btn from './Card_btn';

function BonusForm(props) {
  const [cardsArr, setCardsArr] = useState([]);

  var defaultCards = colors
    .map((color) => {
      return Object.keys(jobs).map((job) => {
        return { color: color, job: job, clicked: false };
      });
    })
    .reduce((prevArr, currArr) => prevArr.concat(currArr), []);

  const onClick = (card) => {
    cardsArr.push(card);
    setCardsArr(cardsArr);
    if (cardsArr.length === 3) {
      console.log(calculateScore(cardsArr));
    }
    var i = defaultCards.findIndex(
      (c) => c.job == card.job && c.color == card.color
    );
    console.log(i);
    defaultCards[i].clicked = true;
    // setCardsArr([]);
    console.log(cardsArr.includes(card));
  };

  function calculateScore(arr) {
    return calculateColorScore(arr) * calculateJobScore(arr);
  }

  function calculateColorScore(arr) {
    var colorSet = new Set(
      arr.map((card) => {
        return card.color;
      })
    );
    //same color
    if (colorSet.size === 1) {
      console.log('same color combo');
      return 3;
    }
    //arcane
    if (colorSet.size === 3) {
      console.log('arcane');
      return 2.5;
    }
    return 1;
  }

  function calculateJobScore(arr) {
    var steelSet = new Set();
    var magicSet = new Set();
    var faithSet = new Set();
    arr.forEach((card) => {
      if (['knight', 'thief', 'warrior'].includes(card.job))
        steelSet.add(card.job);
      if (['sorcerer', 'wizard', 'warlock'].includes(card.job))
        magicSet.add(card.job);
      if (['monk', 'paladin', 'priest'].includes(card.job))
        faithSet.add(card.job);
    });
    //if any one set has 3, it must be straight
    if (steelSet.size === 3 || magicSet.size === 3 || faithSet.size === 3) {
      console.log('straight');
      return 6;
    }
    //if total size of the set is 1, must be triple
    if (steelSet.size + magicSet.size + faithSet.size === 1) {
      console.log('triple');
      return 7.5;
    }
    //if two sets are empty, must be straight or flush, straight is returned above so must be flush
    if (
      (!steelSet.size && !magicSet.size) ||
      (!steelSet.size && !faithSet.size) ||
      (!magicSet.size && !faithSet.size)
    ) {
      console.log('flush');
      return 3;
    }
    //if any one of the set is empty, and the total is 2, must be double
    if (
      (!steelSet.size || !magicSet.size || !faithSet.size) &&
      steelSet.size + magicSet.size + faithSet.size === 2
    ) {
      console.log('double');
      return 2;
    }
    return 1;
  }

  return (
    <div>
      <h1>Color combo:{}</h1>
      <Box sx={{ width: '100%', flexgrow: 1 }}>
        <Grid container spacing={2}>
          {defaultCards.map((card) => {
            return (
              <Grid item xs={1.33}>
                <Card_btn
                  variant={cardsArr.includes(card) ? 'contained' : 'outlined'}
                  color={card.color}
                  job={jobs[card.job]}
                  onClick={() => onClick(card)}
                ></Card_btn>
              </Grid>
            );
          })}
        </Grid>
      </Box>
    </div>
  );
}

export default BonusForm;
