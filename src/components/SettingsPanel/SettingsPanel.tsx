import React, { useContext, useEffect } from 'react';
import { List, ListItem, Checkbox } from '@material-ui/core'
import { settingsContext } from '../../Contexts/SettingsContext';
import { useSettingsPanelStyles } from './SettingsPane.styles';

export const SettingsPanel = () => {

  const { settings, setSettings } = useContext(settingsContext);
  const { visibleStats } = settings;
  const settingsArray: Array<{label: string, show: boolean}> = [];
  for (const key in visibleStats) {
    settingsArray.push({label: key, show: visibleStats[key]})
  }

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    const { value } = event.currentTarget.dataset
    visibleStats[value!] = !visibleStats[value!]
    settings.visibleStats = visibleStats;
    setSettings({...settings})
  };

  const settingsClasses = useSettingsPanelStyles()

  return (
    <List
      dense
      classes={settingsClasses}
    >
      {settingsArray.map(category => {
        const { label, show } = category;
        return (
          <ListItem
            button
            data-value={label}
            onClick={handleClick}
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
