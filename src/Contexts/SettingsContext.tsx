import React, {
	Dispatch,
	SetStateAction,
	useEffect,
	useState
} from 'react';
import {
	defaultCategories,
	allStatCategories
 } from '../Util/StatCategories'

const settingsContext = React.createContext({} as ISettingsContext);

interface ContextProviderProps {
  children: React.ReactNode;
}

interface ISettingsContext {
	selectedStats: { [key: string]: boolean };
	setSelectedStats:  Dispatch<SetStateAction<{ [key: string]: boolean }>>;
	selectedYear: number | Promise<number>;
	setSelectedYear: Dispatch<SetStateAction<number>>;
}

const SettingsContextProvider = (props: ContextProviderProps) => {
	const defaultSelectedStats: any = {};
	allStatCategories.forEach(category => (
		defaultSelectedStats[category] = defaultCategories.includes(category)
	));

	const [ selectedStats, setSelectedStats ] = useState(defaultSelectedStats);

	const [ selectedYear, setSelectedYear ] = useState((new Date()).getFullYear());

	useEffect(() => {
		(async (): Promise<void> => {
			let currentYear = (new Date()).getFullYear();
			let response;
			while (!response || !response.ok) {
				response = await fetch(`https://data.nba.net/prod/v1/${currentYear}/players.json`);
				if (!response.ok) {
					currentYear--;
				}
			}
			setSelectedYear(2020);
		})();
	}, []);

	return (
		<settingsContext.Provider value={{selectedStats, selectedYear, setSelectedYear, setSelectedStats}}>
			{props.children}
		</settingsContext.Provider>
	)
}

export { SettingsContextProvider, settingsContext }