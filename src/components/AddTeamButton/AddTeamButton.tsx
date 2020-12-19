import React from 'react';
import { IconButton } from '@material-ui/core'
import { leagueContext } from '../../Contexts/LeagueContext';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export const AddTeamButton = () => {
	const { addTeam } = React.useContext(leagueContext);
	
	const handleClick = () => {
		addTeam()
	}

	return (
		<IconButton
			onClick={handleClick}
			style={{color: '#666666'}}
		>
			<GroupAddIcon />
		</IconButton>
	)
}