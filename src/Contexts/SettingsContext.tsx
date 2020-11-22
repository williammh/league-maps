import React, {
	Dispatch, SetStateAction, useEffect } from 'react';
import {
	statCategories,
	calculatedCategories,
	excludeCategories,
	defaultCategories
 } from '../Util'

const settingsContext = React.createContext({} as ISettingsContext);

interface ContextProviderProps {
  children: React.ReactNode;
}


interface ISettingsContext {
	selectedStats: { [key: string]: boolean };
	setSelectedStats:  Dispatch<SetStateAction<{ [key: string]: boolean }>>;
	selectedYear?: number | Promise<number>;
	setSelectedYear: Dispatch<SetStateAction<number>>;
}

const SettingsContextProvider = (props: ContextProviderProps) => {

	const defaultSelectedStats: any = {};

	const allCategories = [
		...defaultCategories,
		...statCategories,
		...calculatedCategories,
	];
	allCategories
		/** remove duplicates, seasonStageId, and seasonYear */ 
		.filter((category, index) => (
			allCategories.indexOf(category) === index && !excludeCategories.includes(category)
		))
		.forEach(category => (
			defaultSelectedStats[category] = defaultCategories.includes(category)
		))

	const [ selectedStats, setSelectedStats ] = React.useState(defaultSelectedStats);

	const [ selectedYear, setSelectedYear ] = React.useState((new Date()).getFullYear());

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
		<settingsContext.Provider value={{selectedStats, selectedYear, setSelectedYear, setSelectedStats}}>
			{props.children}
		</settingsContext.Provider>
	)
}

export { SettingsContextProvider, settingsContext }