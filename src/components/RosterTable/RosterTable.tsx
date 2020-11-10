import React from 'react';
import {
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer
} from '@material-ui/core'
import { IPlayer, IPlayerSearchResult } from '../../Types/playerTypes';
import { useTableContainerStyles } from './RosterTable.styles';
import { maxTeamSize } from '../../Util';
import { RemainingRows } from './RemainingRows';
import { Headshot } from '../Headshot/Headshot';

import RemoveIcon from '@material-ui/icons/Remove';

export interface IRosterTableProps {
	teamId: number;
	roster: Array<IPlayer>;
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

	return (
		<TableContainer classes={tableContainerClasses}>	
			<Table padding='none' size='small'>
				<TableBody>
					{roster.map((player: IPlayer) => {
						return (
							<TableRow key={`roster-table-row-${teamId}-${player.personId}`}>
								<TableCell className='remove-button-cell'>
									<IconButton
										onClick={() => removePlayer(player.personId)}
										size='small'
									>
										<RemoveIcon />
									</IconButton>
								</TableCell>
								<TableCell className={`headshot-cell ${player.stats.latest.min === '-1' ? 'no-stats' : undefined }`}>
									<Headshot personId={player.personId} />
								</TableCell>
								<TableCell
									className={`name-cell ${player.stats.latest.min === '-1' ? 'no-stats' : undefined }`}
								>
									{truncatePlayerName(player.firstName, player.lastName)}
								</TableCell>
							</TableRow>
						)
					})}
					<RemainingRows
						rows={maxTeamSize - roster.length}
						teamId={teamId}
						addPlayer={addPlayer}
					/>
				</TableBody>	
			</Table>
		</TableContainer>
	)
}