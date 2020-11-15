import React, { useContext, useEffect } from 'react';
import { Card } from '@material-ui/core';
import * as d3 from 'd3';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { teamListContext } from '../../Contexts/TeamListContext';
import { useBarChartStyles } from './BarChart.styles';
import { isBestInCategory } from '../../Util'
import * as innersvg from 'innersvg-polyfill';

export interface IBarChartProps {
  statCategory: string
}

export const StackedBarChart = (props: IBarChartProps) => {
  const { statCategory } = props;
  const { appStats } = useContext(appStatsContext);
  const { teamList } = useContext(teamListContext);

  const barChartClasses = useBarChartStyles();

  const { [statCategory]: min } = appStats.min;
  const { [statCategory]: median } = appStats.median;
  const { [statCategory]: max } = appStats.max;

  useEffect(() => {
    const dataset: Array<Array<number>> = teamList.map((team) => {
      return team.roster.map(player => {
        return parseFloat(player.stats.regularSeason.season[0].total[statCategory])
      })
    }) 
    const teamLabels: Array<number> = teamList.map((team) => team.id);
    
    const barPadding = 2;
    const barHeight = 30;
    const svgHeight = dataset.length * barHeight;
    const svgWidth = 1000;
  
    const svg = d3.select(`.bar-chart-container.${statCategory} svg`)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const xScale = d3.scaleLinear()
      .domain([0, max || 100])
      .range([0, svgWidth]);
    
    const xAxis = d3.axisBottom(xScale);
  
    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(xAxis);
        
    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(dataset)
      .enter()
      .append('g')
        .attr('transform', (d, i) => `translate(0, ${barHeight * i})`)
        .classed('best', (d) => isBestInCategory(d.reduce((acc, cur) => (acc + cur), 0), statCategory, appStats))
      .selectAll('g')
      .data(d => d)
      .enter()
      .append('rect')
        .attr('width', (d) => xScale(d))
        .attr('height', barHeight - barPadding)
        .attr('transform', (d, i, nodes) => {
          if (i === 0) { return 'translate(0, 0)' };
          const xStart = [...nodes].map((node) => parseFloat(node.attributes[0].value))
            .reduce((acc, cur, idx) => idx < i ? acc + cur : acc )
          return `translate(${xStart}, 0)`;
        })
    
    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(dataset)
      .enter()
      .append('text')
        .text((d) => d.reduce((acc, cur) => (acc + cur), 0).toFixed(1))
        .attr('y', (d, i) => i * barHeight + (barHeight / 2 + 2))
        .attr('x', (d) => (xScale(d.reduce((acc, cur) => (acc + cur), 0))) + 6)

    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(teamLabels)
      .enter()
      .append('text')
        .text((d) => `Team ${d}`)
        .attr('y', (d, i) => i * barHeight + (barHeight / 2) + 2)
        .attr('transform', (d, i) => `translate(-56, 0)`)
  
    return () => { svg.html(null) };
  });

  return (
    <Card
      classes={barChartClasses}
      className={`bar-chart-container ${statCategory}`}
    >
      <h4>{statCategory}</h4>
      <svg />
    </Card>
  )
}