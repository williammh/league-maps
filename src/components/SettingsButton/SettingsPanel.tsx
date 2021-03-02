import React, { useContext, useEffect } from 'react';
import { List, ListItem, Checkbox } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';

export const SettingsPanel = () => {
  const { selectedStats, setSelectedStats } = useContext(settingsContext);
  const settingsArray: Array<{label: string, show: boolean}> = [];
  
  for (const key in selectedStats) {
    settingsArray.push({label: key, show: selectedStats[key]})
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { value } = event.currentTarget.dataset
    selectedStats[value!] = !selectedStats[value!]
    setSelectedStats({...selectedStats})
  };


  return (
    <List
      dense
    >
      {settingsArray.map(({ label, show }) => (
        <ListItem
          button
          data-value={label}
          onClick={handleClick}
          key={`setting-${label}`}
        >
          <Checkbox checked={show} />
          <span style={{textTransform: 'uppercase'}}>{label}</span>
        </ListItem>
      ))}
    </List>
  );
}
