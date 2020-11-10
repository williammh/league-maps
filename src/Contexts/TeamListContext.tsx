import React from 'react';
import { ITeam } from '../Types/teamTypes';

const teamListContext = React.createContext({} as ITeamContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface ITeamContext {
	teamList: ITeam[];
	setTeamList: React.Dispatch<React.SetStateAction<ITeam[]>>;
}

const TeamListContextProvider = (props: ContextProviderProps) => {
	const [teamList, setTeamList] = React.useState([] as Array<ITeam>);

	return (
		<teamListContext.Provider value={{teamList, setTeamList}}>
			{props.children}
		</teamListContext.Provider>
	)
}

export {TeamListContextProvider, teamListContext}