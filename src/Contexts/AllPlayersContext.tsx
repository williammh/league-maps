import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction
} from 'react';
import { IPlayerSearchResult } from '../Types/playerTypes';

const allPlayersContext = React.createContext({} as IAllPlayersContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface IAllPlayersContext {
	allPlayers: Array<IPlayerSearchResult>;
	setAllPlayers: Dispatch<SetStateAction<Array<IPlayerSearchResult>>>
}

const AllPlayersContextProvider = (props: ContextProviderProps): JSX.Element => {
	const [allPlayers, setAllPlayers] = useState([] as Array<IPlayerSearchResult>);

	return (
		<allPlayersContext.Provider value={{allPlayers,  setAllPlayers}}>
			{props.children}
		</allPlayersContext.Provider>
	)
}

export {AllPlayersContextProvider, allPlayersContext}