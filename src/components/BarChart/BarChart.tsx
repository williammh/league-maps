import React, { useContext, useEffect } from 'react';
import { Card } from '@material-ui/core';
import * as d3 from 'd3';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { teamListContext } from '../../Contexts/TeamListContext';
import { useBarChartStyles } from './BarChart.styles';
import { isBestInCategory } from '../../Util'

export interface IBarChartProps {
  statCategory: string
}

export const BarChart = (props: IBarChartProps) => {
  const { statCategory } = props;
  const { appStats } = useContext(appStatsContext);
  const { teamList } = useContext(teamListContext);

  const barChartClasses = useBarChartStyles();

  const { [statCategory]: min } = appStats.min;
  const { [statCategory]: median } = appStats.median;
  const { [statCategory]: max } = appStats.max;

  useEffect(() => {
    const dataset = teamList.map((team) => team.totalStats[statCategory]) 
    const teamLabels = teamList.map((team) => team.id);
    
    const barPadding = 5;
    const barHeight = 50;
    const svgHeight = dataset.length * barHeight;
    const svgWidth = 1000;
  
    const svg = d3.select(`.bar-chart-container.${statCategory} svg`)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    const xScale = d3.scaleLinear()
      .domain([0, d3.max(dataset)!])
      .range([0, svgWidth]);
    
    const xAxis = d3.axisBottom(xScale);
  
    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(xAxis);
        
    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(dataset)
      .enter()
      .append('rect')
        .attr('width', (d) => xScale(d))
        .attr('height', barHeight - barPadding)
        .attr('transform', (d, i) => `translate(${[0, barHeight * i]})`)
        .classed('best', (d) => isBestInCategory(d, statCategory, appStats));
    
    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(dataset)
      .enter()
      .append('text')
        .text((d) => d?.toFixed(1))
        .attr('y', (d, i) => i * barHeight + (barHeight / 2 + 2))
        .attr('x', (d) => (xScale(d)) + 6)

    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(teamLabels)
      .enter()
      .append('text')
        .text((d) => `Team ${d}`)
        .attr('y', (d, i) => i * barHeight + (barHeight / 2) + 2)
        .attr('transform', (d, i) => `translate(${[-56, 0]})`)

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