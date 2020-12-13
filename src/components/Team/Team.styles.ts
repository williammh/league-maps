import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useAccordionStyles = makeStyles({
	root: {
		maxWidth: 'calc(100% - 24px)',
		marginTop: '0px !important',
		marginRight: '6px !important',
		// marginBottom: '6px !important',
		marginLeft: '6px !important',
		paddingTop: 6,
		paddingRight: 6,
		paddingBottom:6,
		paddingLeft: 6,
		minWidth: 'fit-content;'
	}
})

export const useAccordionSummaryStyles = makeStyles({
	root: {
		minHeight: 'fit-content !important',
		padding: '0px',
		'& :hover': {
			cursor: 'default'
		},
	},
	content: {
		justifyContent: 'flex-end',
		margin: '0px !important',
		'& .MuiTextField-root': {
			width: 140
		},
		'& input[type=text]' : {
			padding: '2px 6px',
		},
		'& .teamLabelContainer': {
			flexGrow: 2,
			display: 'flex',
			paddingLeft: '6px'
		},
		'& .label': {
			cursor: 'text'
		},
		'& button' : {
			padding: 0
		}
	},
	focused: {
		backgroundColor: 'unset !important'
	}
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
		'& tr:nth-child(odd)' : {
			backgroundColor: '#FAFAFA'
		},
		'& tr:nth-child(even)' : {
			backgroundColor: '#F0F0F0'
		},
		...getScrollBarStyles('.MuiTableContainer-root')
	}
})