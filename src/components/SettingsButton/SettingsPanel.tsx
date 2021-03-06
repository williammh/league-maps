import React, { useContext } from 'react';
import { List, ListItem, Checkbox, ListItemText } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';

export const SettingsPanel = () => {
  const { selectedStats, setSelectedStats } = useContext(settingsContext);
  const settingsArray: Array<{category: string, show: boolean}> = [];
  
  for (const key in selectedStats) {
    settingsArray.push({category: key, show: selectedStats[key]})
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    const { value } = event.currentTarget.dataset
    selectedStats[value!] = !selectedStats[value!]
    setSelectedStats({...selectedStats})
  };

  return (
    <List
      dense
    >
      {settingsArray.map(({ category, show }) => (
        <ListItem
          button
          data-value={category}
          onClick={handleClick}
          key={`setting-${category}`}
          disableGutters
        >
          <ListItemText primary={category} style={{textTransform: 'uppercase'}} />
          <Checkbox checked={show} />
        </ListItem>
      ))}
    </List>
  );
}
