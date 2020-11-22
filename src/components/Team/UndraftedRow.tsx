import React, { useEffect, useContext } from 'react';
import {
	IconButton,
	TableRow,
	TableCell,
	Popover
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IPlayerSearchResult, Player } from '../../Types/types';
import { PlayerSelect } from './PlayerSelect';
import { usePopover } from './UndraftedRow.style'


export interface IUndraftedRowProps {
	teamId: number;
	addPlayer: (personId: string, allPlayers: Array<IPlayerSearchResult>) => Promise<void>;
	roster: Array<Player>;
	selectedYear: number;
	allPlayers: Array<IPlayerSearchResult>;
}
	
export const UndraftedRow = (props: IUndraftedRowProps): JSX.Element => {
	const { addPlayer, teamId, roster, selectedYear, allPlayers } = props;

	const popoverClasses = usePopover();
	
	const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
	const id = open ? 'simple-popover' : undefined;

	const handleBackdropClick = ({ clientX, clientY }: React.MouseEvent) => {
		const elementsAtCoordinates = document.elementsFromPoint(clientX, clientY) as Array<HTMLElement>;
		elementsAtCoordinates.find((element) => element instanceof HTMLButtonElement)?.click();
	}
	
	return (
		<TableRow>
			<TableCell className='add-remove-button-cell'>
				<IconButton
					size='small'
					onClick={handleClick}
				>
					<AddIcon />
				</IconButton>
				<Popover
					id={id}
					open={open}
					anchorEl={anchorEl}
					onClose={handleClose}
					anchorOrigin={{
						vertical: 'bottom',
						horizontal: 'center',
					}}
					transformOrigin={{
						vertical: 'top',
						horizontal: 'center',
					}}
					classes={popoverClasses}
					onBackdropClick={handleBackdropClick}
				>
        	<PlayerSelect 
						teamId={teamId}
						roster={roster}
						addPlayer={addPlayer}
						key={`player-select-${id}`}
						selectedYear={selectedYear}
						allPlayers={allPlayers}
					/>
      	</Popover>
			</TableCell>
			<TableCell className='headshot-cell mock-player'>
					<AccountCircleIcon className='mock-player-icon' />
			</TableCell>
			<TableCell className='mock-player'>
				Undrafted
			</TableCell>
		</TableRow>
	)
}
