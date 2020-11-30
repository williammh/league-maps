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
import { calcStatsArray, isBestInCategory } from '../../Util/Util';
import { IStat, IStatDictionary } from '../../Types/types';
import { select } from 'd3';

export interface ITeamStatsTableProps {
	teamId: number;
	teamStats: IStatDictionary;
}

export const TeamStatsTable = (props: ITeamStatsTableProps): JSX.Element => {
	const { teamId, teamStats } = props;

	const { appStats } = useContext(appStatsContext);
	const { selectedStats } = useContext(settingsContext);

	const teamStatsArray: Array<IStat> = calcStatsArray(teamStats)
    .filter(({category}: IStat) => selectedStats[category]);

	const tableContainerClasses = useTableContainerStyles();

	return (
		<TableContainer classes={tableContainerClasses}>
			<Table padding='none' size='small'>
				<TableBody>
					{teamStatsArray.map(({ category, value }: IStat) => {
						return (
							<TableRow key={`total-stats-row-${teamId}-${category}`}>
								<TableCell className='stat-label'>
									{category}
								</TableCell>
								<TableCell
									className={`stat-value ${isBestInCategory(value, category, appStats) ? 'best' : ''}`}
								>
									{value.toFixed(1)}
								</TableCell>
							</TableRow>
						)
					})}
				</TableBody>
			</Table>
		</TableContainer>
	)
}