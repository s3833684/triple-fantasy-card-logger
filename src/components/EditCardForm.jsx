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

function ExtraCardForm(props) {
  const jobs = props.jobs;
  const colors = ['red', 'blue', 'green'];
  const [job, setJob] = useState('');
  const [color, setColor] = useState('');

  const handleChangeJob = (newJob) => {
    setJob(newJob);
  };
  const handleChangeColor = (newColor) => {
    setColor(newColor);
  };

  const handleSubmit = () => {
    var newCard = {
      job: job,
      color: color,
    };
    props.saveEditCard(newCard);
  };

  return (
    <div>
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
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Button onClick={() => handleSubmit()}>Save</Button>
      </FormControl>
    </div>
  );
}

export default ExtraCardForm;
