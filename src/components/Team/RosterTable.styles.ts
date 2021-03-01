import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';
import { nbaRed, nbaBlue } from '../../Util/Util';
import { ITeam } from '../../Types/types'

const avatarSize = 28

export const useRosterTableStyles = makeStyles({
	root: {
		width: '60%',
		'& .button-cell' : {
			width: 28,
		},
		'& .no-stats ': {
			opacity: .25
		},
		'& .headshot-cell' : {
			width: 28
		},
		'& .headshot' : {
			height: avatarSize,
			width: avatarSize,
			backgroundColor: ({color}: ITeam) => color ?? 'lightgray',
		},
		'& .mock-player-icon': {
			height: avatarSize,
			width: avatarSize,
			fill: 'white',
			backgroundColor: ({color}: ITeam) => color ?? 'black',
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
			// MuiListItem-root.Mui-selected:hover will override this in production version without !improtant
			backgroundColor: `${nbaBlue} !important`,
			color: '#fff'
		},
	}
})