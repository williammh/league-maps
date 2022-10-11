import React, { useContext, useEffect, useState } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { useSeasonSelectStyles } from './SeasonSelect.style'

export const SeasonSelect = () => {
  const { selectedYear, setSelectedYear } = useContext(settingsContext);

  const seasonSelectClasses = useSeasonSelectStyles();

  const handleChange = ({ target }: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = target;
    setSelectedYear(value as number);
  };

  const getAllAvailableSeasons = async (year: number) => {
    const result = [];
    let currentYear = year;
    let response;
    while(!response || response.ok) {
      response = await fetch(`https://data.nba.net/prod/v1/${currentYear}/players.json`);
      if (response.ok) {
        result.push(currentYear);
      }
      currentYear--;
    }
    return result;
  }

  const [options, setOptions] = useState([] as JSX.Element[]);

  useEffect(() => {
    if (options.length === 0) {
      (async () => {
        const yearOptions = await getAllAvailableSeasons(selectedYear as number);
        const menuItems = yearOptions.map((year: number) => {
          return (
            <MenuItem value={year}>{year} - {year + 1}</MenuItem>
          )
        })
        setOptions(menuItems);
      })();
    };
  }, [selectedYear]);

  return (
    <FormControl
      variant='outlined'
      classes={seasonSelectClasses}
    >
      <InputLabel>Season</InputLabel>
      <Select
        value={options.length ? selectedYear : "loading"}
        onChange={handleChange}
        autoWidth
      >
        {options.length ? options : <MenuItem value="loading">Loading...</MenuItem>}
      </Select>
    </FormControl>
  );
}
