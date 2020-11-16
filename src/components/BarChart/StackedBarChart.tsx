import React, { useContext, useEffect } from 'react';
import { Card } from '@material-ui/core';
import * as d3 from 'd3';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { teamListContext } from '../../Contexts/TeamListContext';
import { useBarChartStyles } from './BarChart.styles';
import { isBestInCategory } from '../../Util'

export interface IStackedBarChartProps {
  statCategory: string
}

interface ITeamBar {
  teamId: number;
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
  const barChartClasses = useBarChartStyles();

  const { [statCategory]: min } = appStats.min;
  const { [statCategory]: median } = appStats.median;
  const { [statCategory]: max } = appStats.max;

  useEffect(() => {
    const barPadding = 2;
    const barHeight = 30;
    const svgHeight = teamList.length * barHeight;
    const svgWidth = 1000;
    const xScale = d3.scaleLinear()
      .domain([0, max || 100])
      .range([0, svgWidth]);
    const xAxis = d3.axisBottom(xScale);
        
    const dataset: Array<ITeamBar> = teamList.map((team) => {
      const barWidths = team.roster.map((player) => {
        return xScale(parseFloat(player.stats.regularSeason.season[0].total[statCategory]));
      })
      const individualBars = team.roster.map((player, i) => {
        const { personId, firstName, lastName } = player;
        const statValue = parseFloat(player.stats.regularSeason.season[0].total[statCategory]);
        const xPos = i === 0 ? 0 : barWidths.reduce((acc, cur, idx) => idx < i ? acc + cur : acc); 
        const barWidth = barWidths[i];
        return { personId, firstName, lastName, statValue, xPos, barWidth };
      });

      return {
        teamId: team.id,
        teamTotal: team.totalStats[statCategory],
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
        .attr('data-team-id', (d) => d.teamId)
        .classed('best', (d) => isBestInCategory(d.teamTotal, statCategory, appStats))
      .append('g')
      .selectAll('g')
      .data((d: any) => d.individualBars)
      .enter()
      .append('rect')
        .attr('x', (d: any) => d.xPos)
        .attr('width', (d: any) => d.barWidth)
        .attr('height', barHeight - barPadding)
        .attr('data-person-id', (d: any) => d.personId)
    
    // team label
    svg.selectAll('[data-team-id]')
      .append('text')
        .text((d: any) => `Team ${d.teamId}`)
        .attr('x', -6)
        .attr('y', barHeight / 2)
        .attr('text-anchor', 'end')
        .attr('alignment-baseline', 'middle')

    // total stat label
    svg.selectAll('[data-team-id]')
      .append('text')
        .text((d: any) => d.teamTotal.toFixed(1))
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
        .text((d: any) => `${d.firstName[0]}. ${d.lastName}`)
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