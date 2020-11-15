import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const usePopover = makeStyles({
    paper: {
        overflow: 'visible',
        ...getScrollBarStyles('.resultsList', 4, 200),
    }
})
