import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';
import { pointer } from 'd3';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

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
		'& .name-cell' : {
			paddingLeft: 6,
			lineHeight: '30px',
			flex:' 1 0 auto',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			whiteSpace: 'nowrap',
			cursor: 'default'
		},
		'& :not(.undrafted-row) > .name-cell' : {
			cursor: 'pointer'
		}
	}
})

export const usePopoverStyles = makeStyles({
	popper: {
		'& .MuiTooltip-tooltip': {
			backgroundColor: '#fff',
			padding: 0,
		},
		// ...getScrollBarStyles('.MuiList-root', 8, 200),
		...getScrollBarStyles('.resultsList', 8, 200),
		// '& .LazyLoad':  {
		// 	height: 30,
		// 	backgroundColor: 'pink'
		// },
		'& .LazyLoad:nth-child(odd)' : {
			backgroundColor: '#FAFAFA'
		},
		'& .LazyLoad:nth-child(even)' : {
			backgroundColor: '#F0F0F0'
		},
		'& .MuiListItem-root' : {
			border: 'none',
			margin: 0,
			padding: 0,
			height: 40,
			color: '#000'
		},
	}
})