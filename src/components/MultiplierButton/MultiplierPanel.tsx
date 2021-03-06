import React, { useContext, useEffect } from 'react';
import { List, ListItem, Button, TextField, ListItemText, InputAdornment } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { defaultStatMultipliers } from '../../Util/StatCategories'

export const MultiplierPanel = () => {
  const {
    statMultipliers,
    setStatMultipliers
  } = useContext(settingsContext);

  const statMultiplierArray: Array<{category: string, multiplier: number}> = [];

  for (const key in statMultipliers) {
    statMultiplierArray.push({category: key, multiplier: statMultipliers[key]})
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const category = event.currentTarget.dataset.category!;
    const multiplier = parseFloat(event.currentTarget.value ?? '0');
    const nextMultipliers = { ...statMultipliers };
    nextMultipliers[category] = multiplier;
    setStatMultipliers(nextMultipliers);
  };

  const resetStatMultipliers = () => {
    setStatMultipliers(defaultStatMultipliers);
  }

  return (
    <div>
      <Button
        variant='contained'
        size='small'
        color='primary'
        onClick={resetStatMultipliers}
      >
        Reset Defaults
      </Button>
      <List
        dense
      >
        {statMultiplierArray.map(({ category, multiplier }) => {
          return (
            <ListItem
              key={`setting-${category}`}
              disableGutters
            >
              <ListItemText primary={category} style={{textTransform: 'uppercase'}} />
              <TextField
                onChange={handleChange}
                size='small'
                variant='outlined'
                type='number'
                InputProps={{
                  startAdornment: <InputAdornment position="start">&times;</InputAdornment>,
                }}
                inputProps={{
                  'data-category': category
                }}
                value={multiplier}
                style={{ width: 100, marginLeft: 6 }}
              />
            </ListItem>
          )
        })}
      </List>
    </div>
  );
}
