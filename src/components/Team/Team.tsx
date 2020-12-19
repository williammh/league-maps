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
import { ITeam, IStatDictionary } from '../../Types/types';
import { leagueContext } from '../../Contexts/LeagueContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import { 
	calcTeamStats,
	getPlayerStats,
	maxTeamSize,
	calcLeagueStats,
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
	const { id } = props;
	const [ isExpanded, setIsExpanded ] = useState(true);

	const { selectedYear } = useContext(settingsContext);
	const { teamList, removeTeam, updateTeam, updateLeagueStats } = useContext(leagueContext);

	const thisTeam = teamList.find(team => team.id === id)!;	

	// to do: https://casesandberg.github.io/react-color/

	console.log(`render team ${id}`)

	const accordionClasses = useAccordionStyles();
	const accordionSummaryClasses = useAccordionSummaryStyles();
	const accordionDetailClasses = useAccordionDetailStyles();
	const gridClasses = useGridStyles();

	useEffect(() => {
		updateLeagueStats();
	}, [...Object.values(thisTeam.teamStats), selectedYear])

	const minimize = () => {
		setIsExpanded(!isExpanded);
	}

	const maximize = () => {
		alert('This feature is still under construction!');
	}

	const close = () => {
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
		console.log(player);

		thisTeam.roster.push(player);
		thisTeam.teamStats = calcTeamStats(thisTeam.roster, selectedYear as number);
		updateTeam(thisTeam);
	}

	const removePlayer = (personId: string): void => {
		thisTeam.roster = thisTeam.roster.filter(player => player.personId !== personId);
		thisTeam.teamStats = calcTeamStats(thisTeam.roster, selectedYear as number);
		updateTeam(thisTeam);
	}

	// PersonAdd icon
	// FilterNone (for copy)

	// console.log('rendering team', id, selectedYear)

	return (
		<div>
			<Accordion
				classes={accordionClasses}
				expanded={isExpanded}
			>
				<AccordionSummary
					aria-label="Expand"
					aria-controls="additional-actions1-content"
					classes={accordionSummaryClasses}
				>
					<TeamLabel id={id} />
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
							roster={thisTeam.roster}
							addPlayer={addPlayer}
							removePlayer={removePlayer}
							selectedYear={selectedYear as number}
						/>
						<TeamStatsTable
							teamId={id}
							teamStats={thisTeam.teamStats ?? {}}
						/>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}