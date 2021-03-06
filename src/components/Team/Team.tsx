import React, {
	useState,
	useEffect,
	useContext
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
	convertStatStringsToNumbers,
	addCalculatedStats,
	calcFantasyPoints,
	isBestInCategory
} from '../../Util/Util';
import { TeamLabel } from './TeamLabel';
import { RosterTable } from './RosterTable';
import { StatsTable } from './StatsTable';
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
import { IPlayerSearchResult, Player } from '../../Types/types';

export const Team = (props: ITeam) => {
	const { id } = props;
	const [ isExpanded, setIsExpanded ] = useState(true);

	const { selectedYear, selectedStats, statMultipliers } = useContext(settingsContext);
	const { teamList, removeTeam, updateTeam, leagueStats, updateLeagueStats } = useContext(leagueContext);

	const thisTeam = teamList.find(team => team.id === id)!;

	// to do: https://casesandberg.github.io/react-color/

	const accordionClasses = useAccordionStyles();
	const accordionSummaryClasses = useAccordionSummaryStyles();
	const accordionDetailClasses = useAccordionDetailStyles();
	const gridClasses = useGridStyles();

	useEffect(() => {
		updateLeagueStats();
	}, [...Object.values(thisTeam.stats)])

	useEffect(() => {
		thisTeam.stats = calcTeamStats(thisTeam.roster, selectedYear);
		calcFantasyPoints(thisTeam.stats, statMultipliers);
		// thisTeam.stats.scl = calcCategoryLeads(thisTeam.stats);
		updateTeam(thisTeam);
	}, [...Object.values(selectedStats), ...Object.values(statMultipliers), selectedYear])

	const minimize = () => {
		setIsExpanded(!isExpanded);
	}

	const maximize = () => {
		alert('This feature is yet to be constructed!');
	}

	const close = () => {
		removeTeam(id)
	}

	// const calcCategoryLeads = (teamStats: IStatDictionary) => {
	// 	let result = 0;
	// 	for (const category in teamStats) {
	// 		if (!selectedStats[category] || category === 'scl') {
	// 			continue;
	// 		}
	// 	  if (isBestInCategory(teamStats[category], category, leagueStats)) {
	// 			result++;
	// 		};
	// 	}
	// 	return result;
	// }

	const addPlayer = async (personId: string, allPlayers: Array<IPlayerSearchResult>): Promise<void> => {
		const { firstName, lastName } = allPlayers.find(player => player.personId === personId)!;
		const statStringObj = (await getPlayerStats(personId)).stats;
		const stats = convertStatStringsToNumbers(statStringObj);
		stats.latest = addCalculatedStats(stats.latest);
		stats.regularSeason.season = stats.regularSeason.season.map((season: { total: IStatDictionary }) => {
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
		thisTeam.stats = calcTeamStats(thisTeam.roster, selectedYear);
		updateTeam(thisTeam);
	}

	const removePlayer = (personId: string): void => {
		thisTeam.roster = thisTeam.roster.filter(player => player.personId !== personId);
		thisTeam.stats = calcTeamStats(thisTeam.roster, selectedYear);
		updateTeam(thisTeam);
	}

	// PersonAdd icon
	// FilterNone (for copy)

	return (
		<div>
			<Accordion
				classes={accordionClasses}
				expanded={isExpanded}
			>
				<AccordionSummary classes={accordionSummaryClasses}>
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
						/>
						<StatsTable
							teamId={id}
							stats={thisTeam.stats}
							color={thisTeam.color ?? 'lightgray'}
						/>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}