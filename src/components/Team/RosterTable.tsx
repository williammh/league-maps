import React from 'react';
import {
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Avatar
} from '@material-ui/core'
import { IPlayerSearchResult, Player } from '../../Types/playerTypes';
import { useTableContainerStyles } from './RosterTable.styles';
import { maxTeamSize } from '../../Util';
import { UndraftedRow } from './UndraftedRow'

import RemoveIcon from '@material-ui/icons/Remove';
import { isTemplateMiddle } from 'typescript';

export interface IRosterTableProps {
	teamId: number;
	roster: Array<Player>;
	addPlayer: (personId: string, playerList: Array<IPlayerSearchResult>) => Promise<void>;
	removePlayer: (personId: string) => void;
}

export const RosterTable = (props: IRosterTableProps): JSX.Element => {
	const { teamId, roster, removePlayer, addPlayer } = props;

	const tableContainerClasses = useTableContainerStyles();

	const truncatePlayerName = (firstName: string, lastName: string): string => {
		// to do
		// http://www.java2s.com/Tutorials/Javascript/Javascript_Style_How_to/Text/Detect_text_overflow.htm
		const maxLength = "Giannis Antetokounmpo".length
		return `${firstName} ${lastName}`.length >= maxLength ? `${firstName[0]}. ${lastName}` : `${firstName} ${lastName}`;
	}

	const playerRows = roster.map((player: Player) => {
		const { personId, firstName, lastName, stats } = player;
		return (
			<TableRow key={`roster-table-row-${teamId}-${personId}`}>
				<TableCell className='add-remove-button-cell'>
					<IconButton
						onClick={() => removePlayer(player.personId)}
						size='small'
					>
						<RemoveIcon />
					</IconButton>
				</TableCell>
				<TableCell className={`headshot-cell ${stats.latest.min === '-1' ? '' : '' }`}>
					<Avatar
						src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`}
						className='headshot'
					/>
				</TableCell>
				<TableCell
					className={`name-cell ${stats.latest.min === '-1' ? '' : '' }`}
				>
					{truncatePlayerName(firstName, lastName)}
				</TableCell>
			</TableRow>
		)
	})

	const undraftedRows: Array<JSX.Element> = []

	while (roster.length + undraftedRows.length < maxTeamSize) {
		undraftedRows.push(
			<UndraftedRow
				teamId={teamId}
				roster={roster}
				addPlayer={addPlayer}
			/>
		)
	}

	return (
		<TableContainer classes={tableContainerClasses}>	
			<Table padding='none' size='small'>
				<TableBody>
					{playerRows}
					{undraftedRows}
				</TableBody>	
			</Table>
		</TableContainer>
	)
}