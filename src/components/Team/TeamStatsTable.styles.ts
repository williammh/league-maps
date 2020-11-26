import { makeStyles } from '@material-ui/core/styles';
import { nbaBlue } from '../../Util'



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
