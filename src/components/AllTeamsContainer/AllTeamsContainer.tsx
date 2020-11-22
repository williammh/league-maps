import React, { useEffect, useContext } from 'react';
import { Team } from '../Team/Team';
import { ITeam } from '../../Types/teamTypes';
import { getAllPlayers } from '../../Util';
import { teamListContext } from '../../Contexts/TeamListContext';
import { playerListContext } from '../../Contexts/PlayerListContext';
import { settingsContext } from '../../Contexts/SettingsContext';

export const AllTeamsContainer = (): JSX.Element => {
	const { teamList } = useContext(teamListContext)
	const { playerList, setPlayerList } = useContext(playerListContext);
	const { selectedYear } = useContext(settingsContext)

	useEffect(() => {
		(async (): Promise<void> => {
			const playerList = (await getAllPlayers(selectedYear as number));
			setPlayerList(playerList);
		})();
	}, [selectedYear])

	return (
		<>
			{teamList.map((teamProps: ITeam): React.ReactNode => {
				return (
					<Team
						{...teamProps}
						allPlayers={playerList}
						key={teamProps.id}
					/>
				)
			})}
		</>
	)
}