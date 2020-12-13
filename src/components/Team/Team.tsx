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
import { IStat, ITeam, IStatDictionary } from '../../Types/types';
import { teamListContext } from '../../Contexts/TeamListContext';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import { 
	calcTeamStats,
	getPlayerStats,
	maxTeamSize,
	calcRelativeStatsV2,
	calcStatsArray,
	convertStatStringsToNumbers,
	addCalculatedStats
} from '../../Util/Util';
import { TeamLabel } from './TeamLabel';
import { RosterTable } from './RosterTable';
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

	const accordionClasses = useAccordionStyles();
	const accordionSummaryClasses = useAccordionSummaryStyles();
	const accordionDetailClasses = useAccordionDetailStyles();
	const gridClasses = useGridStyles();
	
	const index = teamList.findIndex(team => team.id === id);
	const roster = teamList[index].roster;
	const color = teamList[index].color;
	const teamStats: IStatDictionary = calcTeamStats(roster, selectedYear as number);
	const totalStatsArray: Array<number> = calcStatsArray(teamStats).map(({ value }: IStat) => value);

	useEffect(() => {
		teamList[index].teamStats = calcTeamStats(roster, selectedYear as number);
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
		const statStringObj = (await getPlayerStats(personId)).stats;
		const stats = convertStatStringsToNumbers(statStringObj);
		stats.latest = addCalculatedStats(stats.latest);
		stats.regularSeason.season = stats.regularSeason.season.map((season: {total: IStatDictionary}) => {
			season.total = addCalculatedStats(season.total);
			return season;
		});

		const player: Player = {
			personId,
			firstName,
			lastName,
			stats
		};

		roster.push(player);
		teamList[index].roster = roster;
		setTeamList([...teamList]);
		console.log(player)
	}

	const removePlayer = (personId: string): void => {
		teamList[index].roster = roster.filter(player => player.personId !== personId);
		setTeamList([...teamList]);
	}

	// PersonAdd icon
	// FilterNone (for copy)

	// console.log('rendering team', id, selectedYear)

	return (
		<div style={{marginBottom: 6}}>
			<Accordion
				classes={accordionClasses}
				expanded={isExpanded}
			>
				<AccordionSummary
					aria-label="Expand"
					aria-controls="additional-actions1-content"
					classes={accordionSummaryClasses}
				>
					<TeamLabel 
						id={id}
						rosterLength={roster.length}
					/>
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
							id={id} 
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