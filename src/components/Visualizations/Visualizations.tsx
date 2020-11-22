import React, { useContext, useEffect, useState } from 'react';
import { settingsContext } from '../../Contexts/SettingsContext';
import { StackedBarChart } from '../BarChart/StackedBarChart';

export const Visualizations = () => {
  const { selectedStats } = useContext(settingsContext);

  const showStatsArray: Array<string> = [];
  for (const key in selectedStats) {
    if(!selectedStats[key]) { continue }
    showStatsArray.push(key)
  }

  return (
    <div style={{width: '100%'}}>
      {showStatsArray.map(category => {
        return (
          <StackedBarChart
            key={`bar-chart-${category}`}
            statCategory={category}
          />
        )
      })}
    </div>
  )
}