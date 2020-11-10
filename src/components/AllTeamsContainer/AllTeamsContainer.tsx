import React from 'react';
import { teamListContext } from '../../Contexts/TeamListContext';
import { Team } from '../Team/Team';
import { ITeam } from '../../Types/teamTypes';

export const AllTeamsContainer = (): JSX.Element => {
	const context = React.useContext(teamListContext)
	const { teamList } = context;
	return (
		<>
			{teamList.map((teamProps: ITeam): React.ReactNode => {
				return (
					<Team
						key={teamProps.id}
						{...teamProps}
					/>
				)
			})}
		</>
	)
}