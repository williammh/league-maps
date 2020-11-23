import React, { useContext, useEffect } from 'react';
import {
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Avatar
} from '@material-ui/core'
import { IPlayerSearchResult, Player } from '../../Types/types';
import { useTableContainerStyles } from './RosterTable.styles';
import { maxTeamSize, getSeasonStats } from '../../Util';
import { UndraftedRow } from './UndraftedRow'
import RemoveIcon from '@material-ui/icons/Remove';


export interface IRosterTableProps {
	teamId: number;
	roster: Array<Player>;
	addPlayer: (personId: string, allPlayers: Array<IPlayerSearchResult>) => Promise<void>;
	removePlayer: (personId: string) => void;
	selectedYear: number;
	allPlayers: Array<IPlayerSearchResult>;
}

export const RosterTable = (props: IRosterTableProps): JSX.Element => {
	const { teamId, roster, removePlayer, addPlayer, selectedYear, allPlayers } = props;

	const tableContainerClasses = useTableContainerStyles();

	const truncatePlayerName = (firstName: string, lastName: string): string => {
		// to do
		// http://www.java2s.com/Tutorials/Javascript/Javascript_Style_How_to/Text/Detect_text_overflow.htm
		const maxLength = "Giannis Antetokounmpo".length
		return `${firstName} ${lastName}`.length >= maxLength ? `${firstName[0]}. ${lastName}` : `${firstName} ${lastName}`;
	}

	const playerRows = roster.map((player: Player, i) => {
		const { personId, firstName, lastName } = player;
		return (
			<TableRow component='div' className='trow' key={`roster-table-row-${teamId}-${personId}`}>
				<TableCell
					className='cell button-cell'
				>
					<IconButton
						onClick={() => removePlayer(personId)}
						size='small'
					>
						<RemoveIcon />
					</IconButton>
				</TableCell>
				<TableCell
					className={`cell headshot-cell ${getSeasonStats(player, selectedYear).min > 0 ? '' : 'no-stats' }`}
				>
					<Avatar
						src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`}
						className='headshot'
					/>
				</TableCell>
				<TableCell
					className={`cell name-cell ${getSeasonStats(player, selectedYear).min > 0 ? '' : 'no-stats' }`}
				>
					{firstName} {lastName}
					{/* {truncatePlayerName(firstName, lastName)} */}
				</TableCell>
			</TableRow>
		)
	})

	const undraftedRows: Array<JSX.Element> = [];

	while (roster.length + undraftedRows.length < maxTeamSize) {
		undraftedRows.push(
			<UndraftedRow
				key={`undrafted-table-row-${undraftedRows.length}`}
				teamId={teamId}
				roster={roster}
				addPlayer={addPlayer}
				selectedYear={selectedYear}
				allPlayers={allPlayers}
			/>
		)
	}

	return (
		<TableContainer classes={tableContainerClasses}>	
			<Table padding='none' size='small' className='table'>
				<TableBody className='tbody'>
					{playerRows}
					{undraftedRows}
				</TableBody>	
			</Table>
		</TableContainer>
	)
}