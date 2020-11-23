import { makeStyles } from '@material-ui/core/styles';

export const useTableContainerStyles = makeStyles({
	root: {
		height: 'calc(20vh - 16px) !important',
		width: '60%',
		marginRight: 3,
		overflowY: 'scroll',
		overflowX: 'hidden',
		'& .add-remove-button-cell' : {
			width: 30,
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
			textOverflow: 'ellipsis',
			overflow: 'hidden',
			maxWidth: 'calc(100% - 60px)',
		}
	}
})