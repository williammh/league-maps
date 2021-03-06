import React, {
	useEffect,
	useContext
} from 'react';
import {
	IconButton,
	Table,
	TableBody,
	TableRow,
	TableCell,
	TableContainer,
	Avatar,
	Tooltip,
	ClickAwayListener
} from '@material-ui/core'
import { IPlayerSearchResult, Player } from '../../Types/types';
import { useRosterTableStyles } from './RosterTable.styles';
import { maxTeamSize, getSeasonStats } from '../../Util/Util';
import { UndraftedRow } from './UndraftedRow'
import RemoveIcon from '@material-ui/icons/Remove';
import { useTooltipStyles } from './StatsTable.styles';
import { settingsContext } from '../../Contexts/SettingsContext' 
import { leagueContext } from '../../Contexts/LeagueContext' 
import { useTableContainerStyles } from './Team.styles';


export interface IRosterTableProps {
	id: number;
	roster: Array<Player>;
	addPlayer: (personId: string, allPlayers: Array<IPlayerSearchResult>) => Promise<void>;
	removePlayer: (personId: string) => void;
}

export const RosterTable = (props: IRosterTableProps): JSX.Element => {
	const { id, roster, removePlayer, addPlayer } = props;

	const { selectedYear } = useContext(settingsContext);
	const { league } = useContext(leagueContext);
	const { teamList } = league;
	const thisTeam = teamList.find(team => team.id === id);

	const [openTooltip, setOpenTooltip] = React.useState<number | null>(null);

	const handleTooltipClose = (event: React.MouseEvent<Document, MouseEvent>) => {
		event.stopPropagation();
		setOpenTooltip(null);
	};
	
	const handleTooltipOpen = (event: React.MouseEvent<HTMLElement>) => {
		event.stopPropagation();
		const { index } = event.currentTarget.dataset;
		setOpenTooltip(parseInt(index!))
  };

	// const tableContainerClasses = useTableContainerStyles(thisTeam);
	const tableContainerClasses = useTableContainerStyles();
	const rosterTableClasses = useRosterTableStyles({
		teamColor: thisTeam!.color
	});
	const tooltipClasses = useTooltipStyles();

	// only display player's first initial if displaying full name causes text overflow
	useEffect(() => {
		const nameCells = document.querySelectorAll(`.roster-table-${id} .name-cell div`);
		nameCells.forEach(nameCell => {
			if (nameCell.scrollWidth > nameCell.clientWidth) {
				const fullName = nameCell.innerHTML.split(' ');
				fullName[0] = `${fullName[0][0]}. `;
				nameCell.innerHTML = fullName.join('').toString();
			}
		})
	}, [roster.length])

	
	const UndraftedRows = () => {
		const rows: Array<JSX.Element> = [];
		while (roster.length + rows.length < maxTeamSize) {
			rows.push(
				<UndraftedRow
					key={`undrafted-table-row-${rows.length}`}
					teamId={id}
					roster={roster}
					addPlayer={addPlayer}
					selectedYear={selectedYear as number}
				/>
			)
		}
		return <>{rows}</>
	}


	return (
		<TableContainer classes={tableContainerClasses}>	
			<Table
				padding='none'
				size='small'
				classes={rosterTableClasses}
				className={`roster-table-${id}`}
			>
				<TableBody>
					{roster.map((player: Player, i) => {
						const { personId, firstName, lastName } = player;

						const playerSeasonStats = getSeasonStats(player, selectedYear as number);
						const playerStatsArray = Object.entries(playerSeasonStats);
						
						return (
							<TableRow key={`roster-table-row-${id}-${personId}`}>
								<TableCell className='button-cell'>
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
											title={
												<>
													<div className='player-label'>
														<p>{firstName} {lastName}</p>
														<p>{selectedYear}-{(selectedYear as number) + 1}</p>
														<p>Regular Season</p>
													</div>
													<Table padding='none' size='small'>
														<TableBody>
															{playerStatsArray.map(([category, value]) => (
																<TableRow key={`total-stats-row-${id}-${category}`}>
																	<TableCell>
																		{category}
																	</TableCell>
																	<TableCell className='stat-value'>
																		{value.toFixed(1)}
																	</TableCell>
																</TableRow>
															))}
														</TableBody>
													</Table>
												</>
											}
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
					})}
					<UndraftedRows />
				</TableBody>	
			</Table>
		</TableContainer>
	)
}