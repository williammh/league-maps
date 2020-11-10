import { makeStyles } from '@material-ui/core/styles';

export const useTableContainerStyles = makeStyles({
    root: {
        height: '100%',
        width: '40%',
        overflowY: 'scroll',
        overflowX: 'hidden',
        '& td': {
            textTransform: 'uppercase',
            padding: '0px 6px'
        },
        '& td.stat-label' : {
            maxWidth: '50px',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left'
        },
        '& td.stat-value' : {
            minWidth: '50%',
            textAlign: 'right'
        },
        '& td.best' : {
            backgroundColor: 'lime',
            fontWeight: 'bold'
        }
    }
})
