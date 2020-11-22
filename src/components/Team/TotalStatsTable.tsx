import React, { useContext } from 'react';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import {
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer
} from '@material-ui/core'
import { useTableContainerStyles } from './TotalStatsTable.styles';
import { calcTotalStatsArray, isBestInCategory } from '../../Util';
import { IStatCategory, ITeamStats } from '../../Types/types';

export interface ITotalStatsTableProps {
	teamId: number;
	totalStats: ITeamStats;
}

export const TotalStatsTable = (props: ITotalStatsTableProps): JSX.Element => {
	const { teamId, totalStats } = props;

	const { appStats } = useContext(appStatsContext);

	const totalStatsArray = calcTotalStatsArray(totalStats);

	const tableContainerClasses = useTableContainerStyles();

	return (
		<TableContainer classes={tableContainerClasses}>
			<Table>
				<TableBody>
					{totalStatsArray.map(({ label, total }: IStatCategory) => {
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