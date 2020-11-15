import React from 'react';
import { Button, IconButton } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { teamListContext } from '../../Contexts/TeamListContext';
import { calcTotalStats } from '../../Util'
import GroupAddIcon from '@material-ui/icons/GroupAdd';

export const AddTeamButton = () => {

	const { teamList, setTeamList, addTeam } = React.useContext(teamListContext);

	const useStyles = makeStyles({
		root: {
		  background: 'linear-gradient(0deg, #2196F3 30%, #21CBF3 90%)',
		  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
		  borderRadius: '0px',
		  color: 'white',
		  height: '100%',
		  padding: '0 30px',
		  width: '200px'
		},
	});
	
	const classes = useStyles();

	const handleClick = () => {
		addTeam()
	}

	return (
		<IconButton
			onClick={handleClick}
			style={{color: '#FFF'}}
		>
			<GroupAddIcon />
		</IconButton>
	)
}