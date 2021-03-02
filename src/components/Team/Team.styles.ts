import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useAccordionStyles = makeStyles({
	root: {
		maxWidth: 'calc(100% - 24px)',
		margin: '0px 6px 6px !important',
		paddingTop: 6,
		paddingRight: 6,
		paddingBottom:6,
		paddingLeft: 6,
		minWidth: 'fit-content'
	}
})

export const useAccordionSummaryStyles = makeStyles({
	root: {
		minHeight: 'fit-content !important',
		padding: '0px',
		'& :hover': {
			cursor: 'default'
		}
		
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
		},
		'& span': {
			lineHeight: '28px'
		},
		'& span.roster-size' : {
			textAlign: 'center',
			width: 28
		},
		'& span.label': {
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
		padding: '6px 0px 0px 0px'
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

export const useTableContainerStyles = makeStyles({
	root: {
		height: 'calc(22.5vh - 6px - 6px - 24px - 6px - 6px - 4px) !important',
		width: (props: React.CSSProperties) => props.width,
		padding: (props: React.CSSProperties) => props.padding,
		overflowY: 'scroll',
		overflowX: 'hidden',
		'& table': {
			width: '100%'
		},
		'& tbody' : {
			width: '100%',
		},
		'& tr': {
			width: '100%',
		},
		'& td': {
			height: 28,
			lineHeight: '32px',
			display: 'inline-block',
			border: 'none',
			paddingBottom: 1
		}
	}
})