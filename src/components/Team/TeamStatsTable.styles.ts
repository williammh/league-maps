import { makeStyles } from '@material-ui/core/styles';
import { nbaBlue } from '../../Util'



export const useTableContainerStyles = makeStyles({
    root: {
        height: 'calc(20vh - 16px) !important',
        width: '40%',
        marginLeft: 3,
        overflowY: 'scroll',
        overflowX: 'hidden',
        '& td': {
            textTransform: 'uppercase',
            height: 30,
            lineHeight: '30px'
        },
        '& td.stat-label' : {
            width: 'calc(100% - 62px)',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textAlign: 'left',
            paddingLeft: 6,
        },
        '& td.stat-value' : {
            width: 50,
            paddingRight: 6,
            textAlign: 'right'
        },
        '& td.best' : {
            backgroundColor: nbaBlue,
            color: 'white'
        }
    }
})
