import React, {
	useState,
	useEffect,
	Dispatch,
	SetStateAction
} from 'react';
import { getAllPlayers } from '../Util';
import { IPlayerSearchResult } from '../Types/playerTypes';

const playerListContext = React.createContext({} as IPlayerListContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface IPlayerListContext {
	playerList: Array<IPlayerSearchResult>;
	setPlayerList: Dispatch<SetStateAction<Array<IPlayerSearchResult>>>
}

const PlayerListContextProvider = (props: ContextProviderProps): JSX.Element => {
	const [playerList, setPlayerList] = useState([] as Array<IPlayerSearchResult>);

	return (
		<playerListContext.Provider value={{playerList, setPlayerList}}>
			{props.children}
		</playerListContext.Provider>
	)
}

export {PlayerListContextProvider, playerListContext}