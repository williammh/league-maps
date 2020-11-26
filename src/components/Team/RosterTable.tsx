import React, { useEffect, useRef } from 'react';
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

	const nameCellRef = useRef<HTMLTableDataCellElement>(null);

	useEffect(() => {
		const nameCells = document.querySelectorAll(`.roster-table-${teamId} .name-cell`);
		nameCells.forEach(nameCell => {
			console.log(nameCell.innerHTML)
			if (nameCell.scrollWidth > nameCell.clientWidth) {
				const fullName = nameCell.innerHTML.split(' ');
				fullName[0] = `${fullName[0][0]}. `;
				nameCell.innerHTML = fullName.join('').toString();
			}
		})
	})

	const playerRows = roster.map((player: Player, i) => {
		const { personId, firstName, lastName } = player;
		return (
			<TableRow key={`roster-table-row-${teamId}-${personId}`}>
				<TableCell
					className='button-cell'
				>
					<IconButton
						onClick={() => removePlayer(personId)}
						size='small'
					>
						<RemoveIcon />
					</IconButton>
				</TableCell>
				<TableCell
					className={`headshot-cell ${getSeasonStats(player, selectedYear).min > 0 ? '' : 'no-stats' }`}
				>
					<Avatar
						src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`}
						className='headshot'
					/>
				</TableCell>
				<TableCell
					ref={nameCellRef}
					className={`name-cell ${getSeasonStats(player, selectedYear).min > 0 ? '' : 'no-stats' }`}
				>
					{firstName} {lastName}
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
			<Table padding='none' size='small' className={`roster-table-${teamId}`}>
				<TableBody>
					{playerRows}
					{undraftedRows}
				</TableBody>	
			</Table>
		</TableContainer>
	)
}