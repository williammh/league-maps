import { makeStyles } from '@material-ui/core/styles';
import { Block } from '@material-ui/icons';
import { pointer } from 'd3';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';
import { nbaRed, nbaBlue } from '../../Util/Util';

export const useTableContainerStyles = makeStyles({
	root: {
		height: '124px !important',
		width: '60%',
		marginRight: 3,
		overflowY: 'scroll',
		overflowX: 'hidden',
		'& table': {
			width: '100%'
		},
		'& tbody': {
			width: '100%',
		},
		'& tr': {
			width: '100%',
			
		},
		'& td': {
			display: 'inline-block',
			height: 30,
			border: 'none',
			paddingBottom: 1
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
			width: 'calc(100% - 30px - 30px - 6px)',
			lineHeight: '32px',
			cursor: 'default',
			overflow: 'hidden',
			textOverflow: 'ellipsis',
			paddingLeft: 6
		},
		'& .name-cell div' : {
			width: '100%',
			height: '100%',
			overflow: 'inherit',
			textOverflow: 'inherit',
			whiteSpace: 'nowrap',
			cursor: 'pointer',
		}
	}
})

export const usePopoverStyles = makeStyles({
	popper: {
		'& .MuiTooltip-tooltip': {
			backgroundColor: '#fff',
			padding: 0,
		},
		'& .MuiFormLabel-root.Mui-focused': {
      color: nbaBlue,
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline' : {
      borderColor: nbaBlue
    },
		...getScrollBarStyles('.MuiList-root', 8, 200),
		'& .LazyLoad.odd': {
			backgroundColor: '#F0F0F0'
		},
		'& .LazyLoad.even': {
			backgroundColor: '#FAFAFA'
		},
		'& .MuiListItem-root' : {
			color: '#000',
			height: 40
		},
		'& .MuiListItem-root:hover, & .Mui-selected' : {
			backgroundColor: nbaBlue,
			color: '#fff'
		},
	}
})