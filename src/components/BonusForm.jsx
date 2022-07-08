import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

import { jobs, colors } from './Card_Logger';
import Card_btn from './Card_btn';

function BonusForm(props) {
  const [cardsArr, setCardsArr] = useState([]);
  const [defaultCards, setDefaultCards] = useState([]);

  const [colorCombo, setColorCombo] = useState('');
  const [colorScore, setColorScore] = useState('');
  const [patternCombo, setPatternCombo] = useState('');
  const [patternScore, setPatternScore] = useState('');

  useEffect(() => {
    var cards = colors
      .map((color) => {
        return Object.keys(jobs).map((job) => {
          return { color: color, job: job, clicked: false };
        });
      })
      .reduce((prevArr, currArr) => prevArr.concat(currArr), []);
    setDefaultCards(cards);
  }, []);

  const onClick = (card) => {
    //if the card already in the array, remove it
    const oldLength = cardsArr.length;
    var newArr = cardsArr.filter(
      (c) => c.job != card.job || c.color != card.color
    );
    setCardsArr(newArr);
    if (newArr.length !== oldLength) {
      card.clicked = !card.clicked;
      setColorCombo('');
      setColorScore('');
      setPatternCombo('');
      setPatternScore('');
      return;
    }
    //if the card array is full, do nothing if it is not in the array
    if (cardsArr.length == 3) return;

    //normal situation, add card and if the array length reach 3, run the calculation
    cardsArr.push(card);
    setCardsArr(cardsArr);
    if (cardsArr.length === 3) {
      calculateScore(cardsArr);
    }

    //update the default array to update the ui
    var i = defaultCards.findIndex(
      (c) => c.job == card.job && c.color == card.color
    );
    defaultCards.map((card, index) => {
      if (index === i) {
        card.clicked = !card.clicked;
      }
      return card;
    });
    setDefaultCards([...defaultCards]);
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
      setColorCombo('same color');
      setColorScore(3);
      return 3;
    }
    //arcane
    if (colorSet.size === 3) {
      setColorCombo('arcane');
      setColorScore(2.5);
      return 2.5;
    }
    setColorScore(1);
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
      setPatternCombo('straight');
      setPatternScore(6);
      return 6;
    }
    //if total size of the set is 1, must be triple
    if (steelSet.size + magicSet.size + faithSet.size === 1) {
      setPatternCombo('triple');
      setPatternScore(7.5);
      return 7.5;
    }
    //if two sets are empty, must be straight or flush, straight is returned above so must be flush
    if (
      (!steelSet.size && !magicSet.size) ||
      (!steelSet.size && !faithSet.size) ||
      (!magicSet.size && !faithSet.size)
    ) {
      setPatternCombo('flush');
      setPatternScore(3);
      return 3;
    }
    //if any one of the set is empty, and the total is 2, must be double
    if (
      (!steelSet.size || !magicSet.size || !faithSet.size) &&
      steelSet.size + magicSet.size + faithSet.size === 2
    ) {
      setPatternCombo('double');
      setPatternScore(2);
      return 2;
    }
    setPatternScore(1);
    return 1;
  }

  return (
    <div>
      <h1>Combo score: {colorScore * patternScore}</h1>
      <h1>
        Color combo: {colorCombo} {colorScore}
      </h1>
      <h1>
        Pattern combo: {patternCombo} {patternScore}
      </h1>
      <Box sx={{ width: '100%', flexgrow: 1 }}>
        <Grid container spacing={2}>
          {defaultCards.map((card) => {
            return (
              <Grid item xs={1.33}>
                <Card_btn
                  variant={card.clicked ? 'outlined' : 'contained'}
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
