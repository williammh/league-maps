import { makeStyles } from '@material-ui/core/styles';
import { getScrollBarStyles } from '../../SharedStyles/SharedStyles';

export const useBarChartStyles = makeStyles({
  root: {
    width: 'calc(100% - 20)',
    margin: 10,
    padding: 10,
    '& h4': {
      textTransform: 'uppercase',
      textAlign: 'center'
    },
    '& rect': {
      maxHeight: '40px',
      fill: 'gray',
      transitionDuration: '1s'
    },
    '& rect.best': {
      fill: 'lime'
    }
  }
})
