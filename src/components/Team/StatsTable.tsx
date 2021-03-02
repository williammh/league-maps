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
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

export interface ITeamStatsTableProps {
	teamId: number;
	stats: IStatDictionary;
	color: string;
}

export const StatsTable = (props: ITeamStatsTableProps): JSX.Element => {
	const { teamId, stats, color } = props;

	const { leagueStats } = useContext(leagueContext);
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
								<span style={{verticalAlign: 'middle'}}>
									{value?.toFixed(1)}
								</span>
								
								<CheckCircleIcon
									style={{
										fontSize: 12,
										verticalAlign: 'middle',
										visibility: isBestInCategory(value, category, leagueStats) ? 'visible' : 'hidden'
									}}
								/>
						
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	)
}