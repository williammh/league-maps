import React, { useContext, useEffect, useRef } from 'react';
import { leagueContext } from '../../Contexts/LeagueContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Tooltip
} from '@material-ui/core'
import { useStatsTableStyles } from './StatsTable.styles';
import { isBestInCategory } from '../../Util/Util';
import { fullStatNameDictionary } from '../../Util/StatCategories';
import { IStatDictionary } from '../../Types/types';
import { useTableContainerStyles } from './Team.styles';


export interface ITeamStatsTableProps {
	teamId: number;
	stats: IStatDictionary;
	color: string;
}

export const StatsTable = (props: ITeamStatsTableProps): JSX.Element => {
	const { teamId, stats, color } = props;

	const { league } = useContext(leagueContext);

	const { stats: leagueStats } = league;

	const { selectedStats } = useContext(settingsContext);

	const selectedTeamStats = Object.entries(stats)
		.filter(([category]) => selectedStats[category]);

	const tableContainerClasses = useTableContainerStyles({width: '40%'});
	const statsTableClasses = useStatsTableStyles({color});

	return (
		<TableContainer classes={tableContainerClasses}>
			<Table padding='none' size='small' classes={statsTableClasses}>
				<TableBody>
					{selectedTeamStats.map(([ category, value ]) => (
						<TableRow key={`total-stats-row-${teamId}-${category}`}>
							{fullStatNameDictionary[category] ? (
								<Tooltip
									title={fullStatNameDictionary[category]}
									placement='top'
								>
									<TableCell className='stat-label'>{category}</TableCell>
								</Tooltip>
							) : (
								<TableCell className='stat-label'>{category}</TableCell>
							)}
							<TableCell
								className={`stat-value`}
							>
								{isBestInCategory(value, category, leagueStats) && (
									<span>&#x2605;</span>
								)}
								<span style={{verticalAlign: 'middle'}}>
									{value?.toFixed(1)}
								</span>
								
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}