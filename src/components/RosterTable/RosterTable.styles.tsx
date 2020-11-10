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
		'& .remove-button-cell' : {
			width: '27px',
		},
		'& .no-stats, & .mock-player' : {
			opacity: '.25'
		},
		'& .headshot-cell' : {
			width: '30px'
		},
		'& .mock-player-icon': {
			height: '30px',
			width: '30px',
			fill: 'white',
			backgroundColor: 'black',
			borderRadius: '15px',
		},
		'& .name-cell' : {
			whiteSpace: 'nowrap',
			textOverflow: 'ellipsis'
		}
	}
})