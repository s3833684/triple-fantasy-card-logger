import React, { useEffect, useLayoutEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';

import { jobs, colors } from './Card_Logger';
import Card_btn from './Card_btn';

function BonusForm(props) {
  var [defaultCards, setDefaultCards] = useState([]);
  //store the selectd cards, in the form of index in defaultCards
  const [selectedCards, setSelectedCards] = useState([]);

  var [scoreTable, setScoreTable] = useState([]);

  const [result, setResult] = useState([]);

  useEffect(() => {
    //create the default card table to store the detail of each card
    var cards = colors
      .map((color) => {
        return Object.keys(jobs).map((job) => {
          return { color: color, job: job, clicked: false };
        });
      })
      .reduce((prevArr, currArr) => prevArr.concat(currArr), []);
    setDefaultCards(cards);
    defaultCards = cards;
    create3DCardArr();
    // console.log(expectedScoreByDispose(scoreTable, [], [0, 9, 18]));
  }, []);

  const onClick = (id) => {
    //if the card already in the array, remove it
    const oldLength = selectedCards.length;
    var newArr = selectedCards.filter((cardIndex) => cardIndex !== id);
    setSelectedCards(newArr);
    if (newArr.length !== oldLength) {
      defaultCards[id].clicked = !defaultCards[id].clicked;
      setDefaultCards([...defaultCards]);
      return;
    }
    //if the card array is full, do nothing if it is not in the array(checked above)
    if (selectedCards.length == 3) return;

    //normal situation, add card and if the array length reach 3, run the calculation
    selectedCards.push(id);
    setSelectedCards(selectedCards);
    if (selectedCards.length === 3) {
      console.log('combination', combinationOfSelectedCards(selectedCards));
      bruteForceBestChoice(scoreTable, selectedCards);

      //   console.log(calculateScore(selectedCards));
    }

    //update the default array to update the ui
    defaultCards.map((card, index) => {
      if (index === id) {
        card.clicked = true;
      }
      return card;
    });
    setDefaultCards([...defaultCards]);
  };

  function calculateScore(selectedCards) {
    var arr = selectedCards.map((i) => {
      return defaultCards[i];
    });
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
      return 3;
    }
    //arcane
    if (colorSet.size === 3) {
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
      return 6;
    }
    //if total size of the set is 1, must be triple
    if (steelSet.size + magicSet.size + faithSet.size === 1) {
      return 7.5;
    }
    //if two sets are empty, must be straight or flush, straight is returned above so must be flush
    if (
      (!steelSet.size && !magicSet.size) ||
      (!steelSet.size && !faithSet.size) ||
      (!magicSet.size && !faithSet.size)
    ) {
      return 3;
    }
    //if any one of the set is empty, and the total is 2, must be double
    if (
      (!steelSet.size || !magicSet.size || !faithSet.size) &&
      steelSet.size + magicSet.size + faithSet.size === 2
    ) {
      return 2;
    }
    return 1;
  }

  function create3DCardArr() {
    //create a 27x27x27 3d array to store all the combination of cards
    const numbers = [...Array(27).keys()];
    var result = numbers.map((c1) => {
      return numbers.map((c2) => {
        return numbers.map((c3) => {
          return [c1, c2, c3];
        });
      });
    });

    //score table that remove the duplicated card results
    //i.e. set the score to 0 if two or cards are equal
    //which does not exist in the bonus game
    scoreTable = result.map((arr2D, i) => {
      return arr2D.map((arr, j) => {
        return arr.map((cardsArr, k) => {
          return i === k || j === k || k === i ? 0 : calculateScore(cardsArr);
        });
      });
    });
    setScoreTable(scoreTable);

    // code for testing the function
    // const numbers3 = [...Array(4).keys()];
    // var result3 = numbers3.map((c1) => {
    //   return numbers3.map((c2) => {
    //     return numbers3.map((c3) => {
    //       return 1 + c1 + c2 + c3;
    //     });
    //   });
    // });
    // console.log('all 1 3D array', result3);
    // expectedScoreByDispose(result3, [0], [0, 1, 2]);
  }

  //function to calculate the expected value of total score after dispose the cards in the cardArr
  function expectedScoreByDispose(cardArr3D, disposeCards, selectedCards) {
    var filteredSelectedCards = selectedCards.filter(
      (id) => !disposeCards.includes(id)
    );
    // console.log('dipose cards', disposeCards);
    // console.log('hold cards', filteredSelectedCards);

    //the 3d score array that removed the dispose cards
    var rmDCGrid = cardArr3D.map((cardArr2D, i) => {
      return cardArr2D.map((cardArr, j) => {
        return cardArr.map((score, k) => {
          return disposeCards.includes(i) ||
            disposeCards.includes(j) ||
            disposeCards.includes(k)
            ? 0
            : score;
        });
      });
    });

    //the 3d score array that removed the dispose cards
    var temp = rmDCGrid
      .map((cardArr2D, i) => {
        return cardArr2D.map((cardArr, j) => {
          return cardArr.map((score, k) => {
            //if filtered selected card has items, set the cells not in these items to 0
            //e.g. filtered selected card has 1 item n and n == 0, set i = 0 and set all values of the scoretable that i != 0 to 0
            return (filteredSelectedCards[0] !== undefined &&
              i !== filteredSelectedCards[0]) ||
              (filteredSelectedCards[1] !== undefined &&
                j !== filteredSelectedCards[1]) ||
              (filteredSelectedCards[2] !== undefined &&
                k !== filteredSelectedCards[2])
              ? 0
              : score;
          });
        });
      })
      .flat(3)
      .filter((n) => n);
    return (
      temp.reduce((prevTotal, currTotal) => prevTotal + currTotal, 0) /
      temp.length
    );
  }

  //function to create all combination of selected cards
  function combinationOfSelectedCards(selectedCards) {
    //there are 4 different cases
    //1. do not dispose => 1 combination
    //2. dispose 1 card => 3 combinations
    //3. dispose 2 cards => 3 combinations
    //4. dispose 3 cards => 1 combination
    //total 8 combinations

    //include case 1, dispose nothing by an empty array
    var result = [[]];
    //case 2
    selectedCards.forEach((i) => result.push([i]));
    //case 3
    var temp = [...selectedCards];
    temp
      .flatMap((c1, i) =>
        temp.slice(i + 1).map((c2) => {
          return [c1, c2];
        })
      )
      .forEach((comb) => result.push(comb));
    //case 4
    result.push(selectedCards);
    return result;
  }

  //brute force method to calculate the the best combination that give largest expected value
  function bruteForceBestChoice(cardArr3D, selectedCards) {
    const disposeCombs = combinationOfSelectedCards(selectedCards);
    var result = disposeCombs.map((comb) => {
      console.log('comb', comb);
      console.log(expectedScoreByDispose(cardArr3D, comb, selectedCards));
      return {
        option: comb,
        EV: expectedScoreByDispose(cardArr3D, comb, selectedCards),
      };
    });
    console.log(result);
    setResult(result);
  }

  return (
    <div>
      <Box sx={{ width: '100%', flexgrow: 1 }}>
        <Grid container spacing={2}>
          {result.map((r) => {
            return (
              <Grid item xs={6}>
                <Grid item container xs={12}>
                  <Stack direction="row" spacing={2} justifyContent="center">
                    {r.option.map((card) => {
                      return (
                        <Card_btn
                          color={defaultCards[card].color}
                          job={jobs[defaultCards[card].job]}
                          onClick={() => {}}
                        ></Card_btn>
                      );
                    })}
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <p>EV: {r.EV}</p>
                </Grid>
              </Grid>
            );
          })}
        </Grid>
        <Grid container spacing={2}>
          {defaultCards.map((card, i) => {
            return (
              <Grid item xs={1.33}>
                <Card_btn
                  variant={card.clicked ? 'outlined' : 'contained'}
                  color={card.color}
                  job={jobs[card.job]}
                  onClick={() => onClick(i)}
                  id={i}
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
