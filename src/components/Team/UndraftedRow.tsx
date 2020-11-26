import React, { useEffect, useContext, useState } from 'react';
import {
	IconButton,
	TableRow,
	TableCell,
	Tooltip,
	ClickAwayListener,
} from '@material-ui/core'

import AddIcon from '@material-ui/icons/Add';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { IPlayerSearchResult, Player } from '../../Types/types';
import { PlayerSelect } from './PlayerSelect';
import { usePopoverStyles } from './RosterTable.styles';
import { mockComponent } from 'react-dom/test-utils';

export interface IUndraftedRowProps {
	teamId: number;
	addPlayer: (personId: string, allPlayers: Array<IPlayerSearchResult>) => Promise<void>;
	roster: Array<Player>;
	selectedYear: number;
	allPlayers: Array<IPlayerSearchResult>;
}
	
export const UndraftedRow = (props: IUndraftedRowProps): JSX.Element => {
	const { addPlayer, teamId, roster, selectedYear, allPlayers } = props;
	
	const [ openTooltip, setOpenTooltip ] = useState(false);
	
	const popoverClasses = usePopoverStyles();

	const handleTooltipClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		setOpenTooltip(false)
	};
	
	const handleTooltipOpen = (event: React.MouseEvent<HTMLElement>) => {
		event?.stopPropagation();
		setOpenTooltip(true);
	};

	const playerSelect = <PlayerSelect 
		teamId={teamId}
		roster={roster}
		addPlayer={addPlayer}
		key={`player-select-${teamId}`}
		selectedYear={selectedYear}
		allPlayers={allPlayers}
	/>

	return (
		<TableRow className='undrafted-row'>
			<ClickAwayListener onClickAway={handleTooltipClose}>
				<TableCell className='button-cell'>
					<Tooltip
						title={playerSelect}
						disableFocusListener
						disableHoverListener
						disableTouchListener
						open={openTooltip}
						interactive
						classes={popoverClasses}
					>
						<IconButton
							size='small'
							onClick={handleTooltipOpen}
						>
							<AddIcon />
						</IconButton>
					</Tooltip>
				</TableCell>
			</ClickAwayListener>
			<TableCell className='headshot-cell no-stats'>
				<AccountCircleIcon className='mock-player-icon' />
			</TableCell>
			<TableCell className='name-cell no-stats'>
				Undrafted
			</TableCell>
		</TableRow>
	)
}