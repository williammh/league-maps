import React, {Dispatch, SetStateAction} from 'react';
import { IRelativeStatsV2 } from '../Types/teamTypes';

const appStatsContext = React.createContext({} as IAppStatsContext);

interface ContextProviderProps {
  children: React.ReactNode
}

interface IAppStatsContext {
	appStats: IRelativeStatsV2;
	setAppStats: Dispatch<SetStateAction<IRelativeStatsV2>>;
}

const AppStatsContextProvider = (props: ContextProviderProps) => {
	const initialAppStats = { min: {}, median: {}, max: {} };
	const [appStats, setAppStats] = React.useState(initialAppStats);
	
	return (
		<appStatsContext.Provider value={{appStats, setAppStats}}>
			{props.children}
		</appStatsContext.Provider>
	)
}

export {AppStatsContextProvider, appStatsContext}