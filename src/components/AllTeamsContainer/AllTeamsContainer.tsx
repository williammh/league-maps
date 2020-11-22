import React, { useEffect, useContext } from 'react';
import { Team } from '../Team/Team';
import { ITeam } from '../../Types/types';
import { getAllPlayers } from '../../Util';
import { teamListContext } from '../../Contexts/TeamListContext';
import { allPlayersContext } from '../../Contexts/AllPlayersContext';
import { settingsContext } from '../../Contexts/SettingsContext';

export const AllTeamsContainer = (): JSX.Element => {
	const { teamList } = useContext(teamListContext)
	const { allPlayers, setAllPlayers } = useContext(allPlayersContext);
	const { selectedYear } = useContext(settingsContext)

	useEffect(() => {
		(async (): Promise<void> => {
			setAllPlayers(await getAllPlayers(selectedYear as number));
		})();
	}, [selectedYear])

	return (
		<>
			{teamList.map((teamProps: ITeam): React.ReactNode => {
				return (
					<Team
						{...teamProps}
						allPlayers={allPlayers}
						key={teamProps.id}
					/>
				)
			})}
		</>
	)
}