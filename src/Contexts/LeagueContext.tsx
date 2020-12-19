import React, { useState } from 'react';
import { ILeagueStats, ITeam } from '../Types/types';
import { calcLeagueStats, calcTeamStats } from '../Util/Util';

const leagueContext = React.createContext({} as ILeagueContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface ILeagueContext {
	teamList: Array<ITeam>;
	setTeamList: React.Dispatch<React.SetStateAction<ITeam[]>>;
	addTeam: () => void;
	removeTeam: (id: number) => void;
	leagueStats: ILeagueStats;
	updateLeagueStats: () => void;
	updateTeam: (team: ITeam) => void;
}

const LeagueContextProvider = (props: ContextProviderProps) => {

	const initialTeamList: Array<ITeam> = [
		{
			id: 1,
			roster: [],
			teamStats: calcTeamStats([]),
		},
		{
			id: 2,
			roster: [],
			teamStats: calcTeamStats([]),
		},
		{
			id: 3,
			roster: [],
			teamStats: calcTeamStats([]),
		},
		{
			id: 4,
			roster: [],
			teamStats: calcTeamStats([]),
		}
	];

	const initialLeagueStats = { min: {}, median: {}, max: {} };

	const [ teamList, setTeamList ] = useState(initialTeamList);
	const [ leagueStats, setLeagueStats ] = useState(initialLeagueStats);
	
	const addTeam = () => {
		setTeamList([
			...teamList,
			{
				id: (teamList[teamList.length - 1]?.id ?? 0) + 1,
				roster: [],
				teamStats: calcTeamStats([])
			}
		])
	}

	const removeTeam = (id: number) => {
		setTeamList(teamList.filter(team => team.id !== id))
	}

	const updateTeam = (team: ITeam) => {
		const { id } = team;
		const index = teamList.findIndex(team => team.id === id);
		teamList[index] = team;
		setTeamList([...teamList]);
	}

	const updateLeagueStats = () => {
		const leagueStats = calcLeagueStats(teamList);
		setLeagueStats(leagueStats);
	}

	return (
		<leagueContext.Provider
			value={{
				teamList,
				addTeam,
				removeTeam,
				setTeamList,
				leagueStats,
				updateLeagueStats,
				updateTeam
			}}
		>
			{props.children}
		</leagueContext.Provider>
	)
}

export { LeagueContextProvider, leagueContext }