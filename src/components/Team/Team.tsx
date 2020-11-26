import React, {
	useState,
	useEffect,
	useContext,
	MouseEvent,
	ChangeEvent
} from 'react';
import {
	Accordion,
	AccordionSummary,
	AccordionDetails,
	Grid,
	IconButton,
} from '@material-ui/core'
import { IStatCategory, ITeam, ITeamStats } from '../../Types/types';
import { PlayerSelect } from './PlayerSelect';
import { teamListContext } from '../../Contexts/TeamListContext';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import { 
	calcTotalStats,
	getPlayerStats,
	maxTeamSize,
	calcRelativeStatsV2,
	calcStatsArray,
} from '../../Util';
import { RosterTable } from './RosterTable'
import { TeamStatsTable } from './TeamStatsTable';
import { 
	useAccordionStyles,
	useAccordionSummaryStyles,
	useAccordionDetailStyles,
	useGridStyles
} from './Team.styles';

import MinimizeIcon from '@material-ui/icons/Minimize';
import CropDinIcon from '@material-ui/icons/CropDin';
import LaunchIcon from '@material-ui/icons/Launch';
import CloseIcon from '@material-ui/icons/Close';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import { IPlayerSearchResult, Player } from '../../Types/types';

export const Team = (props: ITeam) => {
	const { id, allPlayers } = props;
	const [ isExpanded, setIsExpanded ] = useState(true);

	const { teamList, removeTeam, setTeamList } = useContext(teamListContext);
	const { setAppStats } = useContext(appStatsContext);
	const { selectedYear } = useContext(settingsContext);

	const accordionClasses = useAccordionStyles(isExpanded);
	const accordionSummaryClasses = useAccordionSummaryStyles();
	const accordionDetailClasses = useAccordionDetailStyles();
	const gridClasses = useGridStyles();
	
	const index = teamList.findIndex(team => team.id === id);
	const roster = teamList[index].roster;
	const color = teamList[index].color;
	const teamStats: ITeamStats = calcTotalStats(roster, selectedYear as number);
	const totalStatsArray: Array<number> = calcStatsArray(teamStats).map(({ total }: IStatCategory) => total);

	useEffect(() => {
		teamList[index].teamStats = calcTotalStats(roster, selectedYear as number);
		setTeamList([...teamList]);
	}, [roster.length, selectedYear])

	useEffect(() => {
		const relativeStats = calcRelativeStatsV2(teamList)
		setAppStats(relativeStats);
	}, [...totalStatsArray, teamList.length, selectedYear])

	// const [ localRoster, setLocalRoster ] = useState({});

	const minimize = (event: MouseEvent) => {
		setIsExpanded(!isExpanded);
	}

	const maximize = (event: MouseEvent) => {
		// stub
	}

	const close = (event: MouseEvent) => {
		removeTeam(id)
	}

	const addPlayer = async (personId: string, allPlayers: Array<IPlayerSearchResult>): Promise<void> => {
		const { firstName, lastName } = allPlayers.find(player => player.personId === personId)!;
		const { latest, regularSeason } = (await getPlayerStats(personId)).stats;
		
		for (const stat in latest) {
			if (typeof latest[stat] === 'string') {
				latest[stat] = latest[stat] !== '-1' ? parseFloat(latest[stat] as string) : 0
			} 
		}

		const { season } = regularSeason;
		for (const year in season) {
			for (const category in season[year].total) {
				const stat = season[year].total[category];
				if (typeof stat === 'string') {
					season[year].total[category] = stat !== '-1' ? parseFloat(stat) : 0
				}
			}
		}

		const stats = {
			latest,
			regularSeason: {
				season
			}
		}

		const player: Player = {
			personId,
			firstName,
			lastName,
			stats
		};
		roster.push(player);
		teamList[index].roster = roster;
		setTeamList([...teamList]);
		// console.log(player)
	}

	const removePlayer = (personId: string): void => {
		teamList[index].roster = roster.filter(player => player.personId !== personId);
		setTeamList([...teamList]);
	}

	// PersonAdd icon
	// FilterNone (for copy)

	// console.log('rendering team', id, selectedYear)

	return (
		<div>
			<Accordion
				classes={accordionClasses}
				// square
				expanded={isExpanded}
			>
				<AccordionSummary
					aria-label="Expand"
					aria-controls="additional-actions1-content"
					classes={accordionSummaryClasses}
				>
					<div className='teamLabel'>
						{/* <RadioButtonUncheckedIcon
							style={{
								backgroundColor: color,
								fill: 'white',
								borderRadius: '20px',
							}}
						/> */}
						<span>Team {id} ({roster.length}{roster.length >= maxTeamSize && '*'})</span>
					</div>
					<IconButton
						onClick={minimize}
						size='small'
					>
						{ isExpanded ? <MinimizeIcon /> : <CropDinIcon /> }
					</IconButton>
					<IconButton
						onClick={maximize}
						size='small'
					>
						<LaunchIcon />
					</IconButton>
					<IconButton
						onClick={close}
						size='small'
					>
						<CloseIcon />
					</IconButton>
				</AccordionSummary>
				<AccordionDetails
					classes={accordionDetailClasses}
				>
					<Grid
						container
						direction='row'
						classes={gridClasses}
					>
						<RosterTable
							teamId={id} 
							roster={roster}
							addPlayer={addPlayer}
							removePlayer={removePlayer}
							selectedYear={selectedYear as number}
							allPlayers={allPlayers}
						/>
						<TeamStatsTable
							teamId={id}
							teamStats={teamStats ?? {}}
						/>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}