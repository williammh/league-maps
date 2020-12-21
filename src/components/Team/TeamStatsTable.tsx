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
import { useTableContainerStyles } from './TeamStatsTable.styles';
import { isBestInCategory } from '../../Util/Util';
import { fullStatNameDictionary } from '../../Util/StatCategories';
import { IStatDictionary } from '../../Types/types';

export interface ITeamStatsTableProps {
	teamId: number;
	stats: IStatDictionary;
}

export const TeamStatsTable = (props: ITeamStatsTableProps): JSX.Element => {
	const { teamId, stats: teamStats } = props;

	const { leagueStats } = useContext(leagueContext);
	const { selectedStats } = useContext(settingsContext);

	const selectedTeamStats = Object.entries(teamStats)
		.filter(([category]) => selectedStats[category]);

	const tableContainerClasses = useTableContainerStyles();

	return (
		<TableContainer classes={tableContainerClasses}>
			<Table padding='none' size='small'>
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
								className={`stat-value ${isBestInCategory(value, category, leagueStats) ? 'best' : ''}`}
							>
								{value?.toFixed(1)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}