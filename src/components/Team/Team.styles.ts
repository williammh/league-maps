import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useAccordionStyles = makeStyles({
	root: {
		width: 'calc(100% - 12)',
		height: '20vh',
		'& tr:nth-child(odd)' : {
			backgroundColor: '#FAFAFA'
		},
		'& tr:nth-child(even)' : {
			backgroundColor: '#F0F0F0'
		},
		marginTop: '0px !important',
		marginRight: '6px !important',
		marginBottom: '6px !important',
		marginLeft: '6px !important',
    padding: '6px !important',
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
		alignItems: 'stretch',
		...getScrollBarStyles('.MuiTableContainer-root')
	}
})