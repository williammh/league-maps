import { makeStyles } from '@material-ui/core/styles';

export const useTableContainerStyles = makeStyles({
	root: {
		height: '100%',
		width: '60%',
		overflowY: 'scroll',
		overflowX: 'hidden',
		'& .MuiTableCell-root' : {
			padding: '2px',
		},
		'& .add-remove-button-cell' : {
			width: '27px',
		},
		'& .no-stats, & .mock-player' : {
			opacity: '.25'
		},
		'& .headshot-cell' : {
			width: 30
		},
		'& .headshot' : {
			height: 30,
			width: 30,
			backgroundColor: 'lightgray'
		},
		'& .mock-player-icon': {
			height: '30px',
			width: '30px',
			fill: 'white',
			backgroundColor: 'black',
			borderRadius: '15px',
			display: 'flex'
		},
		'& .name-cell' : {
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		}
	}
})