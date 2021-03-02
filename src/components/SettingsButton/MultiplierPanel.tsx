import React, { useContext, useEffect } from 'react';
import { List, ListItem, Checkbox, TextField, ListItemText, Input, InputAdornment } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';

export const MultiplierPanel = () => {
  const {
    selectedStats,
    setSelectedStats,
    statMultipliers,
    setStatMultipliers,
    selectedFormat
  } = useContext(settingsContext);

  const statMultiplierArray: Array<{category: string, multiplier: number}> = [];

  
  for (const key in statMultipliers) {
    statMultiplierArray.push({category: key, multiplier: statMultipliers[key]})
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.currentTarget.dataset.category!;
    const multiplier = event.currentTarget.value;
    statMultipliers[category] = parseFloat(multiplier);
  };

  useEffect(() => {
    return () => {
      setStatMultipliers({...statMultipliers});
    };
  }, [])


  return (
    <List
      dense
    >
      {statMultiplierArray.map(({ category, multiplier }) => (
        <ListItem
          onClick={(ev) => ev.stopPropagation()}
          key={`setting-${category}`}
        >
          <ListItemText primary={category} />
          <TextField
            onChange={handleChange}
            size='small'
            variant='outlined'
            type='number'
            InputProps={{
              startAdornment: <InputAdornment position="start">&times;</InputAdornment>,
            }}
            inputProps={{
              'data-category': category,
              min: -10,
              max: 10
            }}
            defaultValue={multiplier}
          />
        </ListItem>

      ))}
    </List>
  );
}
