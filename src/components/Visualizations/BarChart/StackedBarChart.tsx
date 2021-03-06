import React, { useContext, useEffect } from 'react';
import { Card } from '@material-ui/core';
import * as d3 from 'd3';
import { leagueContext } from '../../../Contexts/LeagueContext';
import { settingsContext } from '../../../Contexts/SettingsContext';
import { useBarChartStyles } from './BarChart.styles';
import { getSeasonStats} from '../../../Util/Util';
import { fullStatNameDictionary } from '../../../Util/StatCategories';

export interface IStackedBarChartProps {
  statCategory: string
}

interface ITeamBar {
  id: number;
  name?: string;
  teamTotal: number;
  individualBars: Array<IIndividualBar>;
  color?: string;
}

interface IIndividualBar {
  personId: string;
  firstName: string;
  lastName: string;
  statValue: number;
  xPos: number;
  barWidth: number;
  color?: string;
}

export const StackedBarChart = (props: IStackedBarChartProps) => {
  const { statCategory } = props;
  const { league } = useContext(leagueContext);

  const { teamList, stats: leagueStats } = league;

  const { selectedYear } = useContext(settingsContext);
  const barChartClasses = useBarChartStyles();

  // const { [statCategory]: min } = leagueStats.min;
  // const { [statCategory]: median } = leagueStats.median;
  const { [statCategory]: max } = leagueStats.max;

  useEffect(() => {
    const barChartCard = document.querySelector('.bar-chart-container');
    const svgVerticalMargin = 26;
    const svgHorizontalMargin = 80;
    const svgHeight = barChartCard!.clientHeight - (svgVerticalMargin * 2);
    const svgWidth = barChartCard!.clientWidth - (svgHorizontalMargin * 2);
    const barMargin = 2;
    const barHeight = svgHeight / teamList.length;
    const xScale = d3.scaleLinear()
      .domain([0, max || 100])
      .range([0, svgWidth]);
    const xAxis = d3.axisBottom(xScale)
      .tickSizeOuter(0);
    const yScale = d3.scalePoint()
      .domain(teamList.map(team => team.name ?? `Team ${team.id}`))
      .range([0, svgHeight])
      .padding(.5);
    const yAxis = d3.axisLeft(yScale)
      .tickSizeInner(3)
      .tickSizeOuter(0);
        
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
          return {
            personId,
            firstName,
            lastName,
            statValue,
            xPos,
            barWidth,
            color: team.color
          };
        })
        .filter(({barWidth}) => barWidth > 0);

      return {
        id: team.id,
        name: team.name,
        teamTotal: team.stats[statCategory],
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
      .append('g')
      .selectAll('g')
      .data((d) => d.individualBars)
      .enter()
      .append('rect')
        .attr('x', (d) => d.xPos)
        .attr('width', (d) => d.barWidth)
        .attr('height', barHeight - barMargin)
        .attr('fill', (d) => d.color ?? 'gray' )
        
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

    // y axis label
    svg.append('g')
      .call(yAxis);

    return () => { svg.html(null) };
  });

  return (
    <Card
      classes={barChartClasses}
      className={`bar-chart-container ${statCategory}`}
    >
      <p>{statCategory} {fullStatNameDictionary[statCategory] ? `(${fullStatNameDictionary[statCategory]})` : ''}</p>
      <svg />
    </Card>
  )
}