import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  FormControl, InputLabel, Select, MenuItem,
} from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  list: {
    width: 150,
    [theme.breakpoints.up('sm')]: {
      width: 250,
    },
  },
}));

interface IBaseSelectProps {
  selectSetting: {
    label: string,
    selected: string,
    options: any[]
    handleChange: (event: any) => void
  }
}

export default function BaseSelect({ selectSetting }: IBaseSelectProps) {
  return (
    <FormControl fullWidth>
          <InputLabel id={`${selectSetting.label}-select-label`}>{selectSetting.label}</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={selectSetting.selected}
            label="Age"
            onChange={selectSetting.handleChange}
          >
            {
              selectSetting.options.map((item: any) => <MenuItem value={item.value}>{item.label}</MenuItem>)
            }
          </Select>
        </FormControl>
  );
}
