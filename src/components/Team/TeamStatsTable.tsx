import React, { useContext, useEffect, useRef } from 'react';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer
} from '@material-ui/core'
import { useTableContainerStyles } from './TeamStatsTable.styles';
import { calcStatsArray, isBestInCategory } from '../../Util';
import { IStatCategory, ITeamStats } from '../../Types/types';
import { select } from 'd3';

export interface ITeamStatsTableProps {
	teamId: number;
	teamStats: ITeamStats;
}

export const TeamStatsTable = (props: ITeamStatsTableProps): JSX.Element => {
	const { teamId, teamStats } = props;

	const { appStats } = useContext(appStatsContext);
	const { selectedStats } = useContext(settingsContext);

	const teamStatsArray: Array<IStatCategory> = calcStatsArray(teamStats)
    .filter(({label}: IStatCategory) => selectedStats[label]);

	const tableContainerClasses = useTableContainerStyles();

	return (
		<TableContainer classes={tableContainerClasses}>
			<Table padding='none' size='small'>
				<TableBody>
					{teamStatsArray.map(({ label, total }: IStatCategory) => {
						return (
							<TableRow key={`total-stats-row-${teamId}-${label}`}>
								<TableCell className='stat-label'>
									{label}
								</TableCell>
								<TableCell
									className={`stat-value ${isBestInCategory(total, label, appStats) ? 'best' : ''}`}
								>
									{total.toFixed(1)}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}