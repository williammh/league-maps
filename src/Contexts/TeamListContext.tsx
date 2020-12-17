import React, { useState, useEffect } from 'react';
import { ITeam } from '../Types/types';
import { calcTeamStats } from '../Util/Util';

const teamListContext = React.createContext({} as ITeamContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface ITeamContext {
	teamList: Array<ITeam>;
	setTeamList: React.Dispatch<React.SetStateAction<ITeam[]>>;
	addTeam: () => void;
	removeTeam: (id: number) => void;
}

const TeamListContextProvider = (props: ContextProviderProps) => {
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
	]

	const [ teamList, setTeamList ] = useState(initialTeamList);
	
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

	return (
		<teamListContext.Provider value={{ teamList, addTeam, removeTeam, setTeamList }}>
			{props.children}
		</teamListContext.Provider>
	)
}

export { TeamListContextProvider, teamListContext }