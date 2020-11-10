import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useAccordionStyles = makeStyles({
	root: {
		width: '100%',
		height: 'fit-content',
		'& tr:nth-child(odd)' : {
			backgroundColor: '#FAFAFA'
		},
		'& tr:nth-child(even)' : {
			backgroundColor: '#F0F0F0'
		},
	},
	expanded: {
		margin: '4px 0px !important',
	}
})

export const useAccordionSummaryStyles = makeStyles({
	root: {
		minHeight: '0px',
		padding: '0px',
		overflow: 'hidden',
		'& :hover': {
				cursor: 'default'
		},
	},
	expanded: {
		minHeight: '0px !important',
		'& .Mui-expanded': {
				margin: '12px 0px',
		}
	},
	content: {
		justifyContent: 'flex-end',
		margin: '0px !important',
		'& .teamLabel': {
			flexGrow: 2,
			display: 'flex',
			paddingTop: '3px',
			paddingLeft: '6px'
		}
	},
});

export const useAccordionDetailStyles = makeStyles({
	root: {
		flexDirection: 'column',
		padding: '2px'
	}
})

export const useGridStyles = makeStyles({
	root: {
		flexWrap: 'nowrap',
		height: '200px',
		...getScrollBarStyles('.MuiTableContainer-root')
	}
})