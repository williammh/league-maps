import React, { useContext, useEffect } from 'react';
import { Select, FormControl, InputLabel, MenuItem } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { useFormatSelectStyles } from './FormatSelect.style'
import { allStatCategories, defaultCategories, defaultRotoMultipliers, defaultEspnMultipliers } from '../../Util/StatCategories';


export const FormatSelect = () => {
  const { selectedFormat, setSelectedFormat, statMultipliers, setStatMultipliers } = useContext(settingsContext);

  const formatSelectClasses = useFormatSelectStyles();

  const handleChange = ({ target }: React.ChangeEvent<{ value: unknown }>) => {
    const { value } = target;
    setSelectedFormat(value as string);
  };

  useEffect(() => {
    const newMultipliers: any = {};
    if (selectedFormat === 'roto') {
      allStatCategories.forEach(category => {
        newMultipliers[category] = defaultRotoMultipliers[category] ?? 0
      })  
    } else if (selectedFormat === 'points') {
      allStatCategories.forEach(category => {
        newMultipliers[category] = defaultEspnMultipliers[category] ?? 0
      })  
    }
    
    setStatMultipliers(newMultipliers);
  }, [selectedFormat])

  return (
    <FormControl
      variant='outlined'
      classes={formatSelectClasses}
    >
      <InputLabel>Format</InputLabel>
      <Select
        value={selectedFormat}
        onChange={handleChange}
        autoWidth
      >
        <MenuItem value='roto'>Rotisserie</MenuItem>
        <MenuItem value='points'>Points</MenuItem>
      </Select>
    </FormControl>
  );
}
