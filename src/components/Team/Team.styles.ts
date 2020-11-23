import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useAccordionStyles = makeStyles({
	root: {
		width: 'calc(100% - 24px)',
		height: isExpanded => isExpanded ? 'calc(22.5vh - 12px)' : 'auto',
		'& tr': {
			overflow: 'hidden'
		},
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
		paddingTop: 0,
		paddingRight: 6,
		paddingBottom:6,
		paddingLeft: 6,
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
		minHeight: 'fit-content !important',
	},
	content: {
		justifyContent: 'flex-end',
		margin: '0px !important',
		'& .teamLabel': {
			flexGrow: 2,
			display: 'flex',
			paddingLeft: '6px'
		},
		'& button' : {
			padding: 0
		}
	},
});

export const useAccordionDetailStyles = makeStyles({
	root: {
		flexDirection: 'column',
		padding: '0px'
	}
})

export const useGridStyles = makeStyles({
	root: {
		flexWrap: 'nowrap',
		alignItems: 'stretch',
		'& td': {
			display: 'inline-block',
			border: 'none'
		},
		...getScrollBarStyles('.MuiTableContainer-root')
	}
})