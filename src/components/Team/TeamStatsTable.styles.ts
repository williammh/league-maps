import { makeStyles } from '@material-ui/core/styles';
import { nbaBlue } from '../../Util';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useTableContainerStyles = makeStyles({
    root: {
        height: 'calc(20vh - 16px) !important',
        width: '40%',
        marginLeft: 3,
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
            height: 30,
            lineHeight: '30px',
            display: 'inline-block',
            border: 'none'
        },
        '& .stat-label' : {
            textTransform: 'uppercase',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            paddingLeft: 6,
            width: 'calc(100% - 50px - 12px)',
        },
        '& .stat-value' : {
            width: 50,
            paddingRight: 6,
            textAlign: 'right',
        },
        '& .best' : {
            backgroundColor: nbaBlue,
            color: 'white'
        }
    }
})

export const useTooltipStyles = makeStyles({
    popper: {
        ...getScrollBarStyles('.MuiTooltip-tooltip'),
    },
    tooltip: {
        paddingTop: 0,
        overflowY: 'scroll',
        color: '#000',
        maxHeight: '50vh',
        backgroundColor: 'white',
        '& .player-label': {
            position: 'sticky',
            top: 0,
            backgroundColor: 'white',
            padding: '2px 0px'
        },
        '& p' : {
            margin: '6px 0px',
            fontSize: 14
        },
        '& tr:nth-child(odd)' : {
			backgroundColor: '#FAFAFA'
		},
		'& tr:nth-child(even)' : {
			backgroundColor: '#F0F0F0'
		},
        '& td' : {
            border: 'none',
            textTransform: 'uppercase'
        },
        '& .stat-value' : {
            textAlign: 'right'
        }
    }
})
