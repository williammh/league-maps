import React, { ChangeEvent } from 'react';
import {
	IconButton,
	TableRow,
	TableCell
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IPlayerSearchResult } from '../../Types/playerTypes';

export interface IRemainingRowsProps {
	teamId: number;
	rows: number;
	addPlayer: (personId: string, playerList: Array<IPlayerSearchResult>) => Promise<void>;
}
	
export const RemainingRows = (props: IRemainingRowsProps): JSX.Element => {
	const { rows, addPlayer, teamId } = props;
	
	const arr: Array<JSX.Element> = [];


	let i = 0;
	while(arr.length < rows) {

		arr.push(
			<TableRow key={`${teamId}-${i}`}>
				<TableCell className='remove-button-cell'>
					<IconButton
						size='small'
					>
						<AddIcon />
					</IconButton>
				</TableCell>
				<TableCell className='headshot-cell mock-player'>
						<AccountCircleIcon className='mock-player-icon' />
				</TableCell>
				<TableCell className='mock-player'>
					Undrafted
				</TableCell>
			</TableRow>
		)
		i++;
	}

	return <>{arr}</>
}
