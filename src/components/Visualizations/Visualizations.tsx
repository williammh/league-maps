import React, { useContext, useEffect, useState } from 'react';
import { settingsContext } from '../../Contexts/SettingsContext';
import { teamListContext } from '../../Contexts/TeamListContext';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { Card } from '@material-ui/core';
import { defaultCategories } from '../../Util';
import { BarChart } from '../BarChart/BarChart';

export const Visualizations = () => {
  const { teamList, setTeamList } = useContext(teamListContext);

  const { settings, setSettings } = useContext(settingsContext);
  const { visibleStats } = settings;

  let showStatsArray: Array<string> = [];
  for (const key in visibleStats) {
    if(!visibleStats[key]) { continue }
    showStatsArray.push(key)
  }

  return (
    <div style={{width: '100%'}}>
      {showStatsArray.map(category => {
        return (
          <BarChart statCategory={category}/>
        )
      })}
    </div>
  )
}