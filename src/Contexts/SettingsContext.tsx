import React, {
	Dispatch, SetStateAction, useEffect } from 'react';
import {
	statCategories,
	calculatedCategories,
	excludeCategories,
	defaultCategories,
	getCurrentNbaYear
 } from '../Util'

const settingsContext = React.createContext({} as ISettingsContext);

interface ContextProviderProps {
  children: React.ReactNode;
}

export interface ISettings {
	visibleStats: IVisibleStats;
	selectedYear?: number | Promise<number>;
}

export interface IVisibleStats {
	[key: string]: boolean;
}

interface ISettingsContext {
	settings: ISettings;
	setSettings: Dispatch<SetStateAction<ISettings>>;
	setSelectedYear: (year: number) => void;
}

const SettingsContextProvider = (props: ContextProviderProps) => {
	const getDefaultSettings = (): ISettings => {
		const result: ISettings = {
			visibleStats: {},
			/** selectedYear will update upon app load with useEffect below  */
			selectedYear: 0
		};
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
				result.visibleStats[category] = defaultCategories.includes(category)
			))
		return result;
	}

	const [ settings, setSettings ] = React.useState(getDefaultSettings());

	const setSelectedYear = (year: number): void => {
		setSettings({
			visibleStats: settings.visibleStats,
			selectedYear: year
		})
	}
	
	useEffect(() => {
		(async (): Promise<void> => {
			setSelectedYear(await getCurrentNbaYear());
		})();
	}, []);

	return (
		<settingsContext.Provider value={{settings, setSelectedYear, setSettings}}>
			{props.children}
		</settingsContext.Provider>
	)
}

export { SettingsContextProvider, settingsContext }