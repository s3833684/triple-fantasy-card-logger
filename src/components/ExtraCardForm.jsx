import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';

function ExtraCardForm(props) {
  const jobs = props.jobs;
  const colors = ['red', 'blue', 'green'];
  const [job, setJob] = useState('');
  const [color, setColor] = useState('');
  const [num, setNum] = useState(1);
  const [error, setError] = useState('');

  const handleChangeJob = (event) => {
    setJob(event.target.value);
  };
  const handleChangeColor = (event) => {
    setColor(event.target.value);
  };
  const handleChangeNumber = (event) => {
    setNum(event.target.value);
  };

  const handleSubmit = () => {
    if (num < 1 || num > 9) {
      setError('number can only between 1 and 9');
    } else if (!job || !color) {
      setError('Invalid Input');
    } else {
      var newCard = {
        job: job,
        color: color,
      };
      if (props.addExtraCard(newCard, num)) setError('');
      else setError('Total number of extra cards more than 9');
    }
  };

  return (
    <div>
      <h1>{error}</h1>
      <FormControl fullWidth>
        <InputLabel id="job-label">Job</InputLabel>
        <Select
          labelId="job-label"
          id="job-select"
          value={job}
          label="job"
          onChange={handleChangeJob}
        >
          {Object.keys(jobs).map((key) => {
            return (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <InputLabel id="color-label">Color</InputLabel>
        <Select
          labelId="color-label"
          id="color-select"
          value={color}
          label="color"
          onChange={handleChangeColor}
        >
          {colors.map((key) => {
            return (
              <MenuItem value={key} key={key}>
                {key}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <TextField
          id="filled-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          onChange={handleChangeNumber}
        />
      </FormControl>
      <FormControl fullWidth sx={{ mt: 3 }}>
        <Button onClick={handleSubmit}>Add</Button>
      </FormControl>
    </div>
  );
}

export default ExtraCardForm;
