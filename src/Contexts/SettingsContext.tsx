import React, {
	Dispatch, SetStateAction, useEffect } from 'react';
import {
	statCategories,
	percentageCategories,
	calculatedCategories,
	invertedCategories,
	excludeCategories,
	defaultCategories,
	getDefaultSettings
 } from '../Util'

const settingsContext = React.createContext({} as ISettingsContext);

interface ContextProviderProps {
  children: React.ReactNode
}

export interface ISettings {
	visibleStats: IVisibleStats
}

export interface IVisibleStats {
	[key: string]: boolean
}

interface ISettingsContext {
	settings: ISettings;
	setSettings: Dispatch<SetStateAction<ISettings>>;
}

const SettingsContextProvider = (props: ContextProviderProps) => {

	const [ settings, setSettings ] = React.useState(getDefaultSettings());

	return (
		<settingsContext.Provider value={{settings, setSettings}}>
			{props.children}
		</settingsContext.Provider>
	)
}

export { SettingsContextProvider, settingsContext }