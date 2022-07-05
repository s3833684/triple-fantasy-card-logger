import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Card_btn from './Card_btn';

import blank from '../Blank.png';
import colors from './Card_Logger';

function ExtraCardForm(props) {
  const jobs = props.jobs;
  const colors = ['red', 'blue', 'green'];
  const [job, setJob] = useState('');
  const [color, setColor] = useState('');
  const [num, setNum] = useState(1);
  const [error, setError] = useState('');

  const numbers = [...Array(9).keys()].map((i) => i + 1);

  const handleChangeJob = (newJob) => {
    setJob(newJob);
  };
  const handleChangeColor = (newColor) => {
    setColor(newColor);
  };
  const handleChangeNumber = (newNum) => {
    setNum(newNum);
  };

  const handleSubmit = () => {
    if (!job || !color) {
      setError('Invalid Input');
    } else {
      props.addExtraCard(job, color, num);
      setError('');
    }
  };

  return (
    <div>
      <h1>{error}</h1>
      <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
        {Object.keys(jobs).map((key) => {
          return (
            <Card_btn
              variant={job === key ? 'outlined' : 'contained'}
              color="grey"
              job={jobs[key]}
              onClick={() => handleChangeJob(key)}
            ></Card_btn>
          );
        })}
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
        {colors.map((key) => {
          return (
            <Card_btn
              variant={color === key ? 'outlined' : 'contained'}
              color={key}
              job={blank}
              onClick={() => handleChangeColor(key)}
            ></Card_btn>
          );
        })}
      </Stack>
      <Stack direction="row" spacing={2} justifyContent="center" padding={1}>
        {numbers.map((key) => {
          return (
            <Card_btn
              variant={num === key ? 'outlined' : 'contained'}
              color="primary"
              onClick={() => handleChangeNumber(key)}
              content={key}
            ></Card_btn>
          );
        })}
      </Stack>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Button onClick={handleSubmit}>Add</Button>
      </FormControl>
    </div>
  );
}

export default ExtraCardForm;
