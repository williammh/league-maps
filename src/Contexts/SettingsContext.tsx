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

	statMultipliers: { [key: string]: number};
	setStatMultipliers: Dispatch<SetStateAction<{ [key: string]: number }>>;

	selectedYear: number | Promise<number>;
	setSelectedYear: Dispatch<SetStateAction<number>>;

	selectedFormat: string;
	setSelectedFormat: Dispatch<SetStateAction<string>>;
}

const SettingsContextProvider = (props: ContextProviderProps) => {
	const defaultSelectedStats: any = {};
	allStatCategories.forEach(category => (
		defaultSelectedStats[category] = defaultCategories.includes(category)
	));

	const [ selectedStats, setSelectedStats ] = useState(defaultSelectedStats);

	const [ selectedYear, setSelectedYear ] = useState((new Date()).getFullYear());

	const defaultStatMultipliers: any = {};
	allStatCategories.forEach(category => {
		defaultStatMultipliers[category] = defaultCategories.includes(category) ? 1 : 0
	})

	const [ statMultipliers, setStatMultipliers ] = useState(defaultStatMultipliers);

	const [ selectedFormat, setSelectedFormat ] = useState('roto');

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
			setSelectedYear(currentYear);
		})();
	}, []);

	return (
		<settingsContext.Provider value={{
			selectedStats,
			selectedYear,
			setSelectedYear,
			setSelectedStats,
			statMultipliers,
			setStatMultipliers,
			selectedFormat,
			setSelectedFormat
		}}>
			{props.children}
		</settingsContext.Provider>
	)
}

export { SettingsContextProvider, settingsContext }