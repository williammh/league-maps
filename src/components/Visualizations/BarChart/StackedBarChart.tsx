import React, { useContext, useEffect } from 'react';
import { Card } from '@material-ui/core';
import * as d3 from 'd3';
import { appStatsContext } from '../../../Contexts/AppStatsContext';
import { teamListContext } from '../../../Contexts/TeamListContext';
import { settingsContext } from '../../../Contexts/SettingsContext';
import { useBarChartStyles } from './BarChart.styles';
import { isBestInCategory, getSeasonStats } from '../../../Util/Util';

export interface IStackedBarChartProps {
  statCategory: string
}

interface ITeamBar {
  id: number;
  name?: string;
  teamTotal: number;
  individualBars: Array<IIndividualBar>;
}

interface IIndividualBar {
  personId: string;
  firstName: string;
  lastName: string;
  statValue: number;
  xPos: number;
  barWidth: number;
}

export const StackedBarChart = (props: IStackedBarChartProps) => {
  const { statCategory } = props;
  const { appStats } = useContext(appStatsContext);
  const { teamList } = useContext(teamListContext);
  const { selectedYear } = useContext(settingsContext);
  const barChartClasses = useBarChartStyles();

  const { [statCategory]: min } = appStats.min;
  const { [statCategory]: median } = appStats.median;
  const { [statCategory]: max } = appStats.max;

  useEffect(() => {
    const barPadding = 2;
    const barHeight = 30;
    const svgHeight = teamList.length * barHeight;
    const svgWidth = document.querySelector('.bar-chart-container')!.clientWidth - 160;
    const xScale = d3.scaleLinear()
      .domain([0, max || 100])
      .range([0, svgWidth]);
    const xAxis = d3.axisBottom(xScale);
        
    const dataset: Array<ITeamBar> = teamList.map((team) => {
      const barWidths: Array<number> = team.roster.map((player) => {
        const selectedSeasonStats = getSeasonStats(player, selectedYear as number)
        return xScale(selectedSeasonStats[statCategory] ?? 0);
      })

      const individualBars = team.roster
        .map((player, i) => {
          const { personId, firstName, lastName } = player
          const selectedSeasonStats = getSeasonStats(player, selectedYear as number);
          const statValue = selectedSeasonStats[statCategory] ?? 0;
          const xPos = i === 0 ? 0 : barWidths.reduce((acc, cur, idx) => idx < i ? acc + cur : acc); 
          const barWidth = barWidths[i];
          return { personId, firstName, lastName, statValue, xPos, barWidth };
        })
        .filter(({barWidth}) => barWidth > 0);

      return {
        id: team.id,
        name: team.name,
        teamTotal: team.teamStats[statCategory],
        individualBars
      };
    });

    const svg = d3.select(`.bar-chart-container.${statCategory} svg`)
      .attr('width', svgWidth)
      .attr('height', svgHeight);

    // bar
    svg.selectAll(`.bar-chart-container.${statCategory}`)
      .data(dataset)
      .enter()
      .append('g')
        .attr('transform', (d, i) => `translate(0, ${barHeight * i})`)
        .attr('data-team-id', (d) => d.id)
        .classed('best', (d) => isBestInCategory(d.teamTotal, statCategory, appStats))
      .append('g')
      .selectAll('g')
      .data((d) => d.individualBars)
      .enter()
      .append('rect')
        .attr('x', (d) => d.xPos)
        .attr('width', (d) => d.barWidth)
        .attr('height', barHeight - barPadding)
        
    // team label
    svg.selectAll('[data-team-id]')
      .append('text')
        .text((d: any) => d.name || `Team ${d.id}`)
        .attr('x', -6)
        .attr('y', barHeight / 2)
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'middle')

    // total stat label
    svg.selectAll('[data-team-id]')
      .append('text')
        .text((d: any) => d.teamTotal ? d.teamTotal.toFixed(1) : '')
        .attr('x', (d: any) => xScale(d.teamTotal) + 6)
        .attr('y', barHeight / 2)
        .attr('alignment-baseline', 'middle')
      
    // player name label
    svg.selectAll('[data-team-id]')
      .append('g')
      .selectAll('g')
      .data((d: any) => d.individualBars)
      .enter()
      .append('text')
        .text((d: any) => d.statValue ? `${d.firstName[0]}. ${d.lastName} ${d.statValue.toFixed(1)}` : '')
        .attr('x', (d: any) => d.xPos + (d.barWidth / 2))
        .attr('y', barHeight / 2)
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .classed('player-name-label', true)

    // x axis label
    svg.append('g')
      .attr('transform', `translate(0, ${svgHeight})`)
      .call(xAxis);
  
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