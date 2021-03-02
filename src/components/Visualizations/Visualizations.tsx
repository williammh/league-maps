import React, { useContext, useEffect, useState } from 'react';
import { settingsContext } from '../../Contexts/SettingsContext';
import { StackedBarChart } from './BarChart/StackedBarChart';
import { StackedBarChartPoints } from './BarChart/StackedBarChartPoints';

export const Visualizations = () => {
  const { selectedStats, selectedFormat } = useContext(settingsContext);

  const showStatsArray: Array<string> = Object.keys(selectedStats)
    .filter(category => selectedStats[category]);

  return (
    <>
      {selectedFormat === 'roto' && showStatsArray.map(category => (
        category !== 'scl' && (
          <StackedBarChart
            key={`bar-chart-${category}`}
            statCategory={category}
          />
        )
      ))}
      {selectedFormat === 'points' && (
        <StackedBarChartPoints />
      )}
    </>
  )
}