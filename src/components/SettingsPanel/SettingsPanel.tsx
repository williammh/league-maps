import React, { useContext, useEffect } from 'react';
import { List, ListItem, Checkbox } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { useSettingsPanelStyles } from './SettingsPane.styles';

export const SettingsPanel = () => {

  const { visibleStats, setVisibleStats } = useContext(settingsContext);
  const settingsArray: Array<{label: string, show: boolean}> = [];
  for (const key in visibleStats) {
    settingsArray.push({label: key, show: visibleStats[key]})
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { value } = event.currentTarget.dataset
    visibleStats[value!] = !visibleStats[value!]
    setVisibleStats(visibleStats)
  };

  const settingsClasses = useSettingsPanelStyles()

  return (
    <List
      dense
      classes={settingsClasses}
    >
      {settingsArray.map(({ label, show }) => {
        return (
          <ListItem
            button
            data-value={label}
            onClick={handleClick}
            key={`setting-${label}`}
          >
            <Checkbox
              checked={show}
            />
            <span style={{textTransform: 'uppercase'}}>{label}</span>
          </ListItem>
        )
      })}
    </List>
  );
}
