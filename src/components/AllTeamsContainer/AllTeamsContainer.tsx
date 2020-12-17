import React, { useEffect, useContext, FunctionComponent } from 'react';
import { Team } from '../Team/Team';
import { ITeam } from '../../Types/types';
import { getAllPlayers } from '../../Util/Util';
import { teamListContext } from '../../Contexts/TeamListContext';
import { allPlayersContext } from '../../Contexts/AllPlayersContext';
import { settingsContext } from '../../Contexts/SettingsContext';

export const AllTeamsContainer: FunctionComponent = () => {
	const { teamList } = useContext(teamListContext)
	const { setAllPlayers } = useContext(allPlayersContext);
	const { selectedYear } = useContext(settingsContext)

	useEffect(() => {
		(async (): Promise<void> => {
			setAllPlayers(await getAllPlayers(selectedYear as number));
		})();
	}, [selectedYear])

	return (
		<>
			{teamList.map((teamProps: ITeam): React.ReactNode => (
					<Team
						{...teamProps}
						key={teamProps.id}
					/>
			))}
		</>
	)
}