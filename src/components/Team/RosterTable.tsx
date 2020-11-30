import React, { useEffect, useRef } from 'react';
import {
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Avatar,
	Tooltip,
	ClickAwayListener,
	Card
} from '@material-ui/core'
import { IPlayerSearchResult, IStat, Player } from '../../Types/types';
import { useTableContainerStyles } from './RosterTable.styles';
import { maxTeamSize, getSeasonStats, calcStatsArray } from '../../Util/Util';
import { UndraftedRow } from './UndraftedRow'
import RemoveIcon from '@material-ui/icons/Remove';
import { useTooltipStyles } from './TeamStatsTable.styles';


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

	const [openTooltip, setOpenTooltip] = React.useState<number | null>(null);

	const handleTooltipClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		setOpenTooltip(null)
	};
	
	const handleTooltipOpen = (event: React.MouseEvent<HTMLElement>) => {
		const { index } = event.currentTarget.dataset;
		setOpenTooltip(parseInt(index!))
  };

	const tableContainerClasses = useTableContainerStyles();
	const tooltipClasses = useTooltipStyles();

	// only display player's first initial if displaying full name causes text overflow
	useEffect(() => {
		const nameCells = document.querySelectorAll(`.roster-table-${teamId} .name-cell div`);
		nameCells.forEach(nameCell => {
			if (nameCell.scrollWidth > nameCell.clientWidth) {
				const fullName = nameCell.innerHTML.split(' ');
				fullName[0] = `${fullName[0][0]}. `;
				nameCell.innerHTML = fullName.join('').toString();
			}
		})
	}, [roster.length])

	const playerRows = roster.map((player: Player, i) => {
		const { personId, firstName, lastName } = player;

		const playerSeasonStats = getSeasonStats(player, selectedYear);
		const playerStatsArray = calcStatsArray(playerSeasonStats);
		
		const playerTooltip = (
			<>
				<div className='player-label'>
					<p>{firstName} {lastName}</p>
					<p>{selectedYear}-{selectedYear + 1}</p>
					<p>Regular Season</p>
				</div>
				<Table padding='none' size='small'>
					<TableBody>
						{playerStatsArray.map(({ category, value }: IStat) => {
							return (
								<TableRow key={`total-stats-row-${teamId}-${category}`}>
									<TableCell>
										{category}
									</TableCell>
									<TableCell className='stat-value'>
										{value.toFixed(1)}
									</TableCell>
								</TableRow>
							)
						})}
					</TableBody>
				</Table>
			</>
		)

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
					className={`headshot-cell ${playerSeasonStats.min > 0 ? '' : 'no-stats' }`}
				>
					<Avatar
						src={`https://ak-static.cms.nba.com/wp-content/uploads/headshots/nba/latest/260x190/${personId}.png`}
						className='headshot'
					/>
				</TableCell>
				<TableCell
					className={`name-cell ${playerSeasonStats.min > 0 ? '' : 'no-stats' }`}
				>
					<ClickAwayListener onClickAway={handleTooltipClose}>
						<Tooltip
							title={playerTooltip}
							arrow
							disableFocusListener
							disableHoverListener
							disableTouchListener
							open={openTooltip === i}
							interactive
							classes={tooltipClasses}
						>
							<div onClick={handleTooltipOpen} data-index={i}>
								{firstName} {lastName}
							</div>
						</Tooltip>
					</ClickAwayListener>
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