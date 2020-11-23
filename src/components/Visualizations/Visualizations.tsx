import React, { useContext, useEffect, useState } from 'react';
import { settingsContext } from '../../Contexts/SettingsContext';
import { StackedBarChart } from '../BarChart/StackedBarChart';

export const Visualizations = () => {
  const { selectedStats } = useContext(settingsContext);

  const showStatsArray: Array<string> = Object.keys(selectedStats)
    .filter(category => selectedStats[category]);

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