import React from 'react';
import { getAllPlayers } from '../Util';
import { IPlayerSearchResult } from '../Types/playerTypes';

const playerListContext = React.createContext([] as IPlayerSearchResult[]);

interface ContextProviderProps {
  children: React.ReactNode
}

const PlayerListContextProvider = (props: ContextProviderProps): JSX.Element => {
	const [playerList, setPlayerList] = React.useState([] as IPlayerSearchResult[]);

	React.useEffect(() => {
		(async (): Promise<void> => {
			const playerList = await getAllPlayers();
			const filteredplayerList = playerList.filter(({isActive}) => isActive);
			setPlayerList(filteredplayerList);
		})();
	}, []);

	return (
		<playerListContext.Provider value={playerList}>
			{props.children}
		</playerListContext.Provider>
	)
}

export {PlayerListContextProvider, playerListContext}