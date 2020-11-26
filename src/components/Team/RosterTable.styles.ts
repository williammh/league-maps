import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';

export const useTableContainerStyles = makeStyles({
	root: {
		height: 'calc(20vh - 16px) !important',
		width: '60%',
		marginRight: 3,
		overflowY: 'scroll',
		overflowX: 'hidden',
		'& table': {
			display: 'inline-block'
		},
		'& tbody': {
			width: '100%',
			display: 'inline-block'
		},
		'& tr': {
			display: 'flex',
			flexWrap: 'nowrap',
			width: '100%',
		},
		'& td': {
			display: 'inline-block',
			width: 30,
			height: 30,
			border: 'none'
		},
		'& .button-cell' : {
			width: 30,
		},
		'& .no-stats ': {
			opacity: .25
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
		},
		'& :not(.undrafted-row) .name-cell' : {
			paddingLeft: 6,
			lineHeight: '30px',
			flex:' 1 0 auto',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			cursor: 'pointer'
		}
	}
})