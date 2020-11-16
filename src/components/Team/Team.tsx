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
import { IStatCategory, ITeam, ITeamTotalStats } from '../../Types/teamTypes';
import { PlayerSelect } from './PlayerSelect';
import { teamListContext } from '../../Contexts/TeamListContext';
import { appStatsContext } from '../../Contexts/AppStatsContext';
import { settingsContext } from '../../Contexts/SettingsContext';
import { 
	calcTotalStats,
	getPlayerStats,
	maxTeamSize,
	calcRelativeStatsV2,
	calcTotalStatsArray,
} from '../../Util';
import { RosterTable } from './RosterTable'
import { TotalStatsTable } from './TotalStatsTable';
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
import { IPlayerSearchResult, Player } from '../../Types/playerTypes';

export const Team = (props: ITeam) => {
	const { id } = props;
	const [ isExpanded, setIsExpanded ] = useState(true);

	const { teamList, removeTeam, setTeamList } = useContext(teamListContext);
	const { setAppStats } = useContext(appStatsContext);
	const { selectedYear } = useContext(settingsContext).settings;

	const accordionClasses = useAccordionStyles();
	const accordionSummaryClasses = useAccordionSummaryStyles();
	const accordionDetailClasses = useAccordionDetailStyles();
	const gridClasses = useGridStyles();
	
	const index = teamList.findIndex(team => team.id === id);
	const roster = teamList[index].roster;
	const color = teamList[index].color;
	const totalStats: ITeamTotalStats = calcTotalStats(roster, selectedYear as number);
	const totalStatsArray: Array<number> = calcTotalStatsArray(totalStats).map((stat: IStatCategory) => stat.total);

	useEffect(() => {
		teamList[index].totalStats = calcTotalStats(roster, selectedYear as number);
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

	const addPlayer = async (personId: string, playerList: Array<IPlayerSearchResult>): Promise<void> => {
		const { firstName, lastName } = playerList.find(player => player.personId === personId)!;
		const { stats } = await getPlayerStats(personId);
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
						/>
						<TotalStatsTable
							teamId={id}
							totalStats={totalStats ?? {}}
						/>
					</Grid>
				</AccordionDetails>
			</Accordion>
		</div>
	)
}