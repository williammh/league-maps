import React, { useState } from 'react';
import { ILeagueStats, ILeague, ITeam } from '../Types/types';
import { calcLeagueStats, generateEmptyStats } from '../Util/Util';
import { allStatCategories } from '../Util/StatCategories';

const leagueContext = React.createContext({} as ILeagueContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface ILeagueContext {
	addTeam: () => void;
	updateTeam: (team: ITeam) => void;
	removeTeam: (id: number) => void;
	league: ILeague;
	setLeague: React.Dispatch<React.SetStateAction<ILeague>>;
}

const LeagueContextProvider = (props: ContextProviderProps) => {

	const initialTeamList: Array<ITeam> = [
		{
			id: 1,
			roster: [],
			stats: generateEmptyStats(),
			color: 'gray'
		},
		{
			id: 2,
			roster: [],
			stats: generateEmptyStats(),
			color: 'gray'
		},
		{
			id: 3,
			roster: [],
			stats: generateEmptyStats(),
			color: 'gray'
		},
		{
			id: 4,
			roster: [],
			stats: generateEmptyStats(),
			color: 'gray'
		}
	];

	const initialLeagueStats: ILeagueStats  = { min: {}, median: {}, max: {} };
	allStatCategories.forEach(category => {
		initialLeagueStats.min[category] = 0;
		initialLeagueStats.median[category] = 0;
		initialLeagueStats.max[category] = 0;
	})

	const initialLeague = {
		teamList: initialTeamList,
		stats: initialLeagueStats
	}

	const [ league, setLeague ] = useState(initialLeague);
	
	const addTeam = () => {
		const { teamList } = league;

		const nextTeamList = [
			...teamList,
			{
				id: (teamList[league.teamList.length - 1]?.id ?? 0) + 1,
				roster: [],
				stats: generateEmptyStats(),
				color: 'gray'
			}
		];
		const nextStats = calcLeagueStats(nextTeamList);

		setLeague({
			teamList: nextTeamList,
			stats: nextStats
		})
	}

	const removeTeam = (id: number) => {
		const nextTeamList = league.teamList.filter(team => team.id !== id);
		const nextStats = calcLeagueStats(nextTeamList);

		setLeague({
			teamList: nextTeamList,
			stats: nextStats
		})
	}

	const updateTeam = (team: ITeam) => {
		const { teamList } = league;
		const { id } = team;
		
		const index = teamList.findIndex(team => team.id === id);

		teamList[index] = team;

		setLeague({
			teamList: teamList,
			stats: calcLeagueStats(teamList)
		})

	}

	return (
		<leagueContext.Provider
			value={{
				league,
				setLeague,
				addTeam,
				removeTeam,
				updateTeam
			}}
		>
			{props.children}
		</leagueContext.Provider>
	)
}

export { LeagueContextProvider, leagueContext }