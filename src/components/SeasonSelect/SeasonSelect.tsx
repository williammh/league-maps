import React, { useContext, useEffect } from 'react';
import { Select, FormControl, InputLabel, MenuItem, makeStyles, createStyles, Theme } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { useSeasonSelectStyles } from './SeasonSelect.style'


export const SeasonSelect = () => {
  const { settings, setSelectedYear } = useContext(settingsContext);
  const { selectedYear } = settings;

  const seasonSelectClasses = useSeasonSelectStyles();

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = event.target;
    setSelectedYear(value as number);
  };

  return (
    <FormControl
      variant='outlined'
      classes={seasonSelectClasses}
    >
      <InputLabel>Season</InputLabel>
      <Select
        value={selectedYear}
        onChange={handleChange}
        autoWidth
      >
        <MenuItem value={2020}>2020 - 2021</MenuItem>
        <MenuItem value={2019}>2019 - 2020</MenuItem>
        <MenuItem value={2018}>2018 - 2019</MenuItem>
        <MenuItem value={2017}>2017 - 2018</MenuItem>
        <MenuItem value={2016}>2016 - 2017</MenuItem>
        <MenuItem value={2015}>2015 - 2016</MenuItem>
        <MenuItem value={2014}>2014 - 2015</MenuItem>
        <MenuItem value={2013}>2013 - 2014</MenuItem>
        <MenuItem value={2012}>2012 - 2013</MenuItem>
        <MenuItem value={2011}>2011 - 2012</MenuItem>
        <MenuItem value={2010}>2010 - 2011</MenuItem>
      </Select>
    </FormControl>
  );
}
