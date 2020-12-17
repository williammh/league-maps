import React, { useContext, useEffect, useState } from 'react';
import { settingsContext } from '../../Contexts/SettingsContext';
import { StackedBarChart } from './BarChart/StackedBarChart';

export const Visualizations = () => {
  const { selectedStats } = useContext(settingsContext);

  const showStatsArray: Array<string> = Object.keys(selectedStats)
    .filter(category => selectedStats[category]);

  return (
    <>
      {showStatsArray.map(category => (
        <StackedBarChart
          key={`bar-chart-${category}`}
          statCategory={category}
        />
      ))}
    </>
  )
}