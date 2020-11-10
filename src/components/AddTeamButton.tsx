import React from 'react';
import { Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { teamListContext } from '../Contexts/TeamListContext';
import { calcTotalStats } from '../Util'

export const AddTeamButton = () => {

	const { teamList, setTeamList } = React.useContext(teamListContext);

	const useStyles = makeStyles({
		root: {
		  background: 'linear-gradient(0deg, #2196F3 30%, #21CBF3 90%)',
		  boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
		  borderRadius: '0px',
		  color: 'white',
		  height: 48,
		  padding: '0 30px',
		  width: '100%'
		},
	});
	
	const classes = useStyles();

	const generateTeamId = (): number => {
		const lastTeamId: number = teamList[teamList.length - 1]?.id ?? 0
		return lastTeamId + 1;
	}

	const generateColor = (): string => {
		const lastTeamcolor: string = teamList[teamList.length - 1]?.color ?? '#f00'
		return '#f00'
	}

	const handleClick = () => {
		const newTeam = {
			id: generateTeamId(),
			roster: [],
			color: generateColor(),
			totalStats: calcTotalStats([])
		};


		setTeamList([
			...teamList,
			newTeam
		])
	}

	return (
		<Button
			variant='contained'
			color='primary'
			startIcon={<AddIcon />}
			onClick={handleClick}
			className={classes.root}
		>
			Add Team
		</Button>
	)
}