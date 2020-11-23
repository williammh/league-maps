import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';

export const useTableContainerStyles = makeStyles({
	root: {
		height: 'calc(20vh - 16px) !important',
		width: '60%',
		marginRight: 3,
		overflowY: 'scroll',
		overflowX: 'hidden',
		'& .table': {
			display: 'inline-block'
		},
		'& .tbody': {
			// maxWidth: '100%',
			width: '100%',
			display: 'inline-block'
		},
		'& .trow': {
			display: 'flex',
			flexWrap: 'nowrap',
			maxWidth: '100%',
			width: '100%'
		},
		'& .cell': {
			display: 'inline-block',
			width: 30,
			height: 30,
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
			display: 'flex'
		},
		'& .name-cell' : {
			paddingLeft: 6,
			lineHeight: '30px',
			// width: 'calc(100% - 60px)',
			// maxWidth: 'calc(100% - 60px)',

			flex:' 1 0 auto',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
		}
	}
})